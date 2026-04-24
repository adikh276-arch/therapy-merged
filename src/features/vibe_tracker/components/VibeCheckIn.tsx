import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Clock, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const vibes = [
  { emoji: "🌷", label: "Calm" },
  { emoji: "🌤", label: "Light" },
  { emoji: "🔥", label: "Driven" },
  { emoji: "🌸", label: "Content" },
  { emoji: "🌊", label: "Steady" },
  { emoji: "🤍", label: "Tender" },
  { emoji: "🌧", label: "Heavy" },
  { emoji: "🌫", label: "Thoughtful" },
  { emoji: "⚡", label: "Restless" },
  { emoji: "💔", label: "Drained" },
];

interface Props {
  onNext: (vibe: string) => void;
  onHistory: () => void;
}

const VibeCheckIn = ({ onNext, onHistory }: Props) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<string | null>(null);
  const [customVibe, setCustomVibe] = useState("");

  const currentVibe = selected || customVibe.trim();

  return (
    <div className="space-y-10">


      <div className="grid grid-cols-2 gap-4">
        {vibes.map((vibe, i) => (
          <motion.button
            key={vibe.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setSelected(vibe.label);
              setCustomVibe("");
            }}
            className={`flex flex-col items-center justify-center p-6 rounded-[2.5rem] border-2 transition-all shadow-sm ${
                selected === vibe.label 
                ? "bg-primary text-white border-primary shadow-xl shadow-primary/20" 
                : "bg-white border-slate-50 text-slate-800 hover:border-primary/20"
            }`}
          >
            <span className="text-3xl mb-2">{vibe.emoji}</span>
            <span className="text-xs font-black uppercase tracking-widest opacity-80">
              {t(`vibes.${vibe.label}`)}
            </span>
          </motion.button>
        ))}
      </div>

      <div className="space-y-4">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-4 block">
            {t("describeOwnVibe")}
        </label>
        <input
          type="text"
          className="w-full py-6 rounded-[2.5rem] bg-slate-50 border-2 border-transparent focus:border-primary/50 focus:bg-white transition-all outline-none px-8 font-bold text-slate-700 placeholder:text-slate-300 shadow-inner"
          placeholder={t("rightNowIFeel")}
          value={customVibe}
          onChange={(e) => {
            setCustomVibe(e.target.value);
            if (e.target.value.trim()) setSelected(null);
          }}
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={!currentVibe}
        onClick={() => onNext(currentVibe)}
        className="w-full py-5 rounded-[2rem] bg-primary text-primary-foreground font-black text-lg shadow-xl shadow-primary/20 hover:shadow-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-40"
      >
        {t("saveVibe")}
        <ArrowRight size={20} />
      </motion.button>
    </div>
  );
};

export default VibeCheckIn;

