import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import MantraLogo from "@/assets/mantra-logo.svg";

const loadingMessages = [
  "Analyzing your body patterns...",
  "Understanding your daily habits...",
  "Mapping your pain points...",
  "Preparing your personalized insight...",
];

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Rotate messages
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 1500);
    
    // Progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 70);
    
    // Complete after ~3.5 seconds
    const timeout = setTimeout(() => {
      onComplete();
    }, 3500);
    
    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
      clearTimeout(timeout);
    };
  }, [onComplete]);
  
  return (
    <div className="min-h-screen bg-gradient-surface flex items-center justify-center">
      <div className="text-center px-4">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <img src={MantraLogo} alt="PhysioMantra" className="h-16 mx-auto" />
        </motion.div>
        
        {/* Spinner */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-brand-pale"
          />
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-primary">{progress}%</span>
          </div>
        </div>
        
        {/* Rotating message */}
        <motion.p
          key={messageIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-lg text-muted-foreground"
        >
          {loadingMessages[messageIndex]}
        </motion.p>
        
        {/* Progress bar */}
        <div className="mt-8 max-w-xs mx-auto">
          <div className="progress-track">
            <motion.div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
