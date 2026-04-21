import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

// Supported language codes
export const SUPPORTED_LANGUAGES: { code: string; label: string; nativeLabel: string }[] = [
    { code: "en", label: "English", nativeLabel: "English" },
    { code: "es", label: "Spanish", nativeLabel: "Español" },
    { code: "fr", label: "French", nativeLabel: "Français" },
    { code: "pt", label: "Portuguese", nativeLabel: "Português" },
    { code: "de", label: "German", nativeLabel: "Deutsch" },
    { code: "ar", label: "Arabic", nativeLabel: "العربية" },
    { code: "hi", label: "Hindi", nativeLabel: "हिन्दी" },
    { code: "bn", label: "Bengali", nativeLabel: "বাংলা" },
    { code: "zh-CN", label: "Chinese (Simplified)", nativeLabel: "简体中文" },
    { code: "ja", label: "Japanese", nativeLabel: "日本語" },
    { code: "id", label: "Indonesian", nativeLabel: "Bahasa Indonesia" },
    { code: "tr", label: "Turkish", nativeLabel: "Türkçe" },
    { code: "vi", label: "Vietnamese", nativeLabel: "Tiếng Việt" },
    { code: "ko", label: "Korean", nativeLabel: "한국어" },
    { code: "ru", label: "Russian", nativeLabel: "Русский" },
    { code: "it", label: "Italian", nativeLabel: "Italiano" },
    { code: "pl", label: "Polish", nativeLabel: "Polski" },
    { code: "th", label: "Thai", nativeLabel: "ไทย" },
    { code: "tl", label: "Filipino", nativeLabel: "Filipino" },
];

export const SUPPORTED_LANG_CODES = SUPPORTED_LANGUAGES.map((l) => l.code);

// Read ?lang=XX from the URL on startup
function getLangFromUrl(): string | null {
    const params = new URLSearchParams(window.location.search);
    const lang = params.get("lang");
    if (!lang) return null;
    // allow both "fr" and "FR"
    const lower = lang.toLowerCase();
    const match = SUPPORTED_LANG_CODES.find((code) => code.toLowerCase() === lower);
    return match || null;
}

const urlLang = getLangFromUrl();

i18n
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        lng: urlLang || undefined, // URL param wins; otherwise detector kicks in
        fallbackLng: "en",
        supportedLngs: SUPPORTED_LANG_CODES,
        ns: ["translation"],
        defaultNS: "translation",
        backend: {
            loadPath: "/depression_tips/locales/{{lng}}/translation.json",
        },
        detection: {
            order: ["querystring", "localStorage", "navigator"],
            lookupQuerystring: "lang",
            caches: ["localStorage"],
        },
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
