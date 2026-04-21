import { useEffect, useCallback } from "react";
import { useTranslation as useI18nTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

export function useTranslation() {
  const { t, i18n } = useI18nTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentLang = i18n.language || "en";

  const changeLang = useCallback(
    (code: string) => {
      i18n.changeLanguage(code);
      localStorage.setItem("language", code);
      setSearchParams({ lang: code }, { replace: true });
    },
    [i18n, setSearchParams]
  );

  // Initialize from URL, then localStorage, then default
  useEffect(() => {
    const langParam = searchParams.get("lang");
    const localLang = localStorage.getItem("language");
    const targetLang = langParam || localLang || "en";

    if (i18n.language !== targetLang) {
      i18n.changeLanguage(targetLang);
    }
  }, []);

  // Sync with URL param if it changes externally
  useEffect(() => {
    const langParam = searchParams.get("lang");
    if (langParam && langParam !== i18n.language) {
      i18n.changeLanguage(langParam);
    }
  }, [searchParams, i18n]);

  return {
    t,
    currentLang,
    changeLang,
    i18n,
    // Add dummy translateBatch to avoid breaking existing code
    translateBatch: () => { },
  };
}
