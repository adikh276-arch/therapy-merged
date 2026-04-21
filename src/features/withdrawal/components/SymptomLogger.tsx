import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { addWithdrawalLog, getWithdrawalLogs, type WithdrawalLog } from '@/lib/storage';
import { ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';

const PHYSICAL = ['Headache', 'Nausea', 'Fatigue', 'Sweating', 'Tremors', 'Cough', 'Other'];
const MENTAL = ['Cravings', 'Irritability', 'Anxiety', 'Low mood', 'Restlessness'];
const SLEEP = ['Insomnia', 'Night sweats', 'Vivid dreams'];
const COPING = ['Breathing', 'Hydration', 'Exercise', 'NRT', 'Medication', 'Distraction'];

function getSeverityLabel(v: number) {
  if (v <= 3) return 'Mild';
  if (v <= 6) return 'Moderate';
  if (v <= 8) return 'Significant';
  return 'Severe';
}

function getSeverityColor(v: number) {
  if (v <= 3) return 'bg-accent text-accent-foreground';
  if (v <= 6) return 'bg-primary text-primary-foreground';
  if (v <= 8) return 'bg-orange-400 text-white';
  return 'bg-destructive text-destructive-foreground';
}

interface SymptomLoggerProps {
  onLogged: () => void;
  onViewAll: () => void;
}

const SymptomLogger = ({ onLogged, onViewAll }: SymptomLoggerProps) => {
  const [severity, setSeverity] = useState(3);
  const [showDetail, setShowDetail] = useState(false);
  const [physical, setPhysical] = useState<string[]>([]);
  const [mental, setMental] = useState<string[]>([]);
  const [sleep, setSleep] = useState<string[]>([]);
  const [coping, setCoping] = useState<string[]>([]);

  const toggle = (arr: string[], set: (a: string[]) => void, val: string) => {
    set(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]);
  };

  const logs = getWithdrawalLogs().slice(0, 5);

  const handleLog = () => {
    const log: WithdrawalLog = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      severity,
      physicalSymptoms: physical,
      mentalSymptoms: mental,
      sleepSymptoms: sleep,
      copingMethods: coping,
    };
    addWithdrawalLog(log);
    setSeverity(3);
    setPhysical([]);
    setMental([]);
    setSleep([]);
    setCoping([]);
    setShowDetail(false);
    onLogged();
  };

  const formatTime = (ts: string) => {
    const d = new Date(ts);
    return d.toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  };

  const topSymptoms = (log: WithdrawalLog) => {
    return [...log.physicalSymptoms, ...log.mentalSymptoms, ...log.sleepSymptoms].slice(0, 2);
  };

  return (
    <div className="mx-4 mt-4 space-y-4">
      <div className="bg-card rounded-2xl p-5">
        <h3 className="font-heading text-base font-bold text-foreground">Log symptoms (optional)</h3>
        <p className="font-body text-xs text-health-muted mt-1 mb-4">
          Tracking is optional — your timeline progresses automatically
        </p>

        {/* Severity slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-body text-sm text-foreground">Severity</span>
            <span className={`font-body text-xs px-2 py-0.5 rounded-full ${getSeverityColor(severity)}`}>
              {severity}/10 · {getSeverityLabel(severity)}
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={10}
            value={severity}
            onChange={e => setSeverity(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none bg-health-track cursor-pointer accent-primary"
          />
        </div>

        {severity >= 9 && (
          <div className="mt-3 bg-health-warning rounded-lg p-3 flex gap-2 items-start">
            <AlertTriangle size={16} className="text-orange-500 flex-shrink-0 mt-0.5" />
            <p className="font-body text-xs text-health-warning-text">
              At this level, contact your EAP helpline or physician.
            </p>
          </div>
        )}

        {/* Detail toggle */}
        <button
          onClick={() => setShowDetail(!showDetail)}
          className="mt-3 flex items-center gap-1 text-primary text-sm font-body hover:underline"
        >
          {showDetail ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {showDetail ? 'Hide details' : 'Add detail'}
        </button>

        {showDetail && (
          <div className="mt-3 space-y-3">
            <ChipGroup label="Physical" items={PHYSICAL} selected={physical} onToggle={v => toggle(physical, setPhysical, v)} />
            <ChipGroup label="Mental" items={MENTAL} selected={mental} onToggle={v => toggle(mental, setMental, v)} />
            <ChipGroup label="Sleep" items={SLEEP} selected={sleep} onToggle={v => toggle(sleep, setSleep, v)} />
            <ChipGroup label="Coping" items={COPING} selected={coping} onToggle={v => toggle(coping, setCoping, v)} />
          </div>
        )}

        <Button className="w-full mt-4" onClick={handleLog}>Log</Button>
      </div>

      {/* Recent logs */}
      {logs.length > 0 && (
        <div className="bg-card rounded-2xl p-5">
          <h4 className="font-heading text-sm font-semibold text-foreground mb-3">Recent logs</h4>
          <div className="space-y-2">
            {logs.map(log => (
              <div key={log.id} className="flex items-center gap-3 py-2 border-b border-health-line last:border-0">
                <span className="font-body text-[11px] text-health-muted w-24 flex-shrink-0">{formatTime(log.timestamp)}</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-body ${getSeverityColor(log.severity)}`}>
                  {log.severity}/10
                </span>
                <div className="flex gap-1 flex-wrap">
                  {topSymptoms(log).map(s => (
                    <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-body">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button onClick={onViewAll} className="mt-3 text-primary text-xs font-body hover:underline">View all</button>
        </div>
      )}
    </div>
  );
};

function ChipGroup({ label, items, selected, onToggle }: { label: string; items: string[]; selected: string[]; onToggle: (v: string) => void }) {
  return (
    <div>
      <span className="font-body text-xs text-health-muted font-medium">{label}</span>
      <div className="flex flex-wrap gap-1.5 mt-1">
        {items.map(item => (
          <button
            key={item}
            onClick={() => onToggle(item)}
            className={`px-2.5 py-1 rounded-full text-xs font-body transition-colors ${
              selected.includes(item)
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SymptomLogger;
