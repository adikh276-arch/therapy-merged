import TipDetailLayout from "@/components/TipDetailLayout";
import { useTranslation } from "react-i18next";

const PositiveSelfTalk = () => {
  const { t } = useTranslation();

  return (
    <TipDetailLayout
      title={t("tip_positive_self_talk")}
      whyItHelps={t("selftalk_why")}
      whatYouCanDo={[
        t("selftalk_step1"),
        t("selftalk_step2"),
        t("selftalk_step3"),
        t("selftalk_step4"),
      ]}
      extra={
        <div className="bg-card rounded-lg p-4 shadow-card animate-fade-in" style={{ animationDelay: "240ms", animationFillMode: "both" }}>
          <p className="text-sm text-muted-foreground mb-1 font-semibold">{t("example")}</p>
          <p className="text-foreground text-[15px] leading-relaxed">
            {t("instead_of")}: <span className="italic text-destructive/70">"{t("selftalk_instead")}"</span>
          </p>
          <p className="text-foreground text-[15px] leading-relaxed mt-1">
            {t("try")}: <span className="font-bold text-primary">"{t("selftalk_try")}"</span>
          </p>
        </div>
      }
    />
  );
};

export default PositiveSelfTalk;
