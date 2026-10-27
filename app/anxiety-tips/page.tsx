'use client';

import { useState, useEffect } from 'react';
import { useTranslation, I18nextProvider } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Wind, Eye, Dumbbell, MessageCircleHeart, ChevronRight, Sparkles, CheckCircle2, ArrowLeft } from 'lucide-react';
import i18n, { loadLocale } from './i18n';
import { PremiumLayout } from '@/components/shared/PremiumLayout';

// Breathing circle helper component
const BreathingCircle = () => {
  const { t } = useTranslation(undefined, { i18n });
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [running, setRunning] = useState(false);

  const phases = [
    { name: "inhale", label: t("inhale_label", "Inhale…"), duration: 4000 },
    { name: "hold", label: t("hold_label", "Hold…"), duration: 4000 },
    { name: "exhale", label: t("exhale_label", "Exhale…"), duration: 6000 },
  ];

  const current = phases[phaseIndex];

  useEffect(() => {
    if (!running) return;
    const timer = setTimeout(() => {
      setPhaseIndex((prev) => (prev + 1) % phases.length);
    }, current.duration);
    return () => clearTimeout(timer);
  }, [phaseIndex, running, current.duration]);

  const scale = current.name === "inhale" ? "scale-100" : current.name === "hold" ? "scale-100" : "scale-[0.6]";
  const opacity = current.name === "exhale" ? "opacity-50" : "opacity-100";

  return (
    <div className="flex flex-col items-center gap-4 sm:gap-6 p-5 sm:p-6 bg-white rounded-2xl sm:rounded-[2rem] border border-slate-100 shadow-sm">
      <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center">
        <div
          className={`absolute inset-0 rounded-full bg-primary/15 transition-all ${scale} ${opacity}`}
          style={{ transitionDuration: `${current.duration}ms`, transitionTimingFunction: "ease-in-out" }}
        />
        <div
          className={`absolute inset-3 sm:inset-4 rounded-full bg-primary/25 transition-all ${scale} ${opacity}`}
          style={{ transitionDuration: `${current.duration}ms`, transitionTimingFunction: "ease-in-out" }}
        />
        <span className="relative text-slate-800 font-bold text-sm sm:text-base z-10">
          {running ? current.label : t("start", "Ready")}
        </span>
      </div>
      <button
        onClick={() => { setRunning(!running); setPhaseIndex(0); }}
        className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-primary text-primary-foreground font-black text-xs sm:text-sm transition-all hover:opacity-90 active:scale-95 shadow-md shadow-primary/10"
      >
        {running ? t("stop", "Stop") : t("begin_breathing", "Begin Breathing")}
      </button>
    </div>
  );
};

