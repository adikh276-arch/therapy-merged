'use client';
import { parseDbDate } from '@/lib/dateUtils';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation, I18nextProvider } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Wind, ArrowRight, Lock, MessageSquare, Bookmark, Check, Calendar, ChevronDown, Trash2, ArrowLeft, History, Send } from 'lucide-react';
import i18n, { loadLocale } from './i18n';
import { PremiumLayout } from '@/components/shared/PremiumLayout';
import { PremiumIntro } from '@/components/shared/PremiumIntro';
import { PremiumComplete } from '@/components/shared/PremiumComplete';

// --- Types & Storage ---

interface ReflectionEntry {
  id: string;
  timestamp: string;
  responses: string[];
  intention: string;
  checkIn: string;
}

const STORAGE_KEY = "reflection-history";

const getReflections = (): ReflectionEntry[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveReflection = (entry: ReflectionEntry) => {
  if (typeof window === 'undefined') return;
  try {
    const existing = getReflections();
    existing.unshift(entry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch (err) {
    console.error("Save local storage failed:", err);
  }
};

const deleteReflection = (id: string) => {
  if (typeof window === 'undefined') return;
  try {
    const existing = getReflections().filter((e) => e.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch (err) {
    console.error("Delete local storage failed:", err);
  }
};

// --- Sub-components ---

// 1. Breathing Pacer
function BreathingScreen({ onContinue }: { onContinue: () => void }) {
  const { t } = useTranslation(undefined, { i18n });
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'done'>('inhale');
  const [cycle, setCycle] = useState(0);
  const [counter, setCounter] = useState(4);

  const TOTAL_CYCLES = 3;
  const HOLD_MS = 1000;

  const runCycle = useCallback(() => {
    setPhase('inhale');
    setCounter(4);
    let c = 4;
    const inhaleInterval = setInterval(() => {
      c--;
      if (c > 0) setCounter(c);
      else {
        clearInterval(inhaleInterval);
        setPhase('hold');
        setCounter(0);
        setTimeout(() => {
          setPhase('exhale');
          let e = 4;
          setCounter(e);
          const exhaleInterval = setInterval(() => {
            e--;
            if (e > 0) setCounter(e);
            else {
              clearInterval(exhaleInterval);
              setCycle((prev) => prev + 1);
            }
          }, 1000);
        }, HOLD_MS);
      }
    }, 1000);
  }, []);

  useEffect(() => {
    if (cycle < TOTAL_CYCLES) {
      runCycle();
    } else {
      setPhase('done');
    }
  }, [cycle, runCycle]);

  const circleScale = phase === 'inhale' ? 1.4 : phase === 'exhale' ? 1 : phase === 'hold' ? 1.4 : 1;
  const breathDuration = phase === 'inhale' ? 4 : phase === 'exhale' ? 4 : 0.3;

  return (
    <div className="flex flex-col items-center py-6">
      <div className="w-full max-w-lg space-y-8">
        <header className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
            {t('breathing.title', 'Arrive and Settle')}
          </h2>
          <p className="text-slate-505 dark:text-slate-400 text-sm font-medium leading-relaxed">
            {t('breathing.description', 'Before continuing, allow yourself a brief pause. This moment is not about solving anything. It is about creating space.')}
          </p>
        </header>

        <div className="flex flex-col items-center justify-center py-12 relative h-[300px]">
          <AnimatePresence mode="wait">
            {phase !== 'done' ? (
              <motion.div 
                key="breathing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative flex items-center justify-center"
              >
                {/* Background Ring */}
                <div className="absolute w-40 h-40 rounded-full border border-white/60 dark:border-slate-800" />
                
                {/* Breathing Circle */}
                <motion.div
                  className="w-40 h-40 rounded-full bg-primary/10 border-4 border-primary/20 shadow-2xl shadow-primary/10"
                  animate={{ scale: circleScale }}
                  transition={{ duration: breathDuration, ease: 'easeInOut' }}
                />
                
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Wind size={24} className="text-primary mb-2 opacity-20" />
                  <p className="text-lg font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest leading-none">
                    {phase === 'inhale' && t('breathing.inhale', 'Inhale…')}
                    {phase === 'hold' && t('breathing.hold', 'Hold…')}
                    {phase === 'exhale' && t('breathing.exhale', 'Exhale…')}
                  </p>
                  <span className="text-sm font-bold text-primary mt-1 tabular-nums">
                    {phase !== 'hold' && counter}
                  </span>
                </div>
                
                <div className="absolute -bottom-12">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {t('breathing.instruction', 'Follow the breathing rhythm below.')}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="done"
                className="text-center space-y-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-950/20 rounded-3xl flex items-center justify-center mx-auto text-emerald-500 shadow-sm border border-emerald-100 dark:border-emerald-900/30">
                  <Sparkles size={32} />
                </div>
                <p className="text-xl font-bold text-slate-800 dark:text-slate-200 leading-relaxed italic max-w-xs mx-auto">
                  &quot;{t('breathing.affirmation', 'I can acknowledge what feels difficult and still remain open to noticing.')}&quot;
                </p>
                
                <motion.button 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onContinue} 
                  className="w-full py-5 rounded-[2rem] bg-primary text-white font-bold text-lg shadow-xl shadow-primary/20 hover:shadow-2xl transition-all flex items-center justify-center gap-3"
                >
                  {t('breathing.continue', 'Continue')}
                  <ArrowRight size={20} />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// 2. Reflection Prompts
interface ReflectionPromptProps {
  step: number;
  total: number;
  prompt: string;
  example: string;
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
}

function ReflectionPrompt({
  step,
  total,
  prompt,
  example,
  value,
  onChange,
  onNext,
}: ReflectionPromptProps) {
  const { t } = useTranslation(undefined, { i18n });

  return (
    <div className="flex flex-col items-center py-6">
      <div className="w-full max-w-lg space-y-8">
        <header className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              {t('reflection.step', { step, total })}
            </span>
            <div className="flex gap-1.5">
              {Array.from({ length: total }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 w-8 rounded-full transition-all duration-500 ${
                    i < step ? 'bg-primary' : 'bg-slate-100 dark:bg-slate-800'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <div className="text-left space-y-2">
            <h2 className="act-heading">
              {prompt}
            </h2>
            <div className="flex items-center gap-2 text-slate-400 text-xs font-medium italic">
              <Sparkles size={14} className="text-primary/40" />
              {example}
            </div>
          </div>
        </header>

        <div className="space-y-6">
          <textarea
            placeholder={t('reflection.placeholder', 'Write your reflection here…')}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="field-textarea min-h-[160px]"
          />
          
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onNext} 
            disabled={!value.trim()}
            className="w-full py-5 rounded-[2rem] bg-primary text-white font-bold text-lg shadow-xl shadow-primary/20 hover:shadow-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-40 disabled:shadow-none"
          >
            {step === total ? t('reflection.finish', 'Finish') : t('reflection.next', 'Next')}
            <ArrowRight size={20} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

// 3. Intention Settings
interface IntentionScreenProps {
  value: string;
  onChange: (value: string) => void;
  onContinue: () => void;
}

function IntentionScreen({ value, onChange, onContinue }: IntentionScreenProps) {
  const { t } = useTranslation(undefined, { i18n });

  const options = [
    { icon: <Lock size={20} />, label: t('intention.options.private', 'I would prefer to keep this reflection private.'), key: 'private' },
    { icon: <MessageSquare size={20} />, label: t('intention.options.share_part', 'I may choose to share part of this with my partner.'), key: 'share_part' },
    { icon: <Heart size={20} />, label: t('intention.options.share_full', 'I would like to share this reflection fully.'), key: 'share_full' },
    { icon: <Bookmark size={20} />, label: t('intention.options.save_later', 'I will save this for a later conversation.'), key: 'save_later' },
  ];

  return (
    <div className="flex flex-col items-center py-6">
      <div className="w-full max-w-lg space-y-8">
        <header className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              {t('intention.step', 'Step 4 of 4')}
            </span>
            <div className="flex gap-1.5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-1.5 w-8 rounded-full bg-primary" />
              ))}
            </div>
          </div>
          <h2 className="act-heading">
            {t('intention.title', 'How would you like to hold this reflection?')}
          </h2>
        </header>

        <div className="space-y-4">
          {options.map((opt, i) => {
            const isSelected = value === opt.label;
            return (
              <motion.button
                key={opt.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onChange(opt.label)}
                className={`w-full text-left p-6 rounded-[2rem] border transition-all duration-300 flex items-center justify-between ${
                  isSelected 
                    ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' 
                    : 'bg-white dark:bg-slate-900 border-white/60 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:opacity-90 hover:shadow-xl hover:shadow-primary/40 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${
                    isSelected ? 'bg-white/20' : 'bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 dark:bg-slate-950 text-slate-400 dark:text-slate-500'
                  }`}>
                    {opt.icon}
                  </div>
                  <span className="text-base font-bold">{opt.label}</span>
                </div>
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"
                    >
                      <Check size={16} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>

        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onContinue} 
          disabled={!value}
          className="w-full py-5 rounded-[2rem] bg-primary text-white font-bold text-lg shadow-xl shadow-primary/20 hover:shadow-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-40 disabled:shadow-none"
        >
          {t('intention.continue', 'Continue')}
          <ArrowRight size={20} />
        </motion.button>
      </div>
    </div>
  );
}

// 4. Checkin Selection
interface CheckInScreenProps {
  value: string;
  onChange: (value: string) => void;
  onFinish: () => void;
}

function CheckInScreen({ value, onChange, onFinish }: CheckInScreenProps) {
  const { t } = useTranslation(undefined, { i18n });

  const statements = [
    t('checkin.statements.s1', 'I feel slightly more open toward my partner right now.'),
    t('checkin.statements.s2', 'I do not notice much change, but I am willing to stay aware.'),
    t('checkin.statements.s3', 'I found this somewhat difficult to complete.'),
    t('checkin.statements.s4', 'I experienced a small sense of warmth during reflection.'),
    t('checkin.statements.s5', 'I noticed resistance, and that feels important to acknowledge.'),
    t('checkin.statements.s6', 'I feel a subtle softening compared to before I began.'),
  ];

  return (
    <div className="flex flex-col items-center py-6">
      <div className="w-full max-w-lg space-y-8">
        <header className="text-center space-y-2">
          <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto text-primary mb-4">
            <Sparkles size={32} />
          </div>
          <h2 className="act-heading">
            {t('checkin.title', 'As you completed this reflection, which statement feels most accurate?')}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
            {t('how_do_you_feel_after_this_reflection', 'How do you feel after this reflection?')}
          </p>
        </header>

        <div className="grid gap-3">
          {statements.map((s, i) => {
            const isSelected = value === s;
            return (
              <motion.button
                key={s}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onChange(s)}
                className={`w-full text-left p-5 rounded-[2rem] border transition-all duration-300 flex items-center justify-between ${
                  isSelected 
                    ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' 
                    : 'bg-white dark:bg-slate-900 border-white/60 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:opacity-90 hover:shadow-xl hover:shadow-primary/40 shadow-sm'
                }`}
              >
                <span className="text-sm font-bold leading-relaxed">{s}</span>
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 ml-4"
                    >
                      <Check size={16} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>

        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onFinish} 
          disabled={!value}
          className="w-full py-5 rounded-[2rem] bg-primary text-white font-bold text-lg shadow-xl shadow-primary/20 hover:shadow-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-40 disabled:shadow-none"
        >
          {t('checkin.finish', 'Finish & Save')}
          <Send size={20} />
        </motion.button>
      </div>
    </div>
  );
}

// 5. History Logger
interface HistoryScreenProps {
  onBack: () => void;
  prompts: string[];
}

function HistoryScreen({ onBack, prompts }: HistoryScreenProps) {
  const { t } = useTranslation(undefined, { i18n });
  const [entries, setEntries] = useState<ReflectionEntry[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  useEffect(() => {
    setEntries(getReflections());
  }, []);

  const handleDelete = (id: string) => {
    deleteReflection(id);
    setEntries(getReflections());
    setConfirmDelete(null);
  };

  const formatDateString = (dateStr: string) => {
    try {
      return parseDbDate(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="flex flex-col items-center py-6 pb-24">
      <div className="w-full max-w-lg space-y-8">
        <header className="flex items-center justify-between">
          <div className="text-left">
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">
              {t('history.title', 'Your Reflection History')}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              {t('your_past_reflections_appreciations', 'Your past reflections & appreciations')}
            </p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onBack} 
            className="p-3 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 rounded-2xl hover:bg-slate-200 dark:hover:opacity-90 hover:shadow-xl hover:shadow-primary/40 transition-colors shadow-sm"
          >
            <ArrowLeft size={20} />
          </motion.button>
        </header>

        {entries.length === 0 ? (
          <div className="text-center py-20 bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 dark:bg-slate-900 rounded-[2.5rem] border border-dashed border-slate-200 dark:border-slate-800">
            <div className="w-16 h-16 bg-white dark:bg-slate-950 rounded-3xl flex items-center justify-center mx-auto mb-4 text-slate-200 dark:text-slate-800 shadow-sm">
              <History size={32} />
            </div>
            <p className="text-slate-400 font-bold mb-6">
              {t('history.noReflections', 'No reflections saved yet. Your completed sessions will appear here.')}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="px-8 py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20"
            >
              {t('start_new_session', 'Start New Session')}
            </motion.button>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence initial={false}>
              {entries.map((entry, i) => {
                const isExpanded = expanded === entry.id;
                return (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white dark:bg-slate-900 rounded-[2rem] border border-white/60 dark:border-slate-800 shadow-sm overflow-hidden"
                  >
                    <button
                      onClick={() => setExpanded(isExpanded ? null : entry.id)}
                      className="w-full text-left p-6 flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 dark:bg-slate-950 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                          <Calendar size={20} />
                        </div>
                        <div>
                          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
                            {formatDateString(entry.timestamp)}
                          </p>
                          <p className="text-base font-bold text-slate-800 dark:text-slate-200 line-clamp-1 mt-1">
                            {entry.checkIn}
                          </p>
                        </div>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-300 transition-transform duration-500 ${isExpanded ? 'rotate-180 text-primary' : ''}`}
                      />
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-6 pb-6 space-y-6"
                        >
                          <div className="grid gap-4">
                            {entry.responses?.map((r, idx) => (
                              <div key={idx} className="space-y-1">
                                <p className="text-[10px] font-bold text-primary uppercase tracking-widest">{prompts[idx]}</p>
                                <p className="text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">{r}</p>
                              </div>
                            ))}
                            <div className="space-y-1">
                              <p className="text-[10px] font-bold text-primary uppercase tracking-widest">
                                {t('history.prompts.3', 'Intention')}
                              </p>
                              <p className="text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">{entry.intention}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-[10px] font-bold text-primary uppercase tracking-widest">
                                <span className="flex items-center gap-1">
                                  <Check size={12} />{t('feeling', 'Feeling')}
                                </span>
                              </p>
                              <p className="text-sm text-slate-600 dark:text-slate-300 font-bold">{entry.checkIn}</p>
                            </div>
                          </div>

                          <div className="pt-4 border-t border-slate-50 dark:border-slate-800">
                            {confirmDelete === entry.id ? (
                              <div className="flex items-center gap-3 bg-rose-50 dark:bg-rose-950/20 p-3 rounded-2xl">
                                <p className="text-xs font-bold text-rose-600 dark:text-rose-400 flex-1 ml-2">
                                  {t('delete_this_entry', 'Delete this entry?')}
                                </p>
                                <button 
                                  onClick={() => setConfirmDelete(null)} 
                                  className="px-4 py-2 bg-white dark:bg-slate-900 text-slate-400 text-[10px] font-bold rounded-xl border border-white/60 dark:border-slate-800"
                                >
                                  {t('history.cancel', 'Cancel')}
                                </button>
                                <button 
                                  onClick={() => handleDelete(entry.id)} 
                                  className="px-4 py-2 bg-rose-500 text-white text-[10px] font-bold rounded-xl"
                                >
                                  {t('delete_5', 'Delete')}
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setConfirmDelete(entry.id)}
                                className="flex items-center gap-2 text-[10px] font-black text-slate-300 hover:text-rose-500 uppercase tracking-widest transition-colors"
                              >
                                <Trash2 size={14} />
                                {t('history.delete', 'Delete entry')}
                              </button>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

// --- Main App Page ---

type Screen = 'intro' | 'breathing' | 'r1' | 'r2' | 'r3' | 'intention' | 'checkin' | 'closing' | 'history';

function APauseForAppreciationInner() {
  const { t } = useTranslation(undefined, { i18n });
  const [screen, setScreen] = useState<Screen>('intro');
  const [responses, setResponses] = useState<string[]>(['', '', '']);
  const [intention, setIntention] = useState('');
  const [checkIn, setCheckIn] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const lang = params.get('lang') || 'en';
      loadLocale(lang);
    }
  }, []);

  const reflectionPrompts = useMemo(() => [
    {
      step: 1,
      prompt: t('reflection.prompts.p1', 'One small moment recently with your partner that did not feel tense was…'),
      example: t('reflection.prompts.p1_ex', '"We had a brief, calm conversation in the evening."'),
    },
    {
      step: 2,
      prompt: t('reflection.prompts.p2', 'One effort your partner has made — even if imperfect — is…'),
      example: t('reflection.prompts.p2_ex', '"They attempted to explain their feelings instead of withdrawing."'),
    },
    {
      step: 3,
      prompt: t('reflection.prompts.p3', 'One quality in your partner that has remained consistent over time is…'),
      example: t('reflection.prompts.p3_ex', '"They continue to show dedication toward our responsibilities."'),
    },
  ], [t]);

  const historyPrompts = useMemo(() => [
    t('history.prompts.0', 'One small moment that did not feel tense…'),
    t('history.prompts.1', 'One effort your partner has made…'),
    t('history.prompts.2', 'One quality that has remained consistent…'),
  ], [t]);

  const updateResponse = (index: number, value: string) => {
    setResponses((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const handleFinish = () => {
    const entry: ReflectionEntry = {
      id: typeof window !== 'undefined' && window.crypto?.randomUUID ? window.crypto.randomUUID() : Math.random().toString(36).substring(2) + Date.now().toString(36),
      timestamp: new Date().toISOString(),
      responses,
      intention,
      checkIn,
    };
    saveReflection(entry);
    setScreen('closing');
  };

  const resetFlow = () => {
    setResponses(['', '', '']);
    setIntention('');
    setCheckIn('');
    setScreen('intro');
  };

  const screenOrder: Screen[] = ['intro', 'breathing', 'r1', 'r2', 'r3', 'intention', 'checkin', 'closing'];
  const currentIdx = screenOrder.indexOf(screen);

  return (
    <PremiumLayout
      title={t('app_title', 'Reflecting')}
      icon={<Heart className="w-6 h-6 text-primary" />}
      onBack={
        screen === 'history'
          ? () => setScreen('intro')
          : currentIdx > 0 && screen !== 'closing'
          ? () => setScreen(screenOrder[currentIdx - 1])
          : undefined
      }
      onReset={currentIdx > 0 && screen !== 'closing' ? resetFlow : undefined}
    >
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-4 min-h-[70vh]">
        {screen !== 'closing' && screen !== 'history' && (
          <div className="flex justify-center gap-2 mb-10">
            {screenOrder.slice(0, 7).map((s, i) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i <= currentIdx ? 'w-8 bg-primary' : 'w-2 bg-slate-100 dark:bg-slate-800'
                }`}
              />
            ))}
          </div>
        )}

        <div className="relative flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            {screen === 'intro' && (
              <motion.div key="intro" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="w-full">
                <PremiumIntro
                  title={t('title', 'A Pause for Appreciation')}
                  description={t('intro.text1', 'When a relationship feels strained, it can become easy to focus only on what is not working. This reflection offers a brief pause — not to dismiss concerns, but to gently broaden perspective.')}
                  onStart={() => setScreen('breathing')}
                  icon={<Heart size={32} />}
                  benefits={[
                    t('intro_p1', 'Cultivate gratitude'),
                    t('intro_p2', 'Reduce stress'),
                    t('intro_p3', 'Improve well-being'),
                  ]}
                  duration={t('app_duration', '3-5 minutes')}
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 text-center"
                  >
                    <button
                      onClick={() => setScreen('history')}
                      className="inline-flex items-center gap-2 text-slate-400 hover:text-primary font-black text-[10px] uppercase tracking-widest transition-all"
                    >
                      <History size={16} />
                      {t('intro.viewHistory', 'View History')}
                    </button>
                  </motion.div>
                </PremiumIntro>
              </motion.div>
            )}

            {screen === 'breathing' && (
              <motion.div key="breathing" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="w-full">
                <BreathingScreen onContinue={() => setScreen('r1')} />
              </motion.div>
            )}

            {screen === 'r1' && (
              <motion.div key="r1" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="w-full">
                <ReflectionPrompt
                  {...reflectionPrompts[0]}
                  total={4}
                  value={responses[0]}
                  onChange={(v) => updateResponse(0, v)}
                  onNext={() => setScreen('r2')}
                />
              </motion.div>
            )}

            {screen === 'r2' && (
              <motion.div key="r2" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="w-full">
                <ReflectionPrompt
                  {...reflectionPrompts[1]}
                  total={4}
                  value={responses[1]}
                  onChange={(v) => updateResponse(1, v)}
                  onNext={() => setScreen('r3')}
                />
              </motion.div>
            )}

            {screen === 'r3' && (
              <motion.div key="r3" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="w-full">
                <ReflectionPrompt
                  {...reflectionPrompts[2]}
                  total={4}
                  value={responses[2]}
                  onChange={(v) => updateResponse(2, v)}
                  onNext={() => setScreen('intention')}
                />
              </motion.div>
            )}

            {screen === 'intention' && (
              <motion.div key="intention" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="w-full">
                <IntentionScreen
                  value={intention}
                  onChange={setIntention}
                  onContinue={() => setScreen('checkin')}
                />
              </motion.div>
            )}

            {screen === 'checkin' && (
              <motion.div key="checkin" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="w-full">
                <CheckInScreen
                  value={checkIn}
                  onChange={setCheckIn}
                  onFinish={handleFinish}
                />
              </motion.div>
            )}

            {screen === 'closing' && (
              <motion.div key="closing" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="w-full">
                <PremiumComplete
                  title={t('title', 'A Pause for Appreciation')}
                  message={t('closing.text1', 'This pause does not erase challenges. It simply restores balance in how the relationship is viewed.') + ' ' + t('closing.text2', 'Even brief moments of noticing can gradually soften emotional rigidity and create space for healthier conversations.')}
                  onRestart={resetFlow}
                  shareEmoji=""
                  shareContent={`I just completed "A Pause for Appreciation" on TherapyMantra — a guided mindful appreciation that genuinely helped me. Try it! \n\n Android: https://play.google.com/store/apps/details?id=org.mantracare.therapy\n iOS: https://apps.apple.com/pk/app/therapymantra/id1607643888`}
                >
                  <div className="w-full max-w-md mx-auto mt-8">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setScreen('history')}
                      className="w-full py-5 rounded-[2rem] bg-white/60 backdrop-blur-md border border-white/60 shadow-inner text-slate-500 font-black text-sm uppercase tracking-widest shadow-xl shadow-slate-200/50 hover:text-primary hover:border-primary/20 transition-all flex items-center justify-center gap-3"
                    >
                      <History size={20} />{t('closing.viewHistory', 'View History')}
                    </motion.button>
                  </div>
                </PremiumComplete>
              </motion.div>
            )}

            {screen === 'history' && (
              <motion.div key="history" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="w-full">
                <HistoryScreen
                  onBack={() => setScreen('intro')}
                  prompts={historyPrompts}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PremiumLayout>
  );
}

export default function APauseForAppreciationPage() {
  return (
    <I18nextProvider i18n={i18n}>
      <APauseForAppreciationInner />
    </I18nextProvider>
  );
}