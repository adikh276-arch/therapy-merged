import TipDetailLayout from "../../components/TipDetailLayout";
import { useTranslation } from "react-i18next";

const SeekSupport = () => {
  const { t } = useTranslation();

  return (
    <TipDetailLayout
      title={t("tip_seek_support")}
      whyItHelps={t("support_why")}
      whatYouCanDo={[
        t("support_step1"),
        t("support_step2"),
        t("support_step3"),
        t("support_step4"),
      ]}
    />
  );
};

export default SeekSupport;
