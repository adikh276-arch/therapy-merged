import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/contexts/TranslationContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase, withUserContext } from '@/lib/supabase';
import {
  MOODS,
  FACTORS,
  MOOD_BG_LIGHT,
  type MoodType,
  type FactorType,
  type TobaccoUrge,
} from '@/types/mood';
import { format } from 'date-fns';

interface Props {
  onLogged: () => void;
}

export default function MoodLogger({ onLogged }: Props) {
  const { t } = useTranslation();
  const { userId } = useAuth();
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [logId, setLogId] = useState<number | null>(null);
  const [factors, setFactors] = useState<FactorType[]>([]);
  const [tobaccoUrge, setTobaccoUrge] = useState<TobaccoUrge>('none');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const handleMoodTap = async (mood: MoodType) => {
    if (!userId) return;
    setSelectedMood(mood);

    try {
      await withUserContext(userId);
      const now = new Date();
      const { data } = await supabase
        .from('mood_logs')
        .insert({
          user_id: userId,
          timestamp: now.toISOString(),
          date: format(now, 'yyyy-MM-dd'),
          mood,
        })
        .select('id')
        .single();

      if (data) setLogId(data.id);
      onLogged();
    } catch (err) {
      console.error('Failed to log mood:', err);
    }
  };

  const toggleFactor = (f: FactorType) => {
    setFactors((prev) => {
      if (prev.includes(f)) return prev.filter((x) => x !== f);
      if (prev.length >= 2) return prev;
      return [...prev, f];
    });
  };

  const handleSave = async () => {
    if (!userId || !logId) return;
    setSaving(true);
    try {
      await withUserContext(userId);
      await supabase
        .from('mood_logs')
        .update({
          factors,
          tobacco_urge: tobaccoUrge,
          notes: notes || null,
        })
        .eq('id', logId)
        .eq('user_id', userId);

      resetForm();
      onLogged();
    } catch (err) {
      console.error('Failed to save details:', err);
    } finally {
      setSaving(false);
    }
  };

  const resetForm = () => {
    setSelectedMood(null);
    setLogId(null);
    setFactors([]);
    setTobaccoUrge('none');
    setNotes('');
  };

  return (
    <div className="bg-card rounded-2xl p-5 shadow-sm">
      <h3 className="text-base font-bold mb-4">{t('How are you feeling?')}</h3>

      <div className="flex justify-between gap-2">
        {MOODS.map((m) => (
          <motion.button
            key={m.type}
            whileTap={{ scale: 0.85 }}
            onClick={() => handleMoodTap(m.type)}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl flex-1 transition-all duration-200 ${
              selectedMood === m.type
                ? `${MOOD_BG_LIGHT[m.type]} scale-105`
                : 'hover:bg-secondary'
            }`}
          >
            <span className="text-2xl">{m.emoji}</span>
            <span className="text-[10px] font-semibold text-muted-foreground">
              {t(m.label)}
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selectedMood && logId && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="pt-5 space-y-4">
              <div>
                <p className="text-sm font-semibold mb-2">
                  {t("What's influencing this?")}{' '}
                  <span className="text-muted-foreground font-normal text-xs">
                    ({t('max 2')})
                  </span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {FACTORS.map((f) => (
                    <button
                      key={f}
                      onClick={() => toggleFactor(f)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        factors.includes(f)
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground'
                      }`}
                    >
                      {t(f)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold mb-2">
                  {t('Tobacco urge?')}
                </p>
                <div className="flex gap-2">
                  {(['none', 'mild', 'strong'] as TobaccoUrge[]).map((u) => (
                    <button
                      key={u}
                      onClick={() => setTobaccoUrge(u)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        tobaccoUrge === u
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground'
                      }`}
                    >
                      {t(u.charAt(0).toUpperCase() + u.slice(1))}
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t('Add a note...')}
                className="w-full bg-secondary rounded-xl p-3 text-sm resize-none h-20 outline-none focus:ring-2 ring-primary placeholder:text-muted-foreground"
              />

              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 bg-primary text-primary-foreground font-bold py-2.5 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {saving ? '...' : t('Save')}
                </button>
                <button
                  onClick={resetForm}
                  className="px-4 py-2.5 rounded-xl bg-secondary text-secondary-foreground font-medium"
                >
                  {t('Skip')}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
