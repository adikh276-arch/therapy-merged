"use client";
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
                  navigate("/complete");
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
    if (status === "idle") return t("breathing_4_6_8.ready");
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
    <div className="min-h-screen gradient-bg-screen flex flex-col items-center justify-center px-6 py-8 animate-fade-in">
      <div className="max-w-sm w-full flex flex-col items-center gap-5 px-2">
        {/* Breathing Circle */}
        <div className="relative flex items-center justify-center" style={{ width: 220, height: 220 }}>
          <div
            className="w-full h-full rounded-full gradient-circle glow-circle flex items-center justify-center ease-in-out"
            style={{
              transform: `scale(${getCircleScale()})`,
              transition: `transform ${getTransitionMs()}ms ease-in-out`,
            }}
          >
            <p
              key={`${phase}-${countdown}`}
              className="text-primary-foreground font-semibold text-xl text-center px-4 animate-fade-in"
            >
              {getCountdownText()}
            </p>
          </div>
        </div>

        {/* Info text */}
        <p className="text-foreground/80 font-subtitle text-sm text-center">
          {t("breathing_4_6_8.rounds_to_feel_shift", { count: totalRounds })}
        </p>

        <p className="text-foreground font-semibold text-lg">
          {t("breathing_4_6_8.round_x_of_y", { current: currentRound, total: totalRounds })}
        </p>

        {/* Round Selector */}
        <div className="flex gap-3">
          {[4, 6, 8].map((r) => (
            <button
              key={r}
              onClick={() => {
                if (status === "idle") {
                  setTotalRounds(r);
                  reset();
                }
              }}
              className={`px-5 py-2 rounded-full font-semibold text-sm transition-colors duration-200 ${totalRounds === r
                  ? "bg-primary text-primary-foreground glow-soft"
                  : "bg-card text-foreground hover:opacity-80"
                }`}
            >
              {t("breathing_4_6_8.rounds_selector", { count: r })}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 mt-4">
          <button
            onClick={handleStart}
            className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-full glow-soft hover:opacity-90 transition-opacity"
          >
            {status === "paused" ? t("breathing_4_6_8.resume") : t("breathing_4_6_8.start")}
          </button>
          <button
            onClick={handlePause}
            disabled={status !== "running"}
            className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-full glow-soft hover:opacity-90 transition-opacity disabled:opacity-40"
          >
            {t("breathing_4_6_8.pause")}
          </button>
          <button
            onClick={reset}
            className="p-3 bg-card text-foreground rounded-full hover:opacity-80 transition-opacity"
            aria-label={t("breathing_4_6_8.reset")}
          >
            <RotateCcw size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActiveBreathing;
