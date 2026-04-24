import { useTranslation } from "react-i18next";
import { PremiumIntro } from "../../../../components/shared/PremiumIntro";
import { Heart, History } from "lucide-react";
import { motion } from "framer-motion";

interface IntroScreenProps {
  onBegin: () => void;
  onHistory: () => void;
}

const IntroScreen = ({ onBegin, onHistory }: IntroScreenProps) => {
  const { t } = useTranslation();

  return (
    <div className="w-full">
      <PremiumIntro
        title={t("title")}
        description={t("subtitle") + " " + t("intro.text1") + " " + t("intro.text2")}
        onStart={onBegin}
        icon={<Heart size={32} />}
        benefits={[
          "Cultivate gratitude",
          "Reduce stress",
          "Improve well-being"
        ]}
        duration="3-5 minutes"
      >
        <div className="mt-8 text-center">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onHistory}
                className="inline-flex items-center gap-2 text-slate-500 hover:text-primary font-bold text-sm transition-colors"
            >
                <History size={18} />
                {t("intro.viewHistory")}
            </motion.button>
        </div>
      </PremiumIntro>
    </div>
  );
};

export default IntroScreen;
