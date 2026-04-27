import { useState } from "react";
import { motion } from "framer-motion";


interface Props {
  onContinue: (sentence: string) => void;
}

const ScreenKindResponse = ({ onContinue }: Props) => {
  const [text, setText] = useState("");

  return (
    <div className="flex flex-col items-center text-center px-4 py-6">
      <motion.h1
        className="font-heading text-3xl text-slate-800 mb-3"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Try a kinder voice
      </motion.h1>

      <motion.p
        className="text-slate-500 text-base mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.6 }}
      >
        Write one sentence you need to hear right now.
        Say it like you would to a dear friend.
      </motion.p>

      <motion.div
        className="w-full bg-white rounded-[2rem] border border-slate-100 p-8 shadow-xl shadow-slate-200/50 mb-8"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.6 }}
      >
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4">Your message to yourself</p>
        <textarea
          className="w-full bg-slate-50 border-none rounded-2xl p-6 text-center text-lg font-bold text-slate-800 focus:ring-2 focus:ring-primary/20 transition-all shadow-inner resize-none min-h-[160px]"
          placeholder="I am doing my best..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoFocus
        />
      </motion.div>

      <motion.button
        className="w-full bg-primary text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-primary/20 disabled:opacity-30 transition-all flex items-center justify-center gap-3"
        onClick={() => onContinue(text)}
        disabled={!text.trim()}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.6 }}
      >
        Continue
      </motion.button>
    </div>
  );
};

export default ScreenKindResponse;
