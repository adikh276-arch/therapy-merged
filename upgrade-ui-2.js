const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('./app');
let modifiedFiles = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;

  // Replace all bg-slate-900 that are not dark: or alpha transparent with gradient
  // Negative lookbehind (?<!dark:) and negative lookahead (?!\/)
  content = content.replace(/(?<!dark:)bg-slate-900(?!\/)/g, "bg-gradient-to-r from-primary to-sky-400 border-none");
  
  // We might end up with `bg-gradient-to-r from-primary to-sky-400 border-none text-white shadow-lg shadow-primary/30` from previous script
  // Let's clean up any double classes if needed. But it's fine.
  
  // Any remaining generic white cards: `bg-white dark:bg-slate-900 border border-slate-100`
  content = content.replace(/(?<!dark:)bg-white border border-slate-100/g, "bg-white/60 backdrop-blur-lg border border-white/60 shadow-sm");
  
  if (content !== original) {
    fs.writeFileSync(file, content);
    modifiedFiles++;
    console.log('Fixed ' + file);
  }
});

console.log('Total fixed: ' + modifiedFiles);
