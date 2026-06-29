import sys
sys.stdout.reconfigure(encoding='utf-8')
import fitz

pdf_path = r'C:\GD-rsp\APP-EntidadIES\RF Curso Directores\Doc ProyDir BOE - Guías - Ejemplos - Autoevaluación\AutoEvaluación Centro - CSVKR1NZTL4IG1Q0XFIL Guía Evaluación.pdf'
doc = fitz.open(pdf_path)

# Extract ALL text from ALL pages
for i, page in enumerate(doc):
    text = page.get_text()
    print(f'\n{"="*60}')
    print(f'PÁGINA {i+1}')
    print(f'{"="*60}')
    print(text)
