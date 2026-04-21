import os
import re

features_dir = r"d:\Downloads\Therapy Merged\src\features"

def sanitize_jsx(content):
    # Match the start of the App component
    match = re.search(r'const App = \(\) => \((.*?)\);', content, re.DOTALL)
    if not match:
        return content
    
    body = match.group(1)
    
    # 1. Strip all fragments
    body = body.replace('<>', '').replace('</>', '')
    
    # 2. Strip standard providers we want to dedupe (greedy match)
    providers = ['QueryClientProvider', 'TooltipProvider', 'AuthProvider', 'Toaster', 'Sonner', 'LanguageSelector', 'Suspense']
    for p in providers:
        # Remove opening tags like <Provider ...> 
        body = re.sub(f'<{p}[^>]*>', '', body)
        # Remove closing tags </Provider>
        body = re.sub(f'</{p}>', '', body)

    # 3. Wrap it in a single fragment and add back the LanguageSelector (if it was there)
    # Most features need their language selector.
    has_lang = 'LanguageSelector' in match.group(0)
    
    new_body = "\n  <>\n"
    if has_lang:
        new_body += "    <LanguageSelector />\n"
    new_body += f"    {body.strip()}\n"
    new_body += "  </>\n"
    
    return content.replace(match.group(0), f'const App = () => ({new_body});')

for root, dirs, files in os.walk(features_dir):
    if "index.tsx" in files:
        f_path = os.path.join(root, "index.tsx")
        with open(f_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        new_content = sanitize_jsx(content)
        
        if new_content != content:
            with open(f_path, 'w', encoding='utf-8') as f:
                f.write(new_content)

print("Features JSX sanitized successfully.")
