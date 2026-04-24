import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PremiumIntro } from "../../../components/shared/PremiumIntro";
import { PremiumComplete } from "../../../components/shared/PremiumComplete";
import SessionScreen from "../components/SessionScreen";
import { Wind } from "lucide-react";

type Screen = "overview" | "session" | "complete";

const Index = () => {
  const { t } = useTranslation();
  const [screen, setScreen] = useState<Screen>("overview");

  return (
    <div className="w-full h-full">
      {screen === "overview" && (
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
      )}
      {screen === "session" && (
        <SessionScreen
          onComplete={() => setScreen("complete")}
          onEnd={() => setScreen("overview")}
        />
      )}
      {screen === "complete" && (
        <PremiumComplete
          title="Great Job!"
          message="You've completed the Box Breathing session. You should feel more balanced and calm."
          onRestart={() => setScreen("session")}
        />
      )}
    </div>
  );
};

export default Index;
