
const fs = require('fs');
const path = require('path');

const root = 'app/therapy';

fs.readdirSync(root).forEach(dir => {
  const p = path.join(root, dir, 'page.tsx');
  if (fs.existsSync(p)) {
    let c = fs.readFileSync(p, 'utf8');
    if (c.includes('StaticRenderer') && c.includes('slug=')) {
      const slugMatch = c.match(/slug="([^"]+)"/);
      if (slugMatch) {
        const slug = slugMatch[1];
        const newContent = `import StaticRenderer from '@/components/StaticRenderer';
import fs from 'fs';
import path from 'path';

export default function Page() {
  const filePath = path.join(process.cwd(), 'app/therapy/${slug}/index.html');
  const html = fs.readFileSync(filePath, 'utf8');
  return <StaticRenderer html={html} />;
}
`;
        fs.writeFileSync(p, newContent);
        console.log(`Fixed ${p}`);
      }
    }
  }
});
