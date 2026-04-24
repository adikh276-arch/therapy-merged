import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronRight, ChevronLeft, Sparkles, Wind, Loader2 } from "lucide-react";
import { techniques } from "../data/techniques";
import { useTranslation } from "../hooks/useTranslation";
import { motion, AnimatePresence } from "framer-motion";
import { PremiumLayout } from "../../../components/shared/PremiumLayout";

export default function TechniqueDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, currentLang } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);

  const technique = techniques.find((tech) => tech.id === id);

  if (!technique) {
    return (
      <PremiumLayout title="Grounding Detail">
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary opacity-20" />
          <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest">{t("Technique not found")}</p>
        </div>
      </PremiumLayout>
    );
  }

  const langParam = currentLang !== "en" ? `?lang=${currentLang}` : "";
  const totalSteps = technique.steps.length;
  const isLastStep = currentStep >= totalSteps - 1;
  const isFirstStep = currentStep === 0;

  return (
    <PremiumLayout 
      title="Grounding Activity" 
      onSecondaryBack={() => navigate(`/${langParam}`)}
      secondaryBackLabel="Back to list"
    >
      <div className="w-full space-y-10 pb-12">
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.2em]">
            <Sparkles size={14} />
            Grounding Technique
          </div>
          <h1 className="text-4xl font-black text-slate-900 leading-tight tracking-tight">
            {t(technique.title)}
          </h1>
          
          <div className="flex items-center gap-4">
            <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                    className="h-full bg-primary shadow-[0_0_12px_rgba(var(--primary),0.3)]"
                />
            </div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest tabular-nums">
                {currentStep + 1} / {totalSteps}
            </span>
          </div>
        </div>

        <div className="relative min-h-[340px] flex items-center justify-center">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.05, y: -20 }}
                    className="w-full p-12 bg-white rounded-[3rem] border-2 border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col items-center text-center gap-10 group hover:border-primary/20 transition-all"
                >
                    <div className="w-24 h-24 rounded-[2.5rem] bg-primary/10 flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
                        <Wind size={48} strokeWidth={1.5} />
                    </div>
                    <p className="text-slate-700 text-2xl font-black leading-tight tracking-tight px-4">
                        {t(technique.steps[currentStep])}
                    </p>
                </motion.div>
            </AnimatePresence>
        </div>

        <div className="flex flex-col gap-4">
            <div className="flex gap-4">
                <AnimatePresence initial={false}>
                    {!isFirstStep && (
                        <motion.button
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setCurrentStep((s) => s - 1)}
                            className="p-5 bg-white border-2 border-slate-100 text-slate-400 rounded-[2rem] shadow-sm flex items-center justify-center hover:text-slate-800 hover:border-slate-200 transition-all"
                        >
                            <ChevronLeft size={28} strokeWidth={3} />
                        </motion.button>
                    )}
                </AnimatePresence>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                        if (isLastStep) {
                            navigate(`/${langParam}`);
                        } else {
                            setCurrentStep((s) => s + 1);
                        }
                    }}
                    className="flex-1 py-5 rounded-[2rem] bg-primary text-primary-foreground font-black text-lg shadow-xl shadow-primary/20 hover:shadow-2xl transition-all flex items-center justify-center gap-3"
                >
                    {isLastStep ? t("I Feel More Grounded") : t("Next Step")}
                    {!isLastStep && <ChevronRight size={20} strokeWidth={3} />}
                </motion.button>
            </div>
        </div>
      </div>
    </PremiumLayout>
  );
}
