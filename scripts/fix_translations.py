import os
import re

def fix_translations():
    features_dir = r"D:\Downloads\Therapy Merged\src\features"
    locales_dir = r"D:\Downloads\Therapy Merged\public\locales"
    
    # Get all features
    features = [f for f in os.listdir(features_dir) if os.path.isdir(os.path.join(features_dir, f))]
    
    for feature in features:
        feature_path = os.path.join(features_dir, feature)
        index_tsx = os.path.join(feature_path, "index.tsx")
        i18n_ts = os.path.join(feature_path, "i18n.ts")
        
        if not os.path.exists(index_tsx):
            continue
            
        print(f"Processing feature: {feature}")
        
        # 1. Create/Overwrite i18n.ts
        # We use a template that loads from /therapy/locales/feature_name/{{lng}}.json
        i18n_content = f"""import i18n from 'i18next';
import {{ initReactI18next }} from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const instance = i18n.createInstance();

instance
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({{
    fallbackLng: 'en',
    ns: ['translation'],
    defaultNS: 'translation',
    backend: {{
      loadPath: '/therapy/locales/{feature}/{{{{lng}}}}.json',
    }},
    interpolation: {{
      escapeValue: false,
    }},
    detection: {{
      order: ['querystring', 'localStorage', 'navigator'],
      lookupQuerystring: 'lang',
      caches: ['localStorage'],
    }}
  }});

export default instance;
"""
        with open(i18n_ts, "w", encoding="utf-8") as f:
            f.write(i18n_content)
            
        # 2. Update index.tsx to import i18n and wrap in I18nextProvider
        with open(index_tsx, "r", encoding="utf-8") as f:
            content = f.read()
            
        # Add imports if missing
        if "import './i18n'" not in content:
            content = "import './i18n';\nimport { I18nextProvider } from 'react-i18next';\nimport i18n from './i18n';\n" + content
            
        # Add index.css import if it exists
        if os.path.exists(os.path.join(feature_path, "index.css")) and "import './index.css'" not in content:
            content = "import './index.css';\n" + content
            
        # Wrap the component in I18nextProvider
        # We look for the main App component and wrap its content
        if "<I18nextProvider" not in content:
            # find the opening <TooltipProvider> or similar and wrap inside it
            # or just wrap the whole thing inside the first provider
            patterns = [
                (r'(<TooltipProvider[^>]*>)', r'\1\n      <I18nextProvider i18n={i18n}>'),
                (r'(</TooltipProvider>)', r'      </I18nextProvider>\n    \1')
            ]
            for pattern, subst in patterns:
                content = re.sub(pattern, subst, content)
                
        with open(index_tsx, "w", encoding="utf-8") as f:
            f.write(content)

if __name__ == "__main__":
    fix_translations()
