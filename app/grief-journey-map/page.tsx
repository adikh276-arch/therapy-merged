'use client';

import { useState, useCallback, useEffect } from "react";
import { Compass, ChevronRight, Sparkles } from "lucide-react";
import { useTranslation, I18nextProvider } from "react-i18next";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { PremiumComplete } from "@/components/shared/PremiumComplete";
import { motion, AnimatePresence } from "framer-motion";
import i18n, { loadLocale } from "./i18n";

const TOTAL_SCREENS = 3;

function Screen1({ onNext, t }: { onNext: () => void; t: any }) {
  return (
    <div className="flex flex-1 flex-col gap-8">
      <div className="relative overflow-hidden rounded-[3rem] bg-white/70 backdrop-blur-xl border border-white/80 p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-center text-center min-h-[450px]">
        <div className="w-24 h-24 bg-primary/10 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 text-6xl"></div>
        <h1 className="text-3xl font-black text-slate-800 mb-4 leading-tight">
          {t("screen1_title")}
        </h1>
        <p className="text-slate-655 font-medium leading-relaxed text-base mb-8">
          {t("screen1_desc")}
        </p>
        <div className="bg-sky-50 rounded-2xl p-8 italic text-sky-900 text-base font-bold leading-relaxed border-l-8 border-sky-450 border-solid">
          {t("screen1_quote")}
        </div>
      </div>
      <button
        onClick={onNext}
        className="w-full bg-slate-900 text-white shadow-md py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:opacity-90 hover:shadow-xl hover:shadow-primary/40 transition-all flex items-center justify-center gap-3"
      >
        {t("btn_tell_more")}
        <ChevronRight size={20} strokeWidth={3} />
      </button>
    </div>
  );
}

function GriefGraph({ t }: { t: any }) {
  return (
    <div className="grid grid-cols-1 gap-6 mt-4">
      <div className="rounded-3xl bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 border border-white/60 p-6">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">{t("expectation_label")}</p>
        <svg viewBox="0 0 100 40" className="w-full">
          <path d="M10,35 L90,5" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
          <circle cx="10" cy="35" r="3" fill="#94a3b8" />
          <circle cx="90" cy="5" r="3" fill="#94a3b8" />
        </svg>
        <p className="text-[10px] text-slate-500 mt-4 text-center font-black italic tracking-widest uppercase opacity-60">{t("expectation_desc")}</p>
      </div>

      <div className="rounded-3xl bg-rose-50 border border-rose-100 p-6">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-450 mb-4">{t("reality_label")}</p>
        <svg viewBox="0 0 100 40" className="w-full">
          <path d="M10,35 C20,5 30,45 40,15 C50,0 60,40 70,10 C80,25 90,5 90,5" fill="none" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="10" cy="35" r="3" fill="#e11d48" />
          <circle cx="90" cy="5" r="3" fill="#e11d48" />
        </svg>
        <p className="text-[10px] text-rose-600 mt-4 text-center font-black italic tracking-widest uppercase">{t("reality_desc")}</p>
      </div>
    </div>
  );
}

function Screen2({ onNext, t }: { onNext: () => void; t: any }) {
  return (
    <div className="flex flex-1 flex-col gap-8">
      <div className="relative overflow-hidden rounded-[3rem] bg-white/70 backdrop-blur-xl border border-white/80 p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] min-h-[450px]">
        <span className="inline-block rounded-full bg-rose-100 text-rose-600 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest mb-6">
          {t("screen2_tag")}
        </span>
        <h1 className="text-3xl font-black text-slate-800 mb-4">{t("screen2_title")}</h1>
        <p className="text-slate-655 font-medium text-base mb-8 leading-relaxed">
          {t("screen2_desc")}
        </p>
        <GriefGraph t={t} />
        <p className="text-slate-400 text-xs mt-10 text-center italic font-bold leading-relaxed max-w-[250px] mx-auto">
          {t("screen2_quote")}
        </p>
      </div>
      <button
        onClick={onNext}
        className="w-full bg-slate-900 text-white shadow-md py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:opacity-90 hover:shadow-xl hover:shadow-primary/40 transition-all flex items-center justify-center gap-3"
      >
        {t("btn_one_more")}
        <ChevronRight size={20} strokeWidth={3} />
      </button>
    </div>
  );
}

