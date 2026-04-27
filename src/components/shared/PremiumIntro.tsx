import React from 'react';
import { motion } from 'framer-motion';
import { Play, Clock } from 'lucide-react';

interface PremiumIntroProps {
  title: string;
  description: string;
  onStart: () => void;
  icon: React.ReactNode;
  benefits: string[];
  duration: string;
  children?: React.ReactNode;
}

export const PremiumIntro: React.FC<PremiumIntroProps> = ({
  title,
  description,
  onStart,
  icon,
  benefits,
  duration,
  children
}) => {
  return (
    <div className="w-full py-12 flex flex-col items-center text-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-20 h-20 rounded-3xl bg-white border-2 border-slate-100 flex items-center justify-center text-[#3B82F6] shadow-xl shadow-slate-200/50 mb-8"
      >
        {icon}
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
        className="text-[#64748B] text-lg font-medium max-w-lg mb-10"
      >
        {description}
      </motion.p>

      <motion.div
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl mb-12"
      >
        {benefits.map((benefit, i) => (
          <div key={i} className="p-5 bg-white border-2 border-slate-100 rounded-3xl flex flex-col items-center gap-2">
            <span className="text-[#0F172A] font-bold text-sm">{benefit}</span>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col items-center gap-6"
      >
        <button
          onClick={onStart}
          className="px-10 py-5 bg-gradient-to-br from-[#3B82F6] to-[#2563EB] text-white font-bold rounded-[2rem] shadow-xl shadow-blue-200/50 flex items-center gap-3 hover:scale-105 active:scale-95 transition-all"
        >
          <Play size={20} fill="currentColor" />
          Start Session
        </button>

        <div className="flex items-center gap-2 text-[#94A3B8] font-bold text-[10px] uppercase tracking-widest">
          <Clock size={14} />
          Approx. {duration}
        </div>
      </motion.div>

      {children}
    </div>
  );
};
