// ─── Auth ────────────────────────────────────────────────────────────────────
export interface User {
  id: string | number;
  name: string;
  email: string;
  role?: string;
  createdAt?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// ─── API Utilities ───────────────────────────────────────────────────────────
export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  status?: number;
  errors?: Record<string, string[]>;
}

// ─── Example Resource (rename/extend for your contest domain) ────────────────
export interface Resource {
  id: string | number;
  title: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateResourcePayload {
  title: string;
  description?: string;
}

export interface UpdateResourcePayload {
  title?: string;
  description?: string;
}
