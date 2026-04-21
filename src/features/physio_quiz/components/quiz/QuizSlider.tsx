import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";

interface QuizSliderProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  labels: Record<number, string>;
}

export const QuizSlider = ({ value, onChange, min, max, step, labels }: QuizSliderProps) => {
  const labelPositions = Object.keys(labels).map(Number);
  
  // Find the closest label to the current value
  const getClosestLabel = (val: number): string => {
    const positions = Object.keys(labels).map(Number);
    const closest = positions.reduce((prev, curr) =>
      Math.abs(curr - val) < Math.abs(prev - val) ? curr : prev
    );
    return labels[closest];
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full px-2 py-6"
    >
      {/* Current value display */}
      <div className="text-center mb-8">
        <motion.div
          key={value}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold"
        >
          {value}
        </motion.div>
        <p className="mt-2 text-lg font-medium text-foreground">
          {getClosestLabel(value)}
        </p>
      </div>
      
      {/* Slider */}
      <div className="relative">
        <Slider
          value={[value]}
          onValueChange={(vals) => onChange(vals[0])}
          min={min}
          max={max}
          step={step}
          className="w-full"
        />
        
        {/* Labels underneath */}
        <div className="relative mt-4 h-6">
          {labelPositions.map((pos) => (
            <span
              key={pos}
              className="absolute text-xs text-muted-foreground transform -translate-x-1/2"
              style={{ left: `${((pos - min) / (max - min)) * 100}%` }}
            >
              {labels[pos]}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
