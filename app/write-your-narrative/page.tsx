'use client';

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, History, Save, ChevronRight, ChevronLeft, Sparkles } from "lucide-react";
import { useTranslation, I18nextProvider } from "react-i18next";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { PremiumComplete } from "@/components/shared/PremiumComplete";
import i18n, { loadLocale } from "./i18n";
import { apiPath } from '@/lib/apiPath';

type Screen = "entry" | "writing" | "landing" | "history" | "complete";

interface SavedEntry {
  id?: string;
  writing: string;
  reflection: string;
  date: string;
}

// --- CUSTOM TOAST HELPERS ---
const localToast = {
  success: (msg: string) => console.log("SUCCESS:", msg),
  error: (msg: string) => {
    console.error("ERROR:", msg);
    if (typeof window !== "undefined") {
      window.alert(msg);
    }
  }
};

// --- SCREENS ---

interface ScreenEntryProps {
  onContinue: () => void;
  onHistory: () => void;
}

function ScreenEntry({ onContinue, onHistory }: ScreenEntryProps) {
  const { t } = useTranslation(undefined, { i18n });
  const description = t("entry.description", { returnObjects: true }) as string[];

  return (
    <div className="flex-1 flex flex-col items-center text-center gap-8 py-10">
      <div className="w-24 h-24 bg-primary/10 rounded-[2.5rem] flex items-center justify-center text-6xl shadow-2xl animate-bounce-slow">
        📖
      </div>
      
      <div className="space-y-6">
        <h1 className="text-3xl font-black text-slate-800 leading-tight">
          {t("entry.title")}
        </h1>
        
        <div className="space-y-4 text-slate-500 font-medium leading-relaxed max-w-xs mx-auto text-base">
          {description && Array.isArray(description) && description.map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}
          <p className="italic text-slate-400">{t("entry.breath")}</p>
        </div>
      </div>

      <div className="w-full space-y-4">
        <button
          onClick={onContinue}
          className="w-full bg-slate-900 text-white shadow-md py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:opacity-90 hover:shadow-xl hover:shadow-primary/40 transition-all flex items-center justify-center gap-3"
        >
          {t("entry.button_ready")}
          <ChevronRight size={20} strokeWidth={3} />
        </button>
        
        <button
          onClick={onHistory}
          className="w-full bg-white text-slate-600 py-5 rounded-2xl font-black text-lg border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-3 shadow-sm"
        >
          <History size={20} strokeWidth={3} />
          {t("entry.button_history")}
        </button>
      </div>

      <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
        {t("entry.footer")}
      </p>
    </div>
  );
}

interface ScreenWritingProps {
  writing: string;
  setWriting: (v: string) => void;
  onContinue: () => void;
}

function ScreenWriting({ writing, setWriting, onContinue }: ScreenWritingProps) {
  const { t } = useTranslation(undefined, { i18n });
  const [activePrompt, setActivePrompt] = useState<string | null>(null);

  const prompts = t("writing.prompts", { returnObjects: true }) as any[];

  const handlePromptClick = (promptText: string) => {
    setActivePrompt(promptText);
    if (!writing) {
      setWriting(promptText + " ");
    }
  };

  return (
    <div className="flex-1 flex flex-col gap-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black text-slate-800 leading-tight">
          {t("writing.title")}
        </h1>
        <p className="text-slate-500 font-medium text-base italic">{t("writing.subtitle")}</p>
      </div>

      <div className="space-y-4">
        <p className="text-center text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
          {t("writing.prompt_label")}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {prompts && Array.isArray(prompts) && prompts.map((p) => (
            <button
              key={p.text}
              onClick={() => handlePromptClick(p.text)}
              className={`text-sm font-black rounded-2xl px-5 py-3 transition-all duration-300 border ${
                activePrompt === p.text
                  ? "bg-primary text-white border-primary shadow-xl shadow-primary/20 scale-[1.03]"
                  : "bg-white/50 backdrop-blur-md border-white/50 shadow-sm text-slate-600 hover:bg-white/80 hover:shadow-md"
              }`}
            >
              {p.emoji} {p.text}
            </button>
          ))}
        </div>
      </div>

      {/* Notebook effect */}
      <div className="relative rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200/50 border border-white/60 bg-white group transition-all duration-500 hover:shadow-primary/5">
        {/* Notebook spine */}
        <div className="absolute left-0 top-0 bottom-0 w-2 bg-slate-100 group-hover:bg-primary/20 transition-colors z-10" />
        {/* Red margin line */}
        <div className="absolute left-12 top-0 bottom-0 w-[2px] bg-red-100/50 z-10" />
        
        {/* Lined background */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent, transparent 39px, #f1f5f9 39px, #f1f5f9 40px)",
            backgroundPosition: "0 24px",
          }}
        />
        
        <textarea
          value={writing}
          onChange={(e) => setWriting(e.target.value)}
          placeholder={t("writing.placeholder")}
          className="relative z-[1] w-full min-h-[350px] bg-transparent pl-16 pr-10 py-8 text-slate-800 text-lg leading-[40px] text-left placeholder:text-slate-350 focus:outline-none resize-none font-medium"
        />
      </div>

      <div className="space-y-6">
        <p className="text-center text-slate-400 text-[13px] flex items-center justify-center gap-2 italic">
          <Sparkles size={14} className="text-primary/40" />
          {t("writing.notice")}
        </p>

        <button
          onClick={onContinue}
          className="w-full bg-slate-900 text-white shadow-md py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:opacity-90 hover:shadow-xl hover:shadow-primary/40 transition-all flex items-center justify-center gap-3"
        >
          {t("writing.button")}
          <ChevronRight size={20} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}

