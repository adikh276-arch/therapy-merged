import { useMemo, useState } from 'react';
import { getSleepLogs, deleteSleepLog, getScoreColor, formatMinutes, QUALITY_EMOJIS, type SleepLog } from '@/lib/sleep';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Trash2 } from 'lucide-react';

interface HistoryDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDataChange: () => void;
}

const HistoryDrawer = ({ open, onOpenChange, onDataChange }: HistoryDrawerProps) => {
  const [logs, setLogs] = useState<SleepLog[]>([]);

  useMemo(() => {
    if (open) setLogs(getSleepLogs());
  }, [open]);

  const handleDelete = (id: string) => {
    deleteSleepLog(id);
    setLogs(getSleepLogs());
    onDataChange();
  };

  // 30-day heatmap
  const heatmapData = useMemo(() => {
    const cells: { date: string; score: number | null }[] = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const log = logs.find(l => l.date === dateStr);
      cells.push({ date: dateStr, score: log ? log.score : null });
    }
    return cells;
  }, [logs]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="font-sora">Sleep History</SheetTitle>
        </SheetHeader>

        {/* 30-day Heatmap */}
        <div className="mt-6">
          <p className="font-dm text-sm text-muted-foreground mb-2">Last 30 days</p>
          <div className="grid grid-cols-7 gap-1.5">
            {heatmapData.map((cell, i) => (
              <div
                key={i}
                className="aspect-square rounded-lg"
                style={{
                  backgroundColor: cell.score !== null
                    ? getScoreColor(cell.score)
                    : 'hsl(var(--muted))',
                  opacity: cell.score !== null ? 1 : 0.4,
                }}
                title={`${cell.date}: ${cell.score !== null ? cell.score + '/100' : 'No data'}`}
              />
            ))}
          </div>
        </div>

        {/* Log List */}
        <div className="mt-6 space-y-2">
          {logs.length === 0 && (
            <p className="text-center font-dm text-sm text-muted-foreground py-8">
              No sleep logs yet
            </p>
          )}
          {logs.map(log => (
            <div
              key={log.id}
              className="flex items-center gap-3 p-3 rounded-xl bg-secondary"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-sora text-sm font-bold text-primary-foreground shrink-0"
                style={{ backgroundColor: getScoreColor(log.score) }}
              >
                {log.score}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-dm text-sm font-medium text-foreground">{log.date}</p>
                <p className="font-dm text-xs text-muted-foreground">
                  {formatMinutes(log.totalMinutes)} · {QUALITY_EMOJIS[log.quality]}
                  {log.symptoms && log.symptoms.filter(s => s !== 'None').length > 0 && (
                    <span> · {log.symptoms.filter(s => s !== 'None').length} symptoms</span>
                  )}
                </p>
              </div>
              <button
                onClick={() => handleDelete(log.id)}
                className="p-2 text-muted-foreground hover:text-destructive transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Export */}
        {logs.length > 0 && (
          <button
            onClick={() => {
              const blob = new Blob([JSON.stringify(logs, null, 2)], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'sleep-logs.json';
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="mt-4 w-full py-3 rounded-xl bg-secondary text-foreground font-dm text-sm font-medium hover:bg-muted transition-colors"
          >
            Export Data
          </button>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default HistoryDrawer;
