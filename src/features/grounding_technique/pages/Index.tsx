import { useNavigate } from "react-router-dom";
import { techniques } from "../data/techniques";
import { useTranslation } from "../hooks/useTranslation";
import GroundingCard from "../components/GroundingCard";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { PremiumLayout } from "../../../components/shared/PremiumLayout";

const Index = () => {
  const navigate = useNavigate();
  const { t, currentLang } = useTranslation();

  const langParam = currentLang !== "en" ? `?lang=${currentLang}` : "";

  return (
    <PremiumLayout title="Grounding Techniques">
      <div className="w-full space-y-10">
        <header className="space-y-4">
          <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.2em]">
            <Sparkles size={14} />
            {t("Grounding")}
          </div>
          <h1 className="text-4xl font-black text-slate-900 leading-tight tracking-tight">
            Stay Present
          </h1>
          <p className="text-slate-500 text-base font-bold leading-relaxed max-w-md">
            {t("Grounding techniques help bring your attention back to the present moment.")}
            {" "}{t("Choose one activity that feels supportive right now.")}
          </p>
        </header>

        <div className="grid grid-cols-2 gap-6">
          {techniques.map((tech, i) => (
            <motion.div
              key={tech.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              <GroundingCard
                technique={tech}
                label={t(tech.title)}
                onClick={() => navigate(`/technique/${tech.id}${langParam}`)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </PremiumLayout>
  );
};

export default Index;
