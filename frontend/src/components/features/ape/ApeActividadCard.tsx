"use client";
import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Target,
  BookOpen,
  Wrench,
  Euro,
  Users,
  Megaphone,
  MessageSquare,
} from "lucide-react";
import { ApeActividad, TIPO_LABELS, TIPO_COLORS } from "@/services/apeService";

interface ApeActividadCardProps {
  actividad: ApeActividad;
}

const TIPO_ICONS: Record<string, React.ElementType> = {
  visita_empresa: Target,
  visita_institucional: Target,
  taller: Wrench,
  charla: MessageSquare,
  evento: Megaphone,
  curso: BookOpen,
};

export function ApeActividadCard({ actividad }: ApeActividadCardProps) {
  const [open, setOpen] = useState(false);

  const tipo = actividad.tipo || "evento";
  const tipoLabel = TIPO_LABELS[tipo] ?? tipo;
  const tipoColor = TIPO_COLORS[tipo] ?? "bg-muted/10 text-muted border-muted/20";
  const TipoIcon = TIPO_ICONS[tipo] ?? Target;

  return (
    <div className={`bg-card border border-[var(--glass-border)] rounded-2xl overflow-hidden transition-all duration-300 ${open ? "shadow-lg" : "hover:shadow-md hover:-translate-y-0.5"}`}>
      {/* Header — siempre visible */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start gap-4 p-5 text-left group"
        aria-expanded={open}
      >
        {/* Número */}
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center font-bold text-accent text-lg">
          {actividad.numero}
        </div>

        {/* Título y tipo */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-foreground leading-snug group-hover:text-accent transition-colors">
            {actividad.nombre}
          </h3>
          <div className="flex flex-wrap items-center gap-2 mt-1.5">
            <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full border ${tipoColor}`}>
              <TipoIcon className="w-3 h-3" />
              {tipoLabel}
            </span>
            {actividad.recursos_economicos && actividad.recursos_economicos !== "0€" && (
              <span className="inline-flex items-center gap-1 text-xs text-muted bg-muted/10 px-2.5 py-0.5 rounded-full border border-muted/10">
                <Euro className="w-3 h-3" />
                {actividad.recursos_economicos}
              </span>
            )}
            {actividad.num_actuaciones > 1 && (
              <span className="text-xs text-muted bg-muted/10 px-2.5 py-0.5 rounded-full border border-muted/10">
                {actividad.num_actuaciones} actuaciones
              </span>
            )}
          </div>
        </div>

        {/* Alumnado */}
        {actividad.num_alumnos && (
          <div className="hidden md:flex flex-col items-end flex-shrink-0 text-right">
            <span className="text-xs text-muted">Alumnado</span>
            <span className="text-sm font-bold text-foreground">
              {actividad.num_alumnos.match(/Total\s*(\d+)/i)?.[1] ?? "—"}
            </span>
          </div>
        )}

        {/* Chevron */}
        <div className="flex-shrink-0 text-muted mt-1">
          {open ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      {/* Contenido expandido */}
      {open && (
        <div className="border-t border-[var(--glass-border)] p-5 space-y-5 bg-background/40">
          {/* Grid de 2 columnas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Objetivos */}
            {actividad.objetivos.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-accent mb-2 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5" /> Objetivos generales
                </h4>
                <ul className="space-y-1.5">
                  {actividad.objetivos.map((obj, i) => (
                    <li key={i} className="text-sm text-foreground/80 flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent/60 flex-shrink-0" />
                      {obj}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Contenidos */}
            {actividad.contenidos.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" /> Contenidos
                </h4>
                <ul className="space-y-1.5">
                  {actividad.contenidos.map((c, i) => (
                    <li key={i} className="text-sm text-foreground/80 flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400/60 flex-shrink-0" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Fila inferior: recursos + indicadores + reuniones */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-3 border-t border-[var(--glass-border)]">

            {/* Recursos */}
            <div className="space-y-1">
              <h4 className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-2 flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5" /> Recursos
              </h4>
              {actividad.recursos_materiales && (
                <p className="text-xs text-muted leading-relaxed">
                  <span className="font-semibold text-foreground/70">Materiales:</span> {actividad.recursos_materiales}
                </p>
              )}
              {actividad.recursos_economicos && (
                <p className="text-xs text-muted mt-1">
                  <span className="font-semibold text-foreground/70">Económicos:</span>{" "}
                  <span className="text-green-600 font-bold">{actividad.recursos_economicos}</span>
                </p>
              )}
            </div>

            {/* Alumnado e indicadores */}
            <div className="space-y-1">
              <h4 className="text-xs font-bold uppercase tracking-widest text-purple-500 mb-2 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" /> Alumnado
              </h4>
              {actividad.num_alumnos && (
                <p className="text-xs text-foreground/80 leading-relaxed">{actividad.num_alumnos}</p>
              )}
              {actividad.indicadores_difusion.length > 0 && (
                <p className="text-xs text-muted mt-1">
                  <span className="font-semibold text-foreground/70">Difusión:</span>{" "}
                  {actividad.indicadores_difusion.join(", ")}
                </p>
              )}
            </div>

            {/* Reuniones */}
            <div className="space-y-1">
              <h4 className="text-xs font-bold uppercase tracking-widest text-teal-500 mb-2 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" /> Coordinación
              </h4>
              {actividad.reuniones_preparacion && (
                <p className="text-xs text-muted leading-relaxed">
                  <span className="font-semibold text-foreground/70">Internas:</span> {actividad.reuniones_preparacion}
                </p>
              )}
              {actividad.reuniones_externas && (
                <p className="text-xs text-muted mt-1 leading-relaxed">
                  <span className="font-semibold text-foreground/70">Externas:</span> {actividad.reuniones_externas}
                </p>
              )}
            </div>
          </div>

          {/* Observaciones */}
          {actividad.observaciones && (
            <div className="bg-accent/5 border border-accent/10 rounded-xl px-4 py-3">
              <p className="text-xs text-foreground/70 italic">{actividad.observaciones}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
