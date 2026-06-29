"use client";
import React from 'react';
import { Shield, LayoutDashboard, Target, Users, BookOpen, Presentation, Building2, Briefcase, TrendingUp, Compass, GraduationCap, Factory, CheckCircle2, Lightbulb } from 'lucide-react';
import PageLayout from "@/components/layout/PageLayout";
import { ClaveExcellenceView } from "@/components/features/xcelence/ClaveExcellenceView";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";

export const xcelenceData = [
  {
    id: 1,
    title: "Clave 1: Sistema de calidad",
    description: "Un sistema de orientación estable, explícito y evaluable, parte del proyecto educativo.",
    infoList: ["La orientación es un pilar del PEC y está liderada por el equipo directivo.","No depende del voluntarismo: hay presupuesto y horas asignadas.","El programa es evaluado sistemáticamente con datos y retroalimentación.","Existe un programa estructurado y público, conocido por toda la comunidad."],
    stages: [
    { id: "eso12", name: "1º y 2º ESO", icon: Users, description: "Primer contacto con el modelo", actions: ["Presentar el departamento de orientación al alumnado de nuevo ingreso.","Establecer encuestas iniciales para medir expectativas vocacionales."] },
    { id: "eso34", name: "3º y 4º ESO", icon: Compass, description: "Toma de decisiones clave", actions: ["Asegurar que todas las actividades de orientación figuren en la PGA.","Evaluar el impacto del Consejo Orientador con métricas de éxito."] },
    { id: "bach", name: "Bachillerato", icon: BookOpen, description: "Madurez vocacional", actions: ["Vincular los resultados académicos con las expectativas universitarias.","Evaluar la tasa de éxito de acceso a primeras opciones."] },
    { id: "fpg", name: "FP / Especialización", icon: Factory, description: "Inserción y especialización", actions: ["Integrar el seguimiento de FCT en los indicadores de calidad del centro.","Crear una red alumni estructurada e institucionalizada."] }
  ],
    inspirations: [{"title":"Día de la Orientación","desc":"Un evento anual institucional que marca el inicio del programa de orientación."},{"title":"Panel de Datos","desc":"Uso de PowerBI para mostrar el progreso de las metas de orientación en la sala de profesores."}]
  },
  {
    id: 2,
    title: "Clave 2: Coordinación estratégica",
    description: "Equipo Xcelence liderando la orientación de forma colaborativa.",
    infoList: ["Existe un Comité de Orientación (directiva, tutores, orientador, profesorado).","Las familias y el alumnado tienen representación y voz activa.","Reuniones formales y periódicas establecidas por calendario.","Integración de la orientación en las programaciones didácticas de todos los departamentos."],
    stages: [
    { id: "eso12", name: "1º y 2º ESO", icon: Users, description: "Tutores como eje", actions: ["Reuniones mensuales de coordinación entre tutores de 1º/2º y orientación.","Diseñar actividades conjuntas de cohesión de grupo."] },
    { id: "eso34", name: "3º y 4º ESO", icon: Compass, description: "Conexión departamental", actions: ["Coordinación en CCP para que cada departamento asuma una charla vocacional.","El equipo directivo lidera la Feria de Profesiones."] },
    { id: "bach", name: "Bachillerato", icon: BookOpen, description: "Sinergias con universidad", actions: ["Coordinadores de etapa enlazan con ferias universitarias.","Reuniones de seguimiento de alumnos en riesgo de abandono."] },
    { id: "fpg", name: "FP / Especialización", icon: Factory, description: "Coordinación empresarial", actions: ["Departamentos de FP coordinados con agentes externos (cámaras de comercio).","Gestión conjunta de bolsa de empleo y prácticas."] }
  ],
    inspirations: [{"title":"Café Vocacional","desc":"Reuniones informales de tutores para compartir buenas prácticas en tutoría de orientación."},{"title":"Pasaporte Xcelence","desc":"Documento compartido entre tutores para trazar el viaje de cada alumno."}]
  },
  {
    id: 3,
    title: "Clave 3: Necesidades diversas",
    description: "Atención personalizada para la equidad y la ruptura de estereotipos.",
    infoList: ["Planes personalizados para alumnado vulnerable o de incorporación tardía.","Acciones proactivas para romper la brecha de género en carreras STEM y cuidados.","Registros detallados de adaptaciones en el proceso de orientación.","Garantizar la accesibilidad física, cognitiva y sensorial en ferias y charlas."],
    stages: [
    { id: "eso12", name: "1º y 2º ESO", icon: Users, description: "Detección temprana", actions: ["Actividades contra estereotipos de género en profesiones desde 1º ESO.","Guías visuales para alumnado de desconocimiento del idioma."] },
    { id: "eso34", name: "3º y 4º ESO", icon: Compass, description: "Planes de refuerzo", actions: ["Mentoría específica para alumnado en riesgo de abandono escolar.","Taller 'Trámites sin miedo' para gestionar becas e inscripciones."] },
    { id: "bach", name: "Bachillerato", icon: BookOpen, description: "Acompañamiento postobligatorio", actions: ["Visitas adaptadas a universidades para alumnado con discapacidad motórica.","Refuerzo de autoconfianza frente a la PAU."] },
    { id: "fpg", name: "FP / Especialización", icon: Factory, description: "Equidad en la inserción", actions: ["Acompañamiento a entrevistas de trabajo para alumnado TEA.","Campañas para fomentar la matrícula de chicas en FP Industrial."] }
  ],
    inspirations: [{"title":"Role Models Diversos","desc":"Invitar a antiguas alumnas ingenieras y antiguos alumnos enfermeros."},{"title":"Tutoría entre Iguales","desc":"Alumnado mayor mentoriza a estudiantes vulnerables más jóvenes."}]
  },
  {
    id: 4,
    title: "Clave 4: Orientación personal",
    description: "Entrevistas y seguimiento individual a lo largo del tiempo.",
    infoList: ["Todo el alumnado tiene al menos una entrevista individual anual de orientación.","Las entrevistas están estructuradas, registradas y con seguimiento.","Uso de portafolios vocacionales personales revisados periódicamente.","Coordinación fluida con las familias respecto a las metas individuales."],
    stages: [
    { id: "eso12", name: "1º y 2º ESO", icon: Users, description: "Autoconocimiento", actions: ["Entrevista inicial de acogida centrada en intereses y aficiones.","Creación de la 'Cápsula del tiempo' vocacional."] },
    { id: "eso34", name: "3º y 4º ESO", icon: Compass, description: "Exploración", actions: ["Revisión del consejo orientador en entrevista cara a cara.","Cuestionarios de intereses profesionales y devolución personalizada."] },
    { id: "bach", name: "Bachillerato", icon: BookOpen, description: "Toma de decisiones", actions: ["Sesiones individuales de diseño de 'Plan A y Plan B' post-PAU.","Acompañamiento en picos de estrés y ansiedad por rendimiento."] },
    { id: "fpg", name: "FP / Especialización", icon: Factory, description: "Plan de carrera", actions: ["Tutoría individual pre-FCT enfocada en expectativas laborales.","Simulación de entrevistas de trabajo personalizadas."] }
  ],
    inspirations: [{"title":"Carpeta Vocacional","desc":"Un dossier donde el alumno guarda sus test, reflexiones y títulos a lo largo de toda su vida escolar."},{"title":"Minutos de Oro","desc":"Micro-tutorías de 10 minutos para chequeo vocacional rápido."}]
  },
  {
    id: 5,
    title: "Clave 5: Familias como agente activo",
    description: "Colaboración estrecha con padres y madres en la orientación.",
    infoList: ["Comunicación proactiva y bidireccional sobre las opciones educativas.","Sesiones formativas específicas para padres sobre cómo orientar a sus hijos.","Participación de las familias como ponentes o recursos ('Banco de profesiones').","Apoyo especial a familias con barreras idiomáticas o socioeconómicas."],
    stages: [
    { id: "eso12", name: "1º y 2º ESO", icon: Users, description: "Primer contacto", actions: ["Reunión inicial de expectativas con el AMPA.","Charla para familias: 'El cambio a la Secundaria'."] },
    { id: "eso34", name: "3º y 4º ESO", icon: Compass, description: "Decisiones compartidas", actions: ["Taller para padres: 'Cómo leer el Consejo Orientador y opciones de 4º'.","Familias imparten charlas sobre sus oficios en tutorías."] },
    { id: "bach", name: "Bachillerato", icon: BookOpen, description: "Trámites y futuro", actions: ["Sesiones informativas conjuntas padres-alumnos sobre EVAU y becas.","Mesa redonda de dudas y miedos familiares ante la Universidad."] },
    { id: "fpg", name: "FP / Especialización", icon: Factory, description: "Apoyo a la emancipación", actions: ["Información a familias sobre el mercado laboral local y empleabilidad de la FP.","Invitación a familiares empresarios para captación FCT."] }
  ],
    inspirations: [{"title":"Banco de Profesiones","desc":"Un catálogo de padres dispuestos a recibir visitas o dar charlas sobre su trabajo."},{"title":"Café para Familias","desc":"Encuentros informales sobre becas, plazos y salidas profesionales."}]
  },
  {
    id: 6,
    title: "Clave 6: Vinculación con asignaturas",
    description: "La orientación ocurre en todas las aulas curriculares.",
    infoList: ["El 100% de los departamentos conecta su currículo con profesiones reales.","Actividades de aula que destaquen la utilidad práctica de la materia.","Invitación de expertos dentro del horario de las asignaturas STEM y Humanidades.","Uso de metodologías activas (ABP) enfocadas a retos empresariales."],
    stages: [
    { id: "eso12", name: "1º y 2º ESO", icon: Users, description: "Utilidad del aprendizaje", actions: ["Matemáticas: Resolución de problemas aplicados a presupuestos domésticos.","Lengua: El retrato (cómo me veo y cómo me ven)."] },
    { id: "eso34", name: "3º y 4º ESO", icon: Compass, description: "Conexión profesional", actions: ["Biología: Visita de sanitarios para hablar sobre genética o fisiología.","Física y Química: Talleres del CSIC vinculando ciencia y mercado laboral."] },
    { id: "bach", name: "Bachillerato", icon: BookOpen, description: "Profundización", actions: ["Economía: Charlas de técnicos de Agencia Tributaria.","Inglés: Elaboración de CV y simulación de entrevistas en otro idioma."] },
    { id: "fpg", name: "FP / Especialización", icon: Factory, description: "Habilidades blandas", actions: ["Fomentar roles rotativos (jefe de proyecto, secretario) en módulos técnicos.","Retos de emprendimiento integrados transversalmente."] }
  ],
    inspirations: [{"title":"Mural 'Para qué sirve'","desc":"En cada aula un póster destacando 5 profesiones relacionadas con esa asignatura."},{"title":"Reto Tech","desc":"Proyectos en Tecnología y Robótica simulando el trabajo de una consultora."}]
  },
  {
    id: 7,
    title: "Clave 7: Encuentros con profesionales",
    description: "Contacto directo con alumni y trabajadores en activo.",
    infoList: ["Al menos un encuentro anual garantizado con profesionales reales por alumno.","Charlas preparadas previamente en tutoría y evaluadas a posteriori.","Uso de plataformas como 'Empresas que inspiran'.","Creación y explotación de una red estructurada de antiguos alumnos."],
    stages: [
    { id: "eso12", name: "1º y 2º ESO", icon: Users, description: "Despertar vocaciones", actions: ["Visitas de oficios cercanos (bomberos, enfermeras, emprendedores locales).","Día 11-F: Mujeres científicas (exalumnas o madres) cuentan su experiencia."] },
    { id: "eso34", name: "3º y 4º ESO", icon: Compass, description: "Exploración estructurada", actions: ["Programa 'Empresas que inspiran': 4 charlas de profesionales voluntarios.","Mesas redondas con exalumnos que están cursando FP y Bachillerato."] },
    { id: "bach", name: "Bachillerato", icon: BookOpen, description: "Networking inicial", actions: ["Charlas universitarias ('Yo he sido...').","Speed-dating vocacional con profesionales de alta especialización."] },
    { id: "fpg", name: "FP / Especialización", icon: Factory, description: "Mentoría profesional", actions: ["Encuentros con gerentes de RRHH locales ('El valor de hacer las cosas bien').","Alumni de éxito vuelven para contar su trayectoria post-FCT."] }
  ],
    inspirations: [{"title":"Ciclo 'Yo he sido...'","desc":"Charlas informales donde antiguos alumnos narran sus fracasos y aciertos."},{"title":"Speed-Dating Vocacional","desc":"Rotaciones de 5 minutos donde alumnos preguntan a profesionales."}]
  },
  {
    id: 8,
    title: "Clave 8: Contextos laborales",
    description: "Inmersión práctica en el mundo de la empresa.",
    infoList: ["Mínimo una experiencia en empresa (visita o shadowing) antes de los 16 años.","Experiencias estructuradas que requieran reflexión previa y posterior.","Acuerdos a largo plazo con tejido empresarial local.","Organización de ferias o exposiciones de oficios interactivos."],
    stages: [
    { id: "eso12", name: "1º y 2º ESO", icon: Users, description: "Primeras visitas", actions: ["Excursiones a entidades locales (ej. Ayuntamiento, centro de salud).","Actividades de sensibilización sobre oficios de la zona."] },
    { id: "eso34", name: "3º y 4º ESO", icon: Compass, description: "Inmersión y Ferias", actions: ["Feria de Profesiones a final del 2º trimestre.","Visitas guiadas a fábricas o hubs tecnológicos (ej. ETOPÍA)."] },
    { id: "bach", name: "Bachillerato", icon: BookOpen, description: "Shadowing", actions: ["Programa de 'Shadowing' (acompañar a un profesional durante 1 jornada).","Visitas a laboratorios o startups."] },
    { id: "fpg", name: "FP / Especialización", icon: Factory, description: "Prácticas reales", actions: ["Módulos Dual y FCT.","Asistencia a congresos sectoriales o ferias de muestras B2B."] }
  ],
    inspirations: [{"title":"Feria de Profesiones","desc":"Stands interactivos en el patio donde empresas locales muestran lo que hacen."},{"title":"Día de Shadowing","desc":"Alumnos acompañan a un voluntario en su jornada laboral completa."}]
  },
  {
    id: 9,
    title: "Clave 9: Mercado laboral",
    description: "Información basada en datos para decisiones informadas.",
    infoList: ["Uso sistemático de informes del observatorio de empleo y portales SEPE.","El alumnado sabe interpretar salarios, tasas de paro y empleabilidad.","Información libre de sesgos y actualizada constantemente en el centro.","La orientación se adapta a los sectores emergentes (IA, transición verde)."],
    stages: [
    { id: "eso12", name: "1º y 2º ESO", icon: Users, description: "Nociones básicas", actions: ["Juegos de rol sobre la gestión de un presupuesto doméstico básico.","Aprender conceptos básicos: nómina, contrato, desempleo."] },
    { id: "eso34", name: "3º y 4º ESO", icon: Compass, description: "Mapeo de opciones", actions: ["Análisis de noticias sobre los trabajos del futuro.","Mural de empleabilidad comparando estudios universitarios vs FP."] },
    { id: "bach", name: "Bachillerato", icon: BookOpen, description: "Decisión basada en datos", actions: ["Analizar las notas de corte vs. la demanda real en Infojobs/LinkedIn.","Talleres de nuevas profesiones tecnológicas y sostenibilidad."] },
    { id: "fpg", name: "FP / Especialización", icon: Factory, description: "Búsqueda activa", actions: ["Estudio profundo del convenio colectivo de su sector.","Uso práctico de portales de empleo, creación de marca personal y LinkedIn."] }
  ],
    inspirations: [{"title":"Tablón del Empleo","desc":"Panel en los pasillos con infografías de empleabilidad por sector."},{"title":"Simulador de Salarios","desc":"Práctica de aula calculando cuánto cuesta independizarse vs salario medio."}]
  },
  {
    id: 10,
    title: "Clave 10: Transiciones",
    description: "Acompañamiento en saltos de etapa para evitar abandonos.",
    infoList: ["Planes de acogida consolidados al pasar de Primaria a Secundaria.","Programas puente entre ESO y Bachillerato/FP.","Protocolo de prevención de abandono escolar temprano.","Registro de destino de los exalumnos a los 3 años de graduarse."],
    stages: [
    { id: "eso12", name: "1º y 2º ESO", icon: Users, description: "Acogida", actions: ["Programa de alumnado ayudante o hermano mayor para los de 1º ESO.","Jornadas de puertas abiertas en coordinación con colegios adscritos."] },
    { id: "eso34", name: "3º y 4º ESO", icon: Compass, description: "Consejo vital", actions: ["Entrega detallada y explicada del Consejo Orientador.","Visita in situ a los talleres de FP Básica y Media."] },
    { id: "bach", name: "Bachillerato", icon: BookOpen, description: "Acompañamiento final", actions: ["Acompañamiento emocional exhaustivo durante las pruebas de la PAU.","Bolsa de tutorías abiertas en septiembre para repescas o cambios de opinión."] },
    { id: "fpg", name: "FP / Especialización", icon: Factory, description: "Salto al empleo", actions: ["Bolsa de empleo para exalumnos y acompañamiento tras la FCT.","Orientación para continuar de CFGM a CFGS con convalidaciones."] }
  ],
    inspirations: [{"title":"Hermano Mayor","desc":"Alumnos de cursos superiores amadrinan a los recién llegados."},{"title":"Observatorio Alumni","desc":"Seguimiento estadístico de dónde estudian o trabajan al cabo de 2 años."}]
  },
];

