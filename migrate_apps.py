import os
import shutil
import re

base_dir = r"D:\tmp-minis"
dest_core = r"d:\Downloads\Therapy Merged\src\features"

group_A = [
    "box_breathing", "4-6-8-breathing", "5-4-3-2-1-grounding", "joyful_activities",
    "affirmations", "grounded-technique", "self-care-bingo", "diffusion-technique",
    "thought_shifts", "environment-optimization", "a-pause-for-appreciation",
    "what-are-your-habits", "Real-stories-to-overcome-anxiety"
]

group_B = [
    "daily-gratitude-diary", "personal-mission-statement", "physical-activity-log",
    "a-letter-to-self", "know-your-values", "brain-dump-and-sort", "doodle-burst",
    "gratitude-tracker", "vibe-tracker", "care-tracker"
]

group_C1 = [
    "depression-tips", "anxiety-tips", "stress-tips"
]

all_minis = group_A + group_B + group_C1

if not os.path.exists(dest_core):
    os.makedirs(dest_core, exist_ok=True)

import codecs

def process_app_tsx(file_path):
    if not os.path.exists(file_path): return
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Strip BrowserRouter
    content = re.sub(r'<\/?BrowserRouter[^>]*>', '<>', content)
    # Strip Routes - but wait, they might have multiple Routes! Let's just strip Router stuff manually
    content = content.replace("<BrowserRouter>", "<>")
    content = content.replace("</BrowserRouter>", "</>")
    content = re.sub(r'<BrowserRouter\s+basename=[^>]+>', '<>', content)
    
    # Strip AuthGuard specifically 
    content = content.replace("<AuthGuard>", "")
    content = content.replace("</AuthGuard>", "")
    
    # Let's replace 'import AuthGuard from ...'
    content = re.sub(r'import\s+AuthGuard\s+from[^;]+;', '', content)
    
    # Remove context if it's there
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

for mini in all_minis:
    src_folder = os.path.join(base_dir, mini, "src")
    if not os.path.exists(src_folder):
        print(f"No src for {mini}")
        continue
    
    dest_folder = os.path.join(dest_core, mini.replace("-", "_"))
    
    # Copy src
    shutil.rmtree(dest_folder, ignore_errors=True)
    shutil.copytree(src_folder, dest_folder)
    
    # Deal with DB/Auth (Group B especially)
    for root, dirs, files in os.walk(dest_folder):
        for f in files:
            file_path = os.path.join(root, f)
            if not f.endswith((".ts", ".tsx", ".js", ".jsx")): continue
            try:
                with open(file_path, "r", encoding="utf-8") as file:
                    txt = file.read()
            except: continue
            
            orig = txt
            
            if mini in group_B:
                # Strip db configs
                # BEFORE (individual mini): import { db } from '../lib/db'   // ← DELETE THIS
                # AFTER (monorepo shared): import { db } from '@therapy/db'
                txt = re.sub(r'import\s+\{\s*db\s*\}\s+from\s+[\'"][^\'"]*lib/db[\'"];?', "import { db } from '@therapy/db';", txt)
                
                # Strip auth
                txt = re.sub(r'const\s+user\s*=\s*useAuth\(\);?', "const userId = localStorage.getItem('userId');", txt)
                
            if txt != orig:
                with open(file_path, "w", encoding="utf-8") as file:
                    file.write(txt)
    
    # Process App.tsx
    app_tsx = os.path.join(dest_folder, "App.tsx")
    if os.path.exists(app_tsx):
        process_app_tsx(app_tsx)
        # Rename to index.tsx
        os.rename(app_tsx, os.path.join(dest_folder, "index.tsx"))
        
    app_jsx = os.path.join(dest_folder, "App.jsx")
    if os.path.exists(app_jsx):
        process_app_tsx(app_jsx)
        os.rename(app_jsx, os.path.join(dest_folder, "index.jsx"))

print("Migration script executed.")
