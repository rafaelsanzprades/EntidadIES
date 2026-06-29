import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { fetcher } from '@/services/api';
import { ModuleData, CursoData, ModuleDataSchema, CursoDataSchema } from '@/types';

export function useModule(moduleId: string | null) {
  const { data, error, isLoading, mutate } = useSWR(moduleId ? `${process.env.NEXT_PUBLIC_API_URL}/api/module/${moduleId}` : null, fetcher);
  
  // Opcional: Validar con Zod en tiempo de ejecución
  let parsedData: ModuleData | null = null;
  if (data) {
    try {
      parsedData = ModuleDataSchema.parse(data);
    } catch (e) {
      console.warn("Module data validation failed", e);
      parsedData = data as ModuleData; // Fallback
    }
  }

  return {
    moduleData: parsedData,
    isLoading,
    isError: error,
    mutate
  };
}

export function useCurso(cursoId: string | null) {
  const { data, error, isLoading, mutate } = useSWR(cursoId ? `${process.env.NEXT_PUBLIC_API_URL}/api/module/${cursoId}` : null, fetcher);

  let parsedData: CursoData | null = null;
  if (data) {
    try {
      parsedData = CursoDataSchema.parse(data);
    } catch (e) {
      console.warn("Curso data validation failed", e);
      parsedData = data as CursoData; // Fallback
    }
  }

  return {
    cursoData: parsedData,
    isLoading,
    isError: error,
    mutate
  };
}

export function useUsers() {
  return useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, fetcher);
}

export function useAssignments() {
  return useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/assignments`, fetcher);
}

export const saveAssignments = async (userId: string, courseGroupIds: number[]) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/assignments/${userId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ course_group_ids: courseGroupIds })
  });
  const json = await res.json();
  if (json.status !== 'success') {
    throw new Error(json.message || 'Error guardando asignaciones');
  }
  return json;
};
