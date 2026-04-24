import { PremiumIntro } from "../../../components/shared/PremiumIntro";
import { useTranslation } from "react-i18next";
import { Heart, History } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const IntroScreen = ({ onStart }: { onStart: () => void }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <PremiumIntro
      title={t("gratitude.heading")}
      description={t("gratitude.subheading")}
      onStart={onStart}
      icon={<Heart size={32} />}
      benefits={[
        "Improve your emotional wellbeing",
        "Focus on the positive things",
        "Build a lasting habit of gratitude"
      ]}
      duration="2-3 minutes"
    >
      <div className="mt-8 text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("history")}
          className="inline-flex items-center gap-2 text-slate-500 hover:text-primary font-bold text-sm transition-colors"
        >
          <History size={18} />
          {t("review.history")}
        </motion.button>
      </div>
    </PremiumIntro>
  );
};

export default IntroScreen;
