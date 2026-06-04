const fs = require('fs');
let content = fs.readFileSync('app/gratitude-tracker/page.tsx', 'utf8');

// Update imports
content = content.replace(
  /import { ChevronLeft.*? } from 'lucide-react';/,
  "import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Loader2, Sparkles, Heart, ArrowLeft, ArrowRight, Smile, Check, History, Sun, Cloud, CloudRain, CloudLightning } from 'lucide-react';"
);

// Update MOODS
content = content.replace(
  /const MOODS: MoodOption\[\] = \[[\s\S]*?\];/,
  `const MOODS: MoodOption[] = [
  { emoji: "happy", label: "Happy", icon: <Sun size={24} className="text-amber-500" /> },
  { emoji: "calm", label: "Calm", icon: <Smile size={24} className="text-emerald-500" /> },
  { emoji: "neutral", label: "Neutral", icon: <Cloud size={24} className="text-slate-500" /> },
  { emoji: "low", label: "Low", icon: <CloudRain size={24} className="text-indigo-500" /> },
  { emoji: "stressed", label: "Stressed", icon: <CloudLightning size={24} className="text-rose-500" /> },
];`
);

// Update MoodOption interface
content = content.replace(
  /interface MoodOption {\s*emoji: string;\s*label: string;\s*}/,
  `interface MoodOption {\n  emoji: string;\n  label: string;\n  icon?: React.ReactNode;\n}`
);

// Add import React
if (!content.includes("import React")) {
  content = "import React from 'react';\n" + content;
}

// Render icon instead of emoji text
content = content.replace(
  /<span className="text-2xl">{opt\.emoji}<\/span>/g,
  `<span className="text-2xl flex items-center justify-center">{opt.icon || opt.emoji}</span>`
);

// Render in review/history
content = content.replace(
  /<span className="text-lg leading-none">{selectedMood\.emoji}<\/span>/g,
  `<span className="text-lg leading-none flex items-center justify-center">{selectedMood.icon || selectedMood.emoji}</span>`
);
content = content.replace(
  /<span className="text-xl leading-none">{selectedHistoryEntry\.mood\.emoji}<\/span>/g,
  `<span className="text-xl leading-none flex items-center justify-center">
    {MOODS.find(m => m.label === selectedHistoryEntry.mood.label)?.icon || selectedHistoryEntry.mood.emoji}
  </span>`
);

fs.writeFileSync('app/gratitude-tracker/page.tsx', content);
console.log('Fixed gratitude-tracker');
