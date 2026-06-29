"use client";
import React, { useState, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { GitBranch, Folder, Settings, Shield, Activity, ChevronRight, CheckCircle2 } from "lucide-react";
import { DriveFileViewer } from "@/components/common/DriveFileViewer";
import { API_BASE } from "@/lib/api";

export default function ProcesosPage() {
  const [procesos, setProcesos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProceso, setSelectedProceso] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState<string>("Estratégicos");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${API_BASE}/api/qms/procesos`);
        if (res.ok) {
          const data = await res.json();
          const grouped = [
            { id: 1, tipo: "Estratégicos", titulo: "1. Procesos Estratégicos", procesos: data.filter((p: any) => p.tipo === "Estratégicos" || p.tipo === "estrategico") },
            { id: 2, tipo: "Clave", titulo: "2. Procesos Clave", procesos: data.filter((p: any) => p.tipo === "Clave" || p.tipo === "clave") },
            { id: 3, tipo: "Apoyo", titulo: "3. Procesos de Apoyo", procesos: data.filter((p: any) => p.tipo === "Apoyo" || p.tipo === "apoyo") },
          ];
          setProcesos(grouped);
        }
      } catch (e) {
        console.error("Error loading procesos:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const getIconForType = (tipo: string) => {
    if (tipo === "Estratégicos") return <Shield className="w-5 h-5" />;
    if (tipo === "Clave") return <Activity className="w-5 h-5" />;
    return <Settings className="w-5 h-5" />;
  };

  // Prepare tabs for PageLayout
  const layoutTabs = procesos.map(bloque => ({
    id: bloque.tipo,
    label: (
      <span className="flex items-center gap-2">
        {getIconForType(bloque.tipo)}
        {bloque.tipo}
      </span>
    )
  }));

  const activeBloque = procesos.find(b => b.tipo === activeTab);

  return (
    <PageLayout
      icon={<GitBranch className="w-6 h-6" />}
      title="Mapa de Procesos del SGC"
      description="Estructura organizativa y procesos del Sistema de Gestión de Calidad."
      tabs={layoutTabs.length > 0 ? layoutTabs : undefined}
      activeTab={activeTab}
      onTabChange={(v) => { setActiveTab(v); setSelectedProceso(null); }}
      infoTitle="Información de Procesos"
      infoDescription="Selecciona un bloque y pulsa sobre un proceso para ver toda su documentación asociada."
      breadcrumbSuffix="Mapa de Procesos"
    >
      {loading ? (
        <div className="flex items-center justify-center h-64 text-muted">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {activeBloque && (
            <div className="space-y-8 animate-in fade-in duration-300">
              {Array.from(new Set(activeBloque.procesos.map((p: any) => p.grupo))).map((grupoName: any) => (
                <div key={grupoName} className="space-y-4">
                  <h3 className="text-lg font-bold text-foreground border-b border-[var(--glass-border)] pb-2">
                    {grupoName || "Otros procesos"}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {activeBloque.procesos.filter((p: any) => p.grupo === grupoName).map((proc: any) => (
                      <button
                        key={proc.id}
                        onClick={() => setSelectedProceso({ ...proc, tipo: activeBloque.tipo })}
                        className={`p-4 rounded-xl border text-left flex flex-col transition-all group ${
                          selectedProceso?.id === proc.id 
                            ? 'border-primary bg-primary/10 shadow-lg shadow-primary/5 scale-[1.02]' 
                            : 'border-[var(--glass-border)] bg-card hover:border-primary/50 hover:scale-[1.01]'
                        }`}
                      >
                        <div className="flex items-start justify-between w-full mb-2">
                          <span className="font-semibold text-foreground group-hover:text-primary transition-colors pr-2 leading-tight">
                            {proc.nombre}
                          </span>
                          <ChevronRight className={`w-5 h-5 shrink-0 transition-transform ${selectedProceso?.id === proc.id ? 'text-primary rotate-90' : 'text-muted group-hover:text-foreground'}`} />
                        </div>
                        <span className="text-xs text-muted flex items-center gap-1 mt-auto">
                          <Folder className="w-3 h-3" /> Ver documentación
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom section for Process Details */}
          {selectedProceso && (
            <ProcessDetails procesoId={selectedProceso.id} baseProceso={selectedProceso} />
          )}
        </>
      )}
    </PageLayout>
  );
}

function ProcessDetails({ procesoId, baseProceso }: { procesoId: number; baseProceso: any }) {
  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetails() {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/qms/procesos/${procesoId}`);
        if (res.ok) {
          setDetails(await res.json());
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchDetails();
  }, [procesoId]);

  if (loading) {
    return (
      <div className="mt-12 pt-8 border-t border-[var(--glass-border)] flex justify-center py-12">
        <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const numIndicadores = details?.indicadores?.length || 0;
  const numRiesgos = details?.riesgos?.length || 0;
  const ncsAbiertas = details?.no_conformidades?.filter((nc: any) => nc.estado !== "Cerrada") || [];

  return (
    <div className="mt-12 pt-8 border-t border-[var(--glass-border)] animate-in slide-in-from-bottom-8 fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold leading-tight">{baseProceso.nombre}</h2>
          <p className="text-sm text-muted mt-1">{baseProceso.descripcion || "Sin descripción"}</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted bg-card px-4 py-2 rounded-lg border border-[var(--glass-border)]">
          <CheckCircle2 className="w-4 h-4 text-green-500" /> Proceso activo
        </div>
      </div>
      
      {/* Indicadores y estado */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-card border border-[var(--glass-border)] rounded-xl p-4 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-muted uppercase tracking-wider">Indicadores</span>
            <div className="text-3xl font-bold mt-2">{numIndicadores}</div>
          </div>
          <div className="text-xs text-muted mt-4">
            Métricas de rendimiento asociadas
          </div>
        </div>
        
        <div className={`bg-card border rounded-xl p-4 flex flex-col justify-between ${ncsAbiertas.length > 0 ? 'border-red-500/50 bg-red-500/5' : 'border-[var(--glass-border)]'}`}>
          <div>
            <span className={`text-xs font-bold uppercase tracking-wider ${ncsAbiertas.length > 0 ? 'text-red-500' : 'text-muted'}`}>No Conformidades</span>
            <div className={`text-3xl font-bold mt-2 ${ncsAbiertas.length > 0 ? 'text-red-500' : ''}`}>{ncsAbiertas.length}</div>
          </div>
          <div className="text-xs text-muted mt-4">
            {ncsAbiertas.length > 0 ? 'Requieren acción correctiva' : 'Sin incidencias abiertas'}
          </div>
        </div>

        <div className="bg-card border border-[var(--glass-border)] rounded-xl p-4 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-muted uppercase tracking-wider">Riesgos</span>
            <div className="text-3xl font-bold mt-2">{numRiesgos}</div>
          </div>
          <div className="text-xs text-muted mt-4">
            Amenazas u Oportunidades identificadas
          </div>
        </div>
      </div>
      
      <p className="text-sm text-muted mb-4">
        A continuación se listan todos los registros, fichas de proceso y evidencias vinculadas a este proceso desde Google Drive.
      </p>
      
      <div className="h-[600px] overflow-hidden rounded-xl border border-[var(--glass-border)] relative bg-background shadow-sm">
        <DriveFileViewer 
          folderId={baseProceso.drive_id || "1v3fw0TZZTKTTIUD8QOP5CdtARWGo2xh0"} 
          title={`Archivos: ${baseProceso.nombre}`} 
        />
      </div>
    </div>
  );
}
