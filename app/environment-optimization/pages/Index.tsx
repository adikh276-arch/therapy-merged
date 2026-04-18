"use client";
import { useState } from "react";
import ChooseAreaScreen from "@/app/environment-optimization/components/ChooseAreaScreen";
import TimerScreen from "@/app/environment-optimization/components/TimerScreen";
import EnergyCheckScreen from "@/app/environment-optimization/components/EnergyCheckScreen";
import { LanguageSelector } from "@/app/environment-optimization/components/LanguageSelector";

type Screen = "choose" | "timer" | "energy";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("choose");

  return (
    <div className="relative min-h-screen">
      <LanguageSelector />
      {screen === "timer" && (
        <TimerScreen onComplete={() => setScreen("energy")} />
      )}

      {screen === "energy" && (
        <EnergyCheckScreen onFinish={() => setScreen("choose")} />
      )}

      {screen === "choose" && (
        <ChooseAreaScreen onStart={() => setScreen("timer")} />
      )}
    </div>
  );
};

export default Index;

