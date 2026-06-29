"""
seed_ape.py — Carga los datos del programa APE del curso 2024-25 del IES Andalón.
Fuente: Memoria APE_IES ANDALAN_24 (1).docx

Uso:
    cd backend
    python seed_ape.py
"""
import sys
import os

_backend_dir = os.path.dirname(os.path.abspath(__file__))
if _backend_dir not in sys.path:
    sys.path.insert(0, _backend_dir)

from database import SessionLocal, engine, Base
from models import ApePrograma, ApeActividad

Base.metadata.create_all(bind=engine)

PROGRAMA_2024_25 = {
    "curso_academico": "2024-25",
    "nombre": "Aula Profesional de Emprendimiento – IES Andalón",
    "descripcion": (
        "Memoria del Aula Profesional de Emprendimiento (APE) del IES Andalón, "
        "curso 2024-25. Incluye visitas a empresas e instituciones, talleres y cursos "
        "orientados a fomentar el espíritu emprendedor y el conocimiento del entorno "
        "profesional entre el alumnado de Formación Profesional."
    ),
}

ACTIVIDADES_2024_25 = [
    {
        "numero": 1,
        "nombre": "Visita FIMA - Zaragoza",
        "tipo": "visita_empresa",
        "objetivos": [
            "Fomentar el espíritu emprendedor para despertar el interés en la creación y gestión de empresas.",
            "Aprender sobre la implantación de soluciones tecnológicas del primer sector y conocer el entorno profesional.",
            "La transformación digital en la agricultura.",
        ],
        "actividades_posibles": [
            "Realización del cuestionario elaborado para el alumnado (adjunto)",
        ],
        "contenidos": [
            "Investigación previa de expositores",
            "Organización del recorrido planificado",
            "Preparación de entrevistas con expertos.",
            "Asistir a demostraciones prácticas.",
            "Análisis de tendencias.",
            "Prevención de riesgos laborales en el sector.",
        ],
        "recursos_materiales": "Fotocopias con la propuesta del trabajo a realizar. Autobús de ida y vuelta.",
        "recursos_economicos": "275€",
        "num_alumnos": "Alumnado que cursa 1º y 2º curso de GM y GS de Telecomunicaciones. Total 47 alumnos",
        "num_actuaciones": 1,
        "indicadores_difusion": ["Twitter"],
        "reuniones_preparacion": "4 reuniones del equipo APE, para tomar las decisiones",
        "reuniones_externas": "En realidad no han sido reuniones, pero sí varios correos de comunicación para la adquisición de la entrada en grupo y de la contratación del autobús.",
    },
    {
        "numero": 2,
        "nombre": "Visita CAAR LEGO",
        "tipo": "visita_empresa",
        "objetivos": [
            "Conocer el Clúster de Automoción y Movilidad de Aragón",
            "Conocer las bases de la mejora continua y el lean management a través de Caar Lego Truck factory",
            "Fomentar el espíritu emprendedor para despertar el interés en la creación y gestión de empresas.",
            "Conocer el ecosistema de automoción y movilidad de Aragón para generar una industria más competitiva, internacional, innovadora y generadora de talento.",
            "Optimizar las tecnologías de fabricación aditiva utilizando materiales reciclados para lograr una mayor eficiencia y sostenibilidad del proceso productivo.",
        ],
        "actividades_posibles": [
            "CAAR Academy fomenta el empleo en las empresas asociadas a través de la gamificación",
        ],
        "contenidos": [
            "Investigación de Tecnologías para Procesos de Fabricación Aditiva Flexibles e Inteligentes de Materiales Sostenibles, en el que colaboran las pymes aragonesas.",
        ],
        "recursos_materiales": "Autobús de ida y vuelta.",
        "recursos_economicos": "231€",
        "num_alumnos": "Alumnado que cursa 2º curso de GM y GS de Telecomunicaciones. Total 47 alumnos",
        "num_actuaciones": 1,
        "indicadores_difusion": ["Twitter"],
        "reuniones_preparacion": "4 reuniones del equipo APE, para tomar las decisiones",
        "reuniones_externas": "En realidad no han sido reuniones, pero sí varios correos de comunicación para la adquisición de la entrada en grupo y de la contratación del autobús.",
    },
    {
        "numero": 3,
        "nombre": "Visita Bodega Viñas del Vero",
        "tipo": "visita_empresa",
        "objetivos": [
            "Fomentar el espíritu emprendedor para despertar el interés en la creación y gestión de empresas.",
            "Conocer de primera mano experiencias empresariales aragonesas con buenas ideas de negocio.",
            "Conocer productos aragoneses con Denominación de Origen para incorporarlos al catálogo de la empresa.",
        ],
        "actividades_posibles": [
            "Plasmar y llevar a la práctica nuestro modelo empresarial.",
        ],
        "contenidos": [
            "Conocer los diferentes espacios de la bodega, el viñedo, salas de elaboración y comercialización.",
            "Reactivación de las relaciones comerciales de nuestra empresa simulada AGASAJO, SAS.",
            "Solicitar embalajes para poder utilizarlos en el stand de futuras ferias profesionales.",
        ],
        "recursos_materiales": "Autobús de ida y vuelta.",
        "recursos_economicos": "795€",
        "num_alumnos": "Alumnado que cursa 1º y 2º curso de GM de Gestión Administrativa y 1º de GS de Telecomunicaciones. Total 45 alumnos",
        "num_actuaciones": 1,
        "indicadores_difusion": ["Twitter"],
        "reuniones_preparacion": "4 reuniones del equipo APE, para tomar las decisiones",
        "reuniones_externas": "En realidad no han sido reuniones, pero sí varios correos de comunicación para la adquisición de la entrada en grupo y de la contratación del autobús, así como llamadas telefónicas.",
    },
    {
        "numero": 4,
        "nombre": "Visita Campus Digital de FP – Zaragoza",
        "tipo": "visita_institucional",
        "objetivos": [
            "Conocer de primera mano el Campus Digital de FP, su oferta formativa, área de Coworking e instalaciones.",
            "Fomentar el espíritu emprendedor para despertar el interés en la creación y gestión de empresas.",
        ],
        "actividades_posibles": [],
        "contenidos": [
            "Investigación previa de expositores",
            "Organización del recorrido planificado",
            "Preparación de entrevistas con expertos.",
            "Asistir a demostraciones prácticas.",
            "Análisis de tendencias.",
            "Prevención de riesgos laborales en el sector.",
        ],
        "recursos_materiales": "Ninguno.",
        "recursos_economicos": "0€ (el instituto está muy cerca del Campus Digital, fuimos caminando)",
        "num_alumnos": "Alumnado que cursa 1º y 2º curso de GS de Telecomunicaciones. Total 25 alumnos, más los profesores del departamento de Telecomunicaciones, del departamento de Administración y de FOL",
        "num_actuaciones": 1,
        "indicadores_difusion": ["Twitter"],
        "reuniones_preparacion": "1 reunión del equipo APE, para tomar las decisiones",
        "reuniones_externas": "Correos mantenidos para establecer la cita.",
    },
    {
        "numero": 5,
        "nombre": "Charla-Taller de Creatividad e Innovación Exponencial para un Mundo Sostenible y alineada con los 17 ODS",
        "tipo": "taller",
        "objetivos": [
            "Aprender a diferenciar correctamente los conceptos de Creatividad, Innovación e Innovación Exponencial y todo lo que abarcan. Personas, Procesos, Lugares y Productos.",
            "Experimentar cómo funciona la creatividad con ejercicios, técnicas y dinámicas que abran tu mente para desarrollar al máximo la creatividad.",
            "Comprender el proceso creativo, sus fases y las nueve actitudes clave para desarrollar la creatividad en cada fase.",
            "Aprender a desarrollar un Proyecto de Innovación en Equipo alineado con los Objetivos de Desarrollo Sostenible.",
            "Conocer herramientas para trabajar el desarrollo de los 17 ODS en el Aula.",
        ],
        "actividades_posibles": [
            "Creación y selección de ideas de negocio.",
        ],
        "contenidos": [
            "¿Qué es creatividad, innovación e innovación exponencial? ¿Para qué sirve? ¿Cuál es su esencia? Tu talento creativo.",
            "Ejercicios prácticos y experimentación. Las nueve actitudes creativas.",
            "La creatividad es un Don y un Proceso. Las 4 fases y sus herramientas clave.",
            "Las técnicas más poderosas que utilizan las personas más creativas.",
            "Dinamización de un proceso creativo.",
            "Tendencias actuales, futuras y diferenciadoras alineadas con los 17 ODS",
            "Metodología Innovando en Equipo. Cómo emprender y realizar un proyecto innovador express y con resultados.",
        ],
        "recursos_materiales": "Fotocopias para recoger las firmas y documentación necesaria.",
        "recursos_economicos": "242€",
        "num_alumnos": "Alumnado de 2º curso de GM y GS de Telecomunicaciones y 2º curso de GM de Administrativo. Total 30 alumnos",
        "num_actuaciones": 1,
        "indicadores_difusion": ["Twitter (con foto de la actividad)"],
        "reuniones_preparacion": "3 reuniones del equipo APE",
        "reuniones_externas": "Varios correos y mensajes con Alberto Asiain para preparar la visita.",
        "observaciones": "Formador: Alberto Asiain. Duración: 1 día (2 horas lectivas).",
    },
    {
        "numero": 6,
        "nombre": "Semana del Emprendedor – Huesca",
        "tipo": "evento",
        "objetivos": [
            "Aprender a diferenciar correctamente los conceptos de Creatividad, Innovación e Innovación Exponencial y todo lo que abarcan. Personas, Procesos, Lugares y Productos.",
            "Experimentar cómo funciona la creatividad con ejercicios, técnicas y dinámicas que abran tu mente para desarrollar al máximo la creatividad.",
            "Comprender el proceso creativo, sus fases y las nueve actitudes clave para desarrollar la creatividad en cada fase.",
            "Aprender a desarrollar un Proyecto de Innovación en Equipo alineado con los Objetivos de Desarrollo Sostenible.",
            "Conocer herramientas para trabajar el desarrollo de los 17 ODS en el Aula.",
        ],
        "actividades_posibles": [
            "Creación y selección de ideas de negocio.",
        ],
        "contenidos": [
            "¿Qué es creatividad, innovación e innovación exponencial? ¿Para qué sirve? ¿Cuál es su esencia? Tu talento creativo.",
            "Ejercicios prácticos y experimentación. Las nueve actitudes creativas.",
            "La creatividad es un Don y un Proceso. Las 4 fases y sus herramientas clave.",
            "Las técnicas más poderosas que utilizan las personas más creativas.",
            "Dinamización de un proceso creativo.",
            "Tendencias actuales, futuras y diferenciadoras alineadas con los 17 ODS",
            "Metodología Innovando en Equipo. Cómo emprender y realizar un proyecto innovador express y con resultados.",
        ],
        "recursos_materiales": "Fotocopias para recoger las firmas y documentación necesaria.",
        "recursos_economicos": "423,5€",
        "num_alumnos": "Alumnado de 2º curso de GM y GS de Telecomunicaciones",
        "num_actuaciones": 1,
        "indicadores_difusion": ["Twitter (con foto de la actividad)"],
        "reuniones_preparacion": "3 reuniones del equipo APE",
        "reuniones_externas": "Varios correos y mensajes.",
        "observaciones": "Formador: Alberto Asiain. Duración: 1 día (6 horas lectivas).",
    },
    {
        "numero": 7,
        "nombre": "Curso de Marketing Digital",
        "tipo": "curso",
        "objetivos": [
            "Aprender la importancia del marketing digital",
            "Descubrir estrategias para destacar en redes sociales",
            "Aprender a publicar en redes sociales",
            "Conocer las redes sociales profesionales",
        ],
        "actividades_posibles": [
            "Creación de un perfil en LinkedIn.",
        ],
        "contenidos": [
            "La web corporativa como herramienta principal de visibilidad",
            "Cómo hacer una web llamativa y atractiva para el usuario",
            "Elementos clave para hacer buena web o tienda online",
            "Cómo ayuda un Blog a posicionarte en Google",
            "Cómo sacarle el máximo partido a Facebook e Instagram",
            "LinkedIn, la red social profesional más grande del mundo",
            "Tik tok y los nuevos modelos de contenido audiovisual",
            "Sácale el máximo partido a Google My Business",
        ],
        "recursos_materiales": "Fotocopias para recoger las firmas y documentación necesaria.",
        "recursos_economicos": "400€",
        "num_alumnos": "Alumnado de 2º curso de GM y GS de Telecomunicaciones y 2º curso de GM de Administrativo. Total 30 alumnos",
        "num_actuaciones": 1,
        "indicadores_difusion": ["Publicación en Instagram del IES"],
        "reuniones_preparacion": "3 reuniones del equipo APE",
        "reuniones_externas": "Varios correos y mensajes con Miriam Chueca para preparar la visita.",
        "observaciones": "Formadora: Miriam Chueca. Duración: 1 día (2 horas lectivas).",
    },
    {
        "numero": 8,
        "nombre": "Taller «Prepara la exposición de tu proyecto»",
        "tipo": "taller",
        "objetivos": [
            "Proporcionar a los alumnos las técnicas y herramientas necesarias para desarrollar sus habilidades comunicativas y ganar eficacia en sus presentaciones en público",
        ],
        "actividades_posibles": [
            "Hacer una presentación oral eficaz",
        ],
        "contenidos": [
            "Conoce tus habilidades comunicativas.",
            "Técnicas y herramientas para comunicar con seguridad y vencer el miedo escénico.",
            "Técnicas y herramientas para una comunicación eficaz (verbal y no verbal): postura corporal, voz y preparación del mensaje.",
        ],
        "recursos_materiales": "Fotocopias para recoger las firmas y documentación necesaria.",
        "recursos_economicos": "150€",
        "num_alumnos": "Alumnado de 2º curso de GM y GS de Telecomunicaciones y 2º curso de GM de Administrativo. Total 30 alumnos",
        "num_actuaciones": 1,
        "indicadores_difusion": ["Twitter (con foto de la actividad)"],
        "reuniones_preparacion": "3 reuniones del equipo APE",
        "reuniones_externas": "Varios correos, mensajes y llamadas con Laura para preparar la visita.",
        "observaciones": "Formadora: Laura Bona Pérez-Caballero. Duración: 1 día (1 hora lectiva).",
    },
]


def seed_ape():
    db = SessionLocal()
    try:
        # Check if already seeded
        existing = db.query(ApePrograma).filter_by(curso_academico="2024-25").first()
        if existing:
            print("[OK] APE 2024-25 ya estaba en la BD. Nada que hacer.")
            return

        print("Seeding APE 2024-25...")
        programa = ApePrograma(**PROGRAMA_2024_25)
        db.add(programa)
        db.flush()  # get ID

        for act_data in ACTIVIDADES_2024_25:
            act = ApeActividad(programa_id=programa.id, **act_data)
            db.add(act)

        db.commit()
        print(f"[OK] Programa APE 2024-25 creado con {len(ACTIVIDADES_2024_25)} actividades.")
    except Exception as e:
        db.rollback()
        print(f"[ERROR] {e}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed_ape()
