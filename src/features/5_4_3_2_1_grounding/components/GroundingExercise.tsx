import { useState, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import ProgressDots from "../components/ProgressDots";
import GroundingButton from "../components/GroundingButton";
import StepInput from "../components/StepInput";

const GroundingExercise = () => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<number, string[]>>({});
  const [reflectionWord, setReflectionWord] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  // Memoize STEPS to avoid recreation and use translations
  const steps = useMemo(() => {
    // We expect the JSON to have an array "steps" with heading, body, button
    // The English version is the source of truth for the length and structure
    const stepsData = t("steps", { returnObjects: true }) as any[];

    // The original logic had inputCount and reflectionPrompt in the static STEPS array.
    // We'll overlay those onto the translated data.
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
    setAnimKey((k) => k + 1);
  }, [currentStep, totalSteps]);

  const handleInputChange = (values: string[]) => {
    setResponses((prev) => ({ ...prev, [currentStep]: values }));
  };

  if (submitted) {
    return (
      <div className=" flex items-center justify-center bg-transparent px-6">
        <div className="text-center w-full fade-in">
          <div className="w-20 h-20 rounded-full bg-accent mx-auto mb-8 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent-foreground">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <h2 className="font-display text-3xl font-light text-foreground mb-4">
            {t("common.thank_you")}
          </h2>
          {reflectionWord && (
            <p className="font-body text-muted-foreground text-sm mb-6">
              {t("common.you_feel")} <span className="text-foreground font-medium italic">{reflectionWord}</span>
            </p>
          )}
          <p className="font-body text-muted-foreground text-sm leading-relaxed mb-10">
            {t("common.completion_message")}
          </p>
          <GroundingButton
            variant="secondary"
            onClick={() => {
              setCurrentStep(0);
              setResponses({});
              setReflectionWord("");
              setSubmitted(false);
              setAnimKey((k) => k + 1);
            }}
          >
            {t("common.start_again")}
          </GroundingButton>
        </div>
      </div>
    );
  }

  return (
    <div className=" flex flex-col bg-transparent">
      {/* Breathing circle background decoration */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full bg-accent/50 breathing-circle" />
      </div>

      {/* Progress */}
      <div className="relative z-10 pt-8 px-6 flex justify-center">
        <ProgressDots total={totalSteps} current={currentStep} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 pb-12" key={animKey}>
        <div className="w-full w-full text-center">
          {/* Step number badge for sense steps */}
          {(step.inputCount ?? 0) > 0 && (
            <div className="fade-in mb-6">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent text-accent-foreground font-display text-lg">
                {step.inputCount}
              </span>
            </div>
          )}

          {/* Heading */}
          {step.heading && (
            <h1 className="font-display text-3xl md:text-4xl font-light text-foreground mb-6 fade-in">
              {step.heading}
            </h1>
          )}

          {/* Body text */}
          <div className="fade-in-delayed">
            {step.body.split("\n\n").map((paragraph: string, i: number) => (
              <p
                key={i}
                className={`font-body text-sm md:text-base leading-relaxed text-muted-foreground ${i < step.body.split("\n\n").length - 1 ? "mb-4" : "mb-8"
                  } ${currentStep === 0 ? "text-base md:text-lg" : ""}`}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Inputs for sense steps */}
          {step.inputCount > 0 && (
            <div className="mb-8 fade-in-delayed">
              <StepInput
                count={step.inputCount}
                values={responses[currentStep] || []}
                onChange={handleInputChange}
              />
            </div>
          )}

          {/* Reflection input */}
          {step.reflectionPrompt && (
            <div className="mb-8 fade-in-delayed w-full mx-auto">
              <p className="font-body text-xs text-muted-foreground mb-3 tracking-wide uppercase">
                {t("common.reflection_question")}
              </p>
              <input
                type="text"
                value={reflectionWord}
                onChange={(e) => setReflectionWord(e.target.value)}
                placeholder={t("common.reflection_placeholder")}
                className="w-full bg-card border border-border rounded-lg px-4 py-3 font-body text-sm text-foreground text-center placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-300"
              />
            </div>
          )}

          {/* Action button */}
          <div className="fade-in-delayed" style={{ animationDelay: "0.5s" }}>
            <GroundingButton onClick={handleNext}>
              {step.button}
            </GroundingButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroundingExercise;
