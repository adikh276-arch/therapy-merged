'use client';

import { useState, useEffect } from 'react';
import { Moon, ChevronRight, ChevronLeft, Star } from "lucide-react";
import { useTranslation, I18nextProvider } from 'react-i18next';
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { motion, AnimatePresence } from "framer-motion";
import i18n, { loadLocale } from './i18n';

// CrescentMoon Illustration
const CrescentMoon = () => (
  <div style={{ position: 'absolute', top: 20, right: 24, zIndex: 0 }}>
    <div style={{ position: 'relative', width: 36, height: 36 }}>
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: 'rgba(230,241,251,0.15)',
          position: 'absolute',
        }}
      />
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: '50%',
          background: '#112240',
          position: 'absolute',
          top: 2,
          left: -6,
        }}
      />
    </div>
  </div>
);

// TwinklingStars Illustration
const stars = [
  { top: '8%', left: '15%', size: 8, duration: 2.5, delay: 0 },
  { top: '12%', left: '55%', size: 7, duration: 3, delay: 0.8 },
  { top: '6%', left: '80%', size: 9, duration: 2, delay: 1.5 },
  { top: '18%', left: '35%', size: 10, duration: 3.5, delay: 0.3 },
  { top: '10%', left: '70%', size: 7, duration: 2.8, delay: 2 },
];

const TwinklingStars = () => (
  <>
    {stars.map((s, i) => (
      <span
        key={i}
        style={{
          position: 'absolute',
          top: s.top,
          left: s.left,
          fontSize: s.size,
          color: '#B5D4F4',
          animation: `twinkle ${s.duration}s ease-in-out infinite`,
          animationDelay: `${s.delay}s`,
          zIndex: 0,
        }}
      ><Star className="inline-block w-8 h-8" /></span>
    ))}
  </>
);

// FloatingStars Illustration
const floaters = [
  { left: '20%', size: 9, duration: 7, delay: 0 },
  { left: '50%', size: 8, duration: 6, delay: 2 },
  { left: '75%', size: 11, duration: 9, delay: 1 },
  { left: '35%', size: 10, duration: 8, delay: 3.5 },
];

