const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = walk('./app');
let modifiedFiles = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;

  // Revert dark decorative panels: the gradient replaced bg-slate-900 in places
  // that were intentionally dark (not buttons). Identify them by surrounding context:
  // They appear as className="p-... bg-gradient-to-r from-primary to-sky-400 border-none text-white ...rounded..."
  // These are card/panel wrappers, not buttons. Revert to a premium dark gradient.
  
  // Pattern: large panels (p-8, p-10, p-12) with that gradient — these are dark feature cards
  content = content.replace(
    /className="(p-\d+ )bg-gradient-to-r from-primary to-sky-400 border-none( text-white[^"]*rounded[^"]*shadow[^"]*)"/g,
    'className="$1bg-gradient-to-br from-slate-800 to-slate-900$2"'
  );
  content = content.replace(
    /className="([^"]*\s)bg-gradient-to-r from-primary to-sky-400 border-none( text-white[^"]*rounded[^"]*(?:overflow|relative)[^"]*)"/g,
    'className="$1bg-gradient-to-br from-slate-800 to-slate-900$2"'
  );

  // Bingo checked cell — was 'bg-slate-900 border-slate-900 text-white shadow-md'
  // Script turned it into gradient which is fine for bingo. But prediction-vs-reality had a similar pattern.
  // We want the bingo "checked" look to be primary, but prediction toggle to be dark.
  // The context was: ? 'bg-slate-900 border-slate-900 text-white shadow-md' — bingo
  // Leave bingo as-is (primary gradient is OK for checked tiles)

  if (content !== original) {
    fs.writeFileSync(file, content);
    modifiedFiles++;
    console.log('Reverted dark panel: ' + file);
  }
});

console.log('Total dark panels fixed: ' + modifiedFiles);
