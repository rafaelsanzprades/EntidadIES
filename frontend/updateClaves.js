const fs = require('fs');
const path = require('path');

const clavesData = {
  1: {
    diagnostico: { text: "Autoevaluación inicial completada. Resultados del centro en esta clave: 46%. Se ha detectado necesidad de integrar todos los sectores de la comunidad.", score: 2 },
    planAccion: [
      { id: "1a", text: "Constitución del Comité Xcelence (Profesorado, Familias y Alumnado)", completed: true },
      { id: "1b", text: "Nueva autoevaluación de diagnóstico a final de curso", completed: false },
      { id: "1c", text: "Presentación inicial del proyecto al Claustro para vencer reticencias iniciales", completed: true },
      { id: "1d", text: "Elaborar la memoria de evaluación a final de curso recogiendo aportaciones del Comité", completed: false }
    ],
    evidencias: ["ESTRATEGIA DE ORIENTACIÓN ACADÉMICO-PROFESIONAL IES ANDALÁN.pdf", "Actas del Comité Xcelence.pdf"]
  },
  2: {
    diagnostico: { text: "Resultados del centro en esta clave: 62%. Coordinación estratégica establecida a través de la CCP y Jefaturas de Departamento.", score: 3 },
    planAccion: [
      { id: "2a", text: "Crear un equipo Xcelence estable (CEAP + profesorado con reducción lectiva)", completed: false },
      { id: "2b", text: "Utilizar una Excel en el 'Andalán Común' (DRIVE) para el seguimiento", completed: false },
      { id: "2c", text: "Encauzar la recopilación de actividades a través de la CCP y Jefes de Departamento", completed: true }
    ],
    evidencias: ["Planificación temporalizada por cursos.xlsx"]
  },
  3: {
    diagnostico: { text: "Resultados del centro: 43%. Necesidad de atención al alumnado vulnerabilizado (incorporación tardía, dificultades emocionales, TDAH, autismo, etc.).", score: 2 },
    planAccion: [
      { id: "3a", text: "Taller 'Trámites sin Miedo' en el aula de informática para inscripciones y becas", completed: false },
      { id: "3b", text: "Elaborar y proporcionar Guías visuales y multilingües", completed: false },
      { id: "3c", text: "Acompañamiento cercano en las salidas (accesibilidad cognitiva, sensorial y motórica)", completed: false }
    ],
    evidencias: ["Dossier_Atencion_Diversidad.pdf", "Guia_Visual_Multilingue.pdf"]
  },
  4: {
    diagnostico: { text: "Resultados del centro: 82%. Puntos fuertes: Acogida de alumnado, Círculos de diálogo, Sistemas de ayuda entre iguales y Educación afectiva y sexual (AMALTEA).", score: 4 },
    planAccion: [
      { id: "4a", text: "Semana de la Formación Profesional: visitas y talleres de educación financiera", completed: true },
      { id: "4b", text: "Consolidar los Círculos de Diálogo y Sistemas de ayuda entre iguales", completed: true }
    ],
    evidencias: ["Registro_Tutorias_Individuales.pdf"]
  },
  5: {
    diagnostico: { text: "Resultados del centro: 43%. Hay barreras de acceso a la información y recursos en familias vulnerabilizadas.", score: 2 },
    planAccion: [
      { id: "5a", text: "Intervención personalizada y acompañamiento en becas para familias vulnerabilizadas", completed: false },
      { id: "5b", text: "Captar familias para el 'Banco de profesiones'", completed: false },
      { id: "5c", text: "Implicar a las familias en la organización de la Feria de Profesiones", completed: false }
    ],
    evidencias: ["Acta_Reunion_AMPA.pdf", "Listado_Familias_Voluntarias.xlsx"]
  },
  6: {
    diagnostico: { text: "Resultados del centro: 33%. Gran margen de mejora para conectar las asignaturas con ámbitos profesionales.", score: 1 },
    planAccion: [
      { id: "6a", text: "EF: Fomentar roles de entrenador, árbitro o preparador físico", completed: false },
      { id: "6b", text: "Plástica: Diseño de cartelería y packaging", completed: false },
      { id: "6c", text: "Lengua: Análisis de profesiones en la literatura y debate", completed: false }
    ],
    evidencias: ["Documento_Actividades_Orientacion_Departamentos.pdf"]
  },
  7: {
    diagnostico: { text: "Resultados del centro: 45%. Buena implantación de la plataforma 'Empresas que inspiran' (Ibercaja) con 4 charlas realizadas en 3º ESO.", score: 2 },
    planAccion: [
      { id: "7a", text: "Charlas de profesionales voluntarios a través de 'Empresas que inspiran'", completed: true },
      { id: "7b", text: "Día de la Mujer y la Niña en la Ciencia (11-F): entrevistas a científicas, exalumnas y madres", completed: true },
      { id: "7c", text: "Ciclo de charlas 'Yo he sido...' con Amigos del Andalán", completed: false }
    ],
    evidencias: ["Feedback_Charlas_Empresas_Que_Inspiran_3ESO.pdf"]
  },
  8: {
    diagnostico: { text: "Resultados del centro: 39%. Falta proporcionar mayores experiencias en contextos laborales.", score: 2 },
    planAccion: [
      { id: "8a", text: "Taller de elementos químicos y plasma con investigadores del CSIC", completed: true },
      { id: "8b", text: "Diseñar el reto: 'Feria de Profesiones' con el departamento de Innovación", completed: false },
      { id: "8c", text: "Charlas de emprendimiento en ETOPÍA (La Terminal)", completed: true }
    ],
    evidencias: ["Borrador_Proyecto_Feria_Profesiones_26_27.pdf"]
  },
  9: {
    diagnostico: { text: "Resultados del centro: 32%. Falta sistematizar la información sobre mercado laboral y hacerla accesible a todo el alumnado.", score: 1 },
    planAccion: [
      { id: "9a", text: "Formación y Orientación Personal (Economía): Charla de Agencia Tributaria", completed: true },
      { id: "9b", text: "Análisis de empleabilidad por sectores", completed: false }
    ],
    evidencias: []
  },
  10: {
    diagnostico: { text: "Resultados del centro: 89%. Punto más fuerte del centro. Muy buena preparación para la transición a itinerarios postobligatorios.", score: 4 },
    planAccion: [
      { id: "10a", text: "Elaborar Consejo Orientador con 3 sesiones de entrevistas individuales", completed: true },
      { id: "10b", text: "Diseñar plan de carrera profesional realista en FP y Bachillerato", completed: true }
    ],
    evidencias: []
  }
};

