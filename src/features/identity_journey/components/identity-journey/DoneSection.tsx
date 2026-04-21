import { useTranslation } from "react-i18next";

interface DoneSectionProps {
  enabled: boolean;
  onDone: () => void;
}

const DoneSection = ({ enabled, onDone }: DoneSectionProps) => {
  const { t } = useTranslation();

  return (
    <div className="px-5 pb-8">
      <p className="text-sm italic text-muted-foreground text-center leading-relaxed mb-4">
        "You are becoming who you've always been. That takes courage."
      </p>
      <button
        disabled={!enabled}
        onClick={onDone}
        className="w-full py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl transition-opacity disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
      >
        {t('done')}
      </button>
    </div>
  );
};

export default DoneSection;
