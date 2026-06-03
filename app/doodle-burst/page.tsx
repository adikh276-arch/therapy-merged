'use client';
import { parseDbDate } from '@/lib/dateUtils';
import { useSound } from '@/lib/hooks/useSound';

import { useState, useEffect, useCallback, useRef, forwardRef, useImperativeHandle, useMemo } from 'react';
import { useTranslation, I18nextProvider } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Rocket, History, Share2, Palette, Clock, Check, Undo2, Trash2, Pen, ArrowLeft, Loader2, X, Download, Copy } from 'lucide-react';
import i18n, { loadLocale } from './i18n';
import { PremiumLayout } from '@/components/shared/PremiumLayout';
import { PremiumIntro } from '@/components/shared/PremiumIntro';
import { PremiumComplete } from '@/components/shared/PremiumComplete';
import { apiPath } from '@/lib/apiPath';

// --- Types & Constants ---

type Screen = 'intro' | 'activity' | 'end' | 'history';

interface DoodleEntry {
  id: string;
  imageUrl: string;
  createdAt: string;
}

// --- Tool Button Component ---

const ToolButton: React.FC<{
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    type="button"
    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
      active
        ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/10'
        : 'bg-slate-100 dark:bg-slate-900 text-slate-500 hover:bg-slate-200 dark:hover:opacity-90 hover:shadow-xl hover:shadow-primary/40'
    }`}
  >
    {icon}
    {label}
  </button>
);

// --- Drawing Canvas Component ---

interface DrawingCanvasProps {
  disabled?: boolean;
}

interface DrawingCanvasRef {
  getDataUrl: () => string | null;
}

const DrawingCanvas = forwardRef<DrawingCanvasRef, DrawingCanvasProps>(({ disabled = false }, ref) => {
  const { t } = useTranslation(undefined, { i18n });
  const { playPop } = useSound();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);
  const sparkleIdRef = useRef(0);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  useImperativeHandle(ref, () => ({
    getDataUrl: () => {
      const canvas = canvasRef.current;
      if (!canvas) return null;
      return canvas.toDataURL('image/webp', 0.5);
    },
  }));

  const getCtx = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    return canvas.getContext('2d', { willReadFrequently: true });
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (ctx) {
      ctx.scale(dpr, dpr);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = 4;
      ctx.strokeStyle = 'rgb(59, 130, 246)'; // calming blue
    }
  }, []);

  useEffect(() => {
    resizeCanvas();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', resizeCanvas);
      return () => window.removeEventListener('resize', resizeCanvas);
    }
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
    if ('touches' in e) {
      if (!e.touches[0]) return { x: 0, y: 0 };
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
    saveState();
    const ctx = getCtx();
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;

    // Set gorgeous, premium custom brush stroke style on every draw to prevent any fallback to pure black
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 5;

    // Create a vibrant, soft blue-to-indigo gradient for highly appealing visual stroke feedback
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, '#3b82f6'); // Calming Blue
    gradient.addColorStop(0.5, '#60a5fa'); // Vibrant Soft Blue
    gradient.addColorStop(1, '#8b5cf6'); // Premium Healing Purple
    ctx.strokeStyle = gradient;

    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    lastPointRef.current = pos;
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || disabled) return;
    const ctx = getCtx();
    if (!ctx) return;
    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();

    const last = lastPointRef.current;
    if (last) {
      const dist = Math.hypot(pos.x - last.x, pos.y - last.y);
      if (dist > 35) {
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
    playPop();
    const ctx = getCtx();
    const canvas = canvasRef.current;
    if (!ctx || !canvas || history.length === 0) return;
    const prev = history[history.length - 1];
    ctx.putImageData(prev, 0, 0);
    setHistory((h) => h.slice(0, -1));
  };

  const clearCanvas = () => {
    playPop();
    const ctx = getCtx();
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;
    saveState();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="flex flex-col items-stretch gap-4 w-full">
      {/* Tools */}
      <div className="flex justify-center gap-2">
        <ToolButton icon={<Pen size={14} />} label={t('tool_pen', 'Pen')} active />
        <ToolButton icon={<Undo2 size={14} />} label={t('tool_undo', 'Undo')} onClick={undo} />
        <ToolButton icon={<Trash2 size={14} />} label={t('tool_clear', 'Clear')} onClick={clearCanvas} />
      </div>

      {/* Canvas Box */}
      <div className="relative w-full rounded-3xl overflow-hidden border border-white/60 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 shadow-inner">
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        <canvas
          ref={canvasRef}
          className="w-full touch-none cursor-crosshair block"
          style={{ height: 'min(50vh, 320px)' }}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={endDraw}
          onMouseLeave={endDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={endDraw}
        />

        {/* Floating path sparkles */}
        <AnimatePresence>
          {sparkles.map((s) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="fixed pointer-events-none text-primary/70 z-50 text-base"
              style={{ left: s.x - 6, top: s.y - 6 }}
            >
              ✦
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
});

DrawingCanvas.displayName = 'DrawingCanvas';

// --- Share Modal Component ---

function ShareModal({
  isOpen,
  onClose,
  dataUrl,
}: {
  isOpen: boolean;
  onClose: () => void;
  dataUrl: string;
}) {
  const { t } = useTranslation(undefined, { i18n });
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = t('share_text', 'I loved this doodle burst activity in TherapyMantra...');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!dataUrl) return;
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `doodle-burst-${Date.now()}.png`;
    a.click();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 shadow-2xl space-y-6 text-left border border-white/60 dark:border-slate-800"
      >
        <div className="flex justify-between items-center">
          <h3 className="font-extrabold text-slate-850 dark:text-slate-100 text-lg">
            {t('share_your_doodle', 'Share Your Doodle ⚡')}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-50 dark:hover:opacity-90 hover:shadow-xl hover:shadow-primary/40 rounded-full transition-colors text-slate-400 hover:text-slate-650"
          >
            <X size={18} />
          </button>
        </div>

        {/* Doodle Preview inside Card */}
        {dataUrl && (
          <div className="rounded-2xl border border-white/60 dark:border-slate-800 overflow-hidden bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 dark:bg-slate-950 p-4 aspect-video flex items-center justify-center">
            <img src={dataUrl} alt="Your Doodle" className="max-h-full max-w-full object-contain" />
          </div>
        )}

        <div className="flex flex-col gap-3">
          <button
            onClick={handleDownload}
            className="w-full py-4.5 bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary/15 hover:shadow-xl transition-all"
          >
            <Download size={14} />
            {t('download_poster_image', 'Download Poster Image')}
          </button>

          <button
            onClick={handleCopy}
            className="w-full py-4 bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 dark:bg-slate-950 text-slate-600 dark:text-slate-350 font-black text-xs uppercase tracking-widest rounded-2xl border border-white/60 dark:border-slate-800 flex items-center justify-center gap-2 hover:bg-slate-100 transition-all"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? t('common.copied', 'Copied!') : t('copy_text', 'Copy Text')}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// --- Checklist / CheckIn Item ---

const CheckInItem: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
  <div className="flex items-center gap-4 p-4.5 bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 dark:bg-slate-955 rounded-2xl border border-white/60 dark:border-slate-850 group hover:border-primary/20 transition-all text-left">
    <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform shrink-0">
      {icon}
    </div>
    <span className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-tight">{text}</span>
  </div>
);

// --- Main Inner Component ---

function DoodleBurstInner() {
  const { t } = useTranslation(undefined, { i18n });
  const [screen, setScreen] = useState<Screen>('intro');
  const [timer, setTimer] = useState(60);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const canvasRef = useRef<DrawingCanvasRef>(null);
  const [finalDoodleUrl, setFinalDoodleUrl] = useState<string | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // History states
  const [historyList, setHistoryList] = useState<DoodleEntry[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  // URL localized sync
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const lang = params.get('lang') || 'en';
      loadLocale(lang);
    }
  }, []);

  const PROMPTS = useMemo(
    () => [
      { time: 60, text: t('prompt_1', 'Go wild! Doodle anything. 🎨') },
      { time: 30, text: t('prompt_2', 'Try filling the space with fun patterns. 🌀') },
      { time: 10, text: t('prompt_3', 'Slow down and draw a calm spiral. 🍥') },
    ],
    [t]
  );

  const completeSession = useCallback(() => {
    const dataUrl = canvasRef.current?.getDataUrl();
    if (dataUrl) {
      setFinalDoodleUrl(dataUrl);
      // Save to DB
      const entryId = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15);
      fetch(apiPath('/api/doodle-burst'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: entryId, imageUrl: dataUrl }),
      }).catch((err) => console.error('Save doodle error:', err));
    }
    setScreen('end');
  }, []);

  // Timer Tick
  useEffect(() => {
    if (screen !== 'activity') return;
    if (timer <= 0) {
      completeSession();
      return;
    }
    const id = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [screen, timer, completeSession]);

  // Prompt Swapper
  useEffect(() => {
    if (screen !== 'activity') return;
    const prompt = PROMPTS.find((p: { time: number; text: string }) => timer <= p.time);
    if (prompt) setCurrentPrompt(prompt.text);
  }, [timer, screen, PROMPTS]);

  const startActivity = useCallback(() => {
    setTimer(60);
    setCurrentPrompt(PROMPTS[0].text);
    setScreen('activity');
  }, [PROMPTS]);

  const fetchDoodles = useCallback(async () => {
    setHistoryLoading(true);
    try {
      const res = await fetch(apiPath('/api/doodle-burst'));
      if (res.ok) {
        const data = await res.json();
        const formatted = data.map((row: any) => ({
          id: row.id,
          imageUrl: row.image_url,
          createdAt: row.created_at,
        }));
        setHistoryList(formatted);
      }
    } catch (err) {
      console.error('Failed to fetch doodle logs:', err);
    } finally {
      setHistoryLoading(false);
    }
  }, []);

  useEffect(() => {
    if (screen === 'history') {
      fetchDoodles();
    }
  }, [screen, fetchDoodles]);

  const deleteDoodleItem = async (id: string) => {
    try {
      const res = await fetch(apiPath(`/api/doodle-burst?id=${id}`), {
        method: 'DELETE',
      });
      if (res.ok) {
        setHistoryList((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete doodle:', err);
    }
  };

  const handleReset = () => {
    setScreen('intro');
    setFinalDoodleUrl(null);
  };

  const screenOrder: Screen[] = ['intro', 'activity', 'end'];
  const currentIdx = screenOrder.indexOf(screen);

  return (
    <PremiumLayout
      title={t('app_title', 'Doodle Burst')}
      icon={<Palette className="w-6 h-6 text-primary" />}
      onBack={currentIdx > 0 && screen !== 'end' ? handleReset : undefined}
      onReset={currentIdx > 0 && screen !== 'end' ? handleReset : undefined}
    >
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-4 min-h-[70vh]">
        <AnimatePresence mode="wait">
          {/* SCREEN: INTRO */}
          {screen === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="w-full flex-1 flex flex-col"
            >
              <PremiumIntro
                title={t('app_title', 'Doodle Burst')}
                description={
                  t('intro_reason', 'Sometimes your brain just needs to move.') +
                  ' ' +
                  t('intro_benefit', 'Quick doodles can help release restlessness and reset your focus.')
                }
                onStart={startActivity}
                icon={<Palette size={32} />}
                benefits={[
                  t('intro_p1', 'Unleash your creativity'),
                  t('intro_p2', 'Release pent-up energy'),
                  t('intro_p3', 'Instant brain reset'),
                ]}
                duration={t('app_duration', '60 seconds')}
              >
                <div className="mt-10 flex justify-center">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setScreen('history')}
                    className="flex items-center gap-3 text-slate-500 dark:text-slate-400 hover:text-primary font-bold text-xs uppercase tracking-widest transition-all bg-white dark:bg-slate-900 px-6 py-3 rounded-2xl border border-white/60 dark:border-slate-800 shadow-sm"
                  >
                    <History size={16} />
                    {t('view_past_doodles', 'View Past Doodles')}
                  </motion.button>
                </div>
              </PremiumIntro>
            </motion.div>
          )}

          {/* SCREEN: ACTIVITY */}
          {screen === 'activity' && (
            <motion.div
              key="activity"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="flex flex-col items-center gap-6 w-full"
            >
              <div className="w-full flex flex-col items-center gap-6">
                {/* Header with Timer and Prompt */}
                <div className="w-full bg-white dark:bg-slate-900 rounded-[2rem] border border-white/60 dark:border-slate-800 p-6 shadow-sm flex items-center justify-between group hover:border-primary/20 transition-all text-left">
                  <div className="flex items-center gap-4">
                    <div className="w-18 h-18 rounded-2xl bg-primary/10 flex flex-col items-center justify-center text-primary border border-primary/15 shadow-sm shrink-0">
                      <span className="text-2xl font-black tabular-nums leading-none">{timer}</span>
                      <span className="text-[9px] font-black uppercase tracking-widest mt-1 opacity-60">
                        {t('sec', 'Sec')}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-black text-slate-350 dark:text-slate-500 uppercase tracking-widest mb-1">
                        {t('current_focus', 'Current Focus')}
                      </p>
                      <AnimatePresence mode="wait">
                        <motion.h2
                          key={currentPrompt}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          className="text-base font-black text-slate-800 dark:text-white tracking-tight leading-snug"
                        >
                          {currentPrompt}
                        </motion.h2>
                      </AnimatePresence>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 dark:bg-slate-950 flex items-center justify-center text-slate-205 dark:text-slate-800 shrink-0">
                    <Clock size={20} />
                  </div>
                </div>

                {/* Instructions */}
                <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest text-left px-1">
                  <Sparkles size={14} className="text-primary opacity-60" />
                  {t(
                    'activity_instructions',
                    'Draw anything you want. Try circles, zigzags, spirals, dots, or silly shapes. There are no rules — just keep your hand moving.'
                  )}
                </div>

                <DrawingCanvas ref={canvasRef} />

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={completeSession}
                  className="w-full py-4.5 bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary/15 hover:shadow-xl transition-all"
                >
                  <Check size={14} />
                  {t('complete_and_save', 'Complete & Save')}
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* SCREEN: COMPLETE */}
          {screen === 'end' && (
            <motion.div
              key="end"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <PremiumComplete
                title={t('end_title', 'Nice doodling! ✨')}
                message={t('end_saved', 'Your doodle has been saved! 📒')}
                onRestart={startActivity}
                icon={<Palette size={48} />}
              >
                <div className="space-y-6 w-full mt-6">
                  <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-white/60 dark:border-slate-800 p-6 shadow-sm space-y-4">
                    <p className="text-slate-500 dark:text-slate-400 font-bold text-sm leading-relaxed text-left px-1">
                      {t('end_reset', 'Even a quick doodle can help your brain reset.')}
                    </p>
                    <div className="grid gap-2.5">
                      <CheckInItem
                        icon={<Rocket className="text-primary" size={16} />}
                        text={t('checkin_brain', 'Does your brain feel lighter?')}
                      />
                      <CheckInItem
                        icon={<Sparkles className="text-primary" size={16} />}
                        text={t('checkin_calmer', 'Do you feel a little calmer?')}
                      />
                      <CheckInItem
                        icon={<Check className="text-primary" size={16} />}
                        text={t('checkin_task', 'Ready to get back to your task?')}
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setIsShareModalOpen(true)}
                      className="flex-1 py-4 bg-white dark:bg-slate-900 border border-white/60 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:text-slate-350 dark:hover:text-white font-black text-[10px] uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 shadow-sm transition-all"
                    >
                      <Share2 size={14} />
                      {t('share_doodle', 'Share Doodle')}
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setScreen('history')}
                      className="flex-1 py-4 bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-gradient-to-r from-primary to-sky-400 border-none font-black text-[10px] uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 transition-all"
                    >
                      <History size={14} />
                      {t('view_history', 'View History')}
                    </motion.button>
                  </div>
                </div>
              </PremiumComplete>
            </motion.div>
          )}

          {/* SCREEN: HISTORY GALLERY */}
          {screen === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="w-full flex-1 flex flex-col space-y-6 pb-20 text-left"
            >
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <span className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest">
                    <History size={12} />
                    {t('history_title', 'Doodle History')}
                  </span>
                  <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                    {t('history_title', 'Doodle History')}
                  </h1>
                </div>
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={handleReset}
                  className="p-3 bg-slate-100 dark:bg-slate-900 text-slate-650 dark:text-slate-350 rounded-2xl hover:bg-slate-200 dark:hover:opacity-90 hover:shadow-xl hover:shadow-primary/40 transition-colors shadow-sm"
                >
                  <ArrowLeft size={18} />
                </motion.button>
              </div>

              {historyLoading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3">
                  <Loader2 className="h-8 w-8 animate-spin text-primary opacity-30" />
                  <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                    {t('common.loading', 'Loading...')}
                  </p>
                </div>
              ) : historyList.length === 0 ? (
                <div className="text-center py-16 bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 dark:bg-slate-900 rounded-3xl border border-dashed border-slate-150 dark:border-slate-800">
                  <div className="w-14 h-14 bg-white dark:bg-slate-950 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-200 dark:text-slate-800 shadow-sm">
                    <Palette size={28} />
                  </div>
                  <p className="text-slate-450 dark:text-slate-400 font-bold text-sm px-6 mb-1">
                    {t('no_doodles', 'No doodles yet!')}
                  </p>
                  <p className="text-slate-400 dark:text-slate-550 text-xs px-6">
                    {t('history_empty_desc', 'Complete a Doodle Burst session and your artwork will be saved here automatically.')}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {historyList.map((entry) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-white/60 dark:border-slate-800 shadow-sm relative group overflow-hidden flex flex-col justify-between hover:border-primary/20 transition-all cursor-pointer"
                      onClick={() => {
                        setFinalDoodleUrl(entry.imageUrl);
                        setIsShareModalOpen(true);
                      }}
                    >
                      {/* Image Preview Box */}
                      <div className="aspect-video w-full rounded-2xl overflow-hidden bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 dark:bg-slate-950 p-2 flex items-center justify-center shadow-inner">
                        <img src={entry.imageUrl} alt="Doodle" className="max-h-full max-w-full object-contain" />
                      </div>

                      <div className="flex justify-between items-center pt-3 border-t border-slate-50 dark:border-slate-850 mt-3">
                        <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                          {parseDbDate(entry.createdAt).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation(); // prevent modal open
                            deleteDoodleItem(entry.id);
                          }}
                          className="text-[9px] font-black text-rose-400 hover:text-rose-600 transition-colors uppercase tracking-widest opacity-0 group-hover:opacity-100 focus:opacity-100 duration-150 shrink-0"
                        >
                          {t('delete_doodle', 'Delete')}
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        dataUrl={finalDoodleUrl || ''}
      />
    </PremiumLayout>
  );
}

export default function DoodleBurstPage() {
  return (
    <I18nextProvider i18n={i18n}>
      <DoodleBurstInner />
    </I18nextProvider>
  );
}
