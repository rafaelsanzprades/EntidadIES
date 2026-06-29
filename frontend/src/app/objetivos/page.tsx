"use client";
import React, { useState, useEffect } from "react";
import { Target, Plus, Trash2, Edit2, Calendar, Tag, User } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { ObjectiveModal } from "@/components/features/qms/ObjectiveModal";
import { ActivityModal } from "@/components/features/qms/ActivityModal";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { API_BASE } from "@/lib/api";

export default function ObjetivosPage() {
  const [objectives, setObjectives] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [actors, setActors] = useState<any[]>([]);
  
  const [loading, setLoading] = useState(true);
  
  const [isObjModalOpen, setIsObjModalOpen] = useState(false);
  const [isActModalOpen, setIsActModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const [activeTab, setActiveTab] = useState("objetivos");

  const loadData = async () => {
    try {
      setLoading(true);
      const [objRes, progRes, actRes, actorsRes] = await Promise.all([
        fetch(`${API_BASE}/api/qms/objectives`),
        fetch(`${API_BASE}/api/qms/programs`),
        fetch(`${API_BASE}/api/qms/activities`),
        fetch(`${API_BASE}/api/qms/actors`)
      ]);
      
      if (objRes.ok && progRes.ok && actRes.ok && actorsRes.ok) {
        setObjectives(await objRes.json());
        setPrograms(await progRes.json());
        setActivities(await actRes.json());
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

  const handleDeleteObj = async (id: number) => {
    if (!confirm("¿Borrar este objetivo?")) return;
    try {
      await fetch(`${API_BASE}/api/qms/objectives/${id}`, { method: 'DELETE' });
      loadData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteAct = async (id: number) => {
    if (!confirm("¿Borrar esta actividad?")) return;
    try {
      await fetch(`${API_BASE}/api/qms/activities/${id}`, { method: 'DELETE' });
      loadData();
    } catch (e) {
      console.error(e);
    }
  };

  const getStatusBadge = (estado: string) => {
    switch(estado) {
      case "planificada": return <span className="px-2 py-1 text-xs font-semibold rounded-md bg-blue-500/10 text-blue-500">Planificada</span>;
      case "en_proceso": return <span className="px-2 py-1 text-xs font-semibold rounded-md bg-amber-500/10 text-amber-500">En proceso</span>;
      case "completada": return <span className="px-2 py-1 text-xs font-semibold rounded-md bg-green-500/10 text-green-500">Completada</span>;
      case "cancelada": return <span className="px-2 py-1 text-xs font-semibold rounded-md bg-red-500/10 text-red-500">Cancelada</span>;
      default: return <span className="px-2 py-1 text-xs font-semibold rounded-md bg-muted/10 text-muted">{estado}</span>;
    }
  };

  const tabs = [
    { id: "objetivos", label: "Objetivos Estratégicos" },
    { id: "actividades", label: "Plan de Acción (Actividades)" }
  ];

  return (
    <>
      <PageLayout
        icon={<Target className="w-6 h-6" />}
        title="Objetivos Estratégicos y Plan de Acción"
        description="Gestión de objetivos de dirección y actividades vinculadas."
        infoTitle="Gestión de Objetivos"
        infoDescription="Define y supervisa los objetivos estratégicos de calidad vinculados a los programas, y desglósalos en actividades concretas."
        breadcrumbSuffix="Objetivos Estratégicos"
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        rightAction={
          activeTab === "objetivos" ? (
            <button 
              onClick={() => { setEditingItem(null); setIsObjModalOpen(true); }}
              className="flex items-center gap-2 bg-success text-white px-4 py-2 rounded-lg hover:bg-success/90 transition-colors font-semibold shadow-sm"
            >
              <Plus className="w-4 h-4" /> Nuevo Objetivo
            </button>
          ) : (
            <button 
              onClick={() => { setEditingItem(null); setIsActModalOpen(true); }}
              className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors font-semibold shadow-sm"
            >
              <Plus className="w-4 h-4" /> Nueva Actividad
            </button>
          )
        }
      >
        <div className="animate-in fade-in duration-300">
          {loading ? (
             <div className="flex items-center justify-center h-64 text-muted">
               <div className="flex flex-col items-center gap-3">
                 <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
                 <span className="text-sm">Cargando datos…</span>
               </div>
             </div>
          ) : activeTab === "objetivos" ? (
            // TAB: OBJETIVOS
            <div className="grid grid-cols-1 gap-4">
              {objectives.map(obj => {
                 const prog = programs.find(p => p.id === obj.program_id);
                 return (
                  <div key={obj.id} className="bg-card rounded-xl p-5 border border-[var(--glass-border)] flex gap-4 items-start group shadow-sm hover:shadow-md transition-shadow">
                    <div className="bg-accent/10 p-3 rounded-lg mt-0.5 shrink-0">
                      <Target className="w-5 h-5 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-lg font-medium text-foreground">{obj.descripcion}</p>
                      <div className="flex gap-4 mt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted/10 text-muted-foreground border border-[var(--glass-border)]">
                          Programa: {prog ? prog.nombre : "Global / Sin asignar"}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                          Curso: {obj.curso_academico || "N/A"}
                        </span>
                      </div>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col sm:flex-row items-center gap-2 shrink-0">
                      <button onClick={() => { setEditingItem(obj); setIsObjModalOpen(true); }} className="p-2 bg-background border border-[var(--glass-border)] rounded-md text-muted hover:text-accent transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDeleteObj(obj.id)} className="p-2 bg-background border border-[var(--glass-border)] rounded-md text-muted hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                 );
              })}
              {objectives.length === 0 && (
                <div className="text-center py-12 bg-card rounded-2xl border border-dashed border-[var(--glass-border)]">
                  <Target className="w-12 h-12 mx-auto text-muted/30 mb-3" />
                  <h3 className="text-lg font-semibold text-foreground mb-1">Sin objetivos</h3>
                  <p className="text-muted">No se han definido objetivos estratégicos todavía.</p>
                </div>
              )}
            </div>
          ) : (
            // TAB: ACTIVIDADES
            <div className="grid grid-cols-1 gap-4">
              {activities.map(act => {
                const obj = objectives.find(o => o.id === act.objective_id);
                const resp = actors.find(a => a.id === act.responsable_actor_id);
                
                return (
                  <div key={act.id} className="bg-card rounded-xl p-5 border border-[var(--glass-border)] group flex flex-col md:flex-row gap-4 justify-between items-start shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-bold text-foreground text-md">{act.nombre}</h4>
                        {getStatusBadge(act.estado)}
                      </div>
                      <p className="text-sm text-muted mb-3 line-clamp-2">{act.descripcion}</p>
                      <div className="flex flex-wrap gap-4 text-xs text-muted">
                        <span className="flex items-center gap-1"><Tag className="w-3 h-3" /> Obj: {obj ? obj.descripcion : "N/A"}</span>
                        <span className="flex items-center gap-1"><User className="w-3 h-3" /> {resp ? resp.nombre : "Sin asignar"}</span>
                        {act.temporalizacion && <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {act.temporalizacion}</span>}
                      </div>
                    </div>
                    
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 shrink-0 justify-end mt-2 md:mt-0">
                      <button onClick={() => { setEditingItem(act); setIsActModalOpen(true); }} className="p-2 bg-background border border-[var(--glass-border)] rounded-md text-muted hover:text-accent transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDeleteAct(act.id)} className="p-2 bg-background border border-[var(--glass-border)] rounded-md text-muted hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
              {activities.length === 0 && (
                <div className="text-center py-12 bg-card rounded-2xl border border-dashed border-[var(--glass-border)]">
                  <Calendar className="w-12 h-12 mx-auto text-muted/30 mb-3" />
                  <h3 className="text-lg font-semibold text-foreground mb-1">Sin actividades</h3>
                  <p className="text-muted">No se han definido actividades de acción todavía.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </PageLayout>

      <ObjectiveModal 
        isOpen={isObjModalOpen} 
        onClose={() => setIsObjModalOpen(false)} 
        onSave={() => { setIsObjModalOpen(false); loadData(); }} 
        initialData={editingItem} 
        programs={programs}
      />

      <ActivityModal 
        isOpen={isActModalOpen}
        onClose={() => setIsActModalOpen(false)}
        onSave={() => { setIsActModalOpen(false); loadData(); }}
        initialData={editingItem}
        objectives={objectives}
        actors={actors}
      />
    </>
  );
}
