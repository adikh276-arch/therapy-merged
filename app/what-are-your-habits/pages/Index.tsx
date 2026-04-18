"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import IntroScreen from "@/app/what-are-your-habits/components/screens/IntroScreen";
import BodyHabitsScreen from "@/app/what-are-your-habits/components/screens/BodyHabitsScreen";
import MindHabitsScreen from "@/app/what-are-your-habits/components/screens/MindHabitsScreen";
import CopingHabitsScreen from "@/app/what-are-your-habits/components/screens/CopingHabitsScreen";
import ReflectionScreen from "@/app/what-are-your-habits/components/screens/ReflectionScreen";
import InsightScreen from "@/app/what-are-your-habits/components/screens/InsightScreen";
import FinalScreen from "@/app/what-are-your-habits/components/screens/FinalScreen";
import LanguageSelector from "@/app/what-are-your-habits/components/LanguageSelector";

const pageVariants = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  exit: { opacity: 0, x: -60, transition: { duration: 0.4, ease: "easeIn" as const } },
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
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <LanguageSelector />
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {screens[step]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
