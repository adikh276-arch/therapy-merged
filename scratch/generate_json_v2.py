import json

def parse_docx_to_json(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        lines = [line.strip() for line in f if line.strip()]
    
    concerns = {}
    current_concern = None
    
    known_concerns = [
        "Depression", "Anxiety", "Stress", "Adolescent", "Relationship", "Workplace", 
        "Sleep", "Parenting", "Anger", "Grief", "PTSD", "Acceptance", "Postpartum", 
        "Sexuality", "Eating Disorder"
    ]
    
    # Common descriptions to skip if they appear as names
    common_descs = ["Try this for a peaceful, undisturbed sleep!", "Observe the changes in your mood", "Measuring the highs and lows"]

    i = 0
    while i < len(lines):
        line = lines[i]
        
        if line in known_concerns:
            current_concern = line
            concerns[current_concern] = { "activities": [] }
            i += 1
            continue
        
        if not current_concern:
            i += 1
            continue

        if line in ["Guided Series", "Practicing Mindfulness", "Focusing on Physical Health"]:
            i += 1
            continue

        # Activity Name
        name = line
        desc = ""
        # Look ahead for description
        if i + 1 < len(lines):
            next_l = lines[i+1]
            if next_l not in known_concerns and next_l not in ["Guided Series", "Practicing Mindfulness", "Focusing on Physical Health"]:
                # If it's a known activity name appearing twice, the second one might be the desc
                desc = next_l
                i += 1
        
        if name not in common_descs:
            concerns[current_concern]["activities"].append({ "name": name, "description": desc })
        
        i += 1
            
    return concerns

data = parse_docx_to_json("scratch/docx_content.txt")

# Categorize and add icons/colors
def get_icon(name):
    n = name.lower()
    if "mood" in n or "assess" in n: return "Smile"
    if "habit" in n or "audit" in n: return "Clock"
    if "bmi" in n or "weight" in n: return "Scale"
    if "story" in n or "journal" in n or "diary" in n or "narrative" in n: return "Book"
    if "goal" in n or "target" in n: return "Target"
    if "sleep" in n or "insomnia" in n: return "Moon"
    if "meditation" in n or "grounding" in n: return "Cloud"
    if "breathing" in n: return "Wind"
    if "affirmation" in n: return "Heart"
    if "laugh" in n: return "Zap"
    if "talk" in n or "alone" in n or "partner" in n: return "Users"
    if "anger" in n or "stress" in n: return "Brain"
    return "Sparkles"

def get_color(name):
    n = name.lower()
    if "mood" in n or "assess" in n: return "#FF6B6B"
    if "habit" in n: return "#4DABF7"
    if "bmi" in n or "weight" in n: return "#51CF66"
    if "story" in n or "journal" in n: return "#FCC419"
    if "goal" in n: return "#FF922B"
    if "sleep" in n: return "#845EF7"
    if "anger" in n: return "#E64980"
    if "stress" in n: return "#228BE6"
    return "#339AF0"

final_data = {}
for concern, content in data.items():
    acts = content["activities"]
    
    # Distribution logic
    cat1 = { "name": f"Know about {concern.lower()}", "activities": acts[0:2] }
    cat2 = { "name": "Noticing impacts", "activities": acts[2:4] }
    cat3 = { "name": f"Managing {concern.lower()}", "activities": acts[4:6] }
    cat4 = { "name": "Enjoyable Activities", "activities": acts[6:-7] }
    cat5 = { "name": "Practicing Mindfulness", "activities": acts[-7:-2] }
    cat6 = { "name": "Focusing on Physical Health", "activities": acts[-2:] }
    
    cats = [cat1, cat2, cat3, cat4, cat5, cat6]
    # Filter empty or small categories
    cats = [c for c in cats if c["activities"]]
    
    for c in cats:
        for a in c["activities"]:
            a["icon"] = get_icon(a["name"])
            a["color"] = get_color(a["name"])
            if not a["description"]: a["description"] = f"Take a step towards {concern.lower()} management."

    final_data[concern] = { "categories": cats }

with open("src/app/data/guidedSeries.json", "w", encoding="utf-8") as f:
    json.dump(final_data, f, indent=2)

print("Final polished JSON saved.")
