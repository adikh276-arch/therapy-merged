import { useState } from "react";
import IntroScreen from "../components/IntroScreen";
import VibeCheckIn from "../components/VibeCheckIn";
import Reflection from "../components/Reflection";
import Confirmation from "../components/Confirmation";
import VibeHistory from "../components/VibeHistory";
import { saveVibeEntry } from "../types/vibe";
import { AnimatePresence, motion } from "framer-motion";
import { PremiumLayout } from "../../../components/shared/PremiumLayout";

type Screen = "intro" | "checkin" | "reflection" | "confirmation" | "history";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("intro");
  const [selectedVibe, setSelectedVibe] = useState("");

  const handleVibeSelected = (vibe: string) => {
    setSelectedVibe(vibe);
    setScreen("reflection");
  };

  const handleReflectionComplete = async (reflections: string[]) => {
    await saveVibeEntry({
      id: crypto.randomUUID(),
      vibe: selectedVibe,
      reflections,
      timestamp: new Date().toISOString(),
    });
    setScreen("confirmation");
  };

  const handleDone = () => {
    setSelectedVibe("");
    if (window.parent !== window) {
      window.parent.postMessage({ action: 'exit' }, 'https://web.mantracare.com');
    } else {
      window.location.href = 'https://web.mantracare.com';
    }
  };

  const handleHistory = () => {
    setScreen("history");
  };

  const handleBackToStart = () => {
    setScreen("intro");
  };

  const getTitle = () => {
    switch(screen) {
      case 'history': return "Vibe History";
      case 'confirmation': return "Vibe Saved";
      case 'reflection': return "Reflecting on your Vibe";
      default: return "Vibe Tracker";
    }
  };

  const getSecondaryBack = () => {
    switch(screen) {
      case 'checkin': return { label: "Back to Start", action: () => setScreen("intro") };
      case 'reflection': return { label: "Back to Selection", action: () => setScreen("checkin") };
      case 'history': return { label: "Back to Start", action: () => setScreen("intro") };
      default: return null;
    }
  };

  const secBack = getSecondaryBack();

  return (
    <PremiumLayout 
      title={getTitle()} 
      onReset={screen !== 'intro' ? () => setScreen('intro') : undefined}
      onSecondaryBack={secBack?.action}
      secondaryBackLabel={secBack?.label}
    >
      <div className="w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            {screen === "intro" && (
              <IntroScreen onStart={() => setScreen("checkin")} onHistory={handleHistory} />
            )}
            
            {screen === "checkin" && (
              <VibeCheckIn onNext={handleVibeSelected} onHistory={handleHistory} />
            )}
            
            {screen === "reflection" && (
              <Reflection onComplete={handleReflectionComplete} />
            )}
            
            {screen === "confirmation" && (
              <Confirmation onDone={handleDone} onHistory={handleHistory} />
            )}
            
            {screen === "history" && (
              <VibeHistory onBack={handleBackToStart} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
};

export default Index;
