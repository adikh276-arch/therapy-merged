import React, { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MobileShellProps {
  children: ReactNode;
  step?: number;
  totalSteps?: number;
}

const MobileShell = ({ children, step, totalSteps }: MobileShellProps) => {
  return (
    <div className="flex flex-col items-center py-6">
      <div className="w-full max-w-lg space-y-8">
        {step && totalSteps && (
          <div className="flex items-center justify-between px-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Step {step} of {totalSteps}
            </span>
            <div className="flex gap-1.5">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 w-8 rounded-full transition-all duration-500 ${i < step ? "bg-primary" : "bg-slate-100"
                    }`}
                />
              ))}
            </div>
          </div>
        )}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MobileShell;
