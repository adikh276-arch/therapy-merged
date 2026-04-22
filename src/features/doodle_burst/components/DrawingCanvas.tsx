import React, { useRef, useState, useCallback, useEffect, useImperativeHandle, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Undo2, Trash2, Pen } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Sparkle {
  id: number;
  x: number;
  y: number;
}

interface DrawingCanvasProps {
  disabled?: boolean;
}

export interface DrawingCanvasRef {
  getDataUrl: () => string | null;
}

const DrawingCanvas = forwardRef<DrawingCanvasRef, DrawingCanvasProps>(({ disabled = false }, ref) => {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const sparkleIdRef = useRef(0);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  useImperativeHandle(ref, () => ({
    getDataUrl: () => {
      const canvas = canvasRef.current;
      if (!canvas) return null;
      return canvas.toDataURL("image/png");
    },
  }));

  const getCtx = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    return canvas.getContext("2d", { willReadFrequently: true });
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (ctx) {
      ctx.scale(dpr, dpr);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = 3;
      ctx.strokeStyle = "hsl(260, 60%, 55%)";
    }
  }, []);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  const saveState = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = getCtx();
    if (!canvas || !ctx) return;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory((prev) => [...prev.slice(-20), data]);
  }, [getCtx]);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ("touches" in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const addSparkle = (x: number, y: number) => {
    const id = sparkleIdRef.current++;
    setSparkles((prev) => [...prev.slice(-8), { id, x, y }]);
    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => s.id !== id));
    }, 600);
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    if (disabled) return;
    e.preventDefault();
    saveState();
    const ctx = getCtx();
    if (!ctx) return;
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    lastPointRef.current = pos;
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || disabled) return;
    e.preventDefault();
    const ctx = getCtx();
    if (!ctx) return;
    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();

    const last = lastPointRef.current;
    if (last) {
      const dist = Math.hypot(pos.x - last.x, pos.y - last.y);
      if (dist > 40) {
        const rect = canvasRef.current!.getBoundingClientRect();
        addSparkle(pos.x + rect.left, pos.y + rect.top);
        lastPointRef.current = pos;
      }
    }
  };

  const endDraw = () => {
    setIsDrawing(false);
    lastPointRef.current = null;
  };

  const undo = () => {
    const ctx = getCtx();
    const canvas = canvasRef.current;
    if (!ctx || !canvas || history.length === 0) return;
    const prev = history[history.length - 1];
    ctx.putImageData(prev, 0, 0);
    setHistory((h) => h.slice(0, -1));
  };

  const clearCanvas = () => {
    const ctx = getCtx();
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;
    saveState();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="flex flex-col items-stretch gap-3 w-full">
      {/* Tools */}
      <div className="flex justify-center gap-2">
        <ToolButton icon={<Pen size={18} />} label={t("tool_pen")} active />
        <ToolButton icon={<Undo2 size={18} />} label={t("tool_undo")} onClick={undo} />
        <ToolButton icon={<Trash2 size={18} />} label={t("tool_clear")} onClick={clearCanvas} />
      </div>

      {/* Canvas */}
      <div className="relative w-full rounded-2xl overflow-hidden  border border-border bg-transparent">
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, hsl(260, 40%, 60%) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <canvas
          ref={canvasRef}
          className="w-full touch-none cursor-crosshair"
          style={{ height: "min(60vh, 400px)" }}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={endDraw}
          onMouseLeave={endDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={endDraw}
        />

        <AnimatePresence>
          {sparkles.map((s) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="fixed pointer-events-none text-accent"
              style={{ left: s.x - 8, top: s.y - 8 }}
            >
              ✦
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
});

DrawingCanvas.displayName = "DrawingCanvas";

const ToolButton: React.FC<{
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all
      ${active
        ? "bg-primary text-primary-foreground "
        : "bg-muted text-muted-foreground hover:bg-secondary"
      }`}
  >
    {icon}
    {label}
  </button>
);

export default DrawingCanvas;

