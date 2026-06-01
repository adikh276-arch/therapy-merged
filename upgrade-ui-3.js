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

  // Replace standalone bg-slate-50 with glassmorphism, excluding hover, focus, dark, etc.
  content = content.replace(/(?<![:-])bg-slate-50(?!\/)/g, "bg-white/40 backdrop-blur-sm shadow-sm border border-white/50");
  
  // Replace generic border-slate-100 where it's not dark or hover
  content = content.replace(/(?<![:-])border-slate-100/g, "border-white/60");
  
  if (content !== original) {
    fs.writeFileSync(file, content);
    modifiedFiles++;
    console.log('Fixed ' + file);
  }
});

console.log('Total fixed: ' + modifiedFiles);
