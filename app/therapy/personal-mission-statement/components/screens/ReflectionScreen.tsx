import ScreenWrapper from "@/app/therapy/personal-mission-statement/components/ScreenWrapper";
import MissionButton from "@/app/therapy/personal-mission-statement/components/MissionButton";
import ReflectionInput from "@/app/therapy/personal-mission-statement/components/ReflectionInput";
import { MissionData } from "@/app/therapy/personal-mission-statement/pages/Index";
import { useTranslation } from "react-i18next";

interface ReflectionScreenProps {
  data: MissionData;
  onChange: (partial: Partial<MissionData>) => void;
  onNext: () => void;
}

const ReflectionScreen = ({ data, onChange, onNext }: ReflectionScreenProps) => {
  const { t } = useTranslation();
  const canProceed = data.beingSomeoneWho.trim() && data.lifeFeelMore.trim();

  return (
    <ScreenWrapper screenKey="reflection">
      <div className="flex-1 space-y-8">
        <h1 className="text-[22px] font-heading text-foreground text-center">
          {t("personal_mission_statement.reflection_title")}
        </h1>

        <ReflectionInput
          label={t("personal_mission_statement.reflection_being_label")}
          placeholder={t("personal_mission_statement.reflection_being_placeholder")}
          value={data.beingSomeoneWho}
          onChange={(e) => onChange({ beingSomeoneWho: e.target.value })}
        />

        <ReflectionInput
          label={t("personal_mission_statement.reflection_life_label")}
          placeholder={t("personal_mission_statement.reflection_life_placeholder")}
          value={data.lifeFeelMore}
          onChange={(e) => onChange({ lifeFeelMore: e.target.value })}
        />
      </div>

      <div className="pt-8 pb-4">
        <MissionButton onClick={onNext} disabled={!canProceed}>
          {t("personal_mission_statement.reflection_create")}
        </MissionButton>
      </div>
    </ScreenWrapper>
  );
};

export default ReflectionScreen;
