import os
import pandas as pd
from sqlalchemy.orm import Session
from database import SessionLocal
from models import QmsProcess

EXCEL_PATH = r"C:\GD-rsp\APP-EntidadIES\RF Calidad\SGC-Procesos\Mapas procesos propuesto 2024-2025.xlsx"

def import_procesos():
    if not os.path.exists(EXCEL_PATH):
        print(f"File not found: {EXCEL_PATH}")
        return

    db: Session = SessionLocal()
    try:
        # Clear existing processes
        print("Clearing existing qms_processes...")
        db.query(QmsProcess).delete()
        db.commit()

        # Read Excel
        # Based on previous inspection:
        # Column 1 (index 1): Tipo (Estratégicos, Operativo o clave, Soporte y apoyo)
        # Column 2 (index 2): Grupo (e.g. 1. Planificación estratégica)
        # Column 3 (index 3): Proceso (e.g. Análisis del contexto)
        
        df = pd.read_excel(EXCEL_PATH, header=None)
        
        current_tipo = None
        current_grupo = None
        
        processes_to_insert = []
        orden = 1
        
        for index, row in df.iterrows():
            col1 = str(row[1]).strip() if pd.notna(row[1]) else ""
            col2 = str(row[2]).strip() if pd.notna(row[2]) else ""
            col3 = str(row[3]).strip() if pd.notna(row[3]) else ""
            
            # Identify Tipo
            if col1.lower() in ["estratégicos", "estrategicos", "estrategico", "estratégico"]:
                current_tipo = "Estratégicos"
            elif "operativo" in col1.lower() or "clave" in col1.lower():
                current_tipo = "Clave"
            elif "soporte" in col1.lower() or "apoyo" in col1.lower():
                current_tipo = "Apoyo"
            
            # Identify Grupo
            if col2 != "":
                current_grupo = col2
                
            # Identify Proceso
            if col3 != "":
                if not current_tipo or not current_grupo:
                    continue
                
                print(f"Found Process: {current_tipo} -> {current_grupo} -> {col3}")
                processes_to_insert.append(QmsProcess(
                    tipo=current_tipo,
                    grupo=current_grupo,
                    nombre=col3,
                    activo=True,
                    orden=orden
                ))
                orden += 1
                
        if processes_to_insert:
            db.bulk_save_objects(processes_to_insert)
            db.commit()
            print(f"Successfully inserted {len(processes_to_insert)} processes.")
        else:
            print("No processes found to insert.")
            
    except Exception as e:
        print(f"Error importing processes: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    import_procesos()
