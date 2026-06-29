"use client";
import React, { useState } from 'react';
import { Target, Lightbulb, GraduationCap, CheckCircle2, ChevronRight } from 'lucide-react';
import { MotionWrapper } from "@/components/ui/MotionWrapper";

export interface StageContent {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  actions: string[];
}

export interface ClaveExcellenceProps {
  title: string;
  description: string;
  stages: StageContent[];
  inspirations: { title: string; desc: string }[];
}

export function ClaveExcellenceView({ title, description, stages, inspirations }: ClaveExcellenceProps) {
  const [activeStage, setActiveStage] = useState<string>(stages[0]?.id || "");

  const activeStageData = stages.find(s => s.id === activeStage);

  return (
    <div className="space-y-8">
      {/* 2. Matriz de Etapas (Interactivo) */}
      <div>
        <h3 className="text-xl font-bold text-foreground flex items-center gap-2 mb-6">
          <GraduationCap className="w-6 h-6 text-blue-500" />
          Aterrizaje por Etapa Educativa
        </h3>
        <div className="flex flex-col xl:flex-row gap-6">
          {/* Tabs Sidebar */}
          <div className="xl:w-1/4 flex flex-row xl:flex-col overflow-x-auto xl:overflow-x-visible gap-2 pb-2 xl:pb-0 shrink-0">
            {stages.map((stage) => {
              const Icon = stage.icon;
              const isActive = activeStage === stage.id;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStage(stage.id)}
                  className={`flex items-center justify-between text-left px-4 py-3 rounded-xl transition-all whitespace-nowrap xl:whitespace-normal border-2 ${
                    isActive
                      ? 'bg-blue-500/10 border-blue-500 text-blue-600 font-bold shadow-sm'
                      : 'bg-card border-transparent text-muted hover:bg-muted/10 hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'opacity-70'}`} />
                    <span>{stage.name}</span>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 hidden xl:block" />}
                </button>
              );
            })}
          </div>

          {/* Active Tab Content */}
          <div className="xl:w-3/4 min-h-[300px]">
            {activeStageData && (() => {
              const StageIcon = activeStageData.icon;
              return (
                <MotionWrapper key={activeStage} className="bg-card border border-[var(--glass-border)] rounded-2xl p-6 md:p-8 shadow-sm h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--glass-border)]">
                    <div className="bg-blue-500/10 p-3 rounded-xl">
                      <StageIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-foreground">{activeStageData.name}</h4>
                      <p className="text-muted mt-1">{activeStageData.description}</p>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h5 className="font-semibold text-foreground mb-4 uppercase tracking-wider text-sm text-blue-500">
                      Acciones Recomendadas
                    </h5>
                    <ul className="space-y-4">
                      {activeStageData.actions.map((action, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="mt-1 w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                          <span className="text-foreground/80 leading-relaxed">{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </MotionWrapper>
              );
            })()}
            {!activeStageData && (
              <div className="h-full flex items-center justify-center text-muted">
                Selecciona una etapa educativa
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Inspiración y Recursos */}
      <div className="pt-4">
        <h3 className="text-xl font-bold text-foreground flex items-center gap-2 mb-6">
          <Lightbulb className="w-6 h-6 text-amber-500" />
          Escuelas que Inspiran: Ideas Prácticas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {inspirations.map((insp, i) => (
            <div key={i} className="bg-card border border-[var(--glass-border)] p-6 rounded-2xl hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <h4 className="font-bold text-foreground mb-3 leading-tight">{insp.title}</h4>
              <p className="text-sm text-muted leading-relaxed">{insp.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
