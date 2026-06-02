'use client';

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartHandshake, Leaf, MessageSquare, Users, Lightbulb, Anchor, ShieldCheck, Award, Search, Mic, Sun, Smartphone, Ban, HelpCircle, Sparkles, BookOpen, Clock, X, Heart, ArrowRight } from "lucide-react";
import { useTranslation, I18nextProvider } from "react-i18next";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { PremiumComplete } from "@/components/shared/PremiumComplete";
import i18n, { loadLocale } from "./i18n";
import { apiPath } from '@/lib/apiPath';
const toast = {
  success: (msg: string) => console.log("SUCCESS:", msg),
  error: (msg: string) => {
    console.error("ERROR:", msg);
    if (typeof window !== "undefined") {
      window.alert(msg);
    }
  }
};

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

interface SavedReflection {
  id: string;
  date: string;
  primaryNeed: string;
  reflection: string;
  action: string;
}

// --- CHIP COMPONENT ---
interface NeedChipProps {
  label: string;
  selected: boolean;
  onToggle: () => void;
  icon?: any;
}

const NeedChip = ({ label, selected, onToggle, icon: Icon }: NeedChipProps) => (
  <motion.button
    onClick={onToggle}
    className={`inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-full text-sm font-medium cursor-pointer select-none transition-all duration-200 ease-out border ${
      selected
        ? "bg-[var(--lavender)] text-white border-[var(--lavender)] scale-[1.05] shadow-[0_4px_14px_rgba(154,106,220,0.3)]"
        : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
    }`}
    whileTap={{ scale: 0.95 }}
    layout
  >
    {Icon && <Icon size={16} className={selected ? "text-white" : "text-primary"} />}
    <span>{label}</span>
  </motion.button>
);

