import { useCallback, useEffect } from "react";
import { useTranslation as useI18nTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { SUPPORTED_CODES } from "@/i18n/i18n";

/**
 * Thin wrapper around react-i18next's useTranslation.
 * Reads/writes ?lang= URL param and keeps i18next in sync.
 */
export function useTranslation() {
  const { t, i18n } = useI18nTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const langParam = searchParams.get("lang")?.toLowerCase() || "en";

  // Sync URL param → i18n language on mount and when param changes
  useEffect(() => {
    const code = SUPPORTED_CODES.includes(langParam) ? langParam : "en";
    if (i18n.language !== code) {
      i18n.changeLanguage(code);
    }
  }, [langParam, i18n]);

  const changeLang = useCallback(
    (code: string) => {
      i18n.changeLanguage(code);
      if (code === "en") {
        setSearchParams({}, { replace: true });
      } else {
        setSearchParams({ lang: code }, { replace: true });
      }
    },
    [i18n, setSearchParams]
  );

  return {
    t,
    currentLang: i18n.language || "en",
    changeLang,
    isTranslating: false,
    // Keep translateBatch as a no-op for backwards compat (translations are pre-loaded)
    translateBatch: async (_texts: string[]) => { },
  };
}
