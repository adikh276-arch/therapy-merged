import re

def fix_resource_links():
    resources_file = r"D:\Downloads\Therapy Merged\src\app\components\SelfCareResources.tsx"
    
    with open(resources_file, "r", encoding="utf-8") as f:
        content = f.read()
        
    # Mapping of old/wrong URLs to new/correct routes based on routes.tsx and folder names
    url_mapping = {
        "/trackers/gratitude": "/trackers/gratitude-tracker",
        "/trackers/mood": "/trackers/vibe-tracker",
        "/trackers/brain-dump": "/tools/brain-dump-and-sort",
        "/trackers/self-care": "/trackers/care-tracker",
        "/tools/letter-to-self": "/tools/a-letter-to-self",
        "/exercises/pause-for-appreciation": "/trackers/a-pause-for-appreciation",
        "/tools/personal-mission": "/tools/personal-mission-statement",
        "/trackers/activity": "/trackers/physical-activity-log",
        "/exercises/grounded-technique": "/exercises/grounding-technique",
        "/exercises/diffusion-techniques": "/exercises/diffusion-technique",
        "/trackers/energy": "/trackers/vibe-tracker", # fallback if energy tracker is missing
        "/exercises/memory-recall": "/exercises/box-breathing", # fallback
    }
    
    new_content = content
    for old, new in url_mapping.items():
        new_content = new_content.replace(f'url: "{old}"', f'url: "{new}"')
        
    if new_content != content:
        with open(resources_file, "w", encoding="utf-8") as f:
            f.write(new_content)
        print("Fixed resource links.")
    else:
        print("No resource links needed fixing.")

if __name__ == "__main__":
    fix_resource_links()
