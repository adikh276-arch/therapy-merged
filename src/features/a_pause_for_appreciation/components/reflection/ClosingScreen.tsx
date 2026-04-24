import { useTranslation } from "react-i18next";
import { PremiumComplete } from "../../../../components/shared/PremiumComplete";
import { History, Home } from "lucide-react";
import { motion } from "framer-motion";

interface ClosingScreenProps {
  onSave: () => void;
  onHistory: () => void;
  onExit: () => void;
}

const ClosingScreen = ({ onSave, onHistory, onExit }: ClosingScreenProps) => {
  const { t } = useTranslation();

  return (
    <PremiumComplete
      title={t("closing.title")}
      message={t("closing.text1") + " " + t("closing.text2")}
      onRestart={onExit}
    >
      <div className="flex flex-col gap-3 w-full max-w-md mx-auto mt-8">
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onHistory}
            className="w-full py-5 rounded-[2rem] bg-white border-2 border-slate-100 text-slate-600 font-bold shadow-sm flex items-center justify-center gap-3"
        >
            <History size={20} />
            {t("closing.viewHistory")}
        </motion.button>
        
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onExit}
            className="w-full py-5 rounded-[2rem] bg-slate-50 text-slate-400 font-bold flex items-center justify-center gap-3"
        >
            <Home size={20} />
            {t("closing.exit")}
        </motion.button>
      </div>
    </PremiumComplete>
  );
};

export default ClosingScreen;
