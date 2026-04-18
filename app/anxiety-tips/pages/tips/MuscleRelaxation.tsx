import TipDetailLayout from "@/app/anxiety-tips/components/TipDetailLayout";
import { useTranslation } from "react-i18next";

const MuscleRelaxation = () => {
  const { t } = useTranslation();

  return (
    <TipDetailLayout
      title={t("anxiety_tips.tip_muscle_relaxation")}
      whyItHelps={t("anxiety_tips.muscle_why")}
      whatYouCanDo={[
        t("anxiety_tips.muscle_step1"),
        t("anxiety_tips.muscle_step2"),
        t("anxiety_tips.muscle_step3"),
        t("anxiety_tips.muscle_step4"),
        t("anxiety_tips.muscle_step5"),
      ]}
    />
  );
};

export default MuscleRelaxation;
