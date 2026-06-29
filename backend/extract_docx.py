import sys
try:
    import docx
    doc = docx.Document(sys.argv[1])
    text = "\n".join([p.text for p in doc.paragraphs if p.text.strip()])
    
    # Simple search for "Objetivo" or "DAFO"
    import re
    matches = re.finditer(r'.{0,100}(Objetivo|DAFO|Debilidad|Amenaza|Fortaleza|Oportunidad|Propuesta).{0,300}', text, re.IGNORECASE | re.DOTALL)
    for i, m in enumerate(matches):
        if i < 20: # print first 20 matches
            print(f"Match {i}: {m.group(0).replace(chr(10), ' ')}")
except Exception as e:
    print(f"Error: {e}")
