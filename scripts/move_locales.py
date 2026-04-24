import os
import shutil

root_dir = r"d:\Downloads\Therapy Merged"
features_dir = os.path.join(root_dir, "src", "features")
public_locales = os.path.join(root_dir, "public", "locales")

if not os.path.exists(public_locales):
    os.makedirs(public_locales)

for feature_name in os.listdir(features_dir):
    feat_locale_src = os.path.join(features_dir, feature_name, "locales")
    if os.path.exists(feat_locale_src):
        dest = os.path.join(public_locales, feature_name)
        if os.path.exists(dest):
            shutil.rmtree(dest)
        shutil.copytree(feat_locale_src, dest)
        print(f"Moved locales for {feature_name}")

print("All feature locales consolidated in public/locales/")
