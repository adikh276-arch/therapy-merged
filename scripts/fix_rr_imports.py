import os
import re

root_dir = r"d:\Downloads\Therapy Merged\src"

for root, dirs, files in os.walk(root_dir):
    for f in files:
        if f.endswith(('.tsx', '.ts')):
            f_path = os.path.join(root, f)
            with open(f_path, 'r', encoding='utf-8', errors='ignore') as file:
                content = file.read()
            
            # Replace 'react-router' with 'react-router-dom'
            new_content = content.replace("from 'react-router'", "from 'react-router-dom'")
            new_content = new_content.replace('from "react-router"', 'from "react-router-dom"')
            
            if new_content != content:
                with open(f_path, 'w', encoding='utf-8') as file:
                    file.write(new_content)

print("Unified all React Router imports to react-router-dom.")
