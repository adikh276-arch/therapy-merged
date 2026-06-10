'use client';
import { parseDbDate } from '@/lib/dateUtils';

import { useState, useEffect, useCallback, useRef } from "react";
import { Mail, History, ChevronRight, X, Trash2, Calendar, ArrowLeft, Heart, Save, Activity, MailOpen } from "lucide-react";
import { useTranslation, I18nextProvider } from "react-i18next";
import i18n, { loadLocale } from "./i18n";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { PremiumComplete } from "@/components/shared/PremiumComplete";
import { handlePlatformExit } from "@/lib/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { apiPath } from '@/lib/apiPath';

export interface Letter {
  id: string;
  content: string;
  recipient?: string;
  date: string;
}

const pageVariants = {
  enter: { opacity: 0, x: 20 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

function TheUnsentLetterInner() {
  const { t } = useTranslation(undefined, { i18n });
  const [screen, setScreen] = useState<"intro" | "writing" | "reflection" | "history" | "complete">("intro");
  const [letterContent, setLetterContent] = useState("");
  const [recipient, setRecipient] = useState("");
  const [savedLetters, setSavedLetters] = useState<Letter[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync URL query lang parameter
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const lang = params.get('lang') || 'en';
      loadLocale(lang);
    }
    fetchLetters();
  }, []);

  const fetchLetters = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(apiPath("/api/the-unsent-letter"));
      if (res.ok) {
        const rows = await res.json();
        const formatted = rows.map((r: any) => ({
          id: r.id,
          content: r.content,
          recipient: r.recipient,
          date: r.created_at,
        }));
        setSavedLetters(formatted);
      }
    } catch (error) {
      console.error("Failed to fetch letters:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveLetter = async () => {
    if (!letterContent.trim()) return;

    setIsSaving(true);
    const id = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9);
    const payload = {
      id,
      content: letterContent,
      recipient: recipient || undefined,
    };

    try {
      const res = await fetch(apiPath("/api/the-unsent-letter"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const newLetter: Letter = {
          id,
          content: letterContent,
          recipient: recipient || undefined,
          date: new Date().toISOString(),
        };
        setSavedLetters(prev => [newLetter, ...prev]);
        setScreen("complete");
      }
    } catch (error) {
      console.error("Failed to save letter:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const deleteLetter = async (id: string) => {
    if (!window.confirm(t("common.confirm_delete", "Are you sure you want to delete this unsent letter?"))) return;
    try {
      const res = await fetch(apiPath(`/api/the-unsent-letter?id=${id}`), { method: "DELETE" });
      if (res.ok) {
        setSavedLetters(prev => prev.filter(l => l.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete letter:", err);
    }
  };

  const insertPrompt = (prompt: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const before = letterContent.slice(0, start);
    const after = letterContent.slice(textarea.selectionEnd);
    const newContent = before + prompt + " " + after;
    setLetterContent(newContent);
    setTimeout(() => {
      textarea.focus();
      const pos = start + prompt.length + 1;
      textarea.setSelectionRange(pos, pos);
    }, 0);
  };

  const reset = () => {
    setLetterContent("");
    setRecipient("");
    setScreen("intro");
  };

  const prompts = ((_t => Array.isArray(_t) ? _t : null)(t("writing.prompts", { returnObjects: true }))) || [
    "I feel…", "I wish…", "I never said…", "What hurt me…", "What I needed…"
  ];

  const introDesc = ((_t => Array.isArray(_t) ? _t : null)(t("intro.description", { returnObjects: true }))) || [
    "Sometimes, there are things we wish we could say — but never got the chance to.",
    "This activity gives you a private space to put those thoughts into words.",
    "You don't have to send this letter. This is just for you — to release and heal."
  ];

  const reflectDesc = ((_t => Array.isArray(_t) ? _t : null)(t("reflection.description", { returnObjects: true }))) || [
    "You've just put your thoughts and feelings into words — that takes courage.",
    "Before you move on, take a breath and gently check in with yourself."
  ];

  if (screen === "complete") {
    return (
      <PremiumLayout title={t("app_title", "The Unsent Letter")} showBack={false}>
        <PremiumComplete
          title={t("app_title", "The Unsent Letter")}
          message={t("reflection.save_success", "Your unsent letter is safely mended in your private local journal. Expression is a profound release.")}
          onRestart={reset}
                  shareEmoji="️"
                  shareContent={"I just completed 'The Unsent Letter' on TherapyMantra — a guided emotional release that genuinely helped me. Try it! \n\n Android: https://play.google.com/store/apps/details?id=org.mantracare.therapy\n iOS: https://apps.apple.com/pk/app/therapymantra/id1607643888"}
        />
      </PremiumLayout>
    );
  }

  return (
    <PremiumLayout
      title={t("app_title", "The Unsent Letter")}
      subtitle={t("app_subtitle", "Release your thoughts privately")}
      icon={<Mail className="w-6 h-6 text-primary" />}
      onBack={
        screen === "writing"
          ? () => setScreen("intro")
          : screen === "reflection"
          ? () => setScreen("writing")
          : screen === "history"
          ? () => setScreen("intro")
          : screen === "intro"
          ? handlePlatformExit
          : undefined
      }
    >
      <div className="w-full max-w-md mx-auto flex flex-col min-h-[60vh] select-none relative">
        <AnimatePresence mode="wait">
          {/* INTRO SCREEN */}
          {screen === "intro" && (
            <motion.div
              key="intro"
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex-1 flex flex-col items-center justify-center text-center space-y-6 py-6"
            >
              <div className="text-6xl animate-pulse"><Mail className="inline-block w-8 h-8" /></div>

              <h1 className="text-3xl font-black text-slate-800 leading-tight">
                {t("intro.title", "The Unsent Letter")}
              </h1>

              <div className="text-slate-500 text-sm leading-relaxed max-w-xs space-y-3 font-medium">
                {introDesc.map((desc, i) => (
                  <p key={i}>{desc}</p>
                ))}
              </div>

              <p className="text-xs text-slate-400 font-bold italic">
                {t("intro.notice", "Write freely. No one else will see this.")}
              </p>

              <div className="pt-4 flex flex-col gap-3 w-full max-w-xs">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setScreen("writing")}
                  className="w-full bg-slate-900 text-white shadow-md py-4.5 rounded-2xl font-bold shadow-lg"
                >
                  {t("intro.button", "Start Writing")}
                </motion.button>

                <button
                  onClick={() => setScreen("history")}
                  className="text-xs font-black uppercase tracking-widest text-slate-450 hover:text-slate-700 py-2.5"
                >
                  {t("history.title", "Past Letters")}
                </button>
              </div>
            </motion.div>
          )}

          {/* WRITING SCREEN */}
          {screen === "writing" && (
            <motion.div
              key="writing"
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex-1 flex flex-col gap-6 text-left"
            >
              <div>
                <h2 className="text-2xl font-black text-slate-900 leading-tight">
                  {t("writing.title", "Write What You've Been Holding")}
                </h2>
                <p className="text-slate-500 text-xs font-semibold mt-1">
                  {t("writing.desc", "You can write to anyone, or even to a situation. There is no right or wrong.")}
                </p>
              </div>

              {/* Recipient box */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-450 uppercase tracking-widest pl-1">
                  Recipient (e.g. Ex-partner, Child, Past self, etc.)
                </label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="e.g. To my past self..."
                  className="field-input"
                />
              </div>

              {/* Prompt chips */}
              <div className="space-y-2">
                <p className="text-[10px] font-black text-slate-450 uppercase tracking-widest pl-1">
                  Stuck? Tap to insert helper prompts:
                </p>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {Array.isArray(prompts) && prompts.map((p) => (
                    <button
                      key={p}
                      onClick={() => insertPrompt(p)}
                      className="shrink-0 px-4 py-2 rounded-2xl bg-white/60 backdrop-blur-lg border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-slate-500 hover:bg-primary hover:text-white hover:border-primary font-bold text-xs shadow-sm transition-all"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Textarea */}
              <div className="space-y-2 flex-1 flex flex-col min-h-0">
                <label className="text-[10px] font-black text-slate-455 uppercase tracking-widest pl-1">
                  Your Letter
                </label>
                <textarea
                  ref={textareaRef}
                  value={letterContent}
                  onChange={(e) => setLetterContent(e.target.value)}
                  placeholder={t("writing.placeholder", "Dear ____,\nI've been wanting to say…")}
                  rows={6}
                  className="field-textarea flex-1 min-h-[180px]"
                />
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <motion.button
                  whileHover={{ scale: letterContent.trim() ? 1.02 : 1 }}
                  whileTap={{ scale: letterContent.trim() ? 0.98 : 1 }}
                  onClick={() => setScreen("reflection")}
                  disabled={!letterContent.trim()}
                  className="w-full py-4.5 bg-slate-900 text-white shadow-md font-bold rounded-2xl disabled:opacity-30 flex items-center justify-center gap-2"
                >
                  {t("writing.button", "Continue to Reflection")}
                  <ChevronRight size={18} />
                </motion.button>

                <p className="text-[10px] text-slate-400 font-semibold italic text-center">
                  {t("writing.notice", "Write freely. Everything is private.")}
                </p>
              </div>
            </motion.div>
          )}

          {/* REFLECTION SCREEN */}
          {screen === "reflection" && (
            <motion.div
              key="reflection"
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex-1 flex flex-col items-center justify-center text-center space-y-6 py-6"
            >
              <div className="text-5xl"><Activity className="inline-block w-8 h-8" /></div>

              <h2 className="text-2xl font-black text-slate-900 leading-tight">
                {t("reflection.title", "Reflect on Release")}
              </h2>

              <div className="text-slate-500 text-sm font-medium leading-relaxed max-w-xs space-y-4">
                {reflectDesc.map((desc, i) => (
                  <p key={i}>{desc}</p>
                ))}
              </div>

              <p className="text-xs text-primary font-bold italic">
                {t("reflection.notice", "This letter was written for your healing, not for sending.")}
              </p>

              <div className="pt-6 flex flex-col gap-2 w-full max-w-xs">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={saveLetter}
                  disabled={isSaving}
                  className="act-btn-primary"
                >
                  <Save size={18} />
                  {isSaving ? "Saving..." : t("reflection.save_button", "Save Private Letter")}
                </motion.button>

                <button
                  onClick={() => handlePlatformExit()}
                  className="w-full py-3.5 text-slate-450 hover:text-slate-700 font-bold text-xs uppercase tracking-widest text-center"
                >
                  {t("reflection.finish_button", "Finish without saving")}
                </button>
              </div>
            </motion.div>
          )}

          {/* LETTERS HISTORY LOGS VIEW */}
          {screen === "history" && (
            <motion.div
              key="history"
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex-1 flex flex-col text-left py-4"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black text-slate-900">{t("history.title", "Letters Archive")}</h2>
                <button 
                  onClick={() => setScreen("intro")} 
                  className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-800 transition-colors"
                >
                  Back
                </button>
              </div>

              {isLoading ? (
                <div className="text-center py-12 text-slate-400 font-bold text-xs uppercase tracking-widest">
                  Loading letters...
                </div>
              ) : savedLetters.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-3xl border border-white/60 shadow-sm space-y-4 text-center">
                  <span className="text-4xl block"><MailOpen className="inline-block w-8 h-8" /></span>
                  <p className="text-slate-450 font-bold text-sm">
                    {t("history.empty_title", "You haven't written any letters yet.")}
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
                  {savedLetters.map((l) => (
                    <div
                      key={l.id}
                      className="w-full bg-white/60 backdrop-blur-lg border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-5 hover:shadow-lg transition-all relative group flex flex-col gap-2"
                    >
                      <button
                        onClick={() => deleteLetter(l.id)}
                        className="absolute top-4 right-4 text-slate-350 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Delete letter"
                      >
                        <Trash2 size={16} />
                      </button>

                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Calendar size={12} />
                        <span className="text-[10px] font-black uppercase tracking-wider">
                          {parseDbDate(l.date).toLocaleDateString()}
                        </span>
                      </div>

                      {l.recipient && (
                        <div className="inline-block self-start px-2 py-0.5 rounded bg-primary/5 text-primary text-[10px] font-black uppercase tracking-wider">
                          Recipient: {l.recipient}
                        </div>
                      )}

                      <p className="text-slate-700 text-sm font-semibold leading-relaxed whitespace-pre-line">
                        {l.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
}

export default function TheUnsentLetterPage() {
  return (
    <I18nextProvider i18n={i18n}>
      <TheUnsentLetterInner />
    </I18nextProvider>
  );
}