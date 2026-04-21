import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Check, Trash2 } from 'lucide-react';
import { getWithdrawalLogs, deleteWithdrawalLog, type WithdrawalLog } from '@/lib/storage';
import { getReachedMilestones, formatDateReached } from '@/lib/milestones';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { useState } from 'react';

interface HistoryDrawerProps {
  open: boolean;
  onClose: () => void;
  quitDate: string;
}

function getSeverityColor(v: number) {
  if (v <= 3) return 'bg-accent text-accent-foreground';
  if (v <= 6) return 'bg-primary text-primary-foreground';
  if (v <= 8) return 'bg-orange-400 text-white';
  return 'bg-destructive text-destructive-foreground';
}

const HistoryDrawer = ({ open, onClose, quitDate }: HistoryDrawerProps) => {
  const [, setRefresh] = useState(0);
  const logs = getWithdrawalLogs();
  const reached = getReachedMilestones(quitDate);

  const chartData = logs
    .slice(0, 14)
    .reverse()
    .map(l => ({
      date: new Date(l.timestamp).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
      severity: l.severity,
    }));

  const trending = chartData.length >= 2 && chartData[chartData.length - 1].severity < chartData[0].severity;

  const handleDelete = (id: string) => {
    deleteWithdrawalLog(id);
    setRefresh(r => r + 1);
  };

  const topSymptoms = (log: WithdrawalLog) => {
    return [...log.physicalSymptoms, ...log.mentalSymptoms, ...log.sleepSymptoms].slice(0, 2);
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="overflow-y-auto w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-heading">Recovery History</SheetTitle>
        </SheetHeader>

        {/* Milestones reached */}
        <div className="mt-6">
          <h4 className="font-heading text-sm font-semibold text-foreground mb-3">Milestones reached</h4>
          {reached.length === 0 ? (
            <p className="font-body text-sm text-health-muted">No milestones yet — keep going!</p>
          ) : (
            <div className="space-y-2">
              {reached.map(m => (
                <div key={m.id} className="flex items-center gap-2">
                  <Check size={14} className="text-accent" />
                  <span className="font-body text-sm text-foreground flex-1">{m.description}</span>
                  <span className="font-body text-[11px] text-health-muted">{formatDateReached(m.minutes, quitDate)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Chart */}
        {chartData.length >= 2 && (
          <div className="mt-6">
            <h4 className="font-heading text-sm font-semibold text-foreground mb-2">Symptom trend (14 days)</h4>
            {trending && <p className="font-body text-xs text-accent mb-2">Symptoms decreasing ↓</p>}
            <ResponsiveContainer width="100%" height={120}>
              <LineChart data={chartData}>
                <XAxis dataKey="date" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                <YAxis domain={[0, 10]} tick={{ fontSize: 10 }} tickLine={false} axisLine={false} width={20} />
                <Tooltip />
                <Line type="monotone" dataKey="severity" stroke="hsl(201 93% 59%)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* All logs */}
        <div className="mt-6">
          <h4 className="font-heading text-sm font-semibold text-foreground mb-3">All symptom logs</h4>
          {logs.length === 0 ? (
            <p className="font-body text-sm text-health-muted">No logs yet.</p>
          ) : (
            <div className="space-y-2">
              {logs.map(log => (
                <div key={log.id} className="flex items-center gap-2 py-2 border-b border-health-line last:border-0">
                  <span className="font-body text-[11px] text-health-muted w-20 flex-shrink-0">
                    {new Date(log.timestamp).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-body ${getSeverityColor(log.severity)}`}>
                    {log.severity}
                  </span>
                  <div className="flex gap-1 flex-1 flex-wrap">
                    {topSymptoms(log).map(s => (
                      <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-body">{s}</span>
                    ))}
                  </div>
                  <button onClick={() => handleDelete(log.id)} className="p-1 text-health-muted hover:text-destructive">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default HistoryDrawer;
