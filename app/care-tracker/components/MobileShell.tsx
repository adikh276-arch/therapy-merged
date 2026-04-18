import React, { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MobileShellProps {
  children: ReactNode;
  step?: number;
  totalSteps?: number;
}

const MobileShell = ({ children, step, totalSteps }: MobileShellProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-6">
      <div className="w-full max-w-[430px]">
        {step && totalSteps && (
          <div className="mb-6 flex gap-1.5">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${i < step ? "bg-primary" : "bg-muted"
                  }`}
              />
            ))}
          </div>
        )}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MobileShell;
