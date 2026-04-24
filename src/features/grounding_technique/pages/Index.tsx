import { useNavigate } from "react-router-dom";
import { techniques } from "../data/techniques";
import { useTranslation } from "../hooks/useTranslation";
import GroundingCard from "../components/GroundingCard";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { t, currentLang } = useTranslation();

  const langParam = currentLang !== "en" ? `?lang=${currentLang}` : "";

  return (
    <div className="flex flex-col items-center py-6 pb-24">
      <div className="w-full max-w-lg space-y-8">
        <header className="space-y-4">
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
            <Sparkles size={14} />
            {t("Grounding")}
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 leading-tight">
            Stay Present
          </h1>
          <p className="text-slate-500 text-base font-medium leading-relaxed">
            {t("Grounding techniques help bring your attention back to the present moment.")}
            {" "}{t("Choose one activity that feels supportive right now.")}
          </p>
        </header>

        <div className="grid grid-cols-2 gap-4">
          {techniques.map((tech, i) => (
            <motion.div
              key={tech.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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
    </div>
  );
};

export default Index;
