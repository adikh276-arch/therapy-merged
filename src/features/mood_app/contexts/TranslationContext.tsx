import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from 'react';
import { translateBatch, getCached } from '@/services/translateService';

export const LANGUAGES = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'es', label: 'Spanish', short: 'ES' },
  { code: 'fr', label: 'French', short: 'FR' },
  { code: 'de', label: 'German', short: 'DE' },
  { code: 'hi', label: 'Hindi', short: 'HI' },
  { code: 'ta', label: 'Tamil', short: 'TA' },
  { code: 'te', label: 'Telugu', short: 'TE' },
  { code: 'kn', label: 'Kannada', short: 'KN' },
  { code: 'ml', label: 'Malayalam', short: 'ML' },
  { code: 'mr', label: 'Marathi', short: 'MR' },
];

interface TranslationContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (text: string) => string;
}

const TranslationContext = createContext<TranslationContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (text) => text,
});

export const useTranslation = () => useContext(TranslationContext);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLang] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang');
    const stored = sessionStorage.getItem('app_language');
    return urlLang || stored || 'en';
  });
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const pendingRef = useRef<Set<string>>(new Set());
  const timerRef = useRef<number | null>(null);

  const setLanguage = useCallback((lang: string) => {
    setLang(lang);
    sessionStorage.setItem('app_language', lang);
    setTranslations({});
  }, []);

  const flushPending = useCallback(async () => {
    if (language === 'en' || pendingRef.current.size === 0) return;
    const texts = Array.from(pendingRef.current);
    pendingRef.current.clear();
    const result = await translateBatch(texts, language);
    setTranslations((prev) => ({ ...prev, ...result }));
  }, [language]);

  const t = useCallback(
    (text: string): string => {
      if (!text) return text;
      if (language === 'en') return text;
      const cached = getCached(text, language);
      if (cached) return cached;
      if (translations[text]) return translations[text];
      pendingRef.current.add(text);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(flushPending, 80);
      return text;
    },
    [language, translations, flushPending]
  );

  useEffect(() => {
    setTranslations({});
    pendingRef.current.clear();
  }, [language]);

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
}
