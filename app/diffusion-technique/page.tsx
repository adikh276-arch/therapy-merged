'use client';

import { useState, useEffect, useMemo } from 'react';
import { useTranslation, I18nextProvider } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Brain, Cloud, Banknote, BookOpen, ArrowRight, RefreshCw, ChevronLeft } from 'lucide-react';
import i18n, { loadLocale } from './i18n';
import { PremiumLayout } from '@/components/shared/PremiumLayout';
import { PremiumIntro } from '@/components/shared/PremiumIntro';
import { PremiumComplete } from '@/components/shared/PremiumComplete';

// --- Types & Constants ---

type View = 'intro' | 'choose' | 'sky' | 'sell' | 'name';

// --- Floating Sky Background Cloud Animation Sub-component ---

function FullScreenSky({ thought, onNext }: { thought: string; onNext: () => void }) {
  const { t } = useTranslation(undefined, { i18n });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between py-12 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #BEE7FF 0%, #EAF6FF 100%)' }}
    >
      {/* Background clouds */}
      <motion.span
        className="absolute text-7xl opacity-15 select-none pointer-events-none"
        style={{ top: '10%', left: '5%' }}
        animate={{ x: [0, 80, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      >
        ☁️
      </motion.span>
      <motion.span
        className="absolute text-5xl opacity-10 select-none pointer-events-none"
        style={{ top: '70%', right: '10%' }}
        animate={{ x: [0, -60, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      >
        ☁️
      </motion.span>
      <motion.span
        className="absolute text-4xl opacity-15 select-none pointer-events-none"
        style={{ top: '35%', right: '5%' }}
        animate={{ x: [0, -50, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      >
        ☁️
      </motion.span>
      <motion.span
        className="absolute text-6xl opacity-10 select-none pointer-events-none"
        style={{ bottom: '20%', left: '15%' }}
        animate={{ x: [0, 70, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      >
        ☁️
      </motion.span>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-xl font-bold text-slate-800 text-center z-10"
      >
        {t('place_your_thought_on_a_cloud', 'Place your thought on a cloud')}
      </motion.h2>

      {/* Main thought cloud */}
      <motion.div
        initial={{ x: '-60%', opacity: 0 }}
        animate={{ x: ['0%', '12%', '-10%', '0%'], opacity: 1 }}
        transition={{ x: { duration: 14, repeat: Infinity, ease: 'easeInOut' }, opacity: { duration: 1 } }}
        className="relative z-10 flex items-center justify-center cursor-default select-none"
      >
        <span className="text-[140px] leading-none filter drop-shadow-md">☁️</span>
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-extrabold text-slate-700 max-w-[170px] text-center leading-snug mt-1">
          "{thought}"
        </span>
      </motion.div>

      {/* Bottom section */}
      <div className="z-10 flex flex-col items-center gap-6 w-full max-w-sm">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center space-y-2 bg-white/40 backdrop-blur-md p-6 rounded-3xl border border-white/60 shadow-sm"
        >
          <p className="text-sm font-bold text-slate-700">
            {t('watch_the_cloud_move_across_the_sky', 'Watch the cloud move across the sky.')}
          </p>
          <p className="text-sm font-bold text-slate-700">
            {t('your_thought_is_simply_passing_through', 'Your thought is simply passing through.')}
          </p>
          <p className="text-xs font-black text-primary uppercase tracking-widest mt-1">
            {t('you_are_the_sky_observing_it', 'You are the sky observing it.')}
          </p>
        </motion.div>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          onClick={onNext}
          className="w-full py-4.5 rounded-2xl font-black text-base bg-primary text-primary-foreground hover:shadow-lg transition-all duration-200"
        >
          {t('btn_next', 'Next →')}
        </motion.button>
      </div>
    </motion.div>
  );
}

// --- Money Slider Sub-component ---

function MoneySlider({ value, onChange }: { value: number; onChange: (val: number) => void }) {
  const { t } = useTranslation(undefined, { i18n });
  const [coins, setCoins] = useState<{ id: number; left: number }[]>([]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = Number(e.target.value);
    if (Math.abs(newVal - value) >= 5) {
      setCoins((prev) => [...prev, { id: Date.now(), left: 25 + Math.random() * 50 }].slice(-8));
    }
    onChange(newVal);
  };

  return (
    <div className="w-full py-2">
      <div className="text-center mb-6 relative">
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5">
          {t('current_thought_value', 'Current Thought Value')}
        </p>
        <motion.p
          key={value}
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          className="text-5xl font-black text-slate-800 dark:text-white"
        >
          ${value}
        </motion.p>
        
        {/* Floating coins animations */}
        <AnimatePresence>
          {coins.map((coin) => (
            <motion.span
              key={coin.id}
              initial={{ opacity: 1, y: 0, x: Math.random() * 40 - 20 }}
              animate={{ opacity: 0, y: -65 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="absolute text-3xl pointer-events-none"
              style={{ left: `${coin.left}%` }}
            >
              💰
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      <div className="space-y-4 px-2">
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={value}
          onChange={handleSliderChange}
          className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none"
        />

        <div className="flex justify-between text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          <span>$0</span>
          <span>$25</span>
          <span>$50</span>
          <span>$75</span>
          <span>$100</span>
        </div>

        <div className="flex justify-between text-[10px] font-black text-slate-350 dark:text-slate-650 uppercase tracking-widest pt-1">
          <span>{t('worthless', 'Worthless')}</span>
          <span>{t('somewhat', 'Somewhat')}</span>
          <span>{t('fully_believe', 'Fully believe')}</span>
        </div>
      </div>
    </div>
  );
}

// --- Story Naming Sub-component ---

interface StoryNamingScreenProps {
  storyName: string;
  onStoryNameChange: (val: string) => void;
  onContinue: () => void;
}

const CHIP_SUGGESTIONS = [
  'The "Not Good Enough" Story',
  'The "Everything Will Go Wrong" Story',
  'The "Failure" Story',
];

function StoryNamingScreen({ storyName, onStoryNameChange, onContinue }: StoryNamingScreenProps) {
  const { t } = useTranslation(undefined, { i18n });
  const [isFlipping, setIsFlipping] = useState(false);

  const handleSave = () => {
    if (!storyName.trim()) return;
    setIsFlipping(true);
    setTimeout(() => {
      onContinue();
    }, 900);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="w-full relative overflow-hidden rounded-[2.5rem] p-8 border-2 border-primary/10 bg-gradient-to-b from-[#F3EDFF]/50 to-[#E9E4FF]/50 dark:from-[#2e264d]/10 dark:to-[#1a172e]/10 shadow-sm"
    >
      {/* Floating decorative elements */}
      {[
        { emoji: '📖', top: '8%', left: '8%', dur: 6, rotate: true },
        { emoji: '✨', top: '15%', right: '10%', dur: 3, scale: true },
        { emoji: '📖', bottom: '20%', right: '7%', dur: 7, rotate: true },
        { emoji: '✨', bottom: '10%', right: '15%', dur: 3.5, scale: true },
      ].map((el, i) => (
        <motion.span
          key={i}
          className="absolute text-2xl opacity-10 select-none pointer-events-none"
          style={{ top: el.top, left: el.left, right: el.right, bottom: el.bottom }}
          animate={
            el.rotate
              ? { rotate: [0, 8, -8, 0], y: [0, -6, 0] }
              : { scale: [1, 1.25, 1], opacity: [0.1, 0.25, 0.1] }
          }
          transition={{ duration: el.dur, repeat: Infinity, ease: 'easeInOut' }}
        >
          {el.emoji}
        </motion.span>
      ))}

      <div className="relative z-10 w-full space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
            {t('give_this_thought_a_story_name', 'Give this thought a story name 📖')}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">
            {t('what_would_you_call_this_story', 'What would you call this story?')}
          </p>
        </div>

        <div className="space-y-3.5">
          <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-left px-1">
            {t('pick_a_suggestion_or_write_your_own', 'Pick a suggestion or write your own:')}
          </p>
          <div className="flex flex-wrap gap-2.5">
            {CHIP_SUGGESTIONS.map((chip) => {
              const isSelected = storyName === chip;
              return (
                <motion.button
                  key={chip}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onStoryNameChange(chip)}
                  className={`px-4.5 py-2.5 rounded-full text-xs font-bold transition-all border-2 ${
                    isSelected
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-white dark:bg-slate-900 text-slate-650 dark:text-slate-350 border-slate-100 dark:border-slate-800 hover:border-primary/20 hover:bg-primary/5'
                  }`}
                >
                  {chip}
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <input
            type="text"
            value={storyName}
            onChange={(e) => onStoryNameChange(e.target.value)}
            placeholder="Or type your own story name..."
            className="w-full border-2 border-primary/20 rounded-2xl px-5 py-4 text-base text-slate-900 dark:text-white bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm focus:outline-none focus:border-primary focus:shadow-md transition-all font-bold placeholder:text-slate-300"
          />
        </div>

        {/* Mindful Phrase Live Preview */}
        <AnimatePresence>
          {storyName.trim() && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl p-5 border-2 border-primary/10 bg-primary/5 text-left"
            >
              <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1.5">
                {t('your_mindful_phrase', 'Your mindful phrase:')}
              </p>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-355 italic leading-relaxed">
                "I'm noticing my mind telling the '{storyName}' story again."
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Save button with page-flip animation */}
        <div className="relative pt-2">
          <AnimatePresence>
            {isFlipping && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <motion.span
                  className="text-6xl"
                  initial={{ rotateY: 0, scale: 1 }}
                  animate={{ rotateY: [0, -90, -180, -270, -360], scale: [1, 1.25, 1.4, 1.25, 1] }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                >
                  📖
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div
            animate={isFlipping ? { opacity: 0, scale: 0.95 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={handleSave}
              disabled={!storyName.trim()}
              className="w-full py-4.5 rounded-2xl bg-primary text-primary-foreground font-black text-base shadow-lg shadow-primary/10 hover:shadow-xl transition-all disabled:opacity-40"
            >
              {t('save_story', 'Save Story')}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// --- Main Inner Component ---

function DiffusionTechniqueInner() {
  const { t } = useTranslation(undefined, { i18n });
  const [view, setView] = useState<View>('intro');
  const [step, setStep] = useState(1);
  const [thought, setThought] = useState('');
  const [sellValue, setSellValue] = useState(50);
  const [storyName, setStoryName] = useState('');

  // Sync lang query param
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const lang = params.get('lang') || 'en';
      loadLocale(lang);
    }
  }, []);

  const resetFlow = () => {
    setStep(1);
    setThought('');
    setSellValue(50);
    setStoryName('');
  };

  const getTitle = () => {
    switch (view) {
      case 'sky':
        return t('title_sky_clouds', 'Sky and Clouds');
      case 'sell':
        return t('title_sell_thought', 'Sell the Thought');
      case 'name':
        return t('title_name_story', 'Name the Story');
      case 'choose':
        return t('title_choose', 'Diffusion Techniques');
      default:
        return t('title_diffusion', 'Diffusion');
    }
  };

  const handleBack = () => {
    if (view === 'intro') return;
    if (view === 'choose') {
      setView('intro');
      return;
    }
    if (step > 1) {
      if (step === 4) {
        resetFlow();
        setView('choose');
        return;
      }
      setStep(step - 1);
      return;
    }
    resetFlow();
    setView('choose');
  };

  const activeBackAction = view !== 'intro' ? handleBack : undefined;

  return (
    <PremiumLayout
      title={getTitle()}
      icon={<Brain className="w-6 h-6 text-primary" />}
      onReset={view !== 'intro' ? () => { resetFlow(); setView('intro'); } : undefined}
      onBack={activeBackAction}
      exitOnBack={view === 'intro'}
    >
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-4 min-h-[70vh]">
        <AnimatePresence mode="wait">
          {/* VIEW: INTRO */}
          {view === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="w-full flex-1 flex flex-col"
            >
              <PremiumIntro
                title={t('app_title', 'Diffusion Techniques')}
                description={t('intro_title', 'Diffusion Techniques')}
                onStart={() => setView('choose')}
                icon={<Brain size={32} />}
                benefits={[
                  t('intro_desc1', 'Sometimes our thoughts feel overwhelming because we treat them as facts.'),
                  t('intro_desc2', 'Diffusion techniques help you step back and observe thoughts instead of getting stuck in them.'),
                  t('intro_desc3', 'In this activity you will try simple exercises that help your mind create space from unhelpful thoughts.'),
                ]}
                duration={t('app_duration', '3-5 minutes')}
              />
            </motion.div>
          )}

          {/* VIEW: CHOOSE A TECHNIQUE */}
          {view === 'choose' && (
            <motion.div
              key="choose"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-6 text-left"
            >
              <header className="space-y-2">
                <span className="flex items-center gap-1.5 text-primary font-bold text-[10px] uppercase tracking-widest">
                  <Sparkles size={12} />
                  {t('label_choose_technique', 'Choose Technique')}
                </span>
                <h1 className="text-3xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
                  {t('choose_title', 'Choose a Technique to Practice')}
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">
                  {t('choose_desc', 'Each exercise helps you look at your thoughts from a new perspective. Pick one and follow the guided steps.')}
                </p>
              </header>

              <div className="grid gap-4.5">
                {[
                  {
                    icon: Cloud,
                    title: t('title_sky_clouds', 'Sky and Clouds'),
                    desc: t('card_sky_desc', 'Imagine your thoughts drifting across the sky like clouds. Watch them appear and pass by without holding onto them.'),
                    view: 'sky' as View,
                    color: 'bg-cyan-50 dark:bg-cyan-950/20 text-cyan-500 border-cyan-100 dark:border-cyan-900/30',
                  },
                  {
                    icon: Banknote,
                    title: t('title_sell_thought', 'Sell the Thought'),
                    desc: t('card_sell_desc', 'Treat your thought like something being sold to you. How valuable is it really?'),
                    view: 'sell' as View,
                    color: 'bg-teal-50 dark:bg-teal-950/20 text-teal-500 border-teal-100 dark:border-teal-900/30',
                  },
                  {
                    icon: BookOpen,
                    title: t('title_name_story', 'Name the Story'),
                    desc: t('card_name_desc', 'When thoughts repeat again and again, they become stories. Naming the story helps create distance from it.'),
                    view: 'name' as View,
                    color: 'bg-sky-50 dark:bg-sky-950/20 text-sky-500 border-sky-100 dark:border-sky-900/30',
                  },
                ].map((card) => {
                  const CardIcon = card.icon;
                  return (
                    <motion.button
                      key={card.title}
                      whileHover={{ scale: 1.01, x: 4 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => {
                        resetFlow();
                        setView(card.view);
                      }}
                      className="w-full text-left p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-primary/20 dark:hover:border-primary/30 transition-all flex items-center gap-5 group"
                    >
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${card.color} group-hover:scale-105 transition-all`}>
                        <CardIcon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-base group-hover:text-primary transition-colors">
                          {card.title}
                        </h3>
                        <p className="text-slate-400 dark:text-slate-500 text-xs font-bold leading-relaxed mt-1 line-clamp-2">
                          {card.desc}
                        </p>
                      </div>
                      <ArrowRight className="text-slate-200 dark:text-slate-850 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* VIEW: SKY AND CLOUD EXERCISE */}
          {view === 'sky' && (
            <div className="w-full">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="sky1"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    className="space-y-6 text-left"
                  >
                    <div className="space-y-3">
                      <h1 className="text-3xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
                        {t('sky_title', 'Sky and Cloud')}
                      </h1>
                      <div className="space-y-4 text-slate-500 dark:text-slate-400 text-base font-bold leading-relaxed">
                        <p>{t('sky_intro_1', 'Imagine your mind as a wide open sky.')}</p>
                        <p>{t('sky_intro_2', 'Thoughts are like clouds passing through.')}</p>
                      </div>
                    </div>
                    <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-100 dark:border-slate-800 shadow-sm">
                      <p className="text-slate-600 dark:text-slate-400 text-sm font-bold leading-relaxed italic">
                        {t('sky_intro_5', 'Your job is simply to watch them pass.')}
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setStep(2)}
                      className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-black text-base shadow-lg shadow-primary/10 hover:shadow-xl transition-all flex items-center justify-center gap-2"
                    >
                      {t('btn_begin_exercise', 'Begin Exercise')}
                      <ArrowRight size={18} />
                    </motion.button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="sky2"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    className="space-y-6 text-left"
                  >
                    <div className="space-y-2">
                      <h1 className="text-3xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
                        {t('sky_question', 'What thought is on your mind right now?')}
                      </h1>
                      <p className="text-slate-505 dark:text-slate-400 text-sm font-medium leading-relaxed">
                        {t('sky_hint', 'Write one thought that has been bothering you recently.')}
                      </p>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">
                        {t('label_current_thought', 'Your current thought')}
                      </label>
                      <textarea
                        value={thought}
                        onChange={(e) => setThought(e.target.value)}
                        placeholder={t('sky_placeholder', 'Example: "I might fail this presentation"')}
                        rows={4}
                        className="w-full py-4.5 rounded-2xl border-2 border-slate-105 dark:border-slate-800 bg-white dark:bg-slate-900 focus:border-primary transition-all outline-none px-5 font-bold text-slate-700 dark:text-slate-200 placeholder:text-slate-300 resize-none shadow-inner"
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      disabled={!thought.trim()}
                      onClick={() => setStep(3)}
                      className="w-full py-4.5 rounded-2xl bg-primary text-primary-foreground font-black text-base shadow-lg shadow-primary/10 hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:shadow-none"
                    >
                      {t('btn_place_on_cloud', 'Place it on a Cloud →')}
                      <Cloud size={18} />
                    </motion.button>
                  </motion.div>
                )}

                {/* ANIMATED FULL SCREEN EXERCISE */}
                {step === 3 && (
                  <FullScreenSky key="sky3" thought={thought} onNext={() => setStep(4)} />
                )}

                {step === 4 && (
                  <motion.div
                    key="sky4"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    className="w-full"
                  >
                    <PremiumComplete
                      title={t('conclusion_sky_title', 'The Thought Drifted Away')}
                      message={
                        t('conclusion_sky_desc1', 'Thoughts are like clouds in the sky.') +
                        ' ' +
                        t('conclusion_sky_desc2', 'They appear, move across our mind, and eventually pass.')
                      }
                      onRestart={() => {
                        resetFlow();
                        setView('choose');
                      }}
                      icon={<Cloud size={48} />}
                    >
                      <div className="flex flex-col gap-3 mt-8">
                        <motion.button
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => {
                            resetFlow();
                            setView('choose');
                          }}
                          className="w-full py-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white font-black text-xs uppercase tracking-widest shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
                        >
                          <RefreshCw size={16} />
                          {t('btn_try_another', 'Try Another Technique')}
                        </motion.button>
                      </div>
                    </PremiumComplete>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* VIEW: SELL THE THOUGHT */}
          {view === 'sell' && (
            <div className="w-full">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="sell1"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    className="space-y-6 text-left"
                  >
                    <div className="space-y-3">
                      <h1 className="text-3xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
                        {t('sell_title', 'Sell the Thought')}
                      </h1>
                      <div className="space-y-4 text-slate-500 dark:text-slate-400 text-base font-bold leading-relaxed">
                        <p>{t('sell_intro_1', 'Sometimes our mind tries to sell us thoughts that feel very convincing.')}</p>
                        <p>{t('sell_intro_2', 'In this exercise you will treat your thought like a product someone is trying to sell you.')}</p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setStep(2)}
                      className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-black text-base shadow-lg shadow-primary/10 hover:shadow-xl transition-all flex items-center justify-center gap-2"
                    >
                      {t('btn_begin_exercise', 'Begin Exercise')}
                      <ArrowRight size={18} />
                    </motion.button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="sell2"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    className="space-y-6 text-left"
                  >
                    <div className="space-y-2">
                      <h1 className="text-3xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
                        {t('sell_question', 'What thought is bothering you?')}
                      </h1>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">
                        {t('label_current_thought', 'Your current thought')}
                      </label>
                      <input
                        type="text"
                        value={thought}
                        onChange={(e) => setThought(e.target.value)}
                        placeholder={t('placeholder_sell', 'I\'m not good enough')}
                        className="w-full py-4.5 rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 focus:border-primary transition-all outline-none px-5 font-bold text-slate-700 dark:text-white placeholder:text-slate-300 shadow-inner"
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      disabled={!thought.trim()}
                      onClick={() => setStep(3)}
                      className="w-full py-4.5 rounded-2xl bg-primary text-primary-foreground font-black text-base shadow-lg shadow-primary/10 hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:shadow-none"
                    >
                      {t('btn_continue', 'Continue →')}
                    </motion.button>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="sell3"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    className="space-y-6 text-left"
                  >
                    <div className="space-y-2">
                      <h1 className="text-3xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
                        {t('sell_cost_question', 'How much would this thought cost?')}
                      </h1>
                      <p className="text-slate-505 dark:text-slate-400 text-sm font-medium leading-relaxed">
                        {t('sell_cost_hint', 'If someone tried to sell you this thought, how valuable would it actually be?')}
                      </p>
                    </div>
                    <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-100 dark:border-slate-800 shadow-sm">
                      <MoneySlider value={sellValue} onChange={setSellValue} />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setStep(4)}
                      className="w-full py-4.5 rounded-2xl bg-primary text-primary-foreground font-black text-base shadow-lg shadow-primary/10 hover:shadow-xl transition-all flex items-center justify-center gap-2"
                    >
                      {t('btn_next', 'Next →')}
                    </motion.button>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    key="sell4"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    className="w-full"
                  >
                    <PremiumComplete
                      title={
                        sellValue < 30
                          ? t('sell_result_low_title', 'Not a great deal')
                          : sellValue < 70
                          ? t('sell_result_mid_title', 'Worth considering')
                          : t('sell_result_high_title', 'A convincing thought')
                      }
                      message={
                        sellValue < 30
                          ? t('sell_result_low_desc1', 'Looks like this thought may not be very valuable.')
                          : sellValue < 70
                          ? t('sell_result_mid_desc1', 'This thought has some pull, but it\'s not the whole story.')
                          : t('sell_result_high_desc1', 'This thought feels convincing right now.')
                      }
                      onRestart={() => {
                        resetFlow();
                        setView('choose');
                      }}
                      icon={<Banknote size={48} />}
                    >
                      <div className="flex flex-col gap-3 mt-8">
                        <motion.button
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => {
                            resetFlow();
                            setView('choose');
                          }}
                          className="w-full py-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white font-black text-xs uppercase tracking-widest shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
                        >
                          <RefreshCw size={16} />
                          {t('btn_try_another', 'Try Another Technique')}
                        </motion.button>
                      </div>
                    </PremiumComplete>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* VIEW: NAME THE STORY */}
          {view === 'name' && (
            <div className="w-full">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="name1"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    className="space-y-6 text-left"
                  >
                    <div className="space-y-3">
                      <h1 className="text-3xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
                        {t('name_title', 'Name the Story')}
                      </h1>
                      <div className="space-y-4 text-slate-500 dark:text-slate-400 text-base font-bold leading-relaxed">
                        <p>{t('name_intro_1', 'Our mind often repeats the same thoughts again and again.')}</p>
                        <p>{t('name_intro_2', 'Instead of fighting them, we can simply name the story our mind is telling.')}</p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setStep(2)}
                      className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-black text-base shadow-lg shadow-primary/10 hover:shadow-xl transition-all flex items-center justify-center gap-2"
                    >
                      {t('btn_begin_exercise', 'Begin Exercise')}
                      <ArrowRight size={18} />
                    </motion.button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="name2"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    className="space-y-6 text-left"
                  >
                    <div className="space-y-2">
                      <h1 className="text-3xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
                        {t('name_question', 'Write a recurring thought')}
                      </h1>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">
                        {t('label_recurrent_thought', 'The recurrent thought')}
                      </label>
                      <input
                        type="text"
                        value={thought}
                        onChange={(e) => setThought(e.target.value)}
                        placeholder={t('placeholder_name', '"I always mess things up"')}
                        className="w-full py-4.5 rounded-2xl border-2 border-slate-105 dark:border-slate-800 bg-white dark:bg-slate-900 focus:border-primary transition-all outline-none px-5 font-bold text-slate-700 dark:text-white placeholder:text-slate-300 shadow-inner"
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      disabled={!thought.trim()}
                      onClick={() => setStep(3)}
                      className="w-full py-4.5 rounded-2xl bg-primary text-primary-foreground font-black text-base shadow-lg shadow-primary/10 hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:shadow-none"
                    >
                      {t('btn_continue_simple', 'Continue')}
                    </motion.button>
                  </motion.div>
                )}

                {step === 3 && (
                  <StoryNamingScreen
                    key="name3"
                    storyName={storyName}
                    onStoryNameChange={setStoryName}
                    onContinue={() => setStep(4)}
                  />
                )}

                {step === 4 && (
                  <motion.div
                    key="name4"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    className="w-full text-left"
                  >
                    <PremiumComplete
                      title={t('conclusion_name_title', 'You Named the Story')}
                      message={`${t('conclusion_name_desc1', 'Our minds often repeat the same stories again and again.')} ${t(
                        'conclusion_name_desc2',
                        'By giving the thought a name, you practiced recognizing the story instead of getting caught in it.'
                      )}`}
                      onRestart={() => {
                        resetFlow();
                        setView('choose');
                      }}
                      icon={<BookOpen size={48} />}
                    >
                      <div className="p-6 bg-slate-900 rounded-[2rem] text-white my-6 shadow-xl relative overflow-hidden text-left">
                        <div className="absolute top-0 right-0 p-6 text-white/5 pointer-events-none">
                          <BookOpen size={100} strokeWidth={1} />
                        </div>
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.25em] mb-2.5 relative z-10">
                          {t('label_remember_to_say', 'Remember to say:')}
                        </p>
                        <p className="text-xl font-bold italic leading-snug relative z-10">
                          "{t('conclusion_name_phrase_prefix', 'There goes the')} {storyName}{' '}
                          {t('conclusion_name_phrase_suffix', 'again.')}"
                        </p>
                      </div>

                      <div className="flex flex-col gap-3">
                        <motion.button
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => {
                            resetFlow();
                            setView('choose');
                          }}
                          className="w-full py-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white font-black text-xs uppercase tracking-widest shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
                        >
                          <RefreshCw size={16} />
                          {t('btn_try_another', 'Try Another Technique')}
                        </motion.button>
                      </div>
                    </PremiumComplete>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
}

export default function DiffusionTechniquePage() {
  return (
    <I18nextProvider i18n={i18n}>
      <DiffusionTechniqueInner />
    </I18nextProvider>
  );
}
