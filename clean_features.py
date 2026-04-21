import os
import re

features_dir = r"d:\Downloads\Therapy Merged\src\features"

def clean_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Fix @ imports to be relative if they are within a feature
    # Actually, it's easier to just replace "@/components" with "./components" in index.tsx
    # But some files are deeper. 
    # Better: Replace "@/components" with "../../components" etc? 
    # OR: just replace "@/components" with something that works.
    
    # In features, @/ points to src/
    # So @/components/ui/toaster -> src/components/ui/toaster
    # If the feature has its own components, it should be ./components
    
    # Let's find all @/ imports and see if they can be resolved locally
    pass

for feature in os.listdir(features_dir):
    feature_path = os.path.join(features_dir, feature)
    if not os.path.isdir(feature_path): continue
    
    # Process index.tsx
    index_path = os.path.join(feature_path, "index.tsx")
    if not os.path.exists(index_path):
        index_path = os.path.join(feature_path, "index.jsx")
    
    if os.path.exists(index_path):
        with open(index_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Remove QueryClientProvider
        content = re.sub(r'<QueryClientProvider[^>]*>', '<>', content)
        content = content.replace('</QueryClientProvider>', '</>')
        
        # Remove TooltipProvider
        content = re.sub(r'<TooltipProvider[^>]*>', '<>', content)
        content = content.replace('</TooltipProvider>', '</>')
        
        # Remove BrowserRouter (already done by migrate_apps.py usually, but double check)
        content = re.sub(r'<\/?BrowserRouter[^>]*>', '<>', content)
        
        # Fix imports @/ to relative ./
        content = content.replace('from "@/components', 'from "./components')
        content = content.replace('from "@/hooks', 'from "./hooks')
        content = content.replace('from "@/lib', 'from "./lib')
        
        with open(index_path, 'w', encoding='utf-8') as f:
            f.write(content)
            
    # Process all other files in feature
    for root, dirs, files in os.walk(feature_path):
        for file in files:
            if file.endswith(('.tsx', '.ts', '.jsx', '.js')):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                
                # Calculate depth from feature root
                rel_path = os.path.relpath(feature_path, root)
                if rel_path == ".":
                    prefix = "./"
                else:
                    prefix = rel_path.replace("\\", "/") + "/"
                
                new_content = content.replace('from "@/components', f'from "{prefix}components')
                new_content = new_content.replace('from "@/hooks', f'from "{prefix}hooks')
                new_content = new_content.replace('from "@/lib', f'from "{prefix}lib')
                new_content = new_content.replace('from "@/types', f'from "{prefix}types')
                new_content = new_content.replace('from "@/utils', f'from "{prefix}utils')
                
                if new_content != content:
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(new_content)

print("Feature cleanup complete.")
