const fs = require('fs');
const path = require('path');

const emojiMap = {
  "🔥": "Flame",
  "😔": "Frown",
  "🤐": "Lock",
  "🔍": "Search",
  "🤲": "HeartHandshake",
  "🕊️": "Feather",
  "🏆": "Trophy",
  "🌙": "Moon",
  "🌤️": "Sun",
  "😴": "Moon",
  "💤": "Moon",
  "🌀": "Waves",
  "☕": "Coffee",
  "📱": "Smartphone",
  "🍷": "Wine",
  "🥱": "Frown",
  "☀️": "Sun",
  "😫": "Frown",
  "💡": "Lightbulb",
  "★": "Star",
  "📵": "PhoneOff",
  "🚫": "Ban",
  "🛁": "Bath",
  "✍️": "Pen",
  "🎯": "Target",
  "▶": "Play",
  "🌬️": "Wind",
  "🚶": "Activity",
  "📋": "Clipboard",
  "⏸️": "Pause",
  "👆": "Pointer",
  "🤚": "Hand",
  "✉️": "Mail",
  "🧘": "Activity",
  "📭": "MailOpen",
  "🧠": "Brain",
  "🔴": "Circle",
  "🟢": "Circle",
  "🔵": "Circle",
  "🖐️": "Hand",
  "🦶": "Activity",
  "🎵": "Music",
  "💬": "MessageCircle",
  "📝": "FileText",
  "💛": "Heart",
  "✨": "Sparkles",
  "⚪": "Circle",
  "📖": "Book",
  "🌿": "Leaf",
  "✓": "Check",
  "⏳": "Hourglass",
  "❓": "HelpCircle",
  "😌": "Smile",
  "😊": "Smile",
  "🥲": "Frown",
  "😡": "Flame",
  "😠": "Flame",
  "😢": "Frown",
  "😭": "Frown",
  "🤯": "Brain",
  "😰": "Frown",
  "😥": "Frown",
  "😓": "Frown"
};

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  let importsNeeded = new Set();
  
  // Keep track if we changed anything
  let changed = false;

  // Generic replacement for JSX Text Nodes (e.g., <div>🔥</div>)
  // This is a naive regex that looks for an emoji surrounded by standard JSX tag boundaries
  for (const [emoji, icon] of Object.entries(emojiMap)) {
    // 1. Standalone in JSX: <div>🔥</div> -> <div><IconName className="inline-block" /></div>
    const regex1 = new RegExp(`>\\s*${emoji}\\s*<`, 'g');
    if (regex1.test(content)) {
      content = content.replace(regex1, `><${icon} className="inline-block w-8 h-8" /><`);
      importsNeeded.add(icon);
      changed = true;
    }
    
    // 2. Object properties: { emoji: "🔥" } -> { emoji: <IconName className="w-5 h-5" /> }
    const regex2 = new RegExp(`(emoji:\\s*["'\`])${emoji}(["'\`])`, 'g');
    if (regex2.test(content)) {
      // Instead of changing the property name (which breaks types), we'll replace the string with a component instance if it's in a TSX array
      // But wait, if it's `{ emoji: <Flame /> }`, TS might complain if the type is string.
      // Let's replace the property value completely and hope the type is inferred or any.
      content = content.replace(regex2, `icon: <${icon} className="w-5 h-5" />`);
      importsNeeded.add(icon);
      changed = true;
    }

    // 3. Simple text replacement inside JSX, not touching strings (hard to do perfectly with Regex)
    // We'll replace <span>🔥</span>
    const regex3 = new RegExp(`<span([^>]*)>\\s*${emoji}\\s*</span>`, 'g');
    if (regex3.test(content)) {
      content = content.replace(regex3, `<span$1><${icon} className="inline-block w-[1em] h-[1em]" /></span>`);
      importsNeeded.add(icon);
      changed = true;
    }
  }

  // If imports are needed, add them to the lucide-react import or create one
  if (changed && importsNeeded.size > 0) {
    const iconsArray = Array.from(importsNeeded);
    
    // Find existing lucide-react import
    const lucideRegex = /import\s+\{([^}]+)\}\s+from\s+['"]lucide-react['"];?/;
    const match = content.match(lucideRegex);
    
    if (match) {
      const existingIcons = match[1].split(',').map(i => i.trim()).filter(i => i);
      const newIcons = iconsArray.filter(i => !existingIcons.includes(i));
      if (newIcons.length > 0) {
        const combinedIcons = [...existingIcons, ...newIcons].join(', ');
        content = content.replace(lucideRegex, `import { ${combinedIcons} } from "lucide-react";`);
      }
    } else {
      // Add after last import or at top
      const importStr = `import { ${iconsArray.join(', ')} } from "lucide-react";\n`;
      const lastImportMatch = [...content.matchAll(/^import.*$/gm)].pop();
      if (lastImportMatch) {
        const insertPos = lastImportMatch.index + lastImportMatch[0].length + 1;
        content = content.slice(0, insertPos) + importStr + content.slice(insertPos);
      } else {
        content = importStr + content;
      }
    }
    
    // Also change { icon: <Flame /> } usage from `x.emoji` to `x.icon` where applicable
    content = content.replace(/\.emoji/g, '.icon');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

function walk(dir) {
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      if (!file.includes('node_modules') && !file.includes('.git') && !file.includes('.next')) {
        walk(file);
      }
    } else {
      if (file.endsWith('.tsx')) {
        processFile(file);
      }
    }
  });
}

walk('d:/Downloads/merged/app');
walk('d:/Downloads/merged/components');
