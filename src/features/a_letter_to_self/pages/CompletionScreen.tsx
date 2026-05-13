import { useNavigate } from "react-router-dom";
import { PremiumComplete } from "../../../components/shared/PremiumComplete";
import { useTranslation } from "react-i18next";
import { History, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { PremiumLayout } from "../../../components/shared/PremiumLayout";

const CompletionScreen = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <PremiumLayout title={t("app_title")}>
      <div className="w-full h-full">
        <PremiumComplete
          title={t("app_title")}
          message="You showed up for yourself today. That matters more than perfection. Your letter has been saved and can be revisited anytime."
          onRestart={() => navigate("..")}
          icon={<Mail size={48} />}
        >
          <div className="w-full max-w-md mx-auto mt-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("../letters")}
                className="w-full py-5 rounded-[2rem] bg-white border-2 border-slate-100 text-slate-500 font-black text-sm uppercase tracking-widest shadow-xl shadow-slate-200/50 hover:text-primary hover:border-primary/20 transition-all flex items-center justify-center gap-3"
              >
                <History size={20} />{t("view_past_letters")}</motion.button>
          </div>
        </PremiumComplete>
      </div>
    </PremiumLayout>
  );
};

export default CompletionScreen;
