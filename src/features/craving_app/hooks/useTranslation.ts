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

export type LangCode = (typeof LANGUAGES)[number]['code'];

const cache = new Map<string, string>();

export function useTranslation() {
  const [lang, setLangState] = useState<LangCode>(() => {
    const urlLang = new URLSearchParams(window.location.search).get('lang');
    if (urlLang && LANGUAGES.some(l => l.code === urlLang)) return urlLang as LangCode;
    return (sessionStorage.getItem('app_language') as LangCode) || 'en';
  });

  const apiKey = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY;
  const pendingRef = useRef(new Map<string, Promise<string>>());

  const setLang = useCallback((code: LangCode) => {
    setLangState(code);
    sessionStorage.setItem('app_language', code);
  }, []);

  const t = useCallback(
    (text: string): string => {
      if (lang === 'en' || !apiKey) return text;
      const key = `${lang}:${text}`;
      if (cache.has(key)) return cache.get(key)!;

      // Start async translation if not already pending
      if (!pendingRef.current.has(key)) {
        const promise = fetch(
          `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ q: text, target: lang, source: 'en', format: 'text' }),
          }
        )
          .then(r => r.json())
          .then(d => {
            const translated = d?.data?.translations?.[0]?.translatedText || text;
            cache.set(key, translated);
            pendingRef.current.delete(key);
            return translated;
          })
          .catch(() => {
            pendingRef.current.delete(key);
            return text;
          });
        pendingRef.current.set(key, promise);
      }

      return text; // Return English as fallback while loading
    },
    [lang, apiKey]
  );

  return { lang, setLang, t, languages: LANGUAGES };
}
