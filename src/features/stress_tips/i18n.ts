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
          "index": {
            "tagline": "Take a deep breath 🌿",
            "title": "Manage Your Stress",
            "description": "Simple daily habits to help you feel calmer and more in control.",
            "sectionTitle": "Daily Stress Relief Tips"
          },
          "tip": {
            "sleep": {
              "title": "Get Restful Sleep",
              "description": "Aim for 7–9 hours of sleep each night. Try to sleep and wake up at the same time daily.",
              "why": "Sleep helps your brain and body recover and lowers stress hormones.",
              "do": [
                "Keep a fixed sleep schedule",
                "Avoid screens 1 hour before bed",
                "Keep room cool and dark",
                "Avoid caffeine after 4 PM"
              ],
              "button": "Set Sleep Reminder"
            },
            "breathing": {
              "title": "Practice Deep Breathing",
              "description": "Spend a few minutes focusing on your breath. Slow breathing reduces anxiety.",
              "why": "Slow breathing activates your body's relaxation response.",
              "do": [
                "Inhale for 4 seconds",
                "Hold for 4 seconds",
                "Exhale for 4 seconds",
                "Repeat for 1 minute"
              ]
            },
            "exercise": {
              "title": "Move Your Body",
              "description": "Light walking or stretching helps release stress and improve mood.",
              "why": "Exercise releases endorphins and improves mood.",
              "do": [
                "15-minute walk",
                "Light stretching",
                "Short yoga session",
                "Quick home workout"
              ]
            },
            "caffeine": {
              "title": "Limit Caffeine & Sugar",
              "description": "Too much caffeine and sugar can increase anxiety and disturb sleep.",
              "why": "Too much caffeine and sugar increases anxiety and sleep problems.",
              "do": [
                "Replace one coffee with herbal tea",
                "Drink more water",
                "Reduce sugary snacks",
                "Avoid caffeine late in the day"
              ]
            },
            "planning": {
              "title": "Plan Your Day",
              "description": "Break large tasks into smaller steps to avoid feeling overwhelmed.",
              "why": "Planning reduces mental clutter and overwhelm.",
              "do": [
                "Write 3 main tasks",
                "Break tasks into small steps",
                "Focus on one task at a time",
                "Take short breaks"
              ]
            }
          },
          "detail": {
            "back": "Back",
            "notFound": "Tip not found.",
            "whyTitle": "Why It Helps",
            "doTitle": "What You Can Do",
            "reminderSet": "Reminder set! 🌙"
          },
          "notFound": {
            "title": "404",
            "message": "Oops! Page not found",
            "return": "Return to Home"
          },
          "mood": {
            "title": "How are you feeling today?",
            "great": "Great",
            "okay": "Okay",
            "stressed": "Stressed",
            "overwhelmed": "Overwhelmed"
          },
          "breathing": {
            "inhale": "Inhale…",
            "hold": "Hold…",
            "exhale": "Exhale…",
            "pause": "Pause",
            "resume": "Resume"
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
