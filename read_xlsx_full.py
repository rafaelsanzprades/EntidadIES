import sys
sys.stdout.reconfigure(encoding='utf-8')
import openpyxl

xlsx_path = r'C:\GD-rsp\APP-EntidadIES\RF Curso Directores\Doc ProyDir BOE - Guías - Ejemplos - Autoevaluación\AutoEvaluación Centro - Versión unificada-EVALUACIÓN EXTERNAv2.xlsx'
wb = openpyxl.load_workbook(xlsx_path, data_only=True)

# Print ALL rows from INDICE sheet
ws = wb['INDICE']
print(f'=== INDICE ({ws.max_row}x{ws.max_column}) ===')
for row_num, row in enumerate(ws.iter_rows(min_row=1, max_row=ws.max_row, values_only=True), 1):
    vals = [str(c)[:100] if c else '' for c in row]
    non_empty = [v for v in vals if v.strip()]
    if non_empty:
        print(f'Row {row_num}: {" | ".join(vals[:4])}')

print('\n\n')

# Print RESULTADOS DE CENTRO
ws2 = wb['RESULTADOS DE CENTRO']
print(f'=== RESULTADOS DE CENTRO ({ws2.max_row}x{ws2.max_column}) ===')
for row_num, row in enumerate(ws2.iter_rows(min_row=1, max_row=min(50, ws2.max_row), values_only=True), 1):
    vals = [str(c)[:100] if c else '' for c in row]
    non_empty = [v for v in vals if v.strip()]
    if non_empty:
        print(f'Row {row_num}: {" | ".join(vals[:6])}')
