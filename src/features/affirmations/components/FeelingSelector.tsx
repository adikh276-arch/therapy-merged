import React from "react";
import { feelings } from "../data/affirmations";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface FeelingSelectorProps {
  onSelect: (feelingId: string, colorIndex: number) => void;
}

const premiumTints = [
  "bg-primary/5 border-primary/10 text-primary",
  "bg-cyan-50 border-cyan-100 text-cyan-700",
  "bg-blue-50 border-blue-100 text-blue-700",
  "bg-emerald-50 border-emerald-100 text-emerald-700",
  "bg-sky-50 border-sky-100 text-sky-700",
  "bg-teal-50 border-teal-100 text-teal-700",
];

const FeelingSelector: React.FC<FeelingSelectorProps> = ({ onSelect }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary">
            <Heart size={32} />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mb-4">
            {t("common.howFeeling")}
          </h1>
          <p className="text-slate-500 max-w-sm mx-auto">
            {t("common.chooseOne")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {feelings.map((feeling, index) => (
            <motion.button
              key={feeling.id}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(feeling.id, index % premiumTints.length)}
              className={`w-full rounded-2xl border-2 px-6 py-5 text-left font-bold transition-all flex items-center justify-between group ${premiumTints[index % premiumTints.length]}`}
            >
              <span>{t(`feelings.${feeling.id}.label`)}</span>
              <div className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <Heart size={16} fill="currentColor" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeelingSelector;
