'use client';

import { getToken } from '@/lib/auth';
import type { SchoolProgress } from '@/lib/school-progress';

const API_BASE = 'https://ai.portofcams.com/api/bluewave';
const SYNC_QUEUE_KEY = 'bluewave-sync-queue';
const LAST_SYNC_KEY = 'bluewave-last-sync';

// ── Types ──────────────────────────────────────────────────────────

interface SyncQueueItem {
  type: 'lesson_complete' | 'exercise_complete';
  id: string;
  xp: number;
  timestamp: string;
}

// ── Sync queue (offline support) ───────────────────────────────────

function getSyncQueue(): SyncQueueItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(SYNC_QUEUE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveSyncQueue(queue: SyncQueueItem[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(queue));
}

function addToSyncQueue(item: SyncQueueItem): void {
  const queue = getSyncQueue();
  // Avoid duplicates
  const exists = queue.some(q => q.type === item.type && q.id === item.id);
  if (!exists) {
    queue.push(item);
    saveSyncQueue(queue);
  }
}

function clearSyncQueue(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(SYNC_QUEUE_KEY);
}

// ── API calls ──────────────────────────────────────────────────────

async function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const token = getToken();
  if (!token) throw new Error('Not authenticated');

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
    'Authorization': `Bearer ${token}`,
  };

  return fetch(url, { ...options, headers });
}

/**
 * POST a single progress event to the server.
 */
async function postProgressEvent(item: SyncQueueItem): Promise<boolean> {
  try {
    const res = await authFetch(`${API_BASE}/progress`, {
      method: 'POST',
      body: JSON.stringify({
        type: item.type,
        item_id: item.id,
        xp: item.xp,
        completed_at: item.timestamp,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Push full progress state to the server (bulk sync).
 */
async function pushFullProgress(progress: SchoolProgress): Promise<boolean> {
  try {
    const res = await authFetch(`${API_BASE}/progress/sync`, {
      method: 'PUT',
      body: JSON.stringify({
        completed_lessons: progress.completedLessons,
        completed_exercises: progress.completedExercises,
        xp_earned: progress.xpEarned,
        last_activity_date: progress.lastActivityDate,
        current_streak: progress.currentStreak,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * GET progress from the server to restore state.
 */
async function fetchServerProgress(): Promise<SchoolProgress | null> {
  try {
    const res = await authFetch(`${API_BASE}/progress`);
    if (!res.ok) return null;

    const data = await res.json();
    return {
      completedLessons: data.completed_lessons || [],
      completedExercises: data.completed_exercises || [],
      xpEarned: data.xp_earned || {},
      lastActivityDate: data.last_activity_date || null,
      currentStreak: data.current_streak || 0,
    };
  } catch {
    return null;
  }
}

// ── Public API ─────────────────────────────────────────────────────

/**
 * Sync a lesson completion to the server.
 * If offline or unauthenticated, queues for later sync.
 */
export async function syncLessonComplete(lessonId: string, xp: number): Promise<void> {
  const item: SyncQueueItem = {
    type: 'lesson_complete',
    id: lessonId,
    xp,
    timestamp: new Date().toISOString(),
  };

  const token = getToken();
  if (!token || !navigator.onLine) {
    addToSyncQueue(item);
    return;
  }

  const success = await postProgressEvent(item);
  if (!success) {
    addToSyncQueue(item);
  }
}

/**
 * Sync an exercise completion to the server.
 * If offline or unauthenticated, queues for later sync.
 */
export async function syncExerciseComplete(exerciseId: string, xp: number): Promise<void> {
  const item: SyncQueueItem = {
    type: 'exercise_complete',
    id: exerciseId,
    xp,
    timestamp: new Date().toISOString(),
  };

  const token = getToken();
  if (!token || !navigator.onLine) {
    addToSyncQueue(item);
    return;
  }

  const success = await postProgressEvent(item);
  if (!success) {
    addToSyncQueue(item);
  }
}

/**
 * Flush any queued progress events to the server.
 * Call this when the app comes back online or on page load.
 */
export async function flushSyncQueue(): Promise<void> {
  const token = getToken();
  if (!token || !navigator.onLine) return;

  const queue = getSyncQueue();
  if (queue.length === 0) return;

  const failed: SyncQueueItem[] = [];

  for (const item of queue) {
    const success = await postProgressEvent(item);
    if (!success) {
      failed.push(item);
    }
  }

  if (failed.length > 0) {
    saveSyncQueue(failed);
  } else {
    clearSyncQueue();
  }
}

/**
 * Merge server progress with local progress.
 * Server is the source of truth, but local additions are preserved.
 * Returns the merged progress, or null if fetch failed (use local only).
 */
export async function mergeServerProgress(
  localProgress: SchoolProgress
): Promise<SchoolProgress | null> {
  const token = getToken();
  if (!token) return null;

  const serverProgress = await fetchServerProgress();
  if (!serverProgress) return null;

  // Merge: union of completed items, max of XP values
  const mergedLessons = Array.from(
    new Set([...serverProgress.completedLessons, ...localProgress.completedLessons])
  );
  const mergedExercises = Array.from(
    new Set([...serverProgress.completedExercises, ...localProgress.completedExercises])
  );

  const mergedXP: Record<string, number> = { ...serverProgress.xpEarned };
  for (const [key, value] of Object.entries(localProgress.xpEarned)) {
    mergedXP[key] = Math.max(mergedXP[key] || 0, value);
  }

  // Use the more recent activity date
  let mergedLastActivity = serverProgress.lastActivityDate;
  if (
    localProgress.lastActivityDate &&
    (!mergedLastActivity || localProgress.lastActivityDate > mergedLastActivity)
  ) {
    mergedLastActivity = localProgress.lastActivityDate;
  }

  // Use the higher streak
  const mergedStreak = Math.max(serverProgress.currentStreak, localProgress.currentStreak);

  const merged: SchoolProgress = {
    completedLessons: mergedLessons,
    completedExercises: mergedExercises,
    xpEarned: mergedXP,
    lastActivityDate: mergedLastActivity,
    currentStreak: mergedStreak,
  };

  // Push merged state back to server if local had extra data
  const localHasExtra =
    localProgress.completedLessons.some(id => !serverProgress.completedLessons.includes(id)) ||
    localProgress.completedExercises.some(id => !serverProgress.completedExercises.includes(id));

  if (localHasExtra) {
    await pushFullProgress(merged);
  }

  // Record sync time
  if (typeof window !== 'undefined') {
    localStorage.setItem(LAST_SYNC_KEY, new Date().toISOString());
  }

  return merged;
}

/**
 * Get the last sync timestamp.
 */
export function getLastSyncTime(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(LAST_SYNC_KEY);
}

/**
 * Check if there are pending items in the sync queue.
 */
export function hasPendingSyncs(): boolean {
  return getSyncQueue().length > 0;
}

/**
 * Initialize progress syncing:
 * - Flush any queued events
 * - Set up online/offline listeners
 * Returns a cleanup function.
 */
export function initProgressSync(): () => void {
  // Flush on load
  flushSyncQueue();

  // Flush when coming back online
  const handleOnline = () => {
    flushSyncQueue();
  };

  window.addEventListener('online', handleOnline);

  return () => {
    window.removeEventListener('online', handleOnline);
  };
}
