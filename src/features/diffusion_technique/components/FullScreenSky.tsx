import { motion } from "framer-motion";

interface FullScreenSkyProps {
  thought: string;
  onNext: () => void;
}

export function FullScreenSky({ thought, onNext }: FullScreenSkyProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between py-12 px-6 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #BEE7FF 0%, #EAF6FF 100%)" }}
    >
      {/* Background clouds */}
      <motion.span
        className="absolute text-7xl opacity-15"
        style={{ top: "10%", left: "5%" }}
        animate={{ x: [0, 80, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      >☁️</motion.span>
      <motion.span
        className="absolute text-5xl opacity-10"
        style={{ top: "70%", right: "10%" }}
        animate={{ x: [0, -60, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      >☁️</motion.span>
      <motion.span
        className="absolute text-4xl opacity-15"
        style={{ top: "35%", right: "5%" }}
        animate={{ x: [0, -50, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      >☁️</motion.span>
      <motion.span
        className="absolute text-6xl opacity-10"
        style={{ bottom: "20%", left: "15%" }}
        animate={{ x: [0, 70, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      >☁️</motion.span>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-[22px] font-medium text-foreground text-center z-10"
      >
        Place your thought on a cloud
      </motion.h2>

      {/* Main thought cloud */}
      <motion.div
        initial={{ x: "-60%", opacity: 0 }}
        animate={{ x: ["0%", "15%", "-10%", "5%"], opacity: 1 }}
        transition={{ x: { duration: 12, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 1.5 } }}
        className="relative z-10 flex items-center justify-center"
      >
        <span className="text-[120px] leading-none">☁️</span>
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-medium text-foreground/80 max-w-[160px] text-center leading-snug mt-1">
          "{thought}"
        </span>
      </motion.div>

      {/* Bottom section */}
      <div className="z-10 flex flex-col items-center gap-6 max-w-md">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-center"
        >
          <p className="text-base text-foreground/70 text-justify mb-1">Watch the cloud move across the sky.</p>
          <p className="text-base text-foreground/70 text-justify mb-1">Your thought is simply passing through.</p>
          <p className="text-base text-foreground/60 italic mt-2">You are the sky observing it.</p>
        </motion.div>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          onClick={onNext}
          className="w-full max-w-xs py-3 px-6 rounded-lg font-medium text-base bg-primary text-primary-foreground hover:opacity-90 transition-all duration-200"
        >
          Next →
        </motion.button>
      </div>
    </motion.div>
  );
}
