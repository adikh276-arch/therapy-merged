import json

def parse_docx_to_json(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        lines = [line.strip() for line in f if line.strip()]
    
    concerns = {}
    current_concern = None
    current_category = None
    
    known_concerns = [
        "Depression", "Anxiety", "Stress", "Adolescent", "Relationship", "Workplace", 
        "Sleep", "Parenting", "Anger", "Grief", "PTSD", "Acceptance", "Postpartum", 
        "Sexuality", "Eating Disorder"
    ]
    
    categories = {
        "Guided Series": "Guided Series",
        "Practicing Mindfulness": "Practicing Mindfulness",
        "Focusing on Physical Health": "Focusing on Physical Health"
    }

    # Internal categories often based on the first few activities
    # But for simplicity, we'll try to group them.
    
    i = 0
    while i < len(lines):
        line = lines[i]
        
        if line in known_concerns:
            current_concern = line
            concerns[current_concern] = {
                "categories": []
            }
            # Add default categories
            current_category = { "name": "Guided Series", "activities": [] }
            concerns[current_concern]["categories"].append(current_category)
            i += 1
            continue
        
        if not current_concern:
            i += 1
            continue

        if line == "Practicing Mindfulness":
            current_category = { "name": "Practicing Mindfulness", "activities": [] }
            concerns[current_concern]["categories"].append(current_category)
            i += 1
            continue
        
        if line == "Focusing on Physical Health":
            current_category = { "name": "Focusing on Physical Health", "activities": [] }
            concerns[current_concern]["categories"].append(current_category)
            i += 1
            continue
            
        if line == "Guided Series":
            # Already handled by default start
            i += 1
            continue

        # If it's an activity, it usually has a description on the next line
        activity_name = line
        activity_desc = ""
        if i + 1 < len(lines):
            next_line = lines[i+1]
            # Heuristic: descriptions are longer or start with a verb
            if len(next_line) > 10 and next_line not in known_concerns and next_line not in categories:
                activity_desc = next_line
                i += 1
        
        # Add activity
        current_category["activities"].append({
            "name": activity_name,
            "description": activity_desc
        })
        
        i += 1
            
    return concerns

data = parse_docx_to_json("scratch/docx_content.txt")

# Post-processing: For "Guided Series" category, we should split it into 
# "Know about...", "Noticing impacts", "Managing...", "Enjoyable Activities"
# based on the content or just a fixed distribution for the UI demo.

for concern, content in data.items():
    cats = content["categories"]
    guided = cats[0] # The first one we put everything in
    if guided["name"] == "Guided Series":
        acts = guided["activities"]
        new_cats = []
        
        # Distribute activities (roughly 2 per category as in screenshot)
        know_about = { "name": f"Know about {concern.lower()}", "activities": acts[0:2] }
        noticing = { "name": "Noticing impacts", "activities": acts[2:4] }
        managing = { "name": f"Managing {concern.lower()}", "activities": acts[4:6] }
        enjoyable = { "name": "Enjoyable Activities", "activities": acts[6:] }
        
        new_cats.extend([know_about, noticing, managing, enjoyable])
        content["categories"] = new_cats + cats[1:]

with open("scratch/guided_series_data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2)

print("Saved to scratch/guided_series_data.json")
