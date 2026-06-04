const fs = require('fs');

const files = [
  'app/4_6_8_breathing/breathe/page.tsx',
  'app/4_6_8_breathing/complete/page.tsx',
  'app/5_4_3_2_1_grounding/components/GroundingExercise.tsx',
  'app/guided-series/[concern]/GuidedSeriesClient.tsx',
  'app/guided-series/[concern]/[activityName]/GuidedActivityClient.tsx'
];

files.forEach(f => {
  if (!fs.existsSync(f)) return;
  let content = fs.readFileSync(f, 'utf8');
  
  if (f.includes('4_6_8_breathing')) {
     if (content.includes("import '../i18n/i18n';")) {
       if (!content.includes('loadLocale')) {
         content = content.replace("import '../i18n/i18n';", "import '../i18n/i18n';\nimport { loadLocale } from '../i18n/i18n';");
       }
     }
  } else if (f.includes('5_4_3_2_1_grounding')) {
     if (content.includes("import i18n from '../i18n';")) {
       content = content.replace("import i18n from '../i18n';", "import i18n, { loadLocale } from '../i18n';");
     }
  } else if (f.includes('guided-series')) {
     if (content.includes("import '@/lib/i18n/i18n';")) {
       if (!content.includes('loadGlobalResource')) {
         content = content.replace("import '@/lib/i18n/i18n';", "import '@/lib/i18n/i18n';\nimport { loadGlobalResource as loadLocale } from '@/lib/i18n/i18n';");
       }
     }
  }
  fs.writeFileSync(f, content);
  console.log('Fixed imports in', f);
});
