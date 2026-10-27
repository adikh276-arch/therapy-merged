'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslation, I18nextProvider } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Wind, Loader2, ArrowLeft, Check, Compass, Moon, Footprints, Coffee, ClipboardList } from 'lucide-react';
import i18n, { loadLocale } from './i18n';
import { PremiumLayout } from '@/components/shared/PremiumLayout';

interface Tip {
  slug: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  whyItHelps: string;
  whatYouCanDo: string[];
  buttonLabel?: string;
  hasBreathing?: boolean;
}

const TIPS: Tip[] = [
  {
    slug: "sleep",
    title: "Get Restful Sleep",
    description: "Aim for 7–9 hours of sleep each night. Try to sleep and wake up at the same time daily.",
    icon: <Moon />,
    iconBg: "bg-cyan-50  text-cyan-600",
    whyItHelps: "Sleep helps your brain and body recover and lowers stress hormones.",
    whatYouCanDo: [
      "Keep a fixed sleep schedule",
      "Avoid screens 1 hour before bed",
      "Keep room cool and dark",
      "Avoid caffeine after 4 PM",
    ],
    buttonLabel: "Set Sleep Reminder",
  },
  {
    slug: "breathing",
    title: "Practice Deep Breathing",
    description: "Spend a few minutes focusing on your breath. Slow breathing reduces anxiety.",
    icon: <Wind />,
    iconBg: "bg-teal-50  text-teal-600",
    whyItHelps: "Slow breathing activates your body's relaxation response.",
    whatYouCanDo: [
      "Inhale for 4 seconds",
      "Hold for 4 seconds",
      "Exhale for 4 seconds",
      "Repeat for 1 minute",
    ],
    hasBreathing: true,
  },
  {
    slug: "exercise",
    title: "Move Your Body",
    description: "Light walking or stretching helps release stress and improve mood.",
    icon: <Footprints />,
    iconBg: "bg-blue-50  text-blue-600",
    whyItHelps: "Exercise releases endorphins and improves mood.",
    whatYouCanDo: [
      "15-minute walk",
      "Light stretching",
      "Short yoga session",
      "Quick home workout",
    ],
  },
  {
    slug: "caffeine",
    title: "Limit Caffeine & Sugar",
    description: "Too much caffeine and sugar can increase anxiety and disturb sleep.",
    icon: <Coffee />,
    iconBg: "bg-white/40 backdrop-blur-sm shadow-sm border border-white/50  text-slate-600",
    whyItHelps: "Too much caffeine and sugar increases anxiety and sleep problems.",
    whatYouCanDo: [
      "Replace one coffee with herbal tea",
      "Drink more water",
      "Reduce sugary snacks",
      "Avoid caffeine late in the day",
    ],
  },
  {
    slug: "planning",
    title: "Plan Your Day",
    description: "Break large tasks into smaller steps to avoid feeling overwhelmed.",
    icon: <ClipboardList />,
    iconBg: "bg-amber-50  text-amber-600",
    whyItHelps: "Planning reduces mental clutter and overwhelm.",
    whatYouCanDo: [
      "Write 3 main tasks",
      "Break tasks into small steps",
      "Focus on one task at a time",
      "Take short breaks",
    ],
  },
];

// Local Breathing Guide Component
function BreathingGuide() {
  const { t } = useTranslation(undefined, { i18n });
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [paused, setPaused] = useState(false);

  const durations = { inhale: 4000, hold: 4000, exhale: 4000 };

  const nextPhase = useCallback(() => {
    setPhase((p) => {
      if (p === 'inhale') return 'hold';
      if (p === 'hold') return 'exhale';
      return 'inhale';
    });
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(nextPhase, durations[phase]);
    return () => clearTimeout(timer);
  }, [phase, paused, nextPhase]);

  const scaleClass =
    phase === 'inhale'
      ? 'scale-[1.25] bg-teal-500/25 border-teal-500'
      : phase === 'exhale'
      ? 'scale-[0.75] bg-teal-500/10 border-teal-500/40'
      : 'scale-[1.25] bg-teal-500/20 border-teal-500';

  const label =
    phase === 'inhale' ? t('Inhale…', 'Inhale…') : phase === 'hold' ? t('Hold…', 'Hold…') : t('Exhale…', 'Exhale…');

  return (
    <div className="flex flex-col items-center gap-6 py-6 text-center">
      <div className="relative flex items-center justify-center w-48 h-48">
        {/* Pulsing breathing ring */}
        <div
          className={`w-32 h-32 rounded-full border-4 flex items-center justify-center transition-all ease-in-out duration-[4000ms] ${
            paused ? 'scale-100 bg-slate-100 border-slate-300' : scaleClass
          }`}
        >
          <span className="text-4xl animate-pulse"><Wind className="inline-block w-8 h-8" /></span>
        </div>
        {/* Soft decorative outer circle */}
        <div
          className={`absolute inset-0 rounded-full border border-dashed border-teal-500/20 transition-all ease-in-out duration-[4000ms] ${
            paused ? 'scale-100' : scaleClass
          }`}
        />
      </div>

      <div className="space-y-1">
        <p className="text-lg font-black text-slate-800">
          {label}
        </p>
        <p className="field-label">
          {t('breathing_instruction', 'Follow the circle to regulate')}
        </p>
      </div>

      <button
        onClick={() => setPaused((p) => !p)}
        className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest shadow-md transition-all active:scale-95"
      >
        {paused ? t('Resume', 'Resume') : t('Pause', 'Pause')}
      </button>
    </div>
  );
}

