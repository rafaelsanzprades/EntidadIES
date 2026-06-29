import React, { useState, useEffect } from "react";
import { X, Target, Save } from "lucide-react";
import { API_BASE } from "@/lib/api";

interface DafoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  initialData?: any;
}

export function DafoModal({ isOpen, onClose, onSave, initialData }: DafoModalProps) {
  const [formData, setFormData] = useState({
    tipo: "fortaleza",
    descripcion: "",
    curso_academico: "2025/2026",
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          tipo: initialData.tipo || "fortaleza",
          descripcion: initialData.descripcion || "",
          curso_academico: initialData.curso_academico || "2025/2026",
        });
      } else {
        setFormData({
          tipo: "fortaleza",
          descripcion: "",
          curso_academico: "2025/2026",
        });
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = initialData 
        ? `${API_BASE}/api/qms/dafo/${initialData.id}` 
        : `${API_BASE}/api/qms/dafo`;
        
      const method = initialData ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        onSave();
      } else {
        console.error("Error saving DAFO item");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="bg-card w-full max-w-md rounded-2xl shadow-xl border border-[var(--glass-border)] flex flex-col max-h-[90vh]">
        
        <div className="flex items-center justify-between p-6 border-b border-[var(--glass-border)]">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            {initialData ? "Editar Elemento DAFO" : "Nuevo Elemento DAFO"}
          </h2>
          <button onClick={onClose} className="p-2 text-muted hover:text-foreground rounded-lg transition-colors bg-muted/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <form id="dafo-form" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Tipo <span className="text-red-500">*</span></label>
              <select 
                required
                value={formData.tipo}
                onChange={e => setFormData({...formData, tipo: e.target.value})}
                className="w-full bg-background border border-[var(--glass-border)] rounded-lg px-4 py-2 outline-none focus:border-primary/50 transition-colors appearance-none"
              >
                <option value="fortaleza">Fortaleza (Interno, Positivo)</option>
                <option value="debilidad">Debilidad (Interno, Negativo)</option>
                <option value="oportunidad">Oportunidad (Externo, Positivo)</option>
                <option value="amenaza">Amenaza (Externo, Negativo)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-1">Descripción <span className="text-red-500">*</span></label>
              <textarea 
                required
                value={formData.descripcion}
                onChange={e => setFormData({...formData, descripcion: e.target.value})}
                className="w-full bg-background border border-[var(--glass-border)] rounded-lg px-4 py-2 outline-none focus:border-primary/50 transition-colors min-h-[100px] resize-y"
                placeholder="Describe el elemento..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Curso Académico</label>
              <input 
                type="text" 
                value={formData.curso_academico}
                onChange={e => setFormData({...formData, curso_academico: e.target.value})}
                className="w-full bg-background border border-[var(--glass-border)] rounded-lg px-4 py-2 outline-none focus:border-primary/50 transition-colors"
                placeholder="Ej. 2025/2026"
              />
            </div>
          </form>
        </div>

        <div className="p-6 border-t border-[var(--glass-border)] bg-muted/5 flex justify-end gap-3 rounded-b-2xl">
          <button 
            type="button" 
            onClick={onClose}
            className="px-4 py-2 rounded-lg font-semibold text-muted hover:text-foreground hover:bg-muted/10 transition-colors"
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            form="dafo-form"
            disabled={saving}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" /> {saving ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}
