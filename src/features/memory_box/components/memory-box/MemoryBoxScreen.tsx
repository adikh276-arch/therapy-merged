import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import ScreenWrapper from "./ScreenWrapper";
import type { Memory } from "@/features/memory_box/pages/Index";
import { useTranslation } from "react-i18next";

interface Props {
  lastSaved: Memory | null;
  onAddAnother: () => void;
  onFinish: () => void;
  onBack: () => void;
}

const MemoryBoxScreen = ({ lastSaved, onAddAnother, onFinish, onBack }: Props) => (
  <ScreenWrapper>
    <div className="absolute top-0 left-0 px-5 py-4 z-20">
      <button onClick={onBack} className="p-2 rounded-full text-muted-foreground hover:bg-card transition-colors">
        <ChevronLeft size={22} />
      </button>
    </div>

    <div className="space-y-8 w-full max-w-xs">
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="text-5xl"
      >
        📦
      </motion.div>

      <h2 className="text-2xl font-heading font-semibold text-foreground">{t("welcome.title")}</h2>

      {lastSaved && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-3 text-left"
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">🤍</span>
            <p className="font-heading text-lg text-foreground">{lastSaved.name}</p>
          </div>
          <p className="font-body text-sm text-muted-foreground leading-relaxed line-clamp-4">
            {lastSaved.text}
          </p>
          {lastSaved.message && (
            <p className="font-body text-xs text-accent italic pt-1">
              💌 "{lastSaved.message}"
            </p>
          )}
        </motion.div>
      )}

      <p className="text-muted-foreground font-body text-sm">{t("this_memory_is_held_here_for_you")}</p>

      <div className="space-y-3 w-full">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onAddAnother}
          className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-base shadow-sm hover:shadow-md transition-all duration-300"
        >{t("add_another_memory")}</motion.button>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onFinish}
          className="w-full py-3 rounded-xl border border-border text-foreground font-body text-sm hover:bg-card transition-all duration-300"
        >{t("finish_for_now")}</motion.button>
      </div>
    </div>
  </ScreenWrapper>
);

export default MemoryBoxScreen;
