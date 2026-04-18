import TipDetailLayout from "@/app/anxiety-tips/components/TipDetailLayout";
import { useTranslation } from "react-i18next";

const Mindfulness = () => {
  const { t } = useTranslation();

  return (
    <TipDetailLayout
      title={t("anxiety_tips.tip_mindfulness")}
      whyItHelps={t("anxiety_tips.mindfulness_why")}
      whatYouCanDo={[
        t("anxiety_tips.mindfulness_step1"),
        t("anxiety_tips.mindfulness_step2"),
        t("anxiety_tips.mindfulness_step3"),
        t("anxiety_tips.mindfulness_step4"),
      ]}
    />
  );
};

export default Mindfulness;
