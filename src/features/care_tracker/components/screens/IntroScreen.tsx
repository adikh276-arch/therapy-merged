import React from "react";
import { PremiumIntro } from "../../../../components/shared/PremiumIntro";
import { useTranslation } from "react-i18next";
import { Activity } from "lucide-react";

interface IntroScreenProps {
  onStart: () => void;
}

const IntroScreen = ({ onStart }: IntroScreenProps) => {
  const { t } = useTranslation();

  return (
    <PremiumIntro
      title="Self-Care Tracker"
      description="Track your daily self-care habits and see how they impact your overall wellbeing. Consistency is key to a healthier mind."
      onStart={onStart}
      icon={<Activity size={32} />}
      benefits={[
        "Log daily self-care activities",
        "Track time spent on yourself",
        "Monitor your mood patterns",
        "View history and progress"
      ]}
      duration="2-3 minutes"
    />
  );
};

export default IntroScreen;
