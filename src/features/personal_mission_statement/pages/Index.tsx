import { useState } from "react";
import IntroScreen from "../components/screens/IntroScreen";
import ValuesScreen from "../components/screens/ValuesScreen";
import ReflectionScreen from "../components/screens/ReflectionScreen";
import MissionScreen from "../components/screens/MissionScreen";
import HistoryScreen from "../components/screens/HistoryScreen";
import { MissionData } from "../types/mission";
import { PremiumLayout } from "../../../components/shared/PremiumLayout";
import { AnimatePresence, motion } from "framer-motion";

const Index = () => {
  const [screen, setScreen] = useState(0);
  const [data, setData] = useState<MissionData>({
    values: [],
    beingSomeoneWho: "",
    lifeFeelMore: "",
  });

  const goTo = (s: number) => setScreen(s);

  return (
    <PremiumLayout 
      title="Mission Statement" 
      onReset={screen !== 0 ? () => setScreen(0) : undefined}
    >
      <div className="w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="w-full"
          >
            {screen === 0 && <IntroScreen onNext={() => goTo(1)} onHistory={() => goTo(4)} />}
            {screen === 1 && (
              <ValuesScreen
                selected={data.values}
                onSelect={(v) => setData((d) => ({ ...d, values: v }))}
                onNext={() => goTo(2)}
              />
            )}
            {screen === 2 && (
              <ReflectionScreen
                data={data}
                onChange={(d) => setData((prev) => ({ ...prev, ...d }))}
                onNext={() => goTo(3)}
              />
            )}
            {screen === 3 && (
              <MissionScreen data={data} onEdit={() => goTo(2)} onHome={() => goTo(0)} onChange={(d) => setData((prev) => ({ ...prev, ...d }))} />
            )}
            {screen === 4 && <HistoryScreen onBack={() => goTo(0)} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
};

export default Index;
