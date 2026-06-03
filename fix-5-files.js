const fs = require('fs');
const path = require('path');

const activities = [
  { act: "diffusion-technique", emoji: "🫧", name: "Diffusion Technique", hint: "CBT technique" },
  { act: "doodle-burst", emoji: "🎨", name: "Doodle Burst", hint: "creative expression" },
  { act: "gratitude-tracker", emoji: "🙏", name: "Gratitude Tracker", hint: "gratitude practice" },
  { act: "what-are-your-habits", emoji: "🔄", name: "What Are Your Habits", hint: "habit reflection" },
  { act: "what-do-i-need", emoji: "💭", name: "What Do I Need", hint: "self-reflection" }
];

const androidUrl = "https://play.google.com/store/apps/details?id=org.mantracare.therapy";
const iosUrl = "https://apps.apple.com/pk/app/therapymantra/id1607643888";

for (const f of activities) {
  const filePath = path.join(__dirname, 'app', f.act, 'page.tsx');
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf8');

  const shareMsg = `I just completed "${f.name}" on TherapyMantra — a guided ${f.hint} that genuinely helped me. Try it! 🌿\\n\\n📱 Android: ${androidUrl}\\n🍎 iOS: ${iosUrl}`;

  // We are going to replace <PremiumComplete with <PremiumComplete shareEmoji="x" shareContent={`msg`}
  // To avoid replacing it multiple times if run twice, check first:
  if (!content.includes('shareEmoji')) {
    content = content.replace(/<PremiumComplete/g, `<PremiumComplete\n        shareEmoji="${f.emoji}"\n        shareContent={\`${shareMsg}\`}`);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Updated", f.act);
  } else {
    console.log("Skipped", f.act);
  }
}
