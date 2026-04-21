import os
import re

file_path = r"d:\Downloads\Therapy Merged\src\app\components\SelfCareResources.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace url with routes
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

# Add Group C1 tips and Group C2 resources
concerns = [
    "depression", "anxiety", "stress", "adolescent", "relationship",
    "workplace", "sleep", "parenting", "anger", "grief", "ptsd",
    "acceptance", "postpartum", "sexuality", "eating_disorder", "ocd"
]

types = ["articles", "tips", "stories", "myths"] # "posters" becomes "myths"

for c in concerns:
    for t in types:
        # replace posters with myths in regex matching
        old_t = "posters" if t == "myths" else t
        p_c = c.replace("-", "_") # eating-disorder -> eating_disorder typically
        regex = rf"https?://platform\.mantracare\.com/{p_c}_{old_t}/?(\?lang=en)?"
        url_replacements[regex] = f"/concerns/{c.replace('_', '-')}/{t}"

for pattern, repl in url_replacements.items():
    content = re.sub(pattern, repl, content)

# Fix window.location.href to navigate
content = content.replace("window.location.href = ex.url", "ex.url.startsWith('http') ? window.location.href = ex.url : navigate(ex.url)")
content = content.replace("window.location.href = todo.url", "todo.url.startsWith('http') ? window.location.href = todo.url : navigate(todo.url)")
content = content.replace("window.location.href = res.url", "res.url.startsWith('http') ? window.location.href = res.url : navigate(res.url)")
content = content.replace("window.location.href = tool.url", "tool.url.startsWith('http') ? window.location.href = tool.url : navigate(tool.url)")
content = content.replace("window.location.href = 'https://web.mantracare.com/wp/selfcare-ocd'", "navigate('/concerns/ocd/articles')")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated links in SelfCareResources.tsx")
