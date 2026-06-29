from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, JSON, DateTime, Enum, Table
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum
from database import Base

class Titularidad(enum.Enum):
    PUBLICA = "Pública"
    CONCERTADA = "Concertada"
    PRIVADA = "Privada"

# Capa 1 eliminada: Region, Province, City, ProfessionalFamily, Degree,
# Module, LearningOutcome, EvaluationCriterion
# Los datos de catálogo BOE/BOA no se almacenan en la BD del servidor.

# ==========================================
# 3. CENTROS EDUCATIVOS
# ==========================================

class Center(Base):
    __tablename__ = "centers"
    id = Column(Integer, primary_key=True, index=True)
    code = Column(String, unique=True, index=True) # Código oficial del centro
    name = Column(String, nullable=False)
    titularity = Column(Enum(Titularidad), nullable=False, default=Titularidad.PUBLICA)

# ==========================================
# 4. USUARIOS, ROLES Y CURSOS
# ==========================================
class AcademicYear(Base):
    __tablename__ = "academic_years"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True) # ej: 2024-2025
    is_active = Column(Boolean, default=False)

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String, nullable=True)
    name = Column(String)
    surname = Column(String)
    is_superadmin = Column(Boolean, default=False)
    is_student = Column(Boolean, default=False)

# Rol: Pertenencia y COFOTAP
class CenterStaff(Base):
    __tablename__ = "center_staff"
    user_id = Column(Integer, ForeignKey("users.id"), primary_key=True)
    center_id = Column(Integer, ForeignKey("centers.id"), primary_key=True)
    is_center_admin = Column(Boolean, default=False) # COFOTAP

# Rol: Jefe de Estudios
class HeadOfStudies(Base):
    __tablename__ = 'head_of_studies'
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    center_id = Column(Integer, ForeignKey('centers.id'))
    academic_year_id = Column(Integer, ForeignKey('academic_years.id'))

# Rol: Jefe de Departamento Didáctico
class DepartmentHead(Base):
    __tablename__ = 'department_heads'
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    center_id = Column(Integer, ForeignKey('centers.id'))
    academic_year_id = Column(Integer, ForeignKey('academic_years.id'))

# Rol: Coordinador Dual (Nivel Centro)
class DualCoordinator(Base):
    __tablename__ = 'dual_coordinators'
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    center_id = Column(Integer, ForeignKey('centers.id'))
    academic_year_id = Column(Integer, ForeignKey('academic_years.id'))

# Rol: Tutor Dual General (Prospector de Empresas por Centro)
class DualGeneralTutor(Base):
    __tablename__ = 'dual_general_tutors'
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    center_id = Column(Integer, ForeignKey('centers.id'))
    academic_year_id = Column(Integer, ForeignKey('academic_years.id'))

# Entidad Organizativa: Grupo/Clase (ej. 1º DAW Diurno)
class CourseGroup(Base):
    __tablename__ = "course_groups"
    id = Column(Integer, primary_key=True, index=True)
    center_id = Column(Integer, ForeignKey("centers.id"))
    academic_year_id = Column(Integer, ForeignKey("academic_years.id"))
    name = Column(String)

# Rol: Tutor de Grupo / Tutor Dual de Alumnado
class GroupTutor(Base):
    __tablename__ = "group_tutors"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    course_group_id = Column(Integer, ForeignKey("course_groups.id"))
    academic_year_id = Column(Integer, ForeignKey("academic_years.id"))
    is_dual_tutor = Column(Boolean, default=False) # Si es el responsable de seguimiento Dual de este grupo

# Rol: Profesor (Asignación de Módulos)
class TeachingAssignment(Base):
    __tablename__ = "teaching_assignments"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    course_group_id = Column(Integer, ForeignKey("course_groups.id"))
    academic_year_id = Column(Integer, ForeignKey("academic_years.id"))

# Rol: Alumnado (Matrícula)
class Enrollment(Base):
    __tablename__ = "enrollments"
    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("users.id"))
    course_group_id = Column(Integer, ForeignKey("course_groups.id"))
    academic_year_id = Column(Integer, ForeignKey("academic_years.id"))

