import { useTranslation } from "react-i18next";
import { Heart } from "lucide-react";
import { PremiumIntro } from "../../../../components/shared/PremiumIntro";

interface Props {
  onNext: () => void;
}

const IntroScreen = ({ onNext }: Props) => {
  const { t } = useTranslation();
  
  return (
    <PremiumIntro
      title={t('intro.title')}
      description={t('intro.subtitle')}
      onStart={onNext}
      icon={<Heart size={32} />}
      benefits={[
        t('intro.p1'),
        t('intro.p2'),
        t('intro.p3')
      ]}
      duration="5 minutes"
    />
  );
};

export default IntroScreen;
