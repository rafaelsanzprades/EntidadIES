"use client";
import React, { useState, useEffect } from "react";
import { AlertTriangle, ShieldAlert, Plus } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { DriveFileViewer } from "@/components/common/DriveFileViewer";
import { API_BASE } from "@/lib/api";

export default function RiesgosPage() {
  const [riesgos, setRiesgos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${API_BASE}/api/qms/riesgos`);
        if (res.ok) {
          setRiesgos(await res.json());
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const numRiesgosCriticos = riesgos.filter(r => r.tipo === "Riesgo" && r.estado !== "Cerrado" && r.nivel_riesgo && r.nivel_riesgo >= 15).length;
  const numOportunidadesEnCurso = riesgos.filter(r => r.tipo === "Oportunidad" && r.estado !== "Cerrada").length;

  return (
    <PageLayout
      icon={<AlertTriangle className="w-6 h-6" />}
      title="Matriz de Riesgos y Oportunidades"
      description="Análisis de contexto, partes interesadas y acciones de mitigación del SGC."
      infoTitle="Riesgos"
      infoDescription="Gestiona la matriz de riesgos y oportunidades del sistema."
      breadcrumbSuffix="Riesgos"
    >
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 h-full min-h-0">
        {/* Left Panel: UI Summary */}
        <div className="md:col-span-1 bg-card border border-[var(--glass-border)] rounded-2xl p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <ShieldAlert className="w-8 h-8 text-warning" />
              <h2 className="text-xl font-bold">Estado de Acciones</h2>
            </div>
            <button className="p-2 hover:bg-[var(--glass-border)] rounded-lg transition-colors text-muted hover:text-foreground">
              <Plus className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-4 mb-6 shrink-0">
            <div className="p-4 rounded-xl border border-warning/20 bg-warning/5">
              <div className="text-sm font-semibold text-warning mb-1">Riesgos Críticos Abiertos</div>
              <div className="text-3xl font-bold">{numRiesgosCriticos}</div>
            </div>
            <div className="p-4 rounded-xl border border-info/20 bg-info/5">
              <div className="text-sm font-semibold text-info mb-1">Oportunidades en Curso</div>
              <div className="text-3xl font-bold">{numOportunidadesEnCurso}</div>
            </div>
          </div>
          
          <div className="flex-1 space-y-3 overflow-y-auto pr-2 border-t border-[var(--glass-border)] pt-4">
            {loading ? (
              <div className="flex justify-center p-4">
                <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              </div>
            ) : riesgos.length === 0 ? (
              <div className="text-sm text-muted text-center p-4">
                No hay registros en la matriz.
              </div>
            ) : (
              riesgos.map((r) => (
                <div key={r.id} className="p-3 rounded-lg border border-[var(--glass-border)] bg-background flex flex-col gap-1 text-sm">
                  <div className="flex justify-between items-center">
                    <span className={`text-xs font-bold uppercase tracking-wider ${r.tipo === 'Oportunidad' ? 'text-info' : 'text-warning'}`}>{r.tipo || 'Riesgo'}</span>
                    <span className="text-[10px] bg-card px-2 py-0.5 rounded border opacity-70">{r.estado || 'Abierto'}</span>
                  </div>
                  <span className="font-semibold leading-snug">{r.descripcion}</span>
                  {r.accion_mitigacion && (
                    <span className="text-xs text-muted mt-1">Acción: {r.accion_mitigacion}</span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Panel: Drive Viewer */}
        <div className="md:col-span-2 bg-card border border-[var(--glass-border)] rounded-2xl flex flex-col h-full min-h-0 overflow-hidden">
          {/* ID de la carpeta 'Registros/Riesgos y oportunidades' o raíz */}
          <DriveFileViewer 
            folderId="1v3fw0TZZTKTTIUD8QOP5CdtARWGo2xh0" 
            title="Documentación de Riesgos (Google Drive)" 
          />
        </div>
      </div>
    </PageLayout>
  );
}
