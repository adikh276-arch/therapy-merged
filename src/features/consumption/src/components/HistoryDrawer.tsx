import { SmokeLog } from "@/hooks/useConsumptionData";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Trash2 } from "lucide-react";

interface HistoryDrawerProps {
  open: boolean;
  onClose: () => void;
  logs: SmokeLog[];
  onDelete: (id: string) => void;
  weekData: { label: string; count: number; isToday: boolean }[];
}

export default function HistoryDrawer({ open, onClose, logs, onDelete, weekData }: HistoryDrawerProps) {
  const maxCount = Math.max(...weekData.map((d) => d.count), 1);

  // Group logs by date, most recent first
  const grouped = [...logs].reverse().reduce<Record<string, SmokeLog[]>>((acc, log) => {
    const d = new Date(log.timestamp);
    const key = d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
    (acc[key] ??= []).push(log);
    return acc;
  }, {});

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl px-5 pt-3 pb-8 overflow-y-auto">
        <div className="w-10 h-1 rounded-full bg-muted mx-auto mb-4" />
        <SheetHeader className="mb-5">
          <SheetTitle className="text-left font-serif text-xl">History</SheetTitle>
        </SheetHeader>

        {/* Mini chart */}
        <div className="flex items-end justify-between gap-2 h-20 mb-6">
          {weekData.map((day, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex items-end justify-center h-14">
                <div
                  className={`w-full max-w-[24px] rounded-t-sm ${day.isToday ? "bg-primary" : "bg-primary/30"}`}
                  style={{ height: day.count > 0 ? `${Math.max(4, (day.count / maxCount) * 56)}px` : "2px" }}
                />
              </div>
              <span className="text-[10px] text-muted-foreground">{day.label}</span>
            </div>
          ))}
        </div>

        {/* Entries */}
        {Object.entries(grouped).map(([date, entries]) => (
          <div key={date} className="mb-5">
            <h4 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">{date}</h4>
            <div className="space-y-1">
              {entries.map((entry) => {
                const t = new Date(entry.timestamp);
                const time = t.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
                const details = [entry.location, entry.trigger, entry.mood].filter(Boolean).join(" • ");
                return (
                  <div key={entry.id} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-secondary/50 group transition-colors">
                    <div>
                      <span className="text-sm text-foreground font-medium">{time}</span>
                      {details && <span className="text-xs text-muted-foreground ml-2">{details}</span>}
                      {entry.notes && <p className="text-xs text-muted-foreground mt-0.5">{entry.notes}</p>}
                    </div>
                    <button
                      onClick={() => onDelete(entry.id)}
                      className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md text-destructive hover:bg-destructive/10 transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {logs.length === 0 && (
          <p className="text-sm text-muted-foreground text-center mt-8">No entries yet</p>
        )}
      </SheetContent>
    </Sheet>
  );
}
