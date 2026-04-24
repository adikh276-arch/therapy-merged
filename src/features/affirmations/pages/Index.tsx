import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import FeelingSelector from "../components/FeelingSelector";
import AffirmationScreen from "../components/AffirmationScreen";
import { PremiumIntro } from "../../../components/shared/PremiumIntro";
import { PremiumComplete } from "../../../components/shared/PremiumComplete";
import { Sparkles } from "lucide-react";

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
    <div className="bg-transparent relative h-full">
      {screen === "intro" && (
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
      )}
      
      {screen === "feelings" && (
        <FeelingSelector onSelect={handleSelectFeeling} />
      )}
      
      {screen === "affirmation" && (
        <AffirmationScreen
          feelingId={selectedFeeling}
          colorIndex={selectedColorIndex}
          onChooseAnother={handleChooseAnother}
          onFinish={handleFinish}
        />
      )}

      {screen === "complete" && (
        <PremiumComplete
          title="Feel Empowered"
          message="Daily affirmations help reshape your mindset. Carry these positive thoughts with you today."
          onRestart={() => setScreen("feelings")}
        />
      )}
    </div>
  );
};

export default Index;
