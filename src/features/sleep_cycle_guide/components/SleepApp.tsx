import { useState } from "react";
import { Moon } from "lucide-react";
import { useTranslation } from "react-i18next";
import Screen1Hook from "./screens/Screen1Hook";
import Screen2Stages from "./screens/Screen2Stages";
import Screen3Groggy from "./screens/Screen3Groggy";
import Screen4Reflection from "./screens/Screen4Reflection";
import StarField from "./StarField";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { motion, AnimatePresence } from "framer-motion";

const TOTAL_SCREENS = 4;

const SleepApp = () => {
  const { t } = useTranslation();
  const [currentScreen, setCurrentScreen] = useState(0);

  const goNext = () => setCurrentScreen(prev =>{t("math_min_prev_1_total_screens_1_const_goback_setcu")}<Screen1Hook key={0} onNext={goNext} />,
    <Screen2Stages key={1} onNext={goNext} />,
    <Screen3Groggy key={2} onNext={goNext} />,
    <Screen4Reflection key={3} />,
  ];

  const pillLabels = t("pill_labels", { returnObjects: true }) as string[];

  return (
    <PremiumLayout
      title={t("app_title")}
      subtitle={pillLabels[currentScreen]}
      icon={<Moon className="w-6 h-6 text-primary" />}
      onBack={currentScreen > 0 ? goBack : undefined}
    >
      <div className="relative w-full max-w-md mx-auto min-h-[70vh] flex flex-col px-6">
        <StarField />
        
        <div className="flex justify-center gap-2 mb-8">
          {Array.from({ length: TOTAL_SCREENS }).map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${i === currentScreen ? "w-8 bg-primary" : "w-2 bg-slate-200"}`}
            />
          ))}
        </div>

        <div className="relative z-10 flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreen}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col"
            >
              {screens[currentScreen]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </PremiumLayout>
  );
};

export default SleepApp;
