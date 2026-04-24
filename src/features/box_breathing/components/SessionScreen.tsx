import { useState, useEffect, useCallback, useRef } from "react";
import { Pause, Play, X, RotateCcw } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onComplete: () => void;
  onEnd: () => void;
}

const PHASES = [
  { label: "breathe_in", duration: 4 },
  { label: "hold", duration: 4 },
  { label: "breathe_out", duration: 4 },
  { label: "hold", duration: 4 },
];

const TOTAL_CYCLES = 4;

const SessionScreen = ({ onComplete, onEnd }: Props) => {
  const { t } = useTranslation();
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [countdown, setCountdown] = useState(PHASES[0].duration);
  const [cycle, setCycle] = useState(1);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const phase = PHASES[phaseIndex];

  const tick = useCallback(() => {
    setCountdown((prev) => {
      if (prev <= 1) {
        setPhaseIndex((pi) => {
          const next = (pi + 1) % PHASES.length;
          if (next === 0) {
            setCycle((c) => {
              if (c >= TOTAL_CYCLES) {
                onComplete();
                return c;
              }
              return c + 1;
            });
          }
          return next;
        });
        return PHASES[(phaseIndex + 1) % PHASES.length].duration;
      }
      return prev - 1;
    });
  }, [phaseIndex, onComplete]);

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(tick, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [tick, paused]);

  const circleScale = phaseIndex === 0 || phaseIndex === 1 ? 1 : 0.6;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] relative">
      {/* Cycle indicator */}
      <div className="absolute top-0 left-0 right-0 flex justify-center gap-3">
        {Array.from({ length: TOTAL_CYCLES }).map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              scale: i + 1 === cycle ? 1.2 : 1,
              backgroundColor: i + 1 <= cycle ? "var(--color-primary)" : "#E2E8F0"
            }}
            className="w-2.5 h-2.5 rounded-full"
          />
        ))}
      </div>

      {/* Breathing circle */}
      <div className="flex flex-col items-center mt-12">
        <div className="relative flex items-center justify-center w-64 h-64">
           {/* Outer Ring */}
          <motion.div
            animate={{
              scale: circleScale * 1.1,
              opacity: paused ? 0.1 : [0.1, 0.3, 0.1]
            }}
            transition={{
              scale: { duration: 4, ease: "easeInOut" },
              opacity: { duration: 2, repeat: Infinity }
            }}
            className="absolute inset-0 rounded-full bg-primary/20 blur-2xl"
          />

          <motion.div
            animate={{ scale: circleScale }}
            transition={{ duration: 4, ease: "easeInOut" }}
            className="w-full h-full rounded-full bg-primary flex items-center justify-center shadow-2xl shadow-primary/30 z-10"
          >
            <div className="text-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={phase.label}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-primary-foreground font-bold text-xl uppercase tracking-widest block"
                >
                  {t(phase.label)}
                </motion.span>
              </AnimatePresence>
              <span className="text-primary-foreground/70 text-4xl font-light tabular-nums mt-2 block">
                {countdown}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-8 mt-16">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setPaused((p) => !p)}
          className="w-16 h-16 rounded-2xl bg-white border-2 border-slate-100 flex items-center justify-center shadow-sm text-slate-700 transition-all"
        >
          {paused ? <Play size={28} fill="currentColor" /> : <Pause size={28} fill="currentColor" />}
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onEnd}
          className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 transition-all"
        >
          <RotateCcw size={28} />
        </motion.button>
      </div>
    </div>
  );
};

export default SessionScreen;
