import glob
import os

def remove_tailwind_import(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            lines = f.readlines()
    except UnicodeDecodeError:
        return False
    
    new_lines = []
    removed = False
    for line in lines:
        # Check for both "tailwindcss" and 'tailwindcss'
        if '@import' in line and 'tailwindcss' in line:
            removed = True
            continue
        new_lines.append(line)
    
    if removed:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.writelines(new_lines)
        return True
    return False

if __name__ == '__main__':
    for f in glob.glob('src/features/**/*.css', recursive=True):
        if remove_tailwind_import(f):
            print(f'Removed tailwind import from {f}')
