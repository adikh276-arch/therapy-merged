import os
import re

features_dir = r"d:\Downloads\Therapy Merged\src\features"

providers_to_remove = [
    "QueryClientProvider",
    "TooltipProvider",
    "AuthProvider", # Caution: if feature depends on it, we might need to keep it, but we should unify it.
    "Toaster",
    "Sonner"
]

for root, dirs, files in os.walk(features_dir):
    if "index.tsx" in files:
        f_path = os.path.join(root, "index.tsx")
        with open(f_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Strip common providers to prevent nested tree issues
        for provider in providers_to_remove:
            # Match <Provider ...> ... </Provider>
            # This is complex with regex, better to use a simpler approach or replace tags with fragments
            content = re.sub(f'<{provider}[^>]*>', '<>', content)
            content = re.sub(f'</{provider}>', '</>', content)
            
        # Also remove the initializers for QueryClient
        content = re.sub(r'const queryClient = new QueryClient\(\);', '', content)
        
        with open(f_path, 'w', encoding='utf-8') as f:
            f.write(content)

print("Features stripped of redundant providers.")
