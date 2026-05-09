const fs = require('fs');
const path = require('path');
const vm = require('vm');

/**
 * Standardized Resource Sync Script
 * 
 * This script synchronizes resource data from the static mini-apps in 
 * public/static/content/ into the central src/features/resources/data/sample_data.json.
 * 
 * Usage: node scripts/sync_resources.cjs
 */

const sampleDataPath = path.resolve('src/features/resources/data/sample_data.json');
const staticContentPath = path.resolve('public/static/content');

if (!fs.existsSync(sampleDataPath)) {
  console.error('Error: sample_data.json not found at', sampleDataPath);
  process.exit(1);
}

const sampleData = JSON.parse(fs.readFileSync(sampleDataPath, 'utf8'));
const directories = fs.readdirSync(staticContentPath).filter(d => fs.statSync(path.join(staticContentPath, d)).isDirectory());
const types = ['tips', 'articles', 'stories', 'myths'];

console.log('Starting resource synchronization...');

directories.forEach(dirName => {
  let resourceType = null;
  let concern = null;
  
  for (const t of types) {
    if (dirName.endsWith('_' + t)) {
      resourceType = t;
      concern = dirName.slice(0, -(t.length + 1));
      break;
    }
  }
  
  if (!resourceType) return;
  
  const concernNormalized = concern.replace(/_/g, '-');
  const indexPath = path.join(staticContentPath, dirName, 'index.html');
  if (!fs.existsSync(indexPath)) return;
  
  const html = fs.readFileSync(indexPath, 'utf8');
  const scriptRegex = /<script>([\s\S]*?)<\/script>/gi;
  let scriptContent = "";
  let match;
  while ((match = scriptRegex.exec(html)) !== null) {
    scriptContent += match[1] + "\n";
  }
  
  if (!scriptContent) return;
  
  // Inject capture logic
  scriptContent += `\n
    if (typeof tips !== 'undefined') this.tips = tips;
    if (typeof articles !== 'undefined') this.articles = articles;
    if (typeof stories !== 'undefined') this.stories = stories;
    if (typeof myths !== 'undefined') this.myths = myths;
  `;
  
  try {
    const sandbox = {
      console: { log: () => {}, warn: () => {}, error: () => {} },
      document: {
        getElementById: () => ({ style: {}, innerHTML: '', appendChild: () => {}, classList: { add: () => {}, remove: () => {} } }),
        createElement: () => ({ style: {}, innerHTML: '', classList: { add: () => {}, remove: () => {} } }),
        querySelectorAll: () => []
      },
      window: { scrollTo: () => {} },
      setTimeout: () => {},
      setInterval: () => {}
    };
    
    vm.createContext(sandbox);
    vm.runInContext(scriptContent, sandbox);
    
    const items = sandbox[resourceType];
    if (!Array.isArray(items)) return;

    const existingItems = sampleData[resourceType] || [];
    
    items.forEach((newItem, index) => {
      const targetId = `${concernNormalized}-${resourceType.slice(0, -1)}-${index}`;
      let targetIndex = existingItems.findIndex(item => item.id === targetId);
      
      if (targetIndex === -1) {
         const concernItems = existingItems.filter(item => item.concern === concernNormalized);
         if (index < concernItems.length) {
           targetIndex = existingItems.indexOf(concernItems[index]);
         }
      }

      if (targetIndex !== -1) {
        const target = existingItems[targetIndex];
        
        // Generic mapping based on available fields
        if (resourceType === 'tips') {
          target.title = newItem.title || target.title;
          target.preview = newItem.text || newItem.preview || target.preview;
          target.whyItHelps = newItem.text || newItem.whyItHelps || target.whyItHelps;
          if (newItem.icon) target.icon = newItem.icon;
        } else if (resourceType === 'stories') {
          target.name = newItem.name || target.name;
          target.age = newItem.age || target.age;
          target.identity = newItem.identity || target.identity;
          target.quote = newItem.quote || target.quote;
          target.story = Array.isArray(newItem.story) ? newItem.story : (newItem.story ? [newItem.story] : target.story);
          target.highlight = newItem.highlight || target.highlight;
          target.takeaway = newItem.takeaway || target.takeaway;
          target.avatarUrl = newItem.avatar_url || newItem.avatarUrl || target.avatarUrl;
          target.portraitUrl = newItem.portrait_url || newItem.portraitUrl || target.portraitUrl;
          
          // Improved Title and Preview for stories
          if (target.name) {
            target.title = `${target.name}'s Story`;
          }
          if (target.quote) {
            target.preview = target.quote.length > 100 ? target.quote.substring(0, 97) + '...' : target.quote;
          }
        } else if (resourceType === 'articles') {
          target.title = newItem.title || target.title;
          target.tag = newItem.tag || target.tag;
          target.readTime = newItem.readTime || target.readTime;
          target.deck = newItem.deck || target.deck;
          target.body = newItem.body || target.body;
          target.takeaway = newItem.takeaway || target.takeaway;
          target.preview = newItem.desc || newItem.preview || target.preview;
        } else if (resourceType === 'myths') {
          target.myth = newItem.myth || target.myth;
          target.truth = newItem.fact || newItem.truth || target.truth;
          target.explanation = newItem.content || newItem.explanation || target.explanation;
          target.takeaway = newItem.takeaway || target.takeaway;
          if (target.myth) {
            target.title = `Myth: ${target.myth}`;
          }
          if (target.truth) {
            target.preview = target.truth.length > 100 ? target.truth.substring(0, 97) + '...' : target.truth;
          }
        }
      } else {
        // Option to add new items if placeholder not found
        // For now, we only sync to existing placeholders to prevent bloating sample_data
      }
    });
    console.log(`Synced ${dirName}`);

  } catch (err) {
    console.error(`Error processing ${dirName}:`, err.message);
  }
});

fs.writeFileSync(sampleDataPath, JSON.stringify(sampleData, null, 2), 'utf8');
console.log('Resource synchronization complete!');
