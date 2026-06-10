'use client';

import { useState, useEffect } from 'react';
import { useTranslation, I18nextProvider } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sparkles, ChevronRight, CheckCircle2, RefreshCw, Sun, Waves, Coffee, Smartphone, Wine, Frown } from "lucide-react";
import i18n, { loadLocale } from './i18n';
import { PremiumLayout } from '@/components/shared/PremiumLayout';


// SVG Sleep Cycle wave rendering
const WaveDiagram = () => {
  const { t } = useTranslation(undefined, { i18n });

  // Math calculated sine curve
  const points: string[] = [];
  for (let x = 0; x <= 240; x += 1) {
    const y = 40 + 25 * Math.sin((x / 80) * 2 * Math.PI);
    points.push(`${x + 20},${y}`);
  }
  const pathD = "M" + points.join(" L");

  const cycles = t("s3.wave.cycles", { returnObjects: true }) as string[] || ["Cycle 1", "Cycle 2", "Cycle 3"];

  return (
    <svg viewBox="0 0 280 100" className="w-full max-h-[110px]">
      {/* Y-axis labels */}
      <text x="4" y="20" fontSize="8" className="fill-slate-400 font-bold uppercase tracking-wider">{t("s3.wave.light", "Light")}</text>
      <text x="4" y="72" fontSize="8" className="fill-slate-400 font-bold uppercase tracking-wider">{t("s3.wave.deep", "Deep")}</text>

      {/* Wave curve */}
      <path d={pathD} fill="none" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" />

      {/* Cycle 2 groggy zone indicator */}
      <line x1="140" y1="65" x2="140" y2="15" stroke="#ef4444" strokeWidth="1" strokeDasharray="3,2" />
      <circle cx="140" cy="65" r="4" fill="#ef4444" className="animate-pulse" />
      <text x="120" y="10" fontSize="8" fill="#ef4444" className="font-extrabold uppercase tracking-widest">{t("s3.wave.groggy", "Groggy")}</text>

      {/* Cycle 3 fresh wake up zone */}
      <line x1="220" y1="65" x2="220" y2="15" stroke="#10b981" strokeWidth="1" strokeDasharray="3,2" />
      <circle cx="220" cy="65" r="4" fill="#10b981" className="animate-pulse" />
      <text x="206" y="10" fontSize="8" fill="#10b981" className="font-extrabold uppercase tracking-widest">{t("s3.wave.fresh", "Fresh")}</text>

      {/* X-axis labels */}
      <text x="50" y="95" fontSize="8" className="fill-slate-400 font-black uppercase tracking-wider" textAnchor="middle">{cycles[0]}</text>
      <text x="130" y="95" fontSize="8" className="fill-slate-400 font-black uppercase tracking-wider" textAnchor="middle">{cycles[1]}</text>
      <text x="210" y="95" fontSize="8" className="fill-slate-400 font-black uppercase tracking-wider" textAnchor="middle">{cycles[2]}</text>
    </svg>
  );
};

