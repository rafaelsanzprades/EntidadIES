import React, { ReactNode } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Info } from "lucide-react";

export interface TabItem {
  id: string;
  label: ReactNode;
}

export interface PageLayoutProps {
  icon: ReactNode;
  title: string;
  description: string;
  tabs?: TabItem[];
  activeTab?: string;
  onTabChange?: (id: string) => void;
  infoTitle: string;
  infoDescription: string;
  infoList?: string[];
  breadcrumbSuffix?: string;
  children: ReactNode;
  rightAction?: ReactNode;
  themeColor?: "accent" | "primary" | "info" | "success" | "warning";
}

const themeStyles = {
  accent: {
    text: "text-accent",
    bgIcon: "bg-accent/5",
    borderIcon: "border-accent/20",
  },
  primary: {
    text: "text-primary",
    bgIcon: "bg-primary/5",
    borderIcon: "border-primary/20",
  },
  info: {
    text: "text-info",
    bgIcon: "bg-info/5",
    borderIcon: "border-info/20",
  },
  success: {
    text: "text-success",
    bgIcon: "bg-success/5",
    borderIcon: "border-success/20",
  },
  warning: {
    text: "text-warning",
    bgIcon: "bg-warning/5",
    borderIcon: "border-warning/20",
  },
};

export default function PageLayout({
  icon,
  title,
  description,
  tabs = [{ id: "general", label: "General" }],
  activeTab = "general",
  onTabChange,
  infoTitle,
  infoDescription,
  infoList,
  breadcrumbSuffix,
  children,
  rightAction,
  themeColor = "success"
}: PageLayoutProps) {
  
  const styles = themeStyles[themeColor] || themeStyles.success;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen min-w-0">
        <Header breadcrumbSuffix={breadcrumbSuffix || title} />

        <div className="flex-1 p-6 md:p-8 overflow-y-auto custom-scrollbar">
          <MotionWrapper className="w-full space-y-6 pb-12">
            
            {/* Cabecera */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="text-[1.3rem] font-extrabold text-foreground tracking-tight flex items-center gap-3">
                  <div className={styles.text}>{icon}</div>
                  {title}
                </h1>
                <p className="text-muted mt-2 text-lg">{description}</p>
              </div>
            </div>

            {/* Pestañas (Tabs) */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2 mt-4">
              <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
                <div className="flex justify-between items-center w-full">
                  <TabsList>
                    {tabs.map((tab) => (
                      <TabsTrigger key={tab.id} value={tab.id}>
                        {tab.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {/* Botón de acción u otro componente que vaya a la derecha de las pestañas */}
                  {rightAction && (
                    <div className="shrink-0">
                      {rightAction}
                    </div>
                  )}
                </div>
              </Tabs>
            </div>

            {/* Info Box */}
            <div className={`flex items-start gap-3 p-4 rounded-xl ${styles.bgIcon} border ${styles.borderIcon} mb-6 mt-6`}>
              <Info className={`w-5 h-5 ${styles.text} mt-0.5 shrink-0`} />
              <div className="w-full">
                <p className="text-sm font-semibold text-foreground">{infoTitle}</p>
                <p className="text-sm text-muted mt-1">{infoDescription}</p>
                
                {infoList && infoList.length > 0 && (
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                    {infoList.map((item, i) => (
                      <div key={i} className={`flex items-start gap-2 bg-background/50 p-3 rounded-lg border ${styles.borderIcon}`}>
                        <div className={`mt-0.5 w-1.5 h-1.5 rounded-full ${styles.text.replace('text-', 'bg-')} shrink-0`} />
                        <span className="text-sm text-foreground/90">{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Contenido de la Página */}
            <div className="animate-in fade-in duration-300 pt-2">
              {children}
            </div>

          </MotionWrapper>
        </div>
      </div>
    </div>
  );
}
