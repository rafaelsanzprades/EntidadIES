import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from sqlalchemy.orm import Session
from database import engine, SessionLocal
import models

def seed_full_qms():
    db = SessionLocal()
    try:
        print("Borrando datos QMS anteriores...")
        db.query(models.QmsProcess).delete()
        db.query(models.QmsEvaluation).delete()
        db.query(models.QmsIndicator).delete()
        db.query(models.QmsActivity).delete()
        db.query(models.QmsObjective).delete()
        db.query(models.QmsDafoItem).delete()
        db.query(models.QmsProgram).delete()
        db.query(models.QmsActor).delete()
        db.commit()

        print("Insertando Actores...")
        directivo = models.QmsActor(nombre="Equipo Directivo", tipo="interno", descripcion="Directora")
        db.add(directivo)
        db.commit()
        db.refresh(directivo)

        print("Insertando Programas...")
        proa = models.QmsProgram(nombre="PROA+", descripcion="Inclusión, co-docencia, mentorías, reducción brecha digital", coordinador_actor_id=directivo.id)
        erasmus = models.QmsProgram(nombre="Erasmus+", descripcion="Proyectos KA120, KA121, KA130 de internacionalización", coordinador_actor_id=directivo.id)
        xcelence = models.QmsProgram(nombre="Xcelence", descripcion="Orientación académico-profesional", coordinador_actor_id=directivo.id)
        db.add_all([proa, erasmus, xcelence])
        db.commit()
        
        print("Insertando DAFO completo...")
        dafos = [
            # Amenazas
            models.QmsDafoItem(tipo="A", descripcion="Barrio envejecido.", curso_academico="2026-2027"),
            models.QmsDafoItem(tipo="A", descripcion="Falta de personal y estabilidad docente.", curso_academico="2026-2027"),
            
            # Debilidades
            models.QmsDafoItem(tipo="D", descripcion="Pérdida de alumnado en etapas postobligatorias.", curso_academico="2026-2027"),
            models.QmsDafoItem(tipo="D", descripcion="Falta de coordinación entre profesorado y departamentos.", curso_academico="2026-2027"),
            models.QmsDafoItem(tipo="D", descripcion="Dificultad de manejo de los grupos BRIT / no BRIT.", curso_academico="2026-2027"),
            models.QmsDafoItem(tipo="D", descripcion="Falta de motivación del alumnado en actividades dispersas.", curso_academico="2026-2027"),
            models.QmsDafoItem(tipo="D", descripcion="Falta de vinculación con las familias.", curso_academico="2026-2027"),
            models.QmsDafoItem(tipo="D", descripcion="Carencias en instalaciones (Gimnasio).", curso_academico="2026-2027"),
            
            # Fortalezas (estimadas de contexto educativo normal o proyectos)
            models.QmsDafoItem(tipo="F", descripcion="Participación activa en proyectos Erasmus+.", curso_academico="2026-2027"),
            models.QmsDafoItem(tipo="F", descripcion="Implicación del equipo directivo en proyectos de innovación.", curso_academico="2026-2027"),
            models.QmsDafoItem(tipo="F", descripcion="Programa de apoyo PROA+ consolidado.", curso_academico="2026-2027"),
            
            # Oportunidades
            models.QmsDafoItem(tipo="O", descripcion="Potenciar el barrio como medio e instrumento de trabajo y difusión.", curso_academico="2026-2027"),
            models.QmsDafoItem(tipo="O", descripcion="Uso de la biblioteca como dinamizador de actividades.", curso_academico="2026-2027"),
            models.QmsDafoItem(tipo="O", descripcion="Programas de aulas abiertas para altas capacidades.", curso_academico="2026-2027"),
        ]
        db.add_all(dafos)
        
        print("Insertando Objetivos Estratégicos...")
        obj1 = models.QmsObjective(program_id=proa.id, descripcion="Reducir el absentismo escolar y mejorar convivencia en la ESO", curso_academico="2026-2027")
        obj2 = models.QmsObjective(program_id=erasmus.id, descripcion="Aumentar movilidades de alumnado y staff para formación", curso_academico="2026-2027")
        obj3 = models.QmsObjective(program_id=xcelence.id, descripcion="Integrar el mercado laboral en el currículo formativo", curso_academico="2026-2027")
        db.add_all([obj1, obj2, obj3])
        db.commit()
        db.refresh(obj1)
        db.refresh(obj2)
        db.refresh(obj3)

        print("Insertando Actividades Iniciales...")
        act1 = models.QmsActivity(
            objective_id=obj1.id,
            nombre="Planificación conjunta de actividades al inicio de curso",
            descripcion="Reuniones sistemáticas para unificar criterios y evitar dispersión de recursos.",
            responsable_actor_id=directivo.id,
            temporalizacion="Septiembre",
            estado="planificada"
        )
        act2 = models.QmsActivity(
            objective_id=obj2.id,
            nombre="Convocatoria de movilidades KA121",
            descripcion="Selección de profesorado para job shadowing en centros europeos.",
            responsable_actor_id=directivo.id,
            temporalizacion="Primer trimestre",
            estado="en_proceso"
        )
        db.add_all([act1, act2])
        
        print("Insertando Indicadores...")
        ind1 = models.QmsIndicator(
            objective_id=obj1.id,
            descripcion="% de asistencia mensual",
            meta_cuantitativa=">85%",
            valor_actual="75%",
            metodo_evaluacion="Revisión de Sigad"
        )
        ind2 = models.QmsIndicator(
            objective_id=obj1.id,
            descripcion="Nº de partes disciplinarios",
            meta_cuantitativa="<50 anuales",
            valor_actual="12",
            metodo_evaluacion="CuadernoFP / Sigad"
        )
        db.add_all([ind1, ind2])

        db.commit()
        print("Datos Seed completos inyectados correctamente.")

        print("Insertando Mapa de Procesos...")
        procesos = [
            # Estratégicos
            models.QmsProcess(tipo="estrategico", nombre="01 Planificación estratégica", drive_id="14N01gpvXZ6MMl9xVVmzQJs1qEfGkCT5w", orden=1),
            models.QmsProcess(tipo="estrategico", nombre="04 Gestión de la calidad", drive_id="1vXk0xRPk6ZjU4KyxkuUoGZIef1kRUjvF", orden=2),
            # Clave
            models.QmsProcess(tipo="clave", nombre="01 Enseñanza y aprendizaje", drive_id="19RZ9z8nNECM1bfKn8hqD4Cg9AadxTG6A", orden=3),
            models.QmsProcess(tipo="clave", nombre="02 Orientación y tutoría", drive_id=None, orden=4),
            # Apoyo
            models.QmsProcess(tipo="apoyo", nombre="01 Gestión económica", drive_id="1vLzcRC9Lb5mRUpwk-nkyJrgku1GpUwEa", orden=5),
            models.QmsProcess(tipo="apoyo", nombre="02 Mantenimiento y servicios auxiliares", drive_id="1vNbra0QpnVOkw-TJLOBRPIlPehK0wF-N", orden=6),
        ]
        db.add_all(procesos)
        db.commit()
        print("Mapa de Procesos insertado correctamente.")

    except Exception as e:
        print(f"Error seeding data: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_full_qms()
