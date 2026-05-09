keywords = ["Gratitude", "Values", "Care Tracker", "Letter", "Journal", "Diary", "Vibe", "Energy", "Sleep Tracker", "Mood"]
with open("scratch/docx_content.txt", "r", encoding="utf-8") as f:
    content = f.read()

for kw in keywords:
    if kw.lower() in content.lower():
        print(f"Found: {kw}")
    else:
        print(f"NOT Found: {kw}")
