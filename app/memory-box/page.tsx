'use client';

import { useState, useEffect, useMemo, forwardRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Archive, ChevronLeft, ChevronRight, X, Save, Trash2, Sparkles, Feather, Coffee, MessageCircle, Smile, MapPin, Mail, Sunrise } from "lucide-react";
import { useTranslation, I18nextProvider } from "react-i18next";
import i18n, { loadLocale } from "./i18n";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { PremiumComplete } from "@/components/shared/PremiumComplete";
import { apiPath } from '@/lib/apiPath';

export interface Memory {
  id: string;
  name: string;
  relation?: string;
  category: string;
  text: string;
  message?: string;
  createdAt: string;
}

const PARTICLES = [
  { icon: <Heart fill="currentColor" strokeWidth={0} />, size: 18 },
  { icon: <Heart fill="currentColor" strokeWidth={0} />, size: 14 },
  { icon: <Heart fill="currentColor" strokeWidth={0} />, size: 20 },
  { icon: <Heart fill="currentColor" strokeWidth={0} />, size: 16 },
];

interface ScreenWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const ScreenWrapper = forwardRef<HTMLDivElement, ScreenWrapperProps>(({ children, className = "" }, ref) => {
  const floatingItems = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => {
        const p = PARTICLES[i % PARTICLES.length];
        return {
          ...p,
          id: i,
          left: `${5 + Math.random() * 85}%`,
          delay: Math.random() * 8,
          duration: 12 + Math.random() * 10,
          startY: 110 + Math.random() * 20,
          xDrift: -30 + Math.random() * 60,
          opacity: 0.18 + Math.random() * 0.22,
        };
      }),
    []
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className={`relative flex-1 flex flex-col items-center justify-center px-4 py-8 text-center overflow-hidden min-h-[50vh] ${className}`}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] rounded-full bg-secondary/15 blur-[100px]" />
      </div>

      <div className="pointer-events-none absolute inset-0">
        {floatingItems.map((item) => (
          <motion.span
            key={item.id}
            className="absolute select-none"
            style={{
              left: item.left,
              fontSize: item.size,
              opacity: 0,
            }}
            animate={{
              y: [`${item.startY}vh`, "-10vh"],
              x: [0, item.xDrift],
              opacity: [0, item.opacity, item.opacity, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: item.duration,
              delay: item.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {item.icon}
          </motion.span>
        ))}
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">
        {children}
      </div>
    </motion.div>
  );
});
ScreenWrapper.displayName = "ScreenWrapper";

const PROMPTS: Record<string, { text: string; emoji?: string; icon?: React.ReactNode }> = {
  "A happy moment": { text: "Tell me about a happy moment with", icon: <Smile className="w-5 h-5" /> },
  "Something they used to say": { text: "What did they used to say?", icon: <MessageCircle className="w-5 h-5" /> },
  "A small everyday memory": { text: "Describe a small everyday moment with", icon: <Coffee className="w-5 h-5" /> },
  "A place that reminds you of them": { text: "What place reminds you of", emoji: "" },
  "Something I wish I could say": { text: "What would you want to say to", emoji: "" },
};

