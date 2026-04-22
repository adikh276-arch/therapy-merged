import React from 'react';
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FloatingShapes from "../components/FloatingShapes";
import DrawingCanvas, { type DrawingCanvasRef } from "../components/DrawingCanvas";
import ShareModal from "../components/ShareModal";
import { saveDoodle } from "../lib/doodleHistory";
import { Sparkles, ArrowRight, Rocket, History, Share2 } from "lucide-react";
import { shareDoodle } from "../lib/share";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../components/LanguageSelector";

type Screen = "intro" | "activity" | "end";

const Index = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [screen, setScreen] = useState<Screen>("intro");
  const [timer, setTimer] = useState(60);

  const PROMPTS = [
    { time: 60, text: t("prompt_1") },
    { time: 30, text: t("prompt_2") },
    { time: 10, text: t("prompt_3") },
  ];

  const [currentPrompt, setCurrentPrompt] = useState(PROMPTS[0].text);
  const canvasRef = useRef<DrawingCanvasRef>(null);
  const [finalDoodleUrl, setFinalDoodleUrl] = useState<string | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  useEffect(() => {
    if (screen !== "activity") return;
    if (timer <= 0) {
      const dataUrl = canvasRef.current?.getDataUrl();
      if (dataUrl) {
        setFinalDoodleUrl(dataUrl);
        saveDoodle(dataUrl).catch(err => {
          console.error("Save doodle error on timer end:", err);
        });
      }
      setScreen("end");
      return;
    }
    const id = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [screen, timer]);

  useEffect(() => {
    if (screen !== "activity") return;
    const prompt = PROMPTS.find((p) => timer <= p.time);
    if (prompt) setCurrentPrompt(prompt.text);
  }, [timer, screen, PROMPTS]);

  const startActivity = useCallback(() => {
    setTimer(60);
    setCurrentPrompt(t("prompt_1"));
    setScreen("activity");
  }, [t]);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen bg-playful relative flex items-center justify-center p-4">
      <LanguageSelector />
      <AnimatePresence mode="wait">
        {screen === "intro" && (
          <motion.div
            key="intro"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative z-10 w-full w-full mx-auto text-center flex flex-col items-center"
          >
            <FloatingShapes />
            <div className="relative z-10 flex flex-col items-center gap-6 py-12">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl"
              >
                ⚡
              </motion.div>

              <h1 className="text-4xl font-black text-foreground tracking-tight text-center">
                {t("app_title")} ⚡
              </h1>

              <p className="text-lg font-semibold text-muted-foreground text-center">
                {t("intro_subtitle")}
              </p>

              <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-6 shadow-soft text-center">
                <p className="text-foreground leading-relaxed text-justify">
                  {t("intro_reason")}
                  <br />
                  {t("intro_benefit")}
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={startActivity}
                className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-lg shadow-soft animate-pulse-glow transition-all"
              >
                {t("start_doodling")}
                <ArrowRight size={20} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("./history")}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-card text-foreground font-semibold text-base shadow-soft border border-border transition-all"
              >
                <History size={18} />
                {t("view_past_doodles")}
              </motion.button>
            </div>
          </motion.div>
        )}

        {screen === "activity" && (
          <motion.div
            key="activity"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative z-10 w-full w-full mx-auto flex flex-col items-center gap-4"
          >
            {/* Timer */}
            <div className="flex items-center gap-3">
              <div className="relative w-14 h-14 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 56 56">
                  <circle cx="28" cy="28" r="24" fill="none" stroke="hsl(var(--muted))" strokeWidth="4" />
                  <circle
                    cx="28" cy="28" r="24" fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 24}
                    strokeDashoffset={2 * Math.PI * 24 * (1 - timer / 60)}
                    className="transition-all duration-1000 ease-linear"
                  />
                </svg>
                <span className="text-lg font-black text-foreground">{timer}</span>
              </div>
              <motion.p
                key={currentPrompt}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-base font-bold text-foreground text-center"
              >
                {currentPrompt}
              </motion.p>
            </div>

            {/* Instructions */}
            <p className="text-sm text-muted-foreground text-center leading-relaxed w-full">
              {t("activity_instructions")}
            </p>

            <DrawingCanvas ref={canvasRef} />
          </motion.div>
        )}

        {screen === "end" && (
          <motion.div
            key="end"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative z-10 w-full w-full mx-auto text-center flex flex-col items-center gap-6 py-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
            >
              <Sparkles size={56} className="text-accent" />
            </motion.div>

            <h1 className="text-3xl font-black text-foreground text-center">
              {t("end_title")}
            </h1>

            <p className="text-sm text-muted-foreground">{t("end_saved")}</p>

            <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-6 shadow-soft">
              <p className="text-foreground mb-4 text-justify">
                {t("end_reset")}
              </p>
              <div className="flex flex-col gap-3 text-left">
                <CheckInItem emoji="🧠" text={t("checkin_brain")} />
                <CheckInItem emoji="😌" text={t("checkin_calmer")} />
                <CheckInItem emoji="🎯" text={t("checkin_task")} />
              </div>
            </div>

            <div className="flex flex-col gap-3 items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setScreen("intro")}
                className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-lg shadow-soft animate-pulse-glow transition-all"
              >
                {t("back_to_focus")}
                <Rocket size={20} />
              </motion.button>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setIsShareModalOpen(true)}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-card text-foreground font-semibold text-sm shadow-soft border border-border transition-all"
                >
                  <Share2 size={16} />
                  {t("share_doodle")}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate("./history")}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-card text-foreground font-semibold text-sm shadow-soft border border-border transition-all"
                >
                  <History size={16} />
                  {t("view_history")}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        originalDataUrl={finalDoodleUrl || ""}
      />
    </div>
  );
};

const CheckInItem: React.FC<{ emoji: string; text: string }> = ({ emoji, text }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.3 }}
    className="flex items-center gap-3 text-foreground"
  >
    <span className="text-xl">{emoji}</span>
    <span className="font-semibold text-justify">{text}</span>
  </motion.div>
);

export default Index;

