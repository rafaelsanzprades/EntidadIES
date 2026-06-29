from pydantic import BaseModel, ConfigDict
from typing import Optional, Dict, Any, List

class Sesion(BaseModel):
    ID: Optional[str] = None
    id_ud: Optional[str] = None
    Num_Orden: int | None = None
    Horas: int | None = None
    Tipo_Actividad: Optional[str] = None
    RA_CE: Optional[str] = None
    Contenidos: Optional[str] = None
    Aspectos_Clave: Optional[str] = None
    Recursos: Optional[str] = None

class UnidadDidactica(BaseModel):
    model_config = ConfigDict(extra='forbid')
    id_ud: str
    desc_ud: str
    horas_ud: int | None = None
    ra_mappings: Optional[Dict[str, Any]] = None

class Tarea(BaseModel):
    ID: Optional[str] = None
    id_act: Optional[str] = None
    Nombre_Tarea: Optional[str] = None
    Reto: Optional[str] = None
    RA_Asociados: Optional[str] = None
    Instrumento: Optional[str] = None
    desc_act: Optional[str] = None

class Alumnado(BaseModel):
    ID: Optional[str] = None
    student_id: Optional[str] = None
    Nombre: Optional[str] = None
    Apellidos: Optional[str] = None
    Estado: Optional[str] = None
    Edad: Optional[str] = None
    Nacimiento: Optional[str] = None
    Repite: Optional[str] = None
    Matricula: Optional[str] = None
    Comentarios: Optional[str] = None
    Email: Optional[str] = None
    Movil: Optional[str] = None

class ResultadoAprendizaje(BaseModel):
    id_ra: str
    desc_ra: Optional[str] = None
    peso_ra: int | None = None
    is_dual: Optional[str] = None

class CriterioEvaluacion(BaseModel):
    model_config = ConfigDict(extra='forbid')
    id_ce: str
    id_ra: str
    id_ud: Optional[str] = None
    desc_ce: Optional[str] = None
    peso_ce: int | None = None

class SeguimientoUD(BaseModel):
    id_ud: Optional[str] = None
    horas_ud: int | None = None
    Total_Imp: int | None = None
    model_config = ConfigDict(extra="forbid")

class CrmInteraccion(BaseModel):
    id: str
    fecha: str
    tipo: str
    descripcion: str
    contacto: str

class CrmEmpresa(BaseModel):
    id: str
    nombre: str
    contacto_nombre: str
    contacto_cargo: str
    telefono: str
    email: str
    direccion: str
    ciudad: str
    codigo_postal: str
    provincia: str
    sector: str
    notas: str
    estado: str
    interacciones: List[CrmInteraccion]
    alumnado_asignados: List[str]

class ModuleUpdateBody(BaseModel):
    df_ra: Optional[List[ResultadoAprendizaje]] = None
    df_ce: Optional[List[CriterioEvaluacion]] = None
    df_ud: Optional[List[UnidadDidactica]] = None
    df_sesiones: Optional[List[Sesion]] = None
    df_al: Optional[List[Alumnado]] = None
    df_act: Optional[List[Any]] = None
    df_eval: Optional[List[Any]] = None
    df_feoe: Optional[List[Any]] = None
    df_tareas: Optional[List[Tarea]] = None
    df_sgmt: Optional[List[SeguimientoUD]] = None
    df_pr: Optional[List[Any]] = None
    
    info_modulo: Optional[Dict[str, Any]] = None
    info_fechas: Optional[Dict[str, Any]] = None
    horario: Optional[Dict[str, Any]] = None
    planning_ledger: Optional[Dict[str, Any]] = None
    calendar_notes: Optional[Dict[str, Any]] = None
    tutoria_ledger: Optional[Dict[str, Any]] = None
    plano_clase: Optional[Any] = None
    daily_ledger: Optional[Dict[str, Any]] = None
    attendance_records: Optional[List[Any]] = None
    
    __version__: Optional[int] = None

    model_config = ConfigDict(extra="forbid")

class ChatMessage(BaseModel):
    role: str
    parts: str | list

class ChatRequest(BaseModel):
    messages: List[ChatMessage]

# ==========================================
# 8. SISTEMA DE GESTIÓN DE CALIDAD (CENTRO)
# ==========================================
class QmsActorBase(BaseModel):
    nombre: str
    tipo: Optional[str] = None
    descripcion: Optional[str] = None

class QmsActorCreate(QmsActorBase):
    pass

class QmsActorResponse(QmsActorBase):
    id: int
    model_config = ConfigDict(from_attributes=True)

class QmsProgramBase(BaseModel):
    nombre: str
    descripcion: Optional[str] = None
    coordinador_actor_id: Optional[int] = None

class QmsProgramCreate(QmsProgramBase):
    pass

class QmsProgramResponse(QmsProgramBase):
    id: int
    model_config = ConfigDict(from_attributes=True)

