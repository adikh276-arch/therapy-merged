'use client';

import { useEffect, useState } from 'react';
import i18n from '../lib/i18n';
import { I18nextProvider } from 'react-i18next';

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const handleLangChange = (lng: string) => {
      document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lng;
    };
    
    // Set initial
    handleLangChange(i18n.language || 'en');
    
    i18n.on('languageChanged', handleLangChange);
    setIsReady(true);
    
    return () => {
      i18n.off('languageChanged', handleLangChange);
    }
  }, []);

  if (!isReady) return null; // Avoid hydration mismatch for translations

  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
}
