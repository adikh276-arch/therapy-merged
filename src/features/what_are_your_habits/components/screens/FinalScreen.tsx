import { PremiumComplete } from "../../../../components/shared/PremiumComplete";
import { useTranslation } from "react-i18next";
import { CheckCircle2 } from "lucide-react";

const FinalScreen = () => {
  const { t } = useTranslation();

  return (
    <PremiumComplete
      title="Habit Reflection Complete"
      message={t('final_text')}
      onRestart={() => window.location.reload()}
      icon={<CheckCircle2 size={48} />}
    />
  );
};

export default FinalScreen;
