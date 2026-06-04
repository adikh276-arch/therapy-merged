const fs = require('fs');
const path = require('path');

const files = [
  'app/4_6_8_breathing/breathe/page.tsx',
  'app/4_6_8_breathing/complete/page.tsx',
  'app/5_4_3_2_1_grounding/components/GroundingExercise.tsx',
  'app/guided-series/[concern]/GuidedSeriesClient.tsx',
  'app/guided-series/[concern]/[activityName]/GuidedActivityClient.tsx'
];

files.forEach(f => {
  if (!fs.existsSync(f)) {
    console.log('Not found:', f);
    return;
  }
  let content = fs.readFileSync(f, 'utf8');

  // Skip if already has loadLocale import
  if (content.includes('loadLocale')) {
    return;
  }

  // 1. Add import loadLocale
  content = content.replace(/import i18n from '.*?i18n';?/, match => {
    return match.replace('i18n from', 'i18n, { loadLocale } from');
  });

  // 2. Add useEffect inside the component
  // Find a useTranslation call to inject after
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

  // Ensure useEffect is imported
  if (!content.includes('useEffect') && content.includes('import { useState')) {
     content = content.replace('import { useState', 'import { useState, useEffect');
  } else if (!content.includes('useEffect') && content.includes('import React')) {
     content = content.replace(/import React(.*?)(?:, {([^}]*)})?(.*?)from 'react';/, (match, p1, p2, p3) => {
         if (p2) return `import React${p1}, {${p2}, useEffect }${p3}from 'react';`;
         return `import React${p1}, { useEffect }${p3}from 'react';`;
     });
  } else if (!content.includes('useEffect')) {
     content = `import { useEffect } from 'react';\n` + content;
  }

  fs.writeFileSync(f, content);
  console.log('Fixed', f);
});
