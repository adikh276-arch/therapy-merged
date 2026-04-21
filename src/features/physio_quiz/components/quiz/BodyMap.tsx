import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { QuizOption } from "@/lib/quizQuestions";

interface BodyMapProps {
  options: QuizOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

// Body region coordinates for the SVG overlay
const bodyRegions: Record<string, { cx: number; cy: number; rx: number; ry: number }> = {
  neck: { cx: 100, cy: 45, rx: 18, ry: 12 },
  "upper-back": { cx: 100, cy: 80, rx: 35, ry: 20 },
  "lower-back": { cx: 100, cy: 130, rx: 28, ry: 25 },
  hips: { cx: 100, cy: 175, rx: 35, ry: 18 },
  knees: { cx: 100, cy: 250, rx: 25, ry: 15 },
};

export const BodyMap = ({ options, selectedValue, onSelect }: BodyMapProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col lg:flex-row gap-8 items-center justify-center"
    >
      {/* Body silhouette with interactive regions */}
      <div className="relative w-[200px] h-[320px] flex-shrink-0">
        <svg
          viewBox="0 0 200 320"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Body silhouette */}
          <path
            d="M100 10 C115 10 125 20 125 35 C125 45 120 52 110 55 L115 55 C130 55 140 70 140 85 L145 130 C150 145 155 150 160 180 L160 185 L155 190 L150 180 L145 200 C145 210 140 230 135 250 L130 280 L135 300 L125 310 L115 300 L115 260 L105 200 L100 200 L95 200 L85 260 L85 300 L75 310 L65 300 L70 280 L65 250 C60 230 55 210 55 200 L50 180 L45 190 L40 185 L40 180 C45 150 50 145 55 130 L60 85 C60 70 70 55 85 55 L90 55 C80 52 75 45 75 35 C75 20 85 10 100 10 Z"
            className="fill-brand-pale stroke-brand-light"
            strokeWidth="2"
          />
          
          {/* Interactive regions */}
          {Object.entries(bodyRegions).map(([key, region]) => (
            <motion.ellipse
              key={key}
              cx={region.cx}
              cy={region.cy}
              rx={region.rx}
              ry={region.ry}
              className={cn(
                "cursor-pointer transition-all duration-200",
                selectedValue === key
                  ? "fill-primary/40 stroke-primary"
                  : "fill-transparent stroke-transparent hover:fill-brand-secondary/30 hover:stroke-brand-secondary"
              )}
              strokeWidth="2"
              onClick={() => onSelect(key)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            />
          ))}
        </svg>
        
        {/* Labels */}
        <div className="absolute top-[12%] -right-4 text-xs font-medium text-muted-foreground">Neck</div>
        <div className="absolute top-[22%] -right-8 text-xs font-medium text-muted-foreground">Shoulders</div>
        <div className="absolute top-[38%] -right-8 text-xs font-medium text-muted-foreground">Lower Back</div>
        <div className="absolute top-[52%] -right-4 text-xs font-medium text-muted-foreground">Hips</div>
        <div className="absolute top-[76%] -right-4 text-xs font-medium text-muted-foreground">Knees</div>
      </div>
      
      {/* Option buttons for non-mappable selections */}
      <div className="flex flex-col gap-3 w-full max-w-xs">
        {options
          .filter((opt) => !bodyRegions[opt.id])
          .map((option, index) => (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              onClick={() => onSelect(option.id)}
              className={cn(
                "quiz-option text-left",
                selectedValue === option.id && "selected"
              )}
            >
              <div
                className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                  selectedValue === option.id
                    ? "bg-primary border-primary"
                    : "border-border"
                )}
              >
                {selectedValue === option.id && (
                  <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                )}
              </div>
              <span className="font-medium">{option.label}</span>
            </motion.button>
          ))}
      </div>
    </motion.div>
  );
};
