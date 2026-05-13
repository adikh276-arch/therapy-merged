import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartHandshake, Leaf, MessageSquare, Users, Lightbulb, Anchor, ShieldCheck, Award, Search, Mic, Sun, Smartphone, Ban, HelpCircle, Sparkles, BookOpen, Clock, X, Heart, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import ProgressDots from "@/features/what_do_i_need/components/ProgressDots";
import NeedChip from "@/features/what_do_i_need/components/NeedChip";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { PremiumComplete } from "@/components/shared/PremiumComplete";
import { neon } from "@neondatabase/serverless";
import { toast } from "sonner";

const NEED_ICON_MAP: Record<string, any> = {
  "Emotional support": HeartHandshake,
  "Space / time for myself": Leaf,
  "Clear communication": MessageSquare,
  "Reassurance": Users,
  "Understanding": Lightbulb,
  "Stability": Anchor,
  "Honesty": ShieldCheck,
  "Respect": Award,
  "Clarity about relationship": Search,
};

const ACTION_ICON_MAP: Record<string, any> = {
  "Say something honestly": Mic,
  "Take time for myself": Sun,
  "Reach out to someone": Smartphone,
  "Set a small boundary": Ban,
  "Not sure yet": HelpCircle,
};

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;

interface SavedReflection {
  date: string;
  primaryNeed: string;
  reflection: string;
  action: string;
}

