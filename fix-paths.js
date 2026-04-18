
const fs = require('fs');
const path = require('path');

const root = 'app';

function fixPaths(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            fixPaths(fullPath);
        } else if (file === 'page.tsx') {
            let content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes('app/therapy/')) {
                content = content.split('app/therapy/').join('app/');
                fs.writeFileSync(fullPath, content);
                console.log(`Fixed path in ${fullPath}`);
            }
        }
    }
}

console.log('Fixing paths in page.tsx files...');
fixPaths(root);

console.log('Fix complete.');
