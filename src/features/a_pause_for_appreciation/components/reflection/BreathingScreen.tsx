import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRight, Wind, Sparkles } from "lucide-react";

interface BreathingScreenProps {
  onContinue: () => void;
}

const INHALE = 4000;
const HOLD = 1000;
const EXHALE = 4000;
const TOTAL_CYCLES = 3;

const BreathingScreen = ({ onContinue }: BreathingScreenProps) => {
  const { t } = useTranslation();
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale" | "done">("inhale");
  const [cycle, setCycle] = useState(0);
  const [counter, setCounter] = useState(4);

  const runCycle = useCallback(() => {
    setPhase("inhale");
    setCounter(4);
    let c = 4;
    const inhaleInterval = setInterval(() => {
      c--;
      if (c > 0) setCounter(c);
      else {
        clearInterval(inhaleInterval);
        setPhase("hold");
        setCounter(0);
        setTimeout(() => {
          setPhase("exhale");
          let e = 4;
          setCounter(e);
          const exhaleInterval = setInterval(() => {
            e--;
            if (e > 0) setCounter(e);
            else {
              clearInterval(exhaleInterval);
              setCycle((prev) => prev + 1);
            }
          }, 1000);
        }, HOLD);
      }
    }, 1000);
  }, []);

  useEffect(() => {
    if (cycle < TOTAL_CYCLES) {
      runCycle();
    } else {
      setPhase("done");
    }
  }, [cycle, runCycle]);

  const circleScale = phase === "inhale" ? 1.4 : phase === "exhale" ? 1 : phase === "hold" ? 1.4 : 1;
  const breathDuration = phase === "inhale" ? INHALE / 1000 : phase === "exhale" ? EXHALE / 1000 : 0.3;

  return (
    <div className="flex flex-col items-center py-6">
      <div className="w-full max-w-lg space-y-8">
        <header className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-2">{t("breathing.title")}</h2>
          <p className="text-slate-500 text-sm font-medium leading-relaxed">
            {t("breathing.description")}
          </p>
        </header>

        <div className="flex flex-col items-center justify-center py-12 relative h-[300px]">
          <AnimatePresence mode="wait">
            {phase !== "done" ? (
              <motion.div 
                key="breathing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative flex items-center justify-center"
              >
                {/* Background Ring */}
                <div className="absolute w-40 h-40 rounded-full border-2 border-slate-50" />
                
                {/* Breathing Circle */}
                <motion.div
                  className="w-40 h-40 rounded-full bg-primary/10 border-4 border-primary/20 shadow-[0_0_40px_rgba(97,218,251,0.2)]"
                  animate={{ scale: circleScale }}
                  transition={{ duration: breathDuration, ease: "easeInOut" }}
                />
                
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Wind size={24} className="text-primary mb-2 opacity-20" />
                  <p className="text-lg font-black text-slate-800 uppercase tracking-widest leading-none">
                    {phase === "inhale" && t("breathing.inhale", { counter }).split(' ')[0]}
                    {phase === "hold" && t("breathing.hold")}
                    {phase === "exhale" && t("breathing.exhale", { counter }).split(' ')[0]}
                  </p>
                  <span className="text-sm font-bold text-primary mt-1 tabular-nums">
                    {phase !== "hold" && counter}
                  </span>
                </div>
                
                {phase !== "done" && (
                    <div className="absolute -bottom-12">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            {t("breathing.instruction")}
                        </p>
                    </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="done"
                className="text-center space-y-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center mx-auto text-emerald-500 shadow-sm border border-emerald-100">
                    <Sparkles size={32} />
                </div>
                <p className="text-xl font-bold text-slate-800 leading-relaxed italic max-w-xs mx-auto">
                  "{t("breathing.affirmation")}"
                </p>
                
                <motion.button 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onContinue} 
                    className="w-full py-5 rounded-[2rem] bg-primary text-primary-foreground font-bold text-lg shadow-xl shadow-primary/20 hover:shadow-2xl transition-all flex items-center justify-center gap-3"
                >
                    {t("breathing.continue")}
                    <ArrowRight size={20} />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default BreathingScreen;
