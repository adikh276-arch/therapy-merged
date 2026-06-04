const fs = require('fs');
let content = fs.readFileSync('app/know-your-values/page.tsx', 'utf8');

// Update imports
content = content.replace(
  /import { Sparkles.*? } from 'lucide-react';/,
  "import { Sparkles, Brain, ArrowRight, ArrowLeft, RefreshCw, History, Calendar, Check, Target, Heart, Loader2, Users, HeartPulse, Palette, BookOpen, Compass, Bird, TrendingUp, Smile, Scale, ShieldCheck } from 'lucide-react';"
);

// Update ALL_VALUES
content = content.replace(
  /const ALL_VALUES: ValueItem\[\] = \[[\s\S]*?\];/,
  `const ALL_VALUES: ValueItem[] = [
  { emoji: "family", name: "Family", icon: <Users size={24} className="text-blue-500" /> },
  { emoji: "health", name: "Health", icon: <HeartPulse size={24} className="text-rose-500" /> },
  { emoji: "creativity", name: "Creativity", icon: <Palette size={24} className="text-purple-500" /> },
  { emoji: "learning", name: "Learning", icon: <BookOpen size={24} className="text-amber-500" /> },
  { emoji: "adventure", name: "Adventure", icon: <Compass size={24} className="text-emerald-500" /> },
  { emoji: "freedom", name: "Freedom", icon: <Bird size={24} className="text-sky-500" /> },
  { emoji: "growth", name: "Growth", icon: <TrendingUp size={24} className="text-teal-500" /> },
  { emoji: "kindness", name: "Kindness", icon: <Smile size={24} className="text-pink-500" /> },
  { emoji: "balance", name: "Balance", icon: <Scale size={24} className="text-indigo-500" /> },
  { emoji: "honesty", name: "Honesty", icon: <ShieldCheck size={24} className="text-slate-500" /> },
];`
);

// Update ValueItem interface
content = content.replace(
  /interface ValueItem {\s*emoji: string;\s*name: string;\s*}/,
  `interface ValueItem {\n  emoji: string;\n  name: string;\n  icon?: React.ReactNode;\n}`
);

// Add import React
if (!content.includes("import React")) {
  content = "import React from 'react';\n" + content;
}

// Render icon instead of emoji text
content = content.replace(
  /<span className="text-2xl leading-none">{v\.emoji}<\/span>/g,
  `<span className="text-2xl leading-none flex items-center justify-center">{v.icon || v.emoji}</span>`
);

// Chosen value rendering
content = content.replace(
  /\{chosenValue\.emoji\} \{t\(/g,
  '{chosenValue.icon || chosenValue.emoji} {t('
);
content = content.replace(
  /\{v\.emoji\} \{t\(/g,
  '{v.icon || v.emoji} {t('
);

content = content.replace(
  /\{savedReflection\.valueEmoji\}/g,
  '{ALL_VALUES.find(val => val.name === savedReflection.valueName)?.icon || savedReflection.valueEmoji}'
);

content = content.replace(
  /\{r\.valueEmoji\}/g,
  '{ALL_VALUES.find(val => val.name === r.valueName)?.icon || r.valueEmoji}'
);

fs.writeFileSync('app/know-your-values/page.tsx', content);
console.log('Fixed know-your-values');
