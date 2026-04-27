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
          "app_title": "Doodle Burst",
          "intro_subtitle": "Let your brain wiggle for a minute.",
          "intro_reason": "Sometimes your brain just needs to move.",
          "intro_benefit": "Quick doodles can help release restlessness and reset your focus.",
          "start_doodling": "Start Doodling",
          "view_past_doodles": "View Past Doodles",
          "prompt_1": "Go wild! Doodle anything. 🎨",
          "prompt_2": "Try filling the space with fun patterns. 🌀",
          "prompt_3": "Slow down and draw a calm spiral. 🍥",
          "activity_instructions": "Draw anything you want. Try circles, zigzags, spirals, dots, or silly shapes. There are no rules — just keep your hand moving.",
          "end_title": "Nice doodling! ✨",
          "end_saved": "Your doodle has been saved! 📒",
          "end_reset": "Even a quick doodle can help your brain reset.",
          "checkin_brain": "Does your brain feel lighter?",
          "checkin_calmer": "Do you feel a little calmer?",
          "checkin_task": "Ready to get back to your task?",
          "back_to_focus": "Back to Focus",
          "view_history": "View History",
          "history_title": "Doodle History",
          "no_doodles": "No doodles yet!",
          "history_empty_desc": "Complete a Doodle Burst session and your artwork will be saved here automatically.",
          "today": "Today",
          "yesterday": "Yesterday",
          "delete_doodle": "Delete Doodle",
          "doodle": "doodle",
          "doodles": "doodles",
          "saved": "saved",
          "tool_pen": "Pen",
          "tool_undo": "Undo",
          "tool_clear": "Clear",
          "share_doodle": "Share Doodle",
          "share_text": "I loved this doodle burst activity at TherapyMantra, you can try too just download the app to explore for yourself\n\nAndroid: https://play.google.com/store/apps/details?id=org.mantracare.therapy&hl=en_IN\niOS: https://apps.apple.com/us/app/therapymantra/id1607643888"
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
