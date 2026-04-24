import glob, os, re

# Fix all direct sql(...) calls to (sql as any).query(...)
for fpath in glob.glob('src/features/**/*.tsx', recursive=True) + glob.glob('src/features/**/*.ts', recursive=True):
    try:
        with open(fpath, 'r', encoding='utf-8') as f:
            content = f.read()
    except: continue
    
    # We want to match 'sql(' but NOT 'sql`'.
    # Also handle 'await sql(' and 'return sql('
    # We replace sql( with (sql as any).query(
    new_content = re.sub(r'(\b)sql\((?=[\"\'`\d])', r'\1(sql as any).query(', content)
    
    if new_content != content:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Fixed sql call in {fpath}')