const baseDir = path.join(__dirname, 'c:', 'GD-rsp', 'APP-EntidadIES', 'frontend', 'src', 'app', 'claves');

for (let i = 1; i <= 10; i++) {
  const filePath = path.join('c:\\', 'GD-rsp', 'APP-EntidadIES', 'frontend', 'src', 'app', 'claves', `clave${i}`, 'page.tsx');
  if (!fs.existsSync(filePath)) {
    console.log(`Missing file: ${filePath}`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf-8');

  // Add the import if not present
  if (!content.includes('ClaveInteractiveBox')) {
    content = content.replace("import { Tabs, TabsList, TabsTrigger } from \"@/components/ui/Tabs\";", 
      "import { Tabs, TabsList, TabsTrigger } from \"@/components/ui/Tabs\";\nimport { ClaveInteractiveBox } from \"@/components/features/xcelence/ClaveInteractiveBox\";");
  }

  // Find the exact block starting with {/* PLACEHOLDERS PARA EL USUARIO */}
  // and ending with </div> before </MotionWrapper>
  const placeholderRegex = /\{\/\*\s*PLACEHOLDERS PARA EL USUARIO\s*\*\/\}(.|\n)*?(\s*)\}\s*<\/MotionWrapper>/g;
  
  const replacement = `{/* CONTENIDO INTERACTIVO */}
            <ClaveInteractiveBox 
              diagnostico={${JSON.stringify(clavesData[i].diagnostico, null, 2)}}
              planAccion={${JSON.stringify(clavesData[i].planAccion, null, 2)}}
              evidencias={${JSON.stringify(clavesData[i].evidencias, null, 2)}}
            />
          </MotionWrapper>`;

  // The regex replaces the ending </MotionWrapper> as well, so we add it back.
  let newContent = content;
  
  // Actually, a safer replace:
  const splitContent = content.split('{/* PLACEHOLDERS PARA EL USUARIO */}');
  if (splitContent.length > 1) {
    const before = splitContent[0];
    const afterSplit = splitContent[1].split('</MotionWrapper>');
    if (afterSplit.length > 1) {
      afterSplit.shift(); // remove the grid div part
      const after = afterSplit.join('</MotionWrapper>');
      newContent = before + replacement + after;
    }
  }

  fs.writeFileSync(filePath, newContent, 'utf-8');
  console.log(`Updated clave${i}`);
}
