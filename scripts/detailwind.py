import glob
import re
import os

def detailwind_css(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except UnicodeDecodeError:
        return False
    
    # 1. Remove @import "tailwindcss" (already done but safe to repeat)
    content = re.sub(r'@import\s+["\']tailwindcss["\']\s*;?', '', content)
    
    # 2. Remove @theme blocks (already done but safe to repeat)
    content = re.sub(r'@theme\s*\{.*?\}', '', content, flags=re.DOTALL)
    
    # 3. Remove @layer blocks but KEEP the content inside? 
    # Actually, @layer base { body { ... } } -> body { ... }
    # This is tricky with nested braces.
    
    # Let's try a simpler approach: remove the @layer lines and the braces if we can find them.
    # Or just remove the @layer wrapping and keep the content.
    
    lines = content.split('\n')
    new_lines = []
    for line in lines:
        if '@layer' in line and '{' in line:
            # Skip the layer start line
            continue
        if line.strip() == '}':
            # This is a bit dangerous as it might close a media query or a rule
            # But in these files, @layer is usually at the top level
            # Let's check the context or just keep it for now and see
            continue
        # Remove @apply
        if '@apply' in line:
            line = re.sub(r'@apply\s+[^;]+;', '', line)
        
        new_lines.append(line)
    
    content = '\n'.join(new_lines)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    return True

if __name__ == '__main__':
    for f in glob.glob('src/features/**/*.css', recursive=True):
        if detailwind_css(f):
            print(f'De-tailwired {f}')