interface ScreenLandingProps {
  reflection: string;
  setReflection: (v: string) => void;
}

function ScreenLanding({ reflection, setReflection }: ScreenLandingProps) {
  const { t } = useTranslation(undefined, { i18n });
  const steps = t("landing.steps", { returnObjects: true }) as string[];

  return (
    <div className="flex-1 flex flex-col gap-8">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-4xl shadow-inner">
          🌿
        </div>
        <h1 className="text-3xl font-black text-slate-800 leading-tight">
          {t("landing.title")}
        </h1>
        <p className="text-slate-500 font-medium text-base italic">{t("landing.subtitle")}</p>
      </div>

      <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-6">
        <div className="flex items-center gap-4 text-slate-800 font-black text-lg">
          <span className="text-emerald-500 text-xl font-bold">✓</span>
          {t("landing.settle_title")}
        </div>
        
        <div className="space-y-4">
          {steps && Array.isArray(steps) && steps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 border border-white/60">
              <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center font-black text-slate-400 text-xs shadow-sm">{idx + 1}</div>
              <p className="text-slate-600 text-sm font-medium leading-relaxed pt-1">
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] pl-4">
          {t("landing.feeling_label")}
        </label>
        <input
          type="text"
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder={t("landing.feeling_placeholder")}
          className="field-textarea text-lg text-center"
        />
      </div>

      <p className="text-center text-slate-400 text-[13px] leading-relaxed font-medium italic">
        {t("landing.quote")}
      </p>
    </div>
  );
}

interface ScreenPastEntriesProps {
  entries: SavedEntry[];
  onBack: () => void;
}

