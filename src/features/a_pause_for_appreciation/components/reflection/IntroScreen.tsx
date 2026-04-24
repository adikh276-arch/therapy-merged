import { useTranslation } from "react-i18next";
import { PremiumIntro } from "../../../../components/shared/PremiumIntro";
import { Heart, History } from "lucide-react";
import { motion } from "framer-motion";

interface IntroScreenProps {
  onBegin: () => void;
}

const IntroScreen = ({ onBegin }: IntroScreenProps) => {
  const { t } = useTranslation();

  return (
    <div className="w-full">
      <PremiumIntro
        title={t("title")}
        description={t("subtitle") + " " + t("intro.text1") + " " + t("intro.text2")}
        onStart={onBegin}
        icon={<Heart size={32} />}
        benefits={[
          "Cultivate gratitude",
          "Reduce stress",
          "Improve well-being"
        ]}
        duration="3-5 minutes"
      />
    </div>
  );
};

export default IntroScreen;
