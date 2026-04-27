import React from 'react';
import { motion } from 'framer-motion';
import { Check, RefreshCw } from 'lucide-react';

interface PremiumCompleteProps {
  title: string;
  message: string;
  onRestart: () => void;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export const PremiumComplete: React.FC<PremiumCompleteProps> = ({
  title,
  message,
  onRestart,
  icon,
  children
}) => {
  return (
    <div className="w-full py-12 flex flex-col items-center text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-24 h-24 rounded-full bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center text-white shadow-xl shadow-emerald-200/50 mb-8"
      >
        {icon || <Check size={48} strokeWidth={3} />}
      </motion.div>

      <motion.h2 
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-3xl font-black text-[#0F172A] tracking-tight mb-4"
      >
        {title}
      </motion.h2>

      <motion.p
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-[#64748B] text-lg font-medium max-w-lg mb-12"
      >
        {message}
      </motion.p>

      <motion.div
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col items-center gap-6"
      >
        <button
          onClick={onRestart}
          className="px-10 py-5 bg-[#0F172A] text-white font-bold rounded-[2rem] shadow-xl shadow-slate-200/50 flex items-center gap-3 hover:scale-105 active:scale-95 transition-all"
        >
          <RefreshCw size={20} />
          Complete & Restart
        </button>
      </motion.div>

      {children}
    </div>
  );
};
