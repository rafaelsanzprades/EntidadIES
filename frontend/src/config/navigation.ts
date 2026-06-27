import { Activity, BookOpen, Building2, Calendar, Compass, FileText, FolderOpen, GraduationCap, Grid, MapPin, Settings, TrendingUp, Users, Wrench, Sparkles, BarChart3, Shield, Award, Globe, Lightbulb } from "lucide-react";

export const navGroups = [
  {
    title: "",
    sectionDescription: "",
    items: [
      { href: "/archivos", label: "Archivos", icon: FolderOpen, description: "Sincronización en la nube y configuración del espacio de trabajo." },
      { href: "/catalogo", label: "Catálogo", icon: GraduationCap, description: "Catálogo oficial de familias profesionales, títulos, cursos → módulos. RA → CE." },
      { href: "/documentos", label: "Documentos", icon: FolderOpen, description: "Explorador de archivos oficiales, legislación y otros documentos." },
      { href: "/ayuda", label: "Ayuda", icon: Activity, description: "Panel de ayuda." }
    ]
  },
  {
    title: "Centro",
    sectionDescription: "Gestión general del centro, normativas de calidad, indicadores del sistema y empleabilidad.",
    items: [
      { href: "/acreditacion", label: "Acreditación competencias", icon: Award, description: "Procedimiento de acreditación y reconocimiento de competencias profesionales." },
      { href: "/indicadores", label: "Indicadores de calidad", icon: BarChart3, description: "Dashboard de los 34 indicadores del Sistema Estatal de Evaluación y Calidad de la FP." },
      { href: "/insercion", label: "Inserción laboral", icon: TrendingUp, description: "Indicadores de inserción profesional de titulados de FP (SEPE/INE)." },
      { href: "/calidad", label: "Calidad del centro", icon: Shield, description: "Autoevaluación y mejora continua según el Marco Común EQAVET." },
      { href: "/internacionalizacion", label: "Internacionalización", icon: Globe, description: "Programas de movilidad y cooperación internacional (Erasmus+)." },
      { href: "/innovacion", label: "Innovación y emprendimiento", icon: Lightbulb, description: "Proyectos de innovación, emprendimiento y Hubs de FP." }
    ]
  }
];
