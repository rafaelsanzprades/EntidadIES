from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from database import get_db
import models
import schemas

router = APIRouter(
    prefix="/api/qms",
    tags=["qms"]
)

# --- DAFO ---
@router.get("/dafo", response_model=List[schemas.QmsDafoItemResponse])
def read_dafo(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.QmsDafoItem).offset(skip).limit(limit).all()

@router.post("/dafo", response_model=schemas.QmsDafoItemResponse)
def create_dafo(item: schemas.QmsDafoItemCreate, db: Session = Depends(get_db)):
    db_item = models.QmsDafoItem(**item.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.put("/dafo/{item_id}", response_model=schemas.QmsDafoItemResponse)
def update_dafo(item_id: int, item: schemas.QmsDafoItemCreate, db: Session = Depends(get_db)):
    db_item = db.query(models.QmsDafoItem).filter(models.QmsDafoItem.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    for key, value in item.model_dump().items():
        setattr(db_item, key, value)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.delete("/dafo/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_dafo(item_id: int, db: Session = Depends(get_db)):
    db_item = db.query(models.QmsDafoItem).filter(models.QmsDafoItem.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(db_item)
    db.commit()
    return None

# --- OBJECTIVES ---
@router.get("/objectives", response_model=List[schemas.QmsObjectiveResponse])
def read_objectives(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.QmsObjective).offset(skip).limit(limit).all()

@router.post("/objectives", response_model=schemas.QmsObjectiveResponse)
def create_objective(item: schemas.QmsObjectiveCreate, db: Session = Depends(get_db)):
    db_item = models.QmsObjective(**item.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.put("/objectives/{item_id}", response_model=schemas.QmsObjectiveResponse)
def update_objective(item_id: int, item: schemas.QmsObjectiveCreate, db: Session = Depends(get_db)):
    db_item = db.query(models.QmsObjective).filter(models.QmsObjective.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    for key, value in item.model_dump().items():
        setattr(db_item, key, value)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.delete("/objectives/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_objective(item_id: int, db: Session = Depends(get_db)):
    db_item = db.query(models.QmsObjective).filter(models.QmsObjective.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(db_item)
    db.commit()
    return None

# --- ACTIVITIES ---
@router.get("/activities", response_model=List[schemas.QmsActivityResponse])
def read_activities(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.QmsActivity).offset(skip).limit(limit).all()

@router.post("/activities", response_model=schemas.QmsActivityResponse)
def create_activity(item: schemas.QmsActivityCreate, db: Session = Depends(get_db)):
    db_item = models.QmsActivity(**item.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.put("/activities/{item_id}", response_model=schemas.QmsActivityResponse)
def update_activity(item_id: int, item: schemas.QmsActivityCreate, db: Session = Depends(get_db)):
    db_item = db.query(models.QmsActivity).filter(models.QmsActivity.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    for key, value in item.model_dump().items():
        setattr(db_item, key, value)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.delete("/activities/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_activity(item_id: int, db: Session = Depends(get_db)):
    db_item = db.query(models.QmsActivity).filter(models.QmsActivity.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(db_item)
    db.commit()
    return None

# --- INDICATORS ---
@router.get("/indicators", response_model=List[schemas.QmsIndicatorResponse])
def read_indicators(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.QmsIndicator).offset(skip).limit(limit).all()

@router.post("/indicators", response_model=schemas.QmsIndicatorResponse)
def create_indicator(item: schemas.QmsIndicatorCreate, db: Session = Depends(get_db)):
    db_item = models.QmsIndicator(**item.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.put("/indicators/{item_id}", response_model=schemas.QmsIndicatorResponse)
def update_indicator(item_id: int, item: schemas.QmsIndicatorCreate, db: Session = Depends(get_db)):
    db_item = db.query(models.QmsIndicator).filter(models.QmsIndicator.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    for key, value in item.model_dump().items():
        setattr(db_item, key, value)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.delete("/indicators/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_indicator(item_id: int, db: Session = Depends(get_db)):
    db_item = db.query(models.QmsIndicator).filter(models.QmsIndicator.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(db_item)
    db.commit()
    return None

# --- EVALUATIONS ---
@router.get("/evaluations", response_model=List[schemas.QmsEvaluationResponse])
def read_evaluations(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.QmsEvaluation).offset(skip).limit(limit).all()

@router.post("/evaluations", response_model=schemas.QmsEvaluationResponse)
def create_evaluation(item: schemas.QmsEvaluationCreate, db: Session = Depends(get_db)):
    db_item = models.QmsEvaluation(**item.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.put("/evaluations/{item_id}", response_model=schemas.QmsEvaluationResponse)
def update_evaluation(item_id: int, item: schemas.QmsEvaluationCreate, db: Session = Depends(get_db)):
    db_item = db.query(models.QmsEvaluation).filter(models.QmsEvaluation.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    for key, value in item.model_dump().items():
        setattr(db_item, key, value)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.delete("/evaluations/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_evaluation(item_id: int, db: Session = Depends(get_db)):
    db_item = db.query(models.QmsEvaluation).filter(models.QmsEvaluation.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(db_item)
    db.commit()
    return None

# --- PROGRAMS ---
@router.get("/programs", response_model=List[schemas.QmsProgramResponse])
def read_programs(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.QmsProgram).offset(skip).limit(limit).all()

@router.post("/programs", response_model=schemas.QmsProgramResponse)
def create_program(item: schemas.QmsProgramCreate, db: Session = Depends(get_db)):
    db_item = models.QmsProgram(**item.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.put("/programs/{item_id}", response_model=schemas.QmsProgramResponse)
def update_program(item_id: int, item: schemas.QmsProgramCreate, db: Session = Depends(get_db)):
    db_item = db.query(models.QmsProgram).filter(models.QmsProgram.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    for key, value in item.model_dump().items():
        setattr(db_item, key, value)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.delete("/programs/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_program(item_id: int, db: Session = Depends(get_db)):
    db_item = db.query(models.QmsProgram).filter(models.QmsProgram.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(db_item)
    db.commit()
    return None


# --- ACTORS ---
@router.get("/actors", response_model=List[schemas.QmsActorResponse])
def read_actors(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.QmsActor).offset(skip).limit(limit).all()

# --- PROCESSES (Mapa de Procesos SGC) ---
@router.get("/procesos", response_model=List[schemas.QmsProcessResponse])
def read_procesos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.QmsProcess).order_by(models.QmsProcess.orden).offset(skip).limit(limit).all()

@router.post("/procesos", response_model=schemas.QmsProcessResponse)
def create_proceso(item: schemas.QmsProcessCreate, db: Session = Depends(get_db)):
    db_item = models.QmsProcess(**item.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.put("/procesos/{item_id}", response_model=schemas.QmsProcessResponse)
def update_proceso(item_id: int, item: schemas.QmsProcessCreate, db: Session = Depends(get_db)):
    db_item = db.query(models.QmsProcess).filter(models.QmsProcess.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Process not found")
    for key, value in item.model_dump().items():
        setattr(db_item, key, value)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.delete("/procesos/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_proceso(item_id: int, db: Session = Depends(get_db)):
    db_item = db.query(models.QmsProcess).filter(models.QmsProcess.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Process not found")
    db.delete(db_item)
    db.commit()
    return None

# --- PROCESS DETAILS ---
@router.get("/procesos/{item_id}", response_model=schemas.QmsProcessDetailResponse)
def read_proceso_detail(item_id: int, db: Session = Depends(get_db)):
    db_item = db.query(models.QmsProcess).filter(models.QmsProcess.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Process not found")
    return db_item

# --- RISKS ---
@router.get("/riesgos", response_model=List[schemas.QmsRiskResponse])
def read_riesgos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.QmsRisk).offset(skip).limit(limit).all()

@router.post("/riesgos", response_model=schemas.QmsRiskResponse)
def create_riesgo(item: schemas.QmsRiskCreate, db: Session = Depends(get_db)):
    db_item = models.QmsRisk(**item.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.put("/riesgos/{item_id}", response_model=schemas.QmsRiskResponse)
def update_riesgo(item_id: int, item: schemas.QmsRiskCreate, db: Session = Depends(get_db)):
    db_item = db.query(models.QmsRisk).filter(models.QmsRisk.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    for key, value in item.model_dump().items():
        setattr(db_item, key, value)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.delete("/riesgos/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_riesgo(item_id: int, db: Session = Depends(get_db)):
    db_item = db.query(models.QmsRisk).filter(models.QmsRisk.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(db_item)
    db.commit()
    return None

# --- AUDITS ---
@router.get("/auditorias", response_model=List[schemas.QmsAuditResponse])
def read_auditorias(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.QmsAudit).offset(skip).limit(limit).all()

@router.post("/auditorias", response_model=schemas.QmsAuditResponse)
def create_auditoria(item: schemas.QmsAuditCreate, db: Session = Depends(get_db)):
    db_item = models.QmsAudit(**item.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.put("/auditorias/{item_id}", response_model=schemas.QmsAuditResponse)
def update_auditoria(item_id: int, item: schemas.QmsAuditCreate, db: Session = Depends(get_db)):
    db_item = db.query(models.QmsAudit).filter(models.QmsAudit.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    for key, value in item.model_dump().items():
        setattr(db_item, key, value)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.delete("/auditorias/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_auditoria(item_id: int, db: Session = Depends(get_db)):
    db_item = db.query(models.QmsAudit).filter(models.QmsAudit.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(db_item)
    db.commit()
    return None

# --- NON-CONFORMITIES ---
@router.get("/no-conformidades", response_model=List[schemas.QmsNonConformityResponse])
def read_non_conformities(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.QmsNonConformity).offset(skip).limit(limit).all()

@router.post("/no-conformidades", response_model=schemas.QmsNonConformityResponse)
def create_non_conformity(item: schemas.QmsNonConformityCreate, db: Session = Depends(get_db)):
    db_item = models.QmsNonConformity(**item.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.put("/no-conformidades/{item_id}", response_model=schemas.QmsNonConformityResponse)
def update_non_conformity(item_id: int, item: schemas.QmsNonConformityCreate, db: Session = Depends(get_db)):
    db_item = db.query(models.QmsNonConformity).filter(models.QmsNonConformity.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    for key, value in item.model_dump().items():
        setattr(db_item, key, value)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.delete("/no-conformidades/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_non_conformity(item_id: int, db: Session = Depends(get_db)):
    db_item = db.query(models.QmsNonConformity).filter(models.QmsNonConformity.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(db_item)
    db.commit()
    return None
