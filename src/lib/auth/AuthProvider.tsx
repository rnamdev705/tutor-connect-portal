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
import { clearToken, getToken, setToken } from "./token";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  login: (input: LoginRequest) => Promise<void>;
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

  const login = useCallback(
    async (input: LoginRequest) => {
      const result = await authApi.login(input);
      setToken(result.token);
      const me = await authApi.getMe();
      setUser(me);
      router.push(ROUTES.dashboard);
    },
    [router],
  );

  const register = useCallback(
    async (input: RegisterRequest) => {
      const result = await authApi.register(input);
      setToken(result.token);
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
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "Something went wrong. Please try again.";
}