function AnxietyTipsInner() {
  const { t } = useTranslation(undefined, { i18n });
  const [selectedTipId, setSelectedTipId] = useState<string | null>(null);

  // Localization sync
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const lang = params.get('lang') || 'en';
      loadLocale(lang);
    }
  }, []);

  const tips = [
    {
      id: "seek-support",
      title: t("tip_seek_support", "Seek Support"),
      preview: t("tip_seek_support_desc", "Connect with someone you trust."),
      why: t("support_why", "Sharing with someone else can help lower your stress and make you feel understood."),
      steps: [
        t("support_step1", "Message a friend or family member for a chat."),
        t("support_step2", "Call a supportive community member or helper."),
        t("support_step3", "Meet with a professional for deep guidance."),
        t("support_step4", "Spend comfortable quiet time with a pet."),
      ],
      icon: Heart,
    },
    {
      id: "deep-breathing",
      title: t("tip_deep_breathing", "Deep Breathing"),
      preview: t("tip_deep_breathing_desc", "Quiet your body with intentional breaths."),
      why: t("breathing_why", "Slowing down your exhalations directly calms your nervous system."),
      steps: [
        t("breathing_step1", "Find a comfortable, quiet seated posture."),
        t("breathing_step2", "Breathe in deeply through your nose for 4 seconds."),
        t("breathing_step3", "Gently hold your breath for 4 seconds."),
        t("breathing_step4", "Slowly exhale through your mouth for 6 seconds."),
      ],
      extra: <BreathingCircle />,
      icon: Wind,
    },
    {
      id: "mindfulness",
      title: t("tip_mindfulness", "Mindfulness"),
      preview: t("tip_mindfulness_desc", "Ground yourself in the present."),
      why: t("mindfulness_why", "Focusing on your immediate surroundings interrupts overthinking loops."),
      steps: [
        t("mindfulness_step1", "Find five details you can see right now."),
        t("mindfulness_step2", "Listen for four distinct sounds around you."),
        t("mindfulness_step3", "Acknowledge three sensations you can physically feel."),
        t("mindfulness_step4", "Notice two scents you can smell."),
      ],
      icon: Eye,
    },
    {
      id: "muscle-relaxation",
      title: t("tip_muscle_relaxation", "Muscle Relaxation"),
      preview: t("tip_muscle_relaxation_desc", "Release hidden physical tension."),
      why: t("muscle_why", "Tensing and then releasing muscles signals deep relaxation to your brain."),
      steps: [
        t("muscle_step1", "Sit down comfortably or lie flat on a soft surface."),
        t("muscle_step2", "Tense your shoulder muscles tightly for 5 seconds."),
        t("muscle_step3", "Gently exhale and let go of all physical tension entirely."),
        t("muscle_step4", "Repeat this process with your hands, calves, and face."),
        t("muscle_step5", "Notice the pleasant contrast of relaxation vs tension."),
      ],
      icon: Dumbbell,
    },
    {
      id: "positive-self-talk",
      title: t("tip_positive_self_talk", "Positive Self-Talk"),
      preview: t("tip_positive_self_talk_desc", "Reframe critical thoughts with kindness."),
      why: t("selftalk_why", "Replacing severe self-judgment with patient compassion lowers panic."),
      steps: [
        t("selftalk_step1", "Notice when your inner critic begins to judge you."),
        t("selftalk_step2", "Pause and ask yourself: would I speak to a close friend this way?"),
        t("selftalk_step3", "Rephrase the critical statement with gentle support."),
        t("selftalk_step4", "Acknowledge that your feelings are natural and will pass."),
      ],
      extra: (
        <div className="bg-emerald-50/50 border border-emerald-100 rounded-[2rem] p-8 shadow-sm">
          <p className="text-sm text-slate-500 font-bold mb-3 uppercase tracking-wider">{t("example", "Self-Talk Reframe")}</p>
          <div className="space-y-2 text-slate-700">
            <p className="text-[15px] leading-relaxed">
              {t("instead_of", "Instead of")}: <span className="italic text-rose-500 font-medium">"{t("selftalk_instead", "I can't handle this right now.")}"</span>
            </p>
            <p className="text-[15px] leading-relaxed">
              {t("try", "Try")}: <span className="font-bold text-emerald-600">"{t("selftalk_try", "This feels tough, but I am doing my best and I can take it one breath at a time.")}"</span>
            </p>
          </div>
        </div>
      ),
      icon: MessageCircleHeart,
    },
  ];

  const currentTip = tips.find(t => t.id === selectedTipId);

  return (
    <PremiumLayout
      title={t("app_title", "Anxiety Relief Tips")}
      icon={<Heart className="w-6 h-6 text-primary animate-pulse" />}
      onBack={selectedTipId ? () => setSelectedTipId(null) : undefined}
    >
      <div className="w-full max-w-lg mx-auto flex flex-col px-3 sm:px-6 py-3 sm:py-4 min-h-[70vh]">
        <AnimatePresence mode="wait">
          {!currentTip ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6 sm:space-y-8"
            >
              <header className="space-y-2 sm:space-y-3">
                <span className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest animate-pulse">
                  <Sparkles size={12} />
                  {t("slow_down", "Slow Down & Breathe")}
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                  {t("app_title", "Anxiety Relief Tips")}
                </h1>
                <p className="text-slate-500 text-xs sm:text-sm font-medium leading-relaxed">
                  {t("app_subtitle", "Gently explore supportive strategies designed to ground you when anxious sensations arise.")}
                </p>
              </header>

              <div className="space-y-3 sm:space-y-4">
                <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">
                  {t("relief_tips", "Relief Tips")}
                </h2>

                <div className="grid gap-3 sm:gap-4">
                  {tips.map((tip, i) => (
                    <motion.button
                      key={tip.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedTipId(tip.id)}
                      className="w-full text-left p-4 sm:p-5 rounded-2xl sm:rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:border-primary/20 transition-all flex items-center gap-3.5 sm:gap-5 group"
                    >
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-all">
                        <tip.icon className="w-6 h-6 text-primary transition-colors" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-slate-800 text-sm sm:text-base group-hover:text-primary transition-colors leading-tight">
                          {tip.title}
                        </h3>
                        <p className="text-slate-400 text-xs font-medium leading-relaxed mt-1 line-clamp-2">
                          {tip.preview}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                    </motion.button>
                  ))}
                </div>
              </div>

              <p className="text-center text-slate-350 text-[10px] font-black uppercase tracking-widest mt-8 px-4 leading-relaxed opacity-70">
                {t("support_footer", "If you feel severe pain or require urgent assistance, please contact clinical services or hotlines.")}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={currentTip.id}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="space-y-6 sm:space-y-8"
            >
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedTipId(null)}
                  className="p-2.5 sm:p-3 bg-white text-slate-600 rounded-xl sm:rounded-2xl border border-slate-100 transition-colors shadow-sm"
                >
                  <ArrowLeft size={16} />
                </motion.button>
                <div className="flex items-center gap-1.5 text-primary font-bold text-[10px] uppercase tracking-wider">
                  <Sparkles size={12} />
                  {t("daily_guide", "Daily Guide")}
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 leading-tight tracking-tight">
                {currentTip.title}
              </h1>

              {/* Why It Helps */}
              <motion.section
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl sm:rounded-[2rem] border border-slate-100 p-5 sm:p-7 shadow-sm"
              >
                <h2 className="text-[10px] font-black text-primary uppercase tracking-widest mb-3">
                  {t("why_it_helps", "Why It Helps")}
                </h2>
                <p className="text-slate-700 text-sm sm:text-base font-medium leading-relaxed">
                  {currentTip.why}
                </p>
              </motion.section>

              {/* What You Can Do */}
              <motion.section
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="space-y-4"
              >
                <h2 className="text-base sm:text-lg font-black text-slate-800 tracking-tight px-1">
                  {t("what_you_can_do", "What You Can Do")}
                </h2>
                <div className="grid gap-2.5 sm:gap-3">
                  {currentTip.steps.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-white rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm transition-all"
                    >
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 size={16} strokeWidth={2.5} />
                      </div>
                      <span className="text-slate-700 text-xs sm:text-sm font-medium leading-relaxed">
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {currentTip.extra && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="pt-2"
                >
                  {currentTip.extra}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
}

export default function AnxietyTipsPage() {
  return (
    <I18nextProvider i18n={i18n}>
      <AnxietyTipsInner />
    </I18nextProvider>
  );
}