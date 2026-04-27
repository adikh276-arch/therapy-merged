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
          "Grounding": "Grounding",
          "Grounding techniques help bring your attention back to the present moment.": "Grounding techniques help bring your attention back to the present moment.",
          "Choose one activity that feels supportive right now.": "Choose one activity that feels supportive right now.",
          "Step": "Step",
          "Back": "Back",
          "Next": "Next",
          "I Feel More Grounded": "I Feel More Grounded",
          "Choose Another Technique": "Choose Another Technique",
          "Technique not found": "Technique not found",
          "Put your hands in water": "Put your hands in water",
          "Pick up or touch items near you": "Pick up or touch items near you",
          "Breathe deeply": "Breathe deeply",
          "Savour your food": "Savour your food",
          "Savour a drink": "Savour a drink",
          "Take a short walk": "Take a short walk",
          "Hold a piece of ice": "Hold a piece of ice",
          "Savour a scent": "Savour a scent",
          "Move your body": "Move your body",
          "Listen to your surroundings": "Listen to your surroundings",
          "Check in with your body": "Check in with your body",
          "Run your hands under cool or warm water.": "Run your hands under cool or warm water.",
          "Notice the temperature.": "Notice the temperature.",
          "Pay attention to the sensation on your skin.": "Pay attention to the sensation on your skin.",
          "Observe how it changes moment by moment.": "Observe how it changes moment by moment.",
          "Let your breathing slow naturally.": "Let your breathing slow naturally.",
          "Choose a nearby object.": "Choose a nearby object.",
          "Notice its texture, weight, and temperature.": "Notice its texture, weight, and temperature.",
          "Is it smooth or rough? Heavy or light?": "Is it smooth or rough? Heavy or light?",
          "Let your focus stay fully on this one object.": "Let your focus stay fully on this one object.",
          "Take a slow breath in through your nose.": "Take a slow breath in through your nose.",
          "Hold gently for a moment.": "Hold gently for a moment.",
          "Exhale slowly through your mouth.": "Exhale slowly through your mouth.",
          "Repeat several times.": "Repeat several times.",
          "Let your shoulders soften.": "Let your shoulders soften.",
          "Take a small bite.": "Take a small bite.",
          "Chew slowly.": "Chew slowly.",
          "Notice the flavor, texture, and temperature.": "Notice the flavor, texture, and temperature.",
          "Stay fully present with the experience.": "Stay fully present with the experience.",
          "Take a slow sip.": "Take a slow sip.",
          "Notice the temperature and taste.": "Notice the temperature and taste.",
          "Feel the sensation as you swallow.": "Feel the sensation as you swallow.",
          "Let yourself stay with that moment.": "Let yourself stay with that moment.",
          "Walk slowly and intentionally.": "Walk slowly and intentionally.",
          "Notice the feeling of your feet touching the ground.": "Notice the feeling of your feet touching the ground.",
          "Observe your surroundings without judgment.": "Observe your surroundings without judgment.",
          "Let your breath match your steps.": "Let your breath match your steps.",
          "Hold the ice in your hand.": "Hold the ice in your hand.",
          "Notice the cold sensation.": "Notice the cold sensation.",
          "Focus fully on the feeling.": "Focus fully on the feeling.",
          "Allow the strong sensation to anchor you to the present.": "Allow the strong sensation to anchor you to the present.",
          "Choose a scent nearby.": "Choose a scent nearby.",
          "Inhale slowly.": "Inhale slowly.",
          "Notice how it feels in your body.": "Notice how it feels in your body.",
          "Let the scent bring you into this moment.": "Let the scent bring you into this moment.",
          "Stretch gently.": "Stretch gently.",
          "Roll your shoulders.": "Roll your shoulders.",
          "Shift your weight from side to side.": "Shift your weight from side to side.",
          "Notice how your body feels as it moves.": "Notice how your body feels as it moves.",
          "Pause and listen.": "Pause and listen.",
          "Identify three distinct sounds.": "Identify three distinct sounds.",
          "Are they near or far?": "Are they near or far?",
          "Let your attention rest on each one.": "Let your attention rest on each one.",
          "Close your eyes if comfortable.": "Close your eyes if comfortable.",
          "Scan from head to toe.": "Scan from head to toe.",
          "Notice areas of tension or ease.": "Notice areas of tension or ease.",
          "Breathe into any tightness.": "Breathe into any tightness."
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
