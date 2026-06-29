"use client";
import React, { useState, useEffect } from "react";
import { Layers, Plus, Trash2, Edit2, User } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { ProgramModal } from "@/components/features/qms/ProgramModal";
import { DriveFileViewer } from "@/components/common/DriveFileViewer";
import { API_BASE } from "@/lib/api";
export default function ProgramasPage() {
  const [programs, setPrograms] = useState<any[]>([]);
  const [actors, setActors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const [progRes, actorsRes] = await Promise.all([
        fetch(`${API_BASE}/api/qms/programs`),
        fetch(`${API_BASE}/api/qms/actors`)
      ]);
      
      if (progRes.ok && actorsRes.ok) {
        setPrograms(await progRes.json());
        setActors(await actorsRes.json());
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("¿Borrar este programa? Las actividades y objetivos asociados podrían quedarse sin programa asignado.")) return;
    try {
      await fetch(`${API_BASE}/api/qms/programs/${id}`, { method: 'DELETE' });
      loadData();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <PageLayout
        icon={<Layers className="w-6 h-6" />}
        title="Programas Institucionales"
        description="Listado de proyectos y programas del centro (PROA+, Ajedrez, Erasmus+, etc.)."
        infoTitle="Programas del Centro"
        infoDescription="Gestiona los programas institucionales y sus coordinadores."
        breadcrumbSuffix="Programas"
        rightAction={
          <button 
            onClick={() => { setEditingItem(null); setIsModalOpen(true); }}
            className="flex items-center gap-2 bg-success text-white px-4 py-2 rounded-lg hover:bg-success/90 transition-colors font-semibold shadow-sm"
          >
            <Plus className="w-4 h-4" /> Nuevo Programa
          </button>
        }
      >

            {loading ? (
               <div className="flex items-center justify-center h-64 text-muted">
                 <div className="flex flex-col items-center gap-3">
                   <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                   <span className="text-sm">Cargando programas…</span>
                 </div>
               </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {programs.map(prog => {
                   const coord = actors.find(a => a.id === prog.coordinador_actor_id);
                   return (
                    <div key={prog.id} className="bg-card rounded-2xl p-6 border border-[var(--glass-border)] flex flex-col group shadow-sm hover:shadow-md transition-all relative overflow-hidden">
                      {/* Decorator */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full pointer-events-none" />
                      
                      <div className="flex items-start justify-between mb-4 relative z-10">
                        <div className="bg-primary/10 p-3 rounded-xl">
                          <Layers className="w-6 h-6 text-primary" />
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                          <button onClick={() => { setEditingItem(prog); setIsModalOpen(true); }} className="p-1.5 text-muted hover:text-primary transition-colors bg-background rounded-md border border-[var(--glass-border)]">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(prog.id)} className="p-1.5 text-muted hover:text-red-500 transition-colors bg-background rounded-md border border-[var(--glass-border)]">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-1">{prog.nombre}</h3>
                      <p className="text-sm text-muted mb-6 flex-1 line-clamp-3">
                        {prog.descripcion || "Sin descripción detallada."}
                      </p>
                      
                      <div className="pt-4 border-t border-[var(--glass-border)] flex items-center justify-between text-xs font-medium">
                        <span className="text-muted">Coordinador/a:</span>
                        <div className="flex items-center gap-1.5 text-foreground bg-muted/10 px-2.5 py-1 rounded-full border border-[var(--glass-border)]">
                          <User className="w-3 h-3 text-primary" />
                          {coord ? coord.nombre : "Sin asignar"}
                        </div>
                      </div>
                    </div>
                   );
                })}
                
                {/* Add New Card */}
                <button 
                  onClick={() => { setEditingItem(null); setIsModalOpen(true); }}
                  className="bg-background/50 hover:bg-card border-2 border-dashed border-[var(--glass-border)] hover:border-primary/50 rounded-2xl p-6 flex flex-col items-center justify-center text-muted hover:text-primary transition-all min-h-[220px] group"
                >
                  <div className="bg-muted/10 group-hover:bg-primary/10 p-4 rounded-full mb-4 transition-colors">
                    <Plus className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold">Añadir Programa</h3>
                  <p className="text-xs text-center mt-2 opacity-70 px-4">Proa+, Erasmus+, Ciberseguridad, Ajedrez...</p>
                </button>
              </div>
            )}
            
            {/* Drive Integration Demo */}
            <div className="mt-12">
              <h2 className="text-xl font-bold mb-4">Integración de Archivos (Demo: PROA+)</h2>
              <DriveFileViewer folderId="1sQwmiGq_YhytxfSGjJMx1-sNAyXQUTkq" title="Documentos: PLAN DE MEJORA PROA+" />
            </div>
      </PageLayout>

      <ProgramModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={() => { setIsModalOpen(false); loadData(); }} 
        initialData={editingItem} 
        actors={actors}
      />
    </>
  );
}
