"use client";
import React, { useState } from "react";
import { Briefcase, BarChart2, Rocket, List, TrendingUp, ExternalLink } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { ApeView } from "@/components/features/ape/ApeView";

export default function ApePage() {
  const [activeTab, setActiveTab] = useState("resumen");

  const layoutTabs = [
    { id: "resumen", label: <span className="flex items-center gap-2"><BarChart2 className="w-4 h-4" /> Resumen</span> },
    { id: "actividades", label: <span className="flex items-center gap-2"><List className="w-4 h-4" /> Actividades</span> },
    { id: "evolucion", label: <span className="flex items-center gap-2"><TrendingUp className="w-4 h-4" /> Evolución</span> },
    { id: "proyectos", label: <span className="flex items-center gap-2"><Rocket className="w-4 h-4" /> Proyectos Emprendedores</span> },
  ];

  return (
    <PageLayout
      icon={<Briefcase className="w-6 h-6" />}
      title="Aula Profesional de Emprendimiento"
      description="Actividades, visitas y talleres organizados por el APE."
      infoTitle="Información APE"
      infoDescription={
        <div className="flex flex-col gap-3 mt-1">
          <p>Gestiona aquí las actividades vinculadas al Aula Profesional de Emprendimiento.</p>
          <div className="flex flex-wrap gap-2">
            <a
              href="https://educa.aragon.es/-/fp/programas-y-proyectos/ape"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 border border-primary/30 bg-primary/5 hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Web APE Aragón
            </a>
            <a
              href="https://sites.google.com/cifpa.aragon.es/apesaragon/inicio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 border border-primary/30 bg-primary/5 hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" /> APE Aragón (sites)
            </a>
          </div>
        </div>
      }
      breadcrumbSuffix="APE"
      tabs={layoutTabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {(activeTab === "resumen" || activeTab === "actividades" || activeTab === "evolucion") && (
        <div className="animate-in fade-in duration-300">
          <ApeView currentView={activeTab} />
        </div>
      )}

      {activeTab === "proyectos" && (
        <div className="animate-in fade-in duration-300 flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-[var(--glass-border)] rounded-2xl bg-muted/5">
          <Rocket className="w-12 h-12 text-muted mb-4" />
          <h3 className="text-xl font-bold mb-2">Proyectos Emprendedores</h3>
          <p className="text-muted max-w-md">
            Aquí se mostrarán los proyectos incubados en el Aula Profesional de Emprendimiento. Próximamente.
          </p>
        </div>
      )}
    </PageLayout>
  );
}
