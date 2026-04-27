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
          "notAlone": "You're not alone 💛",
          "supportForLowMood": "Support for Low Mood",
          "gentleSteps": "Gentle steps to help you move forward, one day at a time.",
          "dailySupportTips": "Daily Support Tips",
          "strugglingMessage": "If you're struggling deeply, consider reaching out to someone you trust or a mental health professional.",
          "tipNotFound": "Tip not found.",
          "back": "Back",
          "whyItHelps": "Why It Helps",
          "whatYouCanDo": "What You Can Do",
          "example": "Example",
          "insteadOf": "Instead of:",
          "try": "Try:",
          "t1_title": "Engage in Enjoyable Activities",
          "t1_preview": "Do small activities that bring even a tiny bit of comfort or interest.",
          "t1_why": "Depression reduces motivation and pleasure. Small enjoyable actions can slowly rebuild positive feelings and energy.",
          "t1_do1": "Listen to a favorite song",
          "t1_do2": "Take a short walk outside",
          "t1_do3": "Watch something light or funny",
          "t1_do4": "Try a hobby for 10 minutes",
          "t1_do5": "Text or call someone supportive",
          "t1_rem": "You don't need to feel motivated first. Action can come before motivation.",
          "t1_act": "Try One Small Thing Today",
          "t2_title": "Challenge Negative Thoughts",
          "t2_preview": "Notice harsh thoughts and gently replace them with balanced ones.",
          "t2_why": "Depression often creates automatic negative thoughts that feel true but may not be fully accurate.",
          "t2_do1": "Write down the negative thought",
          "t2_do2": "Ask: \"Is this 100% true?\"",
          "t2_do3": "Ask: \"What would I tell a friend?\"",
          "t2_do4": "Replace it with a kinder, balanced statement",
          "t2_ex_instead": "\"I always fail.\"",
          "t2_ex_try": "\"I didn't succeed this time, but I can try again.\"",
          "t2_act": "Reframe a Thought Now",
          "t3_title": "Set Realistic Goals",
          "t3_preview": "Break tasks into very small steps and focus on just one.",
          "t3_why": "Large tasks can feel overwhelming. Small goals build confidence and momentum.",
          "t3_do1": "Choose ONE small task",
          "t3_do2": "Break it into 2–3 mini steps",
          "t3_do3": "Do just the first step",
          "t3_do4": "Acknowledge completion",
          "t3_ex_instead": "\"Clean the whole room.\"",
          "t3_ex_try": "\"Make the bed.\"",
          "t3_act": "Pick One Small Goal",
          "t4_title": "Limit Stressors",
          "t4_preview": "Protect your energy by reducing overwhelming situations.",
          "t4_why": "When energy is low, too many stressors can worsen symptoms.",
          "t4_do1": "Say no to one non-essential task",
          "t4_do2": "Take a short break from social media",
          "t4_do3": "Spend quiet time alone",
          "t4_do4": "Reduce exposure to negative environments",
          "t4_rem": "Protecting your energy is not selfish — it's necessary.",
          "t4_act": "Set One Boundary Today",
          "t5_title": "Practice Self-Care",
          "t5_preview": "Take care of your basic physical and emotional needs.",
          "t5_why": "Sleep, hydration, nutrition, and sunlight strongly affect mood and brain chemistry.",
          "t5_do1": "Drink a glass of water",
          "t5_do2": "Eat something nourishing",
          "t5_do3": "Get 10 minutes of sunlight",
          "t5_do4": "Sleep at a regular time",
          "t5_do5": "Take a warm shower",
          "t5_rem": "Small physical care can create real emotional change.",
          "t5_act": "Do One Self-Care Act"
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
