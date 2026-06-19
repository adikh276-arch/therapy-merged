const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else {
      if (file === 'route.ts') filelist.push(dirFile);
    }
  }
  return filelist;
};

const routes = walkSync('app/api');
let modifiedCount = 0;

for (const route of routes) {
  if (route.includes('gratitude-tracker')) continue; // already fixed
  let content = fs.readFileSync(route, 'utf-8');
  let originalContent = content;

  if (content.includes('SELECT') && content.includes('date') && content.includes('NextResponse.json(rows)')) {
    const replacement = `const formattedRows = rows.map((r: any) => ({
      ...r,
      date: r.date instanceof Date ? r.date.toISOString().split('T')[0] : (typeof r.date === 'string' ? r.date.split('T')[0] : r.date)
    }));
    return NextResponse.json(formattedRows);`;
    
    content = content.replace(/return NextResponse\.json\(rows\);/g, replacement);
  }
  
  // also fix the `-00` to `-31` bug if present
  if (content.includes('month + "-00"')) {
    content = content.replace(/const monthStart = month \+ "-00";/g, `const [yearStr, monthStr] = month.split("-");\n      const lastDay = new Date(parseInt(yearStr), parseInt(monthStr), 0).getDate();\n      const monthStart = \`\${month}-01\`;`);
    content = content.replace(/const monthEnd = month \+ "-31";/g, 'const monthEnd = `${month}-${lastDay}`;');
  }

  if (content !== originalContent) {
    fs.writeFileSync(route, content, 'utf-8');
    modifiedCount++;
    console.log('Fixed', route);
  }
}
console.log('Total fixed:', modifiedCount);
