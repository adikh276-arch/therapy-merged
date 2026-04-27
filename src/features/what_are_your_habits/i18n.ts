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
          "title": "What Are Your Habits?",
          "intro_description": "Small daily habits influence stress. Let's explore yours gently.",
          "start_activity": "Start Activity",
          "body_title": "🧍‍♀️ Your Daily Body Routine",
          "body_subtitle": "Which of these has felt a little off lately? (Select any that apply)",
          "continue": "Continue",
          "body_options": [
            "I haven't been sleeping well",
            "My sleep timing is irregular",
            "I sometimes skip meals",
            "I eat more than usual when stressed",
            "I haven't been moving or exercising much",
            "I haven't been going outside much",
            "My personal care routine has changed",
            "My daily routine feels steady"
          ],
          "mind_title": "🧠 Your Thought Patterns",
          "mind_options": [
            "I keep overthinking things",
            "I often imagine the worst-case scenario",
            "I'm harsh on myself",
            "I feel guilty about things I've done or didn't do",
            "I'm constantly worrying",
            "I find it hard to relax",
            "My thoughts feel manageable"
          ],
          "coping_title": "🌊 How You Respond to Stress",
          "coping_options": [
            "I avoid tasks when I'm stressed",
            "I scroll on my phone a lot to distract myself",
            "I spend time alone to cope",
            "I throw myself into work when stressed",
            "I talk to someone about how I feel",
            "I do breathing exercises to calm down",
            "I watch TV or play games to distract myself",
            "I'm not sure how I respond to stress"
          ],
          "reflection_title": "✍️ Reflection",
          "question_stress": "Which habit increases your stress later?",
          "question_calm": "Which one habit could help you feel calmer?",
          "see_insight": "See My Insight",
          "insight_title": "Suggested Actions",
          "insight_description": "Tap below to see simple habits that can help reduce stress.",
          "show_suggestions": "Show Suggestions",
          "commit": "Commit",
          "suggestions": [
            "Try going to bed a little earlier tonight",
            "Step outside for fresh air today",
            "Take a break from scrolling for a while",
            "Speak kindly to yourself",
            "Finish one task you've been putting off"
          ],
          "final_text": "Small changes matter. Consistency creates calm.",
          "finish": "Finish"
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
