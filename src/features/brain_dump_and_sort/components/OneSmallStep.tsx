import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Play, Pause, ArrowRight, Sparkles, Target, Clock, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { ThoughtItem } from "./types";

interface Props {
  thoughts: ThoughtItem[];
  onComplete: () => void;
  onBack: () => void;
}

const rotatingTexts = ["Just this step.", "Stay present.", "One thing at a time.", "Breathe into the focus."];

export const OneSmallStep = ({ thoughts, onComplete, onBack }: Props) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<string | null>(null);
  const [nextStep, setNextStep] = useState("");
  const [focusMode, setFocusMode] = useState(false);
  const [paused, setPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  const [textIndex, setTextIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const selectedItem = thoughts.find((t) => t.id === selected);

  useEffect(() => {
    if (focusMode && !paused && timeLeft > 0) {
      intervalRef.current = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearInterval(intervalRef.current!);
    }
    if (timeLeft === 0) onComplete();
  }, [focusMode, paused, timeLeft, onComplete]);

  useEffect(() => {
    if (!focusMode) return;
    const t = setInterval(() => setTextIndex((i) => (i + 1) % rotatingTexts.length), 4000);
    return () => clearInterval(t);
  }, [focusMode]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = 1 - timeLeft / 180;

  if (focusMode) {
    return (
      <div className="flex flex-col items-center py-6 pb-24">
        <div className="w-full max-w-lg flex flex-col items-center gap-12">
            <header className="text-center">
                <h1 className="text-3xl font-extrabold text-slate-900 mb-2 leading-tight">
                    Focused Work
                </h1>
                <p className="text-slate-500 text-sm font-medium">
                    {nextStep || selectedItem?.text}
                </p>
            </header>

            {/* Premium Timer Ring */}
            <div className="relative w-64 h-64 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle 
                        cx="50" cy="50" r="45" 
                        fill="none" 
                        stroke="#F1F5F9" 
                        strokeWidth="4" 
                    />
                    <motion.circle 
                        cx="50" cy="50" r="45" 
                        fill="none" 
                        stroke="#61DAFB" 
                        strokeWidth="4" 
                        strokeLinecap="round"
                        strokeDasharray="282.7"
                        animate={{ strokeDashoffset: 282.7 * (1 - progress) }}
                        transition={{ duration: 1, ease: "linear" }}
                        className="shadow-[0_0_12px_rgba(97,218,251,0.5)]"
                    />
                </svg>
                
                {/* Central Pulse */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <motion.div 
                        animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.1, 0.2, 0.1]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="w-48 h-48 rounded-full bg-primary"
                    />
                </div>

                <div className="relative flex flex-col items-center">
                    <span className="text-5xl font-black text-slate-800 tabular-nums leading-none">
                        {minutes}:{seconds.toString().padStart(2, "0")}
                    </span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Time Left</span>
                </div>
            </div>

            {/* Rotating Messages */}
            <div className="h-8 overflow-hidden text-center">
                <AnimatePresence mode="wait">
                    <motion.p 
                        key={textIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-slate-500 font-bold italic"
                    >
                        {rotatingTexts[textIndex]}
                    </motion.p>
                </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-lg px-6 z-20">
                <div className="flex gap-4">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setPaused((p) => !p)}
                        className="flex-1 py-5 rounded-[2rem] bg-white border-2 border-slate-100 text-slate-600 font-bold shadow-sm flex items-center justify-center gap-3"
                    >
                        {paused ? <Play size={20} className="fill-current" /> : <Pause size={20} className="fill-current" />}
                        {paused ? "Resume" : "Pause"}
                    </motion.button>
                    
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onComplete}
                        className="flex-1 py-5 rounded-[2rem] bg-primary text-primary-foreground font-bold shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
                    >
                        I'm Done
                        <Check size={20} />
                    </motion.button>
                </div>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-6 pb-24">
      <div className="w-full max-w-lg space-y-8">
        <header className="flex items-center gap-4">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onBack} 
            className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:text-slate-600 transition-colors"
          >
            <ArrowLeft size={20} />
          </motion.button>
          <div className="text-left">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-1">{t("small_step_title")}</h1>
            <p className="text-slate-500 text-sm leading-tight">{t("small_step_desc")}</p>
          </div>
        </header>

        {thoughts.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-bold mb-6">No action items found.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-2xl shadow-lg shadow-primary/20"
            >
              Go Back & Sort
            </motion.button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest px-2">
                <Target size={14} className="text-primary" />
                Pick ONE thing to focus on
            </div>
            
            <div className="grid gap-3">
              {thoughts.map((t, i) => {
                const isSelected = selected === t.id;
                return (
                  <motion.button
                    key={t.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelected(t.id)}
                    className={`w-full text-left p-6 rounded-[2rem] border-2 transition-all duration-300 flex items-center justify-between ${
                        isSelected 
                        ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20" 
                        : "bg-white border-slate-100 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span className="text-base font-bold">{t.text}</span>
                    <AnimatePresence>
                        {isSelected && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"
                            >
                                <Check size={16} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </div>

            <AnimatePresence>
              {selectedItem && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3 pt-4 border-t border-slate-50"
                >
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest px-2">
                        <Sparkles size={14} className="text-primary" />
                        {t("first_step_placeholder")}
                    </div>
                    <input
                        type="text"
                        value={nextStep}
                        onChange={(e) => setNextStep(e.target.value)}
                        placeholder="e.g., Open the document, tidy one corner..."
                        className="w-full py-5 px-6 rounded-[2rem] bg-white border-2 border-slate-100 text-slate-700 placeholder:text-slate-300 font-medium focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all shadow-sm"
                    />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Buttons */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-lg px-6 z-20">
          <div className="flex flex-col gap-3">
            {selectedItem ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setFocusMode(true)}
                className="w-full py-5 rounded-[2rem] bg-primary text-primary-foreground font-bold text-lg shadow-xl shadow-primary/20 hover:shadow-2xl transition-all flex items-center justify-center gap-3"
              >
                <Clock size={20} />
                Start 3-Minute Focus
              </motion.button>
            ) : (
                thoughts.length === 0 && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onComplete}
                    className="w-full py-5 rounded-[2rem] bg-primary text-primary-foreground font-bold text-lg shadow-xl shadow-primary/20 hover:shadow-2xl transition-all flex items-center justify-center gap-3"
                  >
                    {t("continue")}
                    <ArrowRight size={20} />
                  </motion.button>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
