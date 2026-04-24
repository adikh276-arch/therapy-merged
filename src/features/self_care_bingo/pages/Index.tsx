import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { PremiumIntro } from "../../../components/shared/PremiumIntro";
import { PremiumComplete } from "../../../components/shared/PremiumComplete";
import BingoGrid from "../components/BingoGrid";
import { Sparkles, Trophy } from "lucide-react";

type Screen = "intro" | "game" | "complete";

const Index = () => {
  const { t } = useTranslation();
  const [screen, setScreen] = useState<Screen>("intro");

  const handleWin = () => {
    setScreen("complete");
  };

  return (
    <div className="bg-transparent relative h-full">
      <AnimatePresence mode="wait">
        {screen === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full"
          >
            <PremiumIntro
              title={t('title')}
              description={t('description')}
              onStart={() => setScreen("game")}
              icon={<Sparkles size={32} />}
              benefits={[
                t('tip1_title'),
                t('tip2_title'),
                t('tip3_title'),
                t('tip4_title')
              ]}
              duration="Anytime"
            />
          </motion.div>
        )}

        {screen === "game" && (
          <motion.div
            key="game"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="max-w-2xl mx-auto px-4 py-8"
          >
            <BingoGrid onWin={handleWin} />
          </motion.div>
        )}

        {screen === "complete" && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full"
          >
            <PremiumComplete
              title="Bingo Master!"
              message="Congratulations! You've successfully completed a line of self-care. Your mind and body thank you."
              onRestart={() => setScreen("intro")}
              icon={<Trophy size={48} />}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
