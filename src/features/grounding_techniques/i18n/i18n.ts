import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Supported language codes (English + 19 languages)
export const SUPPORTED_LANGUAGES = [
    { code: "en", name: "English", nativeName: "English" },
    { code: "es", name: "Spanish", nativeName: "Español" },
    { code: "fr", name: "French", nativeName: "Français" },
    { code: "pt", name: "Portuguese", nativeName: "Português" },
    { code: "de", name: "German", nativeName: "Deutsch" },
    { code: "ar", name: "Arabic", nativeName: "العربية" },
    { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
    { code: "bn", name: "Bengali", nativeName: "বাংলা" },
    { code: "zh", name: "Chinese (Simplified)", nativeName: "简体中文" },
    { code: "ja", name: "Japanese", nativeName: "日本語" },
    { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia" },
    { code: "tr", name: "Turkish", nativeName: "Türkçe" },
    { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt" },
    { code: "ko", name: "Korean", nativeName: "한국어" },
    { code: "ru", name: "Russian", nativeName: "Русский" },
    { code: "it", name: "Italian", nativeName: "Italiano" },
    { code: "pl", name: "Polish", nativeName: "Polski" },
    { code: "th", name: "Thai", nativeName: "ไทย" },
    { code: "tl", name: "Filipino", nativeName: "Filipino" },
];

export const SUPPORTED_CODES = SUPPORTED_LANGUAGES.map((l) => l.code);

// Use Vite's import.meta.glob to eagerly bundle all translation JSONs
const modules = import.meta.glob("../locales/*/translation.json", { eager: true });

const resources: Record<string, { translation: Record<string, string> }> = {};

for (const path in modules) {
    // Extract language code from path like "../locales/es/translation.json"
    const match = path.match(/\.\.\/locales\/([^/]+)\/translation\.json/);
    if (match) {
        const langCode = match[1];
        resources[langCode] = { translation: (modules[path] as { default: Record<string, string> }).default };
    }
}

export const initI18n = async () => {
    // Detect lang from URL ?lang= param
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get("lang")?.toLowerCase();
    const detectedLang = urlLang && SUPPORTED_CODES.includes(urlLang) ? urlLang : "en";

    await i18n
        .use(initReactI18next)
        .init({
            resources,
            lng: detectedLang,
            fallbackLng: "en",
            supportedLngs: SUPPORTED_CODES,
            interpolation: {
                escapeValue: false,
            },
        });

    return i18n;
};

export default i18n;
