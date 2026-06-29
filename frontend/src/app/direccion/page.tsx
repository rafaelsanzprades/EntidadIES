"use client";
import React, { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { BookOpen, Users, Building2, GraduationCap, MessageSquare, Shield, BarChart3, Info } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";

// Estructura de tabs basada en los índices de ambos documentos
const TABS = [
  { value: "contexto", label: "Contexto", icon: Building2 },
  { value: "objetivos", label: "Objetivos", icon: BarChart3 },
  { value: "organizacion", label: "Organización", icon: Users },
  { value: "pedagogia", label: "Pedagogía", icon: GraduationCap },
  { value: "formacion", label: "Formación", icon: BookOpen },
  { value: "participacion", label: "Participación", icon: MessageSquare },
  { value: "convivencia", label: "Convivencia", icon: Shield },
];

export default function DireccionPage() {
  const [activeTab, setActiveTab] = useState("contexto");

  // Format tabs for PageLayout
  const layoutTabs = TABS.map(tab => ({
    id: tab.value,
    label: (
      <span className="flex items-center gap-2">
        <tab.icon className="w-4 h-4" />
        {tab.label}
      </span>
    )
  }));

  return (
    <PageLayout
      icon={<BookOpen className="w-8 h-8" strokeWidth={2.5} />}
      title="Proyecto de Dirección"
      description="Análisis comparativo de los proyectos de dirección de IES Andalán."
      tabs={layoutTabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      infoTitle="Documentos institucionales - Proyectos de Dirección"
      infoDescription="Contenido extraído de los proyectos presentados por el Equipo Directivo."
      breadcrumbSuffix="Proyecto de Dirección"
    >

            {/* Contenido */}
            <div className="space-y-6 animate-in fade-in duration-500">
              
              {activeTab === "contexto" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card title="Equipo Directivo" color="blue">
                    <p className="text-sm text-foreground/80 mb-3">Análisis del contexto específico del centro, su relación con el entorno, las familias y otras instituciones.</p>
                    <ul className="space-y-2 text-sm text-foreground/70">
                      <li>• Ubicación: Barrio de la Almozara, Zaragoza</li>
                      <li>• Centro preferente TEA (Trastorno del Espectro Autista)</li>
                      <li>• 8 centros de primaria adscritos</li>
                      <li>• Población: 30.002 hab. (padrón 2025)</li>
                      <li>• AMPA activa + Asociación de Amigos del Andalán</li>
                      <li>• Colaboración con Zona Joven (Ayuntamiento)</li>
                    </ul>
                  </Card>
                  <Card title="Equipo de Calidad" color="purple">
                    <p className="text-sm text-foreground/80 mb-3">Análisis del contexto específico del centro, su relación con el entorno, las familias y otras instituciones.</p>
                    <ul className="space-y-2 text-sm text-foreground/70">
                      <li>• Contexto socioeconómico del barrio</li>
                      <li>• Red de centros adscritos</li>
                      <li>• Relación con instituciones locales</li>
                      <li>• Participación de las familias</li>
                    </ul>
                  </Card>
                </div>
              )}

              {activeTab === "objetivos" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card title="Equipo Directivo" color="blue">
                    <p className="text-sm text-foreground/80 mb-3">Objetivos de mejora y proyectos de innovación educativa.</p>
                    <ul className="space-y-2 text-sm text-foreground/70">
                      <li>• Programación de clases con esfuerzo y metodologías activas</li>
                      <li>• Incremento del bienestar del alumnado (programa Xcelence)</li>
                      <li>• Movilidades Erasmus y alumnado vulnerable</li>
                      <li>• Proyectos transversales e interdisciplinares</li>
                      <li>• Aumento de oferta formativa FP y Bachillerato de Excelencia</li>
                    </ul>
                  </Card>
                  <Card title="Equipo de Calidad" color="purple">
                    <p className="text-sm text-foreground/80 mb-3">Objetivos de mejora organizados por ámbitos.</p>
                    <ul className="space-y-2 text-sm text-foreground/70">
                      <li>• Documentos institucionales</li>
                      <li>• Convivencia</li>
                      <li>• Inclusión</li>
                      <li>• Organización y participación</li>
                      <li>• Innovación</li>
                      <li>• Actividades complementarias e internacionales</li>
                      <li>• Comunicación</li>
                      <li>• Formación Profesional</li>
                      <li>• Resultados académicos</li>
                      <li>• Infraestructuras y equipamientos</li>
                    </ul>
                  </Card>
                </div>
              )}

              {activeTab === "organizacion" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card title="Equipo Directivo" color="blue">
                    <p className="text-sm text-foreground/80 mb-3">Modelo de organización y funcionamiento del centro.</p>
                    <ul className="space-y-2 text-sm text-foreground/70">
                      <li>• Competencias de la dirección (art. 132 LOE)</li>
                      <li>• Órganos de coordinación docente</li>
                      <li>• Claustro: 81 profesores</li>
                      <li>• Coordinadores: Erasmus, PROA+</li>
                    </ul>
                  </Card>
                  <Card title="Equipo de Calidad" color="purple">
                    <p className="text-sm text-foreground/80 mb-3">Modelo de organización y funcionamiento del centro.</p>
                    <ul className="space-y-2 text-sm text-foreground/70">
                      <li>• Órganos de gobierno</li>
                      <li>• Áreas con horas complementarias</li>
                      <li>• Comisiones de trabajo</li>
                    </ul>
                  </Card>
                </div>
              )}

              {activeTab === "pedagogia" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card title="Equipo Directivo" color="blue">
                    <p className="text-sm text-foreground/80 mb-3">Planteamientos pedagógicos: inclusión y mejora de resultados.</p>
                    <ul className="space-y-2 text-sm text-foreground/70">
                      <li>• Desarrollo del principio de inclusión</li>
                      <li>• Metodologías activas (ABP, gamificación, cooperativo)</li>
                      <li>• Mejora de resultados académicos</li>
                      <li>• Competencia digital docente y del alumnado</li>
                    </ul>
                  </Card>
                  <Card title="Equipo de Calidad" color="purple">
                    <p className="text-sm text-foreground/80 mb-3">Planteamientos pedagógicos: inclusión y mejora de resultados.</p>
                    <ul className="space-y-2 text-sm text-foreground/70">
                      <li>• Principio de inclusión</li>
                      <li>• Mejora de resultados académicos</li>
                    </ul>
                  </Card>
                </div>
              )}

              {activeTab === "formacion" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card title="Equipo Directivo" color="blue">
                    <p className="text-sm text-foreground/80 mb-3">Plan de formación del profesorado en el centro.</p>
                    <ul className="space-y-2 text-sm text-foreground/70">
                      <li>• Inclusión educativa y metodologías activas</li>
                      <li>• Competencia digital y tecnologías emergentes</li>
                      <li>• Convivencia, igualdad y bienestar emocional</li>
                    </ul>
                  </Card>
                  <Card title="Equipo de Calidad" color="purple">
                    <p className="text-sm text-foreground/80 mb-3">Plan de formación del profesorado en el centro.</p>
                    <ul className="space-y-2 text-sm text-foreground/70">
                      <li>• Objetivos destacados de formación</li>
                    </ul>
                  </Card>
                </div>
              )}

              {activeTab === "participacion" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card title="Equipo Directivo" color="blue">
                    <p className="text-sm text-foreground/80 mb-3">Participación de la comunidad educativa y plan de comunicación.</p>
                    <ul className="space-y-2 text-sm text-foreground/70">
                      <li>• Familias</li>
                      <li>• Profesorado</li>
                      <li>• Alumnado</li>
                    </ul>
                  </Card>
                  <Card title="Equipo de Calidad" color="purple">
                    <p className="text-sm text-foreground/80 mb-3">Participación de la comunidad educativa y plan de comunicación.</p>
                    <ul className="space-y-2 text-sm text-foreground/70">
                      <li>• Profesores</li>
                      <li>• Alumnos</li>
                      <li>• Familias</li>
                      <li>• Personal de Administración y Servicios</li>
                    </ul>
                  </Card>
                </div>
              )}

              {activeTab === "convivencia" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card title="Equipo Directivo" color="blue">
                    <p className="text-sm text-foreground/80 mb-3">Convivencia, tolerancia y prevención de conflictos.</p>
                    <ul className="space-y-2 text-sm text-foreground/70">
                      <li>• Tolerancia y convivencia pacífica</li>
                      <li>• Prevención y resolución de conflictos</li>
                      <li>• Diversidad de todo tipo</li>
                      <li>• Igualdad efectiva hombres/mujeres</li>
                      <li>• Prevención de discriminación</li>
                      <li>• Prevención de violencia</li>
                    </ul>
                  </Card>
                  <Card title="Equipo de Calidad" color="purple">
                    <p className="text-sm text-foreground/80 mb-3">Convivencia, tolerancia y prevención de conflictos.</p>
                    <ul className="space-y-2 text-sm text-foreground/70">
                      <li>• Tolerancia y convivencia pacífica</li>
                      <li>• Prevención y resolución de conflictos</li>
                      <li>• Respeto a la diversidad</li>
                      <li>• Igualdad efectiva</li>
                      <li>• Prevención de comportamientos discriminatorios</li>
                      <li>• Prevención de todo tipo de violencia</li>
                    </ul>
                  </Card>
                </div>
              )}
            </div>
    </PageLayout>
  );
}

// Componente Card auxiliar
function Card({ title, color, children }: { title: string; color: "blue" | "purple"; children: React.ReactNode }) {
  const colorClasses = {
    blue: "bg-blue-500/5 border-blue-500/20 text-blue-400",
    purple: "bg-purple-500/5 border-purple-500/20 text-purple-400",
  };

  return (
    <div className={`p-5 rounded-xl border ${colorClasses[color]} shadow-md`}>
      <h3 className={`font-bold mb-3 ${colorClasses[color].split(" ")[2]}`}>{title}</h3>
      {children}
    </div>
  );
}
