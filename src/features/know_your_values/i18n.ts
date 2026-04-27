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
          "app": {
            "title": "Know What Matters to You",
            "description1": "Values are the principles that guide how we live, make decisions, and treat others. Understanding your values helps you focus on what truly matters in your life.",
            "description2": "In this short activity, you will explore the values that resonate most with you and reflect on how they show up in your daily life.",
            "startReflection": "Start Reflection →",
            "viewHistory": "View History",
            "chooseTitle": "Choose Values That Feel Important to You",
            "chooseDesc": "Select any values that resonate with you. There is no right or wrong choice.",
            "selectedValues": "Selected Values",
            "continue": "Continue →",
            "reflectTitle": "Reflect on One Value",
            "reflectDesc": "Choose one of the values you selected and think about how it appears in your daily life.",
            "reflectQuestion": "How does this value show up in your life?",
            "reflectPlaceholder": "I try to spend quality time with my parents every weekend.",
            "next": "Next →",
            "liveTitle": "Live This Value",
            "liveDesc": "Small actions help bring our values into everyday life.",
            "liveQuestion": "What is one small thing you can do this week to live this value?",
            "livePlaceholder": "Plan dinner with my family this weekend.",
            "saveReflection": "Save Reflection →",
            "summaryTitle": "Your Value Reflection",
            "reflectionLabel": "Reflection",
            "actionLabel": "Action",
            "quote": "\"Your values become your destiny.\"",
            "quoteAuthor": "Mahatma Gandhi",
            "finish": "Finish",
            "historyTitle": "Your Reflections",
            "historyDesc": "Your previous reflections are saved here so you can revisit them anytime.",
            "noHistory": "You haven't completed a values reflection yet.",
            "startActivity": "Start Activity",
            "startNew": "Start New Reflection"
          },
          "values": {
            "Family": "Family",
            "Health": "Health",
            "Creativity": "Creativity",
            "Learning": "Learning",
            "Adventure": "Adventure",
            "Freedom": "Freedom",
            "Growth": "Growth",
            "Kindness": "Kindness",
            "Balance": "Balance",
            "Honesty": "Honesty"
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
