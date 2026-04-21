import { useState } from "react";
import { EnergyLog, getLevelInfo, getLevelDotClass } from "@/types/energy";
import { cn } from "@/lib/utils";

interface Props {
  logs: EnergyLog[];
  avg: number;
}

interface Popup {
  log: EnergyLog;
  x: number;
}

export default function TodayTimeline({ logs, avg }: Props) {
  const [popup, setPopup] = useState<Popup | null>(null);

  const START_H = 6;  // 6 AM
  const END_H = 23;   // 11 PM
  const RANGE = END_H - START_H;

  const getXPercent = (ts: string) => {
    const d = new Date(ts);
    const hour = d.getHours() + d.getMinutes() / 60;
    const clamped = Math.max(START_H, Math.min(END_H, hour));
    return ((clamped - START_H) / RANGE) * 100;
  };

  const avgInfo = avg > 0 ? getLevelInfo(Math.round(avg)) : null;

  return (
    <div className="space-y-1 relative">
      <p className="font-dm text-xs text-muted-foreground">Today so far</p>

      {/* Timeline strip */}
      <div className="relative h-11 bg-muted rounded-md px-3 flex items-center">
        {/* Time labels */}
        <div className="absolute inset-x-3 top-1 flex justify-between pointer-events-none">
          {["6AM", "12PM", "6PM", "11PM"].map((t) => (
            <span key={t} className="font-dm text-[9px] text-muted-foreground">{t}</span>
          ))}
        </div>

        {/* Track line */}
        <div className="absolute inset-x-3 top-6 h-px bg-border" />

        {/* Dots */}
        {logs.map((log) => {
          const x = getXPercent(log.timestamp);
          const lvlInfo = getLevelInfo(log.level);
          return (
            <button
              key={log.id}
              onClick={(e) => {
                const rect = (e.target as HTMLElement).closest(".relative")!.getBoundingClientRect();
                setPopup(popup?.log.id === log.id ? null : { log, x });
              }}
              style={{ left: `calc(${x}% - 6px + 12px)` }}
              className={cn(
                "absolute top-4 w-3 h-3 rounded-full border-2 border-card transition-transform hover:scale-125",
                getLevelDotClass(log.level)
              )}
            />
          );
        })}
      </div>

      {/* Popup */}
      {popup && (() => {
        const lvl = getLevelInfo(popup.log.level);
        const time = new Date(popup.log.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        return (
          <div
            className="absolute z-20 bg-card border shadow-card-hover rounded-md p-2.5 text-xs font-dm animate-scale-in min-w-[140px]"
            style={{ left: `${Math.min(popup.x, 65)}%`, top: "calc(100% + 4px)" }}
          >
            <div className="flex items-center gap-1 font-semibold mb-1" style={{ color: lvl.color }}>
              {lvl.emoji} {lvl.label}
            </div>
            <div className="text-muted-foreground">{time}</div>
            {popup.log.factors.length > 0 && (
              <div className="text-muted-foreground mt-1 leading-relaxed">
                {popup.log.factors.join(", ")}
              </div>
            )}
          </div>
        );
      })()}

      {/* Summary */}
      <p className="font-dm text-[11px] text-muted-foreground">
        {logs.length} {logs.length === 1 ? "entry" : "entries"} today
        {avgInfo && (
          <span>
            {" "}| Average:{" "}
            <span style={{ color: avgInfo.color }} className="font-semibold">
              {avgInfo.emoji} {avgInfo.label}
            </span>
          </span>
        )}
      </p>
    </div>
  );
}
