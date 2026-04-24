import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, CheckCircle2 } from 'lucide-react';

interface PremiumIntroProps {
  title: string;
  description: string;
  onStart: () => void;
  icon?: React.ReactNode;
  benefits?: string[];
  duration?: string;
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
    <div className="flex flex-col items-center py-8 pb-28 min-h-[80vh]">
      <div className="w-full max-w-lg space-y-8">
        {/* Hero Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: -10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ delay: 0.05, type: 'spring', stiffness: 200, damping: 18 }}
          className="flex justify-center"
        >
          <div className="relative">
            <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center text-primary shadow-lg shadow-primary/10 border-2 border-primary/20">
              {icon || <ArrowRight size={36} />}
            </div>
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-3xl bg-primary/20 -z-10"
            />
          </div>
        </motion.div>

        {/* Title & Description */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-center space-y-3"
        >
          <h1 className="text-4xl font-extrabold text-slate-900 leading-tight">{title}</h1>
          <p className="text-base text-slate-500 font-medium leading-relaxed max-w-md mx-auto">{description}</p>
        </motion.div>

        {/* Benefits */}
        {benefits && benefits.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="space-y-3"
          >
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.07 }}
                className="flex items-center gap-4 p-4 bg-white rounded-2xl border-2 border-slate-100 shadow-sm"
              >
                <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <CheckCircle2 size={16} />
                </div>
                <span className="text-sm font-semibold text-slate-700">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Duration */}
        {duration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="flex items-center justify-center gap-2 text-slate-400 text-sm font-bold"
          >
            <Clock size={14} className="text-primary/60" />
            <span>Estimated duration: <span className="text-primary">{duration}</span></span>
          </motion.div>
        )}

        {/* Extra content slot (e.g., history link) */}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {children}
          </motion.div>
        )}
      </div>

      {/* CTA Button — fixed at bottom */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-lg px-6 z-20">
        <motion.button
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.55 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
          className="w-full py-5 rounded-[2rem] bg-primary text-primary-foreground font-black text-lg shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/35 transition-all flex items-center justify-center gap-3"
        >
          Get Started
          <ArrowRight size={20} />
        </motion.button>
      </div>
    </div>
  );
};

