"use client";
import { useState, useEffect, useCallback } from "react";

type Phase = "inhale" | "hold" | "exhale";

const phases: { name: Phase; label: string; duration: number }[] = [
  { name: "inhale", label: "Inhale…", duration: 4000 },
  { name: "hold", label: "Hold…", duration: 4000 },
  { name: "exhale", label: "Exhale…", duration: 6000 },
];

const BreathingCircle = () => {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [running, setRunning] = useState(false);

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
    <div className="flex flex-col items-center gap-4 animate-fade-in" style={{ animationDelay: "240ms", animationFillMode: "both" }}>
      <div className="relative w-40 h-40 flex items-center justify-center">
        <div
          className={`absolute inset-0 rounded-full bg-primary/20 transition-all ${scale} ${opacity}`}
          style={{ transitionDuration: `${current.duration}ms`, transitionTimingFunction: "ease-in-out" }}
        />
        <div
          className={`absolute inset-4 rounded-full bg-primary/30 transition-all ${scale} ${opacity}`}
          style={{ transitionDuration: `${current.duration}ms`, transitionTimingFunction: "ease-in-out" }}
        />
        <span className="relative text-foreground font-bold text-base z-10">
          {running ? current.label : "Start"}
        </span>
      </div>
      <button
        onClick={() => { setRunning(!running); setPhaseIndex(0); }}
        className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm shadow-soft transition-all hover:opacity-90 active:scale-95"
      >
        {running ? "Stop" : "Begin Breathing"}
      </button>
    </div>
  );
};

export default BreathingCircle;
