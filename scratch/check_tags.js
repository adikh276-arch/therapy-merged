import fs from 'fs';

const content = fs.readFileSync('d:/Downloads/Therapy Merged/src/features/physical_activity_log/components/TrackActivitySection.tsx', 'utf8');

const tags = ['div', 'section', 'button', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'header', 'label', 'input', 'textarea', 'Popover', 'PopoverTrigger', 'PopoverContent', 'Button', 'Calendar', 'BarChart', 'LineChart', 'ResponsiveContainer', 'CartesianGrid', 'XAxis', 'YAxis', 'Tooltip', 'Bar', 'Line', 'Sparkles', 'Pencil', 'History', 'ChevronUp', 'ChevronDown', 'Trash2', 'CalendarIcon', 'motion.button'];

tags.forEach(tag => {
    const open = (content.match(new RegExp(`<${tag}(\\s|>)`, 'g')) || []).length;
    const close = (content.match(new RegExp(`</${tag}>`, 'g')) || []).length;
    const selfClose = (content.match(new RegExp(`<${tag}[^>]*/>`, 'g')) || []).length;
    
    if (open !== close + selfClose) {
        console.log(`Mismatch for ${tag}: open=${open}, close=${close}, selfClose=${selfClose}`);
    }
});
