"use client";
import { useState, useRef } from "react";
import VibeCheckIn from "@/app/vibe-tracker/components/VibeCheckIn";
import Reflection from "@/app/vibe-tracker/components/Reflection";
import Confirmation from "@/app/vibe-tracker/components/Confirmation";
import LanguageSelector from "@/app/vibe-tracker/components/LanguageSelector";
import VibeHistory from "@/app/vibe-tracker/components/VibeHistory";
import { saveVibeEntry } from "@/app/vibe-tracker/types/vibe";

type Screen = "checkin" | "reflection" | "confirmation" | "history";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("checkin");
  const [selectedVibe, setSelectedVibe] = useState("");
  const [transitioning, setTransitioning] = useState(false);

  const transition = (next: Screen) => {
    setTransitioning(true);
    setTimeout(() => {
      setScreen(next);
      setTransitioning(false);
    }, 500);
  };

  const handleVibeSelected = (vibe: string) => {
    setSelectedVibe(vibe);
    transition("reflection");
  };

  const handleReflectionComplete = async (reflections: string[]) => {
    await saveVibeEntry({
      id: crypto.randomUUID(),
      vibe: selectedVibe,
      reflections,
      timestamp: new Date().toISOString(),
    });
    transition("confirmation");
  };

  const handleDone = () => {
    setSelectedVibe("");
    transition("checkin");
  };

  const handleHistory = () => {
    transition("history");
  };

  const handleBackFromHistory = () => {
    transition("checkin");
  };

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative pt-16">
      <LanguageSelector />
      <div
        className={`transition-all duration-500 ease-in-out ${transitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          }`}
      >
        {screen === "checkin" && <VibeCheckIn onNext={handleVibeSelected} onHistory={handleHistory} />}
        {screen === "reflection" && <Reflection onComplete={handleReflectionComplete} />}
        {screen === "confirmation" && <Confirmation onDone={handleDone} onHistory={handleHistory} />}
        {screen === "history" && <VibeHistory onBack={handleBackFromHistory} />}
      </div>
    </div>
  );
};

export default Index;

