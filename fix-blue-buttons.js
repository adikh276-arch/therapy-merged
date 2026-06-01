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

  // Revert buttons and elements from the primary blue gradient back to black (bg-slate-900)
  
  // Pattern 1: With border-none
  content = content.replace(
    /bg-gradient-to-r from-primary to-sky-400 border-none text-white shadow-lg shadow-primary\/30/g,
    'bg-slate-900 border-slate-900 text-white shadow-md'
  );
  
  // Pattern 2: Without border-none
  content = content.replace(
    /bg-gradient-to-r from-primary to-sky-400 text-white shadow-lg shadow-primary\/30/g,
    'bg-slate-900 text-white shadow-md'
  );

  // Pattern 3: Any leftover from-primary to-sky-400 text-white
  content = content.replace(
    /bg-gradient-to-r from-primary to-sky-400 text-white/g,
    'bg-slate-900 text-white'
  );

  if (content !== original) {
    fs.writeFileSync(file, content);
    modifiedFiles++;
    console.log('Reverted black/blue styling: ' + file);
  }
});

console.log('Total styling files fixed: ' + modifiedFiles);
