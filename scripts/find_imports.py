import os
import re

features_dir = r"d:\Downloads\Therapy Merged\src\features"

imports = set()
for root, dirs, files in os.walk(features_dir):
    for f in files:
        if f.endswith(('.tsx', '.ts', '.jsx', '.js')):
            with open(os.path.join(root, f), 'r', encoding='utf-8', errors='ignore') as file:
                content = file.read()
                # matches import ... from 'PKG' or "PKG"
                matches = re.findall(r'from\s+[\'"]([^\'".]+)[\'"]', content)
                for m in matches:
                    imports.add(m)

print("Found imports:")
for i in sorted(list(imports)):
    print(i)
