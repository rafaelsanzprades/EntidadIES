import sqlite3
conn=sqlite3.connect('cdd_pro.db')
cur=conn.cursor()
try:
    cur.execute("SELECT name FROM sqlite_master WHERE type='table'")
    print("Tablas:", [row[0] for row in cur.fetchall()])
    cur.execute('SELECT count(1) FROM qms_processes')
    print('procesos:', cur.fetchone()[0])
    cur.execute('SELECT count(1) FROM qms_indicators')
    print('indicadores:', cur.fetchone()[0])
except Exception as e:
    print('error:', e)
