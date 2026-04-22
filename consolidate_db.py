import glob, os, re

files = [
    'src/features/a_letter_to_self/lib/db.ts',
    'src/features/brain_dump_and_sort/lib/db.ts',
    'src/features/daily_gratitude_diary/lib/db.ts',
    'src/features/doodle_burst/lib/db.ts',
    'src/features/energy_tracker/lib/db.ts',
    'src/features/gratitude_tracker/lib/db.ts',
    'src/features/know_your_values/lib/db.ts',
    'src/features/personal_mission_statement/lib/db.ts',
    'src/features/physical_activity_log/lib/db.ts',
    'src/features/vibe_tracker/types/vibe.ts'
]

for path in files:
    if not os.path.exists(path):
        print(f"Skipping {path} (not found)")
        continue

    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Calculate depth for relative import
    # D:\...\src\features\a_letter_to_self\lib\db.ts 
    # Parts: src (0), features (1), a_letter_to_self (2), lib (3), db.ts (4)
    # Target: src (0), lib (1), db.ts (2)
    # From lib (3) to src/lib (1): ../../../lib/db
    
    # Actually, using @/lib/db with Vite/TS alias is better, but to be safe:
    parts = path.replace('\\', '/').split('/')
    # find 'src' index
    try:
        src_idx = parts.index('src')
        dist_to_src = len(parts) - 1 - src_idx # how many steps to src
        rel_path = "../" * (dist_to_src - 1) + "lib/db"
    except:
        rel_path = "@/lib/db"

    rel_import = f"import {{ sql }} from '{rel_path}';\n"
    
    # Remove existing neon imports
    content = re.sub(r"import \{[^}]*\} from ['\"]@neondatabase/serverless['\"];?", "", content)
    
    # Remove neonConfig setup
    content = re.sub(r"neonConfig\.[^;]*;", "", content)
    
    # Remove connectionString and local sql/pool setup
    content = re.sub(r"const connectionString =[^;]*;", "", content)
    content = re.sub(r"const DATABASE_URL =[^;]*;", "", content)
    content = re.sub(r"const sql = neon\([^)]*\);?", "", content)
    
    # Replace Pool initialization with a shim for the global sql
    content = re.sub(r"export const pool = new Pool\([^)]*\);?", "export const pool = { query: (t, p) => (sql as any).query(t, p || []) };", content)
    
    # Special fix for vibe.ts which already has 'sql' usage
    if "import { sql } from" not in content:
        content = rel_import + content
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'Consolidated {path}')
