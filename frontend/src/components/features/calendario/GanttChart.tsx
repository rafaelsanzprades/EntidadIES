"use client";

import React, { useState, useEffect } from "react";
import { Calendar, User, Tag } from "lucide-react";
import { API_BASE } from "@/lib/api";

const MONTHS = [
  { id: 9, name: "Sep", label: "Septiembre" },
  { id: 10, name: "Oct", label: "Octubre" },
  { id: 11, name: "Nov", label: "Noviembre" },
  { id: 12, name: "Dic", label: "Diciembre" },
  { id: 1, name: "Ene", label: "Enero" },
  { id: 2, name: "Feb", label: "Febrero" },
  { id: 3, name: "Mar", label: "Marzo" },
  { id: 4, name: "Abr", label: "Abril" },
  { id: 5, name: "May", label: "Mayo" },
  { id: 6, name: "Jun", label: "Junio" },
];

function parseTemporalizacion(texto: string): { startIdx: number, endIdx: number } {
  if (!texto) return { startIdx: 0, endIdx: 9 }; // Default to all year
  
  const t = texto.toLowerCase();
  
  // Trimesters
  if (t.includes("primer trimestre") || t.includes("1er trimestre") || t.includes("1º trimestre") || t.includes("1r trimestre") || t.includes("1 trimestre") || t.includes("1t")) {
    return { startIdx: 0, endIdx: 3 }; // Sep to Dec
  }
  if (t.includes("segundo trimestre") || t.includes("2º trimestre") || t.includes("2o trimestre") || t.includes("2 trimestre") || t.includes("2t")) {
    return { startIdx: 4, endIdx: 6 }; // Jan to Mar
  }
  if (t.includes("tercer trimestre") || t.includes("3er trimestre") || t.includes("3º trimestre") || t.includes("3 trimestre") || t.includes("3t")) {
    return { startIdx: 7, endIdx: 9 }; // Apr to Jun
  }
  
  // Specific months
  const monthMap: Record<string, number> = {
    "sep": 0, "oct": 1, "nov": 2, "dic": 3,
    "ene": 4, "feb": 5, "mar": 6, "abr": 7, "may": 8, "jun": 9
  };
  
  let startIdx = 0;
  let endIdx = 9;
  let foundStart = false;
  
  for (const [key, val] of Object.entries(monthMap)) {
    if (t.includes(key)) {
      if (!foundStart) {
        startIdx = val;
        endIdx = val;
        foundStart = true;
      } else {
        // If multiple months mentioned, span to the last one
        if (val > endIdx) endIdx = val;
      }
    }
  }
  
  return { startIdx, endIdx };
}

export function GanttChart() {
  const [activities, setActivities] = useState<any[]>([]);
  const [objectives, setObjectives] = useState<any[]>([]);
  const [actors, setActors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [actRes, objRes, actActorRes] = await Promise.all([
          fetch(`${API_BASE}/api/qms/activities`),
          fetch(`${API_BASE}/api/qms/objectives`),
          fetch(`${API_BASE}/api/qms/actors`)
        ]);
        setActivities(await actRes.json());
        setObjectives(await objRes.json());
        setActors(await actActorRes.json());
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-muted">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          <span className="text-sm">Cargando calendario…</span>
        </div>
      </div>
    );
  }

  const getStatusColor = (estado: string) => {
    switch(estado) {
      case "planificada": return "bg-blue-500";
      case "en_proceso": return "bg-amber-500";
      case "completada": return "bg-green-500";
      case "cancelada": return "bg-red-500";
      default: return "bg-muted";
    }
  };

  return (
    <div className="bg-card border border-[var(--glass-border)] rounded-2xl overflow-hidden overflow-x-auto shadow-sm">
      <div className="min-w-[800px]">
        {/* Header (Months) */}
        <div className="grid grid-cols-[300px_repeat(10,1fr)] border-b border-[var(--glass-border)] bg-muted/10 text-xs font-semibold text-muted">
          <div className="p-4 border-r border-[var(--glass-border)] flex items-center">
            Actividad / Tarea
          </div>
          {MONTHS.map((m) => (
            <div key={m.id} className="p-3 text-center border-r border-[var(--glass-border)] last:border-r-0">
              {m.name}
            </div>
          ))}
        </div>

        {/* Body (Activities) */}
        <div className="divide-y divide-[var(--glass-border)]">
          {activities.length === 0 ? (
            <div className="p-10 text-center text-muted text-sm">
              No hay actividades para mostrar en el calendario.
            </div>
          ) : (
            activities.map(act => {
              const { startIdx, endIdx } = parseTemporalizacion(act.temporalizacion || "");
              const colStart = startIdx + 2; // +2 because column 1 is the name, so month 0 is col 2
              const colSpan = (endIdx - startIdx) + 1;
              const resp = actors.find(a => a.id === act.responsable_actor_id);
              const obj = objectives.find(o => o.id === act.objective_id);

              return (
                <div key={act.id} className="grid grid-cols-[300px_repeat(10,1fr)] group hover:bg-muted/5 transition-colors">
                  {/* Left Column: Info */}
                  <div className="p-4 border-r border-[var(--glass-border)] flex flex-col justify-center">
                    <p className="font-semibold text-sm text-foreground line-clamp-2" title={act.nombre}>{act.nombre}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted">
                      <span className="flex items-center gap-1" title="Responsable">
                        <User className="w-3 h-3" /> {resp ? resp.nombre : "-"}
                      </span>
                      {act.temporalizacion && (
                        <span className="flex items-center gap-1 text-primary/70" title="Temporalización Original">
                          <Calendar className="w-3 h-3" /> {act.temporalizacion}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Gantt Timeline */}
                  <div className="col-span-10 grid grid-cols-10 relative">
                    {/* Background grid lines */}
                    {MONTHS.map((_, i) => (
                      <div key={i} className="border-r border-[var(--glass-border)] h-full opacity-30 last:border-r-0" />
                    ))}
                    
                    {/* The Bar */}
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 h-8 rounded-md shadow-sm transition-all flex items-center px-3"
                      style={{ 
                        gridColumn: `${startIdx + 1} / span ${colSpan}`,
                        left: '4px',
                        right: '4px'
                      }}
                    >
                      <div className={`w-full h-full rounded-md opacity-80 group-hover:opacity-100 ${getStatusColor(act.estado)}`} />
                      <span className="absolute left-3 text-xs font-bold text-white drop-shadow-md truncate max-w-[calc(100%-20px)] pointer-events-none">
                        {act.estado.replace("_", " ").toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      
      {/* Legend */}
      <div className="p-4 bg-muted/5 border-t border-[var(--glass-border)] flex gap-4 text-xs font-medium text-muted">
        <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-blue-500"></div> Planificada</span>
        <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-amber-500"></div> En Proceso</span>
        <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-green-500"></div> Completada</span>
        <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-red-500"></div> Cancelada</span>
      </div>
    </div>
  );
}
