import os
import re

# The standard SUPPORTED_LANGUAGES export that all features expect
LANGUAGES_EXPORT = """
export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', nativeLabel: 'English' },
  { code: 'es', name: 'Spanish', nativeLabel: 'Español' },
  { code: 'fr', name: 'French', nativeLabel: 'Français' },
  { code: 'pt', name: 'Portuguese', nativeLabel: 'Português' },
  { code: 'de', name: 'German', nativeLabel: 'Deutsch' },
  { code: 'ar', name: 'Arabic', nativeLabel: 'العربية' },
  { code: 'hi', name: 'Hindi', nativeLabel: 'हिन्दी' },
  { code: 'bn', name: 'Bengali', nativeLabel: 'বাংলা' },
  { code: 'zh', name: 'Chinese', nativeLabel: '简体中文' },
  { code: 'ja', name: 'Japanese', nativeLabel: '日本語' },
  { code: 'id', name: 'Indonesian', nativeLabel: 'Bahasa Indonesia' },
  { code: 'tr', name: 'Turkish', nativeLabel: 'Türkçe' },
  { code: 'vi', name: 'Vietnamese', nativeLabel: 'Tiếng Việt' },
  { code: 'ko', name: 'Korean', nativeLabel: '한국어' },
  { code: 'ru', name: 'Russian', nativeLabel: 'Русский' },
  { code: 'it', name: 'Italian', nativeLabel: 'Italiano' },
  { code: 'pl', name: 'Polish', nativeLabel: 'Polski' },
  { code: 'th', name: 'Thai', nativeLabel: 'ไทย' },
  { code: 'tl', name: 'Filipino', nativeLabel: 'Filipino' },
];
"""

def fix_i18n_exports():
    features_dir = r"D:\Downloads\Therapy Merged\src\features"
    features = [f for f in os.listdir(features_dir) if os.path.isdir(os.path.join(features_dir, f))]
    
    fixed = 0
    for feature in features:
        feature_path = os.path.join(features_dir, feature)
        i18n_ts = os.path.join(feature_path, "i18n.ts")
        
        if not os.path.exists(i18n_ts):
            continue
        
        with open(i18n_ts, "r", encoding="utf-8") as f:
            content = f.read()
        
        if "SUPPORTED_LANGUAGES" not in content:
            content += LANGUAGES_EXPORT
            with open(i18n_ts, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"  Added SUPPORTED_LANGUAGES to {feature}/i18n.ts")
            fixed += 1
        else:
            print(f"  Already has SUPPORTED_LANGUAGES: {feature}/i18n.ts")
    
    print(f"\nTotal fixed: {fixed}")

if __name__ == "__main__":
    fix_i18n_exports()
