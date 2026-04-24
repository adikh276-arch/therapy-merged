import { useState } from "react";
import IntroScreen from "../components/activity/IntroScreen";
import RecallScreen from "../components/activity/RecallScreen";
import MeaningScreen from "../components/activity/MeaningScreen";
import SmallStepScreen from "../components/activity/SmallStepScreen";
import AffirmationScreen from "../components/activity/AffirmationScreen";
import { ActivityData } from "../types/activity";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";

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
    <div className="w-full">
      <div className="w-full max-w-lg mx-auto py-6">
        <div className="flex justify-center mb-8">
          <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i <= screen ? 'w-8 bg-primary shadow-sm shadow-primary/20' : 'w-2 bg-slate-200'}`} />
              ))}
          </div>
        </div>


        <div className="relative">
            <AnimatePresence mode="wait">
                <motion.div
                    key={screen}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
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
                    {screen === 5 && <AffirmationScreen onGoHome={goHome} />}
                </motion.div>
            </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Index;
