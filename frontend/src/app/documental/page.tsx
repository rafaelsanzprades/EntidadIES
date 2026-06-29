"use client";
import React, { useState } from "react";
import { BookOpen, Scale, GraduationCap, ClipboardList, Users, Heart } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";

export default function DocumentalPage() {
  const [activeTab, setActiveTab] = useState("pec");

  const layoutTabs = [
    { id: "pec", label: <span className="flex items-center gap-2"><BookOpen className="w-4 h-4" /> PEC</span> },
    { id: "rri", label: <span className="flex items-center gap-2"><Scale className="w-4 h-4" /> RRI</span> },
    { id: "pce", label: <span className="flex items-center gap-2"><GraduationCap className="w-4 h-4" /> PCE</span> },
    { id: "pga", label: <span className="flex items-center gap-2"><ClipboardList className="w-4 h-4" /> PGA</span> },
    { id: "pat", label: <span className="flex items-center gap-2"><Users className="w-4 h-4" /> PAT</span> },
    { id: "pca", label: <span className="flex items-center gap-2"><Heart className="w-4 h-4" /> PCA</span> },
  ];

  return (
    <PageLayout
      icon={<BookOpen className="w-8 h-8 text-blue-500" strokeWidth={2.5} />}
      title="Documental"
      description="Documentos oficiales del centro (PEC, RRI, PCE, PGA, PAT, PCA)."
      infoTitle="Información Documental"
      infoDescription="Accede a los documentos institucionales y planes que regulan el funcionamiento, la convivencia y la organización del centro."
      breadcrumbSuffix="Documental"
      tabs={layoutTabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {activeTab === "pec" && (
        <div className="animate-in fade-in duration-300">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2 text-foreground">Proyecto Educativo de Centro (PEC)</h2>
            <p className="text-muted">Documento marco que define el modelo educativo, la cultura inclusiva y los principios del centro.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="Estructura del PEC" color="blue">
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>• Identidad y valores del centro</li>
                <li>• Análisis del contexto</li>
                <li>• Líneas generales de actuación</li>
                <li>• Modelo de organización</li>
                <li>• Proyecto de gestión</li>
              </ul>
            </Card>
            <Card title="Cultura inclusiva" color="green">
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>• Principios de inclusión</li>
                <li>• Atención a la diversidad</li>
                <li>• Medidas organizativas</li>
                <li>• Difusión del PEC a la comunidad</li>
              </ul>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "rri" && (
        <div className="animate-in fade-in duration-300">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2 text-foreground">Reglamento de Régimen Interior (RRI)</h2>
            <p className="text-muted">Normas de organización y funcionamiento del centro para garantizar un clima adecuado.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="Normas Generales" color="blue">
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>• Derechos y deberes del alumnado</li>
                <li>• Conductas contrarias a la convivencia</li>
                <li>• Medidas correctoras</li>
                <li>• Procedimientos sancionadores</li>
              </ul>
            </Card>
            <Card title="Organización" color="amber">
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>• Uso de instalaciones</li>
                <li>• Entradas y salidas</li>
                <li>• Recreos y zonas comunes</li>
                <li>• Actividades extraescolares</li>
              </ul>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "pce" && (
        <div className="animate-in fade-in duration-300">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2 text-foreground">Proyecto Curricular de Etapa (PCE)</h2>
            <p className="text-muted">Concreción del currículo oficial a las características del centro y del alumnado.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="Desarrollo Curricular" color="blue">
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>• Objetivos de etapa</li>
                <li>• Competencias clave</li>
                <li>• Metodología didáctica</li>
                <li>• Criterios de evaluación</li>
              </ul>
            </Card>
            <Card title="Programaciones" color="green">
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>• Programaciones didácticas</li>
                <li>• Unidades de trabajo/didácticas</li>
                <li>• Materiales y recursos</li>
                <li>• Adaptaciones curriculares</li>
              </ul>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "pga" && (
        <div className="animate-in fade-in duration-300">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2 text-foreground">Programación General Anual (PGA)</h2>
            <p className="text-muted">Planificación de todos los aspectos de la organización y funcionamiento del curso.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="Planificación" color="blue">
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>• Objetivos anuales</li>
                <li>• Horarios y calendario</li>
                <li>• Programas y proyectos</li>
                <li>• Actividades extraescolares</li>
              </ul>
            </Card>
            <Card title="Seguimiento y Memoria" color="purple">
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>• Evaluación de resultados</li>
                <li>• Memoria final de curso</li>
                <li>• Propuestas de mejora</li>
                <li>• Grado de consecución de objetivos</li>
              </ul>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "pat" && (
        <div className="animate-in fade-in duration-300">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2 text-foreground">Plan de Acción Tutorial (PAT)</h2>
            <p className="text-muted">Orientación académica, personal y profesional del alumnado.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="Funciones del tutor" color="blue">
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>• Coordinación del equipo docente</li>
                <li>• Atención individual al alumnado</li>
                <li>• Reuniones con familias</li>
                <li>• Informes y valoraciones</li>
              </ul>
            </Card>
            <Card title="Orientación académica" color="amber">
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>• Itinerarios formativos</li>
                <li>• Orientación profesional</li>
                <li>• Salidas académicas</li>
                <li>• Información sobre FP y Universidad</li>
              </ul>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "pca" && (
        <div className="animate-in fade-in duration-300">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2 text-foreground">Plan de Convivencia y Apoyo (PCA)</h2>
            <p className="text-muted">Convivencia, igualdad, bienestar emocional y prevención de la violencia.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="Convivencia e Igualdad" color="blue">
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>• Normas de convivencia y mediación escolar</li>
                <li>• Resolución pacífica de conflictos</li>
                <li>• Coeducación e igualdad efectiva</li>
                <li>• Diversidad afectivo-sexual</li>
              </ul>
            </Card>
            <Card title="Bienestar emocional" color="green">
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>• Salud mental del alumnado</li>
                <li>• Prevención del acoso escolar</li>
                <li>• Protocolos de actuación (ACNEAE)</li>
                <li>• Prevención de adicciones y uso de Internet</li>
              </ul>
            </Card>
          </div>
        </div>
      )}
    </PageLayout>
  );
}

function Card({ title, color, children }: { title: string; color: "blue" | "green" | "amber" | "purple" | "pink"; children: React.ReactNode }) {
  const colorClasses = {
    blue: "bg-blue-500/5 border-blue-500/20 text-blue-400",
    green: "bg-green-500/5 border-green-500/20 text-green-400",
    amber: "bg-amber-500/5 border-amber-500/20 text-amber-400",
    purple: "bg-purple-500/5 border-purple-500/20 text-purple-400",
    pink: "bg-pink-500/5 border-pink-500/20 text-pink-400",
  };
  return (
    <div className={`p-5 rounded-xl border ${colorClasses[color]} shadow-md`}>
      <h3 className={`font-bold mb-3 ${colorClasses[color].split(" ")[2]}`}>{title}</h3>
      {children}
    </div>
  );
}

