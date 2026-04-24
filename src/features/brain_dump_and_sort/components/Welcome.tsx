import { useTranslation } from "react-i18next";
import { PremiumIntro } from "../../../components/shared/PremiumIntro";
import { Brain } from "lucide-react";

interface Props {
  onStart: () => void;
}

export const Welcome = ({ onStart }: Props) => {
  const { t } = useTranslation();
  
  return (
    <PremiumIntro
      title={t("welcome_title")}
      description={t("welcome_subtitle") + " " + t("welcome_desc")}
      onStart={onStart}
      icon={<Brain size={32} />}
      benefits={[
        t("step_1"),
        t("step_2"),
        t("step_3")
      ]}
      duration="5-10 minutes"
    />
  );
};
