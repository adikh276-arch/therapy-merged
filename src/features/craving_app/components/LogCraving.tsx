import { useState } from 'react';
import { supabase, setCurrentUser, type CravingLog } from '@/lib/supabase';
import { Check, Cigarette } from 'lucide-react';

const INTENSITIES = [
  { range: '1-2', label: 'Minimal', value: 2, bg: 'bg-calm-green-light', text: 'text-calm-green', border: 'border-calm-green/30' },
  { range: '3-4', label: 'Mild', value: 4, bg: 'bg-calm-blue-light', text: 'text-calm-blue', border: 'border-calm-blue/30' },
  { range: '5-6', label: 'Moderate', value: 6, bg: 'bg-secondary', text: 'text-calm-blue', border: 'border-calm-blue/20' },
  { range: '7-8', label: 'High', value: 8, bg: 'bg-calm-amber-light', text: 'text-calm-amber', border: 'border-calm-amber/30' },
  { range: '9-10', label: 'Severe', value: 10, bg: 'bg-calm-red-light', text: 'text-calm-red', border: 'border-calm-red/30' },
];

interface Props {
  userId: number;
  onLogged: (log: CravingLog) => void;
  resistedCount: number;
  t: (s: string) => string;
}

export default function LogCraving({ userId, onLogged, resistedCount, t }: Props) {
  const [intensity, setIntensity] = useState<number | null>(null);
  const [outcome, setOutcome] = useState<'resisted' | 'smoked' | null>(null);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const selectedIntensity = INTENSITIES.find(i => i.value === intensity);

  async function handleLog() {
    if (!intensity || !outcome) return;
    setSaving(true);

    const log: CravingLog = {
      user_id: userId,
      timestamp: new Date().toISOString(),
      intensity,
      intensity_label: selectedIntensity?.label || '',
      outcome,
    };

    try {
      await setCurrentUser(userId);
      await supabase.from('craving_logs').insert(log).eq('user_id', userId);
      onLogged(log);

      if (outcome === 'resisted') {
        const newCount = resistedCount + 1;
        setFeedback(
          newCount === 1
            ? t('First craving resisted! 🎉')
            : t(`That's ${newCount} cravings resisted! 💪`)
        );
      } else {
        setFeedback(t('Logged. Cravings pass within 3-5 minutes — the timer can help next time 🕐'));
      }

      setIntensity(null);
      setOutcome(null);
      setTimeout(() => setFeedback(null), 4000);
    } catch {
      setFeedback(t('Could not save. Please try again.'));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="card-calm space-y-4">
      <h2 className="text-display text-lg font-semibold text-foreground">{t('Log a craving')}</h2>

      {/* Intensity */}
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">{t('How intense?')}</p>
        <div className="flex flex-col gap-2">
          {INTENSITIES.map(i => (
            <button
              key={i.value}
              onClick={() => setIntensity(i.value)}
              className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                intensity === i.value
                  ? `${i.bg} ${i.text} ${i.border} border-2 scale-[1.02]`
                  : 'border-border bg-card hover:bg-muted/50'
              }`}
            >
              <span>{t(i.label)}</span>
              <span className="text-xs opacity-60">{i.range}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Outcome */}
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">{t('What happened?')}</p>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setOutcome('resisted')}
            className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
              outcome === 'resisted'
                ? 'bg-calm-green-light text-calm-green border-calm-green/30 border-2'
                : 'border-border bg-card hover:bg-muted/50'
            }`}
          >
            <Check className="h-4 w-4" />
            {t('I resisted')}
          </button>
          <button
            onClick={() => setOutcome('smoked')}
            className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
              outcome === 'smoked'
                ? 'bg-muted text-muted-foreground border-border border-2'
                : 'border-border bg-card hover:bg-muted/50'
            }`}
          >
            <Cigarette className="h-4 w-4" />
            {t('I smoked')}
          </button>
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={handleLog}
        disabled={!intensity || !outcome || saving}
        className="w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {saving ? t('Saving…') : t('Log Craving')}
      </button>

      {/* Feedback */}
      {feedback && (
        <div className="animate-celebration rounded-xl bg-card p-4 text-center text-sm font-medium text-foreground border border-border">
          {feedback}
        </div>
      )}
    </div>
  );
}
