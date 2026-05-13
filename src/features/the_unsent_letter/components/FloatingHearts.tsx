import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

interface Heart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

const FloatingHearts = () => {
  const { t } = useTranslation();
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const generated: Heart[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 8 + Math.random() * 12,
      duration: 8 + Math.random() * 10,
      delay: Math.random() * 8,
      opacity: 0.08 + Math.random() * 0.12,
    }));
    setHearts(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute text-primary"
          style={{
            left: `${h.x}%`,
            fontSize: h.size,
            opacity: h.opacity,
          }}
          initial={{ y: "110vh", rotate: -20 }}
          animate={{ y: "-10vh", rotate: 20 }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          ♥
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
