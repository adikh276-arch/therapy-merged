import { X, Download, Trash2 } from "lucide-react";
import { EnergyLog, getLevelInfo } from "@/types/energy";
import { FACTORS } from "@/types/energy";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, ReferenceLine, Tooltip, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

interface Props {
  logs: EnergyLog[];
  onDelete: (id: string) => void;
  onClose: () => void;
}

export default function HistoryDrawer({ logs, onDelete, onClose }: Props) {
  // 14-day chart data
  const chartData = (() => {
    const days: { date: string; avg: number | undefined }[] = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toDateString();
      const dayLogs = logs.filter((l) => new Date(l.timestamp).toDateString() === dateStr);
      days.push({
        date: d.toLocaleDateString("en-US", { month: "numeric", day: "numeric" }),
        avg: dayLogs.length > 0 ? +(dayLogs.reduce((s, l) => s + l.level, 0) / dayLogs.length).toFixed(1) : undefined,
      });
    }
    return days;
  })();

  const exportData = () => {
    const blob = new Blob([JSON.stringify(logs, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "energy-history.json";
    a.click();
  };

  const getFactorLabel = (id: string) => FACTORS.find((f) => f.id === id)?.label ?? id;

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col animate-fade-in">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-card shadow-sm">
        <h2 className="font-sora text-base font-bold text-foreground">Energy History</h2>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground p-1 transition-colors">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-4 space-y-4">
        {/* 14-day chart */}
        <div className="bg-card rounded-lg border p-3">
          <p className="font-dm text-xs text-muted-foreground mb-2">14-day overview</p>
          <div className="h-28">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 2, right: 4, left: -28, bottom: 0 }}>
                <XAxis dataKey="date" tick={{ fontSize: 9, fontFamily: "DM Sans", fill: "#7A8FA6" }} axisLine={false} tickLine={false} interval={3} />
                <YAxis domain={[1, 5]} ticks={[1, 3, 5]} tick={{ fontSize: 9, fontFamily: "DM Sans", fill: "#7A8FA6" }} axisLine={false} tickLine={false} />
                <ReferenceLine y={3} stroke="#DDE3EC" strokeDasharray="4 3" strokeWidth={1} />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: "1px solid hsl(214 28% 88%)", fontFamily: "DM Sans", fontSize: 11 }}
                  formatter={(v: number) => [`${v}/5`, "Avg energy"]}
                />
                <Line type="monotone" dataKey="avg" stroke="#35AEF7" strokeWidth={2} dot={{ r: 3, fill: "#35AEF7", strokeWidth: 0 }} connectNulls={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Log list */}
        {logs.length === 0 ? (
          <p className="font-dm text-sm text-muted-foreground text-center py-8">No logs yet. Start tracking above!</p>
        ) : (
          <div className="space-y-2">
            {logs.map((log) => {
              const lvl = getLevelInfo(log.level);
              const time = new Date(log.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
              const date = new Date(log.timestamp).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
              return (
                <div
                  key={log.id}
                  className="flex items-start gap-3 bg-card rounded-lg border p-3 group transition-all"
                >
                  {/* Time */}
                  <div
                    className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-dm font-semibold"
                    style={{ backgroundColor: lvl.bgColor, color: lvl.color }}
                  >
                    {time}
                  </div>
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-base">{lvl.emoji}</span>
                      <span
                        className="font-dm text-sm font-semibold"
                        style={{ color: lvl.color }}
                      >
                        {lvl.label}
                      </span>
                      <span className="font-dm text-[10px] text-muted-foreground ml-auto">{date}</span>
                    </div>
                    {log.factors.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {log.factors.map((f) => (
                          <span key={f} className="font-dm text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded-full">
                            {getFactorLabel(f)}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  {/* Delete */}
                  <button
                    onClick={() => onDelete(log.id)}
                    className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all p-1 shrink-0"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <Button variant="outline" className="w-full font-dm" onClick={exportData}>
          <Download size={14} className="mr-1.5" />
          Export data
        </Button>
      </div>
    </div>
  );
}
