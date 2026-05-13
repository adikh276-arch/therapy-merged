import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface Props {
  onTryAnother: () => void;
  onDone: () => void;
}

const CompletionScreen = ({ onTryAnother, onDone }: Props) => (
  <div className="glass-card p-8 text-center space-y-6">
    <motion.div
      initial={{ scale: 0, rotate: -20 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="text-5xl"
    >
      🤝
    </motion.div>

    <h1 className="font-heading text-2xl font-semibold text-foreground">{t("that_s_a_step_forward")}</h1>

    <p className="font-body text-muted-foreground leading-relaxed">{t("you_took_a_small_step_toward_repair_and_that_matte")}</p>

    <div className="glass-card p-4">
      <p className="font-body text-sm text-muted-foreground italic">
        "Even small actions can rebuild trust over time."
      </p>
    </div>

    <div className="space-y-3">
      <button
        onClick={onTryAnother}
        className="btn-gradient w-full py-3.5 font-heading font-medium text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
      >{t("try_with_someone_else")}</button>
      <button
        onClick={onDone}
        className="w-full glass-card py-3.5 font-heading font-medium text-base text-foreground transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
      >{t("done")}</button>
    </div>
  </div>
);

export default CompletionScreen;
