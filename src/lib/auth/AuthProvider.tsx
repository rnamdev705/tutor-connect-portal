"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi, type LoginRequest, type RegisterRequest, type User } from "@/lib/api";
import { ApiError } from "@/lib/api/errors";
import { ROUTES } from "@/lib/constants";
import { AUTH_UNAUTHORIZED_EVENT } from "./session";
import { clearToken, getToken, setToken } from "./token";

type LoginOptions = {
  remember?: boolean;
  redirectTo?: string;
};

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  login: (input: LoginRequest, options?: LoginOptions) => Promise<void>;
  register: (input: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setUser(null);
      return;
    }

    try {
      const me = await authApi.getMe();
      setUser(me);
    } catch {
      clearToken();
      setUser(null);
    }
  }, []);

  useEffect(() => {
    refreshUser().finally(() => setLoading(false));
  }, [refreshUser]);

  useEffect(() => {
    function onUnauthorized() {
      setUser(null);
      queryClient.clear();
      const path = typeof window !== "undefined" ? window.location.pathname : "";
      if (path !== ROUTES.login && path !== ROUTES.register) {
        router.push(`${ROUTES.login}?session=expired`);
      }
    }

    window.addEventListener(AUTH_UNAUTHORIZED_EVENT, onUnauthorized);
    return () => window.removeEventListener(AUTH_UNAUTHORIZED_EVENT, onUnauthorized);
  }, [router, queryClient]);

  const login = useCallback(
    async (input: LoginRequest, options: LoginOptions = {}) => {
      const result = await authApi.login(input);
      setToken(result.token, { remember: options.remember ?? true });
      const me = await authApi.getMe();
      setUser(me);
      router.push(options.redirectTo ?? ROUTES.dashboard);
    },
    [router],
  );

  const register = useCallback(
    async (input: RegisterRequest) => {
      const result = await authApi.register(input);
      setToken(result.token, { remember: true });
      const me = await authApi.getMe();
      setUser(me);
      router.push(input.role === "TUTOR" ? ROUTES.profile : ROUTES.dashboard);
    },
    [router],
  );

  const logout = useCallback(async () => {
    try {
      if (getToken()) {
        await authApi.logout();
      }
    } catch {
      // stateless logout — still clear client session
    } finally {
      clearToken();
      setUser(null);
      queryClient.clear();
      router.push(ROUTES.login);
    }
  }, [router, queryClient]);

  const value = useMemo(
    () => ({ user, loading, login, register, logout, refreshUser }),
    [user, loading, login, register, logout, refreshUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}

export function getAuthErrorMessage(error: unknown) {
  if (error instanceof ApiError) {
    if (error.code === "INVALID_CREDENTIALS") {
      return "Invalid email or password for the selected role.";
    }
    if (error.code === "EMAIL_TAKEN") {
      return "An account with this email already exists.";
    }
    return error.message;
  }
  if (error instanceof TypeError && error.message.includes("fetch")) {
    return "Cannot reach the API. Make sure the backend is running.";
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "Something went wrong. Please try again.";
}
