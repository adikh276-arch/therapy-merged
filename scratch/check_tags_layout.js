import fs from 'fs';

const content = fs.readFileSync('d:/Downloads/Therapy Merged/src/components/shared/PremiumLayout.tsx', 'utf8');

const tags = ['div', 'button', 'span', 'p', 'h1', 'header', 'main'];

tags.forEach(tag => {
    const open = (content.match(new RegExp(`<${tag}(\\s|>)`, 'g')) || []).length;
    const close = (content.match(new RegExp(`</${tag}>`, 'g')) || []).length;
    const selfClose = (content.match(new RegExp(`<${tag}[^>]*/>`, 'g')) || []).length;
    
    if (open !== close + selfClose) {
        console.log(`Mismatch for ${tag}: open=${open}, close=${close}, selfClose=${selfClose}`);
    }
});
