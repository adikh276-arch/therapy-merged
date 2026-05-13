import { motion } from "framer-motion";
import { Button } from "@/features/a_gentle_wish/components/ui/button";
import { Heart } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  onExit: () => void;
}

export const ClosingScreen = ({ onExit }: Props) => (
  <div className="flex-1 flex flex-col items-center justify-center text-center gap-8">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.8 }}
    >
      <Heart className="w-10 h-10 text-accent mx-auto" strokeWidth={1.5} />
    </motion.div>

    <h2 className="font-display text-xl font-semibold text-foreground">{t("before_you_go")}</h2>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="space-y-4 text-base text-muted-foreground leading-relaxed max-w-xs"
    >
      <p>{t("there_s_no_single_way_to_carry")}<br />
        someone you love.
      </p>
      <p>{t("what_stays_with_you_in_your_own_way")}<br />
        is enough.
      </p>
      <p className="text-sm italic">{t("you_can_return_to_this_anytime")}</p>
    </motion.div>

    <div className="mt-auto pt-8 w-full max-w-xs">
      <Button variant="grief" size="lg" className="w-full text-base py-6" onClick={onExit}>{t("save_exit")}</Button>
    </div>
  </div>
);
