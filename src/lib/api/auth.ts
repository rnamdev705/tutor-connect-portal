import { apiRequest } from "./client";
import type { LoginRequest, LoginResponse, User } from "./types";

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
