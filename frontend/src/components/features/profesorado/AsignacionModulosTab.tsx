"use client";
import { CheckCircle2, Save, ShieldAlert, UserCog , Info } from "lucide-react";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useUsers, useAssignments, saveAssignments } from "@/hooks/useApi";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function AsignacionModulosTab() {
  const { data: session, status } = useSession();
  const { data: usersData, isLoading: loadingUsers } = useUsers();
  const { data: assignmentsData, mutate: mutateAssignments } = useAssignments();

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [localAssignments, setLocalAssignments] = useState<number[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const users = usersData || [];
  const assignments = assignmentsData || {};

  const isSuperadmin = session?.user && (session.user as any).roles === "Superadmin";

  const handleSelectUser = (userId: string) => {
    setSelectedUserId(userId);
    setLocalAssignments(assignments[userId] || []);
    setSuccessMsg("");
  };

  const handleToggleModule = (moduleId: number) => {
    setLocalAssignments(prev => 
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const handleSave = async () => {
    if (!selectedUserId) return;
    setIsSaving(true);
    try {
      await saveAssignments(selectedUserId, localAssignments);
      await mutateAssignments();
      setSuccessMsg("Asignaciones guardadas correctamente");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (e: any) {
      alert("Error: " + e.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (status === "loading" || loadingUsers) {
    return (
      <div className="flex items-center justify-center text-foreground py-12">
        Cargando Panel de Administración...
      </div>
    );
  }

  if (!isSuperadmin) {
    return (
      <div className="flex items-center justify-center py-12">
        <Card className="p-8 text-center max-w-md border-danger/30 bg-danger/10">
          <ShieldAlert className="w-16 h-16 text-danger mx-auto mb-4" />
          <h2 className="text-xl font-bold text-foreground mb-2">Acceso Restringido</h2>
          <p className="text-muted">Esta página es exclusiva para Superadministradores y equipos directivos.</p>
        </Card>
      </div>
    );
  }

  const selectedUser = users.find((u: any) => u.id === parseInt(selectedUserId || "0") || u.id === selectedUserId);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-start gap-3 p-4 rounded-xl bg-accent/5 border border-accent/20 mb-6">
        <Info className="w-5 h-5 text-accent mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-semibold text-foreground">Asignación - RD 659/2023</p>
          <p className="text-sm text-muted mt-1">Asignación de módulos y grupos al profesorado.</p>
        </div>
      </div>
      <div>
        <h2 className="text-[1.1rem] font-bold flex items-center gap-3 text-foreground">
          <UserCog className="w-8 h-8 text-accent" />
          Asignación de Módulos
        </h2>
        <p className="text-muted mt-2 text-lg">
          Selecciona un profesor y asígnale los grupos que imparte.
        </p>
      </div>

      <Card className="p-6">
        <div className="mb-4">
          <label className="text-sm font-semibold text-foreground block mb-2">Seleccionar Profesor</label>
          <select
            className="w-full bg-background border border-[var(--glass-border)] rounded-lg px-4 py-3 text-foreground"
            value={selectedUserId || ""}
            onChange={(e) => handleSelectUser(e.target.value)}
          >
            <option value="">-- Selecciona un profesor --</option>
            {users.map((u: any) => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </select>
        </div>

        {selectedUser && (
          <div className="mt-6">
            <h3 className="text-lg font-bold text-foreground mb-4">
              Grupos asignados a {selectedUser.name}
            </h3>
            <p className="text-sm text-muted mb-4">
              Marca los grupos que este profesor imparte este curso.
            </p>
            
            {localAssignments.length === 0 ? (
              <p className="text-muted italic">No hay grupos asignados actualmente.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {localAssignments.map((groupId: number) => (
                  <div key={groupId} className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-[var(--glass-border)]">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    <span className="text-foreground">Grupo #{groupId}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 flex gap-3">
              <Button onClick={handleSave} disabled={isSaving}>
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? "Guardando..." : "Guardar Asignaciones"}
              </Button>
              {successMsg && (
                <span className="text-success font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  {successMsg}
                </span>
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
