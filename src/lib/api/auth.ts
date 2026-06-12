import { apiRequest } from "./client";
import type { LoginRequest, LoginResponse, RegisterRequest, User } from "./types";

export function register(input: RegisterRequest) {
  return apiRequest<LoginResponse>("/auth/register", {
    method: "POST",
    body: input,
    auth: false,
  });
}

export function login(input: LoginRequest) {
  return apiRequest<LoginResponse>("/auth/login", {
    method: "POST",
    body: input,
    auth: false,
  });
}

export function logout() {
  return apiRequest<void>("/auth/logout", { method: "POST" });
}

export function getMe() {
  return apiRequest<User>("/auth/me");
}
