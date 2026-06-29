"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { navGroups } from "@/config/navigation";
import { Card } from "@/components/ui/Card";
import { Spinner } from "@/components/common/Spinner";
import { MotionWrapper } from "@/components/ui/MotionWrapper";

import { Home } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";

export default function InicioPage() {
  const { moduleData, cursoData, setModuleData, setCursoData, activeModuleId, activeCursoId } = useAppStore();

  return (
    <PageLayout
      icon={<Home className="w-8 h-8" />}
      title="Inicio"
      description="Bienvenido a tu panel de control principal."
      infoTitle="Herramienta operativa y de gestión - Inicio"
      infoDescription="Panel de control de acceso rápido a todas las herramientas de la plataforma."
    >
      {/* Menus Grid */}
      <div className="space-y-12">
        {navGroups.map((group, groupIdx) => (
          <MotionWrapper key={group.title} delay={groupIdx * 0.1}>
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-3">
                {group.title}
              </h2>
              {group.sectionDescription && (
                <p className="text-muted text-base max-w-4xl pb-4 border-b border-[var(--glass-border)]">
                  {group.sectionDescription}
                </p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {group.items.map((item, itemIdx) => (
                  <Link key={item.href} href={item.href} className="block group">
                    <Card className="h-full p-5 flex flex-col gap-3 border border-[var(--glass-border)] bg-[var(--glass-bg)] hover:bg-accent/5 hover:border-accent/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/10 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                          <item.icon className="w-8 h-8" strokeWidth={1.5} />
                        </div>
                        <h3 className="font-bold text-base text-foreground group-hover:text-accent transition-colors leading-tight">
                          {item.label}
                        </h3>
                      </div>
                      {item.description && (
                        <p className="text-sm text-muted mt-auto">
                          {item.description}
                        </p>
                      )}
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </MotionWrapper>
        ))}
      </div>
    </PageLayout>
  );
}

