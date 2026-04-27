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
          "title": "Self-Care Bingo",
          "description": "Nurture your mind, body, and soul with our interactive self-care activity.\nComplete activities to win and boost your mental wellness! 🧠✨",
          "how_to_play": "How to Play",
          "intro": "Our Self-Care Bingo card includes 25 activities designed to nurture your mind, body, and soul.",
          "step1_title": "Read",
          "step1_desc": "a tile, complete the activity.",
          "step2_title": "Click",
          "step2_desc": "a tile to mark it complete.",
          "step3_desc": "Each request is a small, yet powerful step toward better mental health 💙",
          "tips_title": "Tips for Success",
          "tip1_title": "Start Small",
          "tip1_desc": "Pick one or two tiles to begin the integration.",
          "tip2_title": "Be Routine",
          "tip2_desc": "Try to incorporate a few daily or weekly habits.",
          "tip3_title": "Celebrate Wins",
          "tip3_desc": "Acknowledge every tile you complete!",
          "tip4_title": "Make It Yours",
          "tip4_desc": "Modify activities to fit your lifestyle and preferences.",
          "lets_play": "Let's Play! 🎯",
          "instructions": "Click on each activity to complete it. Get a row, column, or diagonal to shout BINGO!",
          "progress_title": "📊 Your Progress",
          "progress_count": "{{count}} of 25 activities",
          "new_board": "New Board",
          "tiles": {
            "walk": "Take a 10-min walk",
            "water": "Drink 8 glasses of water",
            "friend": "Call a friend",
            "gratitudes": "Write 3 gratitudes",
            "nap": "Take a power nap",
            "stretch": "Stretch for 5 min",
            "cook": "Cook a healthy meal",
            "music": "Listen to calming music",
            "breathing": "Practice deep breathing",
            "read": "Read for 20 min",
            "bath": "Take a bubble bath",
            "journal": "Journal your feelings",
            "free_space": "FREE SPACE",
            "declutter": "Declutter a space",
            "recipe": "Try a new recipe",
            "meditation": "Try meditation",
            "mask": "Do a face mask",
            "unplug": "Unplug for 1 hour",
            "compliment": "Compliment someone",
            "sunset": "Watch a sunset",
            "smile": "Smile at a stranger",
            "kindness": "Do a random act of kindness",
            "sleep": "Go to bed early",
            "yoga": "Try yoga",
            "dance": "Dance to a song"
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
