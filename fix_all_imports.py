import os
import re

features_dir = r"d:\Downloads\Therapy Merged\src\features"

for root, dirs, files in os.walk(features_dir):
    for f in files:
        if f.endswith(('.tsx', '.ts', '.jsx', '.js')):
            file_path = os.path.join(root, f)
            with open(file_path, 'r', encoding='utf-8') as file:
                content = file.read()
            
            # Count depth from feature
            # root: d:\Downloads\Therapy Merged\src\features\know_your_values\components
            # feature_dir: d:\Downloads\Therapy Merged\src\features\know_your_values
            
            # Find the feature dir this file belongs to
            feature_name = ""
            parts = root.split(os.sep)
            try:
                idx = parts.index("features")
                feature_name = parts[idx+1]
            except:
                continue
                
            feature_path = os.path.join(features_dir, feature_name)
            
            # relpath from root to feature_path
            rel = os.path.relpath(feature_path, root)
            if rel == ".":
                prefix = "./"
            else:
                prefix = rel.replace("\\", "/") + "/"
            
            # Use regex to find ANY from "@/..." and replace with from "prefix..."
            new_content = re.sub(r'from\s+[\'"]@/([^\'"]+)[\'"]', lambda m: f'from "{prefix}{m.group(1)}"', content)
            new_content = re.sub(r'import\s+[\'"]@/([^\'"]+)[\'"]', lambda m: f'import "{prefix}{m.group(1)}"', new_content)

            if new_content != content:
                with open(file_path, 'w', encoding='utf-8') as file:
                    file.write(new_content)

print("All @/ imports replaced correctly.")
