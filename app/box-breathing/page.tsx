'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Pause, Play, RotateCcw, Wind } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from './i18n';
import { PremiumLayout } from '@/components/shared/PremiumLayout';
import { PremiumIntro } from '@/components/shared/PremiumIntro';
import { PremiumComplete } from '@/components/shared/PremiumComplete';

// ─── Session Screen ────────────────────────────────────────────────────────────

const PHASES = [
  { label: 'breathe_in',  duration: 4 },
  { label: 'hold',        duration: 4 },
  { label: 'breathe_out', duration: 4 },
  { label: 'hold',        duration: 4 },
] as const;

const TOTAL_CYCLES = 4;

function SessionScreen({ onComplete, onEnd }: { onComplete: () => void; onEnd: () => void }) {
  const { t } = useTranslation(undefined, { i18n });
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [countdown, setCountdown] = useState<number>(PHASES[0].duration);
  const [cycle, setCycle] = useState(1);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const phase = PHASES[phaseIndex];

  const tick = useCallback(() => {
    setCountdown((prev) => {
      if (prev <= 1) {
        setPhaseIndex((pi) => {
          const next = (pi + 1) % PHASES.length;
          if (next === 0) {
            setCycle((c) => {
              if (c >= TOTAL_CYCLES) { onComplete(); return c; }
              return c + 1;
            });
          }
          return next;
        });
        return PHASES[(phaseIndex + 1) % PHASES.length].duration;
      }
      return prev - 1;
    });
  }, [phaseIndex, onComplete]);

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(tick, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [tick, paused]);

  const circleScale = phaseIndex === 0 || phaseIndex === 1 ? 1 : 0.6;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] relative">
      {/* Cycle indicators */}
      <div className="absolute top-0 left-0 right-0 flex justify-center gap-3">
        {Array.from({ length: TOTAL_CYCLES }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: i + 1 === cycle ? 1.2 : 1,
              backgroundColor: i + 1 <= cycle ? 'var(--color-primary, #3b82f6)' : '#E2E8F0',
            }}
            className="w-2.5 h-2.5 rounded-full"
          />
        ))}
      </div>

      {/* Breathing circle */}
      <div className="flex flex-col items-center mt-12">
        <div className="relative flex items-center justify-center w-64 h-64">
          {/* Glow */}
          <motion.div
            animate={{ scale: circleScale * 1.1, opacity: paused ? 0.1 : [0.1, 0.3, 0.1] }}
            transition={{ scale: { duration: 4, ease: 'easeInOut' }, opacity: { duration: 2, repeat: Infinity } }}
            className="absolute inset-0 rounded-full bg-primary/20 blur-2xl"
          />
          {/* Main circle */}
          <motion.div
            animate={{ scale: circleScale }}
            transition={{ duration: 4, ease: 'easeInOut' }}
            className="w-full h-full rounded-full bg-primary flex items-center justify-center shadow-2xl shadow-primary/30 z-10"
          >
            <div className="text-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={phase.label}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-white font-bold text-xl uppercase tracking-widest block"
                >
                  {t(phase.label, phase.label)}
                </motion.span>
              </AnimatePresence>
              <span className="text-white/70 text-4xl font-light tabular-nums mt-2 block">
                {countdown}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-8 mt-16">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setPaused((p) => !p)}
          className={`w-20 h-20 rounded-[2rem] flex items-center justify-center shadow-xl transition-all ${
            paused
              ? 'bg-primary text-white shadow-primary/20'
              : 'bg-white text-slate-900 border border-white/60 shadow-slate-200'
          }`}
        >
          {paused ? <Play size={32} fill="currentColor" className="ml-1" /> : <Pause size={32} fill="currentColor" />}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05, rotate: -90 }}
          whileTap={{ scale: 0.95 }}
          onClick={onEnd}
          className="w-16 h-16 rounded-[1.5rem] bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 text-slate-400 border border-white/60 flex items-center justify-center hover:bg-slate-100 hover:text-slate-600 transition-all shadow-sm"
        >
          <RotateCcw size={24} strokeWidth={3} />
        </motion.button>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

type Screen = 'overview' | 'session' | 'complete';

function BoxBreathingInner() {
  const { t } = useTranslation(undefined, { i18n });
  const [screen, setScreen] = useState<Screen>('overview');

  return (
    <PremiumLayout
      title={t('app_title', 'Box Breathing')}
      onReset={screen !== 'overview' ? () => setScreen('overview') : undefined}
    >
      <div className="w-full">
        <AnimatePresence mode="wait">
          {screen === 'overview' && (
            <motion.div key="overview" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="w-full">
              <PremiumIntro
                title={t('app_title', 'Box Breathing')}
                description={t('app_description', '')}
                onStart={() => setScreen('session')}
                icon={<Wind size={32} />}
                benefits={[t('intro_p1', ''), t('intro_p2', ''), t('intro_p3', '')]}
                duration={t('app_duration', '5 minutes')}
              />
            </motion.div>
          )}
          {screen === 'session' && (
            <motion.div key="session" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} className="w-full">
              <SessionScreen onComplete={() => setScreen('complete')} onEnd={() => setScreen('overview')} />
            </motion.div>
          )}
          {screen === 'complete' && (
            <motion.div key="complete" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="w-full">
              <PremiumComplete
                title={t('app_title', 'Box Breathing')}
                message={t('app_complete_message', '')}
                onRestart={() => setScreen('session')}
                icon={<Wind size={48} />}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
}

export default function BoxBreathingPage() {
  return (
    <I18nextProvider i18n={i18n}>
      <BoxBreathingInner />
    </I18nextProvider>
  );
}
