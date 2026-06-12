/** Client-side auth session events (token expiry / 401 from API). */

export const AUTH_UNAUTHORIZED_EVENT = "tc:auth-unauthorized";

export function notifyUnauthorized() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(AUTH_UNAUTHORIZED_EVENT));
}
