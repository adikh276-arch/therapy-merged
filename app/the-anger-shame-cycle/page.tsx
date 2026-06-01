'use client';

import { useState, useEffect } from "react";
import { RefreshCw, ChevronRight, Heart, AlertCircle, ShieldAlert } from "lucide-react";
import { useTranslation, I18nextProvider } from "react-i18next";
import i18n, { loadLocale } from "./i18n";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { PremiumComplete } from "@/components/shared/PremiumComplete";
import { motion, AnimatePresence } from "framer-motion";

const TOTAL_SCREENS = 4;

function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${className}`}>
      {children}
    </span>
  );
}

function AngerShameCycleInner() {
  const { t } = useTranslation(undefined, { i18n });
  const [screen, setScreen] = useState(0);

  // Sync URL query lang parameter
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const lang = params.get('lang') || 'en';
      loadLocale(lang);
    }
  }, []);

  const nodesData = ((_t => Array.isArray(_t) ? _t : null)(t("screens.s2.nodes", { returnObjects: true }))) || [
    { emoji: "🔥", label: "Anger surfaces" },
    { emoji: "😔", label: "Shame: \"I'm bad\"" },
    { emoji: "🤐", label: "Shame gets buried" },
    { emoji: "🔥", label: "Anger erupts again" }
  ];

  const cycleColors = [
    "text-red-500 bg-red-50/50 border-red-100",
    "text-indigo-500 bg-indigo-50/50 border-indigo-100",
    "text-amber-600 bg-amber-50/50 border-amber-100",
    "text-red-500 bg-red-50/50 border-red-100"
  ];

  const stepsData = ((_t => Array.isArray(_t) ? _t : null)(t("screens.s4.steps", { returnObjects: true }))) || [
    { title: "Name the source", desc: "Ask: 'What am I actually feeling?' Hurt? Scared? Unseen? Naming it weakens it." },
    { title: "Compassion pause", desc: "Hand on chest. Say: 'This is hard. I'm human. I can get through this.'" },
    { title: "Repair with grace", desc: "Make amends if needed — but don't spiral. You're not your worst moment." }
  ];

  const stepsEmojis = ["🔍", "🤲", "🕊️"];

  const resetFlow = () => {
    setScreen(0);
  };

  if (screen === 4) {
    return (
      <PremiumLayout title={t("app_title", "Anger-Shame Cycle")} showBack={false}>
        <PremiumComplete
          title={t("app_title", "Anger-Shame Cycle")}
          message={t("complete.message", "You've gained the awareness to see the link between anger and shame. This is the foundation for lasting emotional freedom.")}
          onRestart={resetFlow}
        />
      </PremiumLayout>
    );
  }

  return (
    <PremiumLayout
      title={t("app_title", "Anger-Shame Cycle")}
      subtitle={t("app_subtitle", `Understanding the loop • Step ${screen + 1} of 4`, { step: screen + 1, total: TOTAL_SCREENS })}
      icon={<RefreshCw className="w-6 h-6 text-primary" />}
      onBack={screen > 0 ? () => setScreen(prev => prev - 1) : undefined}
    >
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-4 min-h-[60vh] select-none relative">
        {/* Step dots */}
        <div className="flex justify-center gap-1.5 mb-8">
          {Array.from({ length: TOTAL_SCREENS }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i <= screen ? "w-8 bg-primary" : "w-1.5 bg-slate-200"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* SCREEN 1: WHY DOES ANGER RETURN */}
          {screen === 0 && (
            <motion.div
              key="s1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex-1 flex flex-col gap-6"
            >
              <div className="relative overflow-hidden rounded-[2.5rem] bg-white/60 backdrop-blur-lg border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 shadow-xl min-h-[420px] flex flex-col justify-center text-center">
                <div className="absolute top-[-20px] right-[-20px] w-32 h-32 rounded-full bg-red-100/30 blur-3xl" />
                <div className="w-20 h-20 bg-red-50 rounded-[1.75rem] flex items-center justify-center text-5xl mx-auto mb-6 shadow-inner animate-pulse">
                  🔥
                </div>
                <h1 className="text-2xl font-black text-slate-800 mb-3 leading-tight tracking-tight">
                  {t("screens.s1.title", "Why does anger keep coming back?")}
                </h1>
                <p className="text-slate-500 font-semibold leading-relaxed text-sm mb-6 max-w-xs mx-auto">
                  {t("screens.s1.description", "It might not be your temper. There's a hidden loop between anger and shame — and once you see it, everything changes.")}
                </p>
                <div className="bg-red-50/50 rounded-2xl p-5 italic text-red-900 text-xs font-bold leading-relaxed border-l-4 border-red-400 text-left">
                  {t("screens.s1.quote", "\"Most people try to fix the anger. But shame is what quietly keeps it going.\"")}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setScreen(1)}
                className="w-full bg-gradient-to-r from-primary to-sky-400 text-white shadow-lg shadow-primary/30 py-4.5 rounded-2xl font-bold shadow-lg hover:opacity-90 hover:shadow-xl hover:shadow-primary/40 transition-all flex items-center justify-center gap-2"
              >
                {t("screens.s1.button", "Let's Explore")}
                <ChevronRight size={18} />
              </motion.button>
            </motion.div>
          )}

          {/* SCREEN 2: THE LOOP EXPLAINED */}
          {screen === 1 && (
            <motion.div
              key="s2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex-1 flex flex-col gap-6"
            >
              <div className="relative overflow-hidden rounded-[2.5rem] bg-white/60 backdrop-blur-lg border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 shadow-xl min-h-[420px] flex flex-col justify-between text-left">
                <div>
                  <Badge className="bg-red-150 text-red-600 mb-4">
                    {t("screens.s2.tag", "THE LOOP")}
                  </Badge>
                  <h1 className="text-2xl font-black text-slate-850 mb-6 leading-tight">
                    {t("screens.s2.title", "The loop explained")}
                  </h1>
                  
                  <div className="flex flex-col items-center gap-1 mb-2">
                    {nodesData.map((node, i) => (
                      <div key={i} className="flex flex-col items-center w-full">
                        <div className={`w-full rounded-[1.25rem] border px-6 py-3.5 font-bold text-sm flex items-center gap-4 ${cycleColors[i % cycleColors.length]}`}>
                          <span className="text-xl">{node.emoji}</span>
                          <span className="uppercase tracking-wider text-xs font-black">{node.label}</span>
                        </div>
                        {i < nodesData.length - 1 && (
                          <div className="w-1 h-5 bg-slate-100 rounded-full my-0.5" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setScreen(2)}
                className="w-full bg-gradient-to-r from-primary to-sky-400 text-white shadow-lg shadow-primary/30 py-4.5 rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2"
              >
                {t("screens.s2.button", "I see it")}
                <ChevronRight size={18} />
              </motion.button>
            </motion.div>
          )}

          {/* SCREEN 3: TWO EMOTIONS, ONE TRAP */}
          {screen === 2 && (
            <motion.div
              key="s3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex-1 flex flex-col gap-6"
            >
              <div className="relative overflow-hidden rounded-[2.5rem] bg-white/60 backdrop-blur-lg border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 shadow-xl min-h-[420px] flex flex-col justify-between text-left">
                <div>
                  <Badge className="bg-indigo-100 text-indigo-650 mb-4">
                    {t("screens.s3.tag", "UNDER THE HOOD")}
                  </Badge>
                  <h1 className="text-2xl font-black text-slate-850 mb-6 leading-tight">
                    {t("screens.s3.title", "Two emotions, one trap")}
                  </h1>

                  <div className="space-y-4">
                    <div className="rounded-2xl border border-red-100 bg-red-50/20 p-5 space-y-1">
                      <p className="font-black text-red-550 text-xs uppercase tracking-widest flex items-center gap-2">
                        {t("screens.s3.anger.title", "🔥 Anger")}
                      </p>
                      <p className="text-slate-600 text-xs font-semibold leading-relaxed">
                        {t("screens.s3.anger.desc", "A secondary emotion — underneath lives hurt, fear, or rejection. It's the alarm, not the fire.")}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-indigo-100 bg-indigo-50/20 p-5 space-y-1">
                      <p className="font-black text-indigo-600 text-xs uppercase tracking-widest flex items-center gap-2">
                        {t("screens.s3.shame.title", "😔 Shame")}
                      </p>
                      <p className="text-slate-600 text-xs font-semibold leading-relaxed">
                        {t("screens.s3.shame.desc", "\"I am bad\" — not just \"I did something bad.\" It hides, silences, and keeps the cycle spinning.")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setScreen(3)}
                className="w-full bg-gradient-to-r from-primary to-sky-400 text-white shadow-lg shadow-primary/30 py-4.5 rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2"
              >
                {t("screens.s3.button", "Breaking Free")}
                <ChevronRight size={18} />
              </motion.button>
            </motion.div>
          )}

          {/* SCREEN 4: INTERRUPT THE LOOP */}
          {screen === 3 && (
            <motion.div
              key="s4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex-1 flex flex-col gap-6 text-left"
            >
              <div className="relative overflow-hidden rounded-[2.5rem] bg-white/60 backdrop-blur-lg border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 shadow-xl min-h-[420px] flex flex-col justify-between">
                <div>
                  <Badge className="bg-emerald-100 text-emerald-650 mb-4">
                    {t("screens.s4.tag", "INTERRUPTION")}
                  </Badge>
                  <h1 className="text-2xl font-black text-slate-850 mb-6 leading-tight">
                    {t("screens.s4.title", "Interrupt the cycle")}
                  </h1>

                  <div className="space-y-4 pb-4">
                    {stepsData.map((step, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-primary to-sky-400 text-white shadow-lg shadow-primary/30 font-black text-sm shadow-md">
                          {idx + 1}
                        </div>
                        <div className="space-y-0.5">
                          <p className="font-black text-slate-800 text-sm flex items-center gap-2">
                            <span>{stepsEmojis[idx]}</span> {step.title}
                          </p>
                          <p className="text-slate-500 text-xs font-semibold leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-5 flex items-center gap-4.5 shadow-sm">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-inner shrink-0 text-emerald-500">
                  <Heart size={20} />
                </div>
                <p className="text-emerald-950 text-xs font-bold leading-relaxed">
                  {t("screens.s4.notice", "Noticing the cycle is already the first step. You're doing the work.")}
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setScreen(4)}
                className="w-full bg-gradient-to-r from-primary to-sky-400 text-white shadow-lg shadow-primary/30 py-4.5 rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2"
              >
                {t("screens.s4.button", "Complete Activity")}
                <ChevronRight size={18} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
}

export default function AngerShameCyclePage() {
  return (
    <I18nextProvider i18n={i18n}>
      <AngerShameCycleInner />
    </I18nextProvider>
  );
}
