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
                className="w-full flex-1 flex flex-col space-y-6 text-left"
              >
                <div className="space-y-2">
                  <span className="act-eyebrow">
                    <Sparkles size={11} />
                    {t('recall.stage', 'Stage 1: Recall')}
                  </span>
                  <h1 className="act-heading">
                    {t('recall.title', 'Recall a Joyful Activity')}
                  </h1>
                  <p className="act-body">
                    {t('recall.p1', 'Think back to an activity you used to love or something simple you haven\'t done in a while.')}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="space-y-2">
                    <label className="field-label">
                      {t('recall.input1_label', 'What is an activity you enjoyed?')}
                    </label>
                    <input
                      type="text"
                      placeholder={t('recall.input1_placeholder', 'e.g. Painting, cycling, reading in the park...')}
                      value={data.activity}
                      onChange={(e) => update({ activity: e.target.value })}
                      className="field-input"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="field-label">
                      {t('recall.input2_label', 'How did it make you feel?')}
                    </label>
                    <input
                      type="text"
                      placeholder={t('recall.input2_placeholder', 'e.g. Peaceful, energized, fully present...')}
                      value={data.feeling}
                      onChange={(e) => update({ feeling: e.target.value })}
                      className="field-input"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    disabled={!canContinueRecall}
                    onClick={() => setScreen(3)}
                    className="act-btn-primary"
                  >
                    {t('recall.button', 'Continue')}
                    <ArrowRight size={16} strokeWidth={2.5} />
                  </button>
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
                className="w-full flex-1 flex flex-col space-y-6 text-left"
              >
                <div className="space-y-2">
                  <span className="act-eyebrow">
                    <Sparkles size={11} />
                    {t('meaning.stage', 'Stage 2: Meaning')}
                  </span>
                  <h1 className="act-heading">
                    {t('meaning.title', 'Explore the Meaning')}
                  </h1>
                  <p className="act-body">
                    {t('meaning.p1', 'Understanding why we enjoy activities connects us to our core motivations.')}
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    { key: 'enjoyBecause', label: t('meaning.input1_label', 'Why did you enjoy it?'), placeholder: t('meaning.input1_placeholder', 'e.g. Allowed me to express my creativity...') },
                    { key: 'feelsMore',    label: t('meaning.input2_label', 'How does it help your life feel complete?'), placeholder: t('meaning.input2_placeholder', 'e.g. It helps me disconnect from stress...') },
                    { key: 'remindsOf',   label: t('meaning.input3_label', 'What does it remind you of?'), placeholder: t('meaning.input3_placeholder', 'e.g. Reminds me of when I had more free time...') },
                  ].map(({ key, label, placeholder }) => (
                    <div key={key} className="space-y-2">
                      <label className="field-label">{label}</label>
                      <input
                        type="text"
                        placeholder={placeholder}
                        value={data[key as keyof ActivityData]}
                        onChange={(e) => update({ [key]: e.target.value })}
                        className="field-input"
                      />
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    disabled={!canContinueMeaning}
                    onClick={() => setScreen(4)}
                    className="act-btn-primary"
                  >
                    {t('meaning.button', 'Continue')}
                    <ArrowRight size={16} strokeWidth={2.5} />
                  </button>
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
                className="w-full flex-1 flex flex-col space-y-6 text-left"
              >
                <div className="space-y-2">
                  <span className="act-eyebrow">
                    <Sparkles size={11} />
                    {t('smallStep.stage', 'Stage 3: Action')}
                  </span>
                  <h1 className="act-heading">
                    {t('smallStep.title', 'Take a Small Step')}
                  </h1>
                  <p className="act-body">
                    {t('smallStep.p1', "You don't have to dive in completely.")}{' '}
                    {t('smallStep.p2', 'What is one tiny, achievable step you can commit to this week?')}
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="field-label">
                    {t('smallStep.input1_label', 'My commitment step')}
                  </label>
                  <textarea
                    placeholder={t('smallStep.input1_placeholder', 'e.g. Find my watercolor palette, or download a 5-minute yoga video...')}
                    value={data.smallStep}
                    onChange={(e) => update({ smallStep: e.target.value })}
                    rows={4}
                    className="field-textarea"
                  />
                </div>

                <div className="pt-2">
                  <button
                    disabled={!canContinueSmallStep}
                    onClick={() => setScreen(5)}
                    className="act-btn-primary"
                  >
                    {t('complete_activity', 'Complete Activity')}
                    <Check size={15} strokeWidth={2.5} />
                  </button>
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
                  shareEmoji=""
                  shareContent={"I just completed 'Reconstruct Joy' on TherapyMantra — a guided joy planning that genuinely helped me. Try it! \n\n Android: https://play.google.com/store/apps/details?id=org.mantracare.therapy\n iOS: https://apps.apple.com/pk/app/therapymantra/id1607643888"}
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white shadow-sm text-left space-y-5 p-5">
                    <div className="flex items-center gap-3 border-b border-sky-50 pb-4">
                      <div className="w-10 h-10 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center text-xl shrink-0">
                        <Sparkles size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 text-base leading-snug">{data.activity}</h3>
                        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
                          {t('recall.stage', 'Stage 1: Recall')}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="space-y-0.5">
                        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest block">
                          {t('recall.input2_label', 'How did it make you feel?')}
                        </span>
                        <p className="text-sm font-medium text-slate-700 leading-relaxed">{data.feeling}</p>
                      </div>

                      <div className="space-y-0.5">
                        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest block">
                          {t('meaning.input1_label', 'Why did you enjoy it?')}
                        </span>
                        <p className="text-sm font-medium text-slate-700 leading-relaxed">{data.enjoyBecause}</p>
                      </div>

                      <div className="space-y-0.5 border-t border-sky-50 pt-3">
                        <span className="text-[11px] font-semibold text-sky-500 uppercase tracking-widest block">
                          {t('smallStep.input1_label', 'My commitment step')}
                        </span>
                        <p className="text-sm font-semibold text-slate-800 leading-relaxed italic">
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