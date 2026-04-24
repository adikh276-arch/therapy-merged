import os
import re

features_dir = r"d:\Downloads\Therapy Merged\src\features"

for root, dirs, files in os.walk(features_dir):
    if "i18n.ts" in files or "i18n.js" in files:
        f_name = "i18n.ts" if "i18n.ts" in files else "i18n.js"
        f_path = os.path.join(root, f_name)
        
        with open(f_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Standardize loadPath to look into the feature's own locale folder
        # We need to know where these are in the final build.
        # If they are in src/features/X/locales, Vite might not bundle them unless they are in public.
        
        # Most of these apps use a relative loadPath: './locales/...' or absolute '/locales/...'
        # We should make them absolute to the subpath: '/therapy/locales/...'
        # Wait! If they are all in one 'locales' folder, they will overwrite each other.
        # So we keep them unique: '/therapy/features/{feature_name}/locales/...' 
        # BUT this requires us to COPY them there in the Dockerfile.
        
        feature_name = os.path.basename(root)
        new_path = f"/therapy/locales/{feature_name}/{{{{lng}}}}/translation.json"
        
        # Replace whatever loadPath is there
        content = re.sub(r"loadPath:\s*['\"].+?['\"]", f"loadPath: '{new_path}'", content)
        
        with open(f_path, 'w', encoding='utf-8') as f:
            f.write(content)

print("Unified i18n loadPaths set.")
