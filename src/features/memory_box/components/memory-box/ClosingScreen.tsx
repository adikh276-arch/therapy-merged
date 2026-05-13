import { motion } from "framer-motion";
import ScreenWrapper from "./ScreenWrapper";
import { useTranslation } from "react-i18next";

interface Props {
  onExit: () => void;
}

const ClosingScreen = ({ onExit }: Props) => (
  <ScreenWrapper>
    <div className="space-y-8 max-w-xs">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl"
      >
        🌅
      </motion.div>

      <h2 className="text-2xl font-heading font-semibold text-foreground">{t("before_you_go")}</h2>

      <div className="space-y-4 text-muted-foreground font-body text-base leading-relaxed">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >{t("grief_comes_in_waves")}</motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >{t("what_you_re_feeling_matters")}</motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >{t("be_gentle_with_yourself_today")}</motion.p>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        whileTap={{ scale: 0.97 }}
        onClick={onExit}
        className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-base shadow-sm hover:shadow-md transition-all duration-300"
      >{t("save_exit")}</motion.button>
    </div>
  </ScreenWrapper>
);

export default ClosingScreen;
