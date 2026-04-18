import { motion } from "framer-motion";

interface CloudAnimationProps {
  thought: string;
}

export function CloudAnimation({ thought }: CloudAnimationProps) {
  return (
    <div className="relative w-full h-48 overflow-hidden my-6 rounded-lg" style={{ background: "linear-gradient(180deg, #87CEEB 0%, #E0F0FF 100%)" }}>
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: ["-20%", "110%"], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 10, ease: "easeInOut", times: [0, 0.1, 0.8, 1] }}
        className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center"
      >
        <div className="relative">
          <span className="text-6xl">☁️</span>
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-medium text-foreground/70 max-w-[120px] text-center leading-tight">
            {thought}
          </span>
        </div>
      </motion.div>
      <motion.span
        className="absolute text-4xl opacity-30"
        style={{ top: "15%", left: "60%" }}
        animate={{ x: [0, 40, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >☁️</motion.span>
      <motion.span
        className="absolute text-3xl opacity-20"
        style={{ top: "65%", left: "20%" }}
        animate={{ x: [0, -30, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >☁️</motion.span>
    </div>
  );
}
