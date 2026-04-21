import os
import shutil
import time

features_dir = r"d:\Downloads\Therapy Merged\src\features"
locales_dir = r"d:\Downloads\Therapy Merged\public\locales"

required_features = [
    "4_6_8_breathing",
    "5_4_3_2_1_grounding",
    "a_letter_to_self",
    "a_pause_for_appreciation",
    "affirmations",
    "anxiety_tips",
    "box_breathing",
    "brain_dump_and_sort",
    "care_tracker",
    "daily_gratitude_diary",
    "depression_tips",
    "diffusion_technique",
    "doodle_burst",
    "environment_optimization",
    "gratitude_tracker",
    "grounded_technique",
    "grounding_technique",
    "joyful_activities",
    "know_your_values",
    "personal_mission_statement",
    "physical_activity_log",
    "real_stories_to_overcome_anxiety",
    "self_care_bingo",
    "stress_tips",
    "thought_shifts",
    "vibe_tracker",
    "what_are_your_habits",
    "pause_for_appreciation"
]

def on_error(func, path, exc_info):
    import stat
    if not os.access(path, os.W_OK):
        os.chmod(path, stat.S_IWUSR)
        func(path)
    else:
        print(f"Could not delete {path}")

def force_purge(directory, whitelist):
    if not os.path.exists(directory):
        return
    for item in os.listdir(directory):
        if item not in whitelist:
            item_path = os.path.join(directory, item)
            print(f"Purging {item}")
            try:
                if os.path.isdir(item_path):
                    shutil.rmtree(item_path, onerror=on_error)
                else:
                    os.remove(item_path)
            except Exception as e:
                print(f"Error {item}: {e}")

force_purge(features_dir, required_features)
force_purge(locales_dir, required_features)

print("Final Purge complete.")
