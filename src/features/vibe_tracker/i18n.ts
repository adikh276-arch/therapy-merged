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
          "vibeTracker": "Vibe Tracker",
          "howAreYouFeeling": "How are you feeling in this moment?",
          "describeOwnVibe": "Or describe your own vibe",
          "rightNowIFeel": "Right now, I feel…",
          "saveVibe": "Save Vibe",
          "pauseAndReflect": "Pause & Reflect",
          "typeThoughts": "Type your thoughts here…",
          "submitReflection": "Submit Reflection",
          "next": "Next",
          "vibeLogged": "Vibe logged",
          "thankYou": "Thank you for pausing and noticing. Even this small check-in matters.",
          "done": "Done",
          "today": "Today",
          "yesterday": "Yesterday",
          "viewHistory": "View History",
          "history": "History",
          "yourJourney": "Your Journey",
          "noVibes": "No vibes logged yet",
          "startFirstCheckIn": "Start your first check-in to see your journey unfold here.",
          "vibes": {
            "Calm": "Calm",
            "Light": "Light",
            "Driven": "Driven",
            "Content": "Content",
            "Steady": "Steady",
            "Tender": "Tender",
            "Heavy": "Heavy",
            "Thoughtful": "Thoughtful",
            "Restless": "Restless",
            "Drained": "Drained"
          },
          "prompts": {
            "needing": "What might you be needing right now?",
            "happened": "What happened before this feeling showed up?",
            "speak": "If this emotion could speak, what would it say?",
            "notice": "Where do you notice this feeling in your body?",
            "sitOrShift": "Is this something you want to sit with or shift gently?",
            "ease": "What would bring you even 10% more ease?",
            "kindness": "What small kindness could you offer yourself today?",
            "supported": "What would help you feel supported in this moment?"
          }
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
