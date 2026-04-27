import { useState } from "react";
import { motion } from "framer-motion";

interface Props {
  onContinue: (afterIntensity: number) => void;
}

const ScreenNoticeShift = ({ onContinue }: Props) => {
  const [intensity, setIntensity] = useState(5);
  const [ripple, setRipple] = useState(false);

  const handleSliderChange = (val: number) => {
    setIntensity(val);
    setRipple(true);
    setTimeout(() => setRipple(false), 1500);
  };

  return (
    <div className="flex flex-col items-center text-center px-4 py-6">
      <motion.h1
        className="font-heading text-3xl text-slate-800 mb-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Check in again 🌼
      </motion.h1>

      <motion.div
        className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-xl shadow-slate-200/50 w-full mb-8 relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {ripple && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-16 h-16 rounded-full animate-ping opacity-20" style={{
              background: "#4F95FF",
            }} />
          </div>
        )}

        <p className="text-sm font-bold text-slate-400 mb-8 uppercase tracking-widest">
          How intense does it feel now?
        </p>

        <input
          type="range"
          min={0}
          max={10}
          value={intensity}
          onChange={(e) => handleSliderChange(Number(e.target.value))}
          className="w-full h-3 rounded-full appearance-none cursor-pointer bg-slate-100"
          style={{
            background: `linear-gradient(to right, #94a3b8 0%, #4F95FF ${intensity * 10}%, #f1f5f9 ${intensity * 10}%)`,
          }}
        />
        <div className="flex justify-between text-xs font-black text-slate-300 mt-4">
          <span>CALM</span>
          <span>INTENSE</span>
        </div>
      </motion.div>

      <motion.div
        className="w-full bg-slate-50 rounded-2xl p-6 border border-slate-100 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
          Any noticeable shift?
        </p>
        <p className="text-slate-700 font-bold italic leading-relaxed">
          "Even a small reduction in tension is a win for your nervous system."
        </p>
      </motion.div>

      <motion.button
        className="w-full bg-primary text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all"
        onClick={() => onContinue(intensity)}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        Continue
      </motion.button>
    </div>
  );
};

export default ScreenNoticeShift;
