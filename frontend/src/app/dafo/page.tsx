"use client";
import React, { useState, useEffect } from "react";
import { Shield, AlertTriangle, Lightbulb, Building, Plus, Trash2, Edit2 } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { DafoModal } from "@/components/features/qms/DafoModal";
import { API_BASE } from "@/lib/api";

export default function DafoPage() {
  const [dafos, setDafos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/qms/dafo`);
      if (res.ok) {
        setDafos(await res.json());
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
    if (!confirm("¿Borrar este ítem?")) return;
    try {
      await fetch(`${API_BASE}/api/qms/dafo/${id}`, { method: 'DELETE' });
      loadData();
    } catch (e) {
      console.error(e);
    }
  };

  const renderCuadrante = (tipo: string, titulo: string, icon: React.ReactNode, bgColor: string, borderColor: string, titleColor: string) => {
    const items = dafos.filter(d => d.tipo === tipo);
    return (
      <div className={`p-6 rounded-2xl border ${bgColor} ${borderColor} flex flex-col h-full`}>
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-black/5">
          <h3 className={`font-bold flex items-center gap-2 ${titleColor}`}>
            {icon} {titulo}
          </h3>
          <button 
            onClick={() => { setEditingItem({ tipo }); setIsModalOpen(true); }}
            className={`text-xs flex items-center gap-1 px-2 py-1 rounded-md bg-white/50 hover:bg-white transition-colors text-foreground/70`}
          >
            <Plus className="w-3 h-3" /> Añadir
          </button>
        </div>
        
        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-sm text-foreground/40 italic">
            No hay elementos definidos.
          </div>
        ) : (
          <ul className="space-y-3 flex-1">
            {items.map(item => (
              <li key={item.id} className="text-sm text-foreground/80 flex items-start justify-between group bg-white/40 p-2 rounded-lg">
                <span className="flex-1">- {item.descripcion}</span>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 ml-2 shrink-0">
                  <button onClick={() => { setEditingItem(item); setIsModalOpen(true); }} className="text-foreground/50 hover:text-primary">
                    <Edit2 className="w-3 h-3" />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="text-foreground/50 hover:text-red-500">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <>
      <PageLayout
        icon={<Shield className="w-6 h-6" />}
        title="Matriz DAFO"
        description="Análisis interno (Debilidades y Fortalezas) y externo (Amenazas y Oportunidades)."
        infoTitle="Gestión de DAFO"
        infoDescription="Visualiza y gestiona las Debilidades, Amenazas, Fortalezas y Oportunidades."
        breadcrumbSuffix="Matriz DAFO"
      >
        {loading ? (
          <div className="flex items-center justify-center h-64 text-muted">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              <span className="text-sm">Cargando matriz DAFO…</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderCuadrante("D", "Debilidades", <AlertTriangle className="w-5 h-5" />, "bg-red-50/50 dark:bg-red-950/20", "border-red-200 dark:border-red-900/50", "text-red-700 dark:text-red-400")}
            {renderCuadrante("A", "Amenazas", <AlertTriangle className="w-5 h-5" />, "bg-orange-50/50 dark:bg-orange-950/20", "border-orange-200 dark:border-orange-900/50", "text-orange-700 dark:text-orange-400")}
            {renderCuadrante("F", "Fortalezas", <Building className="w-5 h-5" />, "bg-green-50/50 dark:bg-green-950/20", "border-green-200 dark:border-green-900/50", "text-green-700 dark:text-green-400")}
            {renderCuadrante("O", "Oportunidades", <Lightbulb className="w-5 h-5" />, "bg-blue-50/50 dark:bg-blue-950/20", "border-blue-200 dark:border-blue-900/50", "text-blue-700 dark:text-blue-400")}
          </div>
        )}
      </PageLayout>

      <DafoModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={() => { setIsModalOpen(false); loadData(); }} 
        initialData={editingItem} 
      />
    </>
  );
}
