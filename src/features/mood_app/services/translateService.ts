const API_KEY = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY;

const cache = new Map<string, Map<string, string>>();

export async function translateBatch(
  texts: string[],
  target: string
): Promise<Record<string, string>> {
  if (target === 'en' || !API_KEY || texts.length === 0) {
    return Object.fromEntries(texts.map((t) => [t, t]));
  }

  if (!cache.has(target)) cache.set(target, new Map());
  const langCache = cache.get(target)!;

  const uncached = texts.filter((t) => !langCache.has(t));
  const result: Record<string, string> = {};

  if (uncached.length > 0) {
    try {
      const res = await fetch(
        `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            q: uncached,
            target,
            source: 'en',
            format: 'text',
          }),
        }
      );
      const data = await res.json();
      if (data.data?.translations) {
        uncached.forEach((text, i) => {
          const translated = data.data.translations[i].translatedText;
          langCache.set(text, translated);
        });
      }
    } catch {
      // fallback to English on error
    }
  }

  for (const t of texts) {
    result[t] = langCache.get(t) || t;
  }

  return result;
}

export function getCached(text: string, target: string): string | null {
  return cache.get(target)?.get(text) || null;
}
