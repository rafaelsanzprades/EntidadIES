"use client";
import React, { useState, useEffect } from "react";
import {
  Briefcase,
  BarChart2,
  List,
  TrendingUp,
  Euro,
  Users,
  Activity,
  Calendar,
  MapPin,
  Wrench,
  BookOpen,
  Megaphone,
  Target,
  MessageSquare,
  ExternalLink,
} from "lucide-react";
import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { ApeActividadCard } from "./ApeActividadCard";
import {
  ApePrograma,
  ApeActividad,
  getApeProgramas,
  getApeCursosDisponibles,
  calcularPresupuestoTotal,
  calcularAlumnadoTotal,
  TIPO_LABELS,
} from "@/services/apeService";

const TABS = [
  { id: "resumen", label: "Resumen", icon: BarChart2 },
  { id: "actividades", label: "Actividades", icon: List },
  { id: "evolucion", label: "Evolución", icon: TrendingUp },
] as const;

type TabId = (typeof TABS)[number]["id"];

const TIPO_ICONS: Record<string, React.ElementType> = {
  visita_empresa: MapPin,
  visita_institucional: Target,
  taller: Wrench,
  charla: MessageSquare,
  evento: Megaphone,
  curso: BookOpen,
};

export function ApeView({ currentView }: { currentView: string }) {
  const [cursos, setCursos] = useState<string[]>([]);
  const [programas, setProgramas] = useState<ApePrograma[]>([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const [cursosData, programasData] = await Promise.all([
          getApeCursosDisponibles(),
          getApeProgramas(),
        ]);
        setCursos(cursosData);
        setProgramas(programasData);
        if (cursosData.length > 0) setCursoSeleccionado(cursosData[0]);
      } catch (e) {
        setError("No se pudieron cargar los datos del APE. Asegúrate de que el servidor está en marcha.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const programaActual = programas.find((p) => p.curso_academico === cursoSeleccionado);
  const actividades: ApeActividad[] = programaActual?.actividades ?? [];

  const presupuesto = calcularPresupuestoTotal(actividades);
  const alumnadoTotal = calcularAlumnadoTotal(actividades);

  // Conteo por tipo
  const porTipo: Record<string, number> = {};
  actividades.forEach((a) => {
    const t = a.tipo ?? "otro";
    porTipo[t] = (porTipo[t] ?? 0) + 1;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-muted">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
          <span className="text-sm">Cargando datos APE…</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-muted">
        <div className="flex flex-col items-center gap-3 text-center max-w-md">
          <Activity className="w-10 h-10 text-muted/30" />
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Selector de curso */}
      {cursos.length > 0 && (
        <div className="flex justify-end">
          <div className="bg-card border border-[var(--glass-border)] rounded-xl p-1.5 flex items-center gap-3 pr-2 shadow-sm">
            <span className="text-sm font-semibold text-muted ml-3">Curso académico:</span>
            <select
              value={cursoSeleccionado}
              onChange={(e) => setCursoSeleccionado(e.target.value)}
              className="bg-muted/10 border-none text-foreground text-sm font-bold rounded-lg px-3 py-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/50 transition-colors"
            >
              {cursos.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Tab: RESUMEN */}
      {currentView === "resumen" && (
        <MotionWrapper className="space-y-6">
          {/* KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                label: "Actividades",
                value: actividades.length,
                icon: Calendar,
                color: "text-accent bg-accent/10 border-accent/20",
              },
              {
                label: "Presupuesto total",
                value: `${presupuesto.toLocaleString("es-ES", { minimumFractionDigits: 0, maximumFractionDigits: 0 })} €`,
                icon: Euro,
                color: "text-green-600 bg-green-500/10 border-green-500/20",
              },
              {
                label: "Participaciones totales",
                value: alumnadoTotal,
                icon: Users,
                color: "text-blue-600 bg-blue-500/10 border-blue-500/20",
              },
              {
                label: "Cursos disponibles",
                value: cursos.length,
                icon: Activity,
                color: "text-purple-600 bg-purple-500/10 border-purple-500/20",
              },
            ].map(({ label, value, icon: Icon, color }) => (
              <div
                key={label}
                className="bg-card border border-[var(--glass-border)] rounded-2xl p-5 flex flex-col gap-3"
              >
                <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-foreground">{value}</p>
                  <p className="text-xs text-muted mt-0.5">{label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tabla de resumen de actividades */}
          <div className="bg-card border border-[var(--glass-border)] rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-[var(--glass-border)] flex items-center gap-2">
              <List className="w-5 h-5 text-accent" />
              <h3 className="font-bold text-foreground">Resumen de actividades — {cursoSeleccionado}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--glass-border)] bg-muted/5">
                    <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted">#</th>
                    <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted">Actividad</th>
                    <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted hidden md:table-cell">Tipo</th>
                    <th className="text-right px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted hidden sm:table-cell">Alumnado</th>
                    <th className="text-right px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted">Coste</th>
                  </tr>
                </thead>
                <tbody>
                  {actividades.map((act, i) => {
                    const Icon = TIPO_ICONS[act.tipo ?? ""] ?? Target;
                    const alumnosMatch = act.num_alumnos?.match(/Total\s*(\d+)/i);
                    const alumnos = alumnosMatch?.[1] ?? "—";
                    return (
                      <tr
                        key={act.id}
                        className={`border-b border-[var(--glass-border)] hover:bg-muted/5 transition-colors ${
                          i === actividades.length - 1 ? "border-b-0" : ""
                        }`}
                      >
                        <td className="px-4 py-3 text-muted font-mono text-xs">{act.numero}</td>
                        <td className="px-4 py-3 font-medium text-foreground/90 max-w-xs">{act.nombre}</td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <span className="inline-flex items-center gap-1 text-xs text-muted">
                            <Icon className="w-3.5 h-3.5" />
                            {TIPO_LABELS[act.tipo ?? ""] ?? act.tipo}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right text-muted font-mono text-xs hidden sm:table-cell">{alumnos}</td>
                        <td className="px-4 py-3 text-right font-semibold text-green-600 text-sm">
                          {act.recursos_economicos ?? "—"}
                        </td>
                      </tr>
                    );
                  })}
                  {/* Total row */}
                  <tr className="bg-muted/5 font-bold">
                    <td colSpan={4} className="px-4 py-3 text-right text-sm text-foreground hidden sm:table-cell">Total presupuesto:</td>
                    <td colSpan={4} className="px-4 py-3 text-right text-sm text-foreground sm:hidden">Total:</td>
                    <td className="px-4 py-3 text-right text-green-600 text-sm">
                      {presupuesto.toLocaleString("es-ES", { minimumFractionDigits: 1 })} €
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Distribución por tipo */}
          {Object.keys(porTipo).length > 0 && (
            <div className="bg-card border border-[var(--glass-border)] rounded-2xl p-6">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-accent" /> Distribución por tipo
              </h3>
              <div className="flex flex-wrap gap-3">
                {Object.entries(porTipo).map(([tipo, count]) => {
                  const Icon = TIPO_ICONS[tipo] ?? Target;
                  return (
                    <div key={tipo} className="flex items-center gap-2 bg-background border border-[var(--glass-border)] rounded-xl px-4 py-2.5">
                      <Icon className="w-4 h-4 text-muted" />
                      <span className="text-sm font-semibold text-foreground">{TIPO_LABELS[tipo] ?? tipo}</span>
                      <span className="text-xs text-muted bg-muted/10 rounded-full w-5 h-5 flex items-center justify-center font-bold">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </MotionWrapper>
      )}

      {/* Tab: ACTIVIDADES */}
      {currentView === "actividades" && (
        <MotionWrapper className="space-y-3">
          {actividades.length === 0 ? (
            <div className="text-center py-16 text-muted">
              <List className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No hay actividades para el curso {cursoSeleccionado}</p>
            </div>
          ) : (
            actividades.map((act) => (
              <ApeActividadCard key={act.id} actividad={act} />
            ))
          )}
        </MotionWrapper>
      )}

      {/* Tab: EVOLUCION */}
      {currentView === "evolucion" && (
        <MotionWrapper className="space-y-6">
          {cursos.length < 2 ? (
            <div className="bg-card border border-[var(--glass-border)] rounded-2xl p-10 text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-3 text-muted/30" />
              <h3 className="font-bold text-foreground mb-2">Análisis de evolución</h3>
              <p className="text-sm text-muted max-w-md mx-auto">
                Cuando haya datos de más de un curso académico, aquí aparecerá la comparativa de actividades, presupuesto y alumnado impactado año a año.
              </p>
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted border border-dashed border-muted/20 rounded-xl py-6 px-8 max-w-sm mx-auto">
                <Calendar className="w-4 h-4" />
                <span>Próximos datos: curso 2025-26</span>
              </div>
            </div>
          ) : (
            <div className="bg-card border border-[var(--glass-border)] rounded-2xl p-6">
              <h3 className="font-bold text-foreground mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent" /> Evolución por curso
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--glass-border)]">
                      <th className="text-left px-3 py-2 text-xs font-bold uppercase tracking-wider text-muted">Curso</th>
                      <th className="text-right px-3 py-2 text-xs font-bold uppercase tracking-wider text-muted">Actividades</th>
                      <th className="text-right px-3 py-2 text-xs font-bold uppercase tracking-wider text-muted">Presupuesto</th>
                      <th className="text-right px-3 py-2 text-xs font-bold uppercase tracking-wider text-muted">Participaciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {programas.map((prog) => {
                      const presup = calcularPresupuestoTotal(prog.actividades);
                      const alumn = calcularAlumnadoTotal(prog.actividades);
                      return (
                        <tr key={prog.curso_academico} className="border-b border-[var(--glass-border)] hover:bg-muted/5">
                          <td className="px-3 py-3 font-semibold text-foreground">{prog.curso_academico}</td>
                          <td className="px-3 py-3 text-right text-muted">{prog.actividades.length}</td>
                          <td className="px-3 py-3 text-right font-semibold text-green-600">
                            {presup.toLocaleString("es-ES")} €
                          </td>
                          <td className="px-3 py-3 text-right text-muted">{alumn}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </MotionWrapper>
      )}
    </div>
  );
}
