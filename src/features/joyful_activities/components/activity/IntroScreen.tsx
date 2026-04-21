import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface Props {
  onNext: () => void;
}

const IntroScreen = ({ onNext }: Props) => {
  const { t } = useTranslation();
  return (
    <div className="animate-fade-in-up space-y-8 flex flex-col items-center text-center w-full">
      <div className="space-y-2 w-full">
        <h1 className="text-[22px] font-heading font-semibold text-foreground">
          {t('intro.title')}
        </h1>
        <p className="text-muted-foreground font-heading text-lg">
          {t('intro.subtitle')}
        </p>
      </div>

      <div className="space-y-5 text-foreground font-body leading-relaxed w-full">
        <p>
          {t('intro.p1')}
        </p>
        <p>
          {t('intro.p2')}
        </p>
        <p>
          {t('intro.p3')}
        </p>
      </div>

      <Button variant="calm" size="lg" onClick={onNext} className="w-full max-w-sm">
        {t('intro.button')}
      </Button>
    </div>
  );
};

export default IntroScreen;
