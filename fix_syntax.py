import os
import re

features_dir = r"d:\Downloads\Therapy Merged\src\features"

for feature in os.listdir(features_dir):
    feature_path = os.path.join(features_dir, feature)
    if not os.path.isdir(feature_path): continue
    
    for file in ["index.tsx", "index.jsx"]:
        index_path = os.path.join(feature_path, file)
        if os.path.exists(index_path):
            with open(index_path, 'r', encoding='utf-8') as f:
                lines = f.readlines()
            
            # Find the line that has <Routes> and the corresponding </Routes>
            # Any <> after </Routes> that belongs to the same indentation should probably be </>
            # Instead, let's just do a simple string replacement based on the pattern
            # The pattern created by the bad script was usually:
            #       <Routes>
            #         ...
            #       </Routes>
            #     <>
            
            # Since the only place we introduced `<>` replacing `</BrowserRouter>` is right after `</Routes>`,
            # let's find `</Routes>` and the first `<>` after it, and change it to `</>`
            
            for i in range(len(lines)):
                if '<>' in lines[i] and '</Routes>' in ''.join(lines[i-3:i]):
                    lines[i] = lines[i].replace('<>', '</>')
            
            with open(index_path, 'w', encoding='utf-8') as f:
                f.writelines(lines)

print("Syntax fixed.")
