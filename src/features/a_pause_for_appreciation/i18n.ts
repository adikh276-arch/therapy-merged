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
          "title": "A Pause for Appreciation",
          "subtitle": "A 5–7 Minute Guided Reflection",
          "nav": {
            "history": "History",
            "home": "Home"
          },
          "intro": {
            "text1": "When a relationship feels strained, it can become easy to focus only on what is not working. This reflection offers a brief pause — not to dismiss concerns, but to gently broaden perspective.",
            "text2": "There is no expectation to feel grateful. Simply notice what comes up.",
            "begin": "Begin",
            "viewHistory": "View History"
          },
          "breathing": {
            "title": "Arrive and Settle",
            "description": "Before continuing, allow yourself a brief pause. This moment is not about solving anything. It is about creating space.",
            "instruction": "Follow the breathing rhythm below.",
            "inhale": "Inhale… {{counter}}…",
            "hold": "Hold…",
            "exhale": "Exhale… {{counter}}…",
            "affirmation": "\"I can acknowledge what feels difficult and still remain open to noticing.\"",
            "continue": "Continue"
          },
          "reflection": {
            "step": "Step {{step}} of {{total}}",
            "prompts": {
              "p1": "One small moment recently with your partner that did not feel tense was…",
              "p1_ex": "\"We had a brief, calm conversation in the evening.\"",
              "p2": "One effort your partner has made — even if imperfect — is…",
              "p2_ex": "\"They attempted to explain their feelings instead of withdrawing.\"",
              "p3": "One quality in your partner that has remained consistent over time is…",
              "p3_ex": "\"They continue to show dedication toward our responsibilities.\""
            },
            "placeholder": "Write your reflection here…",
            "next": "Next",
            "finish": "Finish"
          },
          "intention": {
            "step": "Step 4 of 4",
            "title": "How would you like to hold this reflection?",
            "options": {
              "private": "I would prefer to keep this reflection private.",
              "share_part": "I may choose to share part of this with my partner.",
              "share_full": "I would like to share this reflection fully.",
              "save_later": "I will save this for a later conversation."
            },
            "continue": "Continue"
          },
          "checkin": {
            "title": "As you completed this reflection, which statement feels most accurate?",
            "statements": {
              "s1": "I feel slightly more open toward my partner right now.",
              "s2": "I do not notice much change, but I am willing to stay aware.",
              "s3": "I found this somewhat difficult to complete.",
              "s4": "I experienced a small sense of warmth during reflection.",
              "s5": "I noticed resistance, and that feels important to acknowledge.",
              "s6": "I feel a subtle softening compared to before I began."
            },
            "finish": "Finish & Save"
          },
          "closing": {
            "title": "Reflection Complete",
            "text1": "This pause does not erase challenges. It simply restores balance in how the relationship is viewed.",
            "text2": "Even brief moments of noticing can gradually soften emotional rigidity and create space for healthier conversations.",
            "save": "Save to Reflections",
            "viewHistory": "View History",
            "exit": "Exit"
          },
          "history": {
            "title": "Your Reflection History",
            "noReflections": "No reflections saved yet. Your completed sessions will appear here.",
            "back": "Back to Start",
            "confirmDelete": "Confirm Delete",
            "cancel": "Cancel",
            "delete": "Delete entry",
            "prompts": [
              "One small moment that did not feel tense…",
              "One effort your partner has made…",
              "One quality that has remained consistent…",
              "Intention",
              "Emotional Check-In"
            ]
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
