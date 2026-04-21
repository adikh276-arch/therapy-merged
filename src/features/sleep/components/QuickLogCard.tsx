import { useState, useMemo } from 'react';
import {
  calculateDurationMinutes,
  formatMinutes,
  calculateScore,
  saveSleepLog,
  getTodayStr,
  QUALITY_EMOJIS,
  QUALITY_LABELS,
  SYMPTOM_OPTIONS,
  type SleepLog,
} from '@/lib/sleep';

interface QuickLogCardProps {
  onLogged: (log: SleepLog) => void;
  existingLog?: SleepLog | null;
}

const qualityStyles: Record<number, { bg: string; border: string }> = {
  1: { bg: 'bg-red-50', border: 'border-sleep-red' },
  2: { bg: 'bg-amber-50', border: 'border-sleep-orange' },
  3: { bg: 'bg-secondary', border: 'border-muted-foreground' },
  4: { bg: 'bg-blue-50', border: 'border-sleep-blue' },
  5: { bg: 'bg-green-50', border: 'border-sleep-green' },
};

const QuickLogCard = ({ onLogged, existingLog }: QuickLogCardProps) => {
  const [bedtime, setBedtime] = useState(existingLog?.bedtime || '23:00');
  const [wakeTime, setWakeTime] = useState(existingLog?.wakeTime || '07:00');
  const [quality, setQuality] = useState<number>(existingLog?.quality || 0);
  const [showDetail, setShowDetail] = useState(false);
  const [wakeUps, setWakeUps] = useState(existingLog?.wakeUps || 0);
  const [symptoms, setSymptoms] = useState<string[]>(existingLog?.symptoms || []);
  const [wakeFeeling, setWakeFeeling] = useState<string | null>(existingLog?.wakeFeeling || null);

  const totalMinutes = useMemo(() => calculateDurationMinutes(bedtime, wakeTime), [bedtime, wakeTime]);
  const canSubmit = quality > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;
    const score = calculateScore(
      totalMinutes,
      quality,
      showDetail ? wakeUps : null,
      showDetail ? symptoms : null
    );
    const log: SleepLog = {
      id: crypto.randomUUID(),
      date: getTodayStr(),
      bedtime,
      wakeTime,
      totalMinutes,
      quality,
      score,
      wakeUps: showDetail ? wakeUps : null,
      symptoms: showDetail ? symptoms : null,
      wakeFeeling: showDetail ? wakeFeeling : null,
    };
    saveSleepLog(log);
    onLogged(log);
  };

  const toggleSymptom = (s: string) => {
    if (s === 'None') {
      setSymptoms(['None']);
      return;
    }
    setSymptoms(prev => {
      const filtered = prev.filter(x => x !== 'None');
      return filtered.includes(s) ? filtered.filter(x => x !== s) : [...filtered, s];
    });
  };

  const formatTime12 = (time24: string) => {
    const [h, m] = time24.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
    return `${h12}:${m.toString().padStart(2, '0')} ${ampm}`;
  };

  return (
    <div className="mx-4 rounded-2xl bg-card p-5 shadow-sm">
      <h3 className="font-sora text-base font-semibold text-foreground mb-4">
        Log last night's sleep
      </h3>

      {/* Time Pickers */}
      <div className="flex gap-3">
        <label className="flex-1 rounded-2xl bg-secondary p-4 text-center cursor-pointer relative">
          <span className="block font-dm text-[11px] text-muted-foreground">Bedtime</span>
          <span className="block font-dm text-[10px] text-muted-foreground/70 mb-2">(previous night)</span>
          <input
            type="time"
            value={bedtime}
            onChange={(e) => setBedtime(e.target.value)}
            style={{
              background: '#F0F4F8',
              border: '1px solid #DDE3EC',
              borderRadius: '16px',
              padding: '16px',
              width: '100%',
              fontSize: '28px',
              fontFamily: "'Sora', sans-serif",
              fontWeight: 700,
              color: '#0F1923',
              textAlign: 'center',
              cursor: 'pointer'
            }}
          />
        </label>
        <label className="flex-1 rounded-2xl bg-secondary p-4 text-center cursor-pointer relative">
          <span className="block font-dm text-[11px] text-muted-foreground mb-2">Wake time</span>
          <input
            type="time"
            value={wakeTime}
            onChange={(e) => setWakeTime(e.target.value)}
            style={{
              background: '#F0F4F8',
              border: '1px solid #DDE3EC',
              borderRadius: '16px',
              padding: '16px',
              width: '100%',
              fontSize: '28px',
              fontFamily: "'Sora', sans-serif",
              fontWeight: 700,
              color: '#0F1923',
              textAlign: 'center',
              cursor: 'pointer'
            }}
          />
        </label>
      </div>

      {/* Duration */}
      <div className="text-center mt-4">
        <span className="font-sora text-xl font-bold text-primary">
          {formatMinutes(totalMinutes)}
        </span>
        <span className="block font-dm text-[11px] text-muted-foreground">time in bed</span>
      </div>

      {/* Quality */}
      <div className="mt-5">
        <p className="font-dm text-[13px] text-muted-foreground text-center mb-3">
          How was your sleep?
        </p>
        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map(q => {
            const isSelected = quality === q;
            const style = qualityStyles[q];
            return (
              <button
                key={q}
                onClick={() => setQuality(q)}
                className={`w-12 h-12 rounded-full flex flex-col items-center justify-center text-lg border-2 transition-all ${
                  isSelected
                    ? `${style.bg} ${style.border}`
                    : 'bg-secondary border-transparent'
                }`}
              >
                <span>{QUALITY_EMOJIS[q]}</span>
              </button>
            );
          })}
        </div>
        {quality > 0 && (
          <p className="text-center mt-1 font-dm text-xs text-muted-foreground">
            {QUALITY_LABELS[quality]}
          </p>
        )}
      </div>

      {/* Detail toggle */}
      <div className="mt-4 text-center">
        <button
          onClick={() => setShowDetail(!showDetail)}
          className="font-dm text-sm text-primary hover:underline"
        >
          {showDetail ? 'Hide detail' : 'Add detail'}
        </button>
      </div>

      {showDetail && (
        <div className="mt-4 space-y-4 animate-fade-in-up">
          {/* Wake-ups */}
          <div>
            <p className="font-dm text-sm text-muted-foreground mb-2">Times woken during night</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setWakeUps(Math.max(0, wakeUps - 1))}
                className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center font-sora font-bold text-foreground"
              >
                −
              </button>
              <span className="font-sora text-xl font-bold text-foreground w-8 text-center">{wakeUps}</span>
              <button
                onClick={() => setWakeUps(Math.min(8, wakeUps + 1))}
                className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center font-sora font-bold text-foreground"
              >
                +
              </button>
            </div>
          </div>

          {/* Symptoms */}
          <div>
            <p className="font-dm text-sm text-muted-foreground mb-2">Any of these?</p>
            <div className="flex flex-wrap gap-2">
              {SYMPTOM_OPTIONS.map(s => (
                <button
                  key={s}
                  onClick={() => toggleSymptom(s)}
                  className={`px-3 py-1.5 rounded-full text-sm font-dm border transition-all ${
                    symptoms.includes(s)
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-secondary text-foreground border-transparent'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Wake feeling */}
          <div>
            <p className="font-dm text-sm text-muted-foreground mb-2">How did you wake up?</p>
            <div className="flex gap-2">
              {['Unrested', 'Neutral', 'Refreshed'].map(f => (
                <button
                  key={f}
                  onClick={() => setWakeFeeling(f)}
                  className={`flex-1 py-2 rounded-xl text-sm font-dm border transition-all ${
                    wakeFeeling === f
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-secondary text-foreground border-transparent'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!canSubmit}
        className={`mt-5 w-full py-3.5 rounded-2xl font-sora text-base font-semibold transition-all ${
          canSubmit
            ? 'bg-primary text-primary-foreground hover:opacity-90'
            : 'bg-muted text-muted-foreground cursor-not-allowed'
        }`}
      >
        Calculate Score
      </button>
    </div>
  );
};

export default QuickLogCard;
