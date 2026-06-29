import React, { useState, useEffect } from "react";
import { X, Save } from "lucide-react";
import { API_BASE } from "@/lib/api";

type ActivityModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  initialData?: any;
  objectives: any[];
  actors: any[];
};

export function ActivityModal({ isOpen, onClose, onSave, initialData, objectives, actors }: ActivityModalProps) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [objectiveId, setObjectiveId] = useState("");
  const [actorId, setActorId] = useState("");
  const [temporalizacion, setTemporalizacion] = useState("");
  const [estado, setEstado] = useState("planificada");

  useEffect(() => {
    if (initialData) {
      setNombre(initialData.nombre);
      setDescripcion(initialData.descripcion || "");
      setObjectiveId(initialData.objective_id?.toString() || "");
      setActorId(initialData.responsable_actor_id?.toString() || "");
      setTemporalizacion(initialData.temporalizacion || "");
      setEstado(initialData.estado || "planificada");
    } else {
      setNombre("");
      setDescripcion("");
      setObjectiveId(objectives[0]?.id?.toString() || "");
      setActorId("");
      setTemporalizacion("");
      setEstado("planificada");
    }
  }, [initialData, isOpen, objectives]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { 
      nombre,
      descripcion, 
      objective_id: objectiveId ? parseInt(objectiveId) : null,
      responsable_actor_id: actorId ? parseInt(actorId) : null,
      temporalizacion,
      estado
    };
    
    try {
      const url = initialData 
        ? `${API_BASE}/api/qms/activities/${initialData.id}`
        : `${API_BASE}/api/qms/activities`;
        
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
            {initialData ? "Editar Actividad" : "Nueva Actividad"}
          </h3>
          <button onClick={onClose} className="text-muted hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-muted mb-1">Nombre de la Actividad</label>
            <input 
              type="text"
              value={nombre} 
              onChange={(e) => setNombre(e.target.value)}
              required
              className="w-full bg-background border border-[var(--glass-border)] text-foreground text-sm rounded-lg px-3 py-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-muted mb-1">Objetivo Estratégico</label>
              <select 
                value={objectiveId} 
                onChange={(e) => setObjectiveId(e.target.value)}
                className="w-full bg-background border border-[var(--glass-border)] text-foreground text-sm rounded-lg px-3 py-2"
              >
                <option value="">Seleccione objetivo...</option>
                {objectives.map(o => (
                  <option key={o.id} value={o.id}>{o.descripcion.substring(0, 50)}...</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted mb-1">Responsable</label>
              <select 
                value={actorId} 
                onChange={(e) => setActorId(e.target.value)}
                className="w-full bg-background border border-[var(--glass-border)] text-foreground text-sm rounded-lg px-3 py-2"
              >
                <option value="">Sin asignar...</option>
                {actors.map(a => (
                  <option key={a.id} value={a.id}>{a.nombre} ({a.descripcion})</option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-semibold text-muted mb-1">Descripción</label>
            <textarea 
              value={descripcion} 
              onChange={(e) => setDescripcion(e.target.value)}
              rows={2}
              className="w-full bg-background border border-[var(--glass-border)] text-foreground text-sm rounded-lg px-3 py-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-muted mb-1">Temporalización</label>
              <input 
                type="text"
                placeholder="Ej. Primer trimestre"
                value={temporalizacion} 
                onChange={(e) => setTemporalizacion(e.target.value)}
                className="w-full bg-background border border-[var(--glass-border)] text-foreground text-sm rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted mb-1">Estado</label>
              <select 
                value={estado} 
                onChange={(e) => setEstado(e.target.value)}
                className="w-full bg-background border border-[var(--glass-border)] text-foreground text-sm rounded-lg px-3 py-2"
              >
                <option value="planificada">Planificada</option>
                <option value="en_proceso">En Proceso</option>
                <option value="completada">Completada</option>
                <option value="cancelada">Cancelada</option>
              </select>
            </div>
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
