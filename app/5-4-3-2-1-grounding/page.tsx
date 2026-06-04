'use client';

import { useState, useCallback, useEffect, useMemo } from "react";
import { useTranslation, I18nextProvider } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Eye, Hand, Volume2, Wind, Utensils } from "lucide-react";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { PremiumIntro } from "@/components/shared/PremiumIntro";
import { PremiumComplete } from "@/components/shared/PremiumComplete";
import i18n, { loadLocale } from "./i18n";

const stepIcons = [
  <Wind key="0" size={32} />,
  <Eye key="1" size={32} />,
  <Hand key="2" size={32} />,
  <Volume2 key="3" size={32} />,
  <Compass key="4" size={32} />,
  <Utensils key="5" size={32} />,
  <Wind key="6" size={32} />
];

function ProgressDots({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-2 rounded-full transition-all duration-300 ${
            i === current ? "w-8 bg-primary" : "w-2 bg-slate-200"
          }`}
        />
      ))}
    </div>
  );
}

function GroundingInner() {
  const { t } = useTranslation(undefined, { i18n });
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<number, string[]>>({});
  const [reflectionWord, setReflectionWord] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Sync lang param
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const lang = params.get('lang') || 'en';
      loadLocale(lang);
    }
  }, []);

  const steps = useMemo(() => {
    const stepsData = t("steps", { returnObjects: true }) as any[];
    if (!Array.isArray(stepsData)) return [];

    const config = [
      { inputCount: 0 },
      { inputCount: 5 },
      { inputCount: 4 },
      { inputCount: 3 },
      { inputCount: 2 },
      { inputCount: 1 },
      { inputCount: 0, reflectionPrompt: true },
    ];
    return stepsData.map((s, i) => ({
      ...s,
      ...config[i]
    }));
  }, [t]);

  const totalSteps = steps.length;
  const step = steps[currentStep];

  const handleNext = useCallback(() => {
    if (currentStep === totalSteps - 1) {
      setSubmitted(true);
      return;
    }
    setCurrentStep((s) => s + 1);
  }, [currentStep, totalSteps]);

  const handleInputChange = (index: number, val: string) => {
    setResponses((prev) => {
      const currentVals = [...(prev[currentStep] || [])];
      currentVals[index] = val;
      return { ...prev, [currentStep]: currentVals };
    });
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setResponses({});
    setReflectionWord("");
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <PremiumLayout title={t("app_title")}>
        <PremiumComplete
          title={t("app_title")}
          message={t("common.completion_message")}
          onRestart={handleRestart}
          icon={<Compass size={48} />}
                  shareEmoji=""
                  shareContent={"I just completed '5-4-3-2-1 Grounding' on TherapyMantra — a guided grounding technique that genuinely helped me. Try it! \n\n Android: https://play.google.com/store/apps/details?id=org.mantracare.therapy\n iOS: https://apps.apple.com/pk/app/therapymantra/id1607643888"}
        >
          {reflectionWord && (
            <div className="bg-white p-6 rounded-2xl border border-white/60 shadow-sm text-center mt-6">
               <p className="text-slate-500 text-sm mb-1">{t("common.you_feel", "You feel")}</p>
               <p className="text-2xl font-bold text-primary italic">"{reflectionWord}"</p>
            </div>
          )}
        </PremiumComplete>
      </PremiumLayout>
    );
  }

  if (totalSteps === 0) return null;

  if (currentStep === 0) {
    return (
      <PremiumLayout title={t("app_title")}>
        <PremiumIntro
          title={t("app_title")}
          description={step.body}
          onStart={handleNext}
          icon={stepIcons[0]}
          benefits={[t('intro_p1'), t('intro_p2'), t('intro_p3')]}
        />
      </PremiumLayout>
    );
  }

  return (
    <PremiumLayout 
      title={t("app_title")}
      onReset={handleRestart}
    >
      <div className="flex flex-col min-h-[60vh] max-w-md mx-auto py-4">
        {/* Progress */}
        <div className="mb-8 flex justify-center">
          <ProgressDots total={totalSteps} current={currentStep} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col items-center text-center"
          >
            {/* Step icon */}
            <div className="mb-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  {stepIcons[currentStep] || <Compass size={32} />}
              </div>
            </div>

            <h1 className="text-3xl font-extrabold text-slate-900 mb-6 leading-tight">
              {step.heading}
            </h1>

            <div className="max-w-md mb-8">
              {step.body.split("\n\n").map((paragraph: string, i: number) => (
                <p key={i} className="text-slate-600 leading-relaxed mb-4 text-base">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Inputs for sense steps */}
            {step.inputCount > 0 && (
              <div className="mb-8 w-full max-w-sm space-y-3">
                {Array.from({ length: step.inputCount }).map((_, i) => (
                  <div key={i}>
                    <input
                      type="text"
                      value={(responses[currentStep] || [])[i] || ""}
                      onChange={(e) => handleInputChange(i, e.target.value)}
                      placeholder={`${i + 1}.`}
                      className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-base focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Reflection input */}
            {step.reflectionPrompt && (
              <div className="mb-8 w-full max-w-sm text-left">
                <label className="block text-sm font-bold text-slate-700 mb-3 ml-1">
                  {t("common.reflection_question", "How do you feel after this grounding practice?")}
                </label>
                <input
                  type="text"
                  value={reflectionWord}
                  onChange={(e) => setReflectionWord(e.target.value)}
                  placeholder={t("common.reflection_placeholder", "Calmer, grounded...")}
                  className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-base focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                />
              </div>
            )}

            <div className="mt-auto w-full max-w-xs">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNext}
                className="act-btn-primary"
              >
                {step.button}
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
}

export default function GroundingPage() {
  return (
    <I18nextProvider i18n={i18n}>
      <GroundingInner />
    </I18nextProvider>
  );
}