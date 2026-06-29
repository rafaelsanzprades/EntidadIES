import sys
sys.stdout.reconfigure(encoding='utf-8')
import fitz

pdf_path = r'C:\GD-rsp\APP-EntidadIES\RF Curso Directores\Doc ProyDir BOE - Guías - Ejemplos - Autoevaluación\AutoEvaluación Centro - Tutorial Centros Enero 2026 bis.pdf'
doc = fitz.open(pdf_path)
print(f'Páginas: {len(doc)}')
for i, page in enumerate(doc):
    text = page.get_text()
    if text.strip():
        print(f'\n--- Página {i+1} ---')
        print(text[:2000])
