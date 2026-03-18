"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { login, logout, register, getMe, isAuthenticated } from "@/lib/auth";
import type { LoginPayload, RegisterPayload, User } from "@/types";

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ── Fetch current user on mount ──────────────────────────────────────────
  useEffect(() => {
    if (!isAuthenticated()) {
      setLoading(false);
      return;
    }
    getMe()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  // ── Login ────────────────────────────────────────────────────────────────
  const handleLogin = useCallback(
    async (payload: LoginPayload) => {
      setError(null);
      setLoading(true);
      try {
        const res = await login(payload);
        setUser(res.user);
        router.push("/dashboard");
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Login failed.";
        setError(msg);
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  // ── Register ─────────────────────────────────────────────────────────────
  const handleRegister = useCallback(
    async (payload: RegisterPayload) => {
      setError(null);
      setLoading(true);
      try {
        const res = await register(payload);
        setUser(res.user);
        router.push("/dashboard");
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Registration failed.";
        setError(msg);
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  // ── Logout ───────────────────────────────────────────────────────────────
  const handleLogout = useCallback(async () => {
    await logout();
    setUser(null);
    router.push("/auth/login");
  }, [router]);

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  };
}
