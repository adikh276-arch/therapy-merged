import os
import re

def stabilize_monorepo():
    features_dir = r"D:\Downloads\Therapy Merged\src\features"
    features = [f for f in os.listdir(features_dir) if os.path.isdir(os.path.join(features_dir, f))]
    
    for feature in features:
        feature_path = os.path.join(features_dir, feature)
        print(f"Stabilizing {feature}...")
        
        # 1. Process all .tsx files in the feature to fix absolute navigate() calls
        for root, dirs, files in os.walk(feature_path):
            for file in files:
                if file.endswith(".tsx") or file.endswith(".ts"):
                    file_path = os.path.join(root, file)
                    with open(file_path, "r", encoding="utf-8") as f:
                        content = f.read()
                    
                    # Replace navigate("/path") with navigate("path") or navigate("./path")
                    # but only if it's a fixed string. 
                    # We also want to exclude "/" because navigate("/") should probably go to feature root.
                    # In RR6 inside a child <Routes>, navigate(".") or navigate("") goes to current route index.
                    
                    # Pattern for navigate("/...")
                    new_content = re.sub(r'navigate\(\s*["\']/(?![/])([^"\']+)["\']\s*\)', r'navigate("./\1")', content)
                    
                    # Special case for navigate("/") -> navigate(".")
                    new_content = re.sub(r'navigate\(\s*["\']/["\']\s*\)', r'navigate(".")', new_content)

                    # Fix AuthContext redirects to use relative or global
                    new_content = new_content.replace('window.location.href = "https://mantracare.com/token"', '// window.location.href = "/therapy/token"')
                    new_content = new_content.replace('window.location.href = "https://api.mantracare.com/token"', '// window.location.href = "/therapy/token"')
                    
                    if new_content != content:
                        with open(file_path, "w", encoding="utf-8") as f:
                            f.write(new_content)
        
        # 2. Ensure index.tsx imports css and i18n
        index_tsx = os.path.join(feature_path, "index.tsx")
        if os.path.exists(index_tsx):
            with open(index_tsx, "r", encoding="utf-8") as f:
                content = f.read()
            
            # Remove any left-over BrowserRouter imports/tags just in case
            content = content.replace("<BrowserRouter>", "<React.Fragment>")
            content = content.replace("</BrowserRouter>", "</React.Fragment>")
            
            if "import './index.css'" not in content and os.path.exists(os.path.join(feature_path, "index.css")):
                content = "import './index.css';\n" + content
            
            # Ensure it uses the local i18n
            if "import './i18n'" not in content:
                content = "import './i18n';\nimport { I18nextProvider } from 'react-i18next';\nimport i18n from './i18n';\n" + content
            
            # Wrap in I18nextProvider if not already
            if "<I18nextProvider" not in content:
                content = content.replace("<TooltipProvider>", "<TooltipProvider>\n      <I18nextProvider i18n={i18n}>")
                content = content.replace("</TooltipProvider>", "      </I18nextProvider>\n    </TooltipProvider>")
            
            with open(index_tsx, "w", encoding="utf-8") as f:
                f.write(content)

if __name__ == "__main__":
    stabilize_monorepo()
