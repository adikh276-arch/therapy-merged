const fs = require('fs');
const f = 'app/5_4_3_2_1_grounding/components/GroundingExercise.tsx';
let content = fs.readFileSync(f, 'utf8');

if (!content.includes('loadLocale')) {
  content = content.replace(
    'import { useState, useCallback, useMemo } from "react";',
    'import { useState, useCallback, useMemo, useEffect } from "react";\nimport { loadLocale } from "../i18n/i18n";'
  );
  
  const useTranslationMatch = content.match(/const\s*{\s*t\s*}\s*=\s*useTranslation\([^)]*\);/);
  if (useTranslationMatch) {
    const insertIndex = content.indexOf(useTranslationMatch[0]) + useTranslationMatch[0].length;
    const useEffectSnippet = `
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const lang = params.get('lang') || 'en';
      if (typeof loadLocale === 'function') {
        loadLocale(lang);
      }
    }
  }, []);
`;
    content = content.slice(0, insertIndex) + '\n' + useEffectSnippet + content.slice(insertIndex);
  }
  
  fs.writeFileSync(f, content);
  console.log('Fixed GroundingExercise.tsx');
}
