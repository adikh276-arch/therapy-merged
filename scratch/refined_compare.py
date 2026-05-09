import json

def get_activities(lines):
    # This is a heuristic: headers are usually short, descriptions are longer.
    # But some activities are also short.
    # Let's assume an activity is followed by a description if the next line is "Description-like"
    # Actually, looking at the doc, many activities are listed with their descriptions immediately after.
    
    activities = []
    i = 0
    while i < len(lines):
        line = lines[i]
        # Ignore sub-headers
        if line in ["Guided Series", "Practicing Mindfulness", "Focusing on Physical Health"]:
            i += 1
            continue
        
        # Heuristic: an activity name is usually 1-4 words.
        # A description is usually longer.
        # But some descriptions are also short.
        # Let's just collect all unique lines that look like activity names.
        # We'll filter out common descriptions like "Observe the changes in your mood"
        
        common_descriptions = [
            "Observe the changes in your mood",
            "Measuring the highs and lows",
            "How does your everyday look like?",
            "Your friends can help you through this phase",
            "Your thoughts can create a positive change",
            "Let’s start your day with something you love doing",
            "Transforming your negative emotions to positive",
            "Record the thoughts in your mind",
            "Try this for a peaceful, undisturbed sleep!",
            "Start your day with the peace of mind!",
            "Think positive & embrace positivity",
            "Calm your nerves with long deep breaths",
            "Bring your attention to the present",
            "Exercise is equally important for a peaceful mind",
            "Eat healthy to stay healthy!",
            "Divert your mind by doing what you enjoy",
            "Transform your thoughts into stories",
            "You are not the only one facing it",
            "Transforming your negative emotions to positivity",
            "Taking care of yourself should be the first priority",
            "Talking to your friends is sometimes all the Boost you need",
            "You need yourself to be happy",
            "Know your kid’s thinking process",
            "Measuring your Satisfaction",
            "Are you satisfied with your relationship?",
            "Know what kind of bond you share",
            "What style of attachment you have?",
            "Know your partner well",
            "Note the changes and your moods",
            "Transform your negative emotions to positivity",
            "Knowing your triggers",
            "A diary is the best tool to vent your emotions",
            "A simple way to ease your anger",
            "Looking into your insomnia",
            "Record the time you sleep",
            "You are not alone in this tough time",
            "Think of ways you can appreciate your kids",
            "Know your kids thinking process",
            "Takes a lot of patience to raise a kid",
            "A diary is the best tool to vent your anger",
            "Talking to your loved ones can help you heal",
            "Helping you in your tough times",
            "A diary is a man’s best friend",
            "Overcome your weaknesses and grow stronger",
            "Body Mass Index check",
            "Start loving yourself, before anyone else",
            "Do you know if you have an eating disorder?",
            "Check if you have an eating disorder?",
            "First step to achieve your goals is by writing them down"
        ]
        
        if line not in common_descriptions:
            # Check if it's a "Guided Series" sub-item
            # We'll treat it as an activity if it's not a description
            activities.append(line)
        i += 1
    
    # Remove duplicates while preserving order
    seen = set()
    unique_activities = []
    for a in activities:
        if a not in seen:
            unique_activities.append(a)
            seen.add(a)
            
    return unique_activities

def parse_docx_txt(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        lines = [line.strip() for line in f if line.strip()]
    
    concerns = {}
    current_concern = None
    current_lines = []
    
    known_concerns = [
        "Depression", "Anxiety", "Stress", "Adolescent", "Relationship", "Workplace", 
        "Sleep", "Parenting", "Anger", "Grief", "PTSD", "Acceptance", "Postpartum", 
        "Sexuality", "Eating Disorder"
    ]
    
    for line in lines:
        if line in known_concerns:
            if current_concern:
                concerns[current_concern] = get_activities(current_lines)
            current_concern = line
            current_lines = []
            continue
        current_lines.append(line)
        
    if current_concern:
        concerns[current_concern] = get_activities(current_lines)
            
    return concerns

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

summary = []
for doc_name, activities in doc_concerns.items():
    code_key = doc_name.lower().replace(" ", "-")
    code_activities = code_data.get(code_key, [])
    
    # Rough estimate of missing activities
    # We'll assume any activity in doc that doesn't have a fuzzy match in code is "missing"
    missing = []
    for doc_act in activities:
        found = False
        for code_act in code_activities:
            if doc_act.lower() in code_act.lower() or code_act.lower() in doc_act.lower():
                found = True
                break
        if not found:
            missing.append(doc_act)
            
    summary.append({
        "concern": doc_name,
        "total_doc": len(activities),
        "total_code": len(code_activities),
        "missing_list": missing
    })

print(json.dumps(summary, indent=2))
