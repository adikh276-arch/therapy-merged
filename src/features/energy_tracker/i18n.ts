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
          "app_title": "Energy Tracker",
          "very_low": "Very Low",
          "low": "Low",
          "okay": "Okay",
          "good": "Good",
          "high": "High",
          "how_is_energy": "How is your energy right now?",
          "continue": "Continue",
          "factors_title": "Contributors",
          "what_affected": "What affected your energy?",
          "optional": "Optional",
          "sleep": "Sleep",
          "work_study": "Work / Study",
          "stress": "Stress",
          "exercise": "Exercise",
          "socializing": "Socializing",
          "screen_time": "Screen Time",
          "health": "Health",
          "rest": "Rest",
          "mood": "Mood",
          "anxiety": "Anxiety",
          "add_note": "Add a note",
          "note_placeholder": "Describe briefly...",
          "save_checkin": "Save Check-in",
          "summary_title": "Today's Summary",
          "today_energy": "Today you're feeling {{label}}",
          "msg_very_low": "It's okay to feel drained. Listen to your body and prioritize rest.",
          "msg_low": "Take it slow. Maybe try a short break or some gentle stretching.",
          "msg_okay": "Steady as it goes. Keep monitoring your pace through the day.",
          "msg_good": "You're in a good spot! Use this momentum for your tasks.",
          "msg_high": "Brilliant! You've got great energy today. Make the most of it!",
          "breaks": "Take regular short breaks",
          "hydrated": "Stay well hydrated",
          "movement": "Short gentle movement",
          "view_weekly": "View Weekly Trends",
          "weekly_title": "Weekly Trend",
          "your_weekly": "Your Energy Flow",
          "no_entries": "Complete 3 check-ins to see your weekly trend.",
          "energy": "Energy",
          "insight": "Energy Insight",
          "insight_high": "Your energy has been consistently positive this week. It thrives on your current routine!",
          "insight_okay": "You've had a steady energy flow. Balancing work and rest seems to be working for you.",
          "insight_low": "Your energy has been on the lower side. Consider checking if you're getting enough rest or exercise.",
          "insight_more_data": "Continue tracking daily to see deeper patterns in your energy levels.",
          "go_home": "Back to Tracker"
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

export default instance;
