import { PremiumIntro } from "../../../../components/shared/PremiumIntro";
import { useTranslation } from "react-i18next";
import { Target, History } from "lucide-react";
import { motion } from "framer-motion";

interface IntroScreenProps {
  onNext: () => void;
  onHistory: () => void;
}

const IntroScreen = ({ onNext, onHistory }: IntroScreenProps) => {
  const { t } = useTranslation();

  return (
    <PremiumIntro
      title={t('intro_title')}
      description={t('intro_p1') + " " + t('intro_p2')}
      onStart={onNext}
      icon={<Target size={32} />}
      benefits={[
        t('intro_breath'),
        t('intro_no_wrong'),
        "Gain clarity on your path"
      ]}
      duration="5-10 minutes"
    >
      <div className="mt-8 text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onHistory}
          className="inline-flex items-center gap-2 text-slate-500 hover:text-primary font-bold text-sm transition-colors"
        >
          <History size={18} />
          {t('intro_past_reflections')}
        </motion.button>
      </div>
    </PremiumIntro>
  );
};

export default IntroScreen;
