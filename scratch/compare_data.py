import json
import re

def parse_docx_txt(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        lines = [line.strip() for line in f if line.strip()]
    
    concerns = {}
    current_concern = None
    
    # List of known concerns from the doc structure
    known_concerns = [
        "Depression", "Anxiety", "Stress", "Adolescent", "Relationship", "Workplace", 
        "Sleep", "Parenting", "Anger", "Grief", "PTSD", "Acceptance", "Postpartum", 
        "Sexuality", "Eating Disorder"
    ]
    
    for line in lines:
        if line in known_concerns:
            current_concern = line
            concerns[current_concern] = []
            continue
        
        if current_concern and line not in ["Guided Series", "Practicing Mindfulness", "Focusing on Physical Health"]:
            # If it's not a header, it's an activity or description
            # We'll treat every line that isn't a header or a known concern as a potential activity
            # Usually, activities are followed by descriptions.
            # For simplicity, let's just count unique lines as "content items" 
            # or better: alternating Activity/Description.
            concerns[current_concern].append(line)
            
    return concerns

# Manually extracted from SelfCareResources.tsx for comparison
# (Since I can't easily parse React code with regex for everything)
code_data = {
    "depression": ["5-4-3-2-1 Grounding", "Guided Imagery", "Affirmations", "Joyful Activities", "Gratitude Tracker", "Daily Self Care Tracker", "Know Your Values", "Letter to Self"],
    "anxiety": ["Box Breathing", "4-6-8 Breathing", "Grounded Technique", "Diffusion Techniques", "Vibe Tracker", "Know Your Values", "Thought Shifts", "Daily Self Care Tracker"],
    "stress": ["Box Breathing", "Guided Imagery", "Doodle Burst", "Grounding", "Energy Tracker", "Daily Self Care Tracker", "Know Your Values", "Environment Optimization"],
    "sleep": ["4-6-8 Breathing", "Box Breathing", "Guided Imagery", "Grounding", "Sleep Tracker", "Energy Tracker", "Daily Self Care Tracker", "Know Your Values"],
    "adolescent": ["Guided Imagery", "Affirmations", "Doodle Burst", "Box Breathing", "Vibe Tracker", "Gratitude Tracker", "Daily Self Care Tracker", "Know Your Values"],
    "relationship": ["Letter to Self", "Affirmations", "Guided Imagery", "Thought Shifts", "Know Your Values", "Gratitude Tracker", "Daily Self Care Tracker", "Personal Mission Statement"],
    "workplace": ["Box Breathing", "Guided Imagery", "Thought Shifts", "Environment Optimization", "Physical Activity Log", "Energy Tracker", "Know Your Values", "Daily Self Care Tracker"],
    "parenting": ["Pause for Appreciation", "Guided Imagery", "Affirmations", "Grounding", "Gratitude Tracker", "Daily Self Care Tracker", "Know Your Values", "Letter to Self"],
    "anger": ["Box Breathing", "Grounding", "Diffusion Techniques", "Doodle Burst", "Vibe Tracker", "Know Your Values", "Thought Shifts", "Energy Tracker"],
    "grief": ["Letter to Self", "Guided Imagery", "Grounding", "Affirmations", "Gratitude Tracker", "Know Your Values", "Vibe Tracker", "Daily Self Care Tracker"],
    "ptsd": ["Grounded Technique", "Box Breathing", "Diffusion Techniques", "Guided Imagery", "Vibe Tracker", "Know Your Values", "Energy Tracker", "Thought Shifts"],
    "acceptance": ["Diffusion Techniques", "Affirmations", "Guided Imagery", "A Pause for Appreciation", "Letter to Self", "Know Your Values", "Gratitude Tracker", "Daily Self Care Tracker"],
    "postpartum": ["Guided Imagery", "Affirmations", "Box Breathing", "Grounding", "Energy Tracker", "Daily Self Care Tracker", "Gratitude Tracker", "Know Your Values"],
    "sexuality": ["Affirmations", "Guided Imagery", "Thought Shifts", "Letter to Self", "Know Your Values", "Daily Self Care Tracker", "Vibe Tracker", "Gratitude Tracker"],
    "eating-disorder": ["Grounding", "Diffusion Techniques", "Affirmations", "Guided Imagery", "Energy Tracker", "Daily Self Care Tracker", "Know Your Values", "Gratitude Tracker"]
}

doc_concerns = parse_docx_txt("scratch/docx_content.txt")

results = []
for doc_name, items in doc_concerns.items():
    # Attempt to separate activities from descriptions
    # Usually it's: Activity, Description, Activity, Description...
    # But some might not have descriptions or sub-headers interfere.
    # Let's just look at the list and count distinct "Activities" (every 2nd item roughly)
    # Actually, looking at the doc:
    # 1: Depression
    # 2: Guided Series
    # 3: Assess your mood (Activity)
    # 4: Assess your mood (Duplicate or Description?)
    # 5: Observe the changes in your mood (Description)
    
    # Let's count by looking at the structure.
    # I'll just report the total items found and a rough estimate of activities.
    
    code_key = doc_name.lower().replace(" ", "-")
    code_activities = code_data.get(code_key, [])
    
    # Let's identify "Missing" from code
    # We'll see how many activities in the doc are NOT in the code.
    # This is tricky because naming might differ.
    
    results.append({
        "concern": doc_name,
        "doc_items_count": len(items),
        "code_activities_count": len(code_activities),
        "code_key": code_key
    })

print(json.dumps(results, indent=2))
