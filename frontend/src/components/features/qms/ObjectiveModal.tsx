import React, { useState, useEffect } from "react";
import { X, Save } from "lucide-react";
import { API_BASE } from "@/lib/api";

type ObjectiveModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  initialData?: any;
  programs: any[];
};

export function ObjectiveModal({ isOpen, onClose, onSave, initialData, programs }: ObjectiveModalProps) {
  const [descripcion, setDescripcion] = useState("");
  const [programId, setProgramId] = useState("");
  const [curso, setCurso] = useState("2026-2027");

  useEffect(() => {
    if (initialData) {
      setDescripcion(initialData.descripcion);
      setProgramId(initialData.program_id?.toString() || "");
      setCurso(initialData.curso_academico || "2026-2027");
    } else {
      setDescripcion("");
      setProgramId(programs[0]?.id?.toString() || "");
    }
  }, [initialData, isOpen, programs]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { 
      descripcion, 
      program_id: programId ? parseInt(programId) : null,
      curso_academico: curso 
    };
    
    try {
      const url = initialData 
        ? `${API_BASE}/api/qms/objectives/${initialData.id}`
        : `${API_BASE}/api/qms/objectives`;
        
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
      <div className="bg-card w-full max-w-md rounded-2xl shadow-xl border border-[var(--glass-border)] overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-[var(--glass-border)]">
          <h3 className="font-bold text-foreground">
            {initialData ? "Editar Objetivo" : "Nuevo Objetivo"}
          </h3>
          <button onClick={onClose} className="text-muted hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-muted mb-1">Programa Institucional</label>
            <select 
              value={programId} 
              onChange={(e) => setProgramId(e.target.value)}
              className="w-full bg-background border border-[var(--glass-border)] text-foreground text-sm rounded-lg px-3 py-2"
            >
              <option value="">Seleccione un programa...</option>
              {programs.map(p => (
                <option key={p.id} value={p.id}>{p.nombre}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-xs font-semibold text-muted mb-1">Descripción del Objetivo</label>
            <textarea 
              value={descripcion} 
              onChange={(e) => setDescripcion(e.target.value)}
              required
              rows={3}
              className="w-full bg-background border border-[var(--glass-border)] text-foreground text-sm rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted mb-1">Curso Académico</label>
            <input 
              type="text"
              value={curso} 
              onChange={(e) => setCurso(e.target.value)}
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
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-accent rounded-lg hover:bg-accent/90"
            >
              <Save className="w-4 h-4" /> Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
