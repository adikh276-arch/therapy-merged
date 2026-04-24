import glob
import re
import os

def remove_theme_blocks(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except UnicodeDecodeError:
        return False
    
    # regex for @theme inline { ... }
    # Using dotall to match across multiple lines
    new_content = re.sub(r'@theme\s+inline\s*\{.*?\}', '', content, flags=re.DOTALL)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

if __name__ == '__main__':
    for f in glob.glob('src/features/**/*.css', recursive=True):
        if remove_theme_blocks(f):
            print(f'Removed @theme block from {f}')
