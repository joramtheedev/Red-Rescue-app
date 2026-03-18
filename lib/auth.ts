import Cookies from "js-cookie";
import { post } from "./apiClient";
import type { AuthResponse, LoginPayload, RegisterPayload, User } from "@/types";

const TOKEN_KEY = "token";

// ─── Auth API calls ───────────────────────────────────────────────────────────
export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const data = await post<AuthResponse>("/auth/login", payload);
  Cookies.set(TOKEN_KEY, data.token, { expires: 7, sameSite: "strict" });
  return data;
}

export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  const data = await post<AuthResponse>("/auth/register", payload);
  Cookies.set(TOKEN_KEY, data.token, { expires: 7, sameSite: "strict" });
  return data;
}

export async function logout(): Promise<void> {
  try {
    await post("/auth/logout");
  } catch {
    // silently fail — always clear local state
  } finally {
    Cookies.remove(TOKEN_KEY);
  }
}

export async function getMe(): Promise<User> {
  const { get } = await import("./apiClient");
  return get<User>("/auth/me");
}

// ─── Token helpers ────────────────────────────────────────────────────────────
export function getToken(): string | undefined {
  return Cookies.get(TOKEN_KEY);
}

export function isAuthenticated(): boolean {
  return !!getToken();
}