function ScreenPastEntries({ entries, onBack }: ScreenPastEntriesProps) {
  const { t } = useTranslation(undefined, { i18n });

  return (
    <div className="flex-1 flex flex-col gap-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black text-slate-800 leading-tight">
          {t("history.title")}
        </h1>
        <p className="text-slate-500 font-medium text-base">{t("history.subtitle")}</p>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-6">
        {entries.length === 0 ? (
          <div className="bg-white/60 backdrop-blur-lg border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-12 text-center shadow-xl shadow-slate-200/50">
            <div className="w-16 h-16 bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl">
              ⏳
            </div>
            <p className="text-slate-500 font-medium text-base leading-relaxed">
              {t("history.empty")}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {entries.map((entry, i) => (
              <div
                key={entry.id || i}
                className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-4 hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <span className="px-4 py-1.5 rounded-full bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                    {entry.date}
                  </span>
                  {entry.reflection && (
                    <span className="text-primary font-black text-xs italic">
                      {entry.reflection}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/20 rounded-full" />
                  <p className="pl-6 text-slate-700 text-base leading-relaxed font-medium line-clamp-4 whitespace-pre-wrap">
                    {entry.writing || <span className="italic text-slate-300">{t("history.no_writing")}</span>}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={onBack}
        className="w-full bg-white text-slate-600 py-5 rounded-2xl font-black text-lg border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-3 shadow-sm"
      >
        <ChevronLeft size={20} strokeWidth={3} />
        {t("history.button_back")}
      </button>
    </div>
  );
}

// --- MAIN INNER ---

function WritingNarrativeInner() {
  const { t } = useTranslation(undefined, { i18n });
  const [screen, setScreen] = useState<Screen>("entry");
  const [writing, setWriting] = useState("");
  const [reflection, setReflection] = useState("");
  const [entries, setEntries] = useState<SavedEntry[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  // Load language from query parameter
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const lang = params.get("lang") || "en";
      loadLocale(lang);
    }
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const res = await fetch(apiPath("/api/write-your-narrative"));
      if (res.ok) {
        const rows = await res.json();
        const mappedEntries = rows.map((r: any) => {
          let parsed: any = {};
          try {
            parsed = JSON.parse(r.narrative_data);
          } catch {
            parsed = { writing: r.narrative_data, reflection: "" };
          }
          return {
            id: r.id,
            writing: parsed.writing,
            reflection: parsed.reflection,
            date: parsed.date || (() => {
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
            })()
          } as SavedEntry;
        });
        setEntries(mappedEntries);
      }
    } catch (error) {
      console.error("Failed to fetch narrative entries:", error);
    }
  };

  const goTo = useCallback((next: Screen) => {
    setScreen(next);
  }, []);

  const saveEntry = useCallback(async () => {
    setIsSaving(true);
    const entry: SavedEntry = {
      writing,
      reflection,
      date: new Date().toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric",
      }),
    };

    try {
      const res = await fetch(apiPath("/api/write-your-narrative"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });

      if (res.ok) {
        localToast.success(t("toasts.save_success"));
        setWriting("");
        setReflection("");
        fetchEntries();
        goTo("complete");
      } else {
        localToast.error(t("toasts.save_error"));
      }
    } catch (error) {
      console.error("Failed to save narrative:", error);
      localToast.error(t("toasts.save_error"));
    } finally {
      setIsSaving(false);
    }
  }, [writing, reflection, goTo, t]);

  if (screen === "complete") {
    return (
      <PremiumComplete
        title={t("app_title")}
        message={t("complete.message")}
        onRestart={() => setScreen("entry")}
                  shareEmoji="📝"
                  shareContent={"I just completed 'Write Your Narrative' on TherapyMantra — a guided narrative therapy that genuinely helped me. Try it! 🌿\n\n📱 Android: https://play.google.com/store/apps/details?id=org.mantracare.therapy\n🍎 iOS: https://apps.apple.com/pk/app/therapymantra/id1607643888"}
      />
    );
  }

  const tTitles = t("nav", { returnObjects: true });
  const titles: Record<string, string> = (typeof tTitles === 'object' && tTitles !== null && !Array.isArray(tTitles) ? tTitles as any : {}) as Record<string, string>;

  return (
    <PremiumLayout
      title={t("app_title")}
      subtitle={titles?.[screen] || ""}
      icon={<BookOpen className="w-6 h-6 text-primary" />}
      onBack={screen !== "entry" ? () => setScreen("entry") : undefined}
      exitOnBack={screen === "entry"}
    >
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-4 min-h-[70vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex-1 flex flex-col"
          >
            {screen === "entry" && (
              <ScreenEntry
                onContinue={() => goTo("writing")}
                onHistory={() => goTo("history")}
              />
            )}
            {screen === "writing" && (
              <ScreenWriting
                writing={writing}
                setWriting={setWriting}
                onContinue={() => goTo("landing")}
              />
            )}
            {screen === "landing" && (
              <div className="flex-1 flex flex-col gap-8 py-8">
                <ScreenLanding
                  reflection={reflection}
                  setReflection={setReflection}
                />
                <button
                  onClick={saveEntry}
                  disabled={isSaving || !writing}
                  className="w-full bg-slate-900 text-white shadow-md py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:opacity-90 hover:shadow-xl hover:shadow-primary/40 transition-all flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Save size={20} strokeWidth={3} />
                  {isSaving ? t("landing.button_preserving") : t("landing.button_save")}
                </button>
              </div>
            )}
            {screen === "history" && (
              <ScreenPastEntries
                entries={entries}
                onBack={() => goTo("entry")}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
}

export default function WritingNarrativePage() {
  return (
    <I18nextProvider i18n={i18n}>
      <WritingNarrativeInner />
    </I18nextProvider>
  );
}