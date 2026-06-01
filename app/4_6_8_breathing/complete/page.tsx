'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { PremiumComplete } from "@/components/shared/PremiumComplete";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { Wind } from "lucide-react";
import '../i18n/i18n'; // Initialize i18n for this feature

const CompletionScreen = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [reflection, setReflection] = useState("");

  return (
    <PremiumLayout title={t("app_title")}>
      <PremiumComplete
        title={t("app_title")}
        message={`${t('notice_body')} ${t('breath_slower')} ${t('chest_softer')}`}
        onRestart={() => router.push("/4_6_8_breathing/breathe")}
        icon={<Wind size={48} />}
      >
        <div className="w-full flex flex-col gap-4 text-left mt-8">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">
            {t('what_feels_different')}
          </p>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder={t('reflection_placeholder')}
            rows={4}
            className="w-full bg-white border-2 border-slate-100 rounded-[2.5rem] p-8 text-lg font-bold resize-none outline-none focus:border-primary/50 transition-all placeholder:text-slate-200 shadow-inner"
          />
        </div>
      </PremiumComplete>
    </PremiumLayout>
  );
};

export default CompletionScreen;
