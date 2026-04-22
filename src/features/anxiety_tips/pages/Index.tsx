import { useNavigate } from "react-router-dom";
import { Heart, Wind, Eye, Dumbbell, MessageCircleHeart, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const tips = [
    {
      id: "seek-support",
      title: t("tip_seek_support"),
      preview: t("tip_seek_support_desc"),
      icon: Heart,
      bgClass: "bg-icon-1",
    },
    {
      id: "deep-breathing",
      title: t("tip_deep_breathing"),
      preview: t("tip_deep_breathing_desc"),
      icon: Wind,
      bgClass: "bg-icon-2",
    },
    {
      id: "mindfulness",
      title: t("tip_mindfulness"),
      preview: t("tip_mindfulness_desc"),
      icon: Eye,
      bgClass: "bg-icon-3",
    },
    {
      id: "muscle-relaxation",
      title: t("tip_muscle_relaxation"),
      preview: t("tip_muscle_relaxation_desc"),
      icon: Dumbbell,
      bgClass: "bg-icon-4",
    },
    {
      id: "positive-self-talk",
      title: t("tip_positive_self_talk"),
      preview: t("tip_positive_self_talk_desc"),
      icon: MessageCircleHeart,
      bgClass: "bg-icon-5",
    },
  ];

  return (
    <div className=" gradient-calm">
      <div className="w-full mx-auto px-5 py-8 pb-12">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <p className="text-muted-foreground text-sm font-semibold mb-1">{t("slow_down")}</p>
          <h1 className="text-3xl font-extrabold text-foreground leading-tight">
            {t("app_title")}
          </h1>
          <p className="text-muted-foreground mt-2 text-base leading-relaxed">
            {t("app_subtitle")}
          </p>
        </div>

        {/* Section Title */}
        <h2 className="text-lg font-bold text-foreground mb-4">{t("relief_tips")}</h2>

        {/* Tip Cards */}
        <div className="flex flex-col gap-3">
          {tips.map((tip, i) => (
            <div
              key={tip.id}
              className="tip-card animate-fade-in"
              style={{ animationDelay: `${i * 80}ms`, animationFillMode: "both" }}
              onClick={() => navigate(`/tip/${tip.id}`)}
            >
              <div className={`${tip.bgClass} w-12 h-12 rounded-full flex items-center justify-center shrink-0`}>
                <tip.icon className="w-5 h-5 text-foreground/70" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-foreground text-[15px] leading-snug">{tip.title}</p>
                <p className="text-muted-foreground text-sm leading-snug mt-0.5 line-clamp-2">{tip.preview}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
            </div>
          ))}
        </div>

        {/* Bottom Support */}
        <p className="text-center text-muted-foreground text-xs mt-8 px-4 leading-relaxed">
          {t("support_footer")}
        </p>
      </div>
    </div>
  );
};

export default Index;
