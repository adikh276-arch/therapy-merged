'use client';

import { useState, useEffect, useMemo } from "react";
import { Heart, ChevronRight } from "lucide-react";
import { useTranslation, I18nextProvider } from "react-i18next";
import i18n, { loadLocale } from "./i18n";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { PremiumComplete } from "@/components/shared/PremiumComplete";
import { motion, AnimatePresence } from "framer-motion";

const HEARTS_SCREEN1 = [
  { color: "#F4C0D1", size: 14, left: "12%", delay: 0, duration: 7 },
  { color: "#D4537E", size: 10, left: "30%", delay: 1.5, duration: 8 },
  { color: "#ED93B1", size: 18, left: "50%", delay: 0.8, duration: 6 },
  { color: "#F4C0D1", size: 12, left: "70%", delay: 3, duration: 9 },
  { color: "#ED93B1", size: 9, left: "85%", delay: 2, duration: 7.5 },
];

const HEARTS_SCREEN2 = [
  { color: "#CEC9F6", size: 13, left: "15%", delay: 0.5, duration: 8 },
  { color: "#AFA9EC", size: 16, left: "35%", delay: 2, duration: 6.5 },
  { color: "#CEC9F6", size: 11, left: "55%", delay: 1, duration: 9 },
  { color: "#AFA9EC", size: 18, left: "72%", delay: 3.5, duration: 7 },
  { color: "#CEC9F6", size: 9, left: "88%", delay: 0, duration: 8.5 },
];

const FloatingHearts = ({ hearts }: { hearts: typeof HEARTS_SCREEN1 }) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((h, i) => (
        <motion.span
          key={i}
          initial={{ y: "110vh", opacity: 0 }}
          animate={{ y: "-10vh", opacity: [0, 1, 1, 0] }}
          transition={{
            duration: h.duration,
            repeat: Infinity,
            delay: h.delay,
            ease: "linear"
          }}
          className="absolute bottom-0 select-none font-bold"
          style={{
            color: h.color,
            fontSize: `${h.size}px`,
            left: h.left,
          }}
        >
          
        </motion.span>
      ))}
    </div>
  );
};

function RelationshipPatternsInner() {
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

  const resetFlow = () => {
    setScreen(0);
  };

  if (screen === 2) {
    return (
      <PremiumComplete
        title={t("app_title", "Relationship Patterns")}
        message={t("complete_message", "Understanding your patterns is the first step toward rewriting them. You carry the power to choose a different path.")}
        onRestart={resetFlow}
                  shareContent={"I just completed 'Relationship Patterns' on TherapyMantra — a guided relationship insight that genuinely helped me. Try it! \n\n Android: https://play.google.com/store/apps/details?id=org.mantracare.therapy\n iOS: https://apps.apple.com/pk/app/therapymantra/id1607643888"}
      />
    );
  }

  return (
    <PremiumLayout
      title={t("app_title", "Relationship Patterns")}
      subtitle={t("app_subtitle", "Unpacking your blueprint")}
      icon={<Heart className="w-6 h-6 text-primary" />}
      onBack={screen > 0 ? () => setScreen(prev => prev - 1) : undefined}
      onReset={screen > 0 ? resetFlow : undefined}
    >
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-4 min-h-[60vh] relative select-none">
        {/* Step dots */}
        <div className="flex justify-center gap-2 mb-8">
          {[0, 1].map((i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i <= screen ? "w-8 bg-primary" : "w-2 bg-slate-200"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {screen === 0 ? (
            <motion.div
              key="screen1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeOut" as const }}
              className="flex-1 flex flex-col gap-6"
            >
              <div className="relative overflow-hidden rounded-[2.5rem] bg-white/60 backdrop-blur-lg border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 shadow-xl min-h-[420px] flex flex-col justify-between">
                <div className="absolute top-[-20px] right-[-20px] w-32 h-32 rounded-full bg-amber-100/50 blur-3xl" />
                <div className="absolute bottom-[-20px] left-[-20px] w-32 h-32 rounded-full bg-pink-100/30 blur-3xl" />
                <FloatingHearts hearts={HEARTS_SCREEN1} />
                
                <div className="relative z-10 space-y-6 text-left">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-pink-50 text-pink-600 text-[10px] font-black uppercase tracking-[0.2em]">
                    {t("screen1.tag", "Pattern Discovery")}
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-slate-400 font-bold text-sm">
                      {t("screen1.intro", "Ever felt like you've been here before?")}
                    </p>
                    <h1 className="text-3xl font-black text-slate-800 leading-tight tracking-tight">
                      {t("screen1.title", "If your relationships keep ending the same way — it's not bad luck.")}
                    </h1>
                    <p className="text-slate-600 font-semibold text-sm leading-relaxed">
                      {t("screen1.desc", "The relationships we choose follow a blueprint written long before we ever fell in love. Familiarity often feels like safety, even when it leads to the same old arguments.")}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 bg-pink-50/50 border-l-4 border-pink-400 rounded-2xl p-6 italic text-pink-900 text-xs font-bold leading-relaxed shadow-sm text-left mt-6">
                  {t("screen1.quote", '"We repeat patterns not because we are broken — but because they feel familiar."')}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setScreen(1)}
                className="w-full bg-slate-900 text-white shadow-md py-4.5 rounded-2xl font-bold shadow-lg hover:opacity-90 hover:shadow-xl hover:shadow-primary/40 transition-all flex items-center justify-center gap-2"
              >
                {t("screen1.button", "Continue Unpacking")}
                <ChevronRight size={18} />
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="screen2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeOut" as const }}
              className="flex-1 flex flex-col gap-6"
            >
              <div className="relative overflow-hidden rounded-[2.5rem] bg-white/60 backdrop-blur-lg border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 shadow-xl min-h-[420px] flex flex-col justify-between">
                <div className="absolute top-[-20px] left-[-20px] w-32 h-32 rounded-full bg-indigo-100/50 blur-3xl" />
                <div className="absolute bottom-[-20px] right-[-20px] w-32 h-32 rounded-full bg-teal-100/30 blur-3xl" />
                <FloatingHearts hearts={HEARTS_SCREEN2} />

                <div className="relative z-10 space-y-6 text-left">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em]">
                    {t("screen2.tag", "The Template")}
                  </div>

                  <div className="space-y-4">
                    <p className="text-slate-400 font-bold text-sm">
                      {t("screen2.intro", "It starts earlier than you think.")}
                    </p>
                    <h1 className="text-3xl font-black text-slate-800 leading-tight tracking-tight">
                      {t("screen2.title", "Earliest relationships become the template for all that follows.")}
                    </h1>
                    <p className="text-slate-600 font-semibold text-sm leading-relaxed">
                      {t("screen2.desc", "The way your caregivers responded to your needs quietly shaped how you relate to others as an adult. These are learned responses — and they can be unlearned.")}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 bg-indigo-50/50 border-l-4 border-indigo-400 rounded-2xl p-6 italic text-indigo-900 text-xs font-bold leading-relaxed shadow-sm text-left mt-6">
                  {t("screen2.quote", '"Your pattern made sense once. The question is — does it still serve you now?"')}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setScreen(2)}
                className="w-full bg-slate-900 text-white shadow-md py-4.5 rounded-2xl font-bold shadow-lg hover:opacity-90 hover:shadow-xl hover:shadow-primary/40 transition-all flex items-center justify-center gap-2"
              >
                {t("screen2.button", "Finish Reflection")}
                <ChevronRight size={18} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
}

export default function RelationshipPatternsPage() {
  return (
    <I18nextProvider i18n={i18n}>
      <RelationshipPatternsInner />
    </I18nextProvider>
  );
}