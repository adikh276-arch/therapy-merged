import os

features_dir = "d:/Downloads/Therapy Merged/src/features"
import_statement = "import { UniversalBackButton } from '../../components/UniversalBackButton';\n"

for feature in os.listdir(features_dir):
    index_path = os.path.join(features_dir, feature, "index.tsx")
    if os.path.exists(index_path):
        with open(index_path, "r", encoding="utf-8") as f:
            content = f.read()
            
        if "UniversalBackButton" not in content:
            content = import_statement + content
            if "<Toaster />" in content:
                content = content.replace("<Toaster />", "<UniversalBackButton /><Toaster />", 1)
            elif "<React.Fragment>" in content:
                content = content.replace("<React.Fragment>", "<React.Fragment><UniversalBackButton />", 1)
                
            with open(index_path, "w", encoding="utf-8") as f:
                f.write(content)

print("Done injecting UniversalBackButton")
