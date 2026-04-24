import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Send } from "lucide-react";
import { getEntries, saveEntry } from "../lib/letters";

const EMOTIONS = [
  "I feel lighter than before.",
  "I feel emotional but supported.",
  "I feel neutral, but I'm glad I wrote.",
  "I still feel heavy, but this helped a little.",
  "I'm not sure what I feel yet.",
];

const EmotionalCheckIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const entryId = (location.state as { entryId?: string })?.entryId;
  const [selected, setSelected] = useState<string | null>(null);

  const handleSave = async () => {
    if (!selected || !entryId) return;
    const entries = await getEntries();
    const entry = entries.find((e) => e.id === entryId);
    if (entry) {
      entry.emotionalState = selected;
      entry.updatedAt = new Date().toISOString();
      await saveEntry(entry);
    }
    navigate("../complete");
  };

  return (
    <div className="flex flex-col items-center py-6 pb-24">
      <div className="w-full max-w-lg space-y-8">
        <header className="text-center">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2 leading-tight">
            How do you feel after writing?
          </h1>
          <p className="text-slate-500 text-sm">
            Self-reflection is the first step to healing.
          </p>
        </header>

        <div className="space-y-3">
          {EMOTIONS.map((emotion, i) => {
            const isSelected = selected === emotion;
            return (
              <motion.button
                key={emotion}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelected(emotion)}
                className={`w-full flex items-center justify-between px-6 py-5 rounded-[2rem] border-2 transition-all duration-300 text-left ${
                  isSelected 
                    ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20" 
                    : "bg-slate-50 border-transparent text-slate-700 hover:bg-slate-100"
                }`}
              >
                <span className="text-base font-bold">{emotion}</span>
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"
                    >
                      <Check size={16} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-lg px-6 z-20">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            disabled={!selected}
            className="w-full py-5 rounded-[2rem] bg-primary text-primary-foreground font-bold text-lg shadow-xl shadow-primary/20 hover:shadow-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-40 disabled:shadow-none"
          >
            Finish & Save
            <Send size={20} />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default EmotionalCheckIn;
