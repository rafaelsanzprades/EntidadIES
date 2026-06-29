from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models
import schemas
from typing import List

router = APIRouter(prefix="/xcelence", tags=["xcelence"])

@router.get("/evaluations/{center_id}", response_model=List[schemas.XcelenceEvaluationResponse])
def get_evaluations_by_center(center_id: int, db: Session = Depends(get_db)):
    evals = db.query(models.XcelenceEvaluation).filter(models.XcelenceEvaluation.center_id == center_id).all()
    return evals

@router.get("/evaluations/{center_id}/latest", response_model=schemas.XcelenceEvaluationResponse)
def get_latest_evaluation_by_center(center_id: int, db: Session = Depends(get_db)):
    evaluation = db.query(models.XcelenceEvaluation).filter(
        models.XcelenceEvaluation.center_id == center_id
    ).order_by(models.XcelenceEvaluation.academic_year.desc()).first()
    
    if not evaluation:
        raise HTTPException(status_code=404, detail="No Xcelence evaluation found for this center")
    return evaluation
