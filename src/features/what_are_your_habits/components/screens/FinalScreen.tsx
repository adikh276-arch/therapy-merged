import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const FinalScreen = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-card rounded-2xl p-8 shadow-sm border border-border text-center flex flex-col items-center gap-6">
      <motion.span
        className="text-5xl"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}
      >
        🌱
      </motion.span>
      <p className="text-base font-semibold text-foreground leading-relaxed">
        {t('final_text')}
      </p>
      <button
        onClick={() => window.location.reload()}
        className="w-full h-[50px] rounded-2xl bg-primary text-primary-foreground font-semibold text-base"
      >
        {t('finish')}
      </button>
    </div>
  );
};

export default FinalScreen;
