import { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface Star {
  x: number;
  y: number;
  r: number;
  speed: number;
  phase: number;
}

const StarsCanvas = () => {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    resize();

    starsRef.current = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      r: 0.3 + Math.random() * 1.1,
      speed: 0.3 + Math.random() * 1.2,
      phase: Math.random() * Math.PI * 2,
    }));

    let raf: number;
    const draw = (t: number) => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      for (const s of starsRef.current) {
        const opacity = 0.1 + 0.2 * (0.5 + 0.5 * Math.sin(t * 0.001 * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(24,95,165,${opacity})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 1 }}
    />
  );
};

export default StarsCanvas;
