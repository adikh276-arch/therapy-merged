import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        debug: false,
        interpolation: {
            escapeValue: false,
        },
        backend: {
            // Using absolute path with subpath for predictability in subpath hosting
            loadPath: '/daily_self_care_tracker/locales/{{lng}}/translation.json',
        },
        detection: {
            order: ['querystring', 'cookie', 'localStorage', 'navigator', 'path', 'subdomain'],
            lookupQuerystring: 'lang',
            caches: ['localStorage', 'cookie'],
        },
    });

export default i18n;
