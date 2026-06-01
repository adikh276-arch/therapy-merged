'use client';

import { useState, useEffect } from "react";
import { useTranslation, I18nextProvider } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, RotateCcw, HelpCircle, Check, X as XIcon, Sparkles } from "lucide-react";
import i18n, { loadLocale } from "./i18n";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { PremiumComplete } from "@/components/shared/PremiumComplete";

// Falling confetti particles helper
const ConfettiPiece = ({ delay, x }: { delay: number; x: number }) => {
  const colors = ["#6366F1", "#10B981", "#EF4444", "#F59E0B", "#3B82F6"];
  const color = colors[Math.floor(Math.random() * colors.length)];
  return (
    <div
      className="fixed w-2.5 h-2.5 rounded-sm pointer-events-none z-50 animate-[confetti-fall_2s_linear_infinite]"
      style={{
        left: `${x}%`,
        top: -10,
        backgroundColor: color,
        animationDelay: `${delay}s`,
        transform: `rotate(${Math.random() * 360}deg)`,
      }}
    />
  );
};

const Confetti = () => (
  <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
    {Array.from({ length: 30 }).map((_, i) => (
      <ConfettiPiece key={i} delay={Math.random() * 0.5} x={Math.random() * 100} />
    ))}
  </div>
);

interface Question {
  statement: string;
  answer: "myth" | "fact";
  realFact: string;
  example?: string;
}

