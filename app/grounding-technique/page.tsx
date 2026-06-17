'use client';

import { useState, useEffect, useMemo } from 'react';
import { useTranslation, I18nextProvider } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Sparkles, Wind, Loader2, ArrowLeft, Heart, CheckCircle2 } from 'lucide-react';
import i18n, { loadLocale } from './i18n';
import { PremiumLayout } from '@/components/shared/PremiumLayout';

interface Technique {
  id: string;
  title: string;
  color: string;
  colorDeep: string;
  colorVar: string;
  steps: string[];
}

const TECHNIQUES: Technique[] = [
  {
    id: "water",
    title: "Put your hands in water",
    color: "bg-teal-50 ",
    colorDeep: "bg-teal-100 ",
    colorVar: "teal",
    steps: [
      "Run your hands under cool or warm water.",
      "Notice the temperature.",
      "Pay attention to the sensation on your skin.",
      "Observe how it changes moment by moment.",
      "Let your breathing slow naturally.",
    ],
  },
  {
    id: "touch",
    title: "Pick up or touch items near you",
    color: "bg-purple-50 ",
    colorDeep: "bg-purple-100 ",
    colorVar: "purple",
    steps: [
      "Choose a nearby object.",
      "Notice its texture, weight, and temperature.",
      "Is it smooth or rough? Heavy or light?",
      "Let your focus stay fully on this one object.",
    ],
  },
  {
    id: "breathe",
    title: "Breathe deeply",
    color: "bg-amber-50 ",
    colorDeep: "bg-amber-100 ",
    colorVar: "amber",
    steps: [
      "Take a slow breath in through your nose.",
      "Hold gently for a moment.",
      "Exhale slowly through your mouth.",
      "Repeat several times.",
      "Let your shoulders soften.",
    ],
  },
  {
    id: "food",
    title: "Savour your food",
    color: "bg-emerald-50 ",
    colorDeep: "bg-emerald-100 ",
    colorVar: "emerald",
    steps: [
      "Take a small bite.",
      "Chew slowly.",
      "Notice the flavor, texture, and temperature.",
      "Stay fully present with the experience.",
    ],
  },
  {
    id: "drink",
    title: "Savour a drink",
    color: "bg-blue-50 ",
    colorDeep: "bg-blue-100 ",
    colorVar: "blue",
    steps: [
      "Take a slow sip.",
      "Notice the temperature and taste.",
      "Feel the sensation as you swallow.",
      "Let yourself stay with that moment.",
    ],
  },
  {
    id: "walk",
    title: "Take a short walk",
    color: "bg-rose-50 ",
    colorDeep: "bg-rose-100 ",
    colorVar: "rose",
    steps: [
      "Walk slowly and intentionally.",
      "Notice the feeling of your feet touching the ground.",
      "Observe your surroundings without judgment.",
      "Let your breath match your steps.",
    ],
  },
  {
    id: "ice",
    title: "Hold a piece of ice",
    color: "bg-cyan-50 ",
    colorDeep: "bg-cyan-100 ",
    colorVar: "cyan",
    steps: [
      "Hold the ice in your hand.",
      "Notice the cold sensation.",
      "Focus fully on the feeling.",
      "Allow the strong sensation to anchor you to the present.",
    ],
  },
  {
    id: "scent",
    title: "Savour a scent",
    color: "bg-orange-50 ",
    colorDeep: "bg-orange-100 ",
    colorVar: "orange",
    steps: [
      "Choose a scent nearby.",
      "Inhale slowly.",
      "Notice how it feels in your body.",
      "Let the scent bring you into this moment.",
    ],
  },
  {
    id: "move",
    title: "Move your body",
    color: "bg-sky-50 ",
    colorDeep: "bg-sky-100 ",
    colorVar: "sky",
    steps: [
      "Stretch gently.",
      "Roll your shoulders.",
      "Shift your weight from side to side.",
      "Notice how your body feels as it moves.",
    ],
  },
  {
    id: "listen",
    title: "Listen to your surroundings",
    color: "bg-indigo-50 ",
    colorDeep: "bg-indigo-100 ",
    colorVar: "indigo",
    steps: [
      "Pause and listen.",
      "Identify three distinct sounds.",
      "Are they near or far?",
      "Let your attention rest on each one.",
    ],
  },
  {
    id: "body",
    title: "Check in with your body",
    color: "bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 ",
    colorDeep: "bg-slate-100 ",
    colorVar: "slate",
    steps: [
      "Close your eyes if comfortable.",
      "Scan from head to toe.",
      "Notice areas of tension or ease.",
      "Breathe into any tightness.",
    ],
  },
];

