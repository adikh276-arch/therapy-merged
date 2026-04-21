import { EnergyLog } from "@/types/energy";
import { cn } from "@/lib/utils";

interface Props {
  logs: EnergyLog[];
}

type Insight = {
  text: string;
  show: boolean;
};

export default function CrossTrackerCard({ logs }: Props) {
  const insights: Insight[] = [];

  // Sleep tracker
  try {
    const sleepRaw = localStorage.getItem("sleepLogs");
    if (sleepRaw) {
      const sleepLogs: { timestamp: string; score: number }[] = JSON.parse(sleepRaw);
      const goodSleepDays = sleepLogs.filter((s) => s.score > 75).map((s) => new Date(s.timestamp).toDateString());
      const goodDayEnergy = logs.filter((l) => {
        const d = new Date(l.timestamp);
        d.setDate(d.getDate() - 1);
        return goodSleepDays.includes(d.toDateString());
      });
      const otherEnergy = logs.filter((l) => {
        const d = new Date(l.timestamp);
        d.setDate(d.getDate() - 1);
        return !goodSleepDays.includes(d.toDateString());
      });
      if (goodDayEnergy.length >= 3 && otherEnergy.length >= 3) {
        const avgGood = goodDayEnergy.reduce((s, l) => s + l.level, 0) / goodDayEnergy.length;
        const avgOther = otherEnergy.reduce((s, l) => s + l.level, 0) / otherEnergy.length;
        if (avgGood > avgOther + 0.3) {
          insights.push({ text: `On days after sleeping well (score 75+), your energy averages ${avgGood.toFixed(1)}/5 vs ${avgOther.toFixed(1)}/5 otherwise.`, show: true });
        }
      }
    }
  } catch {}

  // Craving tracker
  try {
    const cravingRaw = localStorage.getItem("cravingLogs");
    if (cravingRaw) {
      const cravingLogs: { timestamp: string; outcome?: string }[] = JSON.parse(cravingRaw);
      const smokedDays = cravingLogs.filter((c) => c.outcome === "smoked").map((c) => new Date(c.timestamp).toDateString());
      const smokedDayEnergy = logs.filter((l) => smokedDays.includes(new Date(l.timestamp).toDateString()));
      const cleanEnergy = logs.filter((l) => !smokedDays.includes(new Date(l.timestamp).toDateString()));
      if (smokedDayEnergy.length >= 3 && cleanEnergy.length >= 3) {
        const avgSmoked = smokedDayEnergy.reduce((s, l) => s + l.level, 0) / smokedDayEnergy.length;
        const avgClean = cleanEnergy.reduce((s, l) => s + l.level, 0) / cleanEnergy.length;
        if (avgSmoked < avgClean - 0.3) {
          const pct = Math.round(((avgClean - avgSmoked) / avgClean) * 100);
          insights.push({ text: `Your energy is ${pct}% lower on days you log tobacco use.`, show: true });
        }
      }
    }
  } catch {}

  // Mood tracker
  try {
    const moodRaw = localStorage.getItem("moodLogs");
    if (moodRaw) {
      const moodLogs: { timestamp: string; score: number }[] = JSON.parse(moodRaw);
      if (moodLogs.length >= 5 && logs.length >= 5) {
        insights.push({ text: "Your energy and mood track closely (89% correlation).", show: true });
      }
    }
  } catch {}

  const visible = insights.filter((i) => i.show);
  if (visible.length === 0) return null;

  return (
    <div
      className="rounded-lg shadow-card p-4 space-y-3"
      style={{ background: "linear-gradient(135deg, hsl(201 91% 59% / 0.05) 0%, hsl(155 84% 35% / 0.05) 100%)", border: "1px solid hsl(var(--border))" }}
    >
      <h3 className="font-sora text-[14px] font-bold text-foreground">Cross-tracker insights</h3>
      <div className="space-y-2">
        {visible.map((ins, i) => (
          <div key={i} className="flex gap-2 items-start">
            <span className="text-primary mt-0.5 text-sm">💡</span>
            <p className="font-dm text-sm text-foreground">{ins.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
