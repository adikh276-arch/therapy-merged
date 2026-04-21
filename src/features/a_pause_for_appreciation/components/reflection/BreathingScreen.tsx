import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface BreathingScreenProps {
  onContinue: () => void;
}

const INHALE = 4000;
const HOLD = 1000;
const EXHALE = 4000;
const TOTAL_CYCLES = 3;

const BreathingScreen = ({ onContinue }: BreathingScreenProps) => {
  const { t } = useTranslation();
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale" | "done">("inhale");
  const [cycle, setCycle] = useState(0);
  const [counter, setCounter] = useState(4);

  const runCycle = useCallback(() => {
    // Inhale
    setPhase("inhale");
    setCounter(4);
    let c = 4;
    const inhaleInterval = setInterval(() => {
      c--;
      if (c > 0) setCounter(c);
      else {
        clearInterval(inhaleInterval);
        // Hold
        setPhase("hold");
        setCounter(0);
        setTimeout(() => {
          // Exhale
          setPhase("exhale");
          let e = 4;
          setCounter(e);
          const exhaleInterval = setInterval(() => {
            e--;
            if (e > 0) setCounter(e);
            else {
              clearInterval(exhaleInterval);
              setCycle((prev) => prev + 1);
            }
          }, 1000);
        }, HOLD);
      }
    }, 1000);
  }, []);

  useEffect(() => {
    if (cycle < TOTAL_CYCLES) {
      runCycle();
    } else {
      setPhase("done");
    }
  }, [cycle, runCycle]);

  const circleScale = phase === "inhale" ? 1.4 : phase === "exhale" ? 1 : phase === "hold" ? 1.4 : 1;
  const breathDuration = phase === "inhale" ? INHALE / 1000 : phase === "exhale" ? EXHALE / 1000 : 0.3;

  return (
    <div className="reflection-card text-center space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-heading font-semibold">{t("breathing.title")}</h2>
        <p className="text-sm text-muted-foreground leading-relaxed" style={{ textAlign: "justify" }}>
          {t("breathing.description")}
        </p>
      </div>

      {phase !== "done" && (
        <p className="text-xs text-muted-foreground">{t("breathing.instruction")}</p>
      )}

      <div className="flex items-center justify-center py-6">
        {phase !== "done" ? (
          <div className="relative flex items-center justify-center">
            <motion.div
              className="w-28 h-28 rounded-full bg-primary/20 breathing-glow"
              animate={{ scale: circleScale }}
              transition={{ duration: breathDuration, ease: "easeInOut" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-sm font-body text-foreground/70">
                {phase === "inhale" && t("breathing.inhale", { counter })}
                {phase === "hold" && t("breathing.hold")}
                {phase === "exhale" && t("breathing.exhale", { counter })}
              </p>
            </div>
          </div>
        ) : (
          <motion.p
            className="text-sm italic text-foreground/70 leading-relaxed max-w-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: "center" }}
          >
            {t("breathing.affirmation")}
          </motion.p>
        )}
      </div>

      {phase === "done" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <Button onClick={onContinue} className="w-full">
            {t("breathing.continue")}
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default BreathingScreen;
