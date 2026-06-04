const fs = require('fs');
let content = fs.readFileSync('app/energy-tracker/page.tsx', 'utf8');

// Update imports
content = content.replace(
  /import { BatteryMedium.*? } from 'lucide-react';/,
  "import { BatteryMedium, History, ArrowLeft, ArrowRight, Check, Sparkles, Coffee, Droplets, Footprints, Info, Loader2, BatteryWarning, Battery as BatteryFull, BatteryLow, Zap } from 'lucide-react';"
);

// Update EMOJI_MAP
content = content.replace(
  /const EMOJI_MAP: Record<EnergyLevel, string> = {[\s\S]*?};/,
  `const EMOJI_MAP: Record<EnergyLevel, React.ReactNode> = {
  'very-low': <BatteryWarning size={32} className="text-rose-500" />,
  'low': <BatteryLow size={32} className="text-amber-500" />,
  'okay': <BatteryMedium size={32} className="text-blue-500" />,
  'good': <BatteryFull size={32} className="text-teal-500" />,
  'high': <Zap size={32} className="text-emerald-500" />,
};`
);

// Add import React
if (!content.includes("import React")) {
  content = "import React from 'react';\n" + content;
}

// Adjust rendering where EMOJI_MAP[activeLevel] is used with a different size
content = content.replace(
  /<span className="text-6xl filter drop-shadow-md">{EMOJI_MAP\[activeLevel\]}<\/span>/,
  `<span className="text-6xl filter drop-shadow-md flex items-center justify-center scale-150">{EMOJI_MAP[activeLevel]}</span>`
);

// Adjust rendering where opt.emoji is used
content = content.replace(
  /<span className="text-2xl">{opt\.emoji}<\/span>/g,
  `<span className="text-2xl flex items-center justify-center">{opt.emoji}</span>`
);

fs.writeFileSync('app/energy-tracker/page.tsx', content);
console.log('Fixed energy-tracker');
