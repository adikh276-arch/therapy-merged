import os
import re

src_dir = r"d:\Downloads\Therapy Merged\src"

for root, dirs, files in os.walk(src_dir):
    for fn in files:
        if fn.endswith((".ts", ".tsx", ".json")):
            file_path = os.path.join(root, fn)
            try:
                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read()
            except Exception:
                continue

            orig_content = content

            # Replace platform.mantracare.com/guided_imagery -> https://web.mantracare.com/mindfulness/media/203/1
            content = re.sub(r"https?://platform\.mantracare\.com/guided_imagery/?(\?lang=en)?", "https://web.mantracare.com/mindfulness/media/203/1", content)

            # Replace _myths and _posters that were missed
            # For lines like: url: "https://platform.mantracare.com/depression_myths/?lang=en"
            content = re.sub(r"https?://platform\.mantracare\.com/([a-z_]+)_(myths|posters)/?(\?lang=en)?", r"/concerns/\1/myths", content)
            
            # For OCD 
            content = re.sub(r"https?://platform\.mantracare\.com/ocd-tips/?", "/concerns/ocd/tips", content)
            content = re.sub(r"https?://platform\.mantracare\.com/ocd_management/?", "/concerns/ocd/articles", content)
            content = re.sub(r"https?://platform\.mantracare\.com/self_compassion/?", "/tools/affirmations", content)
            content = re.sub(r"https?://platform\.mantracare\.com/ocd_cycle/?", "/concerns/ocd/myths", content)
            content = re.sub(r"https?://platform\.mantracare\.com/reframing-thoughts/?", "/tools/thought-shifts", content)
            content = re.sub(r"https?://platform\.mantracare\.com/ocd_success_stories/?", "/concerns/ocd/stories", content)

            # Fix underscore to hyphens in concern names like eating_disorder -> eating-disorder
            content = re.sub(r"/concerns/eating_disorder/(myths|tips|articles|stories)", r"/concerns/eating-disorder/\1", content)

            if content != orig_content:
                with open(file_path, "w", encoding="utf-8") as f:
                    f.write(content)
print("Second pass complete")
