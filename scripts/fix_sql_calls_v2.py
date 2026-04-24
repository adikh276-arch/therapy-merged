import glob, os, re

# Fix all direct sql(...) calls to (sql as any).query(...)
for fpath in glob.glob('src/features/**/*.tsx', recursive=True) + glob.glob('src/features/**/*.ts', recursive=True):
    try:
        with open(fpath, 'r', encoding='utf-8') as f:
            content = f.read()
    except: continue
    
    # Match sql( with any amount of whitespace, but NOT sql`
    # We use a non-greedy match for the query and params
    # This is slightly dangerous but let's try a safer regex for common multi-line pattern
    new_content = re.sub(r'sql\(\s*([\"\'`][\s\S]*?)\s*,\s*\[([\s\S]*?)\]\s*\)', r'(sql as any).query(\1, [\2])', content)
    
    # Also handle single-line ones that might have missed
    new_content = re.sub(r'sql\(\s*([\"\'`].*?)\s*\)', r'(sql as any).query(\1)', new_content)

    if new_content != content:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Fixed sql call in {fpath}')
