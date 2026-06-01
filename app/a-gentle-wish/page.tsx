'use client';

import { useState, useCallback, useEffect } from "react";
import { useTranslation, I18nextProvider } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Sparkles, History, ChevronLeft, ChevronRight } from "lucide-react";
import i18n, { loadLocale } from "./i18n";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { PremiumComplete } from "@/components/shared/PremiumComplete";

export interface ReflectionEntry {
  id: string;
  name: string;
  relation?: string;
  wish: string;
  why?: string;
  smallStep?: string;
  date: string;
}

const reveal = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

function GentleWishInner() {
  const { t } = useTranslation(undefined, { i18n });
  const [screen, setScreen] = useState<"welcome" | "connection" | "carry" | "reflection" | "past">("welcome");
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("");
  const [wish, setWish] = useState("");
  const [why, setWhy] = useState("");
  const [smallStep, setSmallStep] = useState("");
  const [entries, setEntries] = useState<ReflectionEntry[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(false);

  // Sync lang param
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const lang = params.get('lang') || 'en';
      loadLocale(lang);
    }
  }, []);

  const fetchEntries = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/a-gentle-wish");
      if (res.ok) {
        const data = await res.json();
        setEntries(data);
      }
    } catch (error) {
      console.error("Failed to fetch gentle wishes:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const saveEntry = async () => {
    setIsSaving(true);
    const entry = {
      id: Date.now().toString(),
      name,
      relation: relation || undefined,
      wish,
      why: why || undefined,
      smallStep: smallStep || undefined,
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    };

    try {
      const res = await fetch("/api/a-gentle-wish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });
      if (res.ok) {
        setEntries(prev => [entry, ...prev]);
        setScreen("reflection");
      }
    } catch (error) {
      console.error("Failed to save gentle wish:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const resetForm = () => {
    setName("");
    setRelation("");
    setWish("");
    setWhy("");
    setSmallStep("");
  };

  const addAnother = () => {
    resetForm();
    setScreen("connection");
  };

  const [showCue, setShowCue] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [showDeeper, setShowDeeper] = useState(false);

  useEffect(() => {
    if (name.trim().length > 0) {
      const t = setTimeout(() => setShowCue(true), 600);
      return () => clearTimeout(t);
    }
    setShowCue(false);
    setShowPrompt(false);
    setShowDeeper(false);
  }, [name]);

  useEffect(() => {
    if (showCue) {
      const t = setTimeout(() => setShowPrompt(true), 2000);
      return () => clearTimeout(t);
    }
  }, [showCue]);

  useEffect(() => {
    if (wish.trim().length > 0 && showPrompt) {
      const t = setTimeout(() => setShowDeeper(true), 800);
      return () => clearTimeout(t);
    }
    setShowDeeper(false);
  }, [wish, showPrompt]);

  const titles: Record<string, string> = {
    welcome: t("nav.welcome", "Honoring Loss"),
    connection: t("nav.honoring", "Connection"),
    carry: t("nav.carry_forward", "Carry Forward"),
    reflection: t("nav.reflecting", "Reflection"),
    past: t("nav.history", "Past Tributes")
  };

  return (
    <PremiumLayout
      title={t("app_title", "A Gentle Wish")}
      subtitle={titles[screen]}
      icon={<Heart className="w-6 h-6 text-rose-400 animate-pulse" />}
      onBack={screen !== "welcome" ? () => setScreen("welcome") : undefined}
    >
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-4 min-h-[70vh]">
        <AnimatePresence mode="wait">
          {screen === "welcome" && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex-1 flex flex-col items-center text-center gap-8 py-10"
            >
              <div className="w-24 h-24 bg-rose-50 dark:bg-rose-950/20 rounded-[2.5rem] flex items-center justify-center text-5xl shadow-2xl animate-pulse">
                🕊️
              </div>

              <div className="space-y-3">
                <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white leading-tight">
                  {t("welcome_title", "A Gentle Wish")}
                </h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium italic">
                  {t("welcome_subtitle", "Honoring those we carry in our hearts")}
                </p>
              </div>

              <div className="space-y-6 text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-xs mx-auto text-base">
                <p>{t("welcome_description", "When we lose someone, our connection doesn't end. This is a quiet space to dedicate a gentle wish to them.")}</p>
                <div className="bg-white border border-slate-100 dark:bg-slate-900 dark:border-slate-800 rounded-3xl p-6 shadow-xl shadow-slate-200/50 italic text-slate-400">
                  {t("breathing_instruction", "Take a slow, deep breath in... and let it out fully. Bring their memory to mind.")}
                </div>
                <p className="text-sm font-black uppercase tracking-widest text-slate-350">{t("pace_instruction", "Take all the time you need")}</p>
              </div>

              <div className="w-full space-y-4">
                <button
                  onClick={() => setScreen("connection")}
                  className="w-full bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 py-5 rounded-2xl font-black text-lg shadow-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3"
                >
                  {t("begin_button", "Begin")}
                  <ChevronRight size={20} strokeWidth={3} />
                </button>
                {entries.length > 0 && (
                  <button
                    onClick={() => setScreen("past")}
                    className="w-full bg-white text-slate-600 dark:bg-slate-900 dark:text-slate-200 py-5 rounded-2xl font-black text-lg border border-slate-250 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-950 transition-all flex items-center justify-center gap-3 shadow-sm"
                  >
                    <History size={20} strokeWidth={3} />
                    {t("view_past_button", "View Past Tributes")}
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {screen === "connection" && (
            <motion.div
              key="connection"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col gap-8 py-4"
            >
              <header className="text-center space-y-2">
                <h2 className="text-3xl font-black text-slate-800 dark:text-white leading-tight">
                  {t("connection_title", "Who are you honoring?")}
                </h2>
                <p className="text-slate-500 dark:text-slate-400 font-medium text-base italic">
                  {t("connection_subtitle", "Bring their presence into this calm moment")}
                </p>
              </header>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] pl-4">
                    {t("label_name", "Their Name or Initials")}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("placeholder_name", "Name...")}
                    className="w-full bg-white border border-slate-100 dark:bg-slate-900 dark:border-slate-800 dark:text-white rounded-3xl px-8 py-5 text-slate-800 text-lg font-black placeholder:text-slate-200 focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all shadow-xl shadow-slate-200/50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] pl-4">
                    {t("label_relation", "Their Relationship to You")}
                  </label>
                  <input
                    type="text"
                    value={relation}
                    onChange={(e) => setRelation(e.target.value)}
                    placeholder={t("placeholder_relation", "Relation (optional)...")}
                    className="w-full bg-white border border-slate-100 dark:bg-slate-900 dark:border-slate-800 dark:text-white rounded-3xl px-8 py-4 text-slate-800 text-base font-bold placeholder:text-slate-200 focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all shadow-lg shadow-slate-200/40"
                  />
                </div>
              </div>

              <AnimatePresence>
                {showCue && (
                  <motion.div
                    variants={reveal}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="bg-rose-50/50 border border-rose-100 dark:bg-slate-900 dark:border-slate-800 rounded-[2.5rem] p-8 text-center space-y-4 shadow-inner"
                  >
                    <Heart className="w-8 h-8 text-rose-400 animate-pulse mx-auto" />
                    <p className="text-slate-650 dark:text-slate-300 font-bold italic leading-relaxed text-base">
                      {t("cue_body", `Take a moment to sit quietly with the memory of ${name.trim()}. Let yourself feel whatever emotion arises.`)}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {showPrompt && (
                  <motion.div
                    variants={reveal}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="space-y-6"
                  >
                    <div className="text-center space-y-2 px-4">
                      <p className="text-slate-850 dark:text-white font-black text-lg leading-snug">
                        {t("prompt_wish", `If you could offer one gentle wish to ${name.trim()} right now, what would it be?`)}
                      </p>
                      <p className="text-slate-400 font-medium text-xs italic">
                        {t("prompt_wish_subtitle", "It could be a wish of peace, comfort, or eternal love.")}
                      </p>
                    </div>

                    <textarea
                      value={wish}
                      onChange={(e) => setWish(e.target.value)}
                      placeholder={t("placeholder_wish", "I wish you...")}
                      rows={3}
                      className="w-full bg-white border border-slate-100 dark:bg-slate-900 dark:border-slate-800 dark:text-white rounded-[2rem] px-8 py-6 text-slate-800 text-lg font-medium placeholder:text-slate-200 focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all shadow-2xl shadow-slate-200/50 resize-none"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {showDeeper && (
                  <motion.div
                    variants={reveal}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="space-y-4"
                  >
                    <p className="text-center text-slate-400 dark:text-slate-500 font-medium text-sm italic flex items-center justify-center gap-2">
                      <Sparkles size={14} className="text-amber-400 animate-spin" />
                      {t("prompt_why", "Why does this wish feel important to you today?")}
                    </p>
                    <textarea
                      value={why}
                      onChange={(e) => setWhy(e.target.value)}
                      placeholder={t("placeholder_why", "This feels significant because...")}
                      rows={2}
                      className="w-full bg-slate-50 border border-slate-100 dark:bg-slate-950 dark:border-slate-900 dark:text-white rounded-[1.5rem] px-8 py-5 text-slate-700 text-base font-medium placeholder:text-slate-200 focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all resize-none shadow-inner"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-auto py-6">
                <button
                  onClick={() => setScreen("carry")}
                  disabled={!wish.trim()}
                  className="w-full bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 py-5 rounded-2xl font-black text-lg shadow-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 disabled:opacity-20"
                >
                  {t("continue_button", "Continue")}
                  <ChevronRight size={20} strokeWidth={3} />
                </button>
              </div>
            </motion.div>
          )}

          {screen === "carry" && (
            <motion.div
              key="carry"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col gap-6 py-4"
            >
              <h2 className="text-3xl font-black text-slate-800 dark:text-white text-center leading-tight">
                {t("carry_title", "Carry Forward")}
              </h2>

              <p className="text-center text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
                {t("carry_description", `Grief is not only about letting go. It is also about keeping connection alive. What beautiful quality, value, or habit of ${name.trim()} would you like to carry forward in your own daily actions?`)}
              </p>

              <div className="space-y-4">
                <p className="text-sm font-black text-slate-700 dark:text-slate-350 text-center uppercase tracking-wider block">
                  {t("carry_question", "One simple way I will carry their presence today:")}
                </p>
                <textarea
                  value={smallStep}
                  onChange={(e) => setSmallStep(e.target.value)}
                  placeholder={t("placeholder_step", "I will carry their kindness by...")}
                  rows={3}
                  className="w-full bg-white border border-slate-100 dark:bg-slate-900 dark:border-slate-800 dark:text-white rounded-2xl px-6 py-4 text-slate-800 placeholder:text-slate-200 font-medium text-base focus:ring-4 focus:ring-primary/5 transition-all resize-none shadow-sm"
                />
                <p className="text-xs text-slate-400 dark:text-slate-500 text-center font-semibold max-w-[280px] mx-auto leading-relaxed">
                  {t("carry_footer", "This doesn't need to be massive. A tiny, quiet action holds infinite value.")}
                </p>
              </div>

              <div className="mt-auto pt-8 space-y-3 w-full">
                <button
                  disabled={isSaving}
                  className="w-full bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 py-5 rounded-2xl font-black text-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
                  onClick={saveEntry}
                >
                  {isSaving ? t("saving...", "Preserving...") : t("save_button", "Preserve Tribute")}
                </button>
                <button
                  className="w-full bg-white text-slate-400 dark:bg-slate-900 dark:text-slate-500 py-4 rounded-xl font-bold text-sm border-2 border-dashed border-slate-200 dark:border-slate-800 hover:text-slate-650"
                  onClick={saveEntry}
                >
                  {t("skip_button", "Skip & Save")}
                </button>
              </div>
            </motion.div>
          )}

          {screen === "reflection" && (
            <motion.div
              key="reflection"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col items-center justify-center text-center gap-6"
            >
              <h2 className="text-3xl font-black text-slate-800 dark:text-white">
                {t("reflection_title", "Tribute Preserved")}
              </h2>

              <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 w-full space-y-6 shadow-xl border border-slate-50 dark:border-slate-850">
                <div>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-black mb-1">
                    {t("label_thinking_of", "Honoring")}
                  </p>
                  <p className="text-xl font-black text-slate-850 dark:text-white">{name}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-black mb-1">
                    {t("label_what_they_want", "Your Gentle Wish")}
                  </p>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-bold italic">"{wish}"</p>
                </div>
                {smallStep && (
                  <div>
                    <p className="text-[10px] text-slate-405 dark:text-slate-500 uppercase tracking-widest font-black mb-1">
                      {t("label_your_step", "Your Carry Forward Practice")}
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-bold">"{smallStep}"</p>
                  </div>
                )}
              </div>

              <p className="text-xs text-slate-450 dark:text-slate-500 mt-4 leading-relaxed max-w-xs font-semibold">
                {t("reflection_footer", "Your thoughts and commitments are kept secure. Let these memories continue to spark light inside you.")}
              </p>

              <div className="mt-auto pt-8 space-y-3 w-full">
                <button
                  className="w-full bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 py-5 rounded-2xl font-black text-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
                  onClick={addAnother}
                >
                  {t("add_another_button", "Honour Another Memory")}
                </button>
                <button
                  className="w-full bg-white text-slate-650 dark:bg-slate-900 dark:text-slate-300 py-5 rounded-2xl font-black text-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 transition-all"
                  onClick={() => setScreen("welcome")}
                >
                  {t("finish_button", "Return Home")}
                </button>
              </div>
            </motion.div>
          )}

          {screen === "past" && (
            <motion.div
              key="past"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex-1 flex flex-col gap-8 py-4"
            >
              <header className="text-center space-y-2">
                <h2 className="text-3xl font-black text-slate-800 dark:text-white leading-tight">
                  {t("past_entries_title", "Past Tributes")}
                </h2>
                <p className="text-slate-500 dark:text-slate-400 font-medium text-base">
                  {t("past_entries_subtitle", "Your quiet book of honoring memories")}
                </p>
              </header>

              <div className="flex-1 overflow-y-auto pr-2 space-y-6 max-h-[50vh]">
                {entries.length === 0 ? (
                  <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-12 text-center shadow-xl space-y-6">
                    <div className="w-16 h-16 bg-slate-50 dark:bg-slate-950 rounded-2xl flex items-center justify-center mx-auto text-3xl">
                      ⏳
                    </div>
                    <p className="text-slate-550 dark:text-slate-400 font-bold text-sm">
                      {t("no_past_entries", "No entries exist yet.")}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {entries.map((entry, i) => (
                      <motion.div
                        key={entry.id || i}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.6 }}
                        className="bg-white border border-slate-100 dark:bg-slate-900 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-2xl space-y-4 hover:shadow-primary/5 transition-all duration-300"
                      >
                        <div className="flex items-center justify-between">
                          <span className="px-4 py-1.5 rounded-full bg-rose-50/50 text-rose-500 text-[10px] font-black uppercase tracking-[0.2em]">
                            {entry.date}
                          </span>
                          <Heart size={16} className="text-rose-300 animate-pulse" fill="currentColor" />
                        </div>

                        <div className="space-y-3">
                          <p className="text-slate-850 dark:text-white font-black text-xl leading-tight">
                            {entry.name} {entry.relation && <span className="text-xs font-black uppercase text-slate-400">({entry.relation})</span>}
                          </p>
                          <div className="relative">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-rose-100 rounded-full" />
                            <p className="pl-6 text-slate-650 dark:text-slate-350 text-base leading-relaxed font-bold italic">
                              "{entry.wish}"
                            </p>
                          </div>
                        </div>

                        {entry.smallStep && (
                          <div className="pt-4 border-t border-slate-50 dark:border-slate-850">
                            <p className="text-[10px] font-black text-slate-300 dark:text-slate-500 uppercase tracking-[0.2em] mb-2">
                              {t("label_step_preserved", "Carry Forward Habit")}
                            </p>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-bold italic">
                              "{entry.smallStep}"
                            </p>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => setScreen("welcome")}
                className="w-full bg-white text-slate-650 dark:bg-slate-900 dark:text-slate-300 py-5 rounded-2xl font-black text-lg border border-slate-200 dark:border-slate-850 hover:bg-slate-50 transition-all flex items-center justify-center gap-3 shadow-sm"
              >
                <ChevronLeft size={20} strokeWidth={3} />
                {t("back_to_reflection_button", "Back")}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
}

export default function GentleWishPage() {
  return (
    <I18nextProvider i18n={i18n}>
      <GentleWishInner />
    </I18nextProvider>
  );
}
