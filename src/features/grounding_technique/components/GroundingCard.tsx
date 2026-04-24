import { Technique } from "../data/techniques";
import { motion } from "framer-motion";

interface GroundingCardProps {
  technique: Technique;
  onClick: () => void;
  label: string;
}

export default function GroundingCard({ technique, onClick, label }: GroundingCardProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full aspect-square rounded-[2.5rem] bg-white border-2 border-slate-100 p-6 text-center flex flex-col items-center justify-center gap-4 shadow-sm hover:shadow-md hover:border-primary/20 transition-all group"
    >
      <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
          {/* Placeholder for icon if available in technique data, otherwise just text */}
          <span className="text-2xl font-black opacity-20 group-hover:opacity-100 transition-opacity">
            {label.charAt(0)}
          </span>
      </div>
      <span className="text-slate-800 font-bold text-sm leading-tight group-hover:text-primary transition-colors">
        {label}
      </span>
    </motion.button>
  );
}
