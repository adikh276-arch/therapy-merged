import { FC } from "react";
import { useTranslation } from "react-i18next";
import { PremiumIntro } from "../../../components/shared/PremiumIntro";
import { BookOpen } from "lucide-react";


interface IntroScreenProps {
  onStart: () => void;
}

const IntroScreen: FC<IntroScreenProps> = ({ onStart }) => {
  const { t } = useTranslation();

  return (
    <PremiumIntro
      title={t('title')}
      description={t('subtitle')}
      onStart={onStart}
      icon={<BookOpen size={32} />}
      benefits={[
        t('quote'),
        "Real experiences from real people",
        "Find strength in shared stories"
      ]}
      duration="5-10 minutes"
    />
  );
};

export default IntroScreen;


