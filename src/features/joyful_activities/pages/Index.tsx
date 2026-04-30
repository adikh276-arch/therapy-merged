import { useState } from "react";
import IntroScreen from "../components/activity/IntroScreen";
import RecallScreen from "../components/activity/RecallScreen";
import MeaningScreen from "../components/activity/MeaningScreen";
import SmallStepScreen from "../components/activity/SmallStepScreen";
import AffirmationScreen from "../components/activity/AffirmationScreen";
import { ActivityData } from "../types/activity";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, Heart, ChevronRight } from "lucide-react";

import { PremiumLayout } from "../../../components/shared/PremiumLayout";
import { PremiumComplete } from "../../../components/shared/PremiumComplete";

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

  if (screen === 5) {
    return (
      <PremiumComplete
        title="Joy Preserved"
        message="You've successfully recalled and connected with a source of joy. Keep this feeling with you as you move through your day."
        onRestart={goHome}
      />
    );
  }

  const subtitles = [
    "Introduction",
    "Recalling Joy",
    "Finding Meaning",
    "Taking Steps",
    "Preserved"
  ];

  return (
    <PremiumLayout 
      title="Joyful Activities" 
      subtitle={subtitles[screen - 1]}
      icon={<Heart className="w-6 h-6 text-primary" />}
      onBack={screen > 1 && screen < 5 ? () => setScreen(prev => prev - 1) : undefined}
      onReset={screen > 1 && screen < 5 ? goHome : undefined}
    >
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-4 min-h-[70vh]" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif' }}>
        <div className="flex justify-center gap-2 mb-10">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${i <= screen ? "w-8 bg-primary" : "w-2 bg-slate-100"}`}
            />
          ))}
        </div>

        <div className="relative flex-1 flex flex-col">
            <AnimatePresence mode="wait">
                <motion.div
                    key={screen}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex-1 flex flex-col"
                >
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
                </motion.div>
            </AnimatePresence>
        </div>
      </div>
    </PremiumLayout>
  );
};

export default Index;
