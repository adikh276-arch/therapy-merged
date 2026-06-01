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

  // 1. Upgrade primary black buttons to vibrant gradients
  content = content.replace(/bg-slate-900 text-white/g, "bg-gradient-to-r from-primary to-sky-400 text-white shadow-lg shadow-primary/30");
  content = content.replace(/hover:bg-slate-800/g, "hover:opacity-90 hover:shadow-xl hover:shadow-primary/40");
  
  // 2. Upgrade large white cards to glassmorphism
  content = content.replace(/bg-white border border-slate-100 shadow-xl/g, "bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)]");
  content = content.replace(/bg-white border border-slate-100 rounded-\[2\.5rem\] p-8 shadow-2xl shadow-slate-200\/50/g, "bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]");
  content = content.replace(/bg-white border border-slate-100 rounded-\[3rem\] p-10 shadow-2xl shadow-slate-200\/50/g, "bg-white/70 backdrop-blur-xl border border-white/80 rounded-[3rem] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]");
  content = content.replace(/bg-white border border-slate-100 p-10 shadow-2xl shadow-slate-200\/50/g, "bg-white/70 backdrop-blur-xl border border-white/80 p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]");
  content = content.replace(/bg-white border border-slate-100/g, "bg-white/60 backdrop-blur-lg border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]");
  
  // 3. Unselected selectable cards/tiles (often have bg-white border-slate-100)
  content = content.replace(/bg-white border-slate-100 text-slate-500 hover:border-primary\/25/g, "bg-white/50 backdrop-blur-md border-white/50 shadow-sm text-slate-500 hover:bg-white/80 hover:shadow-md");
  content = content.replace(/bg-white border-slate-100 text-slate-600 hover:border-slate-200/g, "bg-white/50 backdrop-blur-md border-white/50 shadow-sm text-slate-600 hover:bg-white/80 hover:shadow-md");
  content = content.replace(/bg-white border-slate-100 text-slate-600 hover:border-primary\/30 hover:bg-slate-50 shadow-sm/g, "bg-white/50 backdrop-blur-md border-white/50 shadow-sm text-slate-600 hover:bg-white/80 hover:shadow-md");
  
  // 4. Selected tiles
  content = content.replace(/bg-primary border-primary text-white shadow-md/g, "bg-primary border-primary text-white shadow-lg shadow-primary/30");
  content = content.replace(/bg-primary\/5 border-primary text-primary/g, "bg-primary/10 border-primary/30 text-primary shadow-lg shadow-primary/5 backdrop-blur-md");
  content = content.replace(/bg-primary\/5 border-primary text-primary shadow-lg shadow-primary\/5/g, "bg-primary/10 border-primary/30 text-primary shadow-lg shadow-primary/10 backdrop-blur-md");

  // 5. General soft panels (e.g. textareas)
  content = content.replace(/bg-white border border-slate-150/g, "bg-white/60 backdrop-blur-md border border-white/60 shadow-inner");
  content = content.replace(/bg-white border-2 border-slate-100/g, "bg-white/60 backdrop-blur-md border border-white/60 shadow-inner");
  
  // 6. Generic `border-2` outlines (very ugly)
  // Usually we did `border-2 transition-all ...`
  content = content.replace(/border-2/g, "border");

  if (content !== original) {
    fs.writeFileSync(file, content);
    modifiedFiles++;
    console.log('Fixed ' + file);
  }
});

console.log('Total fixed: ' + modifiedFiles);