function WhatDoINeedInner() {
  const { t } = useTranslation(undefined, { i18n });
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
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  // Sync lang parameter from query
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const lang = params.get('lang') || 'en';
      loadLocale(lang);
    }
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setIsLoadingHistory(true);
    try {
      const res = await fetch(apiPath("/api/what-do-i-need"));
      if (res.ok) {
        const rows = await res.json();
        setHistory(rows.map((r: any) => {
          let parsed: any = {};
          try {
            parsed = JSON.parse(r.needs);
          } catch {
            parsed = { primaryNeed: r.needs, reflection: "", action: "" };
          }
          return {
            id: r.id,
            date: (() => {
              if (!r.created_at) return "N/A";
              try {
                const normalized = String(r.created_at).replace(" ", "T");
                const d = new Date(normalized);
                if (isNaN(d.getTime())) {
                  const d2 = new Date(r.created_at);
                  if (isNaN(d2.getTime())) return "N/A";
                  return d2.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
                }
                return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
              } catch {
                return "N/A";
              }
            })(),
            primaryNeed: parsed.primaryNeed || "General",
            reflection: parsed.reflection || "",
            action: parsed.action || "",
          };
        }));
      }
    } catch (error) {
      console.error("Failed to fetch history:", error);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const deleteReflection = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this reflection?")) return;
    try {
      const res = await fetch(apiPath(`/api/what-do-i-need?id=${id}`), { method: "DELETE" });
      if (res.ok) {
        setHistory(prev => prev.filter(item => item.id !== id));
        toast.success("Reflection deleted");
      } else {
        toast.error("Failed to delete reflection");
      }
    } catch (err) {
      console.error("Failed to delete reflection:", err);
      toast.error("Failed to delete reflection");
    }
  };

  const tNeeds = t("needs", { returnObjects: true });
  const needs_obj = (typeof tNeeds === 'object' && tNeeds !== null && !Array.isArray(tNeeds) ? tNeeds as any : null) || {
    "Emotional support": { label: "Emotional support", prompt: "What kind of support would actually help you right now?", hints: ["I just need someone to...", "It would help if...", "What I really want is..."] },
    "Space / time for myself": { label: "Space / time for myself", prompt: "What would having that space look like for you?", hints: ["I'd use that time to...", "Space would let me...", "I need room to..."] },
    "default": { prompt: "What would this look like in a real situation?", hints: ["What comes to mind is...", "Right now I feel...", "If I'm honest with myself..."] }
  };

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
    const needsData = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
      primaryNeed,
      reflection,
      action: selectedAction || customAction,
    };

    try {
      const res = await fetch(apiPath("/api/what-do-i-need"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(needsData),
      });

      if (res.ok) {
        toast.success(t("toasts.save_success", "Reflection saved"));
        fetchHistory();
        setScreen(4);
      } else {
        toast.error(t("toasts.save_error", "Failed to save reflection"));
      }
    } catch (error) {
      console.error("Failed to save reflection:", error);
      toast.error(t("toasts.save_error", "Failed to save reflection"));
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
        title={t("app_title", "What Do I Need?")}
        message={t("complete.message", { need: primaryNeed, defaultValue: `You've identified that you need "${primaryNeed}". Honoring your needs is a vital form of self-care.` })}
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

  const dynamicPrompt = current_need_data.prompt || t("needs.default.prompt", "What would this look like in a real situation?");
  const PrimaryIcon = NEED_ICON_MAP[primaryNeed] || Sparkles;
  const actions_data = ((_t => Array.isArray(_t) ? _t : null)(t("actions", { returnObjects: true }))) || [
    { label: "Say something honestly" },
    { label: "Take time for myself" },
    { label: "Reach out to someone" },
    { label: "Set a small boundary" },
    { label: "Not sure yet" }
  ];

  return (
    <PremiumLayout
      title={t("app_title", "What Do I Need?")}
      subtitle={t("app_title", "What Do I Need?")}
      icon={<Heart className="w-6 h-6 text-primary" />}
      onBack={screen === 1 ? undefined : handleBack}
    >
      <style>{`
        :root {
          --lavender: #9a6adc;
          --lavender-light: #f3ebfc;
          --blue-soft-light: #edf4fc;
          --glow: #a47be4;
        }
      `}</style>
      <div className="w-full max-w-md mx-auto flex flex-col relative min-h-[70vh]">
        {/* History Button */}
        {screen === 1 && (
          <div className="absolute top-0 right-0 z-20">
            <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center hover:bg-slate-50 transition-all" title={t("past_reflections", "Past Reflections")} onClick={() => setShowHistory(true)}>
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
                className="relative w-full max-w-md bg-white rounded-t-[2.5rem] p-8 pb-12 max-h-[85vh] overflow-y-auto shadow-2xl z-10"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-black text-slate-900">{t("history.title", "Past Reflections")}</h3>
                  <button onClick={() => setShowHistory(false)} className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors">
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                </div>
                {isLoadingHistory ? (
                  <div className="py-20 text-center text-slate-400 font-bold text-xs uppercase tracking-widest">
                    Loading...
                  </div>
                ) : history.length === 0 ? (
                  <div className="py-20 text-center space-y-4">
                    <div className="w-16 h-16 bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                      <BookOpen size={32} />
                    </div>
                    <p className="text-slate-400 font-medium">{t("history.empty", "No reflections yet.")}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {history.map((item, i) => {
                      const HistoryIcon = NEED_ICON_MAP[item.primaryNeed] || Sparkles;
                      return (
                        <motion.div 
                          key={item.id || i} 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="rounded-2xl p-5 bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 border border-white/60 relative group"
                        >
                          <button
                            onClick={() => deleteReflection(item.id)}
                            className="absolute top-4 right-4 text-slate-350 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Delete Entry"
                          >
                            <TrashIcon size={16} />
                          </button>
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
                            <p className="text-sm text-slate-650 italic leading-relaxed mb-3">"{item.reflection}"</p>
                          )}
                          {item.action && (
                            <div className="flex items-center gap-2 text-xs font-black text-[#9a6adc] uppercase tracking-wider">
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
                  <h1 className="text-3xl font-black text-slate-900 leading-tight">
                    {t("screens.s1.title", "What Do I Need Right Now?")}
                  </h1>
                  <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-[280px] mx-auto">
                    {t("screens.s1.description", "A moment to pause and listen to what your heart is asking for.")}
                  </p>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setScreen(2)} 
                  className="w-full bg-slate-900 text-white shadow-md py-5 rounded-2xl font-black text-lg shadow-xl shadow-slate-900/20 hover:opacity-90 hover:shadow-xl hover:shadow-primary/40 transition-all mt-4"
                >
                  {t("screens.s1.button", "Start Check-in")}
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
                        {t("screens.s2.select.title", "What feels important?")}
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
                          placeholder={t("screens.s2.select.placeholder", "Something else...")}
                          className="flex-1 bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                        />
                        {customNeed.trim() && (
                          <button onClick={addCustomNeed} className="text-sm font-black text-[#9a6adc] uppercase tracking-widest">
                            {t("screens.s2.select.add_button", "Add")}
                          </button>
                        )}
                      </div>
                      {selectedNeeds.length > 0 && (
                        <motion.button 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          onClick={goToPrioritize} 
                          className="w-full bg-slate-900 text-white shadow-md py-5 rounded-2xl font-black text-lg shadow-xl shadow-slate-900/20 hover:opacity-90 hover:shadow-xl hover:shadow-primary/40 transition-all"
                        >
                          {t("screens.s2.select.button", "Continue")}
                        </motion.button>
                      )}
                    </motion.div>
                  )}

                  {step2Phase === "prioritize" && (
                    <motion.div key="s2-prioritize" {...fadeUp} className="w-full space-y-8 flex flex-col items-center">
                      <h2 className="text-2xl font-black text-slate-900 text-center">
                        {t("screens.s2.prioritize.title", "Which one is primary?")}
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
                      <div className="space-y-2 text-center w-full">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t("screens.s2.focus.tag", "Your focus right now")}</p>
                        <motion.div
                          className="w-full p-10 rounded-[3rem] bg-white/60 backdrop-blur-lg border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] shadow-2xl flex flex-col items-center gap-4 focus-card"
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                        >
                          <div className="w-20 h-20 bg-white/60 backdrop-blur-md rounded-3xl flex items-center justify-center text-[#9a6adc] shadow-sm">
                            <PrimaryIcon size={40} strokeWidth={2.5} />
                          </div>
                          <p className="text-2xl font-black text-slate-900">{needs_obj[primaryNeed]?.label || primaryNeed}</p>
                        </motion.div>
                      </div>
                      <button onClick={goToScreen3} className="w-full bg-slate-900 text-white shadow-md py-5 rounded-2xl font-black text-lg shadow-xl shadow-slate-900/20 hover:opacity-90 hover:shadow-xl hover:shadow-primary/40 transition-all">
                        {t("screens.s2.focus.button", "Continue")}
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
                className="flex-1 flex flex-col items-center gap-6 pt-4 w-full"
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
                          className="w-full bg-slate-900 text-white shadow-md py-5 rounded-2xl font-black text-lg shadow-xl shadow-slate-900/20 hover:opacity-90 hover:shadow-xl hover:shadow-primary/40 transition-all"
                        >
                          {t("screens.s3.reflect.button", "Continue")}
                        </motion.button>
                      )}
                    </motion.div>
                  )}

                  {step3Phase === "action" && (
                    <motion.div key="s3-action" {...fadeUp} className="w-full space-y-8 flex flex-col items-center">
                      <h2 className="text-2xl font-black text-slate-900 text-center">
                        {t("screens.s3.action.title", "A small step forward?")}
                      </h2>
                      <div className="flex flex-wrap justify-center gap-3">
                        {actions_data.map((action: any) => (
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
                        placeholder={t("screens.s3.action.placeholder", "Or write your own...")}
                        className="w-full p-5 bg-white border border-slate-200 rounded-2xl text-base font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all shadow-sm"
                      />
                      {(selectedAction || customAction.trim()) && (
                        <button onClick={goToClosing} className="w-full bg-slate-900 text-white shadow-md py-5 rounded-2xl font-black text-lg shadow-xl shadow-slate-900/20 hover:opacity-90 hover:shadow-xl hover:shadow-primary/40 transition-all">
                          {t("screens.s3.action.button", "Review Reflection")}
                        </button>
                      )}
                    </motion.div>
                  )}

                  {step3Phase === "closing" && (
                    <motion.div key="s3-closing" {...fadeUp} className="w-full flex flex-col items-center gap-8 pt-4">
                      <div className="w-full p-8 rounded-[2.5rem] bg-white/60 backdrop-blur-lg border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] shadow-2xl space-y-6 summary-card">
                        <div className="space-y-1">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t("screens.s3.closing.tag_need", "Primary Need")}</p>
                          <div className="flex items-center gap-3">
                            <PrimaryIcon size={20} className="text-slate-800" />
                            <p className="text-xl font-black text-slate-900">{needs_obj[primaryNeed]?.label || primaryNeed}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t("screens.s3.closing.tag_insight", "Your Insight")}</p>
                          <p className="text-base text-slate-700 font-medium italic leading-relaxed">"{reflection}"</p>
                        </div>

                        {(selectedAction || customAction) && (
                          <div className="space-y-1">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t("screens.s3.closing.tag_action", "Small Action")}</p>
                            <p className="text-base font-bold text-slate-800">{selectedAction || customAction}</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="w-full space-y-4">
                        <button
                          onClick={handleSave}
                          className="w-full py-5 rounded-2xl bg-slate-900 text-white shadow-md font-black text-lg shadow-xl shadow-slate-900/20 hover:opacity-90 hover:shadow-xl hover:shadow-primary/40 transition-all"
                        >
                          {t("screens.s3.closing.save_button", "Save & Finish")}
                        </button>
                        <button onClick={handleFinish} className="w-full py-5 rounded-2xl font-bold text-slate-500 hover:text-slate-900 transition-all text-center">
                          {t("screens.s3.closing.finish_button", "Finish without saving")}
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
}

function TrashIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2">
      <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6" />
    </svg>
  );
}

export default function WhatDoINeedPage() {
  return (
    <I18nextProvider i18n={i18n}>
      <WhatDoINeedInner />
    </I18nextProvider>
  );
}
