import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';

const loadResource = async (language: string, namespace: string) => {
  if (namespace !== 'common') return {};
  switch (language) {
    case 'en': return import('../locales/en/common.json');
    case 'ar': return import('../locales/ar/common.json');
    case 'bn': return import('../locales/bn/common.json');
    case 'zh': return import('../locales/zh/common.json');
    case 'nl': return import('../locales/nl/common.json');
    case 'fr': return import('../locales/fr/common.json');
    case 'de': return import('../locales/de/common.json');
    case 'hi': return import('../locales/hi/common.json');
    case 'id': return import('../locales/id/common.json');
    case 'it': return import('../locales/it/common.json');
    case 'ja': return import('../locales/ja/common.json');
    case 'ko': return import('../locales/ko/common.json');
    case 'pl': return import('../locales/pl/common.json');
    case 'pt': return import('../locales/pt/common.json');
    case 'ru': return import('../locales/ru/common.json');
    case 'es': return import('../locales/es/common.json');
    case 'tl': return import('../locales/tl/common.json');
    case 'th': return import('../locales/th/common.json');
    case 'tr': return import('../locales/tr/common.json');
    case 'vi': return import('../locales/vi/common.json');
    default: return {};
  }
};

i18n
  .use(resourcesToBackend((language: string, namespace: string) => loadResource(language, namespace)))
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'ar', 'bn', 'zh', 'nl', 'fr', 'de', 'hi', 'id', 'it', 'ja', 'ko', 'pl', 'pt', 'ru', 'es', 'tl', 'th', 'tr', 'vi'],
    ns: ['common'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'path'],
      lookupQuerystring: 'lng',
      caches: ['localStorage', 'cookie'],
    },
    react: {
      useSuspense: false // Handle loading manually in I18nProvider
    }
  });

export default i18n;
