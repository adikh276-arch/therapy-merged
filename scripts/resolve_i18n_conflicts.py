import os
import shutil

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

def resolve_i18n_conflicts():
    features_dir = r"D:\Downloads\Therapy Merged\src\features"
    features = [f for f in os.listdir(features_dir) if os.path.isdir(os.path.join(features_dir, f))]
    
    for feature in features:
        feature_path = os.path.join(features_dir, feature)
        i18n_ts  = os.path.join(feature_path, "i18n.ts")
        i18n_dir_index = os.path.join(feature_path, "i18n", "index.ts")
        
        if os.path.exists(i18n_dir_index) and os.path.exists(i18n_ts):
            # Both exist: our generated i18n.ts shadows i18n/index.ts.
            # Remove generated i18n.ts and add SUPPORTED_LANGUAGES to i18n/index.ts
            os.remove(i18n_ts)
            print(f"Removed generated i18n.ts from {feature}")
            
            with open(i18n_dir_index, "r", encoding="utf-8") as f:
                content = f.read()
            
            if "SUPPORTED_LANGUAGES" not in content:
                content += LANGUAGES_EXPORT
                with open(i18n_dir_index, "w", encoding="utf-8") as f:
                    f.write(content)
                print(f"  Added SUPPORTED_LANGUAGES to {feature}/i18n/index.ts")
        
        elif os.path.exists(i18n_ts) and not os.path.exists(i18n_dir_index):
            # Only our generated i18n.ts exists - ensure it has SUPPORTED_LANGUAGES
            with open(i18n_ts, "r", encoding="utf-8") as f:
                content = f.read()
            
            if "SUPPORTED_LANGUAGES" not in content:
                content += LANGUAGES_EXPORT
                with open(i18n_ts, "w", encoding="utf-8") as f:
                    f.write(content)
                print(f"  Added SUPPORTED_LANGUAGES to {feature}/i18n.ts")
            else:
                print(f"  OK: {feature}/i18n.ts already has SUPPORTED_LANGUAGES")
        
        # Now fix index.tsx: ensure 'import ./i18n' is present
        index_tsx = os.path.join(feature_path, "index.tsx")
        if os.path.exists(index_tsx):
            with open(index_tsx, "r", encoding="utf-8") as f:
                idx_content = f.read()
            
            # Fix: after removing i18n.ts, 'import ./i18n' resolves to i18n/index.ts — good.
            # But we need to also strip the I18nextProvider wrapping we added if it's causing issues
            # (features that have i18n/index.ts initialize i18n as a side effect on import,
            # they don't return an instance to pass to I18nextProvider)
            if "<I18nextProvider" in idx_content and os.path.exists(i18n_dir_index):
                # These features use global i18n, not instance — remove I18nextProvider
                idx_content = idx_content.replace(
                    "import { I18nextProvider } from 'react-i18next';\n", ""
                )
                idx_content = idx_content.replace(
                    "import i18n from './i18n';\n", ""
                )
                idx_content = idx_content.replace(
                    "\n      <I18nextProvider i18n={i18n}>", ""
                )
                idx_content = idx_content.replace(
                    "      </I18nextProvider>\n    ", ""
                )
                with open(index_tsx, "w", encoding="utf-8") as f:
                    f.write(idx_content)
                print(f"  Stripped I18nextProvider from {feature}/index.tsx (uses global i18n)")

if __name__ == "__main__":
    resolve_i18n_conflicts()
