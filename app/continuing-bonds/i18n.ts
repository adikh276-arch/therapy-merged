
'use client';

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

const i18n = i18next.createInstance();

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  resources: {},
});

export const loadLocale = async (lang: string) => {
  try {
    const res = await import(`./i18n/${lang}.json`);
    i18n.addResourceBundle(lang, 'translation', res.default, true, false);
    await i18n.changeLanguage(lang);
  } catch {
    // fallback to en
  }
};

loadLocale('en');

export default i18n;
