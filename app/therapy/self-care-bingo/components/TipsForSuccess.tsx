import { useTranslation } from "react-i18next";

const TipsForSuccess = () => {
  const { t } = useTranslation();

  const tips = [
    { emoji: "🌱", title: t("self_care_bingo.tip1_title"), desc: t("self_care_bingo.tip1_desc") },
    { emoji: "🔄", title: t("self_care_bingo.tip2_title"), desc: t("self_care_bingo.tip2_desc") },
    { emoji: "🎉", title: t("self_care_bingo.tip3_title"), desc: t("self_care_bingo.tip3_desc") },
    { emoji: "✨", title: t("self_care_bingo.tip4_title"), desc: t("self_care_bingo.tip4_desc") },
  ];

  return (
    <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
      <h2 className="text-xl font-bold text-foreground flex items-center gap-2 mb-4">
        <span className="text-2xl">💡</span> {t("self_care_bingo.tips_title")}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {tips.map((tip) => (
          <div key={tip.title} className="flex items-start gap-3">
            <span className="text-xl">{tip.emoji}</span>
            <div>
              <h3 className="font-bold text-foreground text-sm">{tip.title}</h3>
              <p className="text-muted-foreground text-xs">{tip.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TipsForSuccess;
