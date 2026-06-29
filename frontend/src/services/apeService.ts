/**
 * apeService.ts — Cliente API para el módulo APE (Aula Profesional de Emprendimiento).
 * Consulta los endpoints /ape/* del backend.
 */

import { API_BASE } from "@/lib/api";

export interface ApeActividad {
  id: number;
  numero: number;
  nombre: string;
  tipo: string | null;
  objetivos: string[];
  actividades_posibles: string[];
  contenidos: string[];
  recursos_materiales: string | null;
  recursos_economicos: string | null;
  num_alumnos: string | null;
  num_actuaciones: number;
  indicadores_difusion: string[];
  reuniones_preparacion: string | null;
  reuniones_externas: string | null;
  observaciones: string | null;
}

export interface ApePrograma {
  id: number;
  curso_academico: string;
  nombre: string;
  descripcion: string | null;
  actividades: ApeActividad[];
}

export async function getApeProgramas(): Promise<ApePrograma[]> {
  const res = await fetch(`${API_BASE}/ape/programas`);
  if (!res.ok) throw new Error("Error cargando programas APE");
  return res.json();
}

export async function getApeProgramaByCurso(curso: string): Promise<ApePrograma> {
  const res = await fetch(`${API_BASE}/ape/programas/${encodeURIComponent(curso)}`);
  if (!res.ok) throw new Error(`Error cargando programa APE ${curso}`);
  return res.json();
}

export async function getApeCursosDisponibles(): Promise<string[]> {
  const res = await fetch(`${API_BASE}/ape/cursos`);
  if (!res.ok) throw new Error("Error cargando cursos APE");
  return res.json();
}

/** Calcula el total del presupuesto de un programa a partir de sus actividades */
export function calcularPresupuestoTotal(actividades: ApeActividad[]): number {
  return actividades.reduce((sum, act) => {
    if (!act.recursos_economicos) return sum;
    const match = act.recursos_economicos.match(/[\d.,]+/);
    if (!match) return sum;
    const val = parseFloat(match[0].replace(",", "."));
    return sum + (isNaN(val) ? 0 : val);
  }, 0);
}

/** Devuelve el número total de alumnado impactado (suma aproximada) */
export function calcularAlumnadoTotal(actividades: ApeActividad[]): number {
  const seen = new Set<number>();
  return actividades.reduce((sum, act) => {
    if (!act.num_alumnos) return sum;
    const match = act.num_alumnos.match(/Total\s*(\d+)/i);
    if (match) {
      const n = parseInt(match[1]);
      seen.add(n);
      return sum + n;
    }
    return sum;
  }, 0);
}

/** Etiqueta legible del tipo de actividad */
export const TIPO_LABELS: Record<string, string> = {
  visita_empresa: "Visita a empresa",
  visita_institucional: "Visita institucional",
  taller: "Taller",
  charla: "Charla",
  evento: "Evento",
  curso: "Curso",
};

/** Color badge por tipo */
export const TIPO_COLORS: Record<string, string> = {
  visita_empresa: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  visita_institucional: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  taller: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  charla: "bg-teal-500/10 text-teal-600 border-teal-500/20",
  evento: "bg-rose-500/10 text-rose-600 border-rose-500/20",
  curso: "bg-green-500/10 text-green-600 border-green-500/20",
};
