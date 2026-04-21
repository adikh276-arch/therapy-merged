import { Zap, BarChart2, Lightbulb } from "lucide-react";

interface Props {
  todayCount: number;
  todayAvg: number;
  discoveriesCount: number;
}

export default function StatsRow({ todayCount, todayAvg, discoveriesCount }: Props) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {[
        { icon: <Zap size={14} className="text-primary" />, label: "Today", value: `${todayCount} log${todayCount !== 1 ? "s" : ""}` },
        { icon: <BarChart2 size={14} className="text-primary" />, label: "Avg level", value: todayAvg > 0 ? `${todayAvg}/5` : "—" },
        { icon: <Lightbulb size={14} className="text-primary" />, label: "Discoveries", value: String(discoveriesCount) },
      ].map((s) => (
        <div key={s.label} className="bg-card rounded-lg shadow-card p-3 flex flex-col gap-1 items-center text-center">
          <div className="flex items-center gap-1">
            {s.icon}
            <span className="font-dm text-[11px] text-muted-foreground">{s.label}</span>
          </div>
          <span className="font-sora text-sm font-bold text-foreground">{s.value}</span>
        </div>
      ))}
    </div>
  );
}