# ==========================================
# COMPATIBILIDAD CON SISTEMA JSON ANTERIOR
# ==========================================
class ModuleDocument(Base):
    __tablename__ = "module_documents"
    id = Column(String, primary_key=True, index=True)
    doc_type = Column(String, default="pd") # "pd" or "curso"
    parent_id = Column(String, ForeignKey("module_documents.id"), nullable=True)
    data = Column(JSON, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

# ==========================================
# 5. NORMALIZED JSON DATA TABLES
# ==========================================
class DidacticUnit(Base):
    __tablename__ = "didactic_units"
    id = Column(Integer, primary_key=True, index=True)
    module_document_id = Column(String, ForeignKey("module_documents.id", ondelete="CASCADE"), index=True)
    id_ud = Column(String, index=True)
    desc_ud = Column(String)
    horas_ud = Column(Integer)
    ra_mappings = Column(JSON, default={})

class SessionModel(Base):
    __tablename__ = "sessions"
    id = Column(Integer, primary_key=True, index=True)
    module_document_id = Column(String, ForeignKey("module_documents.id", ondelete="CASCADE"), index=True)
    session_id = Column(String)
    id_ud = Column(String, index=True)
    num_orden = Column(Integer)
    horas = Column(Integer)
    tipo_actividad = Column(String)
    ra_ce = Column(String)
    contenidos = Column(String)
    aspectos_clave = Column(String)
    recursos = Column(String)

class CourseStudent(Base):
    __tablename__ = "course_students"
    id = Column(Integer, primary_key=True, index=True)
    module_document_id = Column(String, ForeignKey("module_documents.id", ondelete="CASCADE"), index=True)
    student_id = Column(String, index=True)
    estado = Column(String)
    apellidos = Column(String)
    nombre = Column(String)
    edad = Column(String) # string since it might be empty or invalid in json
    nacimiento = Column(String)
    repite = Column(String)
    matricula = Column(String)
    comentarios = Column(String)
    email = Column(String)
    movil = Column(String)

class StudentEvaluation(Base):
    __tablename__ = "student_evaluations"
    id = Column(Integer, primary_key=True, index=True)
    module_document_id = Column(String, ForeignKey("module_documents.id", ondelete="CASCADE"), index=True)
    student_id = Column(String, index=True)
    eval_data = Column(JSON, default={})

# ==========================================
# 6. NORMALIZED JSON DATA TABLES (PHASE 2)
# ==========================================
class LearningOutcomeItem(Base):
    __tablename__ = "learning_outcome_items"
    id = Column(Integer, primary_key=True, index=True)
    module_document_id = Column(String, ForeignKey("module_documents.id", ondelete="CASCADE"), index=True)
    id_ra = Column(String, index=True)
    desc_ra = Column(String)
    peso_ra = Column(String)
    is_dual = Column(Boolean, default=False)
    data = Column(JSON, default={})

class EvaluationCriterionItem(Base):
    __tablename__ = "evaluation_criterion_items"
    id = Column(Integer, primary_key=True, index=True)
    module_document_id = Column(String, ForeignKey("module_documents.id", ondelete="CASCADE"), index=True)
    id_ce = Column(String, index=True)
    id_ra = Column(String, index=True)
    id_ud = Column(String)
    desc_ce = Column(String)
    peso_ce = Column(String)
    data = Column(JSON, default={})

class ActivityItem(Base):
    __tablename__ = "activity_items"
    id = Column(Integer, primary_key=True, index=True)
    module_document_id = Column(String, ForeignKey("module_documents.id", ondelete="CASCADE"), index=True)
    id_act = Column(String, index=True)
    desc_act = Column(String)
    tipo = Column(String)
    tri_act = Column(String)
    peso_act = Column(String)
    is_active = Column(String)
    data = Column(JSON, default={})

class InstrumentItem(Base):
    __tablename__ = "instrument_items"
    id = Column(Integer, primary_key=True, index=True)
    module_document_id = Column(String, ForeignKey("module_documents.id", ondelete="CASCADE"), index=True)
    item_id = Column(String, index=True)
    practica = Column(String)
    data = Column(JSON, default={})

class TaskItem(Base):
    __tablename__ = "task_items"
    id = Column(Integer, primary_key=True, index=True)
    module_document_id = Column(String, ForeignKey("module_documents.id", ondelete="CASCADE"), index=True)
    item_id = Column(String, index=True)
    nombre_tarea = Column(String)
    reto = Column(String)
    ra_asociados = Column(String)
    instrumento = Column(String)
    data = Column(JSON, default={})

class AceItem(Base):
    __tablename__ = "ace_items"
    id = Column(Integer, primary_key=True, index=True)
    module_document_id = Column(String, ForeignKey("module_documents.id", ondelete="CASCADE"), index=True)
    item_id = Column(String, index=True)
    tipo = Column(String)
    data = Column(JSON, default={})

class DuaItem(Base):
    __tablename__ = "dua_items"
    id = Column(Integer, primary_key=True, index=True)
    module_document_id = Column(String, ForeignKey("module_documents.id", ondelete="CASCADE"), index=True)
    item_id = Column(String, index=True)
    barrera = Column(String)
    data = Column(JSON, default={})

class ContingencyItem(Base):
    __tablename__ = "contingency_items"
    id = Column(Integer, primary_key=True, index=True)
    module_document_id = Column(String, ForeignKey("module_documents.id", ondelete="CASCADE"), index=True)
    item_id = Column(String, index=True)
    escenario = Column(String)
    data = Column(JSON, default={})

class FeoeItem(Base):
    __tablename__ = "feoe_items"
    id = Column(Integer, primary_key=True, index=True)
    module_document_id = Column(String, ForeignKey("module_documents.id", ondelete="CASCADE"), index=True)
    item_id = Column(String, index=True)
    data = Column(JSON, default={})

class SgmtItem(Base):
    __tablename__ = "sgmt_items"
    id = Column(Integer, primary_key=True, index=True)
    module_document_id = Column(String, ForeignKey("module_documents.id", ondelete="CASCADE"), index=True)
    id_ud = Column(String, index=True)
    data = Column(JSON, default={})

class CalendarNoteItem(Base):
    __tablename__ = "calendar_note_items"
    id = Column(Integer, primary_key=True, index=True)
    module_document_id = Column(String, ForeignKey("module_documents.id", ondelete="CASCADE"), index=True)
    note_key = Column(String, index=True)
    note_text = Column(String)

# ==========================================
# 7. NORMALIZED JSON DATA TABLES (PHASE 3)
# ==========================================

class ConfigDates(Base):
    __tablename__ = "config_dates"
    id = Column(Integer, primary_key=True, index=True)
    module_document_id = Column(String, ForeignKey("module_documents.id", ondelete="CASCADE"), unique=True)
    data = Column(JSON, default={})

class ScheduleItem(Base):
    __tablename__ = "schedule_items"
    id = Column(Integer, primary_key=True, index=True)
    module_document_id = Column(String, ForeignKey("module_documents.id", ondelete="CASCADE"), index=True)
    day_of_week = Column(String, index=True)
    hours = Column(Integer, default=0)

class ModuleInfo(Base):
    __tablename__ = "module_infos"
    id = Column(Integer, primary_key=True, index=True)
    module_document_id = Column(String, ForeignKey("module_documents.id", ondelete="CASCADE"), unique=True)
    data = Column(JSON, default={})

class PlanningLedgerItem(Base):
    __tablename__ = "planning_ledger_items"
    id = Column(Integer, primary_key=True, index=True)
    module_document_id = Column(String, ForeignKey("module_documents.id", ondelete="CASCADE"), index=True)
    date_str = Column(String, index=True)
    id_ud = Column(String)

class AttendanceRecord(Base):
    __tablename__ = "attendance_records"
    id = Column(Integer, primary_key=True, index=True)
    module_document_id = Column(String, ForeignKey("module_documents.id", ondelete="CASCADE"), index=True)
    student_id = Column(String, index=True)
    date_str = Column(String, index=True)
    status = Column(String)


# ==========================================
# APE — AULA PROFESIONAL DE EMPRENDIMIENTO
# ==========================================

class ApePrograma(Base):
    """
    Programa APE de un curso académico.
    Datos cuasiestáticos (catálogo). Se crean una vez por curso.
    """
    __tablename__ = "ape_programas"
    id = Column(Integer, primary_key=True, index=True)
    curso_academico = Column(String, nullable=False, index=True)  # ej: "2024-25"
    nombre = Column(String, nullable=False, default="Aula Profesional de Emprendimiento")
    descripcion = Column(String)
    created_at = Column(DateTime, server_default=func.now())
    actividades = relationship("ApeActividad", back_populates="programa", order_by="ApeActividad.numero")


class ApeActividad(Base):
    """
    Actividad individual dentro de un programa APE.
    Una actividad = una salida, visita, taller o evento.
    """
    __tablename__ = "ape_actividades"
    id = Column(Integer, primary_key=True, index=True)
    programa_id = Column(Integer, ForeignKey("ape_programas.id", ondelete="CASCADE"), index=True)
    numero = Column(Integer, nullable=False)             # Orden dentro del programa (1, 2, ...)
    nombre = Column(String, nullable=False)              # ej: "Visita FIMA - Zaragoza"
    tipo = Column(String)                                # "visita_empresa", "visita_institucional", "taller", "charla", "evento", "curso"
    objetivos = Column(JSON, default=[])                 # Lista de objetivos generales
    actividades_posibles = Column(JSON, default=[])      # Lista de actividades posibles
    contenidos = Column(JSON, default=[])                # Lista de contenidos
    recursos_materiales = Column(String)                 # Descripción materiales
    recursos_economicos = Column(String)                 # Importe en euros (como string para flexibilidad)
    num_alumnos = Column(String)                         # Descripción del alumnado + total
    num_actuaciones = Column(Integer, default=1)         # Número de actuaciones realizadas
    indicadores_difusion = Column(JSON, default=[])      # ej: ["Twitter", "Instagram"]
    reuniones_preparacion = Column(String)               # Descripción reuniones internas
    reuniones_externas = Column(String)                  # Descripción contactos con externos
    observaciones = Column(String)                       # Campo libre para notas adicionales
    programa = relationship("ApePrograma", back_populates="actividades")

# ==========================================
# 8. SISTEMA DE GESTIÓN DE CALIDAD (CENTRO)
# ==========================================

class QmsActor(Base):
    __tablename__ = "qms_actors"
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    tipo = Column(String) # 'interno', 'familia', 'externo', 'pas'
    descripcion = Column(String)

class QmsProgram(Base):
    __tablename__ = "qms_programs"
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    descripcion = Column(String)
    coordinador_actor_id = Column(Integer, ForeignKey("qms_actors.id"))
    
    coordinador = relationship("QmsActor")
    objetivos = relationship("QmsObjective", back_populates="programa")

class QmsDafoItem(Base):
    __tablename__ = "qms_dafo_items"
    id = Column(Integer, primary_key=True, index=True)
    tipo = Column(String, nullable=False) # 'D', 'A', 'F', 'O'
    descripcion = Column(String, nullable=False)
    curso_academico = Column(String)

class QmsObjective(Base):
    __tablename__ = "qms_objectives"
    id = Column(Integer, primary_key=True, index=True)
    program_id = Column(Integer, ForeignKey("qms_programs.id"))
    descripcion = Column(String, nullable=False)
    curso_academico = Column(String)
    
    programa = relationship("QmsProgram", back_populates="objetivos")
    actividades = relationship("QmsActivity", back_populates="objetivo")

class QmsActivity(Base):
    __tablename__ = "qms_activities"
    id = Column(Integer, primary_key=True, index=True)
    objective_id = Column(Integer, ForeignKey("qms_objectives.id"))
    nombre = Column(String, nullable=False)
    descripcion = Column(String)
    responsable_actor_id = Column(Integer, ForeignKey("qms_actors.id"))
    temporalizacion = Column(String)
    recursos = Column(String)
    estado = Column(String) # 'planificada', 'en_proceso', 'completada', 'cancelada'
    
    objetivo = relationship("QmsObjective", back_populates="actividades")
    responsable = relationship("QmsActor")

# ==========================================
# QMS: MAPA DE PROCESOS Y RELACIONES
# ==========================================
class QmsProcess(Base):
    __tablename__ = "qms_processes"
    id = Column(Integer, primary_key=True, index=True)
    tipo = Column(String)
    grupo = Column(String, nullable=True)
    nombre = Column(String)
    drive_id = Column(String, nullable=True)
    descripcion = Column(String, nullable=True)
    responsable = Column(String, nullable=True)
    activo = Column(Boolean, default=True)
    orden = Column(Integer, default=0)

    indicadores = relationship("QmsIndicator", back_populates="proceso")
    riesgos = relationship("QmsRisk", back_populates="proceso")
    no_conformidades = relationship("QmsNonConformity", back_populates="proceso")

class QmsIndicator(Base):
    __tablename__ = "qms_indicators"
    id = Column(Integer, primary_key=True, index=True)
    process_id = Column(Integer, ForeignKey("qms_processes.id"))
    descripcion = Column(String, nullable=False)
    frecuencia = Column(String)
    meta_cuantitativa = Column(String)
    valor_actual = Column(String)
    metodo_evaluacion = Column(String)
    responsable = Column(String)
    
    proceso = relationship("QmsProcess", back_populates="indicadores")
    evaluaciones = relationship("QmsEvaluation", back_populates="indicador")

class QmsEvaluation(Base):
    __tablename__ = "qms_evaluations"
    id = Column(Integer, primary_key=True, index=True)
    indicator_id = Column(Integer, ForeignKey("qms_indicators.id"))
    fecha = Column(String)
    analisis_desviacion = Column(String)
    propuesta_mejora = Column(String)
    
    indicador = relationship("QmsIndicator", back_populates="evaluaciones")

class QmsRisk(Base):
    __tablename__ = "qms_risks"
    id = Column(Integer, primary_key=True, index=True)
    process_id = Column(Integer, ForeignKey("qms_processes.id"), nullable=True)
    descripcion = Column(String, nullable=False)
    tipo = Column(String) # 'Riesgo' u 'Oportunidad'
    probabilidad = Column(Integer) # 1 a 5
    impacto = Column(Integer) # 1 a 5
    nivel_riesgo = Column(Integer) # probabilidad * impacto
    accion_mitigacion = Column(String)
    estado = Column(String) # 'Abierto', 'Mitigado', 'Cerrado'

    proceso = relationship("QmsProcess", back_populates="riesgos")

class QmsAudit(Base):
    __tablename__ = "qms_audits"
    id = Column(Integer, primary_key=True, index=True)
    fecha = Column(String)
    tipo = Column(String) # 'Interna', 'Externa'
    auditor = Column(String)
    alcance = Column(String)
    estado = Column(String) # 'Planificada', 'En curso', 'Finalizada'
    
    no_conformidades = relationship("QmsNonConformity", back_populates="auditoria")

class QmsNonConformity(Base):
    __tablename__ = "qms_non_conformities"
    id = Column(Integer, primary_key=True, index=True)
    audit_id = Column(Integer, ForeignKey("qms_audits.id"))
    process_id = Column(Integer, ForeignKey("qms_processes.id"), nullable=True)
    codigo = Column(String) # ej. NC-2025-01
    descripcion = Column(String, nullable=False)
    tipo = Column(String) # 'Crítica', 'Mayor', 'Menor', 'Observación'
    estado = Column(String) # 'Abierta', 'En curso', 'Cerrada'
    accion_correctiva = Column(String)
    fecha_cierre_prevista = Column(String)
    
    auditoria = relationship("QmsAudit", back_populates="no_conformidades")
    proceso = relationship("QmsProcess", back_populates="no_conformidades")

# ==========================================
# XCELENCE
# ==========================================
class XcelenceEvaluation(Base):
    __tablename__ = "xcelence_evaluations"
    id = Column(Integer, primary_key=True, index=True)
    center_id = Column(Integer, ForeignKey("centers.id"))
    academic_year = Column(String) # ej. "2025/2026"
    
    # Store the parsed details for each Clave in a JSON column.
    # Format: 
    # {
    #   "1": { "score": 52, "situacion": ["..."], "recomendaciones": ["..."] },
    #   "2": { "score": 62, "situacion": ["..."], "recomendaciones": ["..."] },
    #   ...
    # }
    eval_data = Column(JSON, default={})
    
    center = relationship("Center")
