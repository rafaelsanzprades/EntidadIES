from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from database import get_db
from models import ApePrograma, ApeActividad
from typing import List, Optional
from pydantic import BaseModel

router = APIRouter(prefix="/ape", tags=["APE"])


# ─── Schemas ────────────────────────────────────────────────────────────────

class ApeActividadOut(BaseModel):
    id: int
    numero: int
    nombre: str
    tipo: Optional[str] = None
    objetivos: Optional[list] = []
    actividades_posibles: Optional[list] = []
    contenidos: Optional[list] = []
    recursos_materiales: Optional[str] = None
    recursos_economicos: Optional[str] = None
    num_alumnos: Optional[str] = None
    num_actuaciones: Optional[int] = 1
    indicadores_difusion: Optional[list] = []
    reuniones_preparacion: Optional[str] = None
    reuniones_externas: Optional[str] = None
    observaciones: Optional[str] = None

    class Config:
        from_attributes = True


class ApeProgramaOut(BaseModel):
    id: int
    curso_academico: str
    nombre: str
    descripcion: Optional[str] = None
    actividades: List[ApeActividadOut] = []

    class Config:
        from_attributes = True


# ─── Endpoints ──────────────────────────────────────────────────────────────

@router.get("/programas", response_model=List[ApeProgramaOut])
def get_programas(db: Session = Depends(get_db)):
    """Devuelve todos los programas APE (todos los cursos académicos)."""
    return db.query(ApePrograma).options(joinedload(ApePrograma.actividades)).order_by(ApePrograma.curso_academico.desc()).all()


@router.get("/programas/{curso_academico}", response_model=ApeProgramaOut)
def get_programa_by_curso(curso_academico: str, db: Session = Depends(get_db)):
    """Devuelve el programa APE de un curso académico concreto (ej: '2024-25')."""
    programa = (
        db.query(ApePrograma)
        .options(joinedload(ApePrograma.actividades))
        .filter(ApePrograma.curso_academico == curso_academico)
        .first()
    )
    if not programa:
        raise HTTPException(status_code=404, detail=f"No existe programa APE para el curso {curso_academico}")
    return programa


@router.get("/cursos", response_model=List[str])
def get_cursos_disponibles(db: Session = Depends(get_db)):
    """Devuelve lista de cursos académicos con datos APE."""
    result = db.query(ApePrograma.curso_academico).order_by(ApePrograma.curso_academico.desc()).all()
    return [r[0] for r in result]
