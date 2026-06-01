'use client';

import { useState, useEffect } from 'react';
import { useTranslation, I18nextProvider } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import i18n, { loadLocale } from './i18n';
import { PremiumLayout } from '@/components/shared/PremiumLayout';
import { PremiumIntro } from '@/components/shared/PremiumIntro';
import { PremiumComplete } from '@/components/shared/PremiumComplete';

interface ActivityData {
  activity: string;
  feeling: string;
  enjoyBecause: string;
  feelsMore: string;
  remindsOf: string;
  smallStep: string;
}

function JoyfulActivitiesInner() {
  const { t } = useTranslation(undefined, { i18n });
  const [screen, setScreen] = useState(1);
  const [data, setData] = useState<ActivityData>({
    activity: '',
    feeling: '',
    enjoyBecause: '',
    feelsMore: '',
    remindsOf: '',
    smallStep: '',
  });

  // Sync lang URL parameter
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const lang = params.get('lang') || 'en';
      loadLocale(lang);
    }
  }, []);

  const update = (fields: Partial<ActivityData>) => {
    setData((prev) => ({ ...prev, ...fields }));
  };

  const handleResetFlow = () => {
    setData({
      activity: '',
      feeling: '',
      enjoyBecause: '',
      feelsMore: '',
      remindsOf: '',
      smallStep: '',
    });
    setScreen(1);
  };

  const canContinueRecall = data.activity.trim().length > 0 && data.feeling.trim().length > 0;
  const canContinueMeaning =
    data.enjoyBecause.trim().length > 0 &&
    data.feelsMore.trim().length > 0 &&
    data.remindsOf.trim().length > 0;
  const canContinueSmallStep = data.smallStep.trim().length > 0;

  return (
    <PremiumLayout
      title={t('app_title', 'Reconstruct Joy')}
      icon={<Heart className="w-6 h-6 text-primary animate-pulse" />}
      onBack={screen > 1 && screen < 5 ? () => setScreen((s) => s - 1) : undefined}
      onReset={screen > 1 && screen < 5 ? handleResetFlow : undefined}
    >
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-4 min-h-[70vh] text-center">
        {screen > 1 && screen < 5 && (
          <div className="flex justify-center gap-2 mb-10">
            {[2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i <= screen ? 'w-8 bg-primary' : 'w-2 bg-slate-150 dark:bg-slate-800'
                }`}
              />
            ))}
          </div>
        )}

        <div className="relative flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            {/* SCREEN 1: INTRO */}
            {screen === 1 && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="w-full flex-1 flex flex-col"
              >
                <PremiumIntro
                  title={t('app_title', 'Reconstruct Joy')}
                  description={t(
                    'app_description',
                    'Reconnect with simple activities that bring comfort, peace, and brightness to your life.'
                  )}
                  onStart={() => setScreen(2)}
                  icon={<Heart size={32} />}
                  benefits={[
                    t('intro.p1', 'Discover lost pockets of daily happiness'),
                    t('intro.p2', 'Identify what truly recharges your battery'),
                    t('intro.p3', 'Create a simple, actionable plan to start'),
                  ]}
                  duration={t('app_duration', '5 minutes')}
                />
              </motion.div>
            )}

            {/* SCREEN 2: RECALL SCREEN */}
            {screen === 2 && (
              <motion.div
                key="recall"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full flex-1 flex flex-col space-y-8 text-left pb-20"
              >
                <div className="space-y-3">
                  <span className="flex items-center gap-1.5 text-primary font-bold text-[10px] uppercase tracking-widest">
                    <Sparkles size={12} />
                    {t('recall.stage', 'STAGE 1: RECALL')}
                  </span>
                  <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                    {t('recall.title', 'Recall a Joyful Activity')}
                  </h1>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">
                    {t(
                      'recall.p1',
                      'Think back to an activity you used to love or something simple you haven’t done in a while.'
                    )}
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-4 block">
                      {t('recall.input1_label', 'What is an activity you enjoyed?')}
                    </label>
                    <input
                      type="text"
                      placeholder={t('recall.input1_placeholder', 'e.g. Painting, cycling, reading in the park...')}
                      value={data.activity}
                      onChange={(e) => update({ activity: e.target.value })}
                      className="w-full py-5 rounded-2xl bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 dark:bg-slate-950 border border-transparent focus:border-primary/30 focus:bg-white dark:focus:bg-gradient-to-r from-primary to-sky-400 border-none transition-all outline-none px-6 font-bold text-slate-700 dark:text-slate-100 placeholder:text-slate-350 dark:placeholder:text-slate-600"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-4 block">
                      {t('recall.input2_label', 'How did it make you feel?')}
                    </label>
                    <input
                      type="text"
                      placeholder={t('recall.input2_placeholder', 'e.g. Peaceful, energized, fully present...')}
                      value={data.feeling}
                      onChange={(e) => update({ feeling: e.target.value })}
                      className="w-full py-5 rounded-2xl bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 dark:bg-slate-955 border border-transparent focus:border-primary/30 focus:bg-white dark:focus:bg-gradient-to-r from-primary to-sky-400 border-none transition-all outline-none px-6 font-bold text-slate-700 dark:text-slate-100 placeholder:text-slate-350 dark:placeholder:text-slate-600"
                    />
                  </div>
                </div>

                <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white dark:from-slate-950 via-white dark:via-slate-950 to-transparent pt-12 flex justify-center z-50">
                  <motion.button
                    whileHover={canContinueRecall ? { scale: 1.01 } : {}}
                    whileTap={canContinueRecall ? { scale: 0.99 } : {}}
                    disabled={!canContinueRecall}
                    onClick={() => setScreen(3)}
                    className="w-full max-w-md py-4.5 rounded-2xl bg-primary text-primary-foreground font-black text-base shadow-lg shadow-primary/10 hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:shadow-none"
                  >
                    {t('recall.button', 'Continue')}
                    <ArrowRight size={18} />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* SCREEN 3: MEANING SCREEN */}
            {screen === 3 && (
              <motion.div
                key="meaning"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full flex-1 flex flex-col space-y-8 text-left pb-20"
              >
                <div className="space-y-3">
                  <span className="flex items-center gap-1.5 text-primary font-bold text-[10px] uppercase tracking-widest">
                    <Sparkles size={12} />
                    {t('meaning.stage', 'STAGE 2: MEANING')}
                  </span>
                  <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                    {t('meaning.title', 'Explore the Meaning')}
                  </h1>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">
                    {t('meaning.p1', 'Understanding why we enjoy activities connects us to our core motivations.')}
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-4 block">
                      {t('meaning.input1_label', 'Why did you enjoy it?')}
                    </label>
                    <input
                      type="text"
                      placeholder={t('meaning.input1_placeholder', 'e.g. Allowed me to express my creativity...')}
                      value={data.enjoyBecause}
                      onChange={(e) => update({ enjoyBecause: e.target.value })}
                      className="w-full py-5 rounded-2xl bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 dark:bg-slate-950 border border-transparent focus:border-primary/30 focus:bg-white dark:focus:bg-gradient-to-r from-primary to-sky-400 border-none transition-all outline-none px-6 font-bold text-slate-700 dark:text-slate-100 placeholder:text-slate-355"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-4 block">
                      {t('meaning.input2_label', 'How does it help your life feel complete?')}
                    </label>
                    <input
                      type="text"
                      placeholder={t('meaning.input2_placeholder', 'e.g. It helps me disconnect from stress...')}
                      value={data.feelsMore}
                      onChange={(e) => update({ feelsMore: e.target.value })}
                      className="w-full py-5 rounded-2xl bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 dark:bg-slate-955 border border-transparent focus:border-primary/30 focus:bg-white dark:focus:bg-gradient-to-r from-primary to-sky-400 border-none transition-all outline-none px-6 font-bold text-slate-700 dark:text-slate-100 placeholder:text-slate-355"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-4 block">
                      {t('meaning.input3_label', 'What does it remind you of?')}
                    </label>
                    <input
                      type="text"
                      placeholder={t('meaning.input3_placeholder', 'e.g. Reminds me of when I had more free time...')}
                      value={data.remindsOf}
                      onChange={(e) => update({ remindsOf: e.target.value })}
                      className="w-full py-5 rounded-2xl bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 dark:bg-slate-950 border border-transparent focus:border-primary/30 focus:bg-white dark:focus:bg-gradient-to-r from-primary to-sky-400 border-none transition-all outline-none px-6 font-bold text-slate-700 dark:text-slate-100 placeholder:text-slate-355"
                    />
                  </div>
                </div>

                <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white dark:from-slate-950 via-white dark:via-slate-950 to-transparent pt-12 flex justify-center z-50">
                  <motion.button
                    whileHover={canContinueMeaning ? { scale: 1.01 } : {}}
                    whileTap={canContinueMeaning ? { scale: 0.99 } : {}}
                    disabled={!canContinueMeaning}
                    onClick={() => setScreen(4)}
                    className="w-full max-w-md py-4.5 rounded-2xl bg-primary text-primary-foreground font-black text-base shadow-lg shadow-primary/10 hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:shadow-none"
                  >
                    {t('meaning.button', 'Continue')}
                    <ArrowRight size={18} />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* SCREEN 4: SMALL STEPS */}
            {screen === 4 && (
              <motion.div
                key="small-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full flex-1 flex flex-col space-y-8 text-left pb-20"
              >
                <div className="space-y-3">
                  <span className="flex items-center gap-1.5 text-primary font-bold text-[10px] uppercase tracking-widest">
                    <Sparkles size={12} />
                    {t('smallStep.stage', 'STAGE 3: ACTION')}
                  </span>
                  <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                    {t('smallStep.title', 'Take a Small Step')}
                  </h1>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">
                    {t('smallStep.p1', 'You don’t have to dive in completely.')}{' '}
                    {t('smallStep.p2', 'What is one tiny, achievable step you can commit to taking this week?')}
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-4 block">
                      {t('smallStep.input1_label', 'My commitment step')}
                    </label>
                    <textarea
                      placeholder={t('smallStep.input1_placeholder', 'e.g. Find my watercolor palette, or download a 5-minute yoga video...')}
                      value={data.smallStep}
                      onChange={(e) => update({ smallStep: e.target.value })}
                      rows={4}
                      className="w-full py-5 rounded-3xl bg-slate-55 dark:bg-slate-950 border border-transparent focus:border-primary/30 focus:bg-white dark:focus:bg-gradient-to-r from-primary to-sky-400 border-none transition-all outline-none px-6 font-bold text-slate-700 dark:text-slate-100 placeholder:text-slate-350 dark:placeholder:text-slate-650 resize-none shadow-sm leading-relaxed"
                    />
                  </div>
                </div>

                <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white dark:from-slate-950 via-white dark:via-slate-950 to-transparent pt-12 flex justify-center z-50">
                  <motion.button
                    whileHover={canContinueSmallStep ? { scale: 1.01 } : {}}
                    whileTap={canContinueSmallStep ? { scale: 0.99 } : {}}
                    disabled={!canContinueSmallStep}
                    onClick={() => setScreen(5)}
                    className="w-full max-w-md py-4.5 rounded-2xl bg-primary text-primary-foreground font-black text-base shadow-lg shadow-primary/10 hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:shadow-none"
                  >
                    {t('complete_activity', 'Complete Activity')}
                    <Check size={18} />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* SCREEN 5: COMPLETE */}
            {screen === 5 && (
              <motion.div
                key="complete"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full flex-1 flex flex-col"
              >
                <PremiumComplete
                  title={t('app_title', 'Reconstruct Joy')}
                  message={t(
                    'app_complete_message',
                    'Your commitment plan is saved. Focus on taking that small step, and appreciate yourself for starting.'
                  )}
                  onRestart={handleResetFlow}
                >
                  <div className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-white/60 dark:border-slate-800 text-left space-y-6 my-6 shadow-sm">
                    <div className="flex items-center gap-3.5 border-b border-slate-50 dark:border-slate-850 pb-4">
                      <div className="w-12 h-12 bg-rose-50 dark:bg-rose-950/20 text-rose-500 rounded-2xl flex items-center justify-center text-2xl animate-pulse shrink-0">
                        ❤️
                      </div>
                      <div>
                        <h3 className="font-extrabold text-slate-800 dark:text-slate-200 text-base leading-snug">
                          {data.activity}
                        </h3>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          {t('recall.stage', 'STAGE 1: RECALL')}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1">
                        <span className="text-[9px] font-black text-slate-350 dark:text-slate-500 uppercase tracking-widest block">
                          {t('recall.input2_label', 'How did it make you feel?')}
                        </span>
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-300 leading-relaxed">
                          {data.feeling}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[9px] font-black text-slate-350 dark:text-slate-500 uppercase tracking-widest block">
                          {t('meaning.input1_label', 'Why did you enjoy it?')}
                        </span>
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-300 leading-relaxed">
                          {data.enjoyBecause}
                        </p>
                      </div>

                      <div className="space-y-1 border-t border-slate-50 dark:border-slate-850 pt-4">
                        <span className="text-[9px] font-black text-slate-350 dark:text-slate-500 uppercase tracking-widest block text-primary">
                          {t('smallStep.input1_label', 'My commitment step')}
                        </span>
                        <p className="text-sm font-extrabold text-slate-800 dark:text-slate-100 leading-relaxed italic">
                          &quot;{data.smallStep}&quot;
                        </p>
                      </div>
                    </div>
                  </div>
                </PremiumComplete>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PremiumLayout>
  );
}

export default function JoyfulActivitiesPage() {
  return (
    <I18nextProvider i18n={i18n}>
      <JoyfulActivitiesInner />
    </I18nextProvider>
  );
}
