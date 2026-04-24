import { PremiumIntro } from "../../../components/shared/PremiumIntro";
import { useTranslation } from "react-i18next";
import { Sparkles, History } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  onStart: () => void;
  onHistory: () => void;
}

const IntroScreen = ({ onStart, onHistory }: Props) => {
  const { t } = useTranslation();

  return (
    <PremiumIntro
      title={t("vibeTracker")}
      description={t("howAreYouFeeling")}
      onStart={onStart}
      icon={<Sparkles size={32} />}
      benefits={[
        "Track your emotional patterns",
        "Reflect on your mood today",
        "Build emotional awareness"
      ]}
      duration="1-2 minutes"
    >
      <div className="mt-8 text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onHistory}
          className="inline-flex items-center gap-2 text-slate-500 hover:text-primary font-bold text-sm transition-colors"
        >
          <History size={18} />
          {t("viewHistory")}
        </motion.button>
      </div>
    </PremiumIntro>
  );
};

export default IntroScreen;
