import os
import re

for i in range(1, 11):
    file_path = f"c:\\GD-rsp\\APP-EntidadIES\\frontend\\src\\app\\clave{i}\\page.tsx"
    if not os.path.exists(file_path):
        print(f"Skipping {file_path}")
        continue
    
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Find the goal100 array
    match = re.search(r'goal100={(\[[^\]]+\])}', content)
    if not match:
        print(f"No goal100 found in {file_path}")
        continue
    
    goal_array_str = match.group(1)
    
    # Remove goal100 from ClaveExcellenceView
    content = re.sub(r'\s*goal100={\[[^\]]+\]}', '', content)
    
    # Insert infoList after infoDescription
    content = re.sub(
        r'(infoDescription="[^"]*")',
        r'\1\n      infoList={' + goal_array_str + r'}',
        content,
        count=1
    )
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
        
    print(f"Updated {file_path}")
