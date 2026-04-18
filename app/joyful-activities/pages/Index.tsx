"use client";
import { useState } from "react";
import IntroScreen from "@/app/joyful-activities/components/activity/IntroScreen";
import RecallScreen from "@/app/joyful-activities/components/activity/RecallScreen";
import MeaningScreen from "@/app/joyful-activities/components/activity/MeaningScreen";
import SmallStepScreen from "@/app/joyful-activities/components/activity/SmallStepScreen";
import AffirmationScreen from "@/app/joyful-activities/components/activity/AffirmationScreen";
import LanguageSelector from "@/app/joyful-activities/components/LanguageSelector";
import floralBg from "@/app/joyful-activities/assets/floral-bg.png";

export interface ActivityData {
  activity: string;
  feeling: string;
  enjoyBecause: string;
  feelsMore: string;
  remindsOf: string;
  smallStep: string;
}

const Index = () => {
  const [screen, setScreen] = useState(1);
  const [data, setData] = useState<ActivityData>({
    activity: "",
    feeling: "",
    enjoyBecause: "",
    feelsMore: "",
    remindsOf: "",
    smallStep: "",
  });

  const update = (fields: Partial<ActivityData>) =>
    setData((prev) => ({ ...prev, ...fields }));

  const goHome = () => {
    setData({ activity: "", feeling: "", enjoyBecause: "", feelsMore: "", remindsOf: "", smallStep: "" });
    setScreen(1);
  };

  return (
    <div
      className="min-h-screen bg-background flex items-center justify-center px-4 py-8 relative"
      style={{
        backgroundImage: `url(${floralBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <LanguageSelector />
      <div className="w-full max-w-md relative z-10">
        {screen === 1 && <IntroScreen onNext={() => setScreen(2)} />}
        {screen === 2 && (
          <RecallScreen data={data} onChange={update} onNext={() => setScreen(3)} />
        )}
        {screen === 3 && (
          <MeaningScreen data={data} onChange={update} onNext={() => setScreen(4)} />
        )}
        {screen === 4 && (
          <SmallStepScreen data={data} onChange={update} onGoHome={goHome} onSave={() => setScreen(5)} />
        )}
        {screen === 5 && <AffirmationScreen onGoHome={goHome} />}
      </div>
    </div>
  );
};

export default Index;
