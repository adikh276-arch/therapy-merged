import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import IntroScreen from "../components/reflection/IntroScreen";
import BreathingScreen from "../components/reflection/BreathingScreen";
import ReflectionPrompt from "../components/reflection/ReflectionPrompt";
import IntentionScreen from "../components/reflection/IntentionScreen";
import CheckInScreen from "../components/reflection/CheckInScreen";
import ClosingScreen from "../components/reflection/ClosingScreen";
import HistoryScreen from "../components/reflection/HistoryScreen";
import { ReflectionEntry, saveReflection } from "../lib/reflections";
import { useTranslation } from "react-i18next";

const pageVariants = {
  enter: { opacity: 0, y: 16 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
};

const pageTransition = { duration: 0.5, ease: "easeInOut" };

type Screen = "intro" | "breathing" | "r1" | "r2" | "r3" | "intention" | "checkin" | "closing" | "history";

const Index = () => {
  const { t } = useTranslation();

  const reflectionPrompts = [
    {
      step: 1,
      prompt: t("reflection.prompts.p1"),
      example: t("reflection.prompts.p1_ex"),
    },
    {
      step: 2,
      prompt: t("reflection.prompts.p2"),
      example: t("reflection.prompts.p2_ex"),
    },
    {
      step: 3,
      prompt: t("reflection.prompts.p3"),
      example: t("reflection.prompts.p3_ex"),
    },
  ];

  const [screen, setScreen] = useState<Screen>("intro");
  const [responses, setResponses] = useState<string[]>(["", "", ""]);
  const [intention, setIntention] = useState("");
  const [checkIn, setCheckIn] = useState("");

  const updateResponse = (index: number, value: string) => {
    setResponses((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const handleFinish = () => {
    const entry: ReflectionEntry = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      responses,
      intention,
      checkIn,
    };
    saveReflection(entry);
    setScreen("closing");
  };

  const resetFlow = () => {
    setResponses(["", "", ""]);
    setIntention("");
    setCheckIn("");
    setScreen("intro");
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={pageTransition}
          >
            {screen === "intro" && (
              <IntroScreen onBegin={() => setScreen("breathing")} onHistory={() => setScreen("history")} />
            )}
            {screen === "breathing" && <BreathingScreen onContinue={() => setScreen("r1")} />}
            {screen === "r1" && (
              <ReflectionPrompt
                {...reflectionPrompts[0]}
                total={4}
                value={responses[0]}
                onChange={(v) => updateResponse(0, v)}
                onNext={() => setScreen("r2")}
              />
            )}
            {screen === "r2" && (
              <ReflectionPrompt
                {...reflectionPrompts[1]}
                total={4}
                value={responses[1]}
                onChange={(v) => updateResponse(1, v)}
                onNext={() => setScreen("r3")}
              />
            )}
            {screen === "r3" && (
              <ReflectionPrompt
                {...reflectionPrompts[2]}
                total={4}
                value={responses[2]}
                onChange={(v) => updateResponse(2, v)}
                onNext={() => setScreen("intention")}
              />
            )}
            {screen === "intention" && (
              <IntentionScreen value={intention} onChange={setIntention} onContinue={() => setScreen("checkin")} />
            )}
            {screen === "checkin" && (
              <CheckInScreen value={checkIn} onChange={setCheckIn} onFinish={handleFinish} />
            )}
            {screen === "closing" && (
              <ClosingScreen
                onSave={() => setScreen("history")}
                onHistory={() => setScreen("history")}
                onExit={resetFlow}
              />
            )}
            {screen === "history" && <HistoryScreen onBack={resetFlow} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
