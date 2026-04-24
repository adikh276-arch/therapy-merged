import os
import shutil

features_dir = r"d:\Downloads\Therapy Merged\src\features"
locales_base = r"d:\Downloads\Therapy Merged\public\locales"

def sync_path(src, dst):
    if os.path.exists(dst):
        if os.path.isdir(dst):
            shutil.rmtree(dst)
        else:
            os.remove(dst)
    
    if os.path.isdir(src):
        shutil.copytree(src, dst)
    else:
        shutil.copy2(src, dst)

for feature_name in os.listdir(features_dir):
    f_root = os.path.join(features_dir, feature_name)
    if not os.path.isdir(f_root): continue
    
    src_locales = os.path.join(locales_base, feature_name)
    if os.path.exists(src_locales):
        possible_dirs = ['translations', 'locales']
        found_existing = False
        for d in possible_dirs:
            target_d = os.path.join(f_root, d)
            if os.path.exists(target_d):
                for f in os.listdir(src_locales):
                    sync_path(os.path.join(src_locales, f), os.path.join(target_d, f))
                print(f"Synced {d} for {feature_name}")
                found_existing = True
                break
        
        if not found_existing:
             target_d = os.path.join(f_root, 'translations')
             os.makedirs(target_d)
             for f in os.listdir(src_locales):
                 sync_path(os.path.join(src_locales, f), os.path.join(target_d, f))
             print(f"Created translations for {feature_name}")

print("Translation restoration complete.")
