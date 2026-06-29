import React, { useState, useEffect } from "react";
import { X, Save } from "lucide-react";
import { API_BASE } from "@/lib/api";

type IndicatorModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  initialData?: any;
  objectives: any[];
};

export function IndicatorModal({ isOpen, onClose, onSave, initialData, objectives }: IndicatorModalProps) {
  const [descripcion, setDescripcion] = useState("");
  const [objectiveId, setObjectiveId] = useState("");
  const [meta, setMeta] = useState("");
  const [valor, setValor] = useState("");
  const [metodo, setMetodo] = useState("");

  useEffect(() => {
    if (initialData) {
      setDescripcion(initialData.descripcion);
      setObjectiveId(initialData.objective_id?.toString() || "");
      setMeta(initialData.meta_cuantitativa || "");
      setValor(initialData.valor_actual || "");
      setMetodo(initialData.metodo_evaluacion || "");
    } else {
      setDescripcion("");
      setObjectiveId(objectives[0]?.id?.toString() || "");
      setMeta("");
      setValor("");
      setMetodo("");
    }
  }, [initialData, isOpen, objectives]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { 
      descripcion, 
      objective_id: objectiveId ? parseInt(objectiveId) : null,
      meta_cuantitativa: meta,
      valor_actual: valor,
      metodo_evaluacion: metodo
    };
    
    try {
      const url = initialData 
        ? `${API_BASE}/api/qms/indicators/${initialData.id}`
        : `${API_BASE}/api/qms/indicators`;
        
      await fetch(url, {
        method: initialData ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      onSave();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-card w-full max-w-lg rounded-2xl shadow-xl border border-[var(--glass-border)] overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-[var(--glass-border)]">
          <h3 className="font-bold text-foreground">
            {initialData ? "Editar Indicador" : "Nuevo Indicador"}
          </h3>
          <button onClick={onClose} className="text-muted hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-muted mb-1">Objetivo Asociado</label>
            <select 
              value={objectiveId} 
              onChange={(e) => setObjectiveId(e.target.value)}
              required
              className="w-full bg-background border border-[var(--glass-border)] text-foreground text-sm rounded-lg px-3 py-2"
            >
              <option value="">Seleccione objetivo...</option>
              {objectives.map(o => (
                <option key={o.id} value={o.id}>{o.descripcion.substring(0, 70)}...</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted mb-1">Descripción del Indicador</label>
            <input 
              type="text"
              value={descripcion} 
              onChange={(e) => setDescripcion(e.target.value)}
              required
              placeholder="Ej. % de absentismo escolar"
              className="w-full bg-background border border-[var(--glass-border)] text-foreground text-sm rounded-lg px-3 py-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-muted mb-1">Meta Cuantitativa</label>
              <input 
                type="text"
                value={meta} 
                onChange={(e) => setMeta(e.target.value)}
                placeholder="Ej. < 5%"
                className="w-full bg-background border border-[var(--glass-border)] text-foreground text-sm rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted mb-1">Valor Actual</label>
              <input 
                type="text"
                value={valor} 
                onChange={(e) => setValor(e.target.value)}
                placeholder="Ej. 8%"
                className="w-full bg-background border border-[var(--glass-border)] text-foreground text-sm rounded-lg px-3 py-2"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-semibold text-muted mb-1">Método de Evaluación</label>
            <input 
              type="text"
              value={metodo} 
              onChange={(e) => setMetodo(e.target.value)}
              placeholder="Ej. Revisión mensual en SIGAD"
              className="w-full bg-background border border-[var(--glass-border)] text-foreground text-sm rounded-lg px-3 py-2"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-muted hover:text-foreground"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-green-500 rounded-lg hover:bg-green-600"
            >
              <Save className="w-4 h-4" /> Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
