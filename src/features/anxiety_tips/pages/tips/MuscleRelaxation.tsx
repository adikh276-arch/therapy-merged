import TipDetailLayout from "@/components/TipDetailLayout";
import { useTranslation } from "react-i18next";

const MuscleRelaxation = () => {
  const { t } = useTranslation();

  return (
    <TipDetailLayout
      title={t("tip_muscle_relaxation")}
      whyItHelps={t("muscle_why")}
      whatYouCanDo={[
        t("muscle_step1"),
        t("muscle_step2"),
        t("muscle_step3"),
        t("muscle_step4"),
        t("muscle_step5"),
      ]}
    />
  );
};

export default MuscleRelaxation;
