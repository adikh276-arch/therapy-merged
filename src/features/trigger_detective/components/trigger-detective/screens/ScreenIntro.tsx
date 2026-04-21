import { useTranslation } from "react-i18next";
import ScreenLayout from "../ScreenLayout";
import PrimaryButton from "../PrimaryButton";
import detectiveIcon from "@/assets/detective-icon-v2.png";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const ScreenIntro = ({ onNext, onBack }: Props) => {
  const { t } = useTranslation();

  return (
    <ScreenLayout onBack={onBack} title={t("intro_title")}>
      <p className="text-base text-muted-foreground font-body mb-4">
        {t("intro_subtitle")}
      </p>

      <div className="flex justify-center my-6">
        <img src={detectiveIcon} alt="Detective magnifying glass" className="w-36 h-36" />
      </div>

      <div className="text-justified text-foreground font-body text-[15px] leading-relaxed space-y-3 mb-8">
        <p>{t("intro_para1")}</p>
        <p>{t("intro_para2")}</p>
        <p>{t("intro_para3")}</p>
      </div>

      <div className="mt-auto pb-6">
        <PrimaryButton onClick={onNext}>{t("intro_start")}</PrimaryButton>
      </div>
    </ScreenLayout>
  );
};

export default ScreenIntro;
