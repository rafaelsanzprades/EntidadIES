import React from "react";
import { Calendar } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { GanttChart } from "@/components/features/calendario/GanttChart";

export default function CalendarioPage() {
  return (
    <PageLayout
      icon={<Calendar className="w-6 h-6" />}
      title="Calendario"
      description="Planificación temporal de eventos, entregas e hitos importantes."
      infoTitle="Planificación Temporal"
      infoDescription="Aquí puedes ver de un vistazo cómo se distribuyen las actividades en el tiempo."
      breadcrumbSuffix="Calendario"
    >
      <GanttChart />
    </PageLayout>
  );
}
