import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const instance = i18n.createInstance();

instance
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: {
      en: {
        translation: {
          "app_title": "4-6-8 Breathing Exercise",
          "app_subtitle": "\"Slow your body. Settle your mind.\"",
          "intro_description": "This breathing technique helps calm your nervous system. Breathe in for 4 seconds, hold for 6 seconds, and exhale slowly for 8 seconds. Longer exhales signal safety to your body.",
          "begin_button": "Begin Exercise",
          "ready": "Ready",
          "inhale": "Inhale",
          "hold": "Hold",
          "exhale": "Exhale",
          "rounds_to_feel_shift": "Complete {{count}} rounds to feel the shift.",
          "round_x_of_y": "Round {{current}} of {{total}}",
          "rounds_selector": "{{count}} rounds",
          "resume": "Resume",
          "start": "Start",
          "pause": "Pause",
          "reset": "Reset",
          "you_did_it": "You did it.",
          "notice_body": "Notice your body.",
          "breath_slower": "Is your breath slower?",
          "chest_softer": "Is your chest softer?",
          "what_feels_different": "What feels different right now?",
          "reflection_placeholder": "Take a moment to reflect…",
          "finish": "Finish",
          "not_found_title": "404",
          "not_found_text": "Oops! Page not found",
          "return_home": "Return to Home"
        }
      }
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
  { code: 'en', name: 'English', label: 'English', nativeLabel: 'English' },
  { code: 'es', name: 'Spanish', label: 'Spanish', nativeLabel: 'Español' },
  { code: 'fr', name: 'French', label: 'French', nativeLabel: 'Français' },
  { code: 'de', name: 'German', label: 'German', nativeLabel: 'Deutsch' },
  { code: 'pt', name: 'Portuguese', label: 'Portuguese', nativeLabel: 'Português' },
  { code: 'hi', name: 'Hindi', label: 'Hindi', nativeLabel: 'हिन्दी' },
  { code: 'bn', name: 'Bengali', label: 'Bengali', nativeLabel: 'বাংলা' },
  { code: 'zh', name: 'Chinese', label: 'Chinese', nativeLabel: '中文' },
  { code: 'ja', name: 'Japanese', label: 'Japanese', nativeLabel: '日本語' },
  { code: 'ko', name: 'Korean', label: 'Korean', nativeLabel: '한국어' },
  { code: 'ru', name: 'Russian', label: 'Russian', nativeLabel: 'Русский' },
  { code: 'it', name: 'Italiano', label: 'Italiano', nativeLabel: 'Italiano' },
  { code: 'ar', name: 'Arabic', label: 'Arabic', nativeLabel: 'العربية' },
  { code: 'id', name: 'Indonesian', label: 'Indonesian', nativeLabel: 'Bahasa Indonesia' },
  { code: 'tr', name: 'Turkish', label: 'Turkish', nativeLabel: 'Türkçe' },
  { code: 'vi', name: 'Vietnamese', label: 'Vietnamese', nativeLabel: 'Tiếng Việt' },
  { code: 'pl', name: 'Polish', label: 'Polish', nativeLabel: 'Polski' },
  { code: 'th', name: 'Thai', label: 'Thai', nativeLabel: 'ไทย' },
  { code: 'tl', name: 'Tagalog', label: 'Tagalog', nativeLabel: 'Filipino' },
];
