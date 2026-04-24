import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PremiumIntro } from "../../../components/shared/PremiumIntro";
import { Wind } from "lucide-react";

const IntroScreen = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <PremiumIntro
      title={t('app_title')}
      description={t('intro_description')}
      onStart={() => navigate("./breathe")}
      icon={<Wind size={32} />}
      benefits={[
        "Calms the nervous system",
        "Reduces immediate stress",
        "Improves focus and clarity"
      ]}
      duration="3-5 minutes"
    />
  );
};

export default IntroScreen;
