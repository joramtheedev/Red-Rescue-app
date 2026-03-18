/**
 * resources.ts
 * A fully typed CRUD service for a generic "Resource".
 * Duplicate this file and rename for each entity in your contest app.
 */

import { del, get, patch, post, put } from "@/lib/apiClient";
import type {
  ApiResponse,
  CreateResourcePayload,
  PaginatedResponse,
  Resource,
  UpdateResourcePayload,
} from "@/types";

const BASE = "/resources"; // ← change this per entity

// ─── List (paginated) ────────────────────────────────────────────────────────
export function getResources(page = 1, limit = 10): Promise<PaginatedResponse<Resource>> {
  return get<PaginatedResponse<Resource>>(BASE, { page, limit });
}

// ─── Single ───────────────────────────────────────────────────────────────────
export function getResource(id: string | number): Promise<Resource> {
  return get<Resource>(`${BASE}/${id}`);
}

// ─── Create ───────────────────────────────────────────────────────────────────
export function createResource(payload: CreateResourcePayload): Promise<ApiResponse<Resource>> {
  return post<ApiResponse<Resource>>(BASE, payload);
}

// ─── Full update ──────────────────────────────────────────────────────────────
export function updateResource(
  id: string | number,
  payload: UpdateResourcePayload
): Promise<ApiResponse<Resource>> {
  return put<ApiResponse<Resource>>(`${BASE}/${id}`, payload);
}

// ─── Partial update ───────────────────────────────────────────────────────────
export function patchResource(
  id: string | number,
  payload: Partial<UpdateResourcePayload>
): Promise<ApiResponse<Resource>> {
  return patch<ApiResponse<Resource>>(`${BASE}/${id}`, payload);
}

// ─── Delete ───────────────────────────────────────────────────────────────────
export function deleteResource(id: string | number): Promise<ApiResponse<null>> {
  return del<ApiResponse<null>>(`${BASE}/${id}`);
}
