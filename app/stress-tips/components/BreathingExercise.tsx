"use client";
import { useState, useEffect, useCallback } from "react";

const BreathingExercise = () => {
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [paused, setPaused] = useState(false);

  const durations = { inhale: 4000, hold: 4000, exhale: 4000 };

  const nextPhase = useCallback(() => {
    setPhase((p) => {
      if (p === "inhale") return "hold";
      if (p === "hold") return "exhale";
      return "inhale";
    });
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(nextPhase, durations[phase]);
    return () => clearTimeout(timer);
  }, [phase, paused, nextPhase]);

  const scale = phase === "inhale" ? "scale-[1.3]" : phase === "exhale" ? "scale-[0.7]" : "scale-[1.3]";
  const label = phase === "inhale" ? "Inhale…" : phase === "hold" ? "Hold…" : "Exhale…";

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <div className="relative flex items-center justify-center w-48 h-48">
        <div
          className={`w-32 h-32 rounded-full bg-gradient-to-br from-pastel-pink to-pastel-purple transition-transform ease-in-out flex items-center justify-center ${
            paused ? "" : scale
          }`}
          style={{ transitionDuration: paused ? "0ms" : `${durations[phase]}ms` }}
        >
          <span className="text-5xl">💗</span>
        </div>
        {/* Soft ring */}
        <div
          className={`absolute inset-0 rounded-full border-2 border-pastel-pink opacity-30 transition-transform ease-in-out ${
            paused ? "" : scale
          }`}
          style={{ transitionDuration: paused ? "0ms" : `${durations[phase]}ms` }}
        />
      </div>

      <p className="text-lg font-semibold text-foreground">{label}</p>

      <button
        onClick={() => setPaused((p) => !p)}
        className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm shadow-soft transition-all duration-200 active:scale-95"
      >
        {paused ? "Resume" : "Pause"}
      </button>
    </div>
  );
};

export default BreathingExercise;
