import { useTranslation } from "react-i18next";
import { Clock, Heart, Home } from "lucide-react";
import { PremiumComplete } from "../../../components/shared/PremiumComplete";
import { motion } from "framer-motion";

interface Props {
  onDone: () => void;
  onHistory: () => void;
}

const Confirmation = ({ onDone, onHistory }: Props) => {
  const { t } = useTranslation();

  return (
    <PremiumComplete
        title={t("vibeLogged")}
        message={t("thankYou")}
        onRestart={onDone}
        icon={<Heart size={48} fill="currentColor" className="text-primary" />}
    >
        <div className="flex flex-col gap-4 mt-8">
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onDone}
                className="w-full py-5 rounded-[2rem] bg-primary text-primary-foreground font-black text-lg shadow-xl shadow-primary/20 hover:shadow-2xl transition-all flex items-center justify-center gap-3"
            >
                <Home size={20} />
                {t("done")}
            </motion.button>

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onHistory}
                className="w-full py-4 rounded-[2rem] bg-slate-50 text-slate-400 font-bold flex items-center justify-center gap-2"
            >
                <Clock size={18} />
                {t("viewHistory")}
            </motion.button>
        </div>
    </PremiumComplete>
  );
};

export default Confirmation;

