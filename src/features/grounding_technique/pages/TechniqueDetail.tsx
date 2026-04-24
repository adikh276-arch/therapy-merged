import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, ChevronLeft, Sparkles, Wind } from "lucide-react";
import { techniques } from "../data/techniques";
import { useTranslation } from "../hooks/useTranslation";
import { motion, AnimatePresence } from "framer-motion";

export default function TechniqueDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, currentLang } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);

  const technique = techniques.find((tech) => tech.id === id);

  if (!technique) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-slate-400 font-bold">{t("Technique not found")}</p>
      </div>
    );
  }

  const langParam = currentLang !== "en" ? `?lang=${currentLang}` : "";
  const totalSteps = technique.steps.length;
  const isLastStep = currentStep >= totalSteps - 1;
  const isFirstStep = currentStep === 0;

  return (
    <div className="flex flex-col items-center py-6 pb-24">
      <div className="w-full max-w-lg space-y-8">
        <header className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/")}
            className="p-3 bg-slate-100 text-slate-600 rounded-2xl hover:bg-slate-200 transition-colors shadow-sm"
          >
            <ArrowLeft size={20} />
          </motion.button>
          <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest">
            <Sparkles size={12} />
            Grounding Technique
          </div>
        </header>

        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold text-slate-900 leading-tight">
            {t(technique.title)}
          </h1>
          
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                    className="h-full bg-primary"
                />
            </div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Step {currentStep + 1} of {totalSteps}
            </span>
          </div>
        </div>

        <div className="relative min-h-[300px] flex items-center justify-center">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.05, y: -20 }}
                    className="w-full p-10 bg-white rounded-[3rem] border-2 border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col items-center text-center gap-8"
                >
                    <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary">
                        <Wind size={40} />
                    </div>
                    <p className="text-slate-700 text-xl font-bold leading-relaxed">
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
                            className="p-5 bg-white border-2 border-slate-100 text-slate-400 rounded-[2rem] shadow-sm flex items-center justify-center"
                        >
                            <ChevronLeft size={24} />
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
                    {isLastStep ? t("I Feel More Grounded") : t("Next")}
                    {!isLastStep && <ChevronRight size={20} />}
                </motion.button>
            </div>

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/${langParam}`)}
                className="w-full py-4 rounded-[2rem] bg-slate-50 text-slate-400 font-bold flex items-center justify-center gap-2"
            >
                {t("Choose Another Technique")}
            </motion.button>
        </div>
      </div>
    </div>
  );
}
