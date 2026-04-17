import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        detection: {
            order: ['querystring', 'localStorage', 'navigator', 'htmlTag'],
            lookupQuerystring: 'lang',
            caches: ['localStorage'],
        },
        backend: {
            loadPath: "/therapy/stress-tips/locales/{{lng}}/translation.json",
        },
        interpolation: {
            escapeValue: false,
        },
        react: {
            useSuspense: false,
        },
    });

i18n.on('languageChanged', (lng) => {
    const dir = lng === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = lng;
});

export default i18n;
