import fs from 'fs';

const content = fs.readFileSync('d:/Downloads/Therapy Merged/src/features/physical_activity_log/components/TrackActivitySection.tsx', 'utf8');

const lines = content.split('\n');
let stack = [];

lines.forEach((line, index) => {
    const openMatches = line.matchAll(/<([a-zA-Z][a-zA-Z0-9\.]*)(\s|>)/g);
    for (const match of openMatches) {
        const tag = match[1];
        if (!line.includes(`</${tag}>`) && !match[0].includes('/>')) {
             stack.push({ tag, line: index + 1 });
        }
    }
    
    const closeMatches = line.matchAll(/<\/([a-zA-Z][a-zA-Z0-9\.]*)>/g);
    for (const match of closeMatches) {
        const tag = match[1];
        if (stack.length === 0) {
            console.log(`Extra closing tag </${tag}> at line ${index + 1}`);
        } else {
            const last = stack.pop();
            if (last.tag !== tag) {
                console.log(`Tag mismatch: opened <${last.tag}> at line ${last.line}, closed </${tag}> at line ${index + 1}`);
            }
        }
    }
});

stack.forEach(item => {
    console.log(`Unclosed tag <${item.tag}> at line ${item.line}`);
});
