import { useState, useEffect, useCallback, useRef } from 'react';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Spanish' },
  { code: 'fr', label: 'French' },
  { code: 'de', label: 'German' },
  { code: 'hi', label: 'Hindi' },
  { code: 'ta', label: 'Tamil' },
  { code: 'te', label: 'Telugu' },
  { code: 'kn', label: 'Kannada' },
  { code: 'ml', label: 'Malayalam' },
  { code: 'mr', label: 'Marathi' },
] as const;

export type LangCode = typeof LANGUAGES[number]['code'];

const cache = new Map<string, string>();

export function useTranslation() {
  const [lang, setLangState] = useState<LangCode>(() => {
    const urlLang = new URLSearchParams(window.location.search).get('lang');
    if (urlLang && LANGUAGES.some(l => l.code === urlLang)) return urlLang as LangCode;
    return (sessionStorage.getItem('app_language') as LangCode) || 'en';
  });

  const pendingRef = useRef(new Map<string, Promise<string>>());

  const setLang = useCallback((code: LangCode) => {
    setLangState(code);
    sessionStorage.setItem('app_language', code);
  }, []);

  const t = useCallback((text: string): string => {
    if (lang === 'en') return text;
    const key = `${lang}:${text}`;
    return cache.get(key) || text;
  }, [lang]);

  const translateBatch = useCallback(async (texts: string[]) => {
    if (lang === 'en') return;
    const apiKey = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY;
    if (!apiKey) return;

    const untranslated = texts.filter(t => !cache.has(`${lang}:${t}`));
    if (untranslated.length === 0) return;

    try {
      const res = await fetch(
        `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            q: untranslated,
            target: lang,
            source: 'en',
            format: 'text',
          }),
        }
      );
      if (!res.ok) return;
      const data = await res.json();
      const translations = data.data?.translations || [];
      untranslated.forEach((text, i) => {
        if (translations[i]) {
          cache.set(`${lang}:${text}`, translations[i].translatedText);
        }
      });
    } catch {
      // Fallback to English silently
    }
  }, [lang]);

  return { lang, setLang, t, translateBatch, languages: LANGUAGES };
}
