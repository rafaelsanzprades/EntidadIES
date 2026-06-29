"use client";
import React, { useState, useEffect } from "react";
import { BarChart, TrendingUp, Plus, Target, Trash2, Edit2 } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { IndicatorModal } from "@/components/features/qms/IndicatorModal";
import { API_BASE } from "@/lib/api";

export default function IndicadoresPage() {
  const [indicadores, setIndicadores] = useState<any[]>([]);
  const [procesos, setProcesos] = useState<Record<number, string>>({});
  const [objectives, setObjectives] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const [indRes, procRes, objRes] = await Promise.all([
        fetch(`${API_BASE}/api/qms/indicators`), // Changed from /indicadores to /indicators
        fetch(`${API_BASE}/api/qms/procesos`),
        fetch(`${API_BASE}/api/qms/objectives`)
      ]);
      
      if (indRes.ok && procRes.ok && objRes.ok) {
        const indData = await indRes.json();
        const procData = await procRes.json();
        const objData = await objRes.json();
        
        const procMap: Record<number, string> = {};
        procData.forEach((p: any) => {
          procMap[p.id] = p.nombre;
        });
        
        setProcesos(procMap);
        setIndicadores(indData);
        setObjectives(objData);
      }
    } catch (e) {
      console.error("Error loading indicators:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("¿Borrar este indicador?")) return;
    try {
      await fetch(`${API_BASE}/api/qms/indicators/${id}`, { method: 'DELETE' });
      loadData();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <PageLayout
        icon={<BarChart className="w-6 h-6 text-green-500" />}
        title="Indicadores de Calidad (KPIs)"
        description="Cuadro de mando del Sistema de Gestión de Calidad."
        infoTitle="Indicadores"
        infoDescription="Monitoriza y consulta las métricas de calidad de los procesos. Permite añadir y editar indicadores estratégicos."
        breadcrumbSuffix="Indicadores SGC"
        rightAction={
          <button 
            onClick={() => { setEditingItem(null); setIsModalOpen(true); }}
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors font-semibold shadow-sm"
          >
            <Plus className="w-4 h-4" /> Añadir Indicador
          </button>
        }
      >
        <div className="flex-1 overflow-y-auto animate-in fade-in duration-300">
          {loading ? (
            <div className="flex items-center justify-center h-64 text-muted">
              <div className="w-8 h-8 border-2 border-green-500/30 border-t-green-500 rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {indicadores.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center h-64 text-muted border-2 border-dashed border-[var(--glass-border)] rounded-2xl bg-card/50">
                  <BarChart className="w-12 h-12 mb-4 opacity-50 text-green-500" />
                  <p>No hay indicadores registrados.</p>
                  <p className="text-sm">Registra indicadores nuevos para poder visualizarlos.</p>
                </div>
              ) : (
                indicadores.map((ind) => {
                  const obj = objectives.find(o => o.id === ind.objective_id);
                  return (
                    <div key={ind.id} className="bg-card border border-[var(--glass-border)] rounded-2xl p-6 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow group relative">
                      
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                        <button onClick={() => { setEditingItem(ind); setIsModalOpen(true); }} className="text-muted hover:text-green-500 transition-colors p-1 bg-background rounded border border-[var(--glass-border)] shadow-sm">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(ind.id)} className="text-muted hover:text-red-500 transition-colors p-1 bg-background rounded border border-[var(--glass-border)] shadow-sm">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-start justify-between gap-2 pr-16">
                        <h3 className="font-bold text-[1.1rem] leading-tight text-foreground">{ind.descripcion}</h3>
                      </div>
                      
                      {obj && (
                        <p className="text-xs text-muted flex items-center gap-1 mt-1 mb-2">
                          <Target className="w-3 h-3 text-accent" /> {obj.descripcion.substring(0, 60)}...
                        </p>
                      )}

                      <div className="mt-2 space-y-3 flex-1">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted font-medium">Proceso:</span>
                          <span className="text-foreground text-right max-w-[60%] truncate font-medium border-b border-primary/20 pb-0.5" title={procesos[ind.process_id]}>
                            {ind.process_id ? procesos[ind.process_id] || 'Desconocido' : 'Global'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted font-medium">Responsable:</span>
                          <span className="text-foreground text-right max-w-[60%] truncate">{ind.responsable || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted font-medium">Frecuencia:</span>
                          <span className="text-foreground text-right max-w-[60%] truncate">{ind.frecuencia || 'N/A'}</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 bg-muted/5 p-3 rounded-lg border border-[var(--glass-border)] mt-2">
                          <div>
                            <span className="block text-xs text-muted mb-1">Meta Cuantitativa</span>
                            <span className="font-semibold text-sm">{ind.meta_cuantitativa || "-"}</span>
                          </div>
                          <div>
                            <span className="block text-xs text-muted mb-1">Valor Actual</span>
                            <span className="font-bold text-sm text-green-500">{ind.valor_actual || "-"}</span>
                          </div>
                        </div>

                        {ind.metodo_evaluacion && (
                          <p className="text-xs text-muted mt-2">
                            <span className="font-semibold">Método:</span> {ind.metodo_evaluacion}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </PageLayout>

      <IndicatorModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={() => { setIsModalOpen(false); loadData(); }}
        initialData={editingItem}
        objectives={objectives}
      />
    </>
  );
}
