import React, { useState } from "react";
import BeforeYouBegin from "../components/BeforeYouBegin";
import FeelingSelector from "../components/FeelingSelector";
import AffirmationScreen from "../components/AffirmationScreen";
import { LanguageSelector } from "../components/LanguageSelector";

type Screen = "intro" | "feelings" | "affirmation";

const Index = () => {
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

  return (
    <div className="min-h-screen bg-background relative">
      <LanguageSelector />
      {screen === "intro" && <BeforeYouBegin onBegin={handleBegin} />}
      {screen === "feelings" && (
        <FeelingSelector onSelect={handleSelectFeeling} />
      )}
      {screen === "affirmation" && (
        <AffirmationScreen
          feelingId={selectedFeeling}
          colorIndex={selectedColorIndex}
          onChooseAnother={handleChooseAnother}
        />
      )}
    </div>
  );
};

export default Index;
