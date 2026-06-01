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

  // Replace: (t("key", { returnObjects: true }) as SomeType[]) ||
  // With a safe array check that yields null if it's not an array, triggering the ||
  content = content.replace(/\(t\(([^,]+),\s*\{\s*returnObjects:\s*true\s*\}\)\s*as\s*[^)]+\)\s*\|\|/g, 
    '((_t => Array.isArray(_t) ? _t : null)(t($1, { returnObjects: true }))) ||'
  );

  // Also replace cases without "as Type": t("key", { returnObjects: true }) ||
  // Wait, if it doesn't have `as`, let's just do a specific replace for those if they exist.
  // We'll see if the first pass catches most.

  if (content !== original) {
    fs.writeFileSync(file, content);
    modifiedFiles++;
    console.log('Fixed ' + file);
  }
});

console.log('Total fixed: ' + modifiedFiles);