function AngerQuizInner() {
  const { t } = useTranslation(undefined, { i18n });
  
  type Screen = "welcome" | "game" | "final";
  const [screen, setScreen] = useState<Screen>("welcome");
  const [step, setStep] = useState(0);
  const [answered, setAnswered] = useState<null | "myth" | "fact">(null);
  const [score, setScore] = useState(0);
  const [showReveal, setShowReveal] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [showCorrectConfetti, setShowCorrectConfetti] = useState(false);

  // Sync lang param
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const lang = params.get('lang') || 'en';
      loadLocale(lang);
    }
  }, []);

  const getQuestions = (): Question[] => {
    const raw = t("questions", { returnObjects: true });
    if (Array.isArray(raw)) return raw as Question[];
    return [
      {
        statement: "Anger is bad. If you feel angry, something is wrong with you.",
        answer: "myth",
        realFact: "Anger is a normal, healthy emotion. Everyone feels it. It's not a sign that something is 'wrong' with you — it's a signal that something matters to you. What counts is how you respond to it, not whether you feel it.",
        example: "A veteran feels angry when their boundaries are crossed. That anger is valid — it's telling them something important.",
      },
      {
        statement: "Anger can be a signal that your boundaries have been crossed.",
        answer: "fact",
        realFact: "Anger is information. When you feel it, it's worth asking: what boundary was crossed? What need isn't being met? Listening to your anger — without acting on impulse — helps you understand yourself better and take meaningful action.",
        example: "You feel angry when a coworker takes credit for your work. That anger is pointing to a need for recognition and fairness.",
      },
      {
        statement: "If you're angry, you have to let it out by yelling or hitting things.",
        answer: "myth",
        realFact: "Healthy anger expression doesn't mean suppression OR explosion. It means acknowledging your feelings and expressing them constructively — through words, journaling, physical activity, or creative outlets. You can honor your anger without destruction.",
        example: "Instead of punching a wall, you go for a run or write down exactly what's bothering you. The anger moves through you without causing harm.",
      },
      {
        statement: "Learning to manage anger is a sign of emotional strength.",
        answer: "fact",
        realFact: "People who work on their anger management aren't weak — they're doing some of the bravest emotional work there is. Choosing to pause, reflect, and respond thoughtfully takes far more strength than reacting on impulse.",
        example: "Taking a deep breath and saying 'I need a minute before I respond' in a heated moment is a powerful act of self-control.",
      },
      {
        statement: "If someone makes you angry, it's their fault. You have no responsibility.",
        answer: "myth",
        realFact: "Other people can trigger your anger, but how you respond is your responsibility — and your power. Taking ownership of your reactions doesn't mean the other person was right. It means you're choosing how to show up. That's empowerment, not blame.",
        example: "Someone cuts you off in traffic. You feel angry — that's normal. But you choose whether to rage or take a breath. The choice is yours.",
      }
    ];
  };

  const quizQuestions = getQuestions();
  const TOTAL = quizQuestions.length;
  const current = quizQuestions[step];
  const isCorrect = answered === current?.answer;

  const handleAnswer = (choice: "myth" | "fact") => {
    if (!current) return;
    setAnswered(choice);
    const correct = choice === current.answer;
    if (correct) setScore((s) => s + 1);

    setTimeout(() => {
      setShowReveal(true);
      if (correct) setShowCorrectConfetti(true);
    }, 400);
    setTimeout(() => setShowExplanation(true), 800);
    setTimeout(() => setShowNext(true), 1500);
    if (correct) setTimeout(() => setShowCorrectConfetti(false), 3000);
  };

  const handleNext = () => {
    if (step + 1 >= TOTAL) {
      setScreen("final");
    } else {
      setStep((s) => s + 1);
      resetQuestion();
    }
  };

  const resetQuestion = () => {
    setAnswered(null);
    setShowReveal(false);
    setShowExplanation(false);
    setShowNext(false);
    setShowCorrectConfetti(false);
  };

  const handleRetry = () => {
    setScreen("welcome");
    setStep(0);
    setScore(0);
    resetQuestion();
  };

  return (
    <PremiumLayout
      title={t("app_title", "Anger: Facts & Myths")}
      subtitle={screen === "game" ? t("question_nav", { current: step + 1, total: TOTAL }) : t("knowledge_quiz", "Knowledge Quiz")}
      icon={<HelpCircle className="w-6 h-6 text-primary animate-pulse" />}
      onBack={screen !== "welcome" ? handleRetry : undefined}
    >
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-4 min-h-[70vh]">
        {showCorrectConfetti && <Confetti />}
        
        <AnimatePresence mode="wait">
          {screen === "welcome" && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex-1 flex flex-col items-center text-center gap-8 py-10"
            >
              <div className="w-32 h-32 rounded-[3rem] bg-primary/10 flex items-center justify-center text-6xl shadow-2xl animate-pulse">
                ❓
              </div>
              <div className="space-y-4">
                <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white leading-tight">
                  {t("welcome_title", "Anger: Facts & Myths")}
                </h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-xs mx-auto text-base">
                  {t("welcome_subtitle", "Anger is often misunderstood. Test your awareness of how anger functions in our lives.")}
                </p>
              </div>
              <button
                onClick={() => setScreen("game")}
                className="w-full py-5 rounded-2xl bg-slate-900 text-white shadow-md dark:bg-slate-100 dark:text-slate-900 font-black text-lg shadow-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3"
              >
                {t("start_quiz", "Start Quiz")}
                <ChevronRight size={20} strokeWidth={3} />
              </button>
              <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
                {t("questions_count", { count: TOTAL })}
              </p>
            </motion.div>
          )}

          {screen === "game" && current && (
            <motion.div
              key="game"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex-1 flex flex-col gap-6"
            >
              <div className="w-full bg-slate-100 dark:bg-slate-850 h-1.5 rounded-full overflow-hidden">
                <motion.div
                  className="bg-primary h-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((step + 1) / TOTAL) * 100}%` }}
                />
              </div>

              <div className="relative overflow-hidden rounded-[3rem] bg-white dark:bg-slate-900 border border-white/60 dark:border-slate-800 p-8 shadow-2xl flex-1 flex flex-col justify-center min-h-[180px]">
                <h2 className="text-xl font-black text-slate-800 dark:text-slate-200 leading-snug text-center italic">
                  "{current.statement}"
                </h2>
              </div>

              <div className="space-y-6">
                {!answered ? (
                  <div className="grid grid-cols-2 gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer("myth")}
                      className="py-8 rounded-3xl bg-white border border-rose-50 text-rose-500 font-black text-xl shadow-xl hover:bg-rose-50/50 dark:bg-slate-900 dark:border-rose-950/20 dark:text-rose-400 transition-all"
                    >
                      {t("myth_button", "Myth")}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer("fact")}
                      className="py-8 rounded-3xl bg-white border border-emerald-50 text-emerald-500 font-black text-xl shadow-xl hover:bg-emerald-50/50 dark:bg-slate-900 dark:border-emerald-950/20 dark:text-emerald-400 transition-all"
                    >
                      {t("fact_button", "Fact")}
                    </motion.button>
                  </div>
                ) : (
                  <div className="space-y-6 animate-fade-in">
                    <div className="flex flex-col items-center gap-2">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isCorrect ? "bg-emerald-500" : "bg-rose-500"} text-white shadow-lg`}
                      >
                        {isCorrect ? <Check size={24} strokeWidth={4} /> : <XIcon size={24} strokeWidth={4} />}
                      </motion.div>
                      <p className={`text-xl font-black ${isCorrect ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-455"}`}>
                        {isCorrect ? t("correct", "Correct!") : t("incorrect", "Incorrect")}
                      </p>
                    </div>

                    <AnimatePresence>
                      {showReveal && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white dark:bg-slate-900 border border-white/60 dark:border-slate-800 rounded-[2.5rem] p-8 space-y-4 shadow-2xl"
                        >
                          <div className="flex items-center gap-2">
                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] ${current.answer === "myth" ? "bg-rose-100 text-rose-600" : "bg-emerald-100 text-emerald-600"}`}>
                              {current.answer === "myth" ? t("its_a_myth", "It's a Myth") : t("its_a_fact", "It's a Fact")}
                            </span>
                          </div>
                          <p className="text-slate-700 dark:text-slate-300 font-bold text-base leading-relaxed">
                            {current.realFact}
                          </p>
                          {current.example && (
                            <div className="pt-4 border-t border-slate-50 dark:border-slate-850">
                              <p className="text-slate-400 dark:text-slate-500 text-xs font-bold italic">
                                {t("example_label", "Example: ")}{current.example}
                              </p>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {showNext && (
                      <button
                        onClick={handleNext}
                        className="w-full py-5 rounded-2xl bg-slate-900 text-white shadow-md dark:bg-slate-100 dark:text-slate-900 font-black text-lg shadow-2xl hover:opacity-95 transition-all flex items-center justify-center gap-3"
                      >
                        {step + 1 === TOTAL ? t("see_results", "See Quiz Results") : t("next_question", "Next Question")}
                        <ChevronRight size={20} strokeWidth={3} />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {screen === "final" && (
            <motion.div
              key="final"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col items-center text-center gap-8 py-6"
            >
              <div className="w-full bg-white dark:bg-slate-900 border border-white/60 dark:border-slate-850 rounded-[3.5rem] p-10 shadow-2xl">
                <div className="w-24 h-24 bg-primary/10 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 text-5xl">
                  🏆
                </div>
                <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-2">{t("results_title", "Anger Quiz Complete!")}</h2>
                <div className="text-7xl font-black text-slate-900 dark:text-white my-8 tabular-nums">{score}<span className="text-slate-300 dark:text-slate-700 text-4xl">/{TOTAL}</span></div>
                <p className="text-slate-500 dark:text-slate-400 font-black text-sm leading-relaxed uppercase tracking-widest px-4">
                  {score === TOTAL ? t("expert_level", "Perfect Awareness!") : 
                   score >= 3 ? t("great_progress", "Excellent Understanding") : 
                   t("learning_journey", "Great Learning Journey")}
                </p>
              </div>

              <div className="w-full space-y-4">
                <button
                  onClick={handleRetry}
                  className="w-full py-5 rounded-2xl bg-slate-900 text-white shadow-md dark:bg-slate-100 dark:text-slate-900 font-black text-lg shadow-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3"
                >
                  <RotateCcw size={20} strokeWidth={3} />
                  {t("try_again", "Try Again")}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
}

export default function AngerQuizPage() {
  return (
    <I18nextProvider i18n={i18n}>
      <AngerQuizInner />
    </I18nextProvider>
  );
}
