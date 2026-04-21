import os
import re

def convert_css_to_v4_robust():
    features_dir = r"D:\Downloads\Therapy Merged\src\features"
    features = [f for f in os.listdir(features_dir) if os.path.isdir(os.path.join(features_dir, f))]
    
    for feature in features:
        feature_path = os.path.join(features_dir, feature)
        index_css = os.path.join(feature_path, "index.css")
        
        if not os.path.exists(index_css):
            continue
            
        print(f"Applying robust CSS v4 conversion for {feature}...")
        
        with open(index_css, "r", encoding="utf-8") as f:
            content = f.read()
            
        # 1. Update Imports
        new_content = content.replace('@tailwind base;', '@import "tailwindcss";')
        new_content = new_content.replace('@tailwind components;', '')
        new_content = new_content.replace('@tailwind utilities;', '')
        
        if '@import "tailwindcss";' not in new_content:
            new_content = '@import "tailwindcss";\n' + new_content

        # 2. Build comprehensive @theme block
        # We find all variables and also provide defaults for common unknown classes
        variables = re.findall(r'--([a-z0-9-]+):\s*[^;]+;', content)
        
        theme_block = "\n\n@theme inline {\n"
        
        # Map colors
        color_vars = ["background", "foreground", "primary", "secondary", "muted", "accent", "destructive", "border", "input", "ring", "card", "popover", "sidebar-background", "sidebar-foreground", "sidebar-primary", "sidebar-primary-foreground", "sidebar-accent", "sidebar-accent-foreground", "sidebar-border", "sidebar-ring"]
        for var in color_vars:
            theme_block += f"  --color-{var}: var(--{var});\n"
            
        # Map fonts
        theme_block += "  --font-body: 'Inter', sans-serif;\n"
        theme_block += "  --font-heading: 'Poppins', sans-serif;\n"
        theme_block += "  --font-display: 'Playfair Display', serif;\n"
        
        # Handle "animate-fade-in" etc. (common in these apps)
        theme_block += "  --animate-fade-in: fadeSlideIn 0.5s ease-in-out forwards;\n"
        theme_block += "  --animate-accordion-down: accordion-down 0.2s ease-out;\n"
        theme_block += "  --animate-accordion-up: accordion-up 0.2s ease-in;\n"
        
        theme_block += "}\n"
        
        # Replace existing @theme block if I created it earlier
        if "@theme inline" in new_content:
            new_content = re.sub(r'@theme inline\s*\{[^}]*\}', theme_block, new_content, flags=re.DOTALL)
        else:
            new_content = new_content.replace('@import "tailwindcss";', '@import "tailwindcss";' + theme_block)

        if new_content != content:
            with open(index_css, "w", encoding="utf-8") as f:
                f.write(new_content)

if __name__ == "__main__":
    convert_css_to_v4_robust()