const FloatingStars = () => (
  <>
    {floaters.map((s, i) => (
      <span
        key={i}
        style={{
          position: 'absolute',
          bottom: 70,
          left: s.left,
          fontSize: s.size,
          color: '#B5D4F4',
          animation: `floatUp ${s.duration}s linear infinite`,
          animationDelay: `${s.delay}s`,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      ><Star className="inline-block w-8 h-8" /></span>
    ))}
  </>
);

// BedIllustration
const BedIllustration = () => (
  <svg width="72" height="60" viewBox="0 0 72 60" fill="none" style={{ flexShrink: 0 }}>
    <rect x="4" y="30" width="64" height="20" rx="4" fill="#1E3A5F" />
    <rect x="8" y="26" width="20" height="12" rx="4" fill="#185FA5" opacity="0.7" />
    <circle cx="18" cy="22" r="7" fill="#FAC775" />
    <rect x="22" y="30" width="30" height="10" rx="3" fill="#378ADD" opacity="0.5" />
    <circle cx="20" cy="21" r="1.5" fill="#112240" />
    <circle cx="40" cy="10" r="12" fill="#0C447C" opacity="0.8" />
    <circle cx="32" cy="18" r="3" fill="#0C447C" opacity="0.6" />
    <circle cx="28" cy="22" r="2" fill="#0C447C" opacity="0.4" />
    <circle cx="40" cy="10" r="7" stroke="#378ADD" strokeWidth="1" fill="none" />
    <line x1="40" y1="10" x2="40" y2="5" stroke="#B5D4F4" strokeWidth="1" strokeLinecap="round" />
    <line x1="40" y1="10" x2="44" y2="12" stroke="#B5D4F4" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

// BrainIllustration
const BrainIllustration = () => (
  <svg width="72" height="60" viewBox="0 0 72 60" fill="none" style={{ flexShrink: 0 }}>
    <path
      d="M36 8C24 8 16 16 16 26C16 36 24 44 36 44C48 44 56 36 56 26C56 16 48 8 36 8Z"
      fill="#185FA5"
      opacity="0.5"
    />
    <path d="M24 22C28 18 32 24 36 20C40 16 44 22 48 20" stroke="#378ADD" strokeWidth="1" strokeDasharray="3 2" fill="none" />
    <path d="M22 30C26 26 30 32 36 28C42 24 46 30 50 28" stroke="#378ADD" strokeWidth="1" strokeDasharray="3 2" fill="none" />
    <path d="M26 36C30 32 34 38 38 34C42 30 46 36 48 34" stroke="#378ADD" strokeWidth="1" strokeDasharray="3 2" fill="none" />
    <circle cx="48" cy="14" r="6" fill="#BA7517" opacity="0.3" />
    <text x="48" y="17" textAnchor="middle" fill="#FAC775" fontSize="10" fontWeight="bold">!</text>
    <polyline points="8,52 20,52 24,46 28,56 32,48 36,52 44,52" stroke="#378ADD" strokeWidth="1.5" fill="none" />
    <line x1="44" y1="52" x2="64" y2="52" stroke="#1E3A5F" strokeWidth="1.5" />
  </svg>
);

function SleepGuideInner() {
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

  const renderFormatted = (text: string) => {
    const parts = text.split(/<1>|<\/1>/);
    if (parts.length >= 3) {
      return (
        <>
          {parts[0]}<span className="text-[#B5D4F4] font-bold">{parts[1]}</span>{parts[2]}
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
              <div className="relative overflow-hidden rounded-[2.5rem] bg-[#112240] border border-[#1E3A5F] p-8 shadow-2xl min-h-[480px]">
                <div className="absolute top-[-40px] right-[-40px] w-48 h-48 rounded-full bg-[#1E4D8C] opacity-30 blur-3xl" />
                <CrescentMoon />
                <TwinklingStars />
                <FloatingStars />
                
                <div className="relative z-10 space-y-6">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-[#0C447C] text-[#85B7EB] text-[10px] font-black uppercase tracking-widest">
                    {t("tag", "PSYCHOEDUCATION")}
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-[#378ADD] font-bold text-sm">{t("screen1.intro", "The harder you try, the harder it gets.")}</p>
                    <h1 className="text-2xl font-black text-[#E6F1FB] leading-tight">
                      {t("screen1.title", "Trying to force yourself to sleep is exactly what keeps you awake.")}
                    </h1>
                    
                    <div className="bg-[#0C1F35] rounded-2xl p-4 flex gap-4 items-start border border-[#1E3A5F]/50">
                      <BedIllustration />
                      <p className="text-[#85B7EB] text-sm leading-relaxed">
                        {t("screen1.p1", "You lie down, close your eyes — and your brain switches on. Replaying conversations. Watching the clock.")}
                      </p>
                    </div>

                    <p className="text-[#85B7EB] leading-relaxed text-sm">
                      {renderFormatted(t("screen1.p2", "This isn't a weakness. It's a phenomenon called <1>sleep anxiety</1> — and it affects millions of people."))}
                    </p>
                  </div>

                  <div className="bg-[#0C447C] border-l-4 border-[#378ADD] rounded-2xl p-6 italic text-[#B5D4F4] text-sm leading-relaxed shadow-sm">
                    {t("screen1.quote", "\"Sleep anxiety isn't about not being tired. It's about your nervous system being stuck in 'on' mode.\"")}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setScreen(1)}
                className="w-full bg-[#185FA5] text-[#E6F1FB] py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-blue-900/50 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
              >
                {t("screen1.button", "Learn More")}
                <ChevronRight size={20} />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="screen2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col gap-6"
            >
              <div className="relative overflow-hidden rounded-[2.5rem] bg-[#112240] border border-[#1E3A5F] p-8 shadow-2xl min-h-[480px]">
                <div className="absolute bottom-[-40px] left-[-40px] w-48 h-48 rounded-full bg-[#0C447C] opacity-30 blur-3xl" />
                <CrescentMoon />
                <TwinklingStars />
                <FloatingStars />

                <div className="relative z-10 space-y-6">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-[#0C447C] text-[#85B7EB] text-[10px] font-black uppercase tracking-widest">
                    {t("tag", "PSYCHOEDUCATION")}
                  </div>

                  <div className="space-y-4">
                    <p className="text-[#378ADD] font-bold text-sm">{t("screen2.intro", "Here's the science behind it.")}</p>
                    <h1 className="text-2xl font-black text-[#E6F1FB] leading-tight">
                      {t("screen2.title", "Your brain has learned to treat your bed as a place of stress — not rest.")}
                    </h1>

                    <div className="bg-[#0C1F35] rounded-2xl p-4 flex gap-4 items-start border border-[#1E3A5F]/50">
                      <BrainIllustration />
                      <p className="text-[#85B7EB] text-sm leading-relaxed">
                        {t("screen2.p1", "Your amygdala — the brain's threat detector — stays activated at night, signalling danger the moment your head hits the pillow.")}
                      </p>
                    </div>

                    <p className="text-[#85B7EB] leading-relaxed text-sm">
                      {renderFormatted(t("screen2.p2", "This is called <1>conditioned arousal</1> — it explains why you feel exhausted all day, yet wide awake at bedtime."))}
                    </p>
                  </div>

                  <div className="bg-[#0C447C] border-l-4 border-[#378ADD] rounded-2xl p-6 italic text-[#B5D4F4] text-sm leading-relaxed shadow-sm">
                    {t("screen2.quote", "\"Your brain isn't broken. It has simply learned the wrong lesson about bedtime — and it can be retaught.\"")}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setScreen(0)}
                className="w-full bg-[#185FA5] text-[#E6F1FB] py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-blue-900/50 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
              >
                <ChevronLeft size={20} />
                {t("screen2.button", "Previous Step")}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-center gap-2 mt-8">
          <div className={`h-2 rounded-full transition-all duration-300 ${screen === 0 ? "w-8 bg-[#378ADD]" : "w-2 bg-slate-700"}`} />
          <div className={`h-2 rounded-full transition-all duration-300 ${screen === 1 ? "w-8 bg-[#378ADD]" : "w-2 bg-slate-700"}`} />
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
