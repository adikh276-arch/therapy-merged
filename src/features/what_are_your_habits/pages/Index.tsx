import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import IntroScreen from "../components/screens/IntroScreen";
import BodyHabitsScreen from "../components/screens/BodyHabitsScreen";
import MindHabitsScreen from "../components/screens/MindHabitsScreen";
import CopingHabitsScreen from "../components/screens/CopingHabitsScreen";
import ReflectionScreen from "../components/screens/ReflectionScreen";
import InsightScreen from "../components/screens/InsightScreen";
import FinalScreen from "../components/screens/FinalScreen";
import { PremiumLayout } from "../../../components/shared/PremiumLayout";

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.4, ease: "easeIn" as const } },
};

const Index = () => {
  const [step, setStep] = useState(0);

  const next = () => setStep((s) => s + 1);

  const screens = [
    <IntroScreen onNext={next} />,
    <BodyHabitsScreen onNext={next} />,
    <MindHabitsScreen onNext={next} />,
    <CopingHabitsScreen onNext={next} />,
    <ReflectionScreen onNext={next} />,
    <InsightScreen onNext={next} />,
    <FinalScreen />,
  ];

  return (
    <PremiumLayout 
      title="Habit Reflection" 
      onReset={step !== 0 ? () => setStep(0) : undefined}
    >
      <div className="w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full"
          >
            {screens[step]}
          </motion.div>
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
};

export default Index;
