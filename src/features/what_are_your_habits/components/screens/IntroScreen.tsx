import { PremiumIntro } from "../../../../components/shared/PremiumIntro";
import { useTranslation } from "react-i18next";
import { ListChecks } from "lucide-react";

const IntroScreen = ({ onNext }: { onNext: () => void }) => {
  const { t } = useTranslation();

  return (
    <PremiumIntro
      title={t('title')}
      description={t('intro_description')}
      onStart={onNext}
      icon={<ListChecks size={32} />}
      benefits={[
        "Understand your daily patterns",
        "Identify supportive habits",
        "Create positive change"
      ]}
      duration="5 minutes"
    />
  );
};

export default IntroScreen;
