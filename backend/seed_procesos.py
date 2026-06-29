import sqlite3
import os
from database import SessionLocal
from models import QmsProcess

def seed_procesos():
    db = SessionLocal()
    if db.query(QmsProcess).count() > 0:
        print("Procesos ya existen en DB")
        db.close()
        return

    procesos_data = [
        # Estratégicos
        {"tipo": "estrategico", "nombre": "01 Planificación estratégica", "orden": 10, "driveId": "14N01gpvXZ6MMl9xVVmzQJs1qEfGkCT5w"},
        {"tipo": "estrategico", "nombre": "02 Recursos humanos", "orden": 20, "driveId": "17sH_o_z5L5XjB9hD3wP515tS0t403c9O"},
        {"tipo": "estrategico", "nombre": "04 Gestión de la calidad", "orden": 40, "driveId": "1vXk0xRPk6ZjU4KyxkuUoGZIef1kRUjvF"},
        
        # Clave
        {"tipo": "clave", "nombre": "01 Enseñanza y aprendizaje", "orden": 110, "driveId": "19RZ9BqX8M4g7yN7YQk-i3Z4_XQ7k14Vp"},
        {"tipo": "clave", "nombre": "03 Información y orientación profesional", "orden": 130, "driveId": "1hXWjF4Z6Q01t4Yw4pT2-n5oG0fQxJzF_"},
        
        # Apoyo
        {"tipo": "apoyo", "nombre": "01 Gestión económica", "orden": 210, "driveId": "1vLzc2L-zL_9M8X2aJ-k34xWqM6z-07Oa"},
        {"tipo": "apoyo", "nombre": "02 Mantenimiento y servicios auxiliares", "orden": 220, "driveId": "1vNbr1O2H3L_9V9Pz2B83xX_kR_1t82C1"}
    ]

    for p in procesos_data:
        process = QmsProcess(
            tipo=p["tipo"],
            nombre=p["nombre"],
            orden=p["orden"],
            drive_id=p["driveId"]
        )
        db.add(process)
    
    db.commit()
    print("Procesos insertados correctamente")
    db.close()

if __name__ == "__main__":
    seed_procesos()
