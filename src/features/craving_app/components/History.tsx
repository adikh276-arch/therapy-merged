import { useState, useMemo, useCallback, useRef } from 'react';
import type { CravingLog } from '@/lib/supabase';
import { supabase, setCurrentUser } from '@/lib/supabase';
import { Trash2, Download, ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
  logs: CravingLog[];
  userId: number;
  onDelete: (idx: number) => void;
  t: (s: string) => string;
}

export default function History({ logs, userId, onDelete, t }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [swipingIdx, setSwipingIdx] = useState<number | null>(null);
  const touchRef = useRef<{ startX: number; idx: number } | null>(null);

  const sorted = useMemo(() => [...logs].reverse(), [logs]);

  // 7-day trend
  const trend = useMemo(() => {
    const days: { day: string; avg: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      const dayLogs = logs.filter(l => l.timestamp.slice(0, 10) === key);
      days.push({
        day: d.toLocaleDateString('en', { weekday: 'short' }),
        avg: dayLogs.length ? Math.round(dayLogs.reduce((s, l) => s + l.intensity, 0) / dayLogs.length) : 0,
      });
    }
    return days;
  }, [logs]);

  const maxAvg = Math.max(...trend.map(d => d.avg), 1);

  const handleTouchStart = (e: React.TouchEvent, idx: number) => {
    touchRef.current = { startX: e.touches[0].clientX, idx };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchRef.current) return;
    const diff = touchRef.current.startX - e.changedTouches[0].clientX;
    if (diff > 80) setSwipingIdx(touchRef.current.idx);
    else setSwipingIdx(null);
    touchRef.current = null;
  };

  const handleDelete = useCallback(async (idx: number) => {
    const log = sorted[idx];
    if (!log?.id) { onDelete(logs.length - 1 - idx); return; }
    await setCurrentUser(userId);
    await supabase.from('craving_logs').delete().eq('id', log.id).eq('user_id', userId);
    onDelete(logs.length - 1 - idx);
    setSwipingIdx(null);
  }, [sorted, logs, userId, onDelete]);

  const exportData = () => {
    const csv = ['Timestamp,Intensity,Label,Outcome,Trigger,Notes']
      .concat(logs.map(l => `${l.timestamp},${l.intensity},${l.intensity_label},${l.outcome},${l.trigger || ''},${l.notes || ''}`))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'craving-history.csv';
    a.click();
  };

  const displayLogs = expanded ? sorted : sorted.slice(0, 5);

  return (
    <div className="card-calm space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-display text-lg font-semibold text-foreground">{t('History')}</h2>
        <button onClick={exportData} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
          <Download className="h-3.5 w-3.5" />
          {t('Export')}
        </button>
      </div>

      {/* 7-day trend */}
      <div>
        <p className="text-xs text-muted-foreground mb-2">{t('7-day intensity trend')}</p>
        <div className="flex items-end gap-1.5 h-16">
          {trend.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full rounded-t bg-primary/70 transition-all"
                style={{ height: `${(d.avg / maxAvg) * 48}px`, minHeight: d.avg ? '4px' : '0' }}
              />
              <span className="text-[10px] text-muted-foreground">{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Logs list */}
      <div className="space-y-2">
        {displayLogs.map((log, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-xl"
            onTouchStart={e => handleTouchStart(e, i)}
            onTouchEnd={handleTouchEnd}
          >
            <div className={`flex items-center justify-between bg-muted/40 px-3 py-2.5 rounded-xl transition-transform ${swipingIdx === i ? '-translate-x-16' : ''}`}>
              <div className="flex items-center gap-2">
                <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                  log.outcome === 'resisted' ? 'bg-calm-green-light text-calm-green' : 'bg-muted text-muted-foreground'
                }`}>
                  {log.intensity}
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {log.outcome === 'resisted' ? t('Resisted') : t('Smoked')}
                    <span className="ml-1.5 text-xs text-muted-foreground">{log.intensity_label}</span>
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {new Date(log.timestamp).toLocaleString('en', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
            {swipingIdx === i && (
              <button
                onClick={() => handleDelete(i)}
                className="absolute right-0 top-0 bottom-0 flex w-16 items-center justify-center bg-destructive text-destructive-foreground rounded-r-xl"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      {sorted.length > 5 && (
        <button
          onClick={() => setExpanded(e => !e)}
          className="flex w-full items-center justify-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          {expanded ? t('Show less') : t(`Show all ${sorted.length}`)}
        </button>
      )}
    </div>
  );
}
