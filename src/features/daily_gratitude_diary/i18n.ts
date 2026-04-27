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
          "app_title": "Daily Gratitude Diary",
          "app_subtitle": "Noticing Small Good Things",
          "intro_text_1": "Gratitude does not mean ignoring difficult emotions.",
          "intro_text_2": "It simply means gently noticing moments - big or small - that feel steady, comforting, or meaningful.",
          "intro_text_3": "Some days it may be something very small.",
          "intro_text_italic": "That is enough.",
          "start_button": "Start Today's Entry",
          "grateful_title": "Today, I'm Grateful For...",
          "grateful_step_1": "Think about today.",
          "grateful_step_2": "What is one small thing you appreciate right now?",
          "grateful_step_3": "It can be something simple.",
          "placeholder_grateful": "Today, I'm grateful for...",
          "placeholder_reason": "This matters to me because... (optional)",
          "add_another": "Add Another",
          "continue": "Continue",
          "reflection_title": "Pause and Notice",
          "reflection_text": "When you focus on this moment, what do you notice in yourself?",
          "placeholder_feeling": "When I think about this, I feel...",
          "save_entry": "Save Entry",
          "closing_title": "You Took a Moment",
          "closing_text_1": "Taking time to reflect is an act of care.",
          "closing_text_2": "You can return to this space anytime.",
          "closing_italic": "Even small gratitude counts.",
          "view_past": "View Past Entries",
          "done": "Done",
          "past_entries_title": "Past Entries",
          "no_entries": "No entries yet. Start your first one today.",
          "feeling_label": "Feeling: ",
          "back": "Back",
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
