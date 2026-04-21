import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoodLevel, MOOD_CONFIG, Factor, FACTORS, TobaccoUrge } from '@/types/mood';

interface MoodLoggerProps {
  onLog: (mood: MoodLevel, factors?: Factor[], tobaccoUrge?: TobaccoUrge, notes?: string) => void | Promise<void>;
}

const MOODS: MoodLevel[] = ['great', 'good', 'okay', 'low', 'difficult'];

export default function MoodLogger({ onLog }: MoodLoggerProps) {
  const [selected, setSelected] = useState<MoodLevel | null>(null);
  const [factors, setFactors] = useState<Factor[]>([]);
  const [tobaccoUrge, setTobaccoUrge] = useState<TobaccoUrge>('none');
  const [notes, setNotes] = useState('');
  const [justLogged, setJustLogged] = useState(false);

  const toggleFactor = (f: Factor) => {
    setFactors(prev => {
      if (prev.includes(f)) return prev.filter(x => x !== f);
      if (prev.length >= 2) return [prev[1], f];
      return [...prev, f];
    });
  };

  const handleSave = async () => {
    if (!selected) return;
    await onLog(selected, factors, tobaccoUrge, notes);
    setJustLogged(true);
    setTimeout(() => {
      setSelected(null);
      setFactors([]);
      setTobaccoUrge('none');
      setNotes('');
      setJustLogged(false);
    }, 1500);
  };

  const handleQuickLog = (mood: MoodLevel) => {
    setSelected(mood);
  };

  if (justLogged) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl bg-card p-8 text-center shadow-sm border border-border"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 10 }}
          className="text-5xl mb-3"
        >
          ✓
        </motion.div>
        <p className="text-lg font-medium text-foreground">Logged</p>
        <p className="text-sm text-muted-foreground mt-1">Take care of yourself today</p>
      </motion.div>
    );
  }

  return (
    <div className="rounded-2xl bg-card p-6 shadow-sm border border-border">
      <p className="text-muted-foreground text-sm font-medium mb-4">How are you feeling?</p>

      <div className="flex justify-between gap-2">
        {MOODS.map(mood => {
          const cfg = MOOD_CONFIG[mood];
          const isSelected = selected === mood;
          return (
            <motion.button
              key={mood}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleQuickLog(mood)}
              className={`flex-1 flex flex-col items-center gap-1.5 py-3 px-1 rounded-xl transition-all duration-200 ${isSelected
                ? 'bg-accent ring-2 ring-primary/30 shadow-sm'
                : 'hover:bg-secondary'
                }`}
            >
              <span className="text-3xl">{cfg.emoji}</span>
              <span className={`text-xs font-medium ${isSelected ? 'text-foreground' : 'text-muted-foreground'}`}>
                {cfg.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="pt-5 space-y-4">
              {/* Factors */}
              <div>
                <p className="text-xs text-muted-foreground font-medium mb-2">What's influencing this? <span className="text-muted-foreground/60">(max 2)</span></p>
                <div className="flex flex-wrap gap-2">
                  {FACTORS.map(f => (
                    <button
                      key={f}
                      onClick={() => toggleFactor(f)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${factors.includes(f)
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-accent'
                        }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tobacco Urge */}
              <div>
                <p className="text-xs text-muted-foreground font-medium mb-2">Tobacco urge?</p>
                <div className="flex gap-2">
                  {(['none', 'mild', 'strong'] as TobaccoUrge[]).map(level => (
                    <button
                      key={level}
                      onClick={() => setTobaccoUrge(level)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all capitalize ${tobaccoUrge === level
                        ? level === 'strong' ? 'bg-warning text-warning-foreground' : 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-accent'
                        }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
                <AnimatePresence>
                  {tobaccoUrge === 'strong' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-2 p-3 rounded-lg bg-warning-surface border border-warning/20 text-xs text-warning-foreground">
                        <span className="font-medium">Note:</span> Negative mood states and tobacco urges are closely linked. — NIMHANS
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Notes */}
              <div>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Any notes... (optional)"
                  rows={2}
                  className="w-full bg-secondary rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Save */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleSave}
                className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm transition-colors hover:bg-primary/90"
              >
                Save
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
