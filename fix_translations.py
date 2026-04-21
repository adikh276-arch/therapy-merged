import os
import re

features_dir = r"d:\Downloads\Therapy Merged\src\features"

for root, dirs, files in os.walk(features_dir):
    for f in files:
        if f.endswith(('.tsx', '.ts', '.jsx', '.js')):
            file_path = os.path.join(root, f)
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as file:
                content = file.read()
            
            # Find i18next loadPath and fix it to /therapy
            # common patterns: loadPath: '/path/to/json',
            new_content = re.sub(r'loadPath:\s*[\'"](/[^\'"]+)[\'"]', r"loadPath: '/therapy\1'", content)
            
            if new_content != content:
                # Also ensure we don't double /therapy if we run multiple times
                new_content = new_content.replace("/therapy/therapy", "/therapy")
                with open(file_path, 'w', encoding='utf-8') as file:
                    file.write(new_content)

print("Translation paths fixed to include /therapy.")
