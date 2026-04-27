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
          "steps": [
            {
              "body": "Let's take a short pause together.\n\nFor the next minute, there's nothing you need to solve, fix, or respond to. Just allow yourself to slow down.\n\nSit comfortably, place your feet on the ground if you can, and gently take a slow breath in… and slowly breathe out.\n\nThis is your moment to reset and reconnect with the present.",
              "button": "Begin"
            },
            {
              "heading": "5 Things You Can See",
              "body": "Slowly look around you. Let your eyes move gently across the space. Notice colors, shapes, light, shadows, or small details you may not have paid attention to before.",
              "button": "Next"
            },
            {
              "heading": "4 Things You Can Feel",
              "body": "Bring your attention to your body. Feel your feet touching the floor, your back against the chair, your clothes on your skin, or the air around you. Acknowledge four physical sensations.",
              "button": "Next"
            },
            {
              "heading": "3 Things You Can Hear",
              "body": "Listen carefully. You might hear distant sounds, a fan, typing, breathing, or even silence. Identify three sounds without judging them.",
              "button": "Next"
            },
            {
              "heading": "2 Things You Can Smell",
              "body": "See if you can detect any scent in the room. If nothing stands out, simply notice the neutral smell of the air around you.",
              "button": "Next"
            },
            {
              "heading": "1 Thing You Can Taste",
              "body": "Pay attention to the taste in your mouth. It could be subtle or neutral — just observe it.",
              "button": "Next"
            },
            {
              "heading": "Reflection",
              "body": "Take one slow breath in… and gently breathe out.",
              "button": "Submit"
            }
          ],
          "common": {
            "thank_you": "Thank you",
            "you_feel": "You feel:",
            "completion_message": "You've completed the grounding exercise. Carry this sense of presence with you as you continue your day.",
            "start_again": "Start Again",
            "reflection_question": "In one word, how do you feel right now?",
            "reflection_placeholder": "e.g. calm, relieved, grounded…"
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
