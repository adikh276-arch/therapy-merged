const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

let modified = 0;
walkDir(path.join(__dirname, 'app'), (filePath) => {
  if (filePath.endsWith('.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    // Match shareEmoji="..." or shareEmoji='...' or shareEmoji={...} that just contain empty or invisible chars
    // But since the user wants to fallback to the main icon for *all* activities, 
    // it's safest to just strip the shareEmoji prop completely wherever it's used with PremiumComplete.
    // It looks like `shareEmoji="..."`
    const regex = /\s+shareEmoji=(['"]).*?\1/g;
    if (regex.test(content)) {
      content = content.replace(regex, '');
      fs.writeFileSync(filePath, content, 'utf8');
      modified++;
    }
    // Also handle shareEmoji={""} or similar if they exist
    const regex2 = /\s+shareEmoji=\{.*?\}/g;
    if (regex2.test(content)) {
      content = content.replace(regex2, '');
      fs.writeFileSync(filePath, content, 'utf8');
      modified++;
    }
  }
});

console.log(`Modified ${modified} files.`);
