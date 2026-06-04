'use client';

import { useState, useEffect, useCallback, useRef } from "react";
import { RotateCcw, Wind, Play, Pause, RefreshCw } from "lucide-react";
import { useTranslation, I18nextProvider } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { PremiumIntro } from "@/components/shared/PremiumIntro";
import { PremiumComplete } from "@/components/shared/PremiumComplete";
import i18n, { loadLocale } from "./i18n";

type Phase = "inhale" | "hold" | "exhale";
type Status = "idle" | "running" | "paused";

const PHASE_DURATIONS: Record<Phase, number> = {
  inhale: 4,
  hold: 6,
  exhale: 8,
};

const PHASE_ORDER: Phase[] = ["inhale", "hold", "exhale"];

function BreathingInner() {
  const { t } = useTranslation(undefined, { i18n });
  const [screen, setScreen] = useState<"intro" | "breathing" | "complete">("intro");
  const [status, setStatus] = useState<Status>("idle");
  const [totalRounds, setTotalRounds] = useState(4);
  const [currentRound, setCurrentRound] = useState(1);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [countdown, setCountdown] = useState(PHASE_DURATIONS.inhale);
  const [reflection, setReflection] = useState("");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const phase = PHASE_ORDER[phaseIndex];

  // Sync lang param
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const lang = params.get('lang') || 'en';
      loadLocale(lang);
    }
  }, []);

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
          setPhaseIndex((pi) => {
            const nextPi = pi + 1;
            if (nextPi >= PHASE_ORDER.length) {
              setCurrentRound((r) => {
                if (r >= totalRounds) {
                  clearTimer();
                  setStatus("idle");
                  setScreen("complete");
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
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return clearTimer;
  }, [status, totalRounds, clearTimer]);

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

  const getCircleScale = (): number => {
    if (status === "idle") return 0.7;
    if (phase === "inhale") return 1.1;
    if (phase === "hold") return 1.1;
    if (phase === "exhale") return 0.7;
    return 0.7;
  };

  const getCountdownText = () => {
    if (status === "idle") return t("ready");
    const phaseDuration = PHASE_DURATIONS[phase];
    const elapsed = phaseDuration - countdown + 1;
    const nums = Array.from({ length: Math.min(elapsed, phaseDuration) }, (_, i) => i + 1).join("…");
    return `${t(phase)}… ${nums}`;
  };

  const getTransitionMs = (): number => {
    if (status !== "running") return 500;
    if (phase === "inhale") return 4000;
    if (phase === "hold") return 300;
    if (phase === "exhale") return 8000;
    return 500;
  };

  if (screen === "intro") {
    return (
      <PremiumLayout title={t("app_title")}>
        <PremiumIntro
          title={t("app_title")}
          description={t("app_description")}
          onStart={() => setScreen("breathing")}
          icon={<Wind size={32} />}
          benefits={[t('intro_p1'), t('intro_p2'), t('intro_p3')]}
          duration={t('app_duration', "3-5 minutes")}
        />
      </PremiumLayout>
    );
  }

  if (screen === "complete") {
    return (
      <PremiumLayout title={t("app_title")}>
        <PremiumComplete
          title={t("app_title")}
          message={`${t('notice_body')} ${t('breath_slower')} ${t('chest_softer')}`}
          onRestart={() => {
            reset();
            setReflection("");
            setScreen("breathing");
          }}
          icon={<Wind size={48} />}
                  shareEmoji="️"
                  shareContent={"I just completed '4-6-8 Breathing' on TherapyMantra — a guided breathing exercises that genuinely helped me. Try it! \n\n Android: https://play.google.com/store/apps/details?id=org.mantracare.therapy\n iOS: https://apps.apple.com/pk/app/therapymantra/id1607643888"}
        >
          <div className="w-full flex flex-col gap-4 text-left mt-8">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">
              {t('what_feels_different')}
            </p>
            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder={t('reflection_placeholder')}
              rows={4}
              className="field-textarea text-lg p-8"
            />
          </div>
        </PremiumComplete>
      </PremiumLayout>
    );
  }

  return (
    <PremiumLayout 
      title={t("app_title")} 
      onReset={() => { reset(); setScreen("intro"); }}
    >
      <div className="flex flex-col items-center gap-10 py-6">
        {/* Progress Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.2em]">
            <Wind size={16} />
            {t('common.phase_label', 'Phase')}: {t(phase)}
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            {t('round_x_of_y', { current: currentRound, total: totalRounds })}
          </h2>
        </div>

        {/* Breathing Circle */}
        <div className="relative flex items-center justify-center w-80 h-80">
          <motion.div
            animate={{
              scale: getCircleScale() * 1.1,
              opacity: status === "running" ? [0.1, 0.3, 0.1] : 0.1
            }}
            transition={{
              scale: { duration: getTransitionMs() / 1000, ease: "easeInOut" },
              opacity: { duration: 3, repeat: Infinity }
            }}
            className="absolute inset-0 rounded-full bg-primary/20 blur-3xl"
          />
          
          <motion.div
            animate={{ scale: getCircleScale() }}
            transition={{ duration: getTransitionMs() / 1000, ease: "easeInOut" }}
            className="w-64 h-64 rounded-full bg-primary flex items-center justify-center shadow-[0_20px_50px_rgba(var(--primary),0.3)] relative z-10 border-8 border-white/20"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`${phase}-${countdown}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                className="text-primary-foreground font-black text-2xl text-center px-8 leading-tight tracking-tight"
              >
                {getCountdownText()}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Round Selector */}
        {status === "idle" && (
          <div className="bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 p-2 rounded-[2rem] border border-white/60 flex gap-2">
            {[4, 6, 8].map((r) => (
              <button
                key={r}
                onClick={() => setTotalRounds(r)}
                className={`px-8 py-3 rounded-[1.5rem] font-black text-xs uppercase tracking-widest transition-all ${totalRounds === r
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                  }`}
              >
                {t('rounds_selector', { count: r })}
              </button>
            ))}
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center gap-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={status === "running" ? handlePause : handleStart}
            className={`w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-all ${
              status === "running" 
              ? "bg-white text-slate-900 border border-white/60 hover:bg-slate-50 shadow-slate-200" 
              : "bg-primary text-white shadow-primary/20 hover:shadow-primary/30"
            }`}
          >
            {status === "running" ? <Pause size={32} strokeWidth={3} /> : <Play size={32} strokeWidth={3} className="ml-1" />}
          </motion.button>
          
          <motion.button
            whileHover={{ rotate: -90, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={reset}
            className="w-16 h-16 bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 text-slate-400 rounded-full flex items-center justify-center hover:bg-slate-100 hover:text-slate-600 transition-all border border-white/60"
            aria-label={t('reset')}
          >
            <RefreshCw size={24} strokeWidth={3} />
          </motion.button>
        </div>

        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] max-w-[200px] text-center leading-relaxed">
          {status === "idle" 
            ? t("common.instruction_ready", "Set your rounds and tap play to begin") 
            : t("common.instruction_running", "Follow the circle to regulate your breath")}
        </p>
      </div>
    </PremiumLayout>
  );
}

export default function BreathingPage() {
  return (
    <I18nextProvider i18n={i18n}>
      <BreathingInner />
    </I18nextProvider>
  );
}