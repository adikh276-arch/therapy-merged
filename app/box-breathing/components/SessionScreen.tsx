"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { Pause, Play, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";

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
        // Move to next phase
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

  // Determine circle animation
  const isInhale = phaseIndex === 0;
  const isExhale = phaseIndex === 2;

  const circleScale = isInhale
    ? 1
    : isExhale
      ? 0.6
      : phaseIndex === 1
        ? 1
        : 0.6;

  return (
    <div className="min-h-screen gradient-session flex flex-col items-center justify-center relative">
      {/* Language Selector */}
      <div className="absolute top-6 right-6 z-10">
        <LanguageSelector />
      </div>

      {/* Cycle indicator */}
      <div className="absolute top-8 left-0 right-0 flex justify-center gap-2">
        {Array.from({ length: TOTAL_CYCLES }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${i < cycle
              ? "bg-primary"
              : "bg-primary/20"
              }`}
          />
        ))}
      </div>

      {/* Breathing circle */}
      <div className="flex flex-col items-center">
        <div
          className="w-56 h-56 rounded-full bg-primary/15 flex items-center justify-center transition-transform ease-in-out"
          style={{
            transform: `scale(${circleScale})`,
            transitionDuration: `${phase.duration}s`,
          }}
        >
          <div className="w-40 h-40 rounded-full bg-primary/25 flex items-center justify-center">
            <div className="w-28 h-28 rounded-full bg-primary/40 flex flex-col items-center justify-center">
              <span className="text-primary-foreground font-semibold text-lg drop-shadow-sm">
                {t(phase.label)}
              </span>
            </div>
          </div>
        </div>

        {/* Countdown */}
        <span className="mt-8 text-5xl font-light text-foreground/70 tabular-nums">
          {countdown}
        </span>
      </div>

      {/* Controls */}
      <div className="absolute bottom-12 flex items-center gap-6">
        <button
          onClick={() => setPaused((p) => !p)}
          className="w-14 h-14 rounded-full bg-card shadow-soft flex items-center justify-center active:scale-95 transition-transform"
        >
          {paused ? (
            <Play className="w-6 h-6 text-foreground" />
          ) : (
            <Pause className="w-6 h-6 text-foreground" />
          )}
        </button>
        <button
          onClick={onEnd}
          className="w-14 h-14 rounded-full bg-card shadow-soft flex items-center justify-center active:scale-95 transition-transform"
        >
          <X className="w-6 h-6 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
};

export default SessionScreen;
