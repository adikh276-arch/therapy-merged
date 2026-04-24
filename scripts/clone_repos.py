import os
import subprocess
import shutil

repos = [
    # GROUP A
    "https://github.com/adikh276-arch/box_breathing",
    "https://github.com/adikh276-arch/4-6-8-breathing",
    "https://github.com/adikh276-arch/5-4-3-2-1-grounding",
    "https://github.com/adikh276-arch/joyful_activities",
    "https://github.com/adikh276-arch/affirmations",
    "https://github.com/adikh276-arch/grounded-technique",
    "https://github.com/adikh276-arch/self-care-bingo",
    "https://github.com/adikh276-arch/diffusion-technique",
    "https://github.com/adikh276-arch/thought_shifts",
    "https://github.com/adikh276-arch/environment-optimization",
    "https://github.com/adikh276-arch/a-pause-for-appreciation",
    "https://github.com/adikh276-arch/what-are-your-habits",
    "https://github.com/adikh276-arch/Real-stories-to-overcome-anxiety",
    # GROUP B
    "https://github.com/adikh276-arch/daily-gratitude-diary",
    "https://github.com/adikh276-arch/personal-mission-statement",
    "https://github.com/adikh276-arch/physical-activity-log",
    "https://github.com/adikh276-arch/a-letter-to-self",
    "https://github.com/adikh276-arch/know-your-values",
    "https://github.com/adikh276-arch/brain-dump-and-sort",
    "https://github.com/adikh276-arch/doodle-burst",
    "https://github.com/adikh276-arch/gratitude-tracker",
    "https://github.com/adikh276-arch/vibe-tracker",
    "https://github.com/adikh276-arch/care-tracker",
    # GROUP C1
    "https://github.com/adikh276-arch/depression-tips",
    "https://github.com/adikh276-arch/anxiety-tips",
    "https://github.com/adikh276-arch/stress-tips",
    # GROUP C2
    "https://github.com/adikh276-arch/depression_articles",
    "https://github.com/adikh276-arch/depression_stories",
    "https://github.com/adikh276-arch/depression_myths",
    "https://github.com/adikh276-arch/anxiety_articles",
    "https://github.com/adikh276-arch/anxiety_stories",
    "https://github.com/adikh276-arch/anxiety_myths",
    "https://github.com/adikh276-arch/stress_articles",
    "https://github.com/adikh276-arch/stress_stories",
    "https://github.com/adikh276-arch/stress_myths",
    "https://github.com/adikh276-arch/adolescent_articles",
    "https://github.com/adikh276-arch/adolescent_tips",
    "https://github.com/adikh276-arch/adolescent_stories",
    "https://github.com/adikh276-arch/adolescent_myths",
    "https://github.com/adikh276-arch/relationship_articles",
    "https://github.com/adikh276-arch/relationship_tips",
    "https://github.com/adikh276-arch/relationship_stories",
    "https://github.com/adikh276-arch/relationship_myths",
    "https://github.com/adikh276-arch/workplace_articles",
    "https://github.com/adikh276-arch/workplace_tips",
    "https://github.com/adikh276-arch/workplace_stories",
    "https://github.com/adikh276-arch/workplace_myths",
    "https://github.com/adikh276-arch/sleep_articles",
    "https://github.com/adikh276-arch/sleep_tips",
    "https://github.com/adikh276-arch/sleep_stories",
    "https://github.com/adikh276-arch/sleep_myths",
    "https://github.com/adikh276-arch/parenting_articles",
    "https://github.com/adikh276-arch/parenting_tips",
    "https://github.com/adikh276-arch/parenting_stories",
    "https://github.com/adikh276-arch/parenting_myths",
    "https://github.com/adikh276-arch/anger_articles",
    "https://github.com/adikh276-arch/anger_tips",
    "https://github.com/adikh276-arch/anger_stories",
    "https://github.com/adikh276-arch/anger_myths",
    "https://github.com/adikh276-arch/grief_articles",
    "https://github.com/adikh276-arch/grief_tips",
    "https://github.com/adikh276-arch/grief_stories",
    "https://github.com/adikh276-arch/grief_myths",
    "https://github.com/adikh276-arch/ptsd_articles",
    "https://github.com/adikh276-arch/ptsd_tips",
    "https://github.com/adikh276-arch/ptsd_stories",
    "https://github.com/adikh276-arch/ptsd_myths",
    "https://github.com/adikh276-arch/acceptance_articles",
    "https://github.com/adikh276-arch/acceptance_tips",
    "https://github.com/adikh276-arch/acceptance_stories",
    "https://github.com/adikh276-arch/acceptance_myths",
    "https://github.com/adikh276-arch/postpartum_articles",
    "https://github.com/adikh276-arch/postpartum_tips",
    "https://github.com/adikh276-arch/postpartum_stories",
    "https://github.com/adikh276-arch/postpartum_myths",
    "https://github.com/adikh276-arch/sexuality_articles",
    "https://github.com/adikh276-arch/sexuality_tips",
    "https://github.com/adikh276-arch/sexuality_stories",
    "https://github.com/adikh276-arch/sexuality_myths",
    "https://github.com/adikh276-arch/eating_disorder_articles",
    "https://github.com/adikh276-arch/eating_disorder_tips",
    "https://github.com/adikh276-arch/eating_disorder_stories",
    "https://github.com/adikh276-arch/eating_disorder_myths"
]

base_dir = r"D:\tmp-minis"
os.chdir(base_dir)

for repo in repos:
    folder_name = repo.split('/')[-1]
    # Check if exists
    if not os.path.exists(folder_name):
        print(f"Cloning {repo}...")
        subprocess.run(["git", "clone", repo], check=False)
        git_dir = os.path.join(folder_name, ".git")
        if os.path.exists(git_dir):
            try:
                subprocess.run(["rmdir", "/s", "/q", git_dir], shell=True)
            except Exception as e:
                print(f"Error removing .git in {folder_name}: {e}")
    else:
        print(f"Skipping {repo}, folder already exists.")

print("All repos cloned and detached.")
