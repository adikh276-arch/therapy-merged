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
                onClick={onHistory}
                className="w-full py-5 rounded-[2rem] bg-white border-2 border-slate-100 text-slate-500 font-black text-sm uppercase tracking-widest shadow-xl shadow-slate-200/50 hover:text-primary hover:border-primary/20 transition-all flex items-center justify-center gap-3"
            >
                <Clock size={20} />
                {t("viewHistory")}
            </motion.button>
        </div>
    </PremiumComplete>
  );
};

export default Confirmation;

