import { useState, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { PremiumIntro } from "../../../components/shared/PremiumIntro";
import { PremiumComplete } from "../../../components/shared/PremiumComplete";
import { Compass, Eye, Hand, Volume2, Wind, Utensils } from "lucide-react";
import ProgressDots from "../components/ProgressDots";
import GroundingButton from "../components/GroundingButton";
import StepInput from "../components/StepInput";

const stepIcons = [
  <Wind size={32} />,
  <Eye size={32} />,
  <Hand size={32} />,
  <Volume2 size={32} />,
  <Compass size={32} />,
  <Utensils size={32} />,
  <Wind size={32} />
];

const GroundingExercise = () => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<number, string[]>>({});
  const [reflectionWord, setReflectionWord] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const steps = useMemo(() => {
    const stepsData = t("steps", { returnObjects: true }) as any[];
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

  const handleInputChange = (values: string[]) => {
    setResponses((prev) => ({ ...prev, [currentStep]: values }));
  };

  if (submitted) {
    return (
      <PremiumComplete
        title={t("common.thank_you")}
        message={t("common.completion_message")}
        onRestart={() => {
          setCurrentStep(0);
          setResponses({});
          setReflectionWord("");
          setSubmitted(false);
        }}
      >
        {reflectionWord && (
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center">
             <p className="text-slate-500 text-sm mb-1">{t("common.you_feel")}</p>
             <p className="text-2xl font-bold text-primary italic">"{reflectionWord}"</p>
          </div>
        )}
      </PremiumComplete>
    );
  }

  if (currentStep === 0) {
    return (
      <PremiumIntro
        title="Grounding Exercise"
        description={step.body}
        onStart={handleNext}
        icon={stepIcons[0]}
        benefits={[
            "Reduces anxiety quickly",
            "Brings you back to the present",
            "Calms the racing mind"
        ]}
      />
    );
  }

  return (
    <div className="flex flex-col min-h-[60vh]">
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
          {/* Step icon/number */}
          <div className="mb-6">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                {stepIcons[currentStep] || <Compass size={32} />}
            </div>
          </div>

          <h1 className="text-3xl font-extrabold text-slate-900 mb-6">
            {step.heading}
          </h1>

          <div className="max-w-md mb-8">
            {step.body.split("\n\n").map((paragraph: string, i: number) => (
              <p key={i} className="text-slate-600 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Inputs for sense steps */}
          {step.inputCount > 0 && (
            <div className="mb-8 w-full max-w-sm">
              <StepInput
                count={step.inputCount}
                values={responses[currentStep] || []}
                onChange={handleInputChange}
              />
            </div>
          )}

          {/* Reflection input */}
          {step.reflectionPrompt && (
            <div className="mb-8 w-full max-w-sm text-left">
              <label className="block text-sm font-bold text-slate-700 mb-3 ml-1">
                {t("common.reflection_question")}
              </label>
              <input
                type="text"
                value={reflectionWord}
                onChange={(e) => setReflectionWord(e.target.value)}
                placeholder={t("common.reflection_placeholder")}
                className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-base focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
              />
            </div>
          )}

          <div className="mt-auto w-full max-w-xs">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNext}
              className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-2xl shadow-lg shadow-primary/20 hover:shadow-xl transition-all"
            >
              {step.button}
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default GroundingExercise;
