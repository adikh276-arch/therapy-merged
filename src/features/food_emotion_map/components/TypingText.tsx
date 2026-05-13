import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface TypingTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
}

const TypingText = ({ text, speed = 30, onComplete, className = "" }: TypingTextProps) => {
  const { t } = useTranslation();
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
        onComplete?.();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={className}
    >
      {displayed}
      {!done && <span className="animate-pulse text-accent">|</span>}
    </motion.p>
  );
};

export default TypingText;
