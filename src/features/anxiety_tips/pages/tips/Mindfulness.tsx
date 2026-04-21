import TipDetailLayout from "@/components/TipDetailLayout";
import { useTranslation } from "react-i18next";

const Mindfulness = () => {
  const { t } = useTranslation();

  return (
    <TipDetailLayout
      title={t("tip_mindfulness")}
      whyItHelps={t("mindfulness_why")}
      whatYouCanDo={[
        t("mindfulness_step1"),
        t("mindfulness_step2"),
        t("mindfulness_step3"),
        t("mindfulness_step4"),
      ]}
    />
  );
};

export default Mindfulness;
