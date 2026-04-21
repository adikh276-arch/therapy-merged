import os
import shutil

features_dir = r"d:\Downloads\Therapy Merged\src\features"

for feature_name in os.listdir(features_dir):
    f_root = os.path.join(features_dir, feature_name)
    if not os.path.isdir(f_root):
        continue
    
    target_index = os.path.join(f_root, "index.tsx")
    
    # 1. If index.tsx already exists, we are good (or we'll sanitize later)
    if os.path.exists(target_index):
        continue
        
    # 2. Try to find App.tsx
    app_tsx = os.path.join(f_root, "App.tsx")
    if os.path.exists(app_tsx):
        os.rename(app_tsx, target_index)
        print(f"Standardized {feature_name}: App.tsx -> index.tsx")
        continue
        
    # 3. Try to find pages/Index.tsx as a fallback (some apps are just one page)
    pages_index = os.path.join(f_root, "pages", "Index.tsx")
    if os.path.exists(pages_index):
        shutil.copy2(pages_index, target_index)
        print(f"Standardized {feature_name}: pages/Index.tsx -> index.tsx")
        continue

print("Feature standardization complete.")
