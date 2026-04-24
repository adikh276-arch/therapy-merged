import { useState } from "react";
import IntroScreen from "../components/IntroScreen";
import VibeCheckIn from "../components/VibeCheckIn";
import Reflection from "../components/Reflection";
import Confirmation from "../components/Confirmation";
import VibeHistory from "../components/VibeHistory";
import { saveVibeEntry } from "../types/vibe";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

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
    setScreen("intro");
  };

  const handleHistory = () => {
    setScreen("history");
  };

  const handleBackToStart = () => {
    setScreen("intro");
  };

  const renderInternalBack = (target: Screen) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setScreen(target)}
      className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-6"
    >
      <ArrowLeft size={14} />
      Back to start
    </motion.button>
  );

  return (
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
            <div className="py-6 pb-24">
              {renderInternalBack("intro")}
              <VibeCheckIn onNext={handleVibeSelected} onHistory={handleHistory} />
            </div>
          )}
          
          {screen === "reflection" && (
            <div className="py-6 pb-24">
              {renderInternalBack("checkin")}
              <Reflection onComplete={handleReflectionComplete} />
            </div>
          )}
          
          {screen === "confirmation" && (
            <Confirmation onDone={handleDone} onHistory={handleHistory} />
          )}
          
          {screen === "history" && (
            <div className="py-6 pb-24">
              {renderInternalBack("intro")}
              <VibeHistory onBack={handleBackToStart} />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Index;


