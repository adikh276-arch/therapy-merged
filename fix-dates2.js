const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    try {
      filelist = walkSync(dirFile, filelist);
    } catch (err) {
      if (err.code === 'ENOTDIR' || err.code === 'EBADF') filelist.push(dirFile);
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

    // Fix snake_case to camelCase missing mappings by regex
    // We look for any setXXX(data) or setXXX(rows) where data comes from res.json()
    // It's safer to just inject parseDbDate where we see `new Date(` and `.toLocaleDateString(`
    // For example: `new Date(r.created_at).toLocaleDateString` -> `new Date(parseDbDate(r.created_at)).toLocaleDateString`
    // Actually, `parseDbDate` returns a Date. So `parseDbDate(r.created_at).toLocaleDateString`
    
    // Instead of messing up AST, let's fix the API routes so they return ISO strings WITH 'Z'!
    // If the API routes return properly formatted dates, we don't need to touch the UI!
  }
});
