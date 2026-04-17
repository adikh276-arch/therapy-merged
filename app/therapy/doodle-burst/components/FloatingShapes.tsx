import { motion } from "framer-motion";

const shapes = [
  { shape: "circle", color: "bg-pastel-lavender", size: "w-16 h-16", delay: 0, x: "10%", y: "15%" },
  { shape: "circle", color: "bg-pastel-peach", size: "w-10 h-10", delay: 0.5, x: "80%", y: "10%" },
  { shape: "square", color: "bg-pastel-mint", size: "w-12 h-12", delay: 1, x: "75%", y: "70%" },
  { shape: "circle", color: "bg-pastel-sky", size: "w-8 h-8", delay: 1.5, x: "20%", y: "75%" },
  { shape: "square", color: "bg-pastel-lemon", size: "w-14 h-14", delay: 0.8, x: "60%", y: "25%" },
  { shape: "circle", color: "bg-pastel-pink", size: "w-12 h-12", delay: 1.2, x: "35%", y: "85%" },
];

const FloatingShapes = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {shapes.map((s, i) => (
      <motion.div
        key={i}
        className={`absolute ${s.size} ${s.color} ${s.shape === "circle" ? "rounded-full" : "rounded-2xl rotate-12"} opacity-60`}
        style={{ left: s.x, top: s.y }}
        animate={{
          y: [0, -12, 6, 0],
          rotate: s.shape === "square" ? [12, 18, 8, 12] : [0, 5, -3, 0],
        }}
        transition={{
          duration: 4 + i * 0.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: s.delay,
        }}
      />
    ))}
  </div>
);

export default FloatingShapes;
