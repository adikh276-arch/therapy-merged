const fs = require('fs');
const path = require('path');
const https = require('https');

let API_KEY = process.env.TRANSLATE_API_KEY;
if(!API_KEY && fs.existsSync('.env')) {
    const envFile = fs.readFileSync('.env', 'utf8');
    const match = envFile.match(/TRANSLATE_API_KEY=(.+)/);
    if(match) API_KEY = match[1].trim();
}

const langs = ["es","fr","de","hi","ja","zh","ko","ru","it","pt","ar","tr","nl","pl","vi","th","sv","id","fil"];
const localesDir = path.join(__dirname, '../i18n/locales');
if (!fs.existsSync(localesDir)) fs.mkdirSync(localesDir, { recursive: true });

async function translateText(text, targetLang) {
    if (!API_KEY || API_KEY==='your_google_translate_api_key' || !text) return `[${targetLang}] ${text}`;
    return new Promise((resolve) => {
        const body = JSON.stringify({ q: text, target: targetLang, format: "html" });
        const req = https.request({
            hostname: 'translation.googleapis.com',
            path: `/language/translate/v2?key=${API_KEY}`,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    if (parsed.data && parsed.data.translations) resolve(parsed.data.translations[0].translatedText);
                    else resolve(`[${targetLang}] ${text}`);
                } catch(e) { resolve(`[${targetLang}] ${text}`); }
            });
        });
        req.on('error', () => resolve(`[${targetLang}] ${text}`));
        req.write(body);
        req.end();
    });
}

function chunkArray(arr, size) {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
    }
    return chunks;
}

async function run() {
    const enFile = path.join(localesDir, 'en.json');
    if (!fs.existsSync(enFile)) return;
    const enData = JSON.parse(fs.readFileSync(enFile, 'utf8'));
    const keys = Object.keys(enData);
    
    // We process languages sequentially to avoid blasting
    for (const lang of langs) {
        console.log(`Translating to ${lang}...`);
        const langData = {};
        const langFile = path.join(localesDir, `${lang}.json`);
        
        const chunks = chunkArray(keys, 20); // 20 keys concurrently max
        for (const chunk of chunks) {
            await Promise.all(chunk.map(async (key) => {
                langData[key] = await translateText(enData[key], lang);
            }));
        }
        fs.writeFileSync(langFile, JSON.stringify(langData, null, 2));
    }
    console.log("Translation complete.");
}
run();