function TruthCard({ emoji, title, body }: { emoji: string; title: string; body: string }) {
  return (
    <div className="rounded-3xl border border-white/60 bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 p-6 group hover:bg-white hover:border-primary/20 transition-all">
      <p className="font-black text-slate-800 text-base mb-2 flex items-center gap-3">
        <span className="text-2xl group-hover:scale-110 transition-transform">{emoji}</span> {title}
      </p>
      <p className="text-sm text-slate-500 leading-relaxed font-medium">{body}</p>
    </div>
  );
}

function Screen3({ onNext, t }: { onNext: () => void; t: any }) {
  const truths = t("truths", { returnObjects: true }) as any[];
  return (
    <div className="flex flex-1 flex-col gap-8">
      <div className="relative overflow-hidden rounded-[3rem] bg-white/70 backdrop-blur-xl border border-white/80 p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] min-h-[450px]">
        <span className="inline-block rounded-full bg-emerald-100 text-emerald-600 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest mb-6">
          {t("screen3_tag")}
        </span>
        <h1 className="text-3xl font-black text-slate-800 mb-8">{t("screen3_title")}</h1>

        <div className="space-y-6">
          {Array.isArray(truths) && truths.map((truth, i) => (
            <TruthCard
              key={i}
              emoji={truth.emoji}
              title={truth.title}
              body={truth.body}
            />
          ))}
        </div>
      </div>
      <button
        onClick={onNext}
        className="w-full bg-slate-900 text-white shadow-md py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:opacity-90 hover:shadow-xl hover:shadow-primary/40 transition-all flex items-center justify-center gap-3"
      >
        {t("btn_finish")}
        <ChevronRight size={20} strokeWidth={3} />
      </button>
    </div>
  );
}

function GriefInner() {
  const { t } = useTranslation(undefined, { i18n });
  const [screen, setScreen] = useState(0);

  // Sync lang param
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const lang = params.get('lang') || 'en';
      loadLocale(lang);
    }
  }, []);

  const handleRestart = () => {
    setScreen(0);
  };

  if (screen === 3) {
    return (
      <PremiumLayout title={t("app_title")}>
        <PremiumComplete
          title={t("app_title")}
          message={t("complete_message")}
          onRestart={handleRestart}
                  shareEmoji="️"
                  shareContent={"I just completed 'Grief Journey Map' on TherapyMantra — a guided grief processing that genuinely helped me. Try it! \n\n Android: https://play.google.com/store/apps/details?id=org.mantracare.therapy\n iOS: https://apps.apple.com/pk/app/therapymantra/id1607643888"}
        />
      </PremiumLayout>
    );
  }

  return (
    <PremiumLayout
      title={t("app_title")}
      subtitle={t("app_subtitle", { current: screen + 1, total: TOTAL_SCREENS })}
      icon={<Compass className="w-6 h-6 text-primary" />}
      onBack={screen > 0 ? () => setScreen(prev => prev - 1) : undefined}
      onReset={screen > 0 ? handleRestart : undefined}
    >
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-4 min-h-[70vh]">
        <div className="flex justify-center gap-2 mb-10">
          {Array.from({ length: TOTAL_SCREENS }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${i <= screen ? "w-8 bg-primary" : "w-2 bg-slate-200"}`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex-1 flex flex-col"
          >
            {screen === 0 && <Screen1 onNext={() => setScreen(1)} t={t} />}
            {screen === 1 && <Screen2 onNext={() => setScreen(2)} t={t} />}
            {screen === 2 && <Screen3 onNext={() => setScreen(3)} t={t} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
}

export default function GriefJourneyMapPage() {
  return (
    <I18nextProvider i18n={i18n}>
      <GriefInner />
    </I18nextProvider>
  );
}