import React from 'react';
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import DrawingCanvas, { type DrawingCanvasRef } from "../components/DrawingCanvas";
import ShareModal from "../components/ShareModal";
import { saveDoodle } from "../lib/doodleHistory";
import { Sparkles, Rocket, History, Share2, Palette, Clock, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PremiumIntro } from "../../../components/shared/PremiumIntro";
import { PremiumComplete } from "../../../components/shared/PremiumComplete";
import { PremiumLayout } from "../../../components/shared/PremiumLayout";

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
    setCurrentPrompt(PROMPTS[0].text);
    setScreen("activity");
  }, [PROMPTS]);

  return (
    <PremiumLayout 
      title="Doodle Burst" 
      onReset={screen !== 'intro' ? () => setScreen('intro') : undefined}
    >
      <AnimatePresence mode="wait">
        {screen === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <PremiumIntro
              title={t("app_title")}
              description={t("intro_reason") + " " + t("intro_benefit")}
              onStart={startActivity}
              icon={<Palette size={32} />}
              benefits={[
                "Unleash your creativity",
                "Release pent-up energy",
                "Instant brain reset"
              ]}
              duration="60 seconds"
            >
              <div className="mt-8 text-center">
                <Link
                  to="./history"
                  className="inline-flex items-center gap-2 text-slate-400 hover:text-primary font-black text-xs uppercase tracking-widest transition-colors"
                >
                  <History size={16} />
                  {t("view_past_doodles")}
                </Link>
              </div>
            </PremiumIntro>
          </motion.div>
        )}

        {screen === "activity" && (
          <motion.div
            key="activity"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="w-full max-w-lg flex flex-col items-center gap-8">
              {/* Header with Timer and Prompt */}
              <div className="w-full bg-white rounded-[2.5rem] border-2 border-slate-100 p-8 shadow-sm flex items-center justify-between group hover:border-primary/20 transition-all">
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 rounded-3xl bg-primary/10 flex flex-col items-center justify-center text-primary border-2 border-primary/20 shadow-sm">
                    <span className="text-3xl font-black tabular-nums leading-none">{timer}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest mt-1 opacity-60">Sec</span>
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1.5">Current Focus</p>
                    <AnimatePresence mode="wait">
                      <motion.h2
                        key={currentPrompt}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="text-xl font-black text-slate-800 tracking-tight"
                      >
                        {currentPrompt}
                      </motion.h2>
                    </AnimatePresence>
                  </div>
                </div>
                <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center text-slate-200 group-hover:text-primary/40 transition-colors">
                  <Clock size={28} />
                </div>
              </div>

              {/* Instructions */}
              <div className="flex items-center gap-2.5 text-slate-400 text-xs font-black uppercase tracking-widest">
                <Sparkles size={16} className="text-primary opacity-60" />
                {t("activity_instructions")}
              </div>

              <DrawingCanvas ref={canvasRef} />
            </div>
          </motion.div>
        )}

        {screen === "end" && (
          <motion.div
            key="end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <PremiumComplete
              title={t("end_title")}
              message={t("end_saved")}
              onRestart={startActivity}
            >
              <div className="space-y-6 w-full max-w-md mx-auto mt-8">
                <div className="bg-white rounded-[2.5rem] border-2 border-slate-100 p-8 shadow-sm text-left space-y-6">
                   <p className="text-slate-500 font-bold text-sm leading-relaxed">{t("end_reset")}</p>
                   <div className="grid gap-3">
                     <CheckInItem icon={<Rocket className="text-primary" size={18} />} text={t("checkin_brain")} />
                     <CheckInItem icon={<Sparkles className="text-primary" size={18} />} text={t("checkin_calmer")} />
                     <CheckInItem icon={<Check className="text-primary" size={18} />} text={t("checkin_task")} />
                   </div>
                </div>

                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsShareModalOpen(true)}
                    className="flex-1 py-4 bg-white border-2 border-slate-100 text-slate-500 font-black text-xs uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-50 transition-all shadow-sm"
                  >
                    <Share2 size={16} />
                    {t("share_doodle")}
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate("./history")}
                    className="flex-1 py-4 bg-slate-100 text-slate-600 font-black text-xs uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-200 transition-all"
                  >
                    <History size={16} />
                    {t("view_history")}
                  </motion.button>
                </div>
              </div>
            </PremiumComplete>
          </motion.div>
        )}
      </AnimatePresence>
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        originalDataUrl={finalDoodleUrl || ""}
      />
    </PremiumLayout>
  );
};

const CheckInItem: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-[1.5rem] border border-slate-100 group hover:border-primary/20 transition-all">
    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <span className="text-sm font-black text-slate-700 uppercase tracking-tight">{text}</span>
  </div>
);

export default Index;
