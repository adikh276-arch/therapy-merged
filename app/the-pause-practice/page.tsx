'use client';

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation, I18nextProvider } from "react-i18next";
import { Timer, Sparkles, Pause, Check } from "lucide-react";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { PremiumComplete } from "@/components/shared/PremiumComplete";
import i18n, { loadLocale } from "./i18n";

const HOLD_DURATION = 5000;

function HoldScreen({ onComplete }: { onComplete: () => void }) {
  const { t } = useTranslation(undefined, { i18n });
  const [progress, setProgress] = useState(0);
  const [holding, setHolding] = useState(false);
  const [completed, setCompleted] = useState(false);
  const startRef = useRef<number>(0);
  const rafRef = useRef<number>(0);

  const microcopy = t("hold.microcopy", { returnObjects: true }) as { at: number; text: string }[];

  function getMicrocopy(p: number) {
    if (!Array.isArray(microcopy)) return "";
    let current = microcopy[0]?.text || "";
    for (const m of microcopy) {
      if (p >= m.at) current = m.text;
    }
    return current;
  }

  const tick = useCallback(() => {
    const elapsed = Date.now() - startRef.current;
    const p = Math.min(elapsed / HOLD_DURATION, 1);
    setProgress(p);
    if (p >= 1) {
      setCompleted(true);
      setTimeout(onComplete, 800);
    } else {
      rafRef.current = requestAnimationFrame(tick);
    }
  }, [onComplete]);

  const startHold = useCallback(() => {
    if (completed) return;
    setHolding(true);
    startRef.current = Date.now() - progress * HOLD_DURATION;
    rafRef.current = requestAnimationFrame(tick);
  }, [tick, completed, progress]);

  const endHold = useCallback(() => {
    if (completed) return;
    setHolding(false);
    cancelAnimationFrame(rafRef.current);
    setProgress(0);
  }, [completed]);

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center min-h-[50vh] px-8"
    >
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-semibold text-slate-800 mb-2"
      >
        {t("hold.title")}
      </motion.h1>
      
      <AnimatePresence mode="wait">
        <motion.p
          key={getMicrocopy(progress)}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.3 }}
          className="text-muted-foreground mb-12 text-center h-6"
        >
          {getMicrocopy(progress)}
        </motion.p>
      </AnimatePresence>

      <div className="relative flex items-center justify-center mb-12">
        <div
          className={`absolute w-48 h-48 rounded-full bg-primary/10 ${holding ? "" : "animate-pulse"}`}
          style={holding ? { transform: `scale(${1 + progress * 0.15})`, opacity: 0.3 + progress * 0.3, transition: "all 0.3s ease" } : {}}
        />

        <svg width="180" height="180" className="absolute -rotate-90">
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke="rgba(0,0,0,0.05)"
            strokeWidth="6"
          />
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: holding ? "none" : "stroke-dashoffset 0.6s ease-out" }}
          />
        </svg>

        <button
          onMouseDown={startHold}
          onMouseUp={endHold}
          onMouseLeave={endHold}
          onTouchStart={startHold}
          onTouchEnd={endHold}
          className={`relative z-10 w-28 h-28 rounded-full flex items-center justify-center transition-all duration-300 select-none touch-none ${
            completed
              ? "bg-primary scale-110"
              : holding
              ? "bg-primary scale-105 shadow-lg"
              : "bg-primary/85 hover:bg-primary"
          }`}
        >
          {completed ? (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-primary-foreground text-3xl"
            ><Check className="inline-block w-8 h-8" /></motion.span>
          ) : (
            <span className="text-primary-foreground text-4xl">
              {holding ? "" : ""}
            </span>
          )}
        </button>
      </div>

      {!holding && progress === 0 && !completed && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          className="text-sm text-muted-foreground"
        >
          {t("hold.instructions")}
        </motion.p>
      )}
    </motion.div>
  );
}

