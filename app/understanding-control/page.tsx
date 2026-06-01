'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, ChevronRight, Zap, Heart } from "lucide-react";
import { useTranslation, I18nextProvider } from "react-i18next";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { PremiumComplete } from "@/components/shared/PremiumComplete";
import i18n, { loadLocale } from "./i18n";

function UnderstandingControlInner() {
  const { t } = useTranslation(undefined, { i18n });
  const [current, setCurrent] = useState(0);

  // Sync lang parameter from query
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const lang = params.get('lang') || 'en';
      loadLocale(lang);
    }
  }, []);

  const screens_data = ((_t => Array.isArray(_t) ? _t : null)(t("screens", { returnObjects: true }))) || [
    {
      headline: "Why Control Can Feel So Powerful",
      paragraphs: [
        "For many people experiencing eating difficulties, control can feel like a way to create safety.",
        "When life feels unpredictable or emotionally intense, focusing on food, weight, or routines can bring a sense of structure and certainty.",
        "This isn't about willpower or discipline. It's about trying to steady yourself when things feel uncertain.",
        "In this way, control becomes a coping strategy — something that helps you feel grounded, even if only temporarily."
      ],
      microcopy: "You're not alone in feeling this way.",
      cta: "Continue"
    },
    {
      headline: "Different Ways Control Appears",
      intro: "The need for control doesn't look the same for everyone, but it often shows up in patterns like:",
      bullets: [
        { text: "Strict or inflexible food rules" },
        { text: "Need to follow routines exactly" },
        { text: "Anxiety when plans change" },
        { text: "Linking self-worth to shape/weight" }
      ],
      microcopy: "What starts as control can slowly start to feel controlling.",
      cta: "Continue"
    },
    {
      headline: "Underneath the Control",
      intro: "The urge to control often has deeper roots. It can be connected to:",
      bullets: [
        { text: "Feeling emotionally flooded" },
        { text: "Wanting predictability" },
        { text: "A need for stability and safety" }
      ],
      insight: "Control isn't the problem — it's the strategy your mind found to cope. With time and support, other ways to feel safe are possible.",
      microcopy: "Understanding is a powerful first step.",
      cta: "Finish Reading"
    }
  ];

  if (current === 3) {
    return (
      <PremiumComplete
        title={t("app_title", "Understanding Control")}
        message={t("complete.message", "Understanding the roots of control is a brave first step toward finding new ways to feel safe and steady.")}
        onRestart={() => setCurrent(0)}
      />
    );
  }

  const screen = screens_data[current] || screens_data[0];

  // Map icons back to bullets for screen 1 and 2
  const bulletIcons = [
    [
      { icon: <Shield className="text-rose-500" size={16} />, color: "bg-rose-50" },
      { icon: <Zap className="text-blue-500" size={16} />, color: "bg-blue-50" },
      { icon: <Shield className="text-amber-500" size={16} />, color: "bg-amber-50" },
      { icon: <Heart className="text-emerald-500" size={16} />, color: "bg-emerald-50" },
    ],
    [
      { icon: <Zap className="text-indigo-500" size={16} />, color: "bg-indigo-50" },
      { icon: <Shield className="text-violet-500" size={16} />, color: "bg-violet-50" },
      { icon: <Heart className="text-pink-500" size={16} />, color: "bg-pink-50" },
    ]
  ];

  const currentIcons = current > 0 ? bulletIcons[current - 1] : [];

  return (
    <PremiumLayout
      title={t("app_title", "Understanding Control")}
      subtitle={t("app_subtitle", { step: current + 1, defaultValue: `Strategy of Survival • ${current + 1}/3` })}
      icon={<Shield className="w-6 h-6 text-primary" />}
      onBack={current > 0 ? () => setCurrent(prev => prev - 1) : undefined}
    >
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-4 min-h-[70vh]">
        <div className="flex justify-center gap-2 mb-10">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${i <= current ? "w-8 bg-primary" : "w-2 bg-slate-100"}`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex-1 flex flex-col gap-6"
          >
            <div className="relative overflow-hidden rounded-[3rem] bg-white/70 backdrop-blur-xl border border-white/80 p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <h1 className="text-2xl font-black text-slate-800 mb-8 leading-tight">{screen.headline}</h1>

              {screen.paragraphs && (
                <div className="space-y-4">
                  {screen.paragraphs.map((p: string, i: number) => (
                    <p key={i} className="text-slate-600 text-base leading-relaxed font-medium">{p}</p>
                  ))}
                </div>
              )}

              {screen.intro && (
                <div className="space-y-8">
                  <p className="text-slate-500 text-sm font-bold italic">{screen.intro}</p>
                  <div className="space-y-4">
                    {screen.bullets && screen.bullets.map((b: any, i: number) => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-[1.5rem] bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 border border-white/60">
                        {currentIcons[i] && (
                          <div className={`p-3 rounded-2xl ${currentIcons[i]?.color}`}>
                            {currentIcons[i]?.icon}
                          </div>
                        )}
                        <span className="text-sm font-black text-slate-700">{b.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {screen.insight && (
                <div className="mt-8 bg-primary/5 rounded-3xl p-8 italic text-primary text-sm font-medium leading-relaxed border-l-8 border-primary">
                  "{screen.insight}"
                </div>
              )}
            </div>

            <div className="flex flex-col gap-6 mt-4">
              <p className="text-center text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">{screen.microcopy}</p>
              <button
                onClick={() => setCurrent(prev => prev + 1)}
                className="w-full bg-slate-900 text-white shadow-md py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:opacity-90 hover:shadow-xl hover:shadow-primary/40 transition-all flex items-center justify-center gap-3"
              >
                {screen.cta || t("complete.button_fallback", "Finish Reading")}
                <ChevronRight size={20} strokeWidth={3} />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
}

export default function UnderstandingControlPage() {
  return (
    <I18nextProvider i18n={i18n}>
      <UnderstandingControlInner />
    </I18nextProvider>
  );
}
