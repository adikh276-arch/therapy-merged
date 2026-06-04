'use client';

import { useState, useEffect } from 'react';
import { useTranslation, I18nextProvider } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ListChecks, Sparkles, ArrowRight, ArrowLeft, Check, CheckCircle2, Lightbulb } from 'lucide-react';
import i18n, { loadLocale } from './i18n';
import { PremiumLayout } from '@/components/shared/PremiumLayout';
import { PremiumIntro } from '@/components/shared/PremiumIntro';
import { PremiumComplete } from '@/components/shared/PremiumComplete';

const pageVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
  exit: { opacity: 0, y: -15, transition: { duration: 0.3, ease: "easeIn" as const } },
};

function HabitsInner() {
  const { t } = useTranslation(undefined, { i18n });
  const [step, setStep] = useState(0);

  // Selections & reflections state
  const [bodySelected, setBodySelected] = useState<string[]>([]);
  const [mindSelected, setMindSelected] = useState<string[]>([]);
  const [copingSelected, setCopingSelected] = useState<string[]>([]);
  const [stressReflection, setStressReflection] = useState("");
  const [calmReflection, setCalmReflection] = useState("");
  const [suggestionsRevealed, setSuggestionsRevealed] = useState(false);
  const [suggestionsSelected, setSuggestionsSelected] = useState<string[]>([]);

  // Localization sync
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const lang = params.get('lang') || 'en';
      loadLocale(lang);
    }
  }, []);

  // Safe load of string arrays from translation bundle
  const getArrayResource = (key: string, fallback: string[]): string[] => {
    const raw = t(key, { returnObjects: true });
    return Array.isArray(raw) ? (raw as string[]) : fallback;
  };

  const bodyOptions = getArrayResource('body_options', [
    "Irregular sleep", "Skipping meals", "Shallow breathing", "Muscle tension", "Excessive caffeine", "Staying hydrated", "Regular stretching", "Nourishing meals"
  ]);

  const mindOptions = getArrayResource('mind_options', [
    "Constant overthinking", "Self-criticism", "Focusing on negatives", "Ignoring achievements", "Doomscrolling", "Mindful breathing", "Kind self-talk", "Gratitude practice"
  ]);

  const copingOptions = getArrayResource('coping_options', [
    "Suppressing feelings", "Withdrawing from others", "Working non-stop", "Avoiding difficult tasks", "Seeking comfort in screens", "Journaling", "Reaching out to a friend", "Setting boundaries"
  ]);

  const suggestionOptions = getArrayResource('suggestions', [
    "Schedule a 5-minute stretch break today", "Substitute one coffee with herbal tea", "Write down three things you did well today", "Practice 2 minutes of quiet breathing", "Send a brief text to a trusted friend"
  ]);

  const next = () => setStep((s) => s + 1);
  const prev = () => setStep((s) => s - 1);

  const resetFlow = () => {
    setStep(0);
    setBodySelected([]);
    setMindSelected([]);
    setCopingSelected([]);
    setStressReflection("");
    setCalmReflection("");
    setSuggestionsRevealed(false);
    setSuggestionsSelected([]);
  };

  const toggleItem = (list: string[], setList: (l: string[]) => void, item: string) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  return (
    <PremiumLayout
      title={t("app_title", "What Are Your Habits?")}
      icon={<ListChecks className="w-6 h-6 text-primary" />}
      onBack={step > 0 && step < 6 ? prev : undefined}
      onReset={step > 0 && step < 6 ? resetFlow : undefined}
    >
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-4 min-h-[70vh]">
        {step < 6 && (
          <div className="flex justify-center gap-2 mb-10">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i <= step ? 'w-8 bg-primary' : 'w-2 bg-slate-150 dark:bg-slate-800'
                }`}
              />
            ))}
          </div>
        )}

        <div className="relative flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            {/* STEP 0: INTRO */}
            {step === 0 && (
              <motion.div
                key="intro"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full flex-1 flex flex-col"
              >
                <PremiumIntro
                  title={t("app_title", "What Are Your Habits?")}
                  description={t("app_description", "Explore and reflect on your daily routines")}
                  onStart={next}
                  icon={<ListChecks size={32} />}
                  benefits={[
                    t('intro_p1', 'Identify physical behaviors affecting your stress levels.'),
                    t('intro_p2', 'Uncover mental patterns that fuel anxiety or calm.'),
                    t('intro_p3', 'Commit to tiny, powerful, supportive adjustments.'),
                  ]}
                  duration={t('app_duration', "5 minutes")}
                />
              </motion.div>
            )}

            {/* STEP 1: PHYSICAL HEALTH */}
            {step === 1 && (
              <motion.div
                key="body"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full flex-1 flex flex-col space-y-5"
              >
                <header className="space-y-3">
                  <span className="act-eyebrow">
                    <Sparkles size={12} />
                    {t("physical_health", "Physical Health")}
                  </span>
                  <h1 className="act-heading">
                    {t('body_title', "Your Physical Routine")}
                  </h1>
                  <p className="act-body">
                    {t('body_subtitle', "Which habits do you recognize in your physical self lately? Select all that apply.")}
                  </p>
                </header>

                <div className="grid gap-2.5">
                  {bodyOptions.map((opt) => {
                    const isSel = bodySelected.includes(opt);
                    return (
                      <motion.button
                        key={opt}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleItem(bodySelected, setBodySelected, opt)}
                        className={`w-full text-left px-4 py-3 rounded-xl border transition-all flex items-center justify-between ${
                          isSel
                            ? "bg-primary border-primary text-white"
                            : "bg-white/80 backdrop-blur-sm border-white text-slate-700 hover:border-sky-100"
                        }`}
                      >
                        <span className="text-sm font-medium">{opt}</span>
                        {isSel && (
                          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                            <Check size={12} strokeWidth={3} />
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                <div className="pt-2">
                  <button
                    onClick={next}
                    className="act-btn-primary"
                  >
                    {t('continue', 'Continue')}
                    <ArrowRight size={16} strokeWidth={2.5} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: MENTAL HEALTH */}
            {step === 2 && (
              <motion.div
                key="mind"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full flex-1 flex flex-col space-y-5"
              >
                <header className="space-y-3">
                  <span className="act-eyebrow">
                    <Sparkles size={12} />
                    {t("mental_health", "Mental Health")}
                  </span>
                  <h1 className="act-heading">
                    {t('mind_title', "Your Mind & Thoughts")}
                  </h1>
                  <p className="act-body">
                    {t('mind_subtitle', "What thought habits do you notice returning most often? Select all that apply.")}
                  </p>
                </header>

                <div className="grid gap-2.5">
                  {mindOptions.map((opt) => {
                    const isSel = mindSelected.includes(opt);
                    return (
                      <motion.button
                        key={opt}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleItem(mindSelected, setMindSelected, opt)}
                        className={`w-full text-left px-4 py-3 rounded-xl border transition-all flex items-center justify-between ${
                          isSel
                            ? "bg-primary border-primary text-white"
                            : "bg-white/80 backdrop-blur-sm border-white text-slate-700 hover:border-sky-100"
                        }`}
                      >
                        <span className="text-sm font-medium">{opt}</span>
                        {isSel && (
                          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                            <Check size={12} strokeWidth={3} />
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                <div className="pt-2">
                  <button
                    onClick={next}
                    className="act-btn-primary"
                  >
                    {t('continue', 'Continue')}
                    <ArrowRight size={16} strokeWidth={2.5} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: COPING MECHANISMS */}
            {step === 3 && (
              <motion.div
                key="coping"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full flex-1 flex flex-col space-y-5"
              >
                <header className="space-y-3">
                  <span className="act-eyebrow">
                    <Sparkles size={12} />
                    {t("coping_mechanisms", "Coping Mechanisms")}
                  </span>
                  <h1 className="act-heading">
                    {t('coping_title', "Coping Under Stress")}
                  </h1>
                  <p className="act-body">
                    {t('coping_subtitle', "How do you typically react when overwhelm occurs? Select all that apply.")}
                  </p>
                </header>

                <div className="grid gap-2.5">
                  {copingOptions.map((opt) => {
                    const isSel = copingSelected.includes(opt);
                    return (
                      <motion.button
                        key={opt}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleItem(copingSelected, setCopingSelected, opt)}
                        className={`w-full text-left px-4 py-3 rounded-xl border transition-all flex items-center justify-between ${
                          isSel
                            ? "bg-primary border-primary text-white"
                            : "bg-white/80 backdrop-blur-sm border-white text-slate-700 hover:border-sky-100"
                        }`}
                      >
                        <span className="text-sm font-medium">{opt}</span>
                        {isSel && (
                          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                            <Check size={12} strokeWidth={3} />
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                <div className="pt-2">
                  <button
                    onClick={next}
                    className="act-btn-primary"
                  >
                    {t('continue', 'Continue')}
                    <ArrowRight size={16} strokeWidth={2.5} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: DEEPER REFLECTION */}
            {step === 4 && (
              <motion.div
                key="reflect"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full flex-1 flex flex-col space-y-5"
              >
                <header className="space-y-3">
                  <span className="act-eyebrow">
                    <Sparkles size={12} />
                    {t("deeper_reflection", "Deeper Reflection")}
                  </span>
                  <h1 className="act-heading">
                    {t('reflection_title', "Unpack Your Patterns")}
                  </h1>
                </header>

                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                  >
                    <label className="field-label">
                      {t('question_stress', "What habits trigger stress in your life?")}
                    </label>
                    <textarea
                      value={stressReflection}
                      onChange={(e) => setStressReflection(e.target.value)}
                      className="field-textarea"
                      rows={3}
                      placeholder={t("type_your_thoughts_here", "Type your thoughts here...")}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-2"
                  >
                    <label className="field-label">
                      {t('question_calm', "What routines help you recover a sense of calm?")}
                    </label>
                    <textarea
                      value={calmReflection}
                      onChange={(e) => setCalmReflection(e.target.value)}
                      className="field-textarea"
                      rows={3}
                      placeholder={t("type_your_thoughts_here", "Type your thoughts here...")}
                    />
                  </motion.div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={next}
                    className="act-btn-primary"
                  >
                    {t('see_insight', 'See Insights')}
                    <ArrowRight size={16} strokeWidth={2.5} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 5: INSIGHTS & COMMITMENTS */}
            {step === 5 && (
              <motion.div
                key="insight"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full flex-1 flex flex-col space-y-5"
              >
                <header className="space-y-3">
                  <span className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest animate-pulse">
                    <Lightbulb size={12} />
                    {t("insight_growth", "Insight & Growth")}
                  </span>
                  <h1 className="act-heading">
                    {t('insight_title', "Your Daily Commitments")}
                  </h1>
                  <p className="act-body">
                    {t('insight_description', "Small steps accumulate into massive changes. Review these potential positive shifts.")}
                  </p>
                </header>

                <AnimatePresence mode="wait">
                  {!suggestionsRevealed ? (
                    <motion.button
                      key="reveal-btn"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSuggestionsRevealed(true)}
                      className="w-full py-5 rounded-xl bg-white/80 backdrop-blur-sm border border-white text-slate-600 font-semibold text-sm shadow-sm hover:bg-white transition-all flex items-center justify-center gap-3"
                    >
                      <Sparkles size={16} className="text-primary" />
                      {t('show_suggestions', 'Reveal Recommended Actions')}
                    </motion.button>
                  ) : (
                    <div className="grid gap-3">
                      {suggestionOptions.map((s, i) => {
                        const isSel = suggestionsSelected.includes(s);
                        return (
                          <motion.div
                            key={s}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                          >
                            <motion.button
                              whileHover={{ scale: 1.01, x: 4 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => toggleItem(suggestionsSelected, setSuggestionsSelected, s)}
                              className={`w-full text-left px-4 py-3 rounded-xl border transition-all flex items-center justify-between text-sm ${
                                isSel
                                  ? "bg-primary border-primary text-white"
                                  : "bg-white/80 backdrop-blur-sm border-white text-slate-700 hover:border-sky-100"
                              }`}
                            >
                              <span className="text-sm font-medium">{s}</span>
                              {isSel && (
                                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                                  <Check size={12} strokeWidth={3} />
                                </div>
                              )}
                            </motion.button>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </AnimatePresence>

                {suggestionsRevealed && (
                  <div className="pt-2">
                    <button
                      onClick={next}
                      className="act-btn-primary"
                    >
                      {t('commit', 'Commit to Actions')}
                      <ArrowRight size={16} strokeWidth={2.5} />
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {/* STEP 6: FINAL SCREEN */}
            {step === 6 && (
              <motion.div
                key="final"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full flex-1 flex flex-col"
              >
                <PremiumComplete
        shareEmoji=""
        shareContent={`I just completed "What Are Your Habits" on TherapyMantra — a guided habit reflection that genuinely helped me. Try it! \n\n Android: https://play.google.com/store/apps/details?id=org.mantracare.therapy\n iOS: https://apps.apple.com/pk/app/therapymantra/id1607643888`}
                  title={t("app_title", "What Are Your Habits?")}
                  message={t('final_text', "Great job! Acknowledging habits is the first crucial milestone. Remember to treat yourself with patience and kindness as you introduce subtle positive changes.")}
                  onRestart={resetFlow}
                  icon={<CheckCircle2 size={48} className="text-primary animate-bounce" />}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PremiumLayout>
  );
}

export default function HabitsPage() {
  return (
    <I18nextProvider i18n={i18n}>
      <HabitsInner />
    </I18nextProvider>
  );
}