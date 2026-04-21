import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// List of supported languages for easy reference in the UI
export const SUPPORTED_LANGUAGES = [
    { code: 'en', name: 'English', region: 'Global Default' },
    { code: 'es', name: 'Español', region: 'Spain & Latin America' },
    { code: 'fr', name: 'Français', region: 'France, Canada, Africa' },
    { code: 'pt', name: 'Português', region: 'Brazil & Portugal' },
    { code: 'de', name: 'Deutsch', region: 'Germany, Austria, Switzerland' },
    { code: 'ar', name: 'العربية', region: 'MENA Region' },
    { code: 'hi', name: 'हिन्दी', region: 'India' },
    { code: 'bn', name: 'বাংলা', region: 'Bangladesh & India' },
    { code: 'zh-CN', name: '简体中文', region: 'Mainland China' },
    { code: 'ja', name: '日本語', region: 'Japan' },
    { code: 'id', name: 'Bahasa Indonesia', region: 'Indonesia' },
    { code: 'tr', name: 'Türkçe', region: 'Turkey' },
    { code: 'vi', name: 'Tiếng Việt', region: 'Vietnam' },
    { code: 'ko', name: '한국어', region: 'South Korea' },
    { code: 'ru', name: 'Русский', region: 'Russia & CIS' },
    { code: 'it', name: 'Italiano', region: 'Italy' },
    { code: 'pl', name: 'Polski', region: 'Central Europe' },
    { code: 'th', name: 'ไทย', region: 'Southeast Asia' },
    { code: 'tl', name: 'Filipino / Tagalog', region: 'Philippines' },
];

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        supportedLngs: SUPPORTED_LANGUAGES.map(l => l.code),
        debug: false,
        interpolation: {
            escapeValue: false, // React already safe from xss
        },
        detection: {
            order: ['querystring', 'localStorage', 'navigator'],
            lookupQuerystring: 'lang',
            caches: ['localStorage'],
        },
        backend: {
            loadPath: `${import.meta.env.BASE_URL}locales/{{lng}}/translation.json`,
        }
    });

export default i18n;
