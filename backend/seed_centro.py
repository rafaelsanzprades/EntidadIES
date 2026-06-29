import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from sqlalchemy.orm import Session
from database import engine, SessionLocal
import models

def seed_qms_data():
    db = SessionLocal()
    try:
        # Check if already seeded
        if db.query(models.QmsActor).first():
            print("QMS data already seeded.")
            return

        print("Seeding QMS data...")
        
        # 1. Actors
        directivo = models.QmsActor(nombre="Equipo Directivo", tipo="interno", descripcion="Directora")
        db.add(directivo)
        db.commit()
        db.refresh(directivo)
        
        # 2. Programs
        proa = models.QmsProgram(
            nombre="PROA+",
            descripcion="Inclusión, co-docencia, mentorías, reducción brecha digital",
            coordinador_actor_id=directivo.id
        )
        erasmus = models.QmsProgram(
            nombre="Erasmus+ (KA120, KA121, KA130)",
            descripcion="Internacionalización e intercambios",
            coordinador_actor_id=directivo.id
        )
        xcelence = models.QmsProgram(
            nombre="Xcelence",
            descripcion="Orientación académico-profesional",
            coordinador_actor_id=directivo.id
        )
        db.add_all([proa, erasmus, xcelence])
        db.commit()
        
        # 3. DAFO
        dafos = [
            models.QmsDafoItem(tipo="D", descripcion="Alta interinidad del profesorado", curso_academico="2026-2027"),
            models.QmsDafoItem(tipo="A", descripcion="Desfase tecnológico en algunas familias", curso_academico="2026-2027"),
            models.QmsDafoItem(tipo="F", descripcion="Implicación del Equipo Directivo", curso_academico="2026-2027"),
            models.QmsDafoItem(tipo="O", descripcion="Proyectos europeos Erasmus+", curso_academico="2026-2027"),
        ]
        db.add_all(dafos)
        
        # 4. Objectives
        obj1 = models.QmsObjective(
            program_id=proa.id,
            descripcion="Reducir el absentismo escolar en grado básico",
            curso_academico="2026-2027"
        )
        obj2 = models.QmsObjective(
            program_id=erasmus.id,
            descripcion="Aumentar movilidades de alumnado de grado superior",
            curso_academico="2026-2027"
        )
        db.add_all([obj1, obj2])
        db.commit()
        db.refresh(obj1)
        db.refresh(obj2)
        
        # 5. Activities
        act1 = models.QmsActivity(
            objective_id=obj1.id,
            nombre="Taller de mentoría entre iguales",
            responsable_actor_id=directivo.id,
            temporalizacion="Primer trimestre",
            estado="planificada"
        )
        db.add(act1)
        
        # 6. Indicators
        ind1 = models.QmsIndicator(
            objective_id=obj1.id,
            descripcion="% de asistencia mensual",
            meta_cuantitativa=">85%",
            valor_actual="75%",
            metodo_evaluacion="Revisión de Sigad"
        )
        db.add(ind1)
        
        db.commit()
        print("QMS data seeded successfully.")
    except Exception as e:
        print(f"Error seeding data: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_qms_data()
