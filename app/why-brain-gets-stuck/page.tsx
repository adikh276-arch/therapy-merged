'use client';

import { useState, useEffect } from "react";
import { Brain, ChevronRight, ShieldCheck, Zap, Heart, History } from "lucide-react";
import { useTranslation, I18nextProvider } from "react-i18next";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { PremiumComplete } from "@/components/shared/PremiumComplete";
import { motion, AnimatePresence } from "framer-motion";
import i18n, { loadLocale } from "./i18n";

const TOTAL_SCREENS = 2;

const Screen1 = ({ onNext }: { onNext: () => void }) => {
  const { t } = useTranslation(undefined, { i18n });
  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-white/60 backdrop-blur-lg border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 shadow-xl shadow-slate-200/50 min-h-[400px] flex flex-col justify-center text-center">
        <div className="text-6xl mb-6 animate-bounce-slow"><Brain className="inline-block w-8 h-8" /></div>
        <h1 className="text-2xl font-black text-slate-800 mb-4 leading-tight">
          {t("s1.title", "Your brain didn't break. It adapted.")}
        </h1>
        <p className="text-slate-600 leading-relaxed text-sm mb-6 font-medium">
          {t("s1.description", "After trauma, your brain rewires itself to keep you safe. It learned that the world could be dangerous, so it stayed ready. That's not a flaw. That's survival.")}
        </p>
        <div className="bg-amber-50 rounded-2xl p-6 italic text-amber-900 text-sm leading-relaxed border-l-4 border-amber-400 font-medium">
          {t("s1.quote", "\"PTSD isn't a sign that something is wrong with you. It's a sign that something happened to you.\"")}
        </div>
      </div>
      <button
        onClick={onNext}
        className="act-btn-primary"
      >
        {t("s1.button", "Tell me more")}
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

const Screen2 = () => {
  const { t } = useTranslation(undefined, { i18n });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const truths_data = ((_t => Array.isArray(_t) ? _t : null)(t("s2.truths", { returnObjects: true }))) || [
    {
      header: "The alarm stayed on",
      body: "Hypervigilance and startling easily aren't overreactions — your brain's alarm system is doing its job too well."
    },
    {
      header: "Flashbacks are memory",
      body: "Triggers pull your brain back because it never got the signal that the threat was over. It's trying to protect you."
    },
    {
      header: "Fighting for you",
      body: "Every symptom was once an act of survival. Your brain did what it had to do to keep you alive."
    }
  ];

  const icons = [
    <Zap key="zap" className="text-rose-500" />,
    <History key="history" className="text-blue-500" />,
    <ShieldCheck key="shield" className="text-emerald-500" />,
  ];

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-white/60 backdrop-blur-lg border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 shadow-xl shadow-slate-200/50 min-h-[400px]">
        <span className="inline-block rounded-full bg-slate-100 text-slate-600 px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-4">
          {t("s2.tag", "gentle truths")}
        </span>
        <h1 className="text-2xl font-black text-slate-800 mb-6">{t("s2.title", "Brain survival logic")}</h1>

        <div className="space-y-4">
          {truths_data.map((item, i) => (
            <div
              key={i}
              className="w-full text-left group"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 ${openIndex === i ? "bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 border-slate-200" : "bg-white border-white/60 shadow-sm"}`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-100 group-hover:scale-110 transition-transform">
                    {icons[i]}
                  </div>
                  <span className="font-bold text-slate-700 text-sm">{item.header}</span>
                </div>
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs text-slate-500 mt-4 leading-relaxed font-medium">
                        {item.body}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-emerald-50 rounded-[2rem] p-6 flex items-center gap-4 border border-emerald-100">
        <Heart className="text-emerald-500 shrink-0" />
        <p className="text-emerald-900 text-sm font-bold leading-relaxed">
          {t("s2.healing", "Healing isn't about forgetting. It's about helping your brain learn that you're safe now.")}
        </p>
      </div>
    </div>
  );
};

function WhyBrainGetsStuckInner() {
  const { t } = useTranslation(undefined, { i18n });
  const [screen, setScreen] = useState(0);

  // Sync lang parameter from query
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const lang = params.get('lang') || 'en';
      loadLocale(lang);
    }
  }, []);

  if (screen === TOTAL_SCREENS) {
    return (
      <PremiumLayout
        title={t("app_title", "Why Brain Gets Stuck")}
        showBack={false}
      >
        <div className="w-full max-w-md mx-auto py-4">
          <PremiumComplete
            title={t("app_title", "Why Brain Gets Stuck")}
            message={t("complete.message", "You've taken a powerful step by understanding how your brain works. Knowledge is the first part of healing.")}
            onRestart={() => setScreen(0)}
            shareEmoji="🧠"
            shareContent={`I just learned about "Why the Brain Gets Stuck" on TherapyMantra — understanding survival logic really helps. \n\n Android: https://play.google.com/store/apps/details?id=org.mantracare.therapy\n iOS: https://apps.apple.com/pk/app/therapymantra/id1607643888`}
          />
        </div>
      </PremiumLayout>
    );
  }

  return (
    <PremiumLayout
      title={t("app_title", "Why Brain Gets Stuck")}
      subtitle={t("app_subtitle", { step: screen + 1, total: TOTAL_SCREENS, defaultValue: `The logic of survival • ${screen + 1}/${TOTAL_SCREENS}` })}
      icon={<Brain className="w-6 h-6 text-primary" />}
      onBack={screen > 0 ? () => setScreen(0) : undefined}
    >
      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(-5%); animation-timing-function: cubic-bezier(0.8,0,1,1); }
          50% { transform: none; animation-timing-function: cubic-bezier(0,0,0.2,1); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite;
        }
      `}</style>
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-4">
        <div className="flex justify-center gap-2 mb-8">
          {[0, 1].map((i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${i === screen ? "w-8 bg-primary" : "w-2 bg-slate-200"}`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col"
          >
            {screen === 0 && <Screen1 onNext={() => setScreen(1)} />}
            {screen === 1 && (
              <div className="flex flex-col gap-6 w-full">
                <Screen2 />
                <button
                  onClick={() => setScreen(2)}
                  className="act-btn-primary"
                >
                  {t("s2.finish_reading", "Finish Reading")}
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
}

export default function WhyBrainGetsStuckPage() {
  return (
    <I18nextProvider i18n={i18n}>
      <WhyBrainGetsStuckInner />
    </I18nextProvider>
  );
}