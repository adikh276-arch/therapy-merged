import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { REWARDS, type Reward } from "@/lib/validation";
import MantraCareLogo from "@/assets/MantraCare_Logo.svg";

interface SpinWheelProps {
  onSpinComplete: (reward: Reward) => void;
  reward: Reward;
}

const SEGMENT_ANGLE = 360 / REWARDS.length;

const SpinWheel = ({ onSpinComplete, reward }: SpinWheelProps) => {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const hasSpun = useRef(false);

  const handleSpin = useCallback(() => {
    if (spinning || hasSpun.current) return;
    hasSpun.current = true;
    setSpinning(true);

    // Find reward index
    const rewardIndex = REWARDS.findIndex((r) => r.name === reward.name);
    // Calculate the angle where this reward segment is centered
    // Segment 0 starts at top center, pointer is at top
    const segmentCenter = rewardIndex * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;
    // We want the pointer (top) to land on this segment
    // Wheel rotates clockwise, so we need (360 - segmentCenter) to align
    const targetAngle = 360 - segmentCenter;
    // Add multiple full rotations for dramatic effect
    const fullSpins = 5 + Math.floor(Math.random() * 3);
    const totalRotation = fullSpins * 360 + targetAngle;

    setRotation(totalRotation);

    // Play spin sound
    const spinSound = document.getElementById("spin-sound") as HTMLAudioElement;
    if (spinSound) {
      spinSound.currentTime = 0;
      spinSound.play().catch(e => console.error("Audio error:", e));
    }

    setTimeout(() => {
      setSpinning(false);
      // Play win sound
      const winSound = document.getElementById("win-sound") as HTMLAudioElement;
      if (winSound) {
        winSound.play().catch(e => console.error("Audio error:", e));
      }
      onSpinComplete(reward);
    }, 4500);
  }, [spinning, reward, onSpinComplete]);

  const wheelSize = "min(80vw, 80vh, 420px)";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center"
      >
        <img src={MantraCareLogo} alt="Mantra Care" className="mb-6 h-8" />
        <h2 className="mb-2 text-center text-2xl font-bold text-foreground sm:text-3xl">
          Spin the Wheel!
        </h2>
        <p className="mb-8 text-center text-sm text-muted-foreground">
          Tap the button to discover your reward
        </p>

        {/* Wheel container */}
        <div className="relative mb-8" style={{ width: wheelSize, height: wheelSize }}>
          {/* Pointer */}
          <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1">
            <div
              className="h-0 w-0"
              style={{
                borderLeft: "14px solid transparent",
                borderRight: "14px solid transparent",
                borderTop: "28px solid hsl(213, 89%, 23%)",
                filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.3))",
              }}
            />
          </div>

          {/* Wheel SVG */}
          <div
            className="h-full w-full rounded-full shadow-2xl"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: spinning
                ? "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)"
                : "none",
            }}
          >
            <svg viewBox="0 0 400 400" className="h-full w-full drop-shadow-lg">
              <defs>
                <filter id="innerShadow">
                  <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#000" floodOpacity="0.15" />
                </filter>
              </defs>
              {REWARDS.map((r, i) => {
                const startAngle = i * SEGMENT_ANGLE - 90;
                const endAngle = startAngle + SEGMENT_ANGLE;
                const startRad = (startAngle * Math.PI) / 180;
                const endRad = (endAngle * Math.PI) / 180;
                const x1 = 200 + 195 * Math.cos(startRad);
                const y1 = 200 + 195 * Math.sin(startRad);
                const x2 = 200 + 195 * Math.cos(endRad);
                const y2 = 200 + 195 * Math.sin(endRad);
                const largeArc = SEGMENT_ANGLE > 180 ? 1 : 0;

                // Text angle at midpoint
                const midAngle = startAngle + SEGMENT_ANGLE / 2;
                const textRad = (midAngle * Math.PI) / 180;
                const textX = 200 + 110 * Math.cos(textRad);
                const textY = 200 + 110 * Math.sin(textRad);

                return (
                  <g key={r.name}>
                    <path
                      d={`M200,200 L${x1},${y1} A195,195 0 ${largeArc},1 ${x2},${y2} Z`}
                      fill={r.color}
                      stroke="hsl(0,0%,100%)"
                      strokeWidth="2"
                      filter="url(#innerShadow)"
                    />
                    <text
                      x={textX}
                      y={textY}
                      fill="white"
                      fontSize="14"
                      fontWeight="800"
                      textAnchor="middle"
                      transform={`rotate(${midAngle}, ${textX}, ${textY})`}
                    >
                      {r.name.split("\n").map((line, idx, arr) => (
                        <tspan
                          key={idx}
                          x={textX}
                          dy={idx === 0 ? (arr.length > 1 ? "-0.6em" : "0.35em") : "1.2em"}
                        >
                          {line}
                        </tspan>
                      ))}
                    </text>
                  </g>
                );
              })}
              {/* Center circle */}
              <circle cx="200" cy="200" r="30" fill="hsl(0,0%,100%)" />
              <circle cx="200" cy="200" r="26" fill="hsl(213,89%,23%)" />
              <circle cx="200" cy="200" r="8" fill="hsl(195,100%,50%)" />
            </svg>
          </div>
        </div>

        {/* Audio Elements */}
        <audio id="spin-sound" src="https://www.soundjay.com/misc/sounds/spinning-wheel-1.mp3" preload="auto" />
        <audio id="win-sound" src="https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3" preload="auto" />

        {/* Spin button */}
        <motion.button
          onClick={handleSpin}
          disabled={spinning || hasSpun.current}
          className="brand-gradient glow-accent rounded-xl px-12 py-4 text-lg font-bold text-primary-foreground shadow-lg transition-all hover:shadow-xl hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:brightness-100"
          whileHover={!spinning && !hasSpun.current ? { scale: 1.05 } : {}}
          whileTap={!spinning && !hasSpun.current ? { scale: 0.95 } : {}}
        >
          {spinning ? "Spinning..." : "SPIN!"}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default SpinWheel;