function SleepCycleGuideInner() {
  const { t } = useTranslation(undefined, { i18n });
  const [step, setStep] = useState(0);
  const [expandedStage, setExpandedStage] = useState<number | null>(null);
  const [selectedReflection, setSelectedReflection] = useState<number | null>(null);

  // Localization sync
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const lang = params.get('lang') || 'en';
      loadLocale(lang);
    }
  }, []);

  const goNext = () => setStep((s) => Math.min(s + 1, 3));
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const resetFlow = () => {
    setStep(0);
    setExpandedStage(null);
    setSelectedReflection(null);
  };

  // Safe translation loaders
  const getStages = () => {
    const raw = t("s2.stages", { returnObjects: true });
    if (Array.isArray(raw)) return raw;
    return [
      { icon: <Sun className="w-5 h-5" />, title: "Stage 1: NREM", tag: "Transition state (1-7 min)", body: "Your body begins to drift off, heart rate slows down, muscles relax slightly. Waking up here feels simple." },
      { icon: <Moon className="w-5 h-5" />, title: "Stage 2: NREM Light", tag: "Light Sleep (10-25 min)", body: "Body temperature drops, brain activity slows. Waking up here is relatively comfortable." },
      { icon: <Moon className="w-5 h-5" />, title: "Stage 3: NREM Deep", tag: "Slow-wave Rest (20-40 min)", body: "Crucial physical recovery takes place. Waking up from this stage produces severe morning grogginess." },
      { icon: <Waves className="w-5 h-5" />, title: "Stage 4: REM Sleep", tag: "Dream Stage (10-60 min)", body: "High brain activity, vivid dreaming, cognitive restoration. Waking up here feels natural." }
    ];
  };

  const getDisruptors = () => {
    const raw = t("s3.disruptors", { returnObjects: true });
    if (Array.isArray(raw)) return raw;
    return [
      { icon: <Coffee className="w-5 h-5" />, text: "Late Caffeine", sub: "Blocks tiredness chemicals" },
      { icon: <Smartphone className="w-5 h-5" />, text: "Blue Screens", sub: "Delays natural melatonin" },
      { icon: <Wine className="w-5 h-5" />, text: "Bedtime Alcohol", sub: "Fragments restorative cycles" },
      { emoji: "⏰", text: "Inconsistent Alarms", sub: "Interrupts deep stages" }
    ];
  };

  const getReflectionOptions = () => {
    const raw = t("s4.options", { returnObjects: true });
    if (Array.isArray(raw)) return raw;
    return [
      { icon: <Frown className="w-5 h-5" />, text: "Woke up exhausted despite sleeping 8 hours", sub: "Woken from deep sleep", tip: "Your alarm likely fired during your deep non-REM cycle. Try altering your bedtime in 90-minute chunks (e.g. 7.5 hours instead of 8)." },
      { icon: <Coffee className="w-5 h-5" />, text: "Need caffeine immediately to function", sub: "Poor sleep continuity", tip: "Late afternoon stimulants disrupt cycle transitions. Implement a strict no-caffeine rule starting 6 hours before bedtime." },
      { icon: <Sun className="w-5 h-5" />, text: "Woke up fully alert and energized", sub: "Optimal cycle alignment", tip: "Excellent! You woke up during a light sleep stage. Keep replicating this exact window." }
    ];
  };

  const stages = getStages();
  const disruptors = getDisruptors();
  const reflections = getReflectionOptions();

  const pillLabels = t("pill_labels", { returnObjects: true }) as string[] || ["Intro", "Stages", "Wave Calculator", "Commitment"];

  return (
    <PremiumLayout
      title={t("app_title", "Sleep Cycle Guide")}
      icon={<Moon className="w-6 h-6 text-primary animate-pulse" />}
      onBack={step > 0 ? goBack : undefined}
      onReset={step > 0 ? resetFlow : undefined}
    >
      <div className="w-full max-w-md mx-auto min-h-[70vh] flex flex-col px-6 py-4">

        <div className="flex justify-center gap-2 mb-8 relative z-10">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === step ? "w-8 bg-primary" : "w-2 bg-slate-150 dark:bg-slate-800"
              }`}
            />
          ))}
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-between pb-8">
          <AnimatePresence mode="wait">
            {/* SCREEN 0: INTRO HOOK */}
            {step === 0 && (
              <motion.div
                key="screen0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 flex flex-col items-center justify-center text-center py-4"
              >
                <div className="mb-6 bg-primary/10 w-24 h-24 rounded-full flex items-center justify-center shadow-inner">
                  <Frown className="w-10 h-10 text-primary" />
                </div>

                <h1 className="text-3xl font-extrabold text-slate-800 mb-6 leading-tight">
                  {t("s1.title", "Why Am I Tired?")}
                </h1>

                <div className="text-base text-slate-600 leading-relaxed space-y-4 max-w-sm mb-8">
                  <p>
                    {t("it_s_not_about", "It is not solely about ")}
                    <span className="font-bold text-slate-800">{t("how_long", "how long ")}</span>
                    {t("you_sleep", "you sleep.")}
                  </p>
                  <p>
                    {t("it_s_about", "It is about ")}
                    <span className="font-bold text-primary">{t("where", "where ")}</span>
                    {t("you_wake_up", "you wake up inside your sleep cycles.")}
                  </p>
                  <p className="text-sm text-slate-500 font-medium mt-4">
                    {t("s1.p3", "Sleep occurs in repeating 90-minute waves. Waking up at the trough makes you feel draggingly groggy.")}
                  </p>
                </div>

                <div className="w-full p-6 bg-slate-50 border border-slate-100 border-l-4 border-l-primary rounded-2xl shadow-sm text-left mb-10">
                  <p className="text-sm italic text-slate-600 leading-relaxed font-medium">
                    {t("s1.insight", "Waking up exactly at the end of a 90-minute cycle allows you to rise fresh and alert, even with fewer hours.")}
                  </p>
                </div>

                <div className="w-full max-w-xs mt-auto flex flex-col gap-3">
                  <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {t("s1.duration", "2 Minutes Guide")}
                  </div>
                  <button
                    onClick={goNext}
                    className="act-btn-primary"
                  >
                    {t("s1.button", "Understand Sleep Cycles")}
                  </button>
                </div>
              </motion.div>
            )}

            {/* SCREEN 1: SLEEP STAGES */}
            {step === 1 && (
              <motion.div
                key="screen1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 flex flex-col gap-6 py-2"
              >
                <div className="space-y-2 mb-2">
                  <h1 className="text-2xl font-bold text-slate-800 leading-tight">
                    {t("s2.title", "The 4 Stages of Sleep")}
                  </h1>
                  <p className="text-sm text-slate-500 font-medium">
                    {t("s2.desc", "Every 90 minutes, your brain steps through these distinct states:")}
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  {stages.map((s, i) => {
                    const isOpen = expandedStage === i;
                    return (
                      <div
                        key={i}
                        className={`bg-white border rounded-2xl overflow-hidden shadow-sm transition-all duration-300 ${
                          isOpen ? "border-primary/30 bg-primary/5" : "border-slate-100 hover:border-slate-200"
                        }`}
                      >
                        <button
                          className="w-full flex items-center gap-4 p-4 text-left"
                          onClick={() => setExpandedStage(isOpen ? null : i)}
                        >
                          <div className={`flex items-center justify-center shrink-0 w-10 h-10 rounded-xl shadow-inner ${isOpen ? "bg-white text-primary" : "bg-slate-50 text-slate-400"}`}>
                            {s.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-bold text-slate-800">{s.title}</div>
                            <div className="text-xs text-slate-500 font-medium mt-0.5">{s.tag}</div>
                          </div>
                          <motion.svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            animate={{ rotate: isOpen ? 90 : 0 }}
                            className={`shrink-0 ${isOpen ? "stroke-primary" : "stroke-slate-400"}`}
                          >
                            <path d="M5 3L9 7L5 11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </motion.svg>
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <p className="px-5 pb-5 pt-1 text-sm text-slate-600 leading-relaxed font-medium border-t border-slate-100 mt-2">
                                {s.body}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                <p className="text-xs italic text-center text-slate-500 font-medium mt-4">
                  {t("s2.italic", "Light & REM phases represent optimal fresh wake-up states.")}
                </p>

                <div className="w-full max-w-xs mx-auto mt-auto pt-4">
                  <button
                    onClick={goNext}
                    className="act-btn-primary"
                  >
                    {t("s2.button", "Calculate Morning Alertness")}
                  </button>
                </div>
              </motion.div>
            )}

            {/* SCREEN 2: WAVE DIAGRAM & DISRUPTORS */}
            {step === 2 && (
              <motion.div
                key="screen2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 flex flex-col gap-6 py-2"
              >
                <div className="space-y-2">
                  <h1 className="text-2xl font-bold text-slate-800 leading-tight">
                    {t("s3.title", "The Groggy-Calculator")}
                  </h1>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">
                    {t("dragged_out_of_deep_sleep_by_an_alarm_your_brain_l", "Being dragged out of deep stage non-REM sleep by an alarm causes major sleep inertia.")}
                  </p>
                </div>

                {/* SVG Visual Sleep cycle diagram */}
                <div className="p-4 bg-white border border-slate-100 rounded-3xl shadow-sm">
                  <WaveDiagram />
                </div>

                <p className="text-xs font-bold text-primary uppercase tracking-widest pl-1 mt-2">
                  {t("s3.disruptors_title", "Evening Cycle Disruptors")}
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {disruptors.map((d, i) => (
                    <div
                      key={i}
                      className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 mb-3 border border-slate-100">
                        {d.icon || <span className="text-xl">{d.emoji}</span>}
                      </div>
                      <p className="text-sm font-bold mt-2 text-slate-800">{d.text}</p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase mt-1 leading-tight">{d.sub}</p>
                    </div>
                  ))}
                </div>

                <p className="text-xs italic text-center text-slate-500 font-medium">
                  {t("s3.italic", "Avoiding screen blue-light 1 hour before sleep secures deeper restorative cycles.")}
                </p>

                <div className="w-full max-w-xs mx-auto mt-auto pt-4">
                  <button
                    onClick={goNext}
                    className="act-btn-primary"
                  >
                    {t("s3.button", "Evaluate Your Mornings")}
                  </button>
                </div>
              </motion.div>
            )}

            {/* SCREEN 3: BEDTIME REFLECTIONS & QUOTE */}
            {step === 3 && (
              <motion.div
                key="screen3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 flex flex-col gap-6 py-2"
              >
                <h1 className="text-2xl font-bold text-slate-800 leading-tight mb-2">
                  {t("s4.title", "Sleep Evaluation")}
                </h1>

                <div className="flex flex-col gap-3">
                  {reflections.map((o, i) => {
                    const isSel = selectedReflection === i;
                    return (
                      <button
                        key={i}
                        className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${
                          isSel
                            ? "bg-primary/5 border-primary shadow-sm"
                            : "bg-white border-slate-100 text-slate-700 hover:bg-slate-50 hover:border-slate-200"
                        }`}
                        onClick={() => setSelectedReflection(i)}
                      >
                        <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center border ${isSel ? "bg-white border-primary/20 text-primary" : "bg-slate-50 border-slate-100 text-slate-500"}`}>
                          {o.icon}
                        </div>
                        <div className="flex-1 mt-0.5">
                          <p className="text-sm font-bold text-slate-800">{o.text}</p>
                          <p className="text-xs text-slate-500 mt-1">{o.sub}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence mode="wait">
                  {selectedReflection !== null && (
                    <motion.div
                      key={selectedReflection}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-6 bg-primary/5 border border-primary/20 rounded-2xl shadow-inner mt-2"
                    >
                      <p className="text-sm font-medium leading-relaxed text-slate-700">
                         {reflections[selectedReflection].tip}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl shadow-sm relative mt-4">
                  <p className="text-sm italic leading-relaxed text-slate-600 font-medium">
                    "{t("s4.quote", "Protecting your cycles is not about perfect schedules. It is about understanding your bio-rhythm and treating your nights with patient care.")}"
                  </p>
                </div>

                <div className="w-full max-w-xs mx-auto mt-auto pt-6">
                  <button
                    onClick={resetFlow}
                    className="act-btn-secondary w-full"
                  >
                    <RefreshCw size={18} className="mr-2" />
                    {t("s4.button", "Restart Guide")}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PremiumLayout>
  );
}

export default function SleepCycleGuidePage() {
  return (
    <I18nextProvider i18n={i18n}>
      <SleepCycleGuideInner />
    </I18nextProvider>
  );
}
