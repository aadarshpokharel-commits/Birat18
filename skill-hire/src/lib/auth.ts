// Authentication helper functions for SkillHire

export type Role = "customer" | "worker" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

const KEY = "skillhire.auth";

/**
 * Returns the currently logged-in user from localStorage.
 */
export function getUser(): User | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

/**
 * Saves the authenticated user.
 */
export function setUser(user: User) {
  localStorage.setItem(KEY, JSON.stringify(user));
  window.dispatchEvent(new Event("skillhire:auth"));
}

/**
 * Removes the authenticated user.
 */
export function logout() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("skillhire:auth"));
}

/**
 * Returns the correct dashboard route.
 */
export function dashboardPath(role: Role) {
  return role === "admin"
    ? "/dashboard/admin"
    : role === "worker"
      ? "/dashboard/worker"
      : "/dashboard/customer";
}