function ScenarioScreen({ onNext }: { onNext: (scenario: string) => void }) {
  const { t } = useTranslation(undefined, { i18n });
  const [selected, setSelected] = useState<string | null>(null);
  const [customText, setCustomText] = useState("");

  const scenarios = t("scenario.options", { returnObjects: true }) as any[];

  const handleSelect = (id: string) => {
    setSelected(id);
    if (id !== "other") setCustomText("");
  };

  const isValid = selected && (selected !== "other" || customText.trim().length > 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center min-h-[50vh] px-6 pt-8 pb-8"
    >
      <h1 className="text-2xl font-bold text-slate-800 mb-2 text-center">
        {t("scenario.title")}
      </h1>
      <p className="text-muted-foreground text-center mb-8">
        {t("scenario.desc")}
      </p>

      <div className="w-full max-w-sm space-y-3 mb-10">
        {Array.isArray(scenarios) && scenarios.map((s) => (
          <button
            key={s.id}
            onClick={() => handleSelect(s.id)}
            className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-left border transition-all duration-300 ${
              selected === s.id
                ? "bg-primary/10 border-primary shadow-sm text-primary-dark"
                : "bg-white border-white/60 hover:border-slate-200"
            }`}
          >
            <span className="text-xl">{s.icon}</span>
            <span className="font-semibold text-base">
              {s.label}
            </span>
          </button>
        ))}

        <div
          onClick={() => handleSelect("other")}
          className={`w-full rounded-2xl border transition-all duration-300 cursor-pointer ${
            selected === "other"
              ? "bg-primary/10 border-primary shadow-sm"
              : "bg-white border-white/60 hover:border-slate-200"
          }`}
        >
          <input
            type="text"
            placeholder={t("scenario.placeholder")}
            value={customText}
            onFocus={() => handleSelect("other")}
            onChange={(e) => {
              setCustomText(e.target.value);
              setSelected("other");
            }}
            className="w-full bg-transparent px-5 py-4 text-base font-semibold outline-none"
          />
        </div>
      </div>

      <div className="w-full max-w-xs">
        <button
          disabled={!isValid}
          onClick={() => selected && onNext(selected === "other" ? customText : selected)}
          className="act-btn-primary"
        >
          {t("scenario.button")}
        </button>
      </div>
    </motion.div>
  );
}

function ResultScreen({ scenario, onTryAgain, onDone }: { scenario: string; onTryAgain: () => void; onDone: () => void }) {
  const { t } = useTranslation(undefined, { i18n });
  const tScenarios = t("result.scenario_messages", { returnObjects: true });
  const scenarioMessages = (typeof tScenarios === 'object' && tScenarios !== null && !Array.isArray(tScenarios) ? tScenarios as any : {}) as Record<string, string>;
  const message = scenarioMessages[scenario] || scenarioMessages.other || "Take a step back and breathe before you proceed.";

  return (
    <div className="w-full">
      <PremiumComplete
        title={t("app_title")}
        message={t("result.message")}
        onRestart={onTryAgain}
        icon={<Sparkles size={48} />}
                  shareEmoji=""
                  shareContent={"I just completed 'The Pause Practice' on TherapyMantra — a guided mindfulness practice that genuinely helped me. Try it! \n\n Android: https://play.google.com/store/apps/details?id=org.mantracare.therapy\n iOS: https://apps.apple.com/pk/app/therapymantra/id1607643888"}
      >
        <div className="space-y-6 my-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-8 bg-gradient-to-r from-primary to-sky-400 border-none rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 text-white/5 pointer-events-none group-hover:scale-110 transition-transform">
                <Sparkles size={120} strokeWidth={1} />
            </div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4 relative z-10">{t("result.tip_label")}</p>
            <p className="text-xl font-bold italic leading-tight relative z-10">
              "{message}"
            </p>
          </motion.div>
          
          <p className="text-slate-400 text-xs font-bold italic text-center">
            {t("result.italic")}
          </p>
        </div>
      </PremiumComplete>
    </div>
  );
}

function PauseInner() {
  const { t } = useTranslation(undefined, { i18n });
  const [screen, setScreen] = useState<"intro" | "scenario" | "hold" | "result">("intro");
  const [scenario, setScenario] = useState("other");

  // Sync lang param
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const lang = params.get('lang') || 'en';
      loadLocale(lang);
    }
  }, []);

  const handleScenarioSelect = (s: string) => {
    setScenario(s);
    setScreen("hold");
  };

  const handleTryAgain = () => {
    setScreen("scenario");
  };

  const handleDone = () => {
    setScreen("intro");
    setScenario("other");
  };

  return (
    <PremiumLayout
      title={t("app_title")}
      subtitle={t("app_subtitle")}
      icon={<Timer className="w-6 h-6 text-primary" />}
      onBack={screen !== "intro" ? () => setScreen("intro") : undefined}
    >
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-4">
        <AnimatePresence mode="wait">
          {screen === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center min-h-[50vh] px-8 text-center py-8"
            >
              <div className="text-6xl mb-8"><Pause className="inline-block w-8 h-8" /></div>
              <h1 className="text-3xl font-extrabold text-slate-800 mb-4">{t("intro.title")}</h1>
              <p className="text-lg text-slate-500 leading-relaxed mb-3 max-w-xs">{t("intro.description")}</p>
              <p className="text-sm text-slate-400 mb-10">{t("intro.duration")}</p>
              <div className="w-full max-w-xs">
                <button
                  onClick={() => setScreen("scenario")}
                  className="act-btn-primary"
                >
                  {t("intro.button")}
                </button>
              </div>
            </motion.div>
          )}

          {screen === "scenario" && <ScenarioScreen key="scenario" onNext={handleScenarioSelect} />}
          {screen === "hold" && <HoldScreen key="hold" onComplete={() => setScreen("result")} />}
          {screen === "result" && (
            <ResultScreen key="result" scenario={scenario} onTryAgain={handleTryAgain} onDone={handleDone} />
          )}
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
}

export default function PausePracticePage() {
  return (
    <I18nextProvider i18n={i18n}>
      <PauseInner />
    </I18nextProvider>
  );
}