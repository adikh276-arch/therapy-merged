import React from 'react';
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, ArrowRight, Sparkles } from "lucide-react";

interface Props {
  onComplete: (text: string) => void;
}

export const BrainDump = ({ onComplete }: Props) => {
  const { t } = useTranslation();
  const [thoughts, setThoughts] = useState<string[]>([""]);
  const maxRows = 50;

  const updateThought = (index: number, value: string) => {
    setThoughts((prev) => prev.map((t, i) => (i === index ? value : t)));
  };

  const addThought = () => {
    setThoughts((prev) => (prev.length < maxRows ? [...prev, ""] : prev));
  };

  const removeThought = (index: number) => {
    setThoughts((prev) => {
      if (prev.length === 1) return [""];
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const isLast = index === thoughts.length - 1;
    if (isLast) {
      addThought();
      setTimeout(() => {
        const nextInput = document.getElementById(`thought-input-${index + 1}`);
        nextInput?.focus();
      }, 50);
    }
  };

  const filledThoughts = thoughts.map((t) => t.trim()).filter(Boolean);

  return (
    <div className="flex flex-col items-center py-6 pb-24">
      <div className="w-full max-w-lg space-y-8">
        <header className="text-center">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2 leading-tight">
            Brain Dump
          </h1>
          <p className="text-slate-500 text-sm">
            {t("dump_hint")}
          </p>
        </header>

        <div className="space-y-4">
          <AnimatePresence initial={false}>
            {thoughts.map((thought, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex items-center gap-3 group"
              >
                <div className="flex-1 relative">
                    <input
                        id={`thought-input-${index}`}
                        type="text"
                        value={thought}
                        onChange={(e) => updateThought(index, e.target.value)}
                        onKeyDown={(e) => handleEnter(e, index)}
                        placeholder={index === 0 ? t("dump_placeholder") : "Type another thought..."}
                        className="w-full py-5 px-6 rounded-[2rem] bg-white border-2 border-slate-100 text-slate-700 placeholder:text-slate-300 font-medium focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all shadow-sm"
                    />
                    {index === 0 && (
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-primary/30">
                            <Sparkles size={18} />
                        </div>
                    )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, color: "#EF4444" }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={() => removeThought(index)}
                  className="w-12 h-12 shrink-0 rounded-full bg-slate-50 text-slate-300 flex items-center justify-center hover:bg-rose-50 transition-colors"
                >
                  <X size={18} />
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={addThought}
            className="flex items-center gap-2 text-primary font-bold text-sm px-6 py-2"
          >
            <Plus size={18} />
            {t("keep_going")}
          </motion.button>
        </div>

        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-lg px-6 z-20">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => filledThoughts.length > 0 && onComplete(filledThoughts.join("\n"))}
            disabled={filledThoughts.length === 0}
            className="w-full py-5 rounded-[2rem] bg-primary text-primary-foreground font-bold text-lg shadow-xl shadow-primary/20 hover:shadow-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-40 disabled:shadow-none"
          >
            {t("finished")}
            <ArrowRight size={20} />
          </motion.button>
          <p className="text-center text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-4">
             {t("breathe")}
          </p>
        </div>
      </div>
    </div>
  );
};
