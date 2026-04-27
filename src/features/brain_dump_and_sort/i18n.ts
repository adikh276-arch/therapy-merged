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
          "welcome_title": "Welcome to Brain Dump",
          "welcome_subtitle": "Clear Your Mind. Find Your Focus.",
          "welcome_desc": "Write down everything. No judgment. No sorting. Just release.",
          "start_dump": "Start Your Dump",
          "how_it_works": "How it works",
          "step_1": "1. Download your brain onto the digital page.",
          "step_2": "2. Sort into what needs action and what can wait.",
          "step_3": "3. Focus on just one small next step.",
          "dump_placeholder": "Just start writing...",
          "dump_hint": "Anything that's on your mind right now.",
          "finished": "I'm finished",
          "keep_going": "Keep going... what else?",
          "breathe": "Breathe in. Breathe out.",
          "sort_title": "Sort Your Thoughts",
          "sort_desc": "Drag and drop or click to move items.",
          "action_needed": "Action Needed",
          "action_desc": "Something I need to do soon.",
          "do_later": "Do Later",
          "later_desc": "Not urgent, but keep in mind.",
          "let_it_go": "Let It Go",
          "letgo_desc": "Not important or out of my control.",
          "continue": "Continue",
          "go_back": "Go Back",
          "small_step_title": "One Small Next Step",
          "small_step_desc": "Focus on just the first tiny thing for each action.",
          "first_step_placeholder": "What is the very first step?",
          "done": "Done",
          "reflection_title": "Reflection",
          "reflection_desc": "How do you feel now that you've sorted your brain?",
          "reflection_placeholder": "Write a brief reflection...",
          "finish_session": "Finish Session",
          "history": "History",
          "no_sessions": "No saved sessions yet.",
          "back_to_app": "Back to App",
          "delete_session": "Delete Session",
          "thoughts": "Thoughts",
          "reflection": "Reflection",
          "language": "Language"
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
