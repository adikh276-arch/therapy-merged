'use client';

import { useState, useEffect } from 'react';
import { Moon, ChevronRight, ChevronLeft, Lightbulb } from "lucide-react";
import { useTranslation, I18nextProvider } from 'react-i18next';
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { motion, AnimatePresence } from "framer-motion";
import i18n, { loadLocale } from './i18n';

// BedIllustration
const BedIllustration = () => (
  <svg width="72" height="60" viewBox="0 0 72 60" fill="none" className="shrink-0">
    <rect x="4" y="30" width="64" height="20" rx="4" className="fill-indigo-100" />
    <rect x="8" y="26" width="20" height="12" rx="4" className="fill-indigo-200" opacity="0.7" />
    <circle cx="18" cy="22" r="7" className="fill-amber-300" />
    <rect x="22" y="30" width="30" height="10" rx="3" className="fill-indigo-300" opacity="0.5" />
    <circle cx="20" cy="21" r="1.5" className="fill-slate-800" />
    <circle cx="40" cy="10" r="12" className="fill-indigo-100" opacity="0.8" />
    <circle cx="32" cy="18" r="3" className="fill-indigo-100" opacity="0.6" />
    <circle cx="28" cy="22" r="2" className="fill-indigo-100" opacity="0.4" />
    <circle cx="40" cy="10" r="7" className="stroke-indigo-300" strokeWidth="1" fill="none" />
    <line x1="40" y1="10" x2="40" y2="5" className="stroke-indigo-300" strokeWidth="1" strokeLinecap="round" />
    <line x1="40" y1="10" x2="44" y2="12" className="stroke-indigo-300" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

// BrainIllustration
const BrainIllustration = () => (
  <svg width="72" height="60" viewBox="0 0 72 60" fill="none" className="shrink-0">
    <path
      d="M36 8C24 8 16 16 16 26C16 36 24 44 36 44C48 44 56 36 56 26C56 16 48 8 36 8Z"
      className="fill-rose-100"
      opacity="0.5"
    />
    <path d="M24 22C28 18 32 24 36 20C40 16 44 22 48 20" className="stroke-rose-300" strokeWidth="1" strokeDasharray="3 2" fill="none" />
    <path d="M22 30C26 26 30 32 36 28C42 24 46 30 50 28" className="stroke-rose-300" strokeWidth="1" strokeDasharray="3 2" fill="none" />
    <path d="M26 36C30 32 34 38 38 34C42 30 46 36 48 34" className="stroke-rose-300" strokeWidth="1" strokeDasharray="3 2" fill="none" />
    <circle cx="48" cy="14" r="6" className="fill-amber-400" opacity="0.3" />
    <text x="48" y="17" textAnchor="middle" className="fill-amber-500" fontSize="10" fontWeight="bold">!</text>
    <polyline points="8,52 20,52 24,46 28,56 32,48 36,52 44,52" className="stroke-rose-300" strokeWidth="1.5" fill="none" />
    <line x1="44" y1="52" x2="64" y2="52" className="stroke-rose-200" strokeWidth="1.5" />
  </svg>
);

function SleepGuideInner() {
  const { t } = useTranslation(undefined, { i18n });
  const [screen, setScreen] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const lang = params.get('lang') || 'en';
      loadLocale(lang);
    }
  }, []);

  const renderFormatted = (text: string) => {
    const parts = text.split(/<1>|<\/1>/);
    if (parts.length >= 3) {
      return (
        <>
          {parts[0]}<span className="text-primary font-bold">{parts[1]}</span>{parts[2]}
        </>
      );
    }
    return text;
  };

  return (
    <PremiumLayout
      title={t("app_title", "Sleep Guide")}
      subtitle={t("app_subtitle", "Understanding sleep anxiety")}
      icon={<Moon className="w-6 h-6 text-primary" />}
      onBack={screen > 0 ? () => setScreen(0) : undefined}
    >
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-4">
        <AnimatePresence mode="wait">
          {screen === 0 ? (
            <motion.div
              key="screen1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col gap-6"
            >
              <div className="relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 p-8 shadow-sm min-h-[480px]">
                <div className="absolute top-[-40px] right-[-40px] w-48 h-48 rounded-full bg-primary opacity-5 blur-3xl" />
                
                <div className="relative z-10 space-y-6">
                  <div className="inline-flex px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-500 text-[10px] font-bold uppercase tracking-widest">
                    {t("tag", "PSYCHOEDUCATION")}
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-primary font-bold text-sm">{t("screen1.intro", "The harder you try, the harder it gets.")}</p>
                    <h1 className="text-2xl font-bold text-slate-800 leading-tight">
                      {t("screen1.title", "Trying to force yourself to sleep is exactly what keeps you awake.")}
                    </h1>
                    
                    <div className="bg-slate-50 rounded-2xl p-4 flex gap-4 items-start border border-slate-100 shadow-sm">
                      <BedIllustration />
                      <p className="text-slate-600 text-sm font-medium leading-relaxed">
                        {t("screen1.p1", "You lie down, close your eyes — and your brain switches on. Replaying conversations. Watching the clock.")}
                      </p>
                    </div>

                    <p className="text-slate-600 font-medium leading-relaxed text-sm">
                      {renderFormatted(t("screen1.p2", "This isn't a weakness. It's a phenomenon called <1>sleep anxiety</1> — and it affects millions of people."))}
                    </p>
                  </div>

                  <div className="bg-slate-50 border-l-4 border-l-primary rounded-2xl p-6 italic text-slate-600 text-sm font-medium leading-relaxed shadow-sm">
                    {t("screen1.quote", "\"Sleep anxiety isn't about not being tired. It's about your nervous system being stuck in 'on' mode.\"")}
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => setScreen(1)}
                  className="act-btn-primary"
                >
                  {t("screen1.button", "Learn More")}
                  <ChevronRight size={20} className="ml-2" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="screen2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col gap-6"
            >
              <div className="relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 p-8 shadow-sm min-h-[480px]">
                <div className="absolute bottom-[-40px] left-[-40px] w-48 h-48 rounded-full bg-primary opacity-5 blur-3xl" />

                <div className="relative z-10 space-y-6">
                  <div className="inline-flex px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-500 text-[10px] font-bold uppercase tracking-widest">
                    {t("tag", "PSYCHOEDUCATION")}
                  </div>

                  <div className="space-y-4">
                    <p className="text-primary font-bold text-sm">{t("screen2.intro", "Here's the science behind it.")}</p>
                    <h1 className="text-2xl font-bold text-slate-800 leading-tight">
                      {t("screen2.title", "Your brain has learned to treat your bed as a place of stress — not rest.")}
                    </h1>

                    <div className="bg-slate-50 rounded-2xl p-4 flex gap-4 items-start border border-slate-100 shadow-sm">
                      <BrainIllustration />
                      <p className="text-slate-600 text-sm font-medium leading-relaxed">
                        {t("screen2.p1", "Your amygdala — the brain's threat detector — stays activated at night, signalling danger the moment your head hits the pillow.")}
                      </p>
                    </div>

                    <p className="text-slate-600 font-medium leading-relaxed text-sm">
                      {renderFormatted(t("screen2.p2", "This is called <1>conditioned arousal</1> — it explains why you feel exhausted all day, yet wide awake at bedtime."))}
                    </p>
                  </div>

                  <div className="bg-slate-50 border-l-4 border-l-primary rounded-2xl p-6 italic text-slate-600 text-sm font-medium leading-relaxed shadow-sm">
                    {t("screen2.quote", "\"Your brain isn't broken. It has simply learned the wrong lesson about bedtime — and it can be retaught.\"")}
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => setScreen(0)}
                  className="act-btn-secondary"
                >
                  <ChevronLeft size={20} className="mr-2" />
                  {t("screen2.button", "Previous Step")}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-center gap-2 mt-8">
          <div className={`h-1.5 rounded-full transition-all duration-300 ${screen === 0 ? "w-8 bg-primary" : "w-2 bg-slate-200"}`} />
          <div className={`h-1.5 rounded-full transition-all duration-300 ${screen === 1 ? "w-8 bg-primary" : "w-2 bg-slate-200"}`} />
        </div>
      </div>
    </PremiumLayout>
  );
}

export default function SleepGuidePage() {
  return (
    <I18nextProvider i18n={i18n}>
      <SleepGuideInner />
    </I18nextProvider>
  );
}
