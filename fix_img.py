import os

features_dir = r"d:\Downloads\Therapy Merged\src\features\daily_gratitude_diary\components"

files_to_fix = [
    "ScreenClosing.tsx",
    "ScreenIntro.tsx",
    "ScreenReflection.tsx",
    "ScreenGratitude.tsx",
    "ScreenPastEntries.tsx"
]

for file in files_to_fix:
    path = os.path.join(features_dir, file)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = content.replace('@/assets/cherry-blossom.png', '../assets/cherry-blossom.png')
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Images replaced.")
