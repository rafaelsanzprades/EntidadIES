import os

with open(r"C:\GD-rsp\APP-EntidadIES\backend\routers\qms.py", "a", encoding="utf-8") as f:
    f.write("""
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
""")
