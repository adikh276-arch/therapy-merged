import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const instance = i18n.createInstance();

instance
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    ns: ['translation'],
    defaultNS: 'translation',
    backend: {
      loadPath: '/therapy/locales/doodle_burst/{{lng}}.json',
    },
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['querystring', 'localStorage', 'navigator'],
      lookupQuerystring: 'lang',
      caches: ['localStorage'],
    }
  });

export default instance;

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