function StressTipsInner() {
  const { t } = useTranslation(undefined, { i18n });
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  // Sync lang URL parameter
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const lang = params.get('lang') || 'en';
      loadLocale(lang);
    }
  }, []);

  const activeTip = TIPS.find((t) => t.slug === selectedSlug);

  return (
    <PremiumLayout
      title={t('app_title', 'Stress Management')}
      icon={<Sparkles className="w-6 h-6 text-primary animate-pulse" />}
      onBack={selectedSlug ? () => setSelectedSlug(null) : undefined}
      onReset={selectedSlug ? () => setSelectedSlug(null) : undefined}
    >
      <div className="w-full max-w-lg mx-auto px-3 sm:px-6 py-3 sm:py-4 min-h-[70vh] flex flex-col justify-start">
        <AnimatePresence mode="wait">
          {/* SCREEN 1: OVERVIEW TIPS LIST */}
          {!selectedSlug && (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6 sm:space-y-8 w-full"
            >
              <header className="space-y-2 sm:space-y-3 text-left">
                <div className="flex items-center gap-1.5 text-primary font-black text-[10px] uppercase tracking-[0.2em]">
                  <Sparkles size={12} />
                  {t('Grounding', 'Mental De-stress')}
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
                  {t('stay_present', 'Stress Relief Tips')}
                </h1>
                <p className="text-slate-500 text-xs sm:text-sm font-medium leading-relaxed">
                  {t(
                    'Choose any target strategy below to explore why it helps and how you can apply it daily.',
                    'Choose any target strategy below to explore why it helps and how you can apply it daily.'
                  )}
                </p>
              </header>

              <div className="flex flex-col gap-3 sm:gap-4">
                {TIPS.map((tip, idx) => {
                  const title = t(`tip.${tip.slug}.title`, tip.title);
                  const desc = t(`tip.${tip.slug}.desc`, tip.description);

                  return (
                    <motion.button
                      key={tip.slug}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setSelectedSlug(tip.slug)}
                      className="w-full p-4 sm:p-5 text-left rounded-2xl sm:rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:border-primary/20 transition-all flex flex-col justify-start gap-1.5 sm:gap-2 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl ${tip.iconBg} flex items-center justify-center text-lg sm:text-xl shrink-0`}>
                          {tip.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm sm:text-base leading-tight">
                            {title}
                          </h4>
                        </div>
                      </div>
                      <p className="text-slate-500 text-xs font-medium leading-relaxed pl-1 pt-0.5 line-clamp-2">
                        {desc}
                      </p>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* SCREEN 2: TIP DETAILS EXPANSION */}
          {selectedSlug && activeTip && (
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6 sm:space-y-8 w-full text-left pb-20"
            >
              <button
                onClick={() => setSelectedSlug(null)}
                className="font-bold text-xs text-slate-400 mb-1 flex items-center gap-1.5 hover:text-primary transition-colors uppercase tracking-wider"
              >
                <ArrowLeft size={16} />
                {t('detail.back', 'Back to Tips')}
              </button>

              <div className="flex items-center gap-3 sm:gap-4">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${activeTip.iconBg} flex items-center justify-center text-xl sm:text-2xl shrink-0`}>
                  {activeTip.icon}
                </div>
                <div>
                  <h1 className="font-extrabold text-slate-900 text-lg sm:text-xl">
                    {t(`tip.${activeTip.slug}.title`, activeTip.title)}
                  </h1>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">
                    {t('wellness_tip', 'DAILY STRESS STRATEGY')}
                  </p>
                </div>
              </div>

              {/* Dynamic breathing guide overlay */}
              {activeTip.hasBreathing && (
                <div className="p-5 sm:p-7 bg-teal-500/5 border border-teal-500/15 rounded-2xl sm:rounded-[2rem] space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-2 text-teal-600 font-black text-[10px] uppercase tracking-widest">
                    <Wind size={16} />
                    {t('breathing_guide', 'PULSING BREATHING REGULATOR')}
                  </div>
                  <BreathingGuide />
                </div>
              )}

              {/* Why it helps */}
              <div className="bg-white rounded-2xl sm:rounded-[2rem] border border-slate-100 p-5 sm:p-7 shadow-sm space-y-2">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">
                  {t('detail.whyTitle', 'WHY IT HELPS')}
                </span>
                <p className="text-slate-700 text-sm sm:text-base font-medium leading-relaxed italic">
                  &ldquo;{t(`tip.${activeTip.slug}.why`, activeTip.whyItHelps)}&rdquo;
                </p>
              </div>

              {/* What you can do checklists */}
              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-black text-slate-800 tracking-tight">
                  {t('detail.doTitle', 'Steps You Can Take')}
                </h3>
                <div className="grid gap-2.5 sm:gap-3">
                  {activeTip.whatYouCanDo.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-white rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm"
                    >
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={16} strokeWidth={2.5} />
                      </div>
                      <span className="text-slate-700 text-xs sm:text-sm font-medium leading-relaxed pt-0.5">
                        {t(`tip.${activeTip.slug}.do[${i}]`, item)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
}

export default function StressTipsPage() {
  return (
    <I18nextProvider i18n={i18n}>
      <StressTipsInner />
    </I18nextProvider>
  );
}