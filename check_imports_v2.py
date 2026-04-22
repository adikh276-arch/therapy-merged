import glob
import re
import os

def check_cross_imports():
    for f in glob.glob('src/features/**/*.ts*', recursive=True):
        if not os.path.isfile(f): continue
        with open(f, 'r', encoding='utf-8', errors='ignore') as file:
            content = file.read()
        
        feature_name = f.split(os.sep)[2] if os.sep in f else ''
        
        for i, line in enumerate(content.split('\n')):
            if 'import' in line and '../' in line:
                # Find the path in the import
                m = re.search(r'from\s+["\'](.*?)["\']', line)
                if m:
                    import_path = m.group(1)
                    if import_path.startswith('../../') and not import_path.startswith('../../components') and not import_path.startswith('../../lib'):
                         # If it goes up twice and doesn't go into common components/lib, it might be cross-feature
                         print(f"{f}:{i+1}: Potential cross-feature or deep import: {import_path}")

if __name__ == '__main__':
    check_cross_imports()
