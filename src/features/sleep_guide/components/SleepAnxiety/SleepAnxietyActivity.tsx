import { useState } from 'react';
import { Moon, ChevronRight, ChevronLeft } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { motion, AnimatePresence } from "framer-motion";
import TwinklingStars from './TwinklingStars';
import FloatingStars from './FloatingStars';
import CrescentMoon from './CrescentMoon';
import BedIllustration from './BedIllustration';
import BrainIllustration from './BrainIllustration';

const SleepAnxietyActivity = () => {
  const { t } = useTranslation();
  const [screen, setScreen] = useState(0);

  return (
    <PremiumLayout
      title={t("app_title")}
      subtitle={t("app_title")}
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
                    {t("tag")}
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-[#378ADD] font-bold text-sm">{t("screen1.intro")}</p>
                    <h1 className="text-2xl font-black text-[#E6F1FB] leading-tight">
                      {t("screen1.title")}
                    </h1>
                    
                    <div className="bg-[#0C1F35] rounded-2xl p-4 flex gap-4 items-start border border-[#1E3A5F]/50">
                      <BedIllustration />
                      <p className="text-[#85B7EB] text-sm leading-relaxed">
                        {t("screen1.p1")}
                      </p>
                    </div>

                    <p className="text-[#85B7EB] leading-relaxed text-sm">
                      <Trans i18nKey="screen1.p2">{t("this_isn_t_a_weakness_it_s_a_phenomenon_called")}<span className="text-[#B5D4F4] font-bold">sleep anxiety</span> — and it affects millions of people.
                      </Trans>
                    </p>
                  </div>

                  <div className="bg-[#0C447C] border-l-4 border-[#378ADD] rounded-2xl p-6 italic text-[#B5D4F4] text-sm leading-relaxed shadow-sm">
                    {t("screen1.quote")}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setScreen(1)}
                className="w-full bg-[#185FA5] text-[#E6F1FB] py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-blue-900/50 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
              >
                {t("screen1.button")}
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
                    {t("tag")}
                  </div>

                  <div className="space-y-4">
                    <p className="text-[#378ADD] font-bold text-sm">{t("screen2.intro")}</p>
                    <h1 className="text-2xl font-black text-[#E6F1FB] leading-tight">
                      {t("screen2.title")}
                    </h1>

                    <div className="bg-[#0C1F35] rounded-2xl p-4 flex gap-4 items-start border border-[#1E3A5F]/50">
                      <BrainIllustration />
                      <p className="text-[#85B7EB] text-sm leading-relaxed">
                        {t("screen2.p1")}
                      </p>
                    </div>

                    <p className="text-[#85B7EB] leading-relaxed text-sm">
                      <Trans i18nKey="screen2.p2">{t("this_is_called")}<span className="text-[#B5D4F4] font-bold">conditioned arousal</span> — it explains why you feel exhausted all day, yet wide awake at bedtime.
                      </Trans>
                    </p>
                  </div>

                  <div className="bg-[#0C447C] border-l-4 border-[#378ADD] rounded-2xl p-6 italic text-[#B5D4F4] text-sm leading-relaxed shadow-sm">
                    {t("screen2.quote")}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setScreen(0)}
                className="w-full bg-[#185FA5] text-[#E6F1FB] py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-blue-900/50 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
              >
                <ChevronLeft size={20} />
                {t("screen2.button")}
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
};

export default SleepAnxietyActivity;
