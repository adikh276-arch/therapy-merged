import os
import re

root_dir = r"d:\Downloads\Therapy Merged\src"

for root, dirs, files in os.walk(root_dir):
    for f in files:
        if f.endswith(('.tsx', '.ts')):
            f_path = os.path.join(root, f)
            with open(f_path, 'r', encoding='utf-8', errors='ignore') as file:
                content = file.read()
            
            # Replace motion/react with framer-motion
            new_content = content.replace('from "motion/react"', 'from "framer-motion"')
            new_content = new_content.replace("from 'motion/react'", "from 'framer-motion'")
            
            if new_content != content:
                with open(f_path, 'w', encoding='utf-8') as file:
                    file.write(new_content)

print("Switched all motion/react imports to framer-motion.")
