'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Use a global namespace so multiple features don't overwrite each other if they initialize separately,
// though in Next.js it's usually better to just have one.
if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      lng: "en",
      fallbackLng: "en",
      interpolation: {
        escapeValue: false 
      },
      resources: {}
    });
}

// Dynamically load the requested language
export const loadGlobalResource = async (lang: string) => {
    try {
        const res = await import(`./${lang}.json`);
        i18n.addResourceBundle(lang, 'translation', res.default, true, false);
    } catch (e) {
        console.error(`Could not load translations for ${lang}`, e);
    }
};

// Ensure english is loaded by default
loadGlobalResource('en');

export default i18n;
