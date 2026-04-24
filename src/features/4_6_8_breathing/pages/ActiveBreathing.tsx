import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { RotateCcw } from "lucide-react";
import { useTranslation } from "react-i18next";

type Phase = "inhale" | "hold" | "exhale";
type Status = "idle" | "running" | "paused";

const PHASE_DURATIONS: Record<Phase, number> = {
  inhale: 4,
  hold: 6,
  exhale: 8,
};

const PHASE_ORDER: Phase[] = ["inhale", "hold", "exhale"];

const ActiveBreathing = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [status, setStatus] = useState<Status>("idle");
  const [totalRounds, setTotalRounds] = useState(4);
  const [currentRound, setCurrentRound] = useState(1);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [countdown, setCountdown] = useState(PHASE_DURATIONS.inhale);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const phase = PHASE_ORDER[phaseIndex];

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    clearTimer();
    setStatus("idle");
    setCurrentRound(1);
    setPhaseIndex(0);
    setCountdown(PHASE_DURATIONS.inhale);
  }, [clearTimer]);

  useEffect(() => {
    if (status !== "running") return;

    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // Move to next phase
          setPhaseIndex((pi) => {
            const nextPi = pi + 1;
            if (nextPi >= PHASE_ORDER.length) {
              // End of round
              setCurrentRound((r) => {
                if (r >= totalRounds) {
                  clearTimer();
                  setStatus("idle");
                  navigate("./complete");
                  return r;
                }
                return r + 1;
              });
              setCountdown(PHASE_DURATIONS[PHASE_ORDER[0]]);
              return 0;
            }
            setCountdown(PHASE_DURATIONS[PHASE_ORDER[nextPi]]);
            return nextPi;
          });
          return 0; // will be overwritten by setCountdown above
        }
        return prev - 1;
      });
    }, 1000);

    return clearTimer;
  }, [status, totalRounds, clearTimer, navigate]);

  const handleStart = () => {
    if (status === "paused") {
      setStatus("running");
    } else {
      reset();
      setStatus("running");
      setCountdown(PHASE_DURATIONS.inhale);
    }
  };

  const handlePause = () => {
    if (status === "running") {
      clearTimer();
      setStatus("paused");
    }
  };

  // Circle scale based on phase
  const getCircleScale = (): number => {
    if (status === "idle") return 0.6;
    if (phase === "inhale") return 1;
    if (phase === "hold") return 1;
    if (phase === "exhale") return 0.6;
    return 0.6;
  };

  // Build countdown text
  const getCountdownText = () => {
    if (status === "idle") return t('ready');
    const phaseDuration = PHASE_DURATIONS[phase];
    const elapsed = phaseDuration - countdown + 1;
    const nums = Array.from({ length: Math.min(elapsed, phaseDuration) }, (_, i) => i + 1).join("…");
    return `${t(phase)}… ${nums}`;
  };

  // Dynamic transition duration based on phase (in ms)
  const getTransitionMs = (): number => {
    if (status !== "running") return 500;
    if (phase === "inhale") return 4000;
    if (phase === "hold") return 300;
    if (phase === "exhale") return 8000;
    return 500;
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 animate-fade-in">
      <div className="w-full flex flex-col items-center gap-8 px-2">
        {/* Breathing Circle */}
        <div className="relative flex items-center justify-center" style={{ width: 280, height: 280 }}>
          {/* Outer glow/ring */}
          <motion.div
            animate={{
              scale: getCircleScale() * 1.1,
              opacity: status === "running" ? [0.2, 0.4, 0.2] : 0.2
            }}
            transition={{
              scale: { duration: getTransitionMs() / 1000, ease: "easeInOut" },
              opacity: { duration: 2, repeat: Infinity }
            }}
            className="absolute inset-0 rounded-full bg-primary/20 blur-2xl"
          />
          
          <motion.div
            animate={{ scale: getCircleScale() }}
            transition={{ duration: getTransitionMs() / 1000, ease: "easeInOut" }}
            className="w-full h-full rounded-full bg-primary flex items-center justify-center shadow-2xl shadow-primary/40 relative z-10"
          >
            <motion.p
              key={`${phase}-${countdown}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-primary-foreground font-bold text-2xl text-center px-6"
            >
              {getCountdownText()}
            </motion.p>
          </motion.div>
        </div>

        {/* Info text */}
        <div className="text-center space-y-2">
          <p className="text-slate-500 font-medium text-sm">
            {t('rounds_to_feel_shift', { count: totalRounds })}
          </p>
          <p className="text-slate-900 font-bold text-xl">
            {t('round_x_of_y', { current: currentRound, total: totalRounds })}
          </p>
        </div>

        {/* Round Selector */}
        <div className="bg-slate-100 p-1.5 rounded-2xl flex gap-1">
          {[4, 6, 8].map((r) => (
            <button
              key={r}
              onClick={() => {
                if (status === "idle") {
                  setTotalRounds(r);
                  reset();
                }
              }}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${totalRounds === r
                  ? "bg-white text-primary shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
                }`}
            >
              {t('rounds_selector', { count: r })}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 mt-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStart}
            className="px-10 py-4 bg-primary text-primary-foreground font-bold rounded-2xl shadow-lg shadow-primary/20 hover:shadow-xl transition-all"
          >
            {status === "paused" ? t('resume') : t('start')}
          </motion.button>
          
          {status === "running" && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePause}
              className="px-10 py-4 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 transition-all"
            >
              {t('pause')}
            </motion.button>
          )}

          <motion.button
            whileHover={{ rotate: -90 }}
            whileTap={{ scale: 0.9 }}
            onClick={reset}
            className="p-4 bg-slate-100 text-slate-600 rounded-2xl hover:bg-slate-200 transition-all"
            aria-label={t('reset')}
          >
            <RotateCcw size={24} />
          </motion.button>
        </div>
      </div>
    </div>
  );
};


export default ActiveBreathing;