function GroundingTechniqueInner() {
  const { t } = useTranslation(undefined, { i18n });
  const [selectedTechId, setSelectedTechId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Sync lang URL parameter
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const lang = params.get('lang') || 'en';
      loadLocale(lang);
    }
  }, []);

  const activeTechnique = useMemo(() => {
    return TECHNIQUES.find((tech) => tech.id === selectedTechId);
  }, [selectedTechId]);

  const handleStartTechnique = (id: string) => {
    setSelectedTechId(id);
    setCurrentStep(0);
    setIsCompleted(false);
  };

  const handleNext = () => {
    if (!activeTechnique) return;
    if (currentStep >= activeTechnique.steps.length - 1) {
      setIsCompleted(true);
    } else {
      setCurrentStep((s) => s + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  };

  const handleReset = () => {
    setSelectedTechId(null);
    setCurrentStep(0);
    setIsCompleted(false);
  };

  const totalSteps = activeTechnique ? activeTechnique.steps.length : 0;

  return (
    <PremiumLayout
      title={t('app_title', 'Grounding')}
      icon={<Wind className="w-6 h-6 text-primary animate-pulse" />}
      onBack={selectedTechId ? handleReset : undefined}
      onReset={selectedTechId ? handleReset : undefined}
    >
      <div className="w-full max-w-lg mx-auto px-6 py-4 min-h-[70vh] flex flex-col justify-start">
        <AnimatePresence mode="wait">
          {/* SCREEN 1: OVERVIEW CARD GRID */}
          {!selectedTechId && (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8 w-full"
            >
              <header className="space-y-3 text-left">
                <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.2em]">
                  <Sparkles size={14} />
                  {t('Grounding', 'Grounding')}
                </div>
                <h1 className="text-3.5xl font-black text-slate-900 leading-tight tracking-tight">
                  {t('stay_present', 'Stay Present')}
                </h1>
                <p className="text-slate-500 text-sm font-bold leading-relaxed">
                  {t(
                    'Grounding techniques help bring your attention back to the present moment.',
                    'Grounding techniques help bring your attention back to the present moment.'
                  )}{' '}
                  {t('Choose one activity that feels supportive right now.', 'Choose one activity that feels supportive right now.')}
                </p>
              </header>

              <div className="grid grid-cols-2 gap-4">
                {TECHNIQUES.map((tech, i) => {
                  const translatedLabel = t(tech.title, tech.title);
                  return (
                    <motion.button
                      key={tech.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.03 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleStartTechnique(tech.id)}
                      className="w-full aspect-square rounded-[2rem] bg-white border border-white/60 p-5 text-center flex flex-col items-center justify-center gap-4 shadow-sm hover:shadow-md hover:border-primary/20 transition-all group"
                    >
                      <div className={`w-14 h-14 rounded-2xl ${tech.color} flex items-center justify-center text-slate-500  group-hover:scale-105 transition-transform`}>
                        <span className="text-xl font-black text-primary opacity-60 group-hover:opacity-100 transition-opacity">
                          {translatedLabel.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-slate-800 font-extrabold text-xs leading-snug group-hover:text-primary transition-colors">
                        {translatedLabel}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* SCREEN 2: TECHNIQUE STEPS PROGRESS */}
          {selectedTechId && activeTechnique && !isCompleted && (
            <motion.div
              key="steps"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8 w-full text-left"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.2em]">
                  <Sparkles size={14} />
                  {t('grounding_technique', 'Grounding Technique')}
                </div>
                <h1 className="text-2.5xl font-black text-slate-900 leading-tight tracking-tight">
                  {t(activeTechnique.title, activeTechnique.title)}
                </h1>

                <div className="flex items-center gap-4 pt-2">
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                      className="h-full bg-primary"
                    />
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest tabular-nums shrink-0">
                    {currentStep + 1} / {totalSteps}
                  </span>
                </div>
              </div>

              <div className="relative min-h-[300px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, scale: 0.96, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.04, y: -12 }}
                    className="w-full p-8 bg-white rounded-[2.5rem] border border-white/60 shadow-xl shadow-slate-200/20 flex flex-col items-center justify-center text-center gap-8 min-h-[280px]"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="w-20 h-20 rounded-[2rem] bg-primary/15 flex items-center justify-center text-primary"
                    >
                      <Wind size={40} className="animate-pulse" />
                    </motion.div>
                    <p className="text-slate-700 text-xl font-extrabold leading-relaxed px-4">
                      {t(activeTechnique.steps[currentStep], activeTechnique.steps[currentStep])}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex gap-3">
                {currentStep > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePrev}
                    className="p-4.5 bg-white border border-white/60 text-slate-400 rounded-2xl shadow-sm flex items-center justify-center hover:text-slate-800 transition-all"
                  >
                    <ChevronLeft size={24} strokeWidth={3} />
                  </motion.button>
                )}

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={handleNext}
                  className="flex-1 py-4.5 rounded-2xl bg-primary text-primary-foreground font-black text-base shadow-lg shadow-primary/10 hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  {currentStep >= totalSteps - 1
                    ? t('I Feel More Grounded', 'I Feel More Grounded')
                    : t('Next Step', 'Next Step')}
                  {currentStep < totalSteps - 1 && <ChevronRight size={18} strokeWidth={3} />}
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* SCREEN 3: COMPLETION */}
          {selectedTechId && activeTechnique && isCompleted && (
            <motion.div
              key="completed"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full text-center space-y-8"
            >
              <div className="bg-white rounded-[2.5rem] border border-white/60 p-8 shadow-xl shadow-slate-200/20 space-y-6">
                <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 size={44} strokeWidth={2.5} />
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl font-black text-slate-900 leading-tight">
                    {t('common.well_done', 'Well Done!')}
                  </h1>
                  <p className="text-slate-500 text-sm font-bold leading-relaxed max-w-sm mx-auto">
                    {t(
                      'common.completion_message',
                      "You've successfully completed this activity. Take a moment to appreciate your progress."
                    )}
                  </p>
                </div>

                <div className={`p-5 rounded-2xl ${activeTechnique.color} border border-white/60/50  text-center font-extrabold text-slate-800  text-sm italic`}>
                  &quot;{t(activeTechnique.title, activeTechnique.title)}&quot;
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={handleReset}
                  className="w-full py-4.5 rounded-2xl bg-primary text-primary-foreground font-black text-base shadow-lg shadow-primary/10 hover:shadow-xl transition-all"
                >
                  {t('Choose Another Technique', 'Choose Another Technique')}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={handleReset}
                  className="w-full py-4 bg-white border border-white/60 text-slate-500 hover:text-slate-800 font-black text-xs uppercase tracking-widest rounded-2xl shadow-sm transition-all"
                >
                  {t('Back', 'Back')}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
}

export default function GroundingTechniquePage() {
  return (
    <I18nextProvider i18n={i18n}>
      <GroundingTechniqueInner />
    </I18nextProvider>
  );
}
