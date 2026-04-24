import { useNavigate } from "react-router-dom";
import { PremiumComplete } from "../../../components/shared/PremiumComplete";
import { useTranslation } from "react-i18next";
import { History, Home } from "lucide-react";
import { motion } from "framer-motion";

const CompletionScreen = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="w-full h-full">
      <PremiumComplete
        title="Letter Saved Successfully"
        message="You showed up for yourself today. That matters more than perfection. Your letter has been saved and can be revisited anytime."
        onRestart={() => navigate("..")}
      >
        <div className="flex gap-4 w-full max-w-md mx-auto mt-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("../letters")}
              className="flex-1 py-4 bg-white border-2 border-slate-100 text-slate-600 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-50 transition-all shadow-sm"
            >
              <History size={18} />
              View Letters
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("..")}
              className="flex-1 py-4 bg-slate-50 text-slate-600 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-100 transition-all"
            >
              <Home size={18} />
              Home
            </motion.button>
        </div>
      </PremiumComplete>
    </div>
  );
};

export default CompletionScreen;
