import os
import sqlite3

db_path = r'C:\GD-rsp\APP-EntidadIES\backend\entidad.db'
if os.path.exists(db_path):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = cursor.fetchall()
    for table in tables:
        table_name = table[0]
        cursor.execute(f"PRAGMA table_info({table_name})")
        columns = [col[1] for col in cursor.fetchall()]
        for col in columns:
            try:
                cursor.execute(f"SELECT * FROM {table_name} WHERE {col} LIKE '%Baquedano%' OR {col} LIKE '%Perez%' OR {col} LIKE '%Pérez%'")
                results = cursor.fetchall()
                if results:
                    print(f"Found in table {table_name}, column {col}: {results}")
            except Exception as e:
                pass
    conn.close()
