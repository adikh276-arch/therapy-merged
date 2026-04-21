import { useState } from "react";
import { useTranslation } from "react-i18next";

interface BreathingCircleProps {
  duration?: number;
}

const BreathingCircle = ({ duration = 4000 }: BreathingCircleProps) => {
  const [phase, setPhase] = useState<"in" | "out">("in");
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Outer glow */}
        <div
          className="absolute inset-0 rounded-full bg-primary/20"
          style={{
            animation: `breathe-in ${duration}ms ease-in-out infinite alternate`,
          }}
        />
        {/* Middle ring */}
        <div
          className="absolute inset-4 rounded-full bg-primary/30"
          style={{
            animation: `breathe-in ${duration}ms ease-in-out infinite alternate`,
            animationDelay: "200ms",
          }}
        />
        {/* Inner circle */}
        <div
          className="absolute inset-10 rounded-full bg-primary/50"
          style={{
            animation: `breathe-in ${duration}ms ease-in-out infinite alternate`,
            animationDelay: "400ms",
          }}
        />
        {/* Center dot */}
        <div
          className="w-12 h-12 rounded-full bg-primary z-10"
          style={{
            animation: `breathe-in ${duration}ms ease-in-out infinite alternate`,
            animationDelay: "600ms",
          }}
        />
      </div>
      <p className="mt-6 text-sm text-muted-foreground font-body animate-pulse">
        {t('breathe_in_out')}
      </p>
    </div>
  );
};

export default BreathingCircle;
