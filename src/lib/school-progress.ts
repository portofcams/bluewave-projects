'use client';

import { allWaves } from '@/lib/curriculum';
import { syncLessonComplete, syncExerciseComplete } from '@/lib/progress-sync';

export interface SchoolProgress {
  completedLessons: string[];
  completedExercises: string[];
  xpEarned: Record<string, number>;
  lastActivityDate: string | null;
  currentStreak: number;
}

const STORAGE_KEY = 'bluewave-school-progress';

function getDefaultProgress(): SchoolProgress {
  return {
    completedLessons: [],
    completedExercises: [],
    xpEarned: {},
    lastActivityDate: null,
    currentStreak: 0,
  };
}

export function getProgress(): SchoolProgress {
  if (typeof window === 'undefined') return getDefaultProgress();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultProgress();
    return JSON.parse(raw) as SchoolProgress;
  } catch {
    return getDefaultProgress();
  }
}

function saveProgress(progress: SchoolProgress): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

/** Save progress directly (used by sync merge). */
export function saveProgressDirect(progress: SchoolProgress): void {
  saveProgress(progress);
}

function updateStreak(progress: SchoolProgress): SchoolProgress {
  const today = new Date().toISOString().split('T')[0];
  if (progress.lastActivityDate === today) {
    return progress;
  }

  if (progress.lastActivityDate) {
    const last = new Date(progress.lastActivityDate);
    const now = new Date(today);
    const diffMs = now.getTime() - last.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      progress.currentStreak += 1;
    } else if (diffDays > 1) {
      progress.currentStreak = 1;
    }
  } else {
    progress.currentStreak = 1;
  }

  progress.lastActivityDate = today;
  return progress;
}

export function markLessonComplete(lessonId: string, xp: number): SchoolProgress {
  const progress = getProgress();
  if (progress.completedLessons.includes(lessonId)) return progress;

  progress.completedLessons.push(lessonId);
  progress.xpEarned[lessonId] = (progress.xpEarned[lessonId] || 0) + xp;
  updateStreak(progress);
  saveProgress(progress);

  // Sync to server (fire-and-forget, queues if offline)
  syncLessonComplete(lessonId, xp);

  return progress;
}

export function markExerciseComplete(exerciseId: string, xp: number): SchoolProgress {
  const progress = getProgress();
  if (progress.completedExercises.includes(exerciseId)) return progress;

  progress.completedExercises.push(exerciseId);
  progress.xpEarned[exerciseId] = xp;
  updateStreak(progress);
  saveProgress(progress);

  // Sync to server (fire-and-forget, queues if offline)
  syncExerciseComplete(exerciseId, xp);

  return progress;
}

export function isLessonComplete(lessonId: string): boolean {
  return getProgress().completedLessons.includes(lessonId);
}

export function isExerciseComplete(exerciseId: string): boolean {
  return getProgress().completedExercises.includes(exerciseId);
}

export function getTotalXP(): number {
  const progress = getProgress();
  return Object.values(progress.xpEarned).reduce((sum, xp) => sum + xp, 0);
}

export function getCurrentStreak(): number {
  const progress = getProgress();
  if (!progress.lastActivityDate) return 0;

  const last = new Date(progress.lastActivityDate);
  const today = new Date(new Date().toISOString().split('T')[0]);
  const diffMs = today.getTime() - last.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays > 1) return 0;
  return progress.currentStreak;
}

export function getLevelFromXP(xp: number): { level: number; currentXP: number; nextLevelXP: number } {
  // Each level requires progressively more XP
  // Level 1: 0-100, Level 2: 100-250, Level 3: 250-500, etc.
  const thresholds = [0, 100, 250, 500, 850, 1300, 1900, 2600, 3500, 4600, 6000];
  let level = 1;
  for (let i = 1; i < thresholds.length; i++) {
    if (xp >= thresholds[i]) {
      level = i + 1;
    } else {
      break;
    }
  }
  const currentThreshold = thresholds[Math.min(level - 1, thresholds.length - 1)] || 0;
  const nextThreshold = thresholds[Math.min(level, thresholds.length - 1)] || thresholds[thresholds.length - 1] + 1000;
  return {
    level,
    currentXP: xp - currentThreshold,
    nextLevelXP: nextThreshold - currentThreshold,
  };
}

export function resetProgress(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

// --- Wave completion & certificate functions ---

const WAVE_COMPLETION_KEY = 'bluewave-wave-completions';
const CERTIFICATE_NAME_KEY = 'bluewave-certificate-name';

function getWaveCompletions(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(WAVE_COMPLETION_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, string>;
  } catch {
    return {};
  }
}

function saveWaveCompletions(data: Record<string, string>): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(WAVE_COMPLETION_KEY, JSON.stringify(data));
}

export function isWaveComplete(waveId: string): boolean {
  const wave = allWaves.find(w => w.id === waveId);
  if (!wave) return false;
  const progress = getProgress();
  const lessonIds = wave.units.flatMap(u => u.lessons.map(l => l.id));
  if (lessonIds.length === 0) return false;
  return lessonIds.every(id => progress.completedLessons.includes(id));
}

export function getWaveCompletionDate(waveId: string): string | null {
  const completions = getWaveCompletions();
  return completions[waveId] || null;
}

export function markWaveComplete(waveId: string): void {
  const completions = getWaveCompletions();
  if (!completions[waveId]) {
    completions[waveId] = new Date().toISOString();
    saveWaveCompletions(completions);
  }
}

export function getCertificateName(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(CERTIFICATE_NAME_KEY) || '';
}

export function setCertificateName(name: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CERTIFICATE_NAME_KEY, name);
}
