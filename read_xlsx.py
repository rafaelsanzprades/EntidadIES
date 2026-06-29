import sys
sys.stdout.reconfigure(encoding='utf-8')
import openpyxl

wb = openpyxl.load_workbook(
    r'C:\GD-rsp\APP-EntidadIES\RF Curso Directores\Doc ProyDir BOE - Guías - Ejemplos - Autoevaluación\AutoEvaluación Centro - Versión unificada-EVALUACIÓN EXTERNAv2.xlsx',
    data_only=True
)
print('Hojas:', wb.sheetnames)
for sheet_name in wb.sheetnames:
    ws = wb[sheet_name]
    print(f'\n=== {sheet_name} ({ws.max_row}x{ws.max_column}) ===')
    for row in ws.iter_rows(min_row=1, max_row=20, values_only=True):
        vals = [str(c)[:80] if c else '' for c in row]
        print(' | '.join(vals))
