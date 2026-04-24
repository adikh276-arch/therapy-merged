import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronRight } from "lucide-react";
import { Tip } from "../data/tips";
import { motion } from "framer-motion";

// Map tip id -> translation key prefix
const TIP_KEY_MAP: Record<string, string> = {
  "enjoyable-activities": "t1",
  "challenge-negative-thoughts": "t2",
  "set-realistic-goals": "t3",
  "limit-stressors": "t4",
  "practice-self-care": "t5",
};

export default function TipCard({ tip, index }: { tip: Tip; index: number }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const Icon = tip.icon;
  const k = TIP_KEY_MAP[tip.id] ?? "";

  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, x: 5 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(`/tip/${tip.id}`)}
      className="w-full text-left p-6 rounded-[2.5rem] bg-white border-2 border-slate-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all flex items-center gap-5 group"
    >
      <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
        <Icon className="w-6 h-6 text-slate-400 group-hover:text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-slate-800 text-base group-hover:text-primary transition-colors">
          {k ? t(`${k}_title`) : tip.title}
        </h3>
        <p className="text-slate-400 text-xs font-medium leading-relaxed mt-1 line-clamp-2">
          {k ? t(`${k}_preview`) : tip.preview}
        </p>
      </div>
      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:translate-x-1 transition-transform" />
    </motion.button>
  );
}
