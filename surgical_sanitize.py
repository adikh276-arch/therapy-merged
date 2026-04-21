import os
import re

features_dir = r"d:\Downloads\Therapy Merged\src\features"

def sanitize_file(file_path):
    if not file_path.endswith(('.tsx', '.ts', '.js', '.jsx')):
        return
        
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    parts = os.path.normpath(file_path).split(os.sep)
    try:
        f_idx = parts.index('features')
        feature_name = parts[f_idx + 1]
        subpath_parts = parts[f_idx + 2 : -1]
        up_count = len(subpath_parts)
        prefix = "../" * up_count if up_count > 0 else "./"
        
        # 1. Correct ALL @/ imports and strings to relative paths
        # This catches "import ... from "@/...", "from '@/...", and "import("@/...")
        content = content.replace('"@/', f'"{prefix}')
        content = content.replace("'@/", f"'{prefix}")
        
    except (ValueError, IndexError):
        pass
    
    # 2. Stripping and wrapping Routers correctly
    content = re.sub(r'<(BrowserRouter|HashRouter)[^>]*>', '<React.Fragment>', content)
    content = re.sub(r'</(BrowserRouter|HashRouter)>', '</React.Fragment>', content)

    # 3. Add React import if missing but needed for Fragments
    if ("<React.Fragment>" in content or "React." in content) and "import React" not in content:
        content = "import React from 'react';\n" + content

    # 4. Fix framer-motion
    content = content.replace('from "motion/react"', 'from "framer-motion"')
    content = content.replace("'motion/react'", "'framer-motion'")

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

for root, dirs, files in os.walk(features_dir):
    for file in files:
        sanitize_file(os.path.join(root, file))

print("Recursive Sanitization complete with broad @/ replacement.")
