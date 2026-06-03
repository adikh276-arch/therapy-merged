'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslation, I18nextProvider } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Book, Plus, ArrowLeft, ArrowRight, Smile, History, Calendar, Loader2 } from 'lucide-react';
import i18n, { loadLocale } from './i18n';
import { PremiumLayout } from '@/components/shared/PremiumLayout';
import { PremiumIntro } from '@/components/shared/PremiumIntro';
import { PremiumComplete } from '@/components/shared/PremiumComplete';
import { apiPath } from '@/lib/apiPath';

// --- Types & Constants ---

interface GratitudeEntry {
  grateful: string;
  reason: string;
}

interface SavedEntry {
  id: string;
  date: string;
  gratitudes: GratitudeEntry[];
  feeling: string;
}

type Screen = 'intro' | 'gratitude' | 'reflection' | 'closing' | 'past';

const premiumTints = [
  "bg-emerald-50/50 border-emerald-100 dark:bg-emerald-950/10 dark:border-emerald-900/20",
  "bg-teal-50/50 border-teal-100 dark:bg-teal-950/10 dark:border-teal-900/20",
  "bg-green-50/50 border-green-100 dark:bg-green-950/10 dark:border-green-900/20",
];

// --- Daily Gratitude Inner Component ---

function DailyGratitudeInner() {
  const { t } = useTranslation(undefined, { i18n });
  const [screen, setScreen] = useState<Screen>('intro');
  const [entries, setEntries] = useState<GratitudeEntry[]>([{ grateful: '', reason: '' }]);
  const [feeling, setFeeling] = useState('');
  const [pastEntries, setPastEntries] = useState<SavedEntry[]>([]);
  const [loading, setLoading] = useState(false);

  // Sync with search/URL query param for localized translations
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const lang = params.get('lang') || 'en';
      loadLocale(lang);
    }
  }, []);

  const fetchPastEntries = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(apiPath('/api/daily-gratitude-diary'));
      if (res.ok) {
        const data = await res.json();
        const formatted = data.map((row: any) => ({
          id: row.id,
          date: row.date,
          feeling: row.feeling,
          gratitudes: typeof row.gratitudes === 'string' ? JSON.parse(row.gratitudes) : row.gratitudes,
        }));
        setPastEntries(formatted);
      }
    } catch (err) {
      console.error('Failed to fetch gratitude entries:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (screen === 'past') {
      fetchPastEntries();
    }
  }, [screen, fetchPastEntries]);

  const updateEntry = (index: number, field: keyof GratitudeEntry, value: string) => {
    const updated = [...entries];
    updated[index] = { ...updated[index], [field]: value };
    setEntries(updated);
  };

  const addAnother = () => {
    setEntries([...entries, { grateful: '', reason: '' }]);
  };

  const canContinue = entries.some((e) => e.grateful.trim().length > 0);

  const saveEntry = async () => {
    const validGratitudes = entries.filter((e) => e.grateful.trim().length > 0);
    const dateStr = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const entryId = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15);

    const payload = {
      id: entryId,
      date: dateStr,
      feeling,
      gratitudes: validGratitudes,
    };

    try {
      await fetch(apiPath('/api/daily-gratitude-diary'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      // Refresh list
      fetchPastEntries();
    } catch (err) {
      console.error('Failed to save gratitude entry:', err);
    }

    setScreen('closing');
  };

  const resetFlow = () => {
    setScreen('intro');
    setEntries([{ grateful: '', reason: '' }]);
    setFeeling('');
  };

  const deleteEntry = async (id: string) => {
    try {
      const res = await fetch(apiPath(`/api/daily-gratitude-diary?id=${id}`), {
        method: 'DELETE',
      });
      if (res.ok) {
        setPastEntries((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete gratitude entry:', err);
    }
  };

  const screenOrder: Screen[] = ['intro', 'gratitude', 'reflection', 'closing'];
  const currentIdx = screenOrder.indexOf(screen);

  return (
    <PremiumLayout
      title={t('app_title', 'Daily Gratitude Diary')}
      icon={<Heart className="w-6 h-6 text-primary" />}
      onBack={currentIdx > 0 && screen !== 'closing' ? () => setScreen(screenOrder[currentIdx - 1]) : undefined}
      onReset={currentIdx > 0 && screen !== 'closing' ? resetFlow : undefined}
    >
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-4 min-h-[70vh]">
        {screen !== 'closing' && screen !== 'past' && (
          <div className="flex justify-center gap-2 mb-10">
            {screenOrder.slice(0, 3).map((s, i) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i <= currentIdx ? 'w-8 bg-primary' : 'w-2 bg-slate-150 dark:bg-slate-800'
                }`}
              />
            ))}
          </div>
        )}

        <div className="relative flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            {/* SCREEN 1: INTRO */}
            {screen === 'intro' && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="w-full flex-1 flex flex-col"
              >
                <PremiumIntro
                  title={t('app_title', 'Daily Gratitude Diary')}
                  description={t('app_description', 'Noticing Small Good Things')}
                  onStart={() => setScreen('gratitude')}
                  icon={<Heart size={32} />}
                  benefits={[
                    t('intro_text_1', 'Gratitude does not mean ignoring difficult emotions.'),
                    t('intro_text_2', 'It simply means gently noticing moments - big or small - that feel steady, comforting, or meaningful.'),
                    t('intro_text_3', 'Some days it may be something very small.'),
                  ]}
                  duration={t('app_duration', '3-5 minutes')}
                >
                  <div className="mt-10 flex justify-center">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setScreen('past')}
                      className="flex items-center gap-3 text-slate-500 dark:text-slate-400 hover:text-primary font-bold text-xs uppercase tracking-widest transition-all bg-white dark:bg-slate-900 px-6 py-3 rounded-2xl border border-white/60 dark:border-slate-800 shadow-sm"
                    >
                      <Book size={16} />
                      {t('view_past', 'View Past Entries')}
                    </motion.button>
                  </div>
                </PremiumIntro>
              </motion.div>
            )}

            {/* SCREEN 2: WRITE GRATITUDE */}
            {screen === 'gratitude' && (
              <motion.div
                key="gratitude"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full flex-1 flex flex-col space-y-5"
              >
                <div className="space-y-3 text-left">
                  <span className="act-eyebrow">
                    <Sparkles size={11} />
                    {t('daily_gratitude', 'Daily Gratitude')}
                  </span>
                  <h1 className="act-heading">
                    {t('grateful_title', "Today, I'm Grateful For...")}
                  </h1>
                  <p className="act-body">
                    {t('grateful_step_1', 'Think about today. What is one small thing you appreciate right now? It can be something simple.')}
                  </p>
                </div>

                <div className="space-y-5">
                  {entries.map((entry, i) => {
                    const tintClass = premiumTints[i % premiumTints.length];
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-5 bg-white/80 backdrop-blur-sm rounded-2xl border border-white shadow-sm space-y-4 hover:border-sky-100 transition-all`}
                      >
                        <div className="act-eyebrow">
                          <Heart size={12} fill="currentColor" />
                          {t('entry_x', 'Entry #')}{i + 1}
                        </div>
                        <div className="space-y-3">
                          <div className="space-y-2">
                            <label className="field-label">
                              {t('i_am_grateful_for', 'I am grateful for...')}
                            </label>
                            <input
                              type="text"
                              placeholder={t('placeholder_grateful', "Today, I'm grateful for...")}
                              value={entry.grateful}
                              onChange={(e) => updateEntry(i, 'grateful', e.target.value)}
                              className="field-input"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="field-label">
                              {t('because', 'Because...')}
                            </label>
                            <input
                              type="text"
                              placeholder={t('placeholder_reason', 'This matters to me because... (optional)')}
                              value={entry.reason}
                              onChange={(e) => updateEntry(i, 'reason', e.target.value)}
                              className="field-input"
                            />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}

                  <button
                    onClick={addAnother}
                    className="w-full py-3 rounded-xl bg-white/60 backdrop-blur-sm border border-dashed border-sky-100 text-slate-400 font-medium text-sm hover:border-sky-200 hover:text-sky-600 transition-all flex items-center justify-center gap-2"
                  >
                    <Plus size={16} />
                    {t('add_another', 'Add Another')}
                  </button>
                </div>

                {/* Inline Continue Button */}
                <div className="pt-2">
                  <button
                    onClick={() => canContinue && setScreen('reflection')}
                    disabled={!canContinue}
                    className="act-btn-primary"
                  >
                    {t('continue', 'Continue')}
                    <ArrowRight size={16} strokeWidth={2.5} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* SCREEN 3: MOOD CHECK / REFLECTION */}
            {screen === 'reflection' && (
              <motion.div
                key="reflection"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full flex-1 flex flex-col space-y-6"
              >
                <div className="space-y-3 text-left">
                  <span className="act-eyebrow">
                    <Sparkles size={11} />
                    {t('reflection', 'Reflection')}
                  </span>
                  <h1 className="act-heading">
                    {t('reflection_title', 'Pause and Notice')}
                  </h1>
                  <p className="act-body">
                    {t('reflection_text', 'When you focus on this moment, what do you notice in yourself?')}
                  </p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="act-card space-y-3"
                >
                  <div className="act-eyebrow">
                    <Smile size={14} />
                    {t('mood_check', 'Mood Check')}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest px-1">
                      {t('how_do_you_feel_after_this', 'How do you feel after this?')}
                    </label>
                    <input
                      type="text"
                      placeholder={t('placeholder_feeling', 'When I think about this, I feel...')}
                      value={feeling}
                      onChange={(e) => setFeeling(e.target.value)}
                      className="field-input"
                    />
                  </div>
                </motion.div>

                <button
                  onClick={saveEntry}
                  className="act-btn-primary"
                >
                  {t('save_entry', 'Save Entry')}
                  <ArrowRight size={16} strokeWidth={2.5} />
                </button>
              </motion.div>
            )}

            {/* SCREEN 4: COMPLETE / CLOSING */}
            {screen === 'closing' && (
              <motion.div
                key="closing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="w-full flex-1 flex flex-col"
              >
                <PremiumComplete
                  title={t('app_complete_title', 'Gratitude Saved')}
                  message={t('app_complete_message', 'Reflecting on what you\'re thankful for is a powerful way to shift your focus to the positive.')}
                  onRestart={resetFlow}
                  icon={<Sparkles size={48} />}
                  shareEmoji="📖"
                  shareContent={"I just completed 'Daily Gratitude Diary' on TherapyMantra — a guided gratitude journaling that genuinely helped me. Try it! 🌿\n\n📱 Android: https://play.google.com/store/apps/details?id=org.mantracare.therapy\n🍎 iOS: https://apps.apple.com/pk/app/therapymantra/id1607643888"}
                >
                  <div className="flex justify-center mt-10">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setScreen('past')}
                      className="px-8 py-4 bg-white dark:bg-slate-900 border border-white/60 dark:border-slate-800 text-slate-500 hover:text-slate-850 dark:text-slate-300 dark:hover:text-white font-bold text-sm uppercase tracking-widest rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center gap-2"
                    >
                      <Book size={16} />
                      {t('view_history', 'View History')}
                    </motion.button>
                  </div>
                </PremiumComplete>
              </motion.div>
            )}

            {/* SCREEN 5: HISTORY / PAST ENTRIES */}
            {screen === 'past' && (
              <motion.div
                key="past"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="w-full flex-1 flex flex-col space-y-6 pb-20"
              >
                <div className="flex justify-between items-center">
                  <div className="text-left space-y-1">
                    <span className="act-eyebrow">
                      <History size={12} />
                      {t('history', 'History')}
                    </span>
                    <h1 className="act-heading">
                      {t('past_entries_title', 'Past Entries')}
                    </h1>
                    <p className="act-body">
                      {t('relive_your_moments_of_gratitude', 'Relive your moments of gratitude.')}
                    </p>
                  </div>
                  <button
                    onClick={() => setScreen(entries.length > 1 || entries[0].grateful.trim().length > 0 ? 'closing' : 'intro')}
                    className="p-2.5 bg-white/80 backdrop-blur-sm border border-white text-slate-500 rounded-xl hover:border-sky-100 hover:text-sky-600 transition-all"
                  >
                    <ArrowLeft size={16} />
                  </button>
                </div>

                {loading ? (
                  <div className="flex flex-col items-center justify-center py-20 gap-3">
                    <Loader2 className="h-8 w-8 animate-spin text-primary opacity-30" />
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                      {t('loading', 'Loading...')}
                    </p>
                  </div>
                ) : pastEntries.length === 0 ? (
                  <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-2xl border border-white shadow-sm">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 text-slate-200 shadow-sm">
                      <History size={22} />
                    </div>
                    <p className="text-slate-400 font-medium text-sm px-6">
                      {t('no_entries', 'No entries yet. Start your first one today.')}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pastEntries.map((entry, i) => (
                      <motion.div
                        key={entry.id || i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="act-card space-y-3"
                      >
                        <div className="flex justify-between items-center border-b border-slate-50 dark:border-slate-850 pb-2">
                          <div className="act-eyebrow">
                            <Calendar size={12} />
                            {entry.date}
                          </div>
                          {entry.id && (
                            <button
                              onClick={() => deleteEntry(entry.id)}
                              className="text-xs font-bold text-rose-400 hover:text-rose-600 transition-colors uppercase tracking-widest opacity-0 group-hover:opacity-100 focus:opacity-100 duration-200"
                            >
                              {t('delete', 'Delete')}
                            </button>
                          )}
                        </div>

                        <div className="space-y-3">
                          {entry.gratitudes &&
                            entry.gratitudes.map((g, j) => (
                              <div key={j} className="flex gap-3 text-left">
                                <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 flex items-center justify-center text-primary shrink-0">
                                  <Heart size={14} fill="currentColor" />
                                </div>
                                <div>
                                  <p className="text-slate-800 dark:text-slate-200 font-bold text-sm leading-relaxed">
                                    {g.grateful}
                                  </p>
                                  {g.reason && (
                                    <p className="text-slate-405 dark:text-slate-400 text-xs font-medium mt-0.5 leading-relaxed">
                                      {g.reason}
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}
                        </div>

                        {entry.feeling && (
                          <div className="pt-2 border-t border-slate-50 dark:border-slate-850">
                            <p className="text-slate-405 dark:text-slate-400 text-xs font-medium italic text-left">
                              "{entry.feeling}"
                            </p>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PremiumLayout>
  );
}

export default function DailyGratitudePage() {
  return (
    <I18nextProvider i18n={i18n}>
      <DailyGratitudeInner />
    </I18nextProvider>
  );
}