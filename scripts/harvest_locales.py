import os
import shutil

# Target directory in our monorepo
target_base = r"d:\Downloads\Therapy Merged\public\locales"
if not os.path.exists(target_base):
    os.makedirs(target_base)

# Search root for translations
search_root = r"d:\Downloads"

# List of our feature names
feature_names = [
    "4_6_8_breathing", "5_4_3_2_1_grounding", "affirmations", "anxiety_tips",
    "a_letter_to_self", "a_pause_for_appreciation", "box_breathing",
    "brain_dump_and_sort", "care_tracker", "daily_gratitude_diary",
    "depression_tips", "diffusion_technique", "doodle_burst",
    "environment_optimization", "gratitude_tracker", "grounded_technique",
    "joyful_activities", "know_your_values", "personal_mission_statement",
    "physical_activity_log", "Real_stories_to_overcome_anxiety",
    "self_care_bingo", "stress_tips", "thought_shifts", "vibe_tracker",
    "what_are_your_habits"
]

# Walk through the search root and find locales
for root, dirs, files in os.walk(search_root):
    # Exclude our current repo to avoid infinite loop or redundant copies
    if "Therapy Merged" in root:
        continue
        
    if "locales" in dirs:
        locales_dir = os.path.join(root, "locales")
        # Try to find which feature this belongs to by looking at the parent folder name
        parent_dir = os.path.basename(root)
        
        # Match parent_dir to feature_names
        match = None
        for fn in feature_names:
            if fn.lower() in parent_dir.lower():
                match = fn
                break
        
        if match:
            dest = os.path.join(target_base, match)
            if not os.path.exists(dest):
                shutil.copytree(locales_dir, dest)
                print(f"Copied locales for {match} from {locales_dir}")

print("Locales harvest complete.")
