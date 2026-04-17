import TipDetailLayout from "@/app/therapy/anxiety-tips/components/TipDetailLayout";
import { useTranslation } from "react-i18next";

const SeekSupport = () => {
  const { t } = useTranslation();

  return (
    <TipDetailLayout
      title={t("anxiety_tips.tip_seek_support")}
      whyItHelps={t("anxiety_tips.support_why")}
      whatYouCanDo={[
        t("anxiety_tips.support_step1"),
        t("anxiety_tips.support_step2"),
        t("anxiety_tips.support_step3"),
        t("anxiety_tips.support_step4"),
      ]}
    />
  );
};

export default SeekSupport;