const WhatDoINeedActivity = () => {
  const { t } = useTranslation();
  const [screen, setScreen] = useState(1);
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);
  const [customNeed, setCustomNeed] = useState("");
  const [step2Phase, setStep2Phase] = useState<"select" | "prioritize" | "focus">("select");
  const [primaryNeed, setPrimaryNeed] = useState("");
  const [reflection, setReflection] = useState("");
  const [selectedAction, setSelectedAction] = useState("");
  const [customAction, setCustomAction] = useState("");
  const [step3Phase, setStep3Phase] = useState<"reflect" | "action" | "closing">("reflect");
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<SavedReflection[]>([]);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);

  const fetchHistory = useCallback(async () => {
    const userId = sessionStorage.getItem("user_id");
    if (!userId || !DATABASE_URL) return;

    try {
      const sql = neon(DATABASE_URL);
      const results = await sql`SELECT needs, created_at FROM what_do_i_need_entries WHERE user_id = ${userId} ORDER BY created_at DESC LIMIT 20`;
      setHistory(results.map(r => ({
        date: new Date(r.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        primaryNeed: r.needs.primaryNeed,
        reflection: r.needs.reflection,
        action: r.needs.action,
      })));
    } catch (error) {
      console.error("Failed to fetch history:", error);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const needs_obj = t("needs", { returnObjects: true }) as Record<string, any>;
  const default_needs = Object.keys(NEED_ICON_MAP);
  
  const current_need_data = needs_obj[primaryNeed] || needs_obj["default"];
  const hints = current_need_data.hints || [];

  useEffect(() => {
    if (step3Phase !== "reflect" || hints.length === 0) return;
    const interval = setInterval(() => {
      setPlaceholderIdx((i) => (i + 1) % hints.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [step3Phase, hints.length]);

  const toggleNeed = useCallback((need: string) => {
    setSelectedNeeds((prev) =>
      prev.includes(need) ? prev.filter((n) => n !== need) : [...prev, need]
    );
  }, []);

  const addCustomNeed = () => {
    if (customNeed.trim() && !selectedNeeds.includes(customNeed.trim())) {
      setSelectedNeeds((prev) => [...prev, customNeed.trim()]);
      setCustomNeed("");
    }
  };

  const goToPrioritize = () => setStep2Phase("prioritize");
  const selectPrimary = (need: string) => {
    setPrimaryNeed(need);
    setStep2Phase("focus");
  };

  const goToScreen3 = () => {
    setScreen(3);
    setStep3Phase("reflect");
    setPlaceholderIdx(0);
  };

  const goToAction = () => setStep3Phase("action");
  const goToClosing = () => setStep3Phase("closing");

  const handleSave = async () => {
    const userId = sessionStorage.getItem("user_id");
    if (!userId || !DATABASE_URL) {
      toast.error(t("toasts.auth_error"));
      return;
    }

    const needsData = {
      primaryNeed,
      reflection,
      action: selectedAction || customAction,
    };

    try {
      const sql = neon(DATABASE_URL);
      await sql`INSERT INTO what_do_i_need_entries (user_id, needs) VALUES (${userId}, ${needsData})`;
      toast.success(t("toasts.save_success"));
      fetchHistory();
      setScreen(4);
    } catch (error) {
      console.error("Failed to save reflection:", error);
      toast.error(t("toasts.save_error"));
    }
  };

  const handleFinish = () => setScreen(4);

  const handleBack = () => {
    if (screen === 1) return;
    if (screen === 2) {
      if (step2Phase === "focus") setStep2Phase("prioritize");
      else if (step2Phase === "prioritize") setStep2Phase("select");
      else setScreen(1);
    } else if (screen === 3) {
      if (step3Phase === "closing") setStep3Phase("action");
      else if (step3Phase === "action") setStep3Phase("reflect");
      else { setScreen(2); setStep2Phase("focus"); }
    }
  };

  if (screen === 4) {
    return (
      <PremiumComplete
        title={t("app_title")}
        message={t("complete.message", { need: primaryNeed })}
        onRestart={() => {
          setScreen(1);
          setSelectedNeeds([]);
          setStep2Phase("select");
          setPrimaryNeed("");
          setReflection("");
        }}
      />
    );
  }

  const dynamicPrompt = current_need_data.prompt;
  const PrimaryIcon = NEED_ICON_MAP[primaryNeed] || Sparkles;
  const actions_data = t("actions", { returnObjects: true }) as any[];

  return (
    <PremiumLayout
      title={t("app_title")}
      subtitle={t("app_title")}
      icon={<Heart className="w-6 h-6 text-primary" />}
      onBack={screen === 1 ? undefined : handleBack}
    >
      <div className="w-full max-w-md mx-auto flex flex-col relative min-h-[70vh]" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif' }}>
        {/* History Button */}
        {screen === 1 && (
          <div className="absolute top-0 right-0 z-20">
            <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center hover:bg-slate-50 transition-all" title={t("past_reflections")} onClick={() => setShowHistory(true)}>
              <Clock className="w-5 h-5 text-slate-500" />
            </button>
          </div>
        )}

        {/* History Modal */}
        <AnimatePresence>
          {showHistory && (
            <motion.div
              className="fixed inset-0 z-[60] flex items-end justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowHistory(false)} />
              <motion.div
                className="relative w-full max-w-md bg-white rounded-t-[2.5rem] p-8 pb-12 max-h-[85vh] overflow-y-auto shadow-2xl"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-black text-slate-900">{t("history.title")}</h3>
                  <button onClick={() => setShowHistory(false)} className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors">
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                </div>
                {history.length === 0 ? (
                  <div className="py-20 text-center space-y-4">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                      <BookOpen size={32} />
                    </div>
                    <p className="text-slate-400 font-medium">{t("history.empty")}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {history.map((item, i) => {
                      const HistoryIcon = NEED_ICON_MAP[item.primaryNeed] || Sparkles;
                      return (
                        <motion.div 
                          key={i} 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="rounded-2xl p-5 bg-slate-50 border border-slate-100"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-primary">
                                <HistoryIcon size={16} />
                              </div>
                              <span className="font-bold text-slate-800">{item.primaryNeed}</span>
                            </div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.date}</span>
                          </div>
                          {item.reflection && (
                            <p className="text-sm text-slate-600 italic leading-relaxed mb-3">"{item.reflection}"</p>
                          )}
                          {item.action && (
                            <div className="flex items-center gap-2 text-xs font-black text-primary uppercase tracking-wider">
                              <ArrowRight size={12} strokeWidth={3} />
                              <span>{item.action}</span>
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content */}
        <div className="flex-1 flex flex-col pt-4">
          <AnimatePresence mode="wait">
            {/* ===== SCREEN 1 ===== */}
            {screen === 1 && (
              <motion.div
                key="screen1"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex-1 flex flex-col items-center justify-center text-center gap-8 py-10"
              >
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', damping: 15 }}
                  className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center text-primary"
                >
                  <Sparkles size={40} strokeWidth={2.5} />
                </motion.div>

                <div className="space-y-4">
                  <h1 className="text-3xl font-black text-slate-900 leading-tight">{t("screens.s1.title")}</h1>
                  <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-[280px] mx-auto">
                    {t("screens.s1.description")}
                  </p>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setScreen(2)} 
                  className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-slate-900/20 hover:bg-slate-800 transition-all mt-4"
                >
                  {t("screens.s1.button")}
                </motion.button>
              </motion.div>
            )}

            {/* ===== SCREEN 2 ===== */}
            {screen === 2 && (
              <motion.div
                key="screen2"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex-1 flex flex-col items-center gap-6 pt-4 w-full"
              >
                <AnimatePresence mode="wait">
                  {step2Phase === "select" && (
                    <motion.div key="s2-select" {...fadeUp} className="w-full space-y-8 flex flex-col items-center">
                      <h2 className="text-2xl font-black text-slate-900 text-center">
                        {t("screens.s2.select.title")}
                      </h2>
                      <div className="flex flex-wrap justify-center gap-3 w-full">
                        {default_needs.map((label) => (
                          <NeedChip
                            key={label}
                            label={needs_obj[label]?.label || label}
                            icon={NEED_ICON_MAP[label]}
                            selected={selectedNeeds.includes(label)}
                            onToggle={() => toggleNeed(label)}
                          />
                        ))}
                        {selectedNeeds
                          .filter((n) => !default_needs.includes(n))
                          .map((need) => (
                            <NeedChip
                              key={need}
                              label={need}
                              icon={Sparkles}
                              selected
                              onToggle={() => toggleNeed(need)}
                            />
                          ))}
                      </div>
                      <div className="flex items-center gap-3 w-full max-w-[280px]">
                        <input
                          value={customNeed}
                          onChange={(e) => setCustomNeed(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && addCustomNeed()}
                          placeholder={t("screens.s2.select.placeholder")}
                          className="flex-1 bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                        />
                        {customNeed.trim() && (
                          <button onClick={addCustomNeed} className="text-sm font-black text-primary uppercase tracking-widest">
                            {t("screens.s2.select.add_button")}
                          </button>
                        )}
                      </div>
                      {selectedNeeds.length > 0 && (
                        <motion.button 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          onClick={goToPrioritize} 
                          className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-slate-900/20 hover:bg-slate-800 transition-all"
                        >
                          {t("screens.s2.select.button")}
                        </motion.button>
                      )}
                    </motion.div>
                  )}

                  {step2Phase === "prioritize" && (
                    <motion.div key="s2-prioritize" {...fadeUp} className="w-full space-y-8 flex flex-col items-center">
                      <h2 className="text-2xl font-black text-slate-900">
                        {t("screens.s2.prioritize.title")}
                      </h2>
                      <div className="flex flex-wrap justify-center gap-3 w-full">
                        {selectedNeeds.map((need) => (
                          <NeedChip
                            key={need}
                            label={needs_obj[need]?.label || need}
                            icon={NEED_ICON_MAP[need] || Sparkles}
                            selected={primaryNeed === need}
                            onToggle={() => selectPrimary(need)}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step2Phase === "focus" && (
                    <motion.div key="s2-focus" {...fadeUp} className="w-full flex flex-col items-center gap-8 pt-8">
                      <div className="space-y-2 text-center">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t("screens.s2.focus.tag")}</p>
                        <motion.div
                          className="w-full p-10 rounded-[3rem] bg-white border border-slate-100 shadow-2xl shadow-primary/5 flex flex-col items-center gap-4"
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                        >
                          <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary">
                            <PrimaryIcon size={40} strokeWidth={2.5} />
                          </div>
                          <p className="text-2xl font-black text-slate-900">{needs_obj[primaryNeed]?.label || primaryNeed}</p>
                        </motion.div>
                      </div>
                      <button onClick={goToScreen3} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-slate-900/20 hover:bg-slate-800 transition-all">
                        {t("screens.s2.focus.button")}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* ===== SCREEN 3 ===== */}
            {screen === 3 && (
              <motion.div
                key="screen3"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex-1 flex flex-col items-center gap-6 pt-4"
              >
                <AnimatePresence mode="wait">
                  {step3Phase === "reflect" && (
                    <motion.div key="s3-reflect" {...fadeUp} className="w-full space-y-6 flex flex-col items-center">
                      <h2 className="text-2xl font-black text-slate-900 text-center leading-tight">
                        {dynamicPrompt}
                      </h2>
                      <textarea
                        value={reflection}
                        onChange={(e) => setReflection(e.target.value)}
                        placeholder={hints[placeholderIdx]}
                        rows={6}
                        className="w-full p-6 bg-white border border-slate-200 rounded-3xl text-lg font-medium leading-relaxed focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all resize-none shadow-sm"
                      />
                      {reflection.trim().length > 5 && (
                        <motion.button 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          onClick={goToAction} 
                          className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-slate-900/20 hover:bg-slate-800 transition-all"
                        >
                          {t("screens.s3.reflect.button")}
                        </motion.button>
                      )}
                    </motion.div>
                  )}

                  {step3Phase === "action" && (
                    <motion.div key="s3-action" {...fadeUp} className="w-full space-y-8 flex flex-col items-center">
                      <h2 className="text-2xl font-black text-slate-900 text-center">
                        {t("screens.s3.action.title")}
                      </h2>
                      <div className="flex flex-wrap justify-center gap-3">
                        {actions_data.map((action) => (
                          <NeedChip
                            key={action.label}
                            label={action.label}
                            icon={ACTION_ICON_MAP[action.label] || HelpCircle}
                            selected={selectedAction === action.label}
                            onToggle={() => setSelectedAction(action.label === selectedAction ? "" : action.label)}
                          />
                        ))}
                      </div>
                      <input
                        value={customAction}
                        onChange={(e) => {
                          setCustomAction(e.target.value);
                          if (e.target.value) setSelectedAction("");
                        }}
                        placeholder={t("screens.s3.action.placeholder")}
                        className="w-full p-5 bg-white border border-slate-200 rounded-2xl text-base font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all shadow-sm"
                      />
                      {(selectedAction || customAction.trim()) && (
                        <button onClick={goToClosing} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-slate-900/20 hover:bg-slate-800 transition-all">
                          {t("screens.s3.action.button")}
                        </button>
                      )}
                    </motion.div>
                  )}

                  {step3Phase === "closing" && (
                    <motion.div key="s3-closing" {...fadeUp} className="w-full flex flex-col items-center gap-8 pt-4">
                      <div className="w-full p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-2xl shadow-primary/5 space-y-6">
                        <div className="space-y-1">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t("screens.s3.closing.tag_need")}</p>
                          <div className="flex items-center gap-3">
                            <PrimaryIcon size={20} className="text-primary" />
                            <p className="text-xl font-black text-slate-900">{needs_obj[primaryNeed]?.label || primaryNeed}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t("screens.s3.closing.tag_insight")}</p>
                          <p className="text-base text-slate-600 font-medium italic leading-relaxed">"{reflection}"</p>
                        </div>

                        {(selectedAction || customAction) && (
                          <div className="space-y-1">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t("screens.s3.closing.tag_action")}</p>
                            <p className="text-base font-bold text-slate-800">{selectedAction || customAction}</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="w-full space-y-4">
                        <button
                          onClick={handleSave}
                          className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black text-lg shadow-xl shadow-slate-900/20 hover:bg-slate-800 transition-all"
                        >
                          {t("screens.s3.closing.save_button")}
                        </button>
                        <button onClick={handleFinish} className="w-full py-5 rounded-2xl font-bold text-slate-500 hover:text-slate-900 transition-all">
                          {t("screens.s3.closing.finish_button")}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PremiumLayout>
  );
};

export default WhatDoINeedActivity;
