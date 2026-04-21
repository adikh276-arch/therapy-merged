import { useState } from 'react';
import { getLogs, deleteLog, getResisted, getRestraintRate } from '@/lib/cravingData';
import type { CravingLog } from '@/lib/cravingData';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Check, Trash2, Download, History } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HistoryDrawerProps {
  open: boolean;
  onClose: () => void;
  onChanged: () => void;
}

const HistoryDrawer = ({ open, onClose, onChanged }: HistoryDrawerProps) => {
  const [, setRefresh] = useState(0);
  const logs = getLogs();
  const resisted = getResisted();
  const rate = getRestraintRate();

  // 7-day chart data
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toDateString();
    const dayLogs = logs.filter(l => new Date(l.timestamp).toDateString() === dateStr);
    const avg = dayLogs.length > 0 ? dayLogs.reduce((a, c) => a + c.intensity, 0) / dayLogs.length : 0;
    return {
      day: d.toLocaleDateString('en', { weekday: 'short' }),
      intensity: Math.round(avg * 10) / 10,
    };
  });

  const handleDelete = async (id: string) => {
    await deleteLog(id);
    setRefresh(r => r + 1);
    onChanged();
  };

  const handleExport = () => {
    const csv = [
      'Timestamp,Intensity,Label,Outcome,Trigger,Location,Quantity,Notes',
      ...logs.map(l => `${l.timestamp},${l.intensity},${l.intensityLabel},${l.outcome},${l.trigger || ''},${l.location || ''},${l.quantity || ''},${l.notes || ''}`),
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'craving-logs.csv';
    a.click();
  };

  const formatTime = (ts: string) => {
    const d = new Date(ts);
    return d.toLocaleDateString('en', { month: 'short', day: 'numeric' }) + ' ' + d.toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' });
  };

  const intensityColor = (intensity: number) => {
    if (intensity <= 2) return 'text-teal';
    if (intensity <= 6) return 'text-lavender';
    if (intensity <= 8) return 'text-sunshine';
    return 'text-coral';
  };

  return (
    <Sheet open={open} onOpenChange={v => !v && onClose()}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto bg-background p-0 border-l border-border/50 shadow-2xl">
        <SheetHeader className="p-6 border-b border-border/10">
          <SheetTitle className="flex items-center gap-3 font-bold text-xl">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <History size={20} />
            </div>
            Craving History
          </SheetTitle>
        </SheetHeader>

        <div className="p-6 space-y-8">
          {/* Resistance Summary */}
          <div className="rounded-3xl bg-teal/5 border border-teal/10 p-6 text-center animate-slide-up">
            <div className="text-3xl font-black text-teal mb-1">{resisted}</div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-relaxed">
              Cigarettes not smoked<br />
              <span className="text-[10px] opacity-60 italic">{rate}% restraint rate</span>
            </p>
          </div>

          {/* 7-day chart */}
          {logs.length > 0 && (
            <div className="space-y-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">7-Day Intensity Baseline</h3>
              <div className="h-[180px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={last7Days}>
                    <CartesianGrid stroke="hsl(var(--muted))" strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))', fontWeight: 600 }} dy={10} />
                    <YAxis domain={[0, 10]} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))', fontWeight: 600 }} dx={-10} />
                    <ReferenceLine y={5} stroke="hsl(var(--muted-foreground))" strokeDasharray="4 4" opacity={0.3} />
                    <Line type="monotone" dataKey="intensity" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ fill: 'white', stroke: 'hsl(var(--primary))', strokeWidth: 2, r: 5 }} activeDot={{ r: 7, strokeWidth: 0 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Log list */}
          <div className="space-y-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Recent Activity</h3>
            <div className="space-y-3">
              {logs.map(log => (
                <div key={log.id} className="group relative rounded-2xl bg-muted/30 border border-transparent hover:border-border/50 hover:bg-muted/50 p-4 transition-all pr-12">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-60">{formatTime(log.timestamp)}</span>
                    <span className={cn("text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md bg-white border border-border/20 shadow-sm", intensityColor(log.intensity))}>
                      {log.intensity}/10
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                      log.outcome === 'resisted' ? "bg-teal/10 text-teal" : "bg-accent/10 text-accent"
                    )}>
                      {log.outcome === 'resisted' ? <Check size={16} /> : <div className="w-1.5 h-1.5 rounded-full bg-accent" />}
                    </div>
                    <div className="font-medium text-sm text-foreground">
                      {log.outcome === 'resisted' ? 'Successfully resisted' : 'Gave in to craving'}
                      {log.trigger && <span className="block text-[11px] text-muted-foreground mt-0.5 italic">Triggered by {log.trigger.toLowerCase()}</span>}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(log.id)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {logs.length > 0 && (
            <Button variant="outline" onClick={handleExport} className="w-full h-12 rounded-2xl border-dashed border-2 gap-2 text-muted-foreground hover:text-foreground">
              <Download size={16} /> Export Logs (.csv)
            </Button>
          )}

          {logs.length === 0 && (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto grayscale opacity-50">
                <History size={32} />
              </div>
              <p className="text-sm font-medium text-muted-foreground">Your history is currently empty</p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default HistoryDrawer;
