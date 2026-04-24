import { useTranslation } from "react-i18next";
import { tips } from "../data/tips";
import TipCard from "../components/TipCard";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Index() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center py-6 pb-24">
      <div className="w-full max-w-lg space-y-8">
        <header className="space-y-4">
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
            <Sparkles size={14} />
            {t("notAlone")}
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 leading-tight">
            {t("supportForLowMood")}
          </h1>
          <p className="text-slate-500 text-base font-medium leading-relaxed">
            {t("gentleSteps")}
          </p>
        </header>

        <div className="space-y-4">
          <h2 className="text-lg font-black text-slate-800 uppercase tracking-wider px-2">
            {t("dailySupportTips")}
          </h2>
          
          <div className="grid gap-3">
            {tips.map((tip, i) => (
              <TipCard key={tip.id} tip={tip} index={i} />
            ))}
          </div>
        </div>

        <p className="text-center text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-12 px-8 leading-relaxed opacity-60">
          {t("strugglingMessage")}
        </p>
      </div>
    </div>
  );
}
