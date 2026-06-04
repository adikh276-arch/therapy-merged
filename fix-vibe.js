const fs = require('fs');
let content = fs.readFileSync('app/vibe-tracker/page.tsx', 'utf8');

// Update imports
content = content.replace(
  /import { Heart,.*? } from 'lucide-react';/,
  "import { Heart, Sparkles, Clock, Calendar, ArrowRight, Check, History, Loader2, Wind, Sun, Flame, HeartHandshake, Anchor, CloudRain, Coffee, Activity, Battery, BatteryWarning } from 'lucide-react';"
);

// Update vibes
content = content.replace(
  /const vibes = \[[\s\S]*?\];/,
  `const vibes = [
  { emoji: "calm", label: "Calm", icon: <Wind size={24} />, tint: "bg-emerald-50/50 border-emerald-100 text-emerald-800 dark:bg-emerald-950/10 dark:border-emerald-900/20 dark:text-emerald-300" },
  { emoji: "light", label: "Light", icon: <Sun size={24} />, tint: "bg-amber-50/50 border-amber-100 text-amber-800 dark:bg-amber-950/10 dark:border-amber-900/20 dark:text-amber-300" },
  { emoji: "driven", label: "Driven", icon: <Flame size={24} />, tint: "bg-orange-50/50 border-orange-100 text-orange-800 dark:bg-orange-950/10 dark:border-orange-900/20 dark:text-orange-300" },
  { emoji: "content", label: "Content", icon: <HeartHandshake size={24} />, tint: "bg-pink-50/50 border-pink-100 text-pink-800 dark:bg-pink-950/10 dark:border-pink-900/20 dark:text-pink-300" },
  { emoji: "steady", label: "Steady", icon: <Anchor size={24} />, tint: "bg-blue-50/50 border-blue-100 text-blue-800 dark:bg-blue-950/10 dark:border-blue-900/20 dark:text-blue-300" },
  { emoji: "tender", label: "Tender", icon: <CloudRain size={24} />, tint: "bg-slate-50/50 border-white/60 text-slate-800 dark:bg-slate-950/10 dark:border-slate-900/20 dark:text-slate-300" },
  { emoji: "heavy", label: "Heavy", icon: <Coffee size={24} />, tint: "bg-indigo-50/50 border-indigo-100 text-indigo-800 dark:bg-indigo-950/10 dark:border-indigo-900/20 dark:text-indigo-300" },
  { emoji: "thoughtful", label: "Thoughtful", icon: <Activity size={24} />, tint: "bg-teal-50/50 border-teal-100 text-teal-800 dark:bg-teal-950/10 dark:border-teal-900/20 dark:text-teal-300" },
  { emoji: "restless", label: "Restless", icon: <BatteryWarning size={24} />, tint: "bg-yellow-50/50 border-yellow-100 text-yellow-800 dark:bg-yellow-950/10 dark:border-yellow-900/20 dark:text-yellow-300" },
  { emoji: "drained", label: "Drained", icon: <Battery size={24} />, tint: "bg-rose-50/50 border-rose-100 text-rose-800 dark:bg-rose-950/10 dark:border-rose-900/20 dark:text-rose-300" },
];`
);

// Fix rendered emoji to use icon
content = content.replace(
  /<span className="text-3xl mb-1 block group-hover:scale-110 transition-transform">{v\.emoji}<\/span>/g,
  `<span className="text-3xl mb-1 block group-hover:scale-110 transition-transform flex justify-center">{v.icon || v.emoji}</span>`
);

content = content.replace(
  /vibeEmojiMap\[selectedVibe\]/g,
  `(vibes.find(v => v.label === selectedVibe)?.icon || vibeEmojiMap[selectedVibe])`
);
content = content.replace(
  /vibeEmojiMap\[entry\.vibe\]/g,
  `(vibes.find(v => v.label === entry.vibe)?.icon || vibeEmojiMap[entry.vibe])`
);

fs.writeFileSync('app/vibe-tracker/page.tsx', content);
console.log('Fixed vibe-tracker');
