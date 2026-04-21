import os
import glob
import subprocess

group_B = [
    "daily-gratitude-diary",
    "personal-mission-statement",
    "physical-activity-log",
    "a-letter-to-self",
    "know-your-values",
    "brain-dump-and-sort",
    "doodle-burst",
    "gratitude-tracker",
    "vibe-tracker",
    "care-tracker"
]

base_dir = r"D:\tmp-minis"

for repo in group_B:
    repo_path = os.path.join(base_dir, repo)
    print(f"--- Checking {repo} ---")
    files = []
    for root, dirs, filenames in os.walk(repo_path):
        for filename in filenames:
            if filename.endswith(".sql") or filename == "schema.prisma" or filename == "schema.ts":
                files.append(os.path.join(root, filename))
    print(f"Found files: {files}")
