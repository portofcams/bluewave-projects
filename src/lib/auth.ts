'use client';

const API_BASE = 'https://ai.portofcams.com/api/bluewave';
const TOKEN_KEY = 'bluewave_auth_token';
const REFRESH_KEY = 'bluewave_auth_refresh';
const USER_KEY = 'bluewave_auth_user';

export interface User {
  id: string;
  email: string;
  name: string;
  plan: string | null; // "school" | "pro" | null (free)
  created_at: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
}

// ── Token management ──────────────────────────────────────────────

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(REFRESH_KEY);
}

export function getStoredUser(): User | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

function saveAuth(token: string, refreshToken: string, user: User): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(REFRESH_KEY, refreshToken);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearAuth(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(USER_KEY);
}

// ── API calls ─────────────────────────────────────────────────────

async function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return fetch(url, { ...options, headers });
}

export async function register(email: string, password: string, name: string): Promise<{ success: boolean; error?: string; user?: User }> {
  try {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, error: data.detail || data.message || 'Registration failed' };
    }

    const user: User = {
      id: data.user_id || data.id || '',
      email: data.email || email,
      name: data.name || name,
      plan: data.plan || null,
      created_at: data.created_at || new Date().toISOString(),
    };

    if (data.token || data.access_token) {
      saveAuth(
        data.token || data.access_token,
        data.refresh_token || '',
        user
      );
    }

    return { success: true, user };
  } catch (err) {
    return { success: false, error: 'Network error. Please try again.' };
  }
}

export async function login(email: string, password: string): Promise<{ success: boolean; error?: string; user?: User }> {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, error: data.detail || data.message || 'Login failed' };
    }

    const user: User = {
      id: data.user_id || data.id || '',
      email: data.email || email,
      name: data.name || '',
      plan: data.plan || null,
      created_at: data.created_at || '',
    };

    saveAuth(
      data.token || data.access_token,
      data.refresh_token || '',
      user
    );

    return { success: true, user };
  } catch (err) {
    return { success: false, error: 'Network error. Please try again.' };
  }
}

export async function refreshAuthToken(): Promise<boolean> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;

  try {
    const res = await fetch(`${API_BASE}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!res.ok) {
      clearAuth();
      return false;
    }

    const data = await res.json();
    const token = data.token || data.access_token;
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
      if (data.refresh_token) {
        localStorage.setItem(REFRESH_KEY, data.refresh_token);
      }
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export async function fetchCurrentUser(): Promise<User | null> {
  const token = getToken();
  if (!token) return null;

  try {
    const res = await authFetch(`${API_BASE}/auth/me`);

    if (res.status === 401) {
      // Try refreshing
      const refreshed = await refreshAuthToken();
      if (refreshed) {
        const retryRes = await authFetch(`${API_BASE}/auth/me`);
        if (!retryRes.ok) {
          clearAuth();
          return null;
        }
        const data = await retryRes.json();
        const user = normalizeUser(data);
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        return user;
      }
      clearAuth();
      return null;
    }

    if (!res.ok) {
      clearAuth();
      return null;
    }

    const data = await res.json();
    const user = normalizeUser(data);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    return user;
  } catch {
    return getStoredUser();
  }
}

function normalizeUser(data: Record<string, unknown>): User {
  return {
    id: (data.user_id || data.id || '') as string,
    email: (data.email || '') as string,
    name: (data.name || '') as string,
    plan: (data.plan || null) as string | null,
    created_at: (data.created_at || '') as string,
  };
}

export async function checkSubscription(): Promise<{ active: boolean; plan: string | null }> {
  const token = getToken();
  if (!token) return { active: false, plan: null };

  try {
    const res = await authFetch(`${API_BASE}/billing/status`);
    if (!res.ok) return { active: false, plan: null };
    const data = await res.json();
    return { active: data.active === true, plan: data.plan || null };
  } catch {
    return { active: false, plan: null };
  }
}

export function logout(): void {
  clearAuth();
}

export function isLoggedIn(): boolean {
  return !!getToken();
}

// ── Paywall helpers ───────────────────────────────────────────────

/** Wave 1 is always free. Waves 2-8 require a subscription. */
export function isWaveFree(waveNumber: number): boolean {
  return waveNumber === 1;
}

/** Check if user can access a lesson based on the wave it belongs to */
export function canAccessLesson(waveNumber: number, plan: string | null): boolean {
  if (waveNumber === 1) return true; // Wave 1 is free for everyone
  return plan === 'school' || plan === 'pro';
}
