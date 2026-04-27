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
          "title": "Physical Activity Log",
          "badge": "Physical Activity Test",
          "hero_title_1": "Move Your Body,",
          "hero_title_2": "Transform Your Mind",
          "hero_subtitle": "Discover how exercise can upgrade your brain's operating system and build a lasting habit for better mental health.",
          "track_title": "Track Your Activity",
          "track_subtitle": "Log your daily activities and monitor your progress over time.",
          "activity_log": "Activity Log",
          "pick_date": "Pick a date",
          "activity_placeholder": "Activity (e.g. Run)",
          "duration_placeholder": "Duration (min)",
          "notes_placeholder": "Notes (optional)",
          "save_activity": "Save Activity",
          "progress_summary": "Progress Summary",
          "this_week": "This Week",
          "this_month": "This Month",
          "most_frequent": "Most Frequent",
          "longest_session": "Longest Session",
          "current_streak": "Current Streak",
          "day": "day",
          "days": "days",
          "last_7_days": "Last 7 Days",
          "weekly_trend": "Weekly Trend",
          "activity_history": "Activity History",
          "daily": "daily",
          "weekly": "weekly",
          "monthly": "monthly",
          "filter_by_date": "Filter by date",
          "clear_filter": "Clear filter",
          "no_activities": "No activities logged yet. Start tracking above!",
          "save": "Save",
          "cancel": "Cancel",
          "daily_total": "Daily Total",
          "minutes": "minutes",
          "benefits_title": "What Happens When You Exercise?",
          "benefits_subtitle": "When you get your heart pumping, your brain makes some amazing changes. Think of it like upgrading your brain's operating system.",
          "benefits_intro": "Right away, your body releases natural mood boosters:",
          "endorphins_title": "Endorphins",
          "endorphins_desc": "Helps reduce pain and boosts mood.",
          "serotonin_title": "Serotonin",
          "serotonin_desc": "Improves emotional balance and promotes calm.",
          "dopamine_title": "Dopamine",
          "dopamine_desc": "Enhances motivation, focus, and reward.",
          "benefits_callout": "Just 15 minutes of running can cut your risk of depression by 26%.",
          "benefits_more": "That's not all — there's even more happening behind the scenes:",
          "memory_title": "Memory & Learning",
          "memory_desc": "Exercise increases blood flow to the brain, helping improve memory and cognitive function.",
          "stress_title": "Stress Response",
          "stress_desc": "Physical activity lowers stress hormones and helps your nervous system reset.",
          "app_name": "Physical Activity Log"
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