function MemoryBoxInner() {
  const { t } = useTranslation(undefined, { i18n });
  const [screen, setScreen] = useState(0);
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("");
  const [category, setCategory] = useState("");
  const [memoryText, setMemoryText] = useState("");
  const [message, setMessage] = useState("");
  const [memories, setMemories] = useState<Memory[]>([]);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [lastSaved, setLastSaved] = useState<Memory | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sync URL query lang parameter
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const lang = params.get('lang') || 'en';
      loadLocale(lang);
    }
    fetchMemories();
  }, []);

  const fetchMemories = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(apiPath("/api/memory-box"));
      if (res.ok) {
        const rows = await res.json();
        const formatted = rows.map((r: any) => {
          try {
            return JSON.parse(r.memory_data) as Memory;
          } catch {
            return {
              id: r.id,
              name: "Loved One",
              category: "General",
              text: r.memory_data,
              createdAt: r.created_at,
            } as Memory;
          }
        });
        setMemories(formatted);
      }
    } catch (error) {
      console.error("Failed to fetch memories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveMemory = async () => {
    if (!name.trim() || !category || !memoryText.trim()) return;

    setIsSaving(true);
    const newMemory: Memory = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
      name,
      relation,
      category,
      text: memoryText,
      message,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch(apiPath("/api/memory-box"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMemory),
      });

      if (res.ok) {
        setMemories(prev => [newMemory, ...prev]);
        setLastSaved(newMemory);
        setScreen(3);
      }
    } catch (error) {
      console.error("Failed to save memory:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const deleteMemory = async (id: string) => {
    if (!window.confirm(t("common.confirm_delete", "Are you sure you want to delete this memory?"))) return;
    try {
      const res = await fetch(apiPath(`/api/memory-box?id=${id}`), { method: "DELETE" });
      if (res.ok) {
        setMemories(prev => prev.filter(m => m.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete memory:", err);
    }
  };

  const resetForNew = () => {
    setName("");
    setRelation("");
    setCategory("");
    setMemoryText("");
    setMessage("");
    setScreen(1);
  };

  const resetAll = () => {
    resetForNew();
    setScreen(0);
  };

  const CATEGORIES = ((_t => Array.isArray(_t) ? _t : null)(t("who.categories", { returnObjects: true }))) || [
    { label: "A happy moment", icon: <Smile className="w-5 h-5" /> },
    { label: "Something they used to say", icon: <MessageCircle className="w-5 h-5" /> },
    { label: "A small everyday memory", icon: <Coffee className="w-5 h-5" /> },
    { label: "A place that reminds you of them", icon: <MapPin className="w-5 h-5" /> },
    { label: "Something I wish I could say", icon: <Mail className="w-5 h-5" /> }
  ];

  const info = PROMPTS[category] || { text: "Share a memory about", icon: <Sparkles className="w-5 h-5" /> };
  const promptText = category === "Something they used to say" || category === "Something I wish I could say"
    ? `${info.text} ${name}?`
    : `${info.text} ${name}…`;

  if (screen === 5) {
    return (
      <PremiumComplete
        title={t("app_title", "Memory Box")}
        message={t("complete_message", `You have beautifully stored a memory of {{name}} in your digital box.`, { name: name || "your loved one" })}
        onRestart={resetAll}
                  shareContent={"I just completed 'Memory Box' on TherapyMantra — a guided memory preservation that genuinely helped me. Try it! \n\n Android: https://play.google.com/store/apps/details?id=org.mantracare.therapy\n iOS: https://apps.apple.com/pk/app/therapymantra/id1607643888"}
      />
    );
  }

  return (
    <PremiumLayout
      title={t("app_title", "Memory Box")}
      icon={<Heart className="w-6 h-6 text-primary" />}
      onBack={screen > 0 ? () => setScreen(prev => prev - 1) : undefined}
      onReset={screen > 0 ? resetAll : undefined}
    >
      <div className="w-full max-w-md mx-auto flex flex-col min-h-[60vh] select-none relative">
        {/* Progress Tracker */}
        <div className="flex justify-center gap-2 mb-8">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i <= screen ? "w-8 bg-primary" : "w-2 bg-slate-200"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* SCREEN 0: WELCOME */}
          {screen === 0 && (
            <ScreenWrapper key="welcome">
              <div className="absolute top-0 right-0 p-4">
                <button
                  onClick={() => setHistoryOpen(true)}
                  className="w-10 h-10 rounded-2xl bg-white/60 backdrop-blur-lg border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-center text-slate-500 hover:text-primary shadow-sm hover:shadow-md transition-all"
                  title="View History"
                >
                  <Archive size={20} />
                </button>
              </div>

              <div className="space-y-6 max-w-xs">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" as const }}
                  className="text-6xl"
                ><Feather className="inline-block w-8 h-8" /></motion.div>

                <h1 className="text-3xl font-black text-slate-900 leading-tight">
                  {t("welcome.title", "Memory Box")}
                </h1>

                <div className="space-y-4 text-slate-500 text-sm leading-relaxed text-center font-medium">
                  <p>{t("welcome.subtitle1", "Grief doesn't have a timeline. Some days are heavier than others.")}</p>
                  <p>{t("welcome.subtitle2", "This digital memory box is a safe place to preserve precious moments.")}</p>
                </div>

                <motion.div
                  className="w-14 h-14 mx-auto rounded-full bg-primary/10 border border-primary/20"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" as const }}
                />

                <div className="pt-4 space-y-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setScreen(1)}
                    className="w-full py-4.5 rounded-2xl bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:shadow-xl transition-all duration-300"
                  >
                    {t("welcome.begin", "Open Your Box")}
                  </motion.button>
                </div>
              </div>
            </ScreenWrapper>
          )}

          {/* SCREEN 1: WHO SCREEN */}
          {screen === 1 && (
            <ScreenWrapper key="who">
              <div className="space-y-6 w-full max-w-xs">
                <div className="flex justify-center text-primary"><Sparkles className="w-12 h-12" /></div>

                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder={t("who.placeholder_name", "Who are you remembering?")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="field-input text-center"
                  />
                  <input
                    type="text"
                    placeholder={t("who.placeholder_relation", "Their relationship to you (optional)")}
                    value={relation}
                    onChange={(e) => setRelation(e.target.value)}
                    className="field-input text-center"
                  />
                </div>

                <div className="space-y-2 max-h-[30vh] overflow-y-auto pr-1">
                  {Array.isArray(CATEGORIES) && CATEGORIES.map((cat: any, i) => (
                    <motion.button
                      key={cat.label || cat}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * i, duration: 0.4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setCategory(cat.label || cat)}
                      className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold transition-all duration-300 border flex items-center justify-center gap-2 ${
                        category === (cat.label || cat)
                          ? "bg-primary text-white border-primary shadow-md"
                          : "bg-white border-slate-150 text-slate-500 hover:bg-slate-50"
                      }`}
                    >
                      <span>{cat.icon || cat.emoji || ""}</span>
                      <span>{cat.label || cat}</span>
                    </motion.button>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: name.trim() && category ? 1.02 : 1 }}
                  whileTap={{ scale: name.trim() && category ? 0.98 : 1 }}
                  onClick={() => setScreen(2)}
                  disabled={!name.trim() || !category}
                  className="w-full py-4 rounded-2xl bg-slate-900 text-white shadow-md font-bold shadow-lg disabled:opacity-40 disabled:scale-100"
                >
                  {t("who.continue", "Continue")}
                </motion.button>
              </div>
            </ScreenWrapper>
          )}

          {/* SCREEN 2: EXPRESSION SCREEN */}
          {screen === 2 && (
            <ScreenWrapper key="expression">
              <div className="space-y-5 w-full max-w-xs text-left">
                <div className="text-4xl text-center">{info.icon || info.emoji}</div>

                <h2 className="text-2xl font-black text-slate-950 text-center">
                  {t("take_your_time", "Take Your Time")}
                </h2>

                <p className="text-slate-500 text-sm text-center font-bold mb-2 leading-relaxed">
                  {promptText}
                </p>

                <textarea
                  value={memoryText}
                  onChange={(e) => setMemoryText(e.target.value)}
                  placeholder={t("write_as_much_or_as_little_as_you_want", "Type your memory here...")}
                  rows={4}
                  className="field-textarea"
                />

                <div className="space-y-2">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">
                     {t("expression.message_label", "A message to them (optional)")}
                  </p>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t("if_there_s_something_you_d_like_to_say", "Is there something you want to tell them?")}
                    rows={2}
                    className="field-textarea"
                  />
                </div>

                <div className="pt-2 space-y-2">
                  <motion.button
                    whileHover={{ scale: memoryText.trim() ? 1.02 : 1 }}
                    whileTap={{ scale: memoryText.trim() ? 0.98 : 1 }}
                    onClick={saveMemory}
                    disabled={!memoryText.trim() || isSaving}
                    className="w-full py-4 rounded-2xl bg-primary text-white font-bold shadow-lg shadow-primary/10 hover:shadow-xl disabled:opacity-40"
                  >
                    {isSaving ? t("preserving", "Preserving...") : t("save_to_memory_box", "Save to Memory Box")}
                  </motion.button>
                  <button
                    onClick={() => setScreen(3)}
                    className="w-full py-2.5 text-slate-450 hover:text-slate-700 font-bold text-xs uppercase tracking-widest text-center"
                  >
                    {t("expression.skip", "Skip to Box")}
                  </button>
                </div>
              </div>
            </ScreenWrapper>
          )}

          {/* SCREEN 3: MEMORY BOX SCREEN */}
          {screen === 3 && (
            <ScreenWrapper key="memorybox">
              <div className="space-y-6 w-full max-w-xs">
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", duration: 0.8 }}
                  className="text-6xl"
                >
                  <Archive className="w-16 h-16 text-primary mx-auto" />
                </motion.div>

                <h2 className="text-2xl font-black text-slate-900">
                  {t("box.saved_title", "Kept Safe")}
                </h2>

                {lastSaved && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="bg-white/60 backdrop-blur-lg border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-5 shadow-sm space-y-3 text-left"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg"><Heart className="w-5 h-5" /></span>
                      <p className="font-extrabold text-slate-850">{lastSaved.name}</p>
                    </div>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest opacity-80">
                      {lastSaved.category}
                    </p>
                    <p className="text-slate-650 text-sm font-medium leading-relaxed line-clamp-3">
                      {lastSaved.text}
                    </p>
                    {lastSaved.message && (
                      <p className="text-primary text-xs italic font-bold pt-1.5 border-t border-slate-50">
                         "{lastSaved.message}"
                      </p>
                    )}
                  </motion.div>
                )}

                <p className="text-slate-450 text-sm font-medium leading-relaxed">
                  {t("this_memory_is_held_here_for_you", "This memory is held gently for you, whenever you wish to return.")}
                </p>

                <div className="pt-2 space-y-3 w-full">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={resetForNew}
                    className="w-full py-4 rounded-2xl bg-primary text-white font-bold shadow-lg"
                  >
                    {t("add_another_memory", "Add Another Memory")}
                  </motion.button>
                  <button
                    onClick={() => setScreen(4)}
                    className="w-full py-3.5 rounded-2xl bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 hover:bg-slate-100 border border-white/60 text-slate-600 font-bold text-sm transition-all"
                  >
                    {t("finish_for_now", "Finish for Now")}
                  </button>
                </div>
              </div>
            </ScreenWrapper>
          )}

          {/* SCREEN 4: CLOSING SCREEN */}
          {screen === 4 && (
            <ScreenWrapper key="closing">
              <div className="space-y-6 max-w-xs">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-5xl"
                >
                  <Sunrise className="w-14 h-14 text-orange-400 mx-auto" />
                </motion.div>

                <h2 className="text-2xl font-black text-slate-900">
                  {t("before_you_go", "Before You Go")}
                </h2>

                <div className="space-y-4 text-slate-500 font-medium text-sm leading-relaxed">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {t("grief_comes_in_waves", "Grief comes in waves, and each wave is a testament to the depth of your love.")}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    {t("what_you_re_feeling_matters", "Whatever you are feeling today — sorrow, joy, longing, or empty — is completely okay.")}
                  </motion.p>
                </div>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setScreen(5)}
                  className="w-full py-4 rounded-2xl bg-primary text-white font-bold shadow-lg"
                >
                  {t("save_exit", "Save & Exit")}
                </motion.button>
              </div>
            </ScreenWrapper>
          )}
        </AnimatePresence>

        {/* CUSTOM SHEET HISTORY */}
        <AnimatePresence>
          {historyOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex justify-center items-end"
              onClick={() => setHistoryOpen(false)}
            >
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                className="bg-[#F8FAFC] w-full max-w-lg rounded-t-[2.5rem] p-6 max-h-[85vh] overflow-y-auto shadow-2xl flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <Archive className="text-primary w-5 h-5" />
                    <h3 className="text-lg font-black text-slate-900">{t("past_entries", "Memory Archive")}</h3>
                  </div>
                  <button
                    onClick={() => setHistoryOpen(false)}
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all text-slate-500"
                  >
                    <X size={16} />
                  </button>
                </div>

                {isLoading ? (
                  <div className="text-center py-12 text-slate-400 font-bold text-xs uppercase tracking-widest">
                    Loading entries...
                  </div>
                ) : memories.length === 0 ? (
                  <div className="text-center py-16 space-y-4">
                    <span className="flex justify-center mb-2"><Archive className="w-10 h-10 text-slate-300" /></span>
                    <p className="text-slate-450 text-sm font-medium">
                      {t("no_memories_saved_yet", "No memories saved yet. Your box is empty.")}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 pb-12 overflow-y-auto">
                    {memories.map((m) => (
                      <motion.div
                        key={m.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/60 backdrop-blur-lg border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-5 shadow-sm space-y-3 relative group text-left"
                      >
                        <button
                          onClick={() => deleteMemory(m.id)}
                          className="absolute top-4 right-4 text-slate-350 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Delete Memory"
                        >
                          <Trash2 size={16} />
                        </button>
                        <div className="space-y-1">
                          <p className="font-extrabold text-slate-850 text-base">{m.name}</p>
                          {m.relation && (
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{m.relation}</p>
                          )}
                        </div>
                        <div className="inline-block px-2.5 py-1 rounded-lg bg-primary/5 text-primary text-[10px] font-black uppercase tracking-wider">
                          {m.category}
                        </div>
                        <p className="text-slate-650 text-sm font-medium leading-relaxed whitespace-pre-line">
                          {m.text}
                        </p>
                        {m.message && (
                          <div className="pt-2 border-t border-slate-50 italic text-xs text-primary font-semibold">
                             "{m.message}"
                          </div>
                        )}
                      </motion.div>
                    ))}
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

export default function MemoryBoxPage() {
  return (
    <I18nextProvider i18n={i18n}>
      <MemoryBoxInner />
    </I18nextProvider>
  );
}