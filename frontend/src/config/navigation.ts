import { Shield, Users, Compass, BookOpen, Globe, TrendingUp, Layers, Building2, Rocket, FolderOpen, Activity, Briefcase, Building, Calendar, Target, FileText, ClipboardList, Scale, GraduationCap, Heart, GitBranch, AlertTriangle, FileSearch, BarChart } from "lucide-react";

export const navGroups = [
  {
    title: "",
    sectionDescription: "",
    items: [
      { href: "/archivos", label: "Archivos", icon: FolderOpen, description: "Sincronización en la nube y configuración del espacio de trabajo." },
      { href: "/calendario", label: "Calendario", icon: Calendar, description: "Diagrama de Gantt de actividades." },
      { href: "/documentos", label: "Documentos", icon: FolderOpen, description: "Explorador de archivos oficiales, legislación y otros documentos." },
      { href: "/ayuda", label: "Ayuda", icon: Activity, description: "Panel de ayuda." }
    ]
  },
  {
    title: "Centro",
    items: [
      {
        href: "/dafo",
        label: "Matriz DAFO",
        icon: Target,
        description: "Análisis interno y externo",
      },
      {
        href: "/objetivos",
        label: "Objetivos Estratégicos",
        icon: Activity,
        description: "Objetivos de dirección",
      },
      { href: "/documental", label: "Documental", icon: BookOpen, description: "Documentos oficiales del centro (PEC, RRI, PGA, etc.)." },
      { 
        href: "/direccion", 
        label: "Proyecto de Dirección", 
        icon: FileText, 
        description: "Análisis comparativo de los proyectos de dirección de IES Andalán." 
      }
    ],
  },
  {
    title: "Gestión",
    items: [
      {
        href: "/procesos",
        label: "Mapa de Procesos (SGC)",
        icon: GitBranch,
        description: "Procesos Estratégicos, Clave y de Apoyo",
      },
      {
        href: "/riesgos",
        label: "Riesgos y Oportunidades",
        icon: AlertTriangle,
        description: "Matriz de riesgos y contexto",
      },
      {
        href: "/auditorias",
        label: "Auditorías (SGC)",
        icon: ClipboardList,
        description: "Internas, externas y No Conformidades",
      },
      {
        href: "/indicadores",
        label: "Indicadores de Calidad",
        icon: BarChart,
        description: "Métricas de los procesos",
      },
    ],
  },
  {
    title: "Programas",
    items: [
      {
        href: "/programas",
        label: "Gestión de Programas",
        icon: Layers,
        description: "Ajedrez, Proa+, Erasmus...",
      },
      {
        href: "/xcelence",
        label: "Xcelence",
        icon: Shield,
        description: "Claves de Orientación",
      },
      {
        href: "/ape",
        label: "Aula de Emprendimiento",
        icon: Briefcase,
        description: "Aula Profesional de Emprendimiento",
      },
    ],
  },
];
