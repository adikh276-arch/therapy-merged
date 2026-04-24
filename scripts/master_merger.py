import os
import shutil

# Source: D:\Downloads
# Target: Therapy Merged

base_download_dir = r"d:\Downloads"
target_features_dir = r"d:\Downloads\Therapy Merged\src\features"
target_locales_dir = r"d:\Downloads\Therapy Merged\public\locales"

def sanitize_name(path):
    name = os.path.basename(path)
    name = name.replace(" ", "_").replace("-", "_").lower()
    return name

apps_found = []

print("Starting scan...")

# Optimized walk: skip node_modules immediately
for root, dirs, files in os.walk(base_download_dir):
    # Prune dirs to avoid walking into node_modules or large dist folders
    dirs[:] = [d for d in dirs if d not in ["node_modules", ".git", "dist", ".gemini", "Therapy Merged"]]
    
    if "package.json" in files:
        src_path = os.path.join(root, "src")
        if os.path.exists(src_path):
            app_name = sanitize_name(root)
            apps_found.append({
                "name": app_name,
                "path": root,
                "src": src_path
            })

print(f"Found {len(apps_found)} potential applications.")

count = 0
for app in apps_found:
    feature_dest = os.path.join(target_features_dir, app["name"])
    
    if not os.path.exists(feature_dest):
        try:
            shutil.copytree(app["src"], feature_dest)
            count += 1
            print(f"Merged {app['name']}")
        except Exception as e:
            print(f"Failed to merge {app['name']}: {str(e)}")
    
    # Check for locales (support multiple patterns)
    locales_patterns = [
        os.path.join(app["path"], "public", "locales"),
        os.path.join(app["src"], "i18n", "locales"),
        os.path.join(app["src"], "locales")
    ]
    
    for lp in locales_patterns:
        if os.path.exists(lp):
            locales_dest = os.path.join(target_locales_dir, app["name"])
            try:
                shutil.copytree(lp, locales_dest, dirs_exist_ok=True)
                print(f"  Harvested locales for {app['name']}")
                break # Only use one source of locales
            except Exception as e:
                 print(f"  Failed local harvest for {app['name']}: {str(e)}")

print(f"Process complete. Total new apps merged: {count}")
