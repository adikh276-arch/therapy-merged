import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Send, Heart } from "lucide-react";
import { getEntries, saveEntry } from "../lib/letters";
import { PremiumLayout } from "../../../components/shared/PremiumLayout";

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
    <PremiumLayout 
        title="Check-in"
        onSecondaryBack={() => navigate("../write")}
        secondaryBackLabel="Back to writing"
    >
      <div className="w-full space-y-10 pb-32">
        <header className="space-y-4">
          <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.2em]">
            <Heart size={16} />
            Post-Writing Reflection
          </div>
          <h1 className="text-4xl font-black text-slate-900 leading-tight tracking-tight">
            How do you feel?
          </h1>
          <p className="text-slate-500 text-lg font-bold leading-relaxed max-w-sm">
            Acknowledging your feelings is a powerful step in your journey.
          </p>
        </header>

        <div className="grid gap-4">
          {EMOTIONS.map((emotion, i) => {
            const isSelected = selected === emotion;
            return (
              <motion.button
                key={emotion}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.02, x: 8 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelected(emotion)}
                className={`w-full flex items-center justify-between px-10 py-8 rounded-[2.5rem] border-2 transition-all duration-300 text-left group ${
                  isSelected 
                    ? "bg-primary border-primary text-primary-foreground shadow-xl shadow-primary/20" 
                    : "bg-slate-50 border-transparent text-slate-700 hover:bg-white hover:border-primary/10 shadow-sm"
                }`}
              >
                <span className="text-lg font-black">{emotion}</span>
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
                    >
                      <Check size={20} strokeWidth={3} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-xl px-10 z-20">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            disabled={!selected}
            className="w-full py-5 rounded-[2rem] bg-primary text-primary-foreground font-black text-lg shadow-xl shadow-primary/20 hover:shadow-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-40 disabled:shadow-none"
          >
            Finish & Save Reflection
            <Send size={22} />
          </motion.button>
        </div>
      </div>
    </PremiumLayout>
  );
};

export default EmotionalCheckIn;
