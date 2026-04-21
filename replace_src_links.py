import os
import re

src_dir = r"d:\Downloads\Therapy Merged\src"

url_replacements = {
    r"https?://platform\.mantracare\.com/box_breathing/?(\?lang=en)?": "/exercises/box-breathing",
    r"https?://platform\.mantracare\.com/4_6_8_breathing/?": "/exercises/4-6-8-breathing",
    r"https?://platform\.mantracare\.com/5-4-3-2-1-grounding/?": "/exercises/5-4-3-2-1-grounding",
    r"https?://platform\.mantracare\.com/grounded_technique/?": "/exercises/grounded-technique",
    r"https?://platform\.mantracare\.com/diffusion_techniques/?": "/exercises/diffusion-techniques",
    r"https?://platform\.mantracare\.com/pause_for_appreciation/?(\?lang=en)?": "/exercises/pause-for-appreciation",
    r"https?://platform\.mantracare\.com/joyful_activities/?(\?lang=en)?": "/exercises/joyful-activities",
    
    r"https?://platform\.mantracare\.com/affirmations/?(\?lang=en)?": "/tools/affirmations",
    r"https?://platform\.mantracare\.com/thought_shifts/?": "/tools/thought-shifts",
    r"https?://platform\.mantracare\.com/environment_optimization/?(\?lang=en)?": "/tools/environment",
    
    r"https?://web\.mantracare\.com/app/gratitude_tracker/?": "/trackers/gratitude",
    r"https?://web\.mantracare\.com/app/vibe_tracker/?": "/trackers/mood",
    r"https?://web\.mantracare\.com/app/daily_self_care_tracker/?": "/trackers/self-care",
    r"https?://web\.mantracare\.com/app/physical_activity_log/?": "/trackers/activity",
    r"https?://web\.mantracare\.com/app/brain_dump_and_sort/?": "/trackers/brain-dump",
    
    r"https?://web\.mantracare\.com/app/letter_to_self/?": "/tools/letter-to-self",
    r"https?://web\.mantracare\.com/app/know_your_values/?": "/tools/know-your-values",
    r"https?://web\.mantracare\.com/app/personal_mission_statement/?": "/tools/personal-mission",
    r"https?://web\.mantracare\.com/app/doodle_burst/?": "/tools/doodle-burst",
    
    r"https?://web\.mantracare\.com/app/sleep_tracker/?": "/trackers/sleep",
    r"https?://web\.mantracare\.com/app/energy_tracker/?": "/trackers/energy",
    r"https?://platform\.mantracare\.com/memory-recall/?": "/exercises/memory-recall",
    r"https?://web\.mantracare\.com/wp/selfcare-ocd/?": "/concerns/ocd/articles"
}

concerns = [
    "depression", "anxiety", "stress", "adolescent", "relationship",
    "workplace", "sleep", "parenting", "anger", "grief", "ptsd",
    "acceptance", "postpartum", "sexuality", "eating_disorder", "ocd"
]

types = ["articles", "tips", "stories", "myths"] 

for c in concerns:
    for t in types:
        old_t = "posters" if t == "myths" else t
        p_c = c.replace("-", "_") 
        regex = rf"https?://platform\.mantracare\.com/{p_c}_{old_t}/?(\?lang=en)?"
        url_replacements[regex] = f"/concerns/{c.replace('_', '-')}/{t}"

for root, dirs, files in os.walk(src_dir):
    for fn in files:
        if fn.endswith((".ts", ".tsx", ".json")):
            file_path = os.path.join(root, fn)
            try:
                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read()
            except Exception:
                continue

            orig_content = content
            for pattern, repl in url_replacements.items():
                content = re.sub(pattern, repl, content)
            
            # Additional cleanup for 'posters' text that might be around
            # "posters":"/concerns/..." -> "myths":"/concerns/..."
            content = content.replace('"posters":"/concerns/', '"myths":"/concerns/')

            if content != orig_content:
                with open(file_path, "w", encoding="utf-8") as f:
                    f.write(content)
print("Updated all links in src folder")
