import os
import re

def convert_css_to_v4():
    features_dir = r"D:\Downloads\Therapy Merged\src\features"
    features = [f for f in os.listdir(features_dir) if os.path.isdir(os.path.join(features_dir, f))]
    
    for feature in features:
        feature_path = os.path.join(features_dir, feature)
        index_css = os.path.join(feature_path, "index.css")
        
        if not os.path.exists(index_css):
            continue
            
        print(f"Converting CSS to v4 for {feature}...")
        
        with open(index_css, "r", encoding="utf-8") as f:
            content = f.read()
            
        # 1. Replace legacy @tailwind directives
        new_content = content.replace("@tailwind base;", '@import "tailwindcss";')
        new_content = new_content.replace("@tailwind components;", "")
        new_content = new_content.replace("@tailwind utilities;", "")
        
        # Strip duplicate imports if any
        if '@import "tailwindcss";' in new_content:
            # Ensure it's at the top
            new_content = '@import "tailwindcss";\n' + new_content.replace('@import "tailwindcss";', "")

        # 2. Extract CSS variables from :root or @layer base { :root { ... } }
        # And create a @theme block
        variables = re.findall(r'--([a-z0-9-]+):\s*[^;]+;', content)
        if variables:
            theme_block = "\n\n@theme inline {\n"
            for var in variables:
                # Map colors, etc.
                # In Tailwind 4, --color-primary maps to primary utility
                if var in ["background", "foreground", "primary", "secondary", "muted", "accent", "destructive", "border", "input", "ring", "card", "popover"]:
                    theme_block += f"  --color-{var}: var(--{var});\n"
                elif "sidebar" in var:
                    theme_block += f"  --color-{var}: var(--{var});\n"
            theme_block += "}\n"
            
            # Append theme block after imports
            if "@theme inline" not in new_content:
                new_content = new_content.replace('@import "tailwindcss";', '@import "tailwindcss";' + theme_block)
                
        # 3. Fix @apply border-border if it's causing issues (redundant in base layer usually)
        # But for now, the theme block should fix it.
        
        if new_content != content:
            with open(index_css, "w", encoding="utf-8") as f:
                f.write(new_content)

if __name__ == "__main__":
    convert_css_to_v4()
