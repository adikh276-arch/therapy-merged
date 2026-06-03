'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, ArrowRight, Sparkles, Check } from 'lucide-react';
import { useTranslation, I18nextProvider } from 'react-i18next';
import i18n, { loadLocale } from './i18n';
import { PremiumLayout } from '@/components/shared/PremiumLayout';
import { PremiumIntro } from '@/components/shared/PremiumIntro';
import { PremiumComplete } from '@/components/shared/PremiumComplete';

const NEXT_TIME_EXAMPLES = ['Ask for clarification', 'Give it some time', 'Notice without reacting'];

type Screen = 'intro' | 'steps' | 'complete';

function MindReadingInner() {
  const { t } = useTranslation(undefined, { i18n });
  const [screen, setScreen] = useState<Screen>('intro');
  const [step, setStep] = useState(1);

  // Step fields
  const [situation, setSituation] = useState('');
  const [assumption, setAssumption] = useState('');
  const [evidence, setEvidence] = useState('');
  const [possibilities, setPossibilities] = useState(['', '', '']);
  const [beliefLevel, setBeliefLevel] = useState(50);
  const [balancedThought, setBalancedThought] = useState('');
  const [nextTime, setNextTime] = useState('');
  const [customNextTime, setCustomNextTime] = useState('');

  const TOTAL_STEPS = 9;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const lang = new URLSearchParams(window.location.search).get('lang') || 'en';
      loadLocale(lang);
    }
  }, []);

  const reset = () => {
    setScreen('intro');
    setStep(1);
    setSituation('');
    setAssumption('');
    setEvidence('');
    setPossibilities(['', '', '']);
    setBeliefLevel(50);
    setBalancedThought('');
    setNextTime('');
    setCustomNextTime('');
  };

  const canContinue = () => {
    if (step === 1) return situation.trim().length > 0;
    if (step === 2) return assumption.trim().length > 0;
    if (step === 3) return true;
    if (step === 4) return evidence.trim().length > 0;
    if (step === 5) return possibilities.some(p => p.trim().length > 0);
    if (step === 6) return true;
    if (step === 7) return balancedThought.trim().length > 0;
    if (step === 8) return (nextTime || customNextTime.trim()).length > 0;
    if (step === 9) return true;
    return false;
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS) setStep(s => s + 1);
    else setScreen('complete');
  };

  const stepContent = () => {
    switch (step) {
      case 1: return (
        <div className="space-y-5">
          <h1 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
            {t('steps.step1.title', 'What happened?')}
          </h1>
          <p className="act-body">
            {t('steps.step1.desc', 'Describe a recent moment where you felt judged or unsure.')}
          </p>
          <textarea
            value={situation}
            onChange={e => setSituation(e.target.value)}
            placeholder={t('steps.step1.placeholder', 'Description of the situation...')}
            rows={4}
            className="field-textarea"
          />
        </div>
      );

      case 2: return (
        <div className="space-y-5">
          <h1 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
            {t('steps.step2.title', 'What went through your mind?')}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
            {t('steps.step2.desc', 'What did you assume they were thinking about you?')}
          </p>
          <div className="bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-100 dark:border-slate-800 px-5 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
            Situation: <span className="text-slate-600 dark:text-slate-300 normal-case">{situation}</span>
          </div>
          <textarea
            value={assumption}
            onChange={e => setAssumption(e.target.value)}
            placeholder={t('steps.step2.placeholder', 'I assumed they were thinking...')}
            rows={3}
            className="field-textarea"
          />
        </div>
      );

      case 3: return (
        <div className="space-y-5">
          <h1 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
            {t('steps.step3.title', "Let's slow this down")}
          </h1>
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-white/60 dark:border-slate-800 p-8 shadow-sm space-y-4">
            <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-2xl border border-amber-100 dark:border-amber-900/30">
              <p className="text-amber-700 dark:text-amber-400 font-bold italic text-sm">"{assumption}"</p>
            </div>
            <p className="act-body">
              {t('steps.step3.desc', "Right now, this thought can feel true. But before accepting it as a fact, let's take a step back and look at it more closely.")}
            </p>
          </div>
        </div>
      );

      case 4: return (
        <div className="space-y-5">
          <h1 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
            {t('steps.step4.title', 'Is this true?')}
          </h1>
          <p className="act-body">
            {t('steps.step4.desc', 'Is there any clear evidence (facts, not assumptions) that supports this thought?')}
          </p>
          <textarea
            value={evidence}
            onChange={e => setEvidence(e.target.value)}
            placeholder={t('steps.step4.placeholder', 'The evidence I see is...')}
            rows={4}
            className="field-textarea"
          />
        </div>
      );

      case 5: return (
        <div className="space-y-5">
          <h1 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
            {t('steps.step5.title', 'What else could be going on?')}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
            {t('steps.step5.desc', 'What are 2–3 other possible explanations?')}
          </p>
          <div className="space-y-3">
            {possibilities.map((p, i) => (
              <input
                key={i}
                value={p}
                onChange={e => setPossibilities(prev => prev.map((v, idx) => idx === i ? e.target.value : v))}
                placeholder={`Possibility ${i + 1}...`}
                className="field-input"
              />
            ))}
          </div>
        </div>
      );

      case 6: return (
        <div className="space-y-6">
          <h1 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
            {t('steps.step6.title', 'Check your belief')}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
            {t('steps.step6.desc', 'How strongly do you believe your original thought now?')}
          </p>
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-white/60 dark:border-slate-800 p-8 shadow-sm space-y-6">
            <div className="text-center">
              <motion.p key={beliefLevel} initial={{ scale: 1.15 }} animate={{ scale: 1 }} className="text-5xl font-black text-primary">{beliefLevel}%</motion.p>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">Belief Level</p>
            </div>
            <input
              type="range" min={0} max={100} value={beliefLevel}
              onChange={e => setBeliefLevel(Number(e.target.value))}
              className="w-full h-2 rounded-lg accent-primary cursor-pointer"
            />
            <div className="flex justify-between text-xs font-black text-slate-400 uppercase tracking-widest">
              <span>Not at all</span><span>Completely</span>
            </div>
          </div>
        </div>
      );

      case 7: return (
        <div className="space-y-5">
          <h1 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
            {t('steps.step7.title', 'A more balanced view')}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
            {t('steps.step7.desc', 'Write a thought that feels more fair and less certain.')}
          </p>
          <textarea
            value={balancedThought}
            onChange={e => setBalancedThought(e.target.value)}
            placeholder={t('steps.step7.placeholder', 'A more balanced thought...')}
            rows={4}
            className="field-textarea"
          />
        </div>
      );

      case 8: return (
        <div className="space-y-5">
          <h1 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
            {t('steps.step8.title', 'Next time')}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
            {t('steps.step8.desc', 'What could you do instead of assuming?')}
          </p>
          <div className="flex flex-wrap gap-2.5">
            {NEXT_TIME_EXAMPLES.map(ex => (
              <motion.button
                key={ex}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => { setNextTime(ex); setCustomNextTime(''); }}
                className={`px-4 py-2.5 rounded-full text-xs font-bold border transition-all ${
                  nextTime === ex && !customNextTime
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-primary/30'
                }`}
              >
                {ex}
              </motion.button>
            ))}
          </div>
          <input
            type="text"
            value={customNextTime}
            onChange={e => { setCustomNextTime(e.target.value); setNextTime(''); }}
            placeholder={t('steps.step8.placeholder', 'Next time, I could...')}
            className="field-input"
          />
        </div>
      );

      case 9: return (
        <div className="space-y-5">
          <h1 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
            {t('steps.step9.title', 'Notice the shift')}
          </h1>
          <p className="act-body">
            {t('steps.step9.desc', 'You explored different possibilities and created space for a more balanced view.')}
          </p>
          <div className="space-y-3">
            <div className="p-5 bg-red-50 dark:bg-red-950/20 rounded-2xl border border-red-100 dark:border-red-900/30 space-y-1">
              <p className="text-[10px] font-black text-red-400 uppercase tracking-widest">
                {t('steps.step9.original_label', 'Original Thought')}
              </p>
              <p className="text-red-600 dark:text-red-400 font-bold italic text-sm">"{assumption}"</p>
            </div>
            <div className="p-5 bg-primary/5 rounded-2xl border border-primary/15 space-y-1">
              <p className="text-[10px] font-black text-primary uppercase tracking-widest">
                {t('steps.step9.balanced_label', 'Balanced Perspective')}
              </p>
              <p className="text-primary font-bold text-sm">"{balancedThought}"</p>
            </div>
          </div>
        </div>
      );

      default: return null;
    }
  };

  return (
    <PremiumLayout
      title={t('app_title', 'Mind Reading Check')}
      icon={<Eye className="w-6 h-6 text-primary" />}
      onReset={screen !== 'intro' ? reset : undefined}
      exitOnBack={screen === 'intro'}
    >
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-4 min-h-[70vh]">
        <AnimatePresence mode="wait">
          {screen === 'intro' && (
            <motion.div key="intro" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="w-full flex-1 flex flex-col">
              <PremiumIntro
                title={t('app_title', 'Mind Reading Check')}
                description={t('intro.description', 'Question the assumptions you make about what others are thinking.')}
                onStart={() => setScreen('steps')}
                icon={<Eye size={32} />}
                benefits={[
                  t('intro.benefits.0', 'Stop assuming the worst'),
                  t('intro.benefits.1', 'Identify biased interpretations'),
                  t('intro.benefits.2', 'Build clearer communication'),
                ]}
                duration={t('intro.duration', '3-4 minutes')}
              />
            </motion.div>
          )}

          {screen === 'steps' && (
            <motion.div key={`step-${step}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              {/* Progress bar */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="field-label">
                    {t('steps.label', `Step ${step} of ${TOTAL_STEPS}`, { current: step, total: TOTAL_STEPS })}
                  </span>
                  <span className="text-[10px] font-black text-primary uppercase tracking-widest">
                    {Math.round((step / TOTAL_STEPS) * 100)}%
                  </span>
                </div>
                <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 text-primary font-black text-[10px] uppercase tracking-widest">
                  <Sparkles size={12} /> Mind Reading Check
                </span>
              </div>

              {stepContent()}

              <div className="flex gap-3 pt-2">
                {step > 1 && (
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setStep(s => s - 1)}
                    className="flex-1 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-black text-sm transition-all hover:border-primary/20"
                  >
                    ← Back
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={!canContinue()}
                  onClick={handleNext}
                  className="flex-1 py-4 rounded-2xl bg-primary text-primary-foreground font-black text-sm shadow-lg shadow-primary/15 flex items-center justify-center gap-2 disabled:opacity-40 transition-all"
                >
                  {step === TOTAL_STEPS ? (
                    <><Check size={16} /> Complete</>
                  ) : (
                    <>Continue <ArrowRight size={16} /></>
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}

          {screen === 'complete' && (
            <motion.div key="complete" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="w-full">
              <PremiumComplete
                title={t('complete.great_insights', 'Great Insights!')}
                message={t('complete.message', "By questioning your assumptions, you're building a more objective and compassionate mind.")}
                onRestart={reset}
                icon={<Eye size={48} />}
                  shareEmoji="🔮"
                  shareContent={"I just completed 'Mind Reading Check' on TherapyMantra — a guided cognitive reframing that genuinely helped me. Try it! 🌿\n\n📱 Android: https://play.google.com/store/apps/details?id=org.mantracare.therapy\n🍎 iOS: https://apps.apple.com/pk/app/therapymantra/id1607643888"}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
}

export default function MindReadingCheckPage() {
  return (
    <I18nextProvider i18n={i18n}>
      <MindReadingInner />
    </I18nextProvider>
  );
}