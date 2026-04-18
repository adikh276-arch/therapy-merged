import TipDetailLayout from "@/app/anxiety-tips/components/TipDetailLayout";
import BreathingCircle from "@/app/anxiety-tips/components/BreathingCircle";
import { useTranslation } from "react-i18next";

const DeepBreathing = () => {
  const { t } = useTranslation();

  return (
    <TipDetailLayout
      title={t("anxiety_tips.tip_deep_breathing")}
      whyItHelps={t("anxiety_tips.breathing_why")}
      whatYouCanDo={[
        t("anxiety_tips.breathing_step1"),
        t("anxiety_tips.breathing_step2"),
        t("anxiety_tips.breathing_step3"),
        t("anxiety_tips.breathing_step4"),
      ]}
      extra={<BreathingCircle />}
    />
  );
};

export default DeepBreathing;
