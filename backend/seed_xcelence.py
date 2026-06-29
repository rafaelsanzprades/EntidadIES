import os
import sys
from sqlalchemy.orm import Session
import json

# Setup environment to load models
_backend_dir = os.path.dirname(os.path.abspath(__file__))
if _backend_dir not in sys.path:
    sys.path.insert(0, _backend_dir)

from database import SessionLocal
from models import Center, XcelenceEvaluation, Titularidad

def seed_xcelence_data():
    db: Session = SessionLocal()
    try:
        # Create or get "ANDALÁN" center
        center = db.query(Center).filter(Center.code == "ANDALAN").first()
        if not center:
            center = Center(
                code="ANDALAN",
                name="IES ANDALÁN",
                titularity=Titularidad.PUBLICA
            )
            db.add(center)
            db.commit()
            db.refresh(center)

        academic_year = "2025/2026"
        
        # Extracted data from informeXcelence.pdf
        eval_data = {
            "1": {
                "score": 52,
                "situacion": ["La orientación académico-profesional del centro es un proyecto estratégico y transversal que tiene el apoyo explícito de la dirección del centro."],
                "recomendaciones": ["¡Enhorabuena! Valorar de este modo la orientación académico-profesional en el centro va a contribuir a que ésta sea de calidad."]
            },
            "2": {
                "score": 62,
                "situacion": ["Un miembro de los orientadores coordina estratégicamente.", "El responsable tiene la orientación como tarea secundaria (entre 10 y 25% de dedicación)."],
                "recomendaciones": ["Todos estos agentes son necesarios en el equipo de OAP para cumplir con las claves Xcelence."]
            },
            "3": {
                "score": 43,
                "situacion": ["Los resultados de pruebas se interpretan con ayuda de un profesional en casos puntuales."],
                "recomendaciones": ["Las pruebas estandarizadas ayudan al alumnado a conocerse mejor. El asesoramiento y la interpretación de los resultados por parte de un profesional son muy importantes."]
            },
            "4": {
                "score": 99,
                "situacion": ["Al menos 2 entrevistas personales en ESO, 1 en Bachillerato, y 1 en FP.", "Se documenta sistemáticamente en la ESO y Bachillerato."],
                "recomendaciones": ["Garantizar un tiempo de orientación personal estructurada en el centro educativo ayuda al alumnado a concentrarse en sus intereses."]
            },
            "5": {
                "score": 53,
                "situacion": ["Las familias conocen las actividades de orientación en 1º, 2º, 3º y 4º de ESO y Bachillerato."],
                "recomendaciones": ["Hacer a las familias conocedoras del plan disminuye su incertidumbre y permite involucrarlas adecuadamente."]
            },
            "6": {
                "score": 53,
                "situacion": ["El equipo docente utiliza ejemplos y recursos didácticos que vinculan contenidos y salidas profesionales en la mayoría de asignaturas de ESO y algunas de Bachillerato."],
                "recomendaciones": ["Asegúrate de que los propios profesores se involucran en el diseño de estas actividades para que las sientan más propias y entiendan su utilidad."]
            },
            "7": {
                "score": 50,
                "situacion": ["El centro mantiene registro de contacto de antiguos alumnos y no publica casos de éxito en su web."],
                "recomendaciones": ["Estos datos nos ayudan a evaluar nuestro plan de OAP y a mejorarlo. Si mostramos casos de éxito, el alumnado conocerá todas las vías."]
            },
            "8": {
                "score": 76,
                "situacion": ["100% de alumnado en 3º/4º ESO y 50-74% en Bachillerato han tenido experiencias prelaborales.", "Exploración y visitas a empresas."],
                "recomendaciones": ["Las experiencias en contextos laborales influyen positivamente en sus oportunidades profesionales."]
            },
            "9": {
                "score": 39,
                "situacion": ["El centro no publica información sobre tendencias del mercado laboral y lo interpretan sólo equipos de orientación y ESO."],
                "recomendaciones": ["Una información tan valiosa tiene que aparecer en el máximo número de medios del centro. Traer a un profesional del mercado puede ser buena idea."]
            },
            "10": {
                "score": 93,
                "situacion": ["A partir de 3º ESO se informa sobre Bachillerato, FP, Universidad y otras opciones.", "A partir de 1º Bachillerato igual.", "Quienes informan conocen las características de las diferentes opciones."],
                "recomendaciones": ["¡Enhorabuena, lo estáis haciendo bien! Vuestro alumnado recibe información muy completa."]
            }
        }

        # Create or update evaluation
        evaluation = db.query(XcelenceEvaluation).filter(
            XcelenceEvaluation.center_id == center.id,
            XcelenceEvaluation.academic_year == academic_year
        ).first()

        if evaluation:
            evaluation.eval_data = eval_data
            print("Updated existing evaluation.")
        else:
            evaluation = XcelenceEvaluation(
                center_id=center.id,
                academic_year=academic_year,
                eval_data=eval_data
            )
            db.add(evaluation)
            print("Created new evaluation.")
        
        db.commit()
        print("Xcelence data seeded successfully.")

    except Exception as e:
        print(f"Error seeding data: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_xcelence_data()
