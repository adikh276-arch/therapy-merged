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
  // Skip API route files themselves — they don't call fetch()
  if (file.includes('\\api\\') || file.includes('/api/')) return;

  let content = fs.readFileSync(file, 'utf8');
  const original = content;

  // Check if we need to add the import
  const hasFetchApiCall = /fetch\(['"`]\/api\//.test(content);
  if (!hasFetchApiCall) return;

  // Add import if not already there
  if (!content.includes("from '@/lib/apiPath'") && !content.includes('from "@/lib/apiPath"')) {
    // Insert import after the last import line
    const importInsertMatch = content.match(/^(import .+\n)+/m);
    if (importInsertMatch) {
      const lastImportIdx = content.lastIndexOf("\nimport ");
      const endOfLastImport = content.indexOf('\n', lastImportIdx + 1);
      content = content.slice(0, endOfLastImport + 1)
        + `import { apiPath } from '@/lib/apiPath';\n`
        + content.slice(endOfLastImport + 1);
    }
  }

  // Replace fetch('/api/...) with fetch(apiPath('/api/...) for all quote styles
  content = content.replace(/fetch\('(\/api\/[^']+)'/g, "fetch(apiPath('$1')");
  content = content.replace(/fetch\("(\/api\/[^"]+)"/g, 'fetch(apiPath("$1")');
  content = content.replace(/fetch\(`(\/api\/[^`]+)`\)/g, 'fetch(apiPath(`$1`))');

  if (content !== original) {
    fs.writeFileSync(file, content);
    modifiedFiles++;
    console.log('Fixed: ' + file);
  }
});

console.log('Total files fixed: ' + modifiedFiles);
