import { useState, useMemo } from 'react';
import { Minus, Plus } from 'lucide-react';
import { MONTHS } from '@/lib/formatting';
import { LifetimeProfile } from '@/hooks/useSmokeLogs';

interface SetupModalProps {
  onSave: (profile: LifetimeProfile) => void;
  onSkip: () => void;
}

const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1970 + 1 }, (_, i) => currentYear - i);

const SetupModal = ({ onSave, onSkip }: SetupModalProps) => {
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(2010);
  const [avgPerDay, setAvgPerDay] = useState(10);
  const [perPack, setPerPack] = useState(20);
  const [costPerCig, setCostPerCig] = useState(14);

  const duration = useMemo(() => {
    const now = new Date();
    const start = new Date(year, month - 1, 1);
    let months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
    if (months < 0) months = 0;
    const y = Math.floor(months / 12);
    const m = months % 12;
    return y > 0 ? `${y} year${y > 1 ? 's' : ''}, ${m} month${m !== 1 ? 's' : ''}` : `${m} month${m !== 1 ? 's' : ''}`;
  }, [month, year]);

  const handleSave = () => {
    onSave({ startMonth: month, startYear: year, avgPerDay, perPack, costPerCig, profileSet: true });
  };

  return (
    <div className="fixed inset-0 z-[100] bg-card flex items-center justify-center">
      <div className="w-[90%] max-w-[380px] px-2 py-6 space-y-6">
        <div className="text-center">
          <h2 className="font-heading text-lg font-bold text-foreground">Quick setup</h2>
          <p className="font-body text-[13px] text-muted-foreground mt-1">This helps us show meaningful impact</p>
        </div>

        {/* Field 1: Smoking since */}
        <div className="space-y-2">
          <label className="font-body text-[13px] font-medium text-foreground">I've smoked since</label>
          <div className="flex gap-2">
            <select
              value={month}
              onChange={e => setMonth(Number(e.target.value))}
              className="flex-1 bg-input border border-border rounded-xl px-3 py-3 font-body text-sm text-foreground focus:border-primary focus:bg-card outline-none transition-colors"
            >
              {MONTHS.map((m, i) => (
                <option key={m} value={i + 1}>{m}</option>
              ))}
            </select>
            <select
              value={year}
              onChange={e => setYear(Number(e.target.value))}
              className="flex-1 bg-input border border-border rounded-xl px-3 py-3 font-body text-sm text-foreground focus:border-primary focus:bg-card outline-none transition-colors"
            >
              {years.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
          <p className="font-body text-[13px] text-primary">Duration: {duration}</p>
        </div>

        {/* Field 2: Avg per day */}
        <div className="space-y-2">
          <label className="font-body text-[13px] font-medium text-foreground">Average cigarettes per day (before quitting)</label>
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => setAvgPerDay(Math.max(1, avgPerDay - 1))}
              className="w-10 h-10 rounded-full bg-input border border-border flex items-center justify-center tap-scale"
            >
              <Minus size={20} className="text-muted-foreground" />
            </button>
            <span className="font-heading text-[32px] font-bold text-primary w-16 text-center">{avgPerDay}</span>
            <button
              onClick={() => setAvgPerDay(Math.min(60, avgPerDay + 1))}
              className="w-10 h-10 rounded-full bg-primary flex items-center justify-center tap-scale"
            >
              <Plus size={20} className="text-primary-foreground" />
            </button>
          </div>
          <p className="font-body text-[11px] text-muted-foreground text-center">Your typical daily average</p>
        </div>

        {/* Field 3: Per pack */}
        <div className="space-y-2">
          <label className="font-body text-[13px] font-medium text-foreground">Cigarettes per pack</label>
          <div className="flex gap-2">
            {[10, 20].map(n => (
              <button
                key={n}
                onClick={() => setPerPack(n)}
                className={`flex-1 h-11 rounded-[22px] font-heading text-base font-bold tap-scale transition-colors ${
                  perPack === n
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-input border border-border text-muted-foreground'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Field 4: Cost */}
        <div className="space-y-2">
          <label className="font-body text-[13px] font-medium text-foreground">Approximate cost per cigarette</label>
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => setCostPerCig(Math.max(1, costPerCig - 1))}
              className="w-10 h-10 rounded-full bg-input border border-border flex items-center justify-center tap-scale"
            >
              <Minus size={20} className="text-muted-foreground" />
            </button>
            <span className="font-heading text-[32px] font-bold text-primary w-16 text-center">{costPerCig}</span>
            <button
              onClick={() => setCostPerCig(Math.min(30, costPerCig + 1))}
              className="w-10 h-10 rounded-full bg-primary flex items-center justify-center tap-scale"
            >
              <Plus size={20} className="text-primary-foreground" />
            </button>
          </div>
          <p className="font-body text-[11px] text-muted-foreground text-center">Average in India: ₹14-18 per cigarette</p>
        </div>

        <button
          onClick={handleSave}
          className="w-full h-[52px] bg-primary text-primary-foreground font-heading text-[15px] font-semibold rounded-[14px] tap-scale"
        >
          Done
        </button>
        <button
          onClick={onSkip}
          className="w-full font-body text-[13px] text-muted-foreground text-center"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
};

export default SetupModal;
