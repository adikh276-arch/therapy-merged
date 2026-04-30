import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import FeelingSelector from "../components/FeelingSelector";
import AffirmationScreen from "../components/AffirmationScreen";
import { PremiumIntro } from "../../../components/shared/PremiumIntro";
import { PremiumComplete } from "../../../components/shared/PremiumComplete";
import { Sparkles, Heart } from "lucide-react";
import { PremiumLayout } from "../../../components/shared/PremiumLayout";
import { AnimatePresence, motion } from "framer-motion";

type Screen = "intro" | "feelings" | "affirmation" | "complete";

const Index = () => {
  const { t } = useTranslation();
  const [screen, setScreen] = useState<Screen>("intro");
  const [selectedFeeling, setSelectedFeeling] = useState<string>("");
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);

  const handleBegin = () => setScreen("feelings");

  const handleSelectFeeling = (feelingId: string, colorIndex: number) => {
    setSelectedFeeling(feelingId);
    setSelectedColorIndex(colorIndex);
    setScreen("affirmation");
  };

  const handleChooseAnother = () => setScreen("feelings");
  const handleFinish = () => setScreen("complete");

  const screenOrder: Screen[] = ["intro", "feelings", "affirmation", "complete"];
  const currentIdx = screenOrder.indexOf(screen);

  return (
    <PremiumLayout 
      title="Daily Affirmations" 
      subtitle={t(`screen.${screen}.title`, { defaultValue: "Mindset" })}
      icon={<Sparkles className="w-6 h-6 text-primary" />}
      onBack={currentIdx > 0 && screen !== 'complete' ? () => setScreen(screenOrder[currentIdx - 1]) : undefined}
      onReset={currentIdx > 0 && screen !== 'complete' ? () => setScreen('intro') : undefined}
    >
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-4 min-h-[70vh]" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif' }}>
        {screen !== 'complete' && (
          <div className="flex justify-center gap-2 mb-10">
            {screenOrder.slice(0, 3).map((s, i) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-500 ${i <= currentIdx ? "w-8 bg-primary" : "w-2 bg-slate-100"}`}
              />
            ))}
          </div>
        )}

        <div className="relative flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            {screen === "intro" && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full flex-1 flex flex-col"
              >
                <PremiumIntro
                  title={t("common.beforeYouBegin")}
                  description={t("common.introText1") + " " + t("common.introText2")}
                  onStart={handleBegin}
                  icon={<Sparkles size={32} />}
                  benefits={[
                    t("common.takeTime"),
                    t("common.breatheNaturally"),
                    t("common.noRush")
                  ]}
                  duration="2-3 minutes"
                />
              </motion.div>
            )}
            
            {screen === "feelings" && (
              <motion.div
                key="feelings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full flex-1 flex flex-col"
              >
                <FeelingSelector onSelect={handleSelectFeeling} />
              </motion.div>
            )}
            
            {screen === "affirmation" && (
              <motion.div
                key="affirmation"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full flex-1 flex flex-col"
              >
                <AffirmationScreen
                  feelingId={selectedFeeling}
                  colorIndex={selectedColorIndex}
                  onChooseAnother={handleChooseAnother}
                  onFinish={handleFinish}
                />
              </motion.div>
            )}

            {screen === "complete" && (
              <motion.div
                key="complete"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full flex-1 flex flex-col"
              >
                <PremiumComplete
                  title="Feel Empowered"
                  message="Daily affirmations help reshape your mindset. Carry these positive thoughts with you today."
                  onRestart={() => setScreen("feelings")}
                  icon={<Sparkles size={48} />}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PremiumLayout>
  );
};

export default Index;
