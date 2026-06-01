'use client';

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Info, X, Calendar, Sparkles, Save, Heart, ChevronLeft } from "lucide-react";
import { useTranslation, I18nextProvider } from "react-i18next";
import i18n, { loadLocale } from "./i18n";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { PremiumComplete } from "@/components/shared/PremiumComplete";

const BUBBLE_COLORS = [
  "bg-rose-50 border-rose-200 text-rose-600",
  "bg-indigo-50 border-indigo-200 text-indigo-600",
  "bg-amber-50 border-amber-200 text-amber-650",
  "bg-emerald-50 border-emerald-200 text-emerald-600",
  "bg-cyan-50 border-cyan-200 text-cyan-600",
];

const BUBBLE_EMOJIS = ["💬", "🤗", "💪", "🎉", "🌟"];

const POSITIONS = [
  { angle: -90, r: 105 },
  { angle: -18, r: 105 },
  { angle: 54, r: 105 },
  { angle: 126, r: 105 },
  { angle: 198, r: 105 },
];

function getPos(angle: number, r: number) {
  const rad = (angle * Math.PI) / 180;
  return { x: Math.cos(rad) * r, y: Math.sin(rad) * r };
}

interface CircleEntry {
  id: string;
  date: string;
  names: Record<string, string>;
  reflection: string;
}

const BackgroundOrbs = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <motion.div
      animate={{ x: [0, 30, -20, 0], y: [0, -20, 15, 0] }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" as const }}
      className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-primary/10 blur-3xl"
    />
    <motion.div
      animate={{ x: [0, -25, 15, 0], y: [0, 25, -10, 0] }}
      transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" as const }}
      className="absolute top-1/3 -left-24 w-64 h-64 rounded-full bg-indigo-100/10 blur-3xl"
    />
    <motion.div
      animate={{ x: [0, 20, -15, 0], y: [0, -15, 25, 0] }}
      transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" as const }}
      className="absolute bottom-20 right-10 w-56 h-56 rounded-full bg-emerald-100/10 blur-3xl"
    />
  </div>
);

