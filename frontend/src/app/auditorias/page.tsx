"use client";
import React, { useState, useEffect } from "react";
import { FileSearch, CheckSquare, Plus } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { DriveFileViewer } from "@/components/common/DriveFileViewer";
import { API_BASE } from "@/lib/api";

export default function AuditoriasPage() {
  const [ncs, setNcs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${API_BASE}/api/qms/no-conformidades`);
        if (res.ok) {
          setNcs(await res.json());
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const getStatusColor = (estado: string) => {
    if (estado?.toLowerCase().includes("abierta")) return "border-red-500/20 bg-red-500/5 text-red-500";
    if (estado?.toLowerCase().includes("curso")) return "border-yellow-500/20 bg-yellow-500/5 text-yellow-600";
    return "border-green-500/20 bg-green-500/5 text-green-500 opacity-60 hover:opacity-100";
  };

  return (
    <PageLayout
      icon={<FileSearch className="w-6 h-6" />}
      title="Auditorías y No Conformidades"
      description="Gestión de auditorías internas, externas y Planes de Acción Correctiva (PAC)."
      infoTitle="Auditorías"
      infoDescription="Gestiona las no conformidades y visualiza los expedientes de auditoría."
      breadcrumbSuffix="Auditorías SGC"
    >
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 h-full min-h-0">
        {/* Left Panel: Kanban/List Placeholder */}
        <div className="md:col-span-1 bg-card border border-[var(--glass-border)] rounded-2xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <CheckSquare className="w-8 h-8 text-purple-500" />
              <h2 className="text-xl font-bold">No Conformidades</h2>
            </div>
            <button className="p-2 hover:bg-[var(--glass-border)] rounded-lg transition-colors text-muted hover:text-foreground">
              <Plus className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 space-y-3 overflow-y-auto pr-2">
            {loading ? (
              <div className="flex justify-center p-4">
                <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              </div>
            ) : ncs.length === 0 ? (
              <div className="text-sm text-muted text-center p-4">
                No hay No Conformidades registradas.
              </div>
            ) : (
              ncs.map((nc) => (
                <div key={nc.id} className={`p-3 rounded-lg border flex flex-col gap-1 cursor-pointer transition-colors ${getStatusColor(nc.estado)}`}>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold uppercase tracking-wider">{nc.estado || 'Abierta'}</span>
                    {nc.tipo && <span className="text-[10px] bg-background/50 px-2 py-0.5 rounded border border-current opacity-70">{nc.tipo}</span>}
                  </div>
                  <span className="text-sm font-semibold">{nc.codigo ? `${nc.codigo}: ` : ''}{nc.descripcion}</span>
                  {nc.accion_correctiva && (
                    <span className="text-xs mt-2 opacity-80 border-t border-current/20 pt-1">
                      Acción: {nc.accion_correctiva}
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Panel: Drive Viewer */}
        <div className="md:col-span-2 bg-card border border-[var(--glass-border)] rounded-2xl flex flex-col h-full min-h-0 overflow-hidden">
          {/* Fallback a carpeta principal por ahora */}
          <DriveFileViewer 
            folderId="1v3fw0TZZTKTTIUD8QOP5CdtARWGo2xh0" 
            title="Expedientes de Auditoría (Google Drive)" 
          />
        </div>
      </div>
    </PageLayout>
  );
}
