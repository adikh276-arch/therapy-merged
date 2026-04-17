import TipDetailLayout from "@/app/therapy/anxiety-tips/components/TipDetailLayout";
import { useTranslation } from "react-i18next";

const PositiveSelfTalk = () => {
  const { t } = useTranslation();

  return (
    <TipDetailLayout
      title={t("anxiety_tips.tip_positive_self_talk")}
      whyItHelps={t("anxiety_tips.selftalk_why")}
      whatYouCanDo={[
        t("anxiety_tips.selftalk_step1"),
        t("anxiety_tips.selftalk_step2"),
        t("anxiety_tips.selftalk_step3"),
        t("anxiety_tips.selftalk_step4"),
      ]}
      extra={
        <div className="bg-card rounded-lg p-4 shadow-card animate-fade-in" style={{ animationDelay: "240ms", animationFillMode: "both" }}>
          <p className="text-sm text-muted-foreground mb-1 font-semibold">{t("anxiety_tips.example")}</p>
          <p className="text-foreground text-[15px] leading-relaxed">
            {t("anxiety_tips.instead_of")}: <span className="italic text-destructive/70">"{t("anxiety_tips.selftalk_instead")}"</span>
          </p>
          <p className="text-foreground text-[15px] leading-relaxed mt-1">
            {t("anxiety_tips.try")}: <span className="font-bold text-primary">"{t("anxiety_tips.selftalk_try")}"</span>
          </p>
        </div>
      }
    />
  );
};

export default PositiveSelfTalk;