function RedrawCircleInner() {
  const { t } = useTranslation(undefined, { i18n });
  const [screen, setScreen] = useState<"intro" | "circle" | "reflection" | "history" | "complete">("intro");
  const [names, setNames] = useState<Record<string, string>>({});
  const [reflection, setReflection] = useState("");
  const [entries, setEntries] = useState<CircleEntry[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [selectedEntry, setSelectedEntry] = useState<CircleEntry | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sync URL query lang parameter
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const lang = params.get('lang') || 'en';
      loadLocale(lang);
    }
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/redraw-your-circle");
      if (res.ok) {
        const rows = await res.json();
        const formatted = rows.map((r: any) => {
          const parsed = typeof r.circles === "string" ? JSON.parse(r.circles) : r.circles;
          return {
            id: r.id,
            date: r.created_at,
            names: parsed.names || {},
            reflection: parsed.reflection || "",
          } as CircleEntry;
        });
        setEntries(formatted);
      }
    } catch (error) {
      console.error("Failed to fetch history:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    const id = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9);
    const payload = { id, circles: { names, reflection } };

    try {
      const res = await fetch("/api/redraw-your-circle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const newEntry: CircleEntry = {
          id,
          date: new Date().toISOString(),
          names,
          reflection,
        };
        setEntries(prev => [newEntry, ...prev]);
        setScreen("complete");
      }
    } catch (error) {
      console.error("Failed to save circle:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const deleteCircle = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm(t("common.confirm_delete", "Are you sure you want to delete this circle log?"))) return;
    try {
      const res = await fetch(`/api/redraw-your-circle?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setEntries(prev => prev.filter(c => c.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete circle:", err);
    }
  };

  const handleBubbleTap = (index: number) => {
    setActiveIndex(index);
    setInputValue(names[String(index)] || "");
  };

  const handleSaveBubbleName = () => {
    if (activeIndex === null) return;
    const trimmed = inputValue.trim();
    const updated = { ...names };
    if (trimmed) {
      updated[String(activeIndex)] = trimmed;
    } else {
      delete updated[String(activeIndex)];
    }
    setNames(updated);
    setActiveIndex(null);
    setInputValue("");
  };

  const reset = () => {
    setNames({});
    setReflection("");
    setScreen("intro");
  };

  const PROMPTS = ((_t => Array.isArray(_t) ? _t : null)(t("circle.prompts", { returnObjects: true }))) || [
    "Who is your practical support?",
    "Who makes you feel secure?",
    "Who encourages your goals?",
    "Who cheers you up?",
    "Who provides wise counsel?"
  ];

  const reflectionList = ((_t => Array.isArray(_t) ? _t : null)(t("reflection.list", { returnObjects: true }))) || [
    "Recognize the balance in your relationships",
    "Identify any gaps you would like to address",
    "Appreciate those who make you feel grounded",
    "Set simple intentions for your support system"
  ];

  if (screen === "complete") {
    return (
      <PremiumLayout title={t("app_title", "Redraw Your Circle")} showBack={false}>
        <PremiumComplete
          title={t("app_title", "Redraw Your Circle")}
          message={t("reflection.saved_success", "Your interpersonal map is safely stored in your journal. Cultivating these support nodes helps keep us resilient.")}
          onRestart={reset}
        />
      </PremiumLayout>
    );
  }

  return (
    <PremiumLayout
      title={t("app_title", "Redraw Your Circle")}
      icon={<Users className="w-6 h-6 text-primary" />}
      onBack={
        screen === "circle"
          ? () => setScreen("intro")
          : screen === "reflection"
          ? () => setScreen("circle")
          : screen === "history"
          ? () => setScreen("intro")
          : undefined
      }
    >
      <div className="w-full max-w-md mx-auto flex flex-col min-h-[60vh] relative select-none">
        <BackgroundOrbs />

        <AnimatePresence mode="wait">
          {/* INTRO SCREEN */}
          {screen === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex-1 flex flex-col items-center justify-center text-center space-y-6 relative z-10 py-6"
            >
              <div className="flex gap-2">
                <div className="w-2 bg-primary h-2 rounded-full" />
                <div className="w-1.5 bg-slate-200 h-1.5 rounded-full" />
                <div className="w-1.5 bg-slate-200 h-1.5 rounded-full" />
              </div>

              <span className="text-5xl mt-4">🫂</span>

              <h1 className="text-3xl font-black text-slate-900 leading-tight">
                {t("intro.title", "Redraw Your Circle")}
              </h1>

              <div className="text-slate-500 text-sm leading-relaxed max-w-xs space-y-3 font-medium">
                <p>{t("intro.p1", "No one can survive completely alone. Our resilience comes from a web of connection.")}</p>
                <p>{t("intro.p2", "This mapping activity helps you step back and look objectively at your current support system.")}</p>
              </div>

              <p className="text-xs text-slate-400 font-semibold italic max-w-xs leading-relaxed">
                {t("intro.italic", "Remember: Different people serve different purposes. Your circle is unique.")}
              </p>

              <div className="pt-4 flex flex-col gap-3 w-full max-w-xs">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setScreen("circle")}
                  className="w-full bg-primary text-white py-4.5 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:shadow-xl transition-all"
                >
                  {t("intro.button", "Start Redrawing")}
                </motion.button>
                
                <button
                  onClick={() => setScreen("history")}
                  className="text-xs font-black uppercase tracking-widest text-slate-450 hover:text-slate-700 py-2.5 transition-colors"
                >
                  {t("your_past_circles", "View Past Circles")}
                </button>
              </div>
            </motion.div>
          )}

          {/* CIRCLE SCREEN */}
          {screen === "circle" && (
            <motion.div
              key="circle"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="flex-1 flex flex-col items-center relative z-10 py-4"
            >
              <div className="flex gap-2">
                <div className="w-1.5 bg-slate-200 h-1.5 rounded-full" />
                <div className="w-2 bg-primary h-2 rounded-full" />
                <div className="w-1.5 bg-slate-200 h-1.5 rounded-full" />
              </div>

              <h2 className="text-2xl font-black text-slate-900 mt-6 leading-tight">
                {t("circle.title", "Add Support Nodes")}
              </h2>
              <p className="text-xs font-semibold text-slate-450 mt-1 max-w-xs text-center">
                {t("circle.desc", "Tap each bubble surrounding you and add the names of people who fill that space.")}
              </p>

              {/* Instructions Bar */}
              <div className="mt-4 bg-white/70 border border-slate-100 rounded-2xl px-4 py-2.5 flex items-center gap-2 max-w-xs shadow-sm">
                <Info className="w-4.5 h-4.5 text-primary shrink-0" />
                <span className="text-[11px] text-slate-500 font-bold leading-relaxed text-left">
                  {t("circle.instruction", "You don't need to fill all bubbles. Just add who comes to mind naturally.")}
                </span>
              </div>

              {/* Interactive Circle UI */}
              <div className="relative w-80 h-80 mx-auto mt-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-primary shadow-lg shadow-primary/20 flex flex-col items-center justify-center border-4 border-white z-10">
                  <span className="text-white text-[11px] font-black uppercase tracking-widest">{t("circle.center_node", "Me")}</span>
                </div>

                {Array.isArray(PROMPTS) && PROMPTS.map((prompt, i) => {
                  const { x, y } = getPos(POSITIONS[i].angle, POSITIONS[i].r);
                  const nodeName = names[String(i)];

                  return (
                    <motion.button
                      key={i}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: i * 0.08, duration: 0.4 }}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => handleBubbleTap(i)}
                      className={`absolute w-20 h-20 rounded-full border-2 p-1.5 flex flex-col items-center justify-center text-center transition-all ${
                        BUBBLE_COLORS[i]
                      } ${nodeName ? "shadow-md scale-105" : "shadow-sm opacity-80"}`}
                      style={{
                        left: `calc(50% + ${x}px - 40px)`,
                        top: `calc(50% + ${y}px - 40px)`,
                      }}
                    >
                      <span className="text-xl mb-0.5">{BUBBLE_EMOJIS[i]}</span>
                      <span className="text-[9px] font-black uppercase tracking-wide truncate max-w-full leading-tight">
                        {nodeName ? nodeName : prompt.split(" ").slice(-1)[0].replace("?", "")}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              <p className="text-[11px] text-slate-400 font-semibold italic mt-12 max-w-xs text-center">
                {t("circle.italic", "Nodes can represent family, friends, mentors, or even therapists.")}
              </p>

              <button
                onClick={() => setScreen("reflection")}
                className="mt-6 w-full max-w-xs bg-slate-900 text-white py-4 rounded-2xl font-bold shadow-lg"
              >
                {t("circle.button", "Continue to Reflection")}
              </button>
            </motion.div>
          )}

          {/* REFLECTION SCREEN */}
          {screen === "reflection" && (
            <motion.div
              key="reflection"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex-1 flex flex-col items-center relative z-10 py-4 text-center"
            >
              <div className="flex gap-2">
                <div className="w-1.5 bg-slate-200 h-1.5 rounded-full" />
                <div className="w-1.5 bg-slate-200 h-1.5 rounded-full" />
                <div className="w-2 bg-primary h-2 rounded-full" />
              </div>

              <span className="text-4xl mt-6">🪞</span>

              <h2 className="text-2xl font-black text-slate-900 mt-4 leading-tight">
                {t("reflection.title", "Coping Reflection")}
              </h2>

              <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-4 max-w-sm mt-6 text-left">
                <p className="text-slate-500 font-bold text-xs leading-relaxed">
                  {t("reflection.p_intro", "Take a look at the support system you mapped out. Keep these thoughts in mind:")}
                </p>
                <ul className="space-y-2 text-slate-600 text-xs font-semibold pl-1">
                  {Array.isArray(reflectionList) && reflectionList.map((item, idx) => (
                    <li key={idx} className="flex gap-2 items-start">
                      <span className="text-primary mt-0.5">🔹</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="w-full max-w-sm space-y-2 mt-6 text-left">
                <label className="text-[10px] font-black text-slate-450 uppercase tracking-widest pl-1">
                  {t("reflection.label", "Your reflection notes")}
                </label>
                <textarea
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  placeholder={t("reflection.placeholder", "What did this map reveal to you about your connections?")}
                  rows={4}
                  className="w-full bg-white border border-slate-150 rounded-2xl px-5 py-4 text-sm text-slate-800 focus:outline-none focus:border-primary/20 transition-all resize-none shadow-sm font-medium"
                />
              </div>

              <div className="flex flex-col gap-2 mt-6 w-full max-w-sm">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-full py-4.5 rounded-2xl bg-primary text-white font-bold shadow-lg flex items-center justify-center gap-2"
                >
                  <Save size={18} />
                  {isSaving ? "Saving..." : t("reflection.save_button", "Save Reflection")}
                </motion.button>
                <button
                  onClick={reset}
                  className="w-full py-2.5 text-slate-450 hover:text-slate-700 font-bold text-xs uppercase tracking-widest"
                >
                  {t("reflection.skip_button", "Skip")}
                </button>
              </div>
            </motion.div>
          )}

          {/* HISTORY SCREEN */}
          {screen === "history" && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex-1 flex flex-col relative z-10 py-4 text-left"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black text-slate-900">{t("your_past_circles", "Support Archive")}</h2>
                <button 
                  onClick={() => setScreen("intro")} 
                  className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-800 transition-colors"
                >
                  Back
                </button>
              </div>

              {isLoading ? (
                <div className="text-center py-12 text-slate-400 font-bold text-xs uppercase tracking-widest">
                  Loading history...
                </div>
              ) : entries.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-4 text-center">
                  <span className="text-4xl block">📭</span>
                  <p className="text-slate-450 font-bold text-sm">{t("no_entries_yet", "No circles mapped yet.")}</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
                  {entries.map((entry) => {
                    const namesList = Object.values(entry.names).filter(Boolean);
                    return (
                      <div
                        key={entry.id}
                        onClick={() => setSelectedEntry(entry)}
                        className="w-full bg-white border border-slate-100 rounded-3xl p-5 hover:shadow-lg transition-all cursor-pointer relative group flex flex-col gap-2"
                      >
                        <button
                          onClick={(e) => deleteCircle(entry.id, e)}
                          className="absolute top-4 right-4 text-slate-350 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={16} />
                        </button>
                        
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <Calendar size={12} />
                          <span className="text-[10px] font-black uppercase tracking-wider">
                            {new Date(entry.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-slate-800 font-bold text-base line-clamp-1 leading-snug">
                          {namesList.length > 0 ? namesList.join(", ") : "No names added"}
                        </p>
                        {entry.reflection && (
                          <p className="text-slate-500 text-xs italic font-medium line-clamp-2 mt-1">
                            "{entry.reflection}"
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* INPUT MODAL FOR CIRCLE BUBBLE */}
        <AnimatePresence>
          {activeIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm flex items-end justify-center z-50 px-4"
              onClick={() => setActiveIndex(null)}
            >
              <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                exit={{ y: 100 }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-t-[2.5rem] w-full max-w-md p-6 pb-12 shadow-2xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <span className="text-xl">{BUBBLE_EMOJIS[activeIndex]}</span>
                    {t("circle.modal.title", "Add Support Node")}
                  </h3>
                  <button
                    onClick={() => setActiveIndex(null)}
                    className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
                  >
                    <X className="w-4 h-4 text-slate-500" />
                  </button>
                </div>
                
                <p className="text-xs font-bold text-slate-400 mb-4 leading-relaxed">
                  {PROMPTS[activeIndex]}
                </p>
                
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSaveBubbleName()}
                  placeholder={t("circle.modal.placeholder", "Name of person...")}
                  autoFocus
                  className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-4 text-sm text-slate-800 outline-none focus:bg-white focus:border-primary/20 transition-all font-semibold"
                />
                
                <button
                  onClick={handleSaveBubbleName}
                  className="mt-6 w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-lg"
                >
                  {t("circle.modal.button", "Save Node")}
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* DETAIL MODAL FOR HISTORY ENTRY */}
        <AnimatePresence>
          {selectedEntry && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm flex items-end justify-center z-50 px-4"
              onClick={() => setSelectedEntry(null)}
            >
              <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                exit={{ y: 100 }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-t-[2.5rem] w-full max-w-md p-6 pb-12 shadow-2xl max-h-[80vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-6 border-b border-slate-50 pb-2">
                  <h3 className="text-base font-black text-slate-900">
                    Circle mapping — {new Date(selectedEntry.date).toLocaleDateString()}
                  </h3>
                  <button
                    onClick={() => setSelectedEntry(null)}
                    className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
                  >
                    <X className="w-4 h-4 text-slate-500" />
                  </button>
                </div>

                <div className="space-y-3">
                  {PROMPTS.map((prompt, i) => {
                    const nodeName = selectedEntry.names[String(i)];
                    return (
                      <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100/50 text-left">
                        <span className="text-2xl mt-0.5">{BUBBLE_EMOJIS[i]}</span>
                        <div className="space-y-0.5">
                          <p className="text-sm font-black text-slate-800">
                            {nodeName || "—"}
                          </p>
                          <p className="text-[10px] text-slate-400 font-bold leading-normal">
                            {prompt}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {selectedEntry.reflection && (
                  <div className="mt-5 p-5 bg-primary/5 rounded-3xl border border-primary/10 text-left">
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1.5">
                      💭 Reflection
                    </p>
                    <p className="text-sm text-slate-750 font-medium leading-relaxed italic">
                      "{selectedEntry.reflection}"
                    </p>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
}

export default function RedrawCirclePage() {
  return (
    <I18nextProvider i18n={i18n}>
      <RedrawCircleInner />
    </I18nextProvider>
  );
}