class QmsDafoItemBase(BaseModel):
    tipo: str
    descripcion: str
    curso_academico: Optional[str] = None

class QmsDafoItemCreate(QmsDafoItemBase):
    pass

class QmsDafoItemResponse(QmsDafoItemBase):
    id: int
    model_config = ConfigDict(from_attributes=True)

class QmsObjectiveBase(BaseModel):
    program_id: Optional[int] = None
    descripcion: str
    curso_academico: Optional[str] = None

class QmsObjectiveCreate(QmsObjectiveBase):
    pass

class QmsObjectiveResponse(QmsObjectiveBase):
    id: int
    model_config = ConfigDict(from_attributes=True)

class QmsActivityBase(BaseModel):
    objective_id: Optional[int] = None
    nombre: str
    descripcion: Optional[str] = None
    responsable_actor_id: Optional[int] = None
    temporalizacion: Optional[str] = None
    recursos: Optional[str] = None
    estado: Optional[str] = None

class QmsActivityCreate(QmsActivityBase):
    pass

class QmsActivityResponse(QmsActivityBase):
    id: int
    model_config = ConfigDict(from_attributes=True)

class QmsIndicatorBase(BaseModel):
    process_id: Optional[int] = None
    descripcion: str
    frecuencia: Optional[str] = None
    meta_cuantitativa: Optional[str] = None
    valor_actual: Optional[str] = None
    metodo_evaluacion: Optional[str] = None
    responsable: Optional[str] = None

class QmsIndicatorCreate(QmsIndicatorBase):
    pass

class QmsIndicatorResponse(QmsIndicatorBase):
    id: int
    model_config = ConfigDict(from_attributes=True)

class QmsEvaluationBase(BaseModel):
    indicator_id: Optional[int] = None
    fecha: Optional[str] = None
    analisis_desviacion: Optional[str] = None
    propuesta_mejora: Optional[str] = None

class QmsEvaluationCreate(QmsEvaluationBase):
    pass

class QmsEvaluationResponse(QmsEvaluationBase):
    id: int
    model_config = ConfigDict(from_attributes=True)

class QmsRiskBase(BaseModel):
    process_id: Optional[int] = None
    descripcion: str
    tipo: Optional[str] = None
    probabilidad: Optional[int] = None
    impacto: Optional[int] = None
    nivel_riesgo: Optional[int] = None
    accion_mitigacion: Optional[str] = None
    estado: Optional[str] = None

class QmsRiskCreate(QmsRiskBase):
    pass

class QmsRiskResponse(QmsRiskBase):
    id: int
    model_config = ConfigDict(from_attributes=True)

class QmsAuditBase(BaseModel):
    fecha: Optional[str] = None
    tipo: Optional[str] = None
    auditor: Optional[str] = None
    alcance: Optional[str] = None
    estado: Optional[str] = None

class QmsAuditCreate(QmsAuditBase):
    pass

class QmsAuditResponse(QmsAuditBase):
    id: int
    model_config = ConfigDict(from_attributes=True)

class QmsNonConformityBase(BaseModel):
    audit_id: Optional[int] = None
    process_id: Optional[int] = None
    codigo: Optional[str] = None
    descripcion: str
    tipo: Optional[str] = None
    estado: Optional[str] = None
    accion_correctiva: Optional[str] = None
    fecha_cierre_prevista: Optional[str] = None

class QmsNonConformityCreate(QmsNonConformityBase):
    pass

class QmsNonConformityResponse(QmsNonConformityBase):
    id: int
    model_config = ConfigDict(from_attributes=True)

# ==========================================
# QMS: MAPA DE PROCESOS
# ==========================================
class QmsProcessBase(BaseModel):
    tipo: str  # 'estrategico', 'clave', 'apoyo'
    grupo: Optional[str] = None
    nombre: str
    drive_id: Optional[str] = None
    descripcion: Optional[str] = None
    responsable: Optional[str] = None
    activo: bool = True
    orden: int = 0

class QmsProcessCreate(QmsProcessBase):
    pass

class QmsProcessResponse(QmsProcessBase):
    id: int
    model_config = ConfigDict(from_attributes=True)

class QmsProcessDetailResponse(QmsProcessResponse):
    indicadores: List[QmsIndicatorResponse] = []
    riesgos: List[QmsRiskResponse] = []
    no_conformidades: List[QmsNonConformityResponse] = []

# ==========================================
# XCELENCE
# ==========================================
class XcelenceEvaluationBase(BaseModel):
    center_id: int
    academic_year: str
    eval_data: Dict[str, Any] = {}

class XcelenceEvaluationCreate(XcelenceEvaluationBase):
    pass

class XcelenceEvaluationResponse(XcelenceEvaluationBase):
    id: int
    model_config = ConfigDict(from_attributes=True)
