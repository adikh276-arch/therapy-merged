import { useTranslation } from "react-i18next";
import { PremiumIntro } from "../../../components/shared/PremiumIntro";
import { Home } from "lucide-react";


interface ChooseAreaScreenProps {
  onStart: () => void;
}

const ChooseAreaScreen = ({ onStart }: ChooseAreaScreenProps) => {
  const { t } = useTranslation();

  const areas = [
    `🖥️ ${t("one_corner_desk")}`,
    `🛏️ ${t("bedside_table")}`,
    `🪑 ${t("one_chair")}`,
    `🧹 ${t("small_section_floor")}`,
  ];

  return (
    <PremiumIntro
      title={t("app_title")}
      description={`${t("choose_space")} ${t("not_whole_room")}`}
      onStart={onStart}
      icon={<Home size={32} />}
      benefits={areas}
      duration="5 minutes"
    />
  );
};

export default ChooseAreaScreen;


