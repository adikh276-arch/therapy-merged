'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useTranslation, I18nextProvider } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Play, Pause, RotateCcw, Volume2, VolumeX, CheckCircle2, Heart, Sparkles } from 'lucide-react';
import i18n, { loadLocale } from './i18n';
import { PremiumLayout } from '@/components/shared/PremiumLayout';
import { PremiumIntro } from '@/components/shared/PremiumIntro';
import { PremiumComplete } from '@/components/shared/PremiumComplete';

// --- Types & Constants ---

type Screen = 'choose' | 'timer' | 'energy';

const TOTAL_SECONDS = 5 * 60; // 5 minutes

// --- Environment Optimization Inner ---

function EnvironmentOptimizationInner() {
  const { t } = useTranslation(undefined, { i18n });
  const [screen, setScreen] = useState<Screen>('choose');
  const [seconds, setSeconds] = useState(TOTAL_SECONDS);
  const [isRunning, setIsRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Sync with search/URL query param for localized translations
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const lang = params.get('lang') || 'en';
      loadLocale(lang);
    }
  }, []);

  const playChime = useCallback(() => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 528;
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 2);
    } catch {
      // silently fail
    }
  }, [soundEnabled]);

  // Timer Tick EFFECT
  useEffect(() => {
    if (isRunning && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => s - 1);
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, seconds]);

  // Timer Completion EFFECT
  useEffect(() => {
    if (seconds === 0 && isRunning) {
      setIsRunning(false);
      playChime();
      const timeout = setTimeout(() => {
        setScreen('energy');
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [seconds, isRunning, playChime]);

  const handleFinishEarly = () => {
    setIsRunning(false);
    playChime();
    setScreen('energy');
  };

  const handleResetTimer = () => {
    setIsRunning(false);
    setSeconds(TOTAL_SECONDS);
  };

  const handleResetAll = () => {
    setScreen('choose');
    handleResetTimer();
  };

  const areas = useMemo(
    () => [
      `️ ${t('one_corner_desk', 'One corner of your desk')}`,
      `️ ${t('bedside_table', 'Bedside table')}`,
      `🪑 ${t('one_chair', 'One chair')}`,
      ` ${t('small_section_floor', 'Small section of the floor')}`,
    ],
    [t]
  );

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const progress = ((TOTAL_SECONDS - seconds) / TOTAL_SECONDS) * 100;
  const circumference = 2 * Math.PI * 88;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const screenOrder: Screen[] = ['choose', 'timer', 'energy'];
  const currentIdx = screenOrder.indexOf(screen);

  return (
    <PremiumLayout
      title={t('app_title', 'Environment Optimization Exercise')}
      icon={<Home className="w-6 h-6 text-primary" />}
      onBack={currentIdx > 0 && screen !== 'energy' ? handleResetAll : undefined}
      onReset={currentIdx > 0 && screen !== 'energy' ? handleResetAll : undefined}
    >
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-4 min-h-[70vh] text-center">
        <AnimatePresence mode="wait">
          {/* SCREEN 1: CHOOSE AREA */}
          {screen === 'choose' && (
            <motion.div
              key="choose"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="w-full flex-1 flex flex-col"
            >
              <PremiumIntro
                title={t('app_title', 'Environment Optimization Exercise')}
                description={`${t('choose_space', 'Choose one small space near you.')} ${t(
                  'not_whole_room',
                  'Not the whole room — just one small area.'
                )}`}
                onStart={() => setScreen('timer')}
                icon={<Home size={32} />}
                benefits={areas}
                duration={t('app_duration', '5 minutes')}
              />
            </motion.div>
          )}

          {/* SCREEN 2: 5-MIN TIMER */}
          {screen === 'timer' && (
            <motion.div
              key="timer"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="w-full space-y-8 py-4 text-center"
            >
              {/* Step indicator */}
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary/30" />
                <div className="w-3.5 h-3.5 rounded-full bg-primary flex items-center justify-center text-[7px] text-white font-bold font-mono">
                  2
                </div>
                <div className="w-2 h-2 rounded-full bg-primary/30" />
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-black text-primary uppercase tracking-widest">
                  {t('step_2_of_3', 'Step 2 of 3')}
                </p>
                <h1 className="act-heading">
                  {t('five_min_reset', '5-Minute Reset')}
                </h1>
              </div>

              {/* Instruction Panel */}
              <div className="p-6 bg-white dark:bg-slate-900 rounded-[2rem] border border-white/60 dark:border-slate-800 text-left space-y-4 shadow-sm">
                <p className="text-base font-bold text-slate-800 dark:text-slate-200">
                  {t('next_5_minutes', 'For the next 5 minutes:')}
                </p>
                <ul className="space-y-3.5 text-sm font-bold text-slate-600 dark:text-slate-350">
                  <li className="flex items-start gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary mt-1.5 shrink-0 animate-pulse" />
                    <span>{t('remove_trash', 'Remove trash')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary mt-1.5 shrink-0 animate-pulse" />
                    <span>{t('put_away_items', 'Put away items that belong elsewhere')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary mt-1.5 shrink-0 animate-pulse" />
                    <span>{t('neatly_place_remains', 'Neatly place what remains')}</span>
                  </li>
                </ul>
                <p className="text-xs font-medium text-slate-400 dark:text-slate-500 italic pt-1 border-t border-slate-50 dark:border-slate-850">
                  {t('not_perfect', 'Stop when the timer ends. It does not need to be perfect.')}
                </p>
              </div>

              {/* Circular Timer Ring */}
              <div className="relative w-48 h-48 mx-auto">
                <svg className="w-48 h-48 -rotate-90" viewBox="0 0 192 192">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    fill="none"
                    stroke="var(--color-bg, #F1F5F9)"
                    className="stroke-slate-100 dark:stroke-slate-800"
                    strokeWidth="6"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    fill="none"
                    stroke="var(--color-primary, #3b82f6)"
                    className="stroke-primary"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    style={{ transition: 'stroke-dashoffset 1s linear' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span
                    className={`text-4xl font-extrabold tracking-tight font-mono tabular-nums ${
                      seconds === 0 ? 'text-primary animate-pulse' : 'text-slate-850 dark:text-white'
                    }`}
                  >
                    {String(minutes).padStart(2, '0')}:{String(secs).padStart(2, '0')}
                  </span>
                </div>
              </div>

              {/* Circular Controls */}
              <div className="flex items-center justify-center gap-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleResetTimer}
                  className="w-12 h-12 rounded-full border border-white/60 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white flex items-center justify-center shadow-sm"
                >
                  <RotateCcw size={18} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsRunning(!isRunning)}
                  className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/15 hover:shadow-xl"
                >
                  {isRunning ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="w-12 h-12 rounded-full border border-white/60 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white flex items-center justify-center shadow-sm"
                >
                  {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                </motion.button>
              </div>

              <p className="text-xs font-bold text-slate-400 dark:text-slate-550 uppercase tracking-widest">
                {soundEnabled ? t('chime_done', 'Gentle chime when done') : t('sound_off', 'Sound off')}
              </p>

              {/* Finish Early Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleFinishEarly}
                className="w-full py-4.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/40 dark:border-slate-800 text-slate-650 dark:text-slate-350 font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 hover:bg-slate-200"
              >
                <CheckCircle2 size={16} />
                {t('im_done', "I'm Done — Continue")}
              </motion.button>
            </motion.div>
          )}

          {/* SCREEN 3: REFLECTION */}
          {screen === 'energy' && (
            <motion.div
              key="energy"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="w-full"
            >
              <PremiumComplete
                title={t('pause_and_notice', 'Pause and Notice')}
                message={
                  t('look_again', 'Look at the space again.') +
                  ' ' +
                  t('feel_lighter', 'Does it feel even slightly lighter?')
                }
                onRestart={handleResetAll}
                icon={<Sparkles size={48} />}
                  shareEmoji=""
                  shareContent={"I just completed 'Environment Optimization' on TherapyMantra — a guided wellness optimization that genuinely helped me. Try it! \n\n Android: https://play.google.com/store/apps/details?id=org.mantracare.therapy\n iOS: https://apps.apple.com/pk/app/therapymantra/id1607643888"}
              >
                <div className="space-y-6 w-full mt-6">
                  <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-white/60 dark:border-slate-800 p-6 shadow-sm text-left space-y-4">
                    <p className="text-slate-600 dark:text-slate-350 text-sm font-bold leading-relaxed">
                      {t('draining_item', 'If one item still feels draining, move or remove just that one thing.')}
                    </p>
                    <p className="text-primary font-extrabold italic text-sm">
                      {t('slow_breath', 'Take one slow breath.')}
                    </p>
                    <div className="bg-primary/5 rounded-2xl p-4.5 border border-primary/10">
                      <p className="text-slate-750 dark:text-slate-300 font-bold leading-relaxed text-center text-xs">
                        {t('reduced_load', 'You reduced mental load today.')}
                        <br />
                        <span className="text-primary font-black uppercase tracking-wider text-[11px] block mt-1.5">
                          {t('that_matters', 'That matters.')}
                        </span>
                      </p>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={handleResetAll}
                    className="w-full py-4.5 rounded-2xl bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/10 hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Heart size={14} />
                    {t('finish', 'Finish')}
                  </motion.button>
                </div>
              </PremiumComplete>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
}

export default function EnvironmentOptimizationPage() {
  return (
    <I18nextProvider i18n={i18n}>
      <EnvironmentOptimizationInner />
    </I18nextProvider>
  );
}