import StaticRenderer from '@/components/StaticRenderer';
import fs from 'fs';
import path from 'path';

export default function Page() {
  const filePath = path.join(process.cwd(), 'app/sexuality-articles/index.html');
  const html = fs.readFileSync(filePath, 'utf8');
  return <StaticRenderer html={html} />;
}
