import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PremiumComplete } from "../../../components/shared/PremiumComplete";

const CompletionScreen = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [reflection, setReflection] = useState("");

  return (
    <PremiumComplete
      title={t('you_did_it')}
      message={`${t('notice_body')} ${t('breath_slower')} ${t('chest_softer')}`}
      onRestart={() => navigate("/breathe")}
      onHome={() => {
        if (window.parent !== window) {
          window.parent.postMessage({ action: 'exit' }, 'https://web.mantracare.com');
        } else {
          navigate("/");
        }
      }}
    >
      <div className="w-full flex flex-col gap-3 text-left">
        <p className="font-semibold text-slate-700">
          {t('what_feels_different')}
        </p>
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder={t('reflection_placeholder')}
          rows={3}
          className="w-full bg-white border border-slate-200 rounded-2xl p-4 text-base resize-none outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400"
        />
      </div>
    </PremiumComplete>
  );
};

export default CompletionScreen;
