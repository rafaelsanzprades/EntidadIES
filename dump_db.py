import sqlite3

conn = sqlite3.connect(r'C:\GD-rsp\APP-EntidadIES\backend\entidad.db')
with open('db_dump.txt', 'w', encoding='utf-8') as f:
    for line in conn.iterdump():
        f.write('%s\n' % line)
conn.close()
