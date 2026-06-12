const TOKEN_KEY = "tc_token";
const COOKIE_NAME = "tc_token";
const REMEMBER_MAX_AGE_SEC = 60 * 60 * 24 * 30;

type SetTokenOptions = {
  /** Persist across browser restarts (30 days). Default true. */
  remember?: boolean;
};

export function getToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }
  return localStorage.getItem(TOKEN_KEY) ?? sessionStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string, options: SetTokenOptions = {}) {
  const remember = options.remember ?? true;

  if (remember) {
    localStorage.setItem(TOKEN_KEY, token);
    sessionStorage.removeItem(TOKEN_KEY);
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(token)}; path=/; max-age=${REMEMBER_MAX_AGE_SEC}; SameSite=Lax`;
  } else {
    sessionStorage.setItem(TOKEN_KEY, token);
    localStorage.removeItem(TOKEN_KEY);
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(token)}; path=/; SameSite=Lax`;
  }
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
  document.cookie = `${COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
}

export function getTokenFromCookie(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;
  const match = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${COOKIE_NAME}=`));

  if (!match) return null;
  return decodeURIComponent(match.slice(COOKIE_NAME.length + 1));
}
