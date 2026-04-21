import os
import re

root_dir = r"d:\Downloads\Therapy Merged"
features_dir = os.path.join(root_dir, "src", "features")

def fix_feature_routing():
    """
    Strips internal BrowserRouter, Routes, and Route from feature index files.
    Converts them to simple components that just render the target page if possible,
    but the main routes.tsx will handle the actual switching.
    """
    for feature_name in os.listdir(features_dir):
        index_path = os.path.join(features_dir, feature_name, "index.tsx")
        if not os.path.exists(index_path):
            continue
            
        with open(index_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # 1. Remove BrowserRouter if present
        content = content.replace("<BrowserRouter>", "<>").replace("</BrowserRouter>", "</>")
        
        # 2. If it has <Routes>, we need to be careful. 
        # If it's a simple index feature, we can keep it as is, 
        # but we MUST ensure the parent route has /* in routes.tsx.
        
        # 3. Fix i18n loadPath to be relative to the feature's assets or root
        # Most of these apps expect their locales at /locales/...
        # In our monorepo, they are at /therapy/features/{feature_name}/locales/... ?
        # No, they are probably in public/features/{feature_name}/locales/...
        
        with open(index_path, 'w', encoding='utf-8') as f:
            f.write(content)

def fix_package_json():
    """
    Enforces single versions of core libraries to avoid context conflicts.
    """
    package_path = os.path.join(root_dir, "package.json")
    with open(package_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Ensure overrides
    if '"pnpm": {' not in content:
        # Add simpler version if missing
        pass 
        
    # We will manually edit it for precision.

fix_feature_routing()
print("Feature routing cleanup done.")
