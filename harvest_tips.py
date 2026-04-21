import os
import shutil

def harvest_tips():
    source_dir = r"D:\tmp-minis"
    target_base = r"D:\Downloads\Therapy Merged\public\static\content"
    
    # Mapping of concern names to their tips file names
    tips_mapping = {
        "acceptance": "acceptance-tips.html",
        "adolescent": "adolescent-tips.html",
        "anger": "anger-tips.html",
        "anxiety": "anxiety-tips.html",
        "depression": "depression-tips.html",
        "eating_disorder": "eating_disorder-tips.html",
        "grief": "grief-tips.html",
        "parenting": "parenting-tips.html",
        "postpartum": "postpartum-tips.html",
        "ptsd": "ptsd-tips.html",
        "relationship": "relationships-tips.html", # Note the plural 'relationships' in source
        "sexuality": "sexuality-tips.html",
        "sleep": "sleep-tips.html",
        "stress": "stress-tips.html",
        "workplace": "workplace-tips.html"
    }

    for concern, filename in tips_mapping.items():
        # Source could be either in a folder named after the concern or directly in tmp-minis
        # Based on the previous ls, they are in folders like D:\tmp-minis\acceptance_tips\acceptance-tips.html 
        # but some might be D:\tmp-minis\anxiety-tips\index.html if they were React builds
        
        folder_name = f"{concern}_tips"
        if concern in ["anxiety", "depression", "stress"]:
            folder_name = f"{concern}-tips" # Based on ls output
            
        src_path = os.path.join(source_dir, folder_name, filename)
        
        # fallback for index.html if specific filename not found
        if not os.path.exists(src_path):
            src_path = os.path.join(source_dir, folder_name, "index.html")
            
        # fallback for D:\tmp-minis\anxiety tips (with space)
        if not os.path.exists(src_path):
            src_path = os.path.join(r"D:\Downloads", f"{concern} tips", "index.html")

        target_dir = os.path.join(target_base, f"{concern}_tips")
        os.makedirs(target_dir, exist_ok=True)
        target_path = os.path.join(target_dir, "index.html")
        
        if os.path.exists(src_path):
            print(f"Copying {src_path} -> {target_path}")
            shutil.copy2(src_path, target_path)
        else:
            print(f"WARNING: Could not find source for {concern} tips at {src_path}")

if __name__ == "__main__":
    harvest_tips()
