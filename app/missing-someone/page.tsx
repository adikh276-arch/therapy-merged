'use client';

import { useState, useEffect, useMemo } from "react";
import { Heart, ChevronRight, Sparkles } from "lucide-react";
import { useTranslation, I18nextProvider } from "react-i18next";
import i18n, { loadLocale } from "./i18n";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { PremiumComplete } from "@/components/shared/PremiumComplete";
import { motion, AnimatePresence } from "framer-motion";

const screen1Hearts = ["#F4C0D1", "#D4537E", "#ED93B1", "#F4C0D1", "#D4537E"];
const screen2Hearts = ["#CEC9F6", "#AFA9EC", "#CEC9F6", "#AFA9EC", "#CEC9F6"];

interface FloatingHeartItem {
  id: number;
  size: number;
  left: number;
  color: string;
  duration: number;
  delay: number;
}

const FloatingHearts = ({ colors }: { colors: string[] }) => {
  const hearts = useMemo(() => {
    const sizes = [16, 20, 24, 28, 32];
    const lefts = [15, 32, 50, 68, 85];
    const durations = [5, 6, 5.5, 6.5, 7];
    const delays = [0, 0.6, 1.2, 1.8, 2.4];

    return Array.from({ length: 5 }, (_, i) => ({
      id: i,
      size: sizes[i],
      left: lefts[i],
      color: colors[i % colors.length],
      duration: durations[i],
      delay: delays[i],
    }));
  }, [colors]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((h) => (
        <motion.span
          key={h.id}
          className="absolute select-none font-bold"
          style={{
            bottom: 40,
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            color: h.color,
            opacity: 0,
          }}
          animate={{
            y: [0, -320],
            scale: [1, 0.5],
            opacity: [0, 0.7, 0.7, 0],
          }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ♥
        </motion.span>
      ))}
    </div>
  );
};

function MissingSomeoneInner() {
  const { t } = useTranslation(undefined, { i18n });
  const [currentScreen, setCurrentScreen] = useState(0);

  // Sync URL query lang parameter
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const lang = params.get('lang') || 'en';
      loadLocale(lang);
    }
  }, []);

  if (currentScreen === 2) {
    return (
      <PremiumComplete
        title={t("app_title", "Missing Someone")}
        message={t("complete_message", "You've successfully completed this reflection. Remembering is a natural, normal part of love.")}
        onRestart={() => setCurrentScreen(0)}
                  shareEmoji="💜"
                  shareContent={"I just completed 'Missing Someone' on TherapyMantra — a guided grief support that genuinely helped me. Try it! 🌿\n\n📱 Android: https://play.google.com/store/apps/details?id=org.mantracare.therapy\n🍎 iOS: https://apps.apple.com/pk/app/therapymantra/id1607643888"}
      />
    );
  }

  const subtitles = ((_t => Array.isArray(_t) ? _t : null)(t("subtitles", { returnObjects: true }))) || [
    "Understanding the longing",
    "Embracing the connection"
  ];

  return (
    <PremiumLayout
      title={t("app_title", "Missing Someone")}
      subtitle={Array.isArray(subtitles) ? subtitles[currentScreen] : undefined}
      icon={<Heart className="w-6 h-6 text-primary" />}
      onBack={currentScreen > 0 ? () => setCurrentScreen(prev => prev - 1) : undefined}
    >
      <div className="w-full max-w-md mx-auto flex flex-col min-h-[60vh] relative select-none">
        {/* Progress Tracker */}
        <div className="flex justify-center gap-2 mb-8">
          {[0, 1].map((i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i <= currentScreen ? "w-8 bg-primary" : "w-2 bg-slate-200"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {currentScreen === 0 && (
            <motion.div
              key="screen1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeOut" as const }}
              className="flex-1 flex flex-col gap-6"
            >
              <div className="relative overflow-hidden rounded-[2.5rem] bg-white/60 backdrop-blur-lg border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 shadow-xl min-h-[420px] flex flex-col justify-between">
                <div className="absolute top-[-20px] right-[-20px] w-32 h-32 rounded-full bg-pink-100/50 blur-3xl" />
                <div className="absolute bottom-[-20px] left-[-20px] w-32 h-32 rounded-full bg-amber-100/30 blur-3xl" />
                <FloatingHearts colors={screen1Hearts} />
                
                <div className="relative z-10 space-y-6">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-pink-50 text-pink-600 text-[10px] font-black uppercase tracking-widest">
                    {t("screen1.tag", "UNDERSTANDING LOSS")}
                  </div>
                  
                  <div className="space-y-4 text-left">
                    <p className="text-slate-400 font-bold text-sm">
                      {t("screen1.intro", "Grief & Attachment")}
                    </p>
                    <h1 className="text-3xl font-black text-slate-800 leading-tight tracking-tight">
                      {t("screen1.title", "Missing someone is a form of learning.")}
                    </h1>
                    <p className="text-slate-600 leading-relaxed font-semibold text-sm">
                      {t("screen1.desc", "Our brains build rich maps of the people we love. When they are gone, the brain continues looking for them, causing that deep, physical ache of longing.")}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 bg-pink-50/50 border-l-4 border-pink-400 rounded-2xl p-5 italic text-pink-900 text-xs leading-relaxed shadow-sm text-left mt-6">
                  {t("screen1.quote", '"Your longing is the price of connection. It is the echo of love."')}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentScreen(1)}
                className="w-full bg-slate-900 text-white shadow-md py-4.5 rounded-2xl font-bold shadow-lg hover:opacity-90 hover:shadow-xl hover:shadow-primary/40 transition-all flex items-center justify-center gap-2"
              >
                {t("screen1.button", "Explore Further")}
                <ChevronRight size={18} />
              </motion.button>
            </motion.div>
          )}

          {currentScreen === 1 && (
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
                <div className="absolute bottom-[-20px] right-[-20px] w-32 h-32 rounded-full bg-pink-100/30 blur-3xl" />
                <FloatingHearts colors={screen2Hearts} />

                <div className="relative z-10 space-y-6">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest">
                    {t("screen2.tag", "HEALING PATHS")}
                  </div>

                  <div className="space-y-4 text-left">
                    <p className="text-slate-400 font-bold text-sm">
                      {t("screen2.intro", "Building New Maps")}
                    </p>
                    <h1 className="text-3xl font-black text-slate-800 leading-tight tracking-tight">
                      {t("screen2.title", "Embracing the memory gently.")}
                    </h1>
                    <p className="text-slate-600 leading-relaxed font-semibold text-sm">
                      {t("screen2.desc", "Rather than trying to stop missing them, we can learn to hold their presence differently. The goal is to build an enduring connection to them while staying open to the beauty of now.")}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 bg-indigo-50/50 border-l-4 border-indigo-400 rounded-2xl p-5 italic text-indigo-900 text-xs leading-relaxed shadow-sm text-left mt-6">
                  {t("screen2.quote", '"To remember is to keep them close, within the sanctuary of your heart."')}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentScreen(2)}
                className="w-full bg-slate-900 text-white shadow-md py-4.5 rounded-2xl font-bold shadow-lg hover:opacity-90 hover:shadow-xl hover:shadow-primary/40 transition-all flex items-center justify-center gap-2"
              >
                {t("screen2.button", "Complete Reflection")}
                <ChevronRight size={18} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
}

export default function MissingSomeonePage() {
  return (
    <I18nextProvider i18n={i18n}>
      <MissingSomeoneInner />
    </I18nextProvider>
  );
}