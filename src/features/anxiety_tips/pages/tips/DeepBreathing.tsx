import TipDetailLayout from "../../components/TipDetailLayout";
import BreathingCircle from "../../components/BreathingCircle";
import { useTranslation } from "react-i18next";

const DeepBreathing = () => {
  const { t } = useTranslation();

  return (
    <TipDetailLayout
      title={t("tip_deep_breathing")}
      whyItHelps={t("breathing_why")}
      whatYouCanDo={[
        t("breathing_step1"),
        t("breathing_step2"),
        t("breathing_step3"),
        t("breathing_step4"),
      ]}
      extra={<BreathingCircle />}
    />
  );
};

export default DeepBreathing;
