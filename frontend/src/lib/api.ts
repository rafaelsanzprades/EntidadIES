/**
 * API configuration — centraliza la URL del backend.
 * En desarrollo usa localhost:8000, en producción usa la variable de entorno.
 */
export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/**
 * Helper para fetch con la URL base del backend.
 * @param path - Ruta relativa (ej: "/api/qms/dafo")
 * @param options - Opciones de fetch
 */
export async function apiFetch(path: string, options?: RequestInit): Promise<Response> {
  return fetch(`${API_BASE}${path}`, options);
}
