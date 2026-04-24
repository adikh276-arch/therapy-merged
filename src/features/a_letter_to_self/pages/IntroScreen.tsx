import { useNavigate, Link } from "react-router-dom";
import { Mail, History } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PremiumIntro } from "../../../components/shared/PremiumIntro";
import { motion } from "framer-motion";

const IntroScreen = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="w-full h-full">
      <PremiumIntro
        title={t("title")}
        description={t("intro_text")}
        onStart={() => navigate("./write")}
        icon={<Mail size={32} />}
        benefits={[
          t("no_judgments"),
          "A space for reflection",
          "Connect with your future self"
        ]}
        duration="10-15 minutes"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <Link
            to="./letters"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-primary font-bold text-sm transition-colors"
          >
            <History size={18} />
            {t("view_past_letters")}
          </Link>
        </motion.div>
      </PremiumIntro>
    </div>
  );
};

export default IntroScreen;
