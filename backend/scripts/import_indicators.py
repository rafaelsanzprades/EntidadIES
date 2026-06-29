import os
import glob
import pandas as pd
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from models import Base, QmsIndicator

DATABASE_URL = "sqlite:///./cdd_pro.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def find_excel_file():
    # Buscamos el excel en el directorio descargado por rclone o local
    pattern = 'SGC-Procesos/**/Registro/Listado de indicadores.xlsx'
    files = glob.glob(pattern, recursive=True)
    if files:
        return files[0]
    return None

def main():
    file_path = find_excel_file()
    if not file_path:
        print("No se encontró el fichero de indicadores en el sistema de archivos local.")
        return

    print(f"Leyendo archivo: {file_path}")
    
    # Header en la fila 7 (index 6)
    df = pd.read_excel(file_path, header=6)
    
    # Renombrar columnas para evitar problemas de acentos (Denominación, Método, etc.)
    df.columns = [
        'col0', 'col1', 'proceso', 'col3', 
        'descripcion', 'col5', 'frecuencia', 
        'metodo', 'meta', 'responsable', 
        'valor', 'col11'
    ]

    # Filtrar filas vacías (donde la descripción sea nula)
    df = df.dropna(subset=['descripcion'])
    
    # Recrear tablas si no existen
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    # Vaciar tabla actual para reemplazarla
    db.query(QmsIndicator).delete()
    
    count = 0
    for _, row in df.iterrows():
        desc = str(row['descripcion']).strip()
        if desc == 'nan' or not desc:
            continue
            
        proceso = str(row['proceso']).strip() if pd.notnull(row['proceso']) else ""
        frecuencia = str(row['frecuencia']).strip() if pd.notnull(row['frecuencia']) else ""
        meta = str(row['meta']).strip() if pd.notnull(row['meta']) else ""
        valor = str(row['valor']).strip() if pd.notnull(row['valor']) else ""
        metodo = str(row['metodo']).strip() if pd.notnull(row['metodo']) else ""
        responsable = str(row['responsable']).strip() if pd.notnull(row['responsable']) else ""

        indicator = QmsIndicator(
            objective_id=None,
            descripcion=desc,
            proceso=proceso,
            frecuencia=frecuencia,
            meta_cuantitativa=meta,
            valor_actual=valor,
            metodo_evaluacion=metodo,
            responsable=responsable
        )
        db.add(indicator)
        count += 1

    db.commit()
    db.close()
    
    print(f"¡Éxito! Se han importado {count} indicadores a la base de datos del Plan Director.")

if __name__ == "__main__":
    main()
