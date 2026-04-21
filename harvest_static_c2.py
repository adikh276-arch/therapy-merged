import os
import shutil

base_download_dir = r"d:\Downloads"
target_static_dir = r"d:\Downloads\Therapy Merged\public\static\content"

# Search paths for static content
search_dirs = [
    os.path.join(base_download_dir, "Articles", "repos"),
    os.path.join(base_download_dir, "Stories"), # Flat structure
    os.path.join(base_download_dir, "Myths"),   # Flat structure
    os.path.join(base_download_dir, "tips"),    # Flat structure
    base_download_dir # Fallback
]

c2_slugs = [
     "depression_articles", "depression_stories", "depression_myths",
    "anxiety_articles", "anxiety_stories", "anxiety_myths",
    "stress_articles", "stress_stories", "stress_myths",
    "adolescent_articles", "adolescent_tips", "adolescent_stories", "adolescent_myths",
    "relationship_articles", "relationship_tips", "relationship_stories", "relationship_myths",
    "workplace_articles", "workplace_tips", "workplace_stories", "workplace_myths",
    "sleep_articles", "sleep_tips", "sleep_stories", "sleep_myths",
    "parenting_articles", "parenting_tips", "parenting_stories", "parenting_myths",
    "anger_articles", "anger_tips", "anger_stories", "anger_myths",
    "grief_articles", "grief_tips", "grief_stories", "grief_myths",
    "ptsd_articles", "ptsd_tips", "ptsd_stories", "ptsd_myths",
    "acceptance_articles", "acceptance_tips", "acceptance_stories", "acceptance_myths",
    "postpartum_articles", "postpartum_tips", "postpartum_stories", "postpartum_myths",
    "sexuality_articles", "sexuality_tips", "sexuality_stories", "sexuality_myths",
    "eating_disorder_articles", "eating_disorder_tips", "eating_disorder_stories", "eating_disorder_myths"
]

if not os.path.exists(target_static_dir):
    os.makedirs(target_static_dir)

count = 0
for slug in c2_slugs:
    found = False
    for s_dir in search_dirs:
        if not os.path.exists(s_dir): continue
        
        # Check if it's a directory
        potential_path = os.path.join(s_dir, slug)
        if os.path.isdir(potential_path):
            dest_path = os.path.join(target_static_dir, slug)
            if not os.path.exists(dest_path):
                 shutil.copytree(potential_path, dest_path, ignore=shutil.ignore_patterns('node_modules', '.git', '.github'))
                 print(f"Harvested: {slug} from {s_dir}")
                 count += 1
            found = True
            break
        
        # Try dash instead of underscore
        alt_slug = slug.replace("_", "-")
        potential_path = os.path.join(s_dir, alt_slug)
        if os.path.isdir(potential_path):
            dest_path = os.path.join(target_static_dir, slug)
            if not os.path.exists(dest_path):
                 shutil.copytree(potential_path, dest_path, ignore=shutil.ignore_patterns('node_modules', '.git', '.github'))
                 print(f"Harvested (alt): {slug} from {s_dir}")
                 count += 1
            found = True
            break

print(f"Finished harvesting {count} static content repos.")
