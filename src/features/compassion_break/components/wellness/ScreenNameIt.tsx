import { useState } from "react";
import { motion } from "framer-motion";

const EMOTIONS = ["anxious", "guilty", "overwhelmed", "tense", "tired", "sad"];

interface Props {
  onContinue: (emotions: string[]) => void;
}

const ScreenNameIt = ({ onContinue }: Props) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [custom, setCustom] = useState("");

  const toggleEmotion = (e: string) => {
    setSelected((prev) => {
      if (prev.includes(e)) return prev.filter((x) => x !== e);
      if (prev.length >= 2) return [prev[1], e];
      return [...prev, e];
    });
  };

  const handleContinue = () => {
    const result = custom.trim()
      ? [custom.trim()]
      : selected;
    if (result.length > 0) onContinue(result);
  };

  const hasSelection = selected.length > 0 || custom.trim().length > 0;

  return (
    <div className="flex flex-col items-center text-center px-4 py-6">
      <motion.h1
        className="font-heading text-3xl text-slate-800 mb-2"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Put it into words
      </motion.h1>

      <motion.p
        className="text-slate-500 text-base mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.6 }}
      >
        Right now, I feel _______
      </motion.p>

      <motion.div
        className="flex flex-wrap justify-center gap-3 mb-8 w-full"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {EMOTIONS.map((e) => (
          <button
            key={e}
            className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 ${
              selected.includes(e)
                ? "bg-primary text-white shadow-lg shadow-primary/20 scale-[1.05]"
                : "bg-white text-slate-600 border border-slate-100 hover:bg-slate-50 shadow-sm"
            }`}
            onClick={() => toggleEmotion(e)}
          >
            {e}
          </button>
        ))}
      </motion.div>

      <motion.div
        className="w-full bg-white rounded-3xl border border-slate-100 p-8 shadow-xl shadow-slate-200/50 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.6 }}
      >
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4">or type your own</p>
        <input
          type="text"
          className="w-full bg-slate-50 border-none rounded-2xl p-4 text-center text-lg font-bold text-slate-800 focus:ring-2 focus:ring-primary/20 transition-all shadow-inner"
          placeholder="1–2 words"
          maxLength={30}
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
        />
        <p className="text-xs text-slate-400 mt-4 italic">
          Simple is enough.
        </p>
      </motion.div>

      <motion.button
        className="w-full bg-primary text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-primary/20 disabled:opacity-30 transition-all flex items-center justify-center gap-3"
        onClick={handleContinue}
        disabled={!hasSelection}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        Continue
      </motion.button>
    </div>
  );
};

export default ScreenNameIt;
