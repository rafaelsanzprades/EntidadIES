import React, { useState, useEffect } from "react";
import { X, Layers, Save } from "lucide-react";
import { API_BASE } from "@/lib/api";

interface ProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  initialData?: any;
  actors: any[];
}

export function ProgramModal({ isOpen, onClose, onSave, initialData, actors }: ProgramModalProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    coordinador_actor_id: "" as string | number,
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          nombre: initialData.nombre || "",
          descripcion: initialData.descripcion || "",
          coordinador_actor_id: initialData.coordinador_actor_id || "",
        });
      } else {
        setFormData({
          nombre: "",
          descripcion: "",
          coordinador_actor_id: "",
        });
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...formData,
        coordinador_actor_id: formData.coordinador_actor_id ? Number(formData.coordinador_actor_id) : null,
      };

      const url = initialData 
        ? `${API_BASE}/api/qms/programs/${initialData.id}` 
        : `${API_BASE}/api/qms/programs`;
        
      const method = initialData ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        onSave();
      } else {
        console.error("Error saving program");
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
            <Layers className="w-5 h-5 text-primary" />
            {initialData ? "Editar Programa" : "Nuevo Programa"}
          </h2>
          <button onClick={onClose} className="p-2 text-muted hover:text-foreground rounded-lg transition-colors bg-muted/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <form id="program-form" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Nombre del Programa <span className="text-red-500">*</span></label>
              <input 
                required
                type="text" 
                value={formData.nombre}
                onChange={e => setFormData({...formData, nombre: e.target.value})}
                className="w-full bg-background border border-[var(--glass-border)] rounded-lg px-4 py-2 outline-none focus:border-primary/50 transition-colors"
                placeholder="Ej. PROA+"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-1">Coordinador/a</label>
              <select 
                value={formData.coordinador_actor_id}
                onChange={e => setFormData({...formData, coordinador_actor_id: e.target.value})}
                className="w-full bg-background border border-[var(--glass-border)] rounded-lg px-4 py-2 outline-none focus:border-primary/50 transition-colors appearance-none"
              >
                <option value="">-- Sin asignar --</option>
                {actors.map(act => (
                  <option key={act.id} value={act.id}>{act.nombre}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Descripción</label>
              <textarea 
                value={formData.descripcion}
                onChange={e => setFormData({...formData, descripcion: e.target.value})}
                className="w-full bg-background border border-[var(--glass-border)] rounded-lg px-4 py-2 outline-none focus:border-primary/50 transition-colors min-h-[100px] resize-y"
                placeholder="Descripción del programa..."
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
            form="program-form"
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
