import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Initialize i18next first
i18n
  .use(initReactI18next)
  .init({
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false 
    },
    resources: {} // will be loaded dynamically
  });

// Dynamically load the requested language
export const loadResource = async (lang: string) => {
    try {
        const res = await import(`./${lang}.json`);
        i18n.addResourceBundle(lang, 'translation', res.default);
    } catch (e) {
        console.error(`Could not load translations for ${lang}`, e);
    }
};

// Ensure english is loaded by default
loadResource('en');

export default i18n;
