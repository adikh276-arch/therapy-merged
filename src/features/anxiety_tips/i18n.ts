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
          "app_title": "Calm Your Anxiety",
          "app_subtitle": "Simple techniques to help you feel grounded and safe.",
          "slow_down": "Slow down 💙",
          "relief_tips": "Anxiety Relief Tips",
          "support_footer": "If anxiety feels overwhelming or persistent, consider speaking with a mental health professional.",
          "tip_seek_support": "Seek Support",
          "tip_seek_support_desc": "Talk to someone you trust to gain reassurance and perspective.",
          "tip_deep_breathing": "Deep Breathing",
          "tip_deep_breathing_desc": "Slow breathing can calm your nervous system quickly.",
          "tip_mindfulness": "Mindfulness",
          "tip_mindfulness_desc": "Focus on the present moment without judgment.",
          "tip_muscle_relaxation": "Progressive Muscle Relaxation",
          "tip_muscle_relaxation_desc": "Release physical tension to ease anxiety.",
          "tip_positive_self_talk": "Positive Self-Talk",
          "tip_positive_self_talk_desc": "Replace anxious thoughts with realistic, calming statements.",
          "why_it_helps": "Why It Helps",
          "what_you_can_do": "What You Can Do",
          "back": "Back",
          "example": "Example",
          "instead_of": "Instead of",
          "try": "Try",
          "breathing_why": "Anxiety activates the fight-or-flight response. Slow breathing signals safety to your brain and body.",
          "breathing_step1": "Inhale through your nose for 4 seconds",
          "breathing_step2": "Hold for 4 seconds",
          "breathing_step3": "Exhale slowly for 6 seconds",
          "breathing_step4": "Repeat for 1–2 minutes",
          "mindfulness_why": "Anxiety often focuses on future fears. Mindfulness brings your attention back to the present moment.",
          "mindfulness_step1": "Notice 5 things you can see",
          "mindfulness_step2": "Notice 4 things you can feel",
          "mindfulness_step3": "Notice 3 things you can hear",
          "mindfulness_step4": "Take one slow breath",
          "muscle_why": "Anxiety creates physical tension. Releasing muscles sends calming signals to your brain.",
          "muscle_step1": "Clench fists for 5 seconds",
          "muscle_step2": "Release slowly",
          "muscle_step3": "Shrug shoulders tightly",
          "muscle_step4": "Release",
          "muscle_step5": "Move from toes to head",
          "selftalk_why": "Anxious thoughts often exaggerate danger. Balanced thinking reduces fear intensity.",
          "selftalk_step1": "Identify the anxious thought",
          "selftalk_step2": "Ask: \"Is this 100% true?\"",
          "selftalk_step3": "Look for evidence",
          "selftalk_step4": "Replace it with a realistic statement",
          "selftalk_instead": "Something terrible will happen.",
          "selftalk_try": "I am safe right now.",
          "support_why": "Anxiety can make worries feel bigger than they are. Sharing them with someone trusted can reduce isolation and provide reassurance.",
          "support_step1": "Call or text a friend",
          "support_step2": "Share what's worrying you",
          "support_step3": "Ask for perspective",
          "support_step4": "Consider speaking with a counselor"
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