export default function XcelencePage() {
  const [activeTab, setActiveTab] = React.useState("1");
  const [evalData, setEvalData] = React.useState<any>(null);
  const [loadingEval, setLoadingEval] = React.useState(true);

  React.useEffect(() => {
    async function fetchEval() {
      try {
        const res = await fetch(`http://localhost:8000/api/xcelence/evaluations/1/latest`);
        if (res.ok) {
          const data = await res.json();
          setEvalData(data.eval_data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingEval(false);
      }
    }
    fetchEval();
  }, []);

  const layoutTabs = xcelenceData.map(clave => ({
    id: String(clave.id),
    label: `Clv: ${clave.id}`
  }));

  const activeClave = xcelenceData.find(c => String(c.id) === activeTab);
  const currentEval = evalData ? evalData[activeTab] : null;

  return (
    <PageLayout
      icon={<Shield className="w-8 h-8 text-blue-500" />}
      title="Programa Xcelence"
      description="Las 10 claves de orientación integradas en una sola vista."
      infoTitle="Información de Xcelence"
      infoDescription="Navega por las 10 claves de orientación para consultar sus criterios, acciones e inspiraciones."
      breadcrumbSuffix="Xcelence"
      tabs={layoutTabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {activeClave && (
        <div className="animate-in fade-in duration-300">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2 text-foreground">{activeClave.title}</h2>
            <p className="text-muted">{activeClave.description}</p>
            
            {currentEval && (
              <div className="mt-6 mb-8 p-6 bg-card border-2 border-primary/20 rounded-2xl shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10" />
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  
                  <div className="flex flex-col items-center justify-center min-w-[120px]">
                    <div className="text-sm font-bold text-muted uppercase tracking-wider mb-2">Puntuación</div>
                    <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 border-4 border-primary text-2xl font-black text-primary">
                      {currentEval.score}%
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="font-bold text-foreground flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-5 h-5 text-success" /> Situación en tu centro (2025/2026)
                      </h3>
                      <ul className="space-y-1">
                        {currentEval.situacion.map((item: string, idx: number) => (
                          <li key={idx} className="text-sm text-foreground/80 flex items-start gap-2">
                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl">
                      <h3 className="font-bold text-amber-700 flex items-center gap-2 mb-2">
                        <Lightbulb className="w-5 h-5" /> Recomendaciones
                      </h3>
                      <ul className="space-y-1">
                        {currentEval.recomendaciones.map((item: string, idx: number) => (
                          <li key={idx} className="text-sm text-amber-800/90">{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeClave.infoList && activeClave.infoList.length > 0 && (
              <div className="mt-4 p-4 bg-muted/10 rounded-xl border border-[var(--glass-border)]">
                <h3 className="font-semibold text-sm mb-2">Criterios de Excelencia</h3>
                <ul className="list-disc list-inside text-sm text-foreground/80 space-y-1">
                  {activeClave.infoList.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <ClaveExcellenceView 
            title={activeClave.title}
            description={activeClave.description}
            stages={activeClave.stages}
            inspirations={activeClave.inspirations}
          />
        </div>
      )}
    </PageLayout>
  );
}
