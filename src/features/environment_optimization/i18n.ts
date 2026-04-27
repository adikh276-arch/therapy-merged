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
          "app_title": "Environment Optimization Exercise",
          "step_1_of_3": "Step 1 of 3",
          "step_2_of_3": "Step 2 of 3",
          "step_3_of_3": "Step 3 of 3",
          "choose_space": "Choose one small space near you.",
          "not_whole_room": "Not the whole room — just one small area.",
          "one_corner_desk": "One corner of your desk",
          "bedside_table": "Bedside table",
          "one_chair": "One chair",
          "small_section_floor": "Small section of the floor",
          "small_is_enough": "Small is enough.",
          "start_5_min": "Start 5-Minute Exercise",
          "five_min_reset": "5-Minute Reset",
          "next_5_minutes": "For the next 5 minutes:",
          "remove_trash": "Remove trash",
          "put_away_items": "Put away items that belong elsewhere",
          "neatly_place_remains": "Neatly place what remains",
          "not_perfect": "Stop when the timer ends. It does not need to be perfect.",
          "chime_done": "Gentle chime when done",
          "sound_off": "Sound off",
          "im_done": "I'm Done — Continue",
          "pause_and_notice": "Pause and Notice",
          "look_again": "Look at the space again.",
          "feel_lighter": "Does it feel even slightly lighter?",
          "draining_item": "If one item still feels draining, move or remove just that one thing.",
          "slow_breath": "Take one slow breath.",
          "reduced_load": "You reduced mental load today.",
          "that_matters": "That matters.",
          "finish": "Finish",
          "not_found_title": "404 Error: Page Not Found",
          "not_found_text": "The page you are looking for does not exist.",
          "return_home": "Return to Home",
          "language_selector": "Select Language"
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
