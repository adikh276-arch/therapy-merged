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
          "app.title": "Gratitude Tracker",
          "app.description": "Track your daily gratitude and mood for better mental wellness",
          "gratitude.heading": "What are you grateful for today?",
          "gratitude.subheading": "Take a moment to reflect on the good things, big or small.",
          "gratitude.item1.label": "Gratitude Item 1",
          "gratitude.item1.placeholder": "e.g. A warm cup of tea this morning...",
          "gratitude.item2.label": "Gratitude Item 2",
          "gratitude.item2.placeholder": "e.g. A kind word from a friend...",
          "gratitude.optional": "(optional)",
          "common.continue": "Continue",
          "mood.heading": "How are you feeling?",
          "mood.subheading": "Select the mood that best describes you right now.",
          "mood.save": "Save Gratitude Entry",
          "mood.happy": "Happy",
          "mood.calm": "Calm",
          "mood.neutral": "Neutral",
          "mood.low": "Low",
          "mood.stressed": "Stressed",
          "review.heading": "Your Entry",
          "review.date": "Date",
          "review.gratitude1": "Gratitude 1",
          "review.gratitude2": "Gratitude 2",
          "review.mood": "Mood",
          "review.edit": "Edit Entry",
          "review.history": "View History",
          "history.heading": "History",
          "history.back": "Back",
          "history.home": "Go to Home",
          "history.sun": "Sun",
          "history.mon": "Mon",
          "history.tue": "Tue",
          "history.wed": "Wed",
          "history.thu": "Thu",
          "history.fri": "Fri",
          "history.sat": "Sat"
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
