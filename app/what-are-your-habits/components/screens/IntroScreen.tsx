import ActivityButton from "@/app/what-are-your-habits/components/ActivityButton";
import { useTranslation } from "react-i18next";

const IntroScreen = ({ onNext }: { onNext: () => void }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-card rounded-2xl p-8 shadow-sm border border-border text-center flex flex-col items-center gap-6">
      <span className="text-5xl">🌿</span>
      <h1 className="text-xl font-semibold text-foreground">{t("what_are_your_habits.title")}</h1>
      <p className="text-sm text-muted-foreground text-justified leading-relaxed">
        {t("what_are_your_habits.intro_description")}
      </p>
      <ActivityButton label={t("what_are_your_habits.start_activity")} onClick={onNext} />
    </div>
  );
};

export default IntroScreen;
