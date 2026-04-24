import os
import re

features_dir = r"d:\Downloads\Therapy Merged\src\features"

def restore_providers(content):
    # Match the start of the App component
    match = re.search(r'const App = \(\) => \((.*?)\);', content, re.DOTALL)
    if not match:
        return content
    
    body = match.group(1)
    
    # 1. Strip top-level fragments if they are just wrapping
    body = body.strip()
    
    # Define a clean wrapper that includes the unique UI essentials
    # Notice we use the LOCAL queryClient defined in the file
    new_template = f"""
  <QueryClientProvider client={{{'queryClient'}}}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {body}
    </TooltipProvider>
  </QueryClientProvider>"""
    
    return content.replace(match.group(0), f'const App = () => ({new_template});')

for feature_name in os.listdir(features_dir):
    f_path = os.path.join(features_dir, feature_name, "index.tsx")
    if not os.path.exists(f_path):
        continue
    
    with open(f_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    # Only update if providers are missing
    if "QueryClientProvider" not in content or "client={queryClient}" not in content:
        # We need to make sure the imports are there too, but they usually are based on previous views
        new_content = restore_providers(content)
        
        if new_content != content:
            with open(f_path, 'w', encoding='utf-8') as f:
                f.write(new_content)

print("Feature UI Providers restored.")
