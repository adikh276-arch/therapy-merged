import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import IntroScreen from "../components/reflection/IntroScreen";
import BreathingScreen from "../components/reflection/BreathingScreen";
import ReflectionPrompt from "../components/reflection/ReflectionPrompt";
import IntentionScreen from "../components/reflection/IntentionScreen";
import CheckInScreen from "../components/reflection/CheckInScreen";
import ClosingScreen from "../components/reflection/ClosingScreen";
import { ReflectionEntry, saveReflection } from "../lib/reflections";
import { useTranslation } from "react-i18next";
import { PremiumLayout } from "../../../components/shared/PremiumLayout";
import { Sparkles, Heart } from "lucide-react";

const pageVariants = {
  enter: { opacity: 0, y: 20 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const pageTransition = { duration: 0.6, ease: "easeOut" };

type Screen = "intro" | "breathing" | "r1" | "r2" | "r3" | "intention" | "checkin" | "closing";

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

  const screenOrder: Screen[] = ["intro", "breathing", "r1", "r2", "r3", "intention", "checkin", "closing"];
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

  const currentIdx = screenOrder.indexOf(screen);

  return (
    <PremiumLayout 
      title="Pause for Appreciation" 
      subtitle={t(`screen.${screen}.title`, { defaultValue: "Reflecting" })}
      icon={<Heart className="w-6 h-6 text-primary" />}
      onBack={currentIdx > 0 && screen !== 'closing' ? () => setScreen(screenOrder[currentIdx - 1]) : undefined}
      onReset={currentIdx > 0 && screen !== 'closing' ? resetFlow : undefined}
    >
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-4 min-h-[70vh]" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif' }}>
        {screen !== 'closing' && (
          <div className="flex justify-center gap-2 mb-10">
            {screenOrder.slice(0, 7).map((s, i) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-500 ${i <= currentIdx ? "w-8 bg-primary" : "w-2 bg-slate-100"}`}
              />
            ))}
          </div>
        )}

        <div className="relative flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={screen}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={pageTransition}
              className="flex-1 flex flex-col"
            >
              {screen === "intro" && (
                <IntroScreen onBegin={() => setScreen("breathing")} />
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
                  onExit={resetFlow}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </PremiumLayout>
  );
};

export default Index;
