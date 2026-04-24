import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import FeelingSelector from "../components/FeelingSelector";
import AffirmationScreen from "../components/AffirmationScreen";
import { PremiumIntro } from "../../../components/shared/PremiumIntro";
import { PremiumComplete } from "../../../components/shared/PremiumComplete";
import { Sparkles } from "lucide-react";
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

  return (
    <PremiumLayout 
      title="Daily Affirmations" 
      onReset={screen !== 'intro' ? () => setScreen('intro') : undefined}
    >
      <div className="w-full">
        <AnimatePresence mode="wait">
          {screen === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="w-full"
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
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="w-full"
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
              className="w-full"
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
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="w-full"
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
    </PremiumLayout>
  );
};

export default Index;
