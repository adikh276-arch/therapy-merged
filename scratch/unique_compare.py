import json
import re

def get_unique_activities(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        lines = [line.strip() for line in f if line.strip()]
    
    headers = [
        "Depression", "Anxiety", "Stress", "Adolescent", "Relationship", "Workplace", 
        "Sleep", "Parenting", "Anger", "Grief", "PTSD", "Acceptance", "Postpartum", 
        "Sexuality", "Eating Disorder", "Guided Series", "Practicing Mindfulness", 
        "Focusing on Physical Health"
    ]
    
    # Common descriptions to filter out
    common_descriptions = [
        "Observe the changes in your mood", "Measuring the highs and lows", "How does your everyday look like?",
        "Your friends can help you through this phase", "Your thoughts can create a positive change",
        "Let’s start your day with something you love doing", "Transforming your negative emotions to positive",
        "Record the thoughts in your mind", "Try this for a peaceful, undisturbed sleep!",
        "Start your day with the peace of mind!", "Think positive & embrace positivity",
        "Calm your nerves with long deep breaths", "Bring your attention to the present",
        "Exercise is equally important for a peaceful mind", "Eat healthy to stay healthy!",
        "Divert your mind by doing what you enjoy", "Transform your thoughts into stories",
        "You are not the only one facing it", "Transforming your negative emotions to positivity",
        "Taking care of yourself should be the first priority", "Talking to your friends is sometimes all the Boost you need",
        "You need yourself to be happy", "Know your kid’s thinking process", "Measuring your Satisfaction",
        "Are you satisfied with your relationship?", "Know what kind of bond you share",
        "What style of attachment you have?", "Know your partner well", "Note the changes and your moods",
        "Transform your negative emotions to positivity", "Knowing your triggers",
        "A diary is the best tool to vent your emotions", "A simple way to ease your anger",
        "Looking into your insomnia", "Record the time you sleep", "You are not alone in this tough time",
        "Think of ways you can appreciate your kids", "Know your kids thinking process",
        "Takes a lot of patience to raise a kid", "A diary is the best tool to vent your anger",
        "Talking to your loved ones can help you heal", "Helping you in your tough times",
        "A diary is a man’s best friend", "Overcome your weaknesses and grow stronger",
        "Body Mass Index check", "Start loving yourself, before anyone else",
        "Do you know if you have an eating disorder?", "Check if you have an eating disorder?",
        "First step to achieve your goals is by writing them down", "Today I will",
        "How do you wanna spend your day?", "Love Me", "Strengths & Weakness",
        "BMI Check", "Weight", "Positive Body Image", "Ask Yourself", "Signs of Eating Disorder",
        "Do you know if you have an eating disorder?", "Check if you have an eating disorder?",
        "Add your goals", "Signs Checklist", "Managing Disorder", "Managing Depression",
        "Managing Grief", "Managing Relationship", "Testing Your Bond", "Testing Your Bond with your Partner",
        "Knowing Your Relationship", "Knowing Grief", "Understanding Sexuality", "Know about eating disorder",
        "1 min", "2 min", "4 min", "Laugh!!!", "Laugh", "Diary", "Journal", "Count", "Anger Diary", "My Mood Journal",
        "Exploring my anxiety", "Exploring habits", "Anxiety Check", "Assess your mood", "Assess your stress",
        "Assess your [Concern]", "Measuring my mood", "Measuring my stress", "Measuring my grief",
        "Noticing impacts", "Noticing the impacts", "Noticing what impacts my PTSD", "Noticing what impacts my depression",
        "Noticing what impacts my anger", "Issues at work", "Resistance to change", "Parenting Skills",
        "Complete the sentences", "Parenting JOJO", "Grief Deck", "BMI Check", "Weight", "Positive Body Image",
        "Ask Yourself", "Signs of Eating Disorder", "Add your goals", "Signs Checklist", "Managing Disorder",
        "Managing Depression", "Managing Grief", "Managing Relationship", "Testing Your Bond", 
        "Testing Your Bond with your Partner", "Knowing Your Relationship", "Knowing Grief", 
        "Understanding Sexuality", "Know about eating disorder"
    ]

    # Activities found in doc
    doc_activities = set()
    for line in lines:
        if line not in headers and line not in common_descriptions and len(line) < 40:
            doc_activities.add(line)
            
    return sorted(list(doc_activities))

# Manually list current repo activities (from SelfCareResources.tsx and general knowledge of the app)
repo_activities = [
    "5-4-3-2-1 Grounding", "Box Breathing", "4-6-8 Breathing", "Guided Imagery", 
    "Affirmations", "Joyful Activities", "Gratitude Tracker", "Daily Self Care Tracker", 
    "Know Your Values", "Letter to Self", "Vibe Tracker", "Thought Shifts", 
    "Energy Tracker", "Environment Optimization", "Sleep Tracker", "Doodle Burst", 
    "Personal Mission Statement", "Physical Activity Log", "Pause for Appreciation"
]

doc_unique = get_unique_activities("scratch/docx_content.txt")

# Compare
missing = []
for doc_act in doc_unique:
    found = False
    for repo_act in repo_activities:
        if doc_act.lower() in repo_act.lower() or repo_act.lower() in doc_act.lower():
            found = True
            break
    if not found:
        missing.append(doc_act)

print(json.dumps({
    "unique_in_doc": doc_unique,
    "missing_from_repo": missing
}, indent=2))
