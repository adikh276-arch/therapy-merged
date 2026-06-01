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

  // We are looking for: Record<something> = ((_t => Array.isArray(_t) ? _t : null)(t("key", { returnObjects: true }))) || {
  // We want to replace `Array.isArray(_t) ? _t : null` with `(typeof _t === 'object' && _t !== null && !Array.isArray(_t)) ? _t : null`
  // But ONLY if it has Record<...> in the same line or nearby. Actually, let's just do a regex that captures the `Record<...>` part.

  // Regex: (Record<[^>]+>\s*=\s*\(\(_t => )Array\.isArray\(_t\) \? _t : null
  content = content.replace(/(Record<[^>]+>\s*=\s*\(\(_t => )Array\.isArray\(_t\) \? _t : null/g, 
    "$1(typeof _t === 'object' && _t !== null && !Array.isArray(_t)) ? _t : null"
  );

  // Also catch cases where Record might be on previous line? Usually it's `const titles: Record<...> = ...`
  // Wait, let's just use `Record<[^>]+>[^=]*=\s*\(\(_t => Array\.isArray\(_t\) \? _t : null\)`

  if (content !== original) {
    fs.writeFileSync(file, content);
    modifiedFiles++;
    console.log('Fixed ' + file);
  }
});

console.log('Total fixed: ' + modifiedFiles);
