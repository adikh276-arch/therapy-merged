import glob, os, re

def fix_feature_file(fpath):
    try:
        with open(fpath, 'r', encoding='utf-8') as f:
            content = f.read()
    except: return

    orig_content = content
    
    # 1. Fix Database calls (Neon v4)
    # sql("query", [params]) -> (sql as any).query("query", [params])
    # Case 1: Multiple lines
    content = re.sub(r'sql\(\s*([\"\'`][\s\S]*?)\s*,\s*\[([\s\S]*?)\]\s*\)', r'(sql as any).query(\1, [\2])', content)
    # Case 2: Single line
    content = re.sub(r'sql\(\s*([\"\'`].*?)\s*\)', r'(sql as any).query(\1)', content)
    
    # Update res.rows access if needed (optional, handled by dbRequest but direct calls need it)
    # Actually, Index.tsx already has .rows in history fetch if it's the broken version.
    
    # 2. Layout & Aesthetics
    # Remove min-h-screen
    content = re.sub(r'\bmin-h-(?:screen|\[100dvh\])\b', '', content)
    
    # Remove bg classes from top-level containers to achieve uniform background
    # Only remove the first few occurrences to avoid breaking UI components inside
    content = re.sub(r'\b(bg-(?:background|white|card|surface-\w+|slate-\d+))\b', 'bg-transparent', content, count=2)
    
    # Remove shadows
    content = re.sub(r'\bshadow-\w+\b', '', content)
    
    # Narrow the containers
    content = re.sub(r'\b(max-w-(?:4xl|5xl|full|screen-\w+))\b', 'max-w-2xl', content)
    
    if content != orig_content:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

# List of files to target
files = glob.glob('src/features/**/*.tsx', recursive=True) + glob.glob('src/features/**/*.ts', recursive=True)

fixed_count = 0
for f in files:
    if fix_feature_file(f):
        fixed_count += 1

print(f"Master Fix completed. Modified {fixed_count} files.")
