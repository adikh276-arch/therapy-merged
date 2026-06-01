'use client';

import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { PremiumIntro } from "@/components/shared/PremiumIntro";
import { Wind } from "lucide-react";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import './i18n/i18n'; // Initialize i18n for this feature

const IntroScreen = () => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <PremiumLayout title={t("app_title")}>
      <PremiumIntro
        title={t("app_title")}
        description={t("app_description")}
        onStart={() => router.push("/4_6_8_breathing/breathe")}
        icon={<Wind size={32} />}
        benefits={[t('intro_p1'), t('intro_p2'), t('intro_p3')]}
        duration={t('app_duration', "3-5 minutes")}
      />
    </PremiumLayout>
  );
};

export default IntroScreen;
