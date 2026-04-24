import re

files = [
    r"d:\Downloads\Therapy Merged\src\app\components\OCDSelfCare.tsx",
    r"d:\Downloads\Therapy Merged\src\app\components\OCDPage.tsx"
]

for f in files:
    with open(f, "r", encoding="utf-8") as file:
        lines = file.readlines()
    
    # We just want to omit any lines containing 'web.mantracare.com/app'
    new_lines = [line for line in lines if "web.mantracare.com/app" not in line]
    
    with open(f, "w", encoding="utf-8") as file:
        file.writelines(new_lines)
