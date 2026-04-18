"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Slider } from "@/app/diffusion-technique/components/ui/slider";

interface MoneySliderProps {
  value: number;
  onChange: (value: number) => void;
}

export function MoneySlider({ value, onChange }: MoneySliderProps) {
  const [coins, setCoins] = useState<number[]>([]);

  const handleChange = (val: number[]) => {
    const newVal = val[0];
    if (Math.abs(newVal - value) >= 5) {
      setCoins((prev) => [...prev, Date.now()].slice(-8));
    }
    onChange(newVal);
  };

  return (
    <div className="w-full">
      {/* Current value display */}
      <div className="text-center mb-6 relative">
        <p className="text-sm text-muted-foreground mb-1">Current Thought Value</p>
        <motion.p
          key={value}
          initial={{ scale: 1.3 }}
          animate={{ scale: 1 }}
          className="text-4xl font-semibold text-foreground"
        >
          ${value}
        </motion.p>
        {/* Floating coins */}
        <AnimatePresence>
          {coins.map((id) => (
            <motion.span
              key={id}
              initial={{ opacity: 1, y: 0, x: Math.random() * 60 - 30 }}
              animate={{ opacity: 0, y: -40 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              onAnimationComplete={() => setCoins((prev) => prev.filter((c) => c !== id))}
              className="absolute text-2xl pointer-events-none"
              style={{ left: `${40 + Math.random() * 20}%` }}
            >
              💰
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      {/* Slider */}
      <Slider
        value={[value]}
        onValueChange={handleChange}
        max={100}
        min={0}
        step={1}
        className="w-full mb-3"
      />

      {/* Markers */}
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>$0</span>
        <span>$25</span>
        <span>$50</span>
        <span>$75</span>
        <span>$100</span>
      </div>

      {/* Labels */}
      <div className="flex justify-between text-xs text-muted-foreground/70 mt-1">
        <span>Worthless</span>
        <span>Somewhat</span>
        <span>Fully believe</span>
      </div>
    </div>
  );
}
