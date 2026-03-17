const ADMIN_PASSWORD = "bluewave2026";
const AUTH_KEY = "bluewave_admin_auth";

export function checkAuth(): boolean {
  if (typeof window === "undefined") return false;
  const session = localStorage.getItem(AUTH_KEY);
  if (!session) return false;
  try {
    const parsed = JSON.parse(session);
    // Session expires after 24 hours
    if (Date.now() - parsed.timestamp > 24 * 60 * 60 * 1000) {
      localStorage.removeItem(AUTH_KEY);
      return false;
    }
    return parsed.authenticated === true;
  } catch {
    return false;
  }
}

export function login(password: string): boolean {
  if (password === ADMIN_PASSWORD) {
    localStorage.setItem(
      AUTH_KEY,
      JSON.stringify({
        authenticated: true,
        timestamp: Date.now(),
      })
    );
    return true;
  }
  return false;
}

export function logout(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_KEY);
}
