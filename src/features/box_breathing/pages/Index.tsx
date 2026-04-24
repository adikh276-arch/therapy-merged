import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PremiumIntro } from "../../../components/shared/PremiumIntro";
import { PremiumComplete } from "../../../components/shared/PremiumComplete";
import SessionScreen from "../components/SessionScreen";
import { Wind } from "lucide-react";
import { PremiumLayout } from "../../../components/shared/PremiumLayout";
import { AnimatePresence, motion } from "framer-motion";

type Screen = "overview" | "session" | "complete";

const Index = () => {
  const { t } = useTranslation();
  const [screen, setScreen] = useState<Screen>("overview");

  return (
    <PremiumLayout 
      title="Box Breathing" 
      onReset={screen !== 'overview' ? () => setScreen('overview') : undefined}
    >
      <div className="w-full">
        <AnimatePresence mode="wait">
          {screen === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="w-full"
            >
              <PremiumIntro
                title="Box Breathing"
                description={t("technique_description")}
                onStart={() => setScreen("session")}
                icon={<Wind size={32} />}
                benefits={[
                  t("inhale_4s"),
                  t("hold_4s"),
                  t("exhale_4s")
                ]}
                duration="5 minutes"
              />
            </motion.div>
          )}
          {screen === "session" && (
            <motion.div
              key="session"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="w-full"
            >
              <SessionScreen
                onComplete={() => setScreen("complete")}
                onEnd={() => setScreen("overview")}
              />
            </motion.div>
          )}
          {screen === "complete" && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="w-full"
            >
              <PremiumComplete
                title="Great Job!"
                message="You've completed the Box Breathing session. You should feel more balanced and calm."
                onRestart={() => setScreen("session")}
                icon={<Wind size={48} />}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
};

export default Index;
