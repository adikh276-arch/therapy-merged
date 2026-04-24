import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Home, RotateCcw, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PremiumCompleteProps {
  title?: string;
  message?: string;
  onRestart?: () => void;
  onHome?: () => void;
  children?: React.ReactNode;
  icon?: React.ReactNode;
}

export const PremiumComplete: React.FC<PremiumCompleteProps> = ({
  title = "Well Done!",
  message = "You've successfully completed this activity. Take a moment to appreciate your progress.",
  onRestart,
  onHome,
  children,
  icon
}) => {
  const navigate = useNavigate();

  const handleHome = () => {
    if (onHome) {
      onHome();
    } else {
      if (window.parent !== window) {
        window.parent.postMessage({ action: 'exit' }, 'https://web.mantracare.com');
      } else {
        navigate('/');
      }
    }
  };

  return (
    <div className="flex flex-col items-center py-8 pb-28">
      <div className="w-full max-w-lg space-y-8">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 10, stiffness: 150 }}
          className="flex justify-center"
        >
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-full bg-primary/20 -z-10 scale-125"
            />
            <div className="w-28 h-28 bg-primary/10 rounded-full flex items-center justify-center text-primary border-2 border-primary/20 shadow-xl shadow-primary/15">
              {icon || <CheckCircle2 size={56} />}
            </div>
          </div>
        </motion.div>

        {/* Sparkle decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-3"
        >
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              animate={{ y: [-4, 4, -4], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
            >
              <Sparkles size={16} className="text-primary" />
            </motion.div>
          ))}
        </motion.div>

        {/* Title & Message */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center space-y-3"
        >
          <h2 className="text-4xl font-extrabold text-slate-900 leading-tight">{title}</h2>
          <p className="text-base text-slate-500 font-medium leading-relaxed max-w-md mx-auto">{message}</p>
        </motion.div>

        {/* Children slot */}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full"
          >
            {children}
          </motion.div>
        )}
      </div>

      {/* Action Buttons — fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-sm z-20 flex justify-center">
        <div className="w-full max-w-lg flex flex-col gap-3">
          {onRestart && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={onRestart}
              className="w-full py-4 rounded-2xl bg-white border-2 border-slate-100 text-slate-500 font-bold flex items-center justify-center gap-2 hover:bg-slate-50 hover:text-slate-800 hover:border-slate-200 transition-all shadow-sm"
            >
              <RotateCcw size={18} />
              Start Over
            </motion.button>
          )}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={handleHome}
            className="w-full py-4.5 rounded-2xl bg-primary text-primary-foreground font-black text-lg shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all flex items-center justify-center gap-2"
          >
            <Home size={20} />
            Finish & Exit
          </motion.button>
        </div>
      </div>

    </div>
  );
};

