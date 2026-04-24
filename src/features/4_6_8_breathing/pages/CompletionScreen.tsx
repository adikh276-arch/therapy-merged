import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PremiumComplete } from "../../../components/shared/PremiumComplete";
import { PremiumLayout } from "../../../components/shared/PremiumLayout";
import { Wind } from "lucide-react";

const CompletionScreen = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [reflection, setReflection] = useState("");

  return (
    <PremiumLayout title="Session Complete">
      <PremiumComplete
        title={t('you_did_it')}
        message={`${t('notice_body')} ${t('breath_slower')} ${t('chest_softer')}`}
        onRestart={() => navigate("../breathe")}
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
