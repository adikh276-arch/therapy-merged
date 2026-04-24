import { useState } from "react";
import ChooseAreaScreen from "../components/ChooseAreaScreen";
import TimerScreen from "../components/TimerScreen";
import EnergyCheckScreen from "../components/EnergyCheckScreen";
import { PremiumLayout } from "../../../components/shared/PremiumLayout";
import { AnimatePresence, motion } from "framer-motion";

type Screen = "choose" | "timer" | "energy";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("choose");

  return (
    <PremiumLayout 
      title="Environment Optimization" 
      onReset={screen !== 'choose' ? () => setScreen('choose') : undefined}
    >
      <div className="w-full">
        <AnimatePresence mode="wait">
          {screen === "timer" && (
            <motion.div
              key="timer"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="w-full"
            >
              <TimerScreen onComplete={() => setScreen("energy")} />
            </motion.div>
          )}

          {screen === "energy" && (
            <motion.div
              key="energy"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="w-full"
            >
              <EnergyCheckScreen onFinish={() => setScreen("choose")} />
            </motion.div>
          )}

          {screen === "choose" && (
            <motion.div
              key="choose"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="w-full"
            >
              <ChooseAreaScreen onStart={() => setScreen("timer")} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
};

export default Index;
