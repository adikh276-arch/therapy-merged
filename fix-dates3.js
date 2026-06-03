const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else {
      filelist.push(dirFile);
    }
  });
  return filelist;
};

const files = walkSync('d:\\Downloads\\merged\\app');

let count = 0;
files.forEach(file => {
  if (file.endsWith('.tsx') || file.endsWith('.ts')) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // We replace new Date(something).toLocaleDateString
    // where something is NOT empty.
    // Also, we might have .toLocaleTimeString or .toISOString? The issue was mostly toLocaleDateString.
    // Let's replace new Date(...).toLocaleDateString
    const dateRegex = /new Date\(([^)]+)\)\.toLocaleDateString/g;
    
    // Also replace new Date(...).toLocaleTimeString
    const timeRegex = /new Date\(([^)]+)\)\.toLocaleTimeString/g;

    let modified = false;

    if (dateRegex.test(content) || timeRegex.test(content)) {
      content = content.replace(dateRegex, 'parseDbDate($1).toLocaleDateString');
      content = content.replace(timeRegex, 'parseDbDate($1).toLocaleTimeString');
      
      // Now add the import if it's missing
      if (!content.includes('parseDbDate')) {
        // This shouldn't happen since we just added it, but just in case
      }
      
      if (content.includes('parseDbDate') && !content.includes('import { parseDbDate }')) {
        // add import at the top after 'use client'; or imports
        if (content.includes("'use client';")) {
          content = content.replace("'use client';", "'use client';\nimport { parseDbDate } from '@/lib/dateUtils';");
        } else if (content.includes('"use client";')) {
          content = content.replace('"use client";', '"use client";\nimport { parseDbDate } from "@/lib/dateUtils";');
        } else {
          content = "import { parseDbDate } from '@/lib/dateUtils';\n" + content;
        }
      }
      
      if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Fixed', file);
        count++;
      }
    }
  }
});
console.log('Fixed ' + count + ' files');
