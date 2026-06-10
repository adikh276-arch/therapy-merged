'use client';
import { parseDbDate } from '@/lib/dateUtils';

import { useState, useMemo, useEffect } from "react";
import { Heart, History, Save, ChevronRight, X, Trash2, Calendar, Sparkles, Feather, MailOpen, Book, Activity, Sun, MessageCircle, Wind } from "lucide-react";
import { useTranslation, I18nextProvider } from "react-i18next";
import i18n, { loadLocale } from "./i18n";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { PremiumComplete } from "@/components/shared/PremiumComplete";
import { motion, AnimatePresence } from "framer-motion";
import { apiPath } from '@/lib/apiPath';

type Screen = "welcome" | "choose" | "bond" | "review" | "closing" | "complete" | "history";
const OPTION_EMOJIS = [
  <Book key="memories" className="w-6 h-6 text-indigo-500" />,
  <Activity key="actions" className="w-6 h-6 text-rose-500" />,
  <Sun key="daily" className="w-6 h-6 text-emerald-500" />,
  <MessageCircle key="say" className="w-6 h-6 text-sky-500" />,
  <Wind key="feeling" className="w-6 h-6 text-amber-500" />
];

interface Reflection {
  id: string;
  connectionType: string;
  primaryResponse: string;
  deeperResponse?: string;
  bondAction?: string;
  createdAt: string;
}

function ContinuingBondsInner() {
  const { t } = useTranslation(undefined, { i18n });
  const CONNECTION_OPTIONS = ((_t => Array.isArray(_t) ? _t : null)(t("connection_options", { returnObjects: true }))) || [
    { label: "Through memories", prompt: "Can you share a memory where you feel their presence?" },
    { label: "In the things I say or do", prompt: "What part of them do you carry in your daily life?" },
    { label: "In moments of my daily life", prompt: "When do you feel them close during your day?" },
    { label: "In what I still want to tell them", prompt: "Is there something you still want to say to them?" },
    { label: "In a feeling or presence", prompt: "How does their presence still show up for you?" }
  ];
  const BOND_PROMPTS = ((_t => Array.isArray(_t) ? _t : null)(t("bond_prompts", { returnObjects: true }))) || [
    "What is one small way you feel connected to them today?",
    "What's something you do that carries a part of them?"
  ];

  const [screen, setScreen] = useState<Screen>("welcome");
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [primaryText, setPrimaryText] = useState("");
  const [deeperText, setDeeperText] = useState("");
  const [bondText, setBondText] = useState("");
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const bondPrompt = useMemo(() => {
    if (!Array.isArray(BOND_PROMPTS) || BOND_PROMPTS.length === 0) return "";
    return BOND_PROMPTS[Math.floor(Math.random() * BOND_PROMPTS.length)];
  }, [screen, BOND_PROMPTS]);

  // Sync URL query lang parameter
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const lang = params.get('lang') || 'en';
      loadLocale(lang);
    }
    fetchReflections();
  }, []);

  const fetchReflections = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(apiPath("/api/continuing-bonds"));
      if (res.ok) {
        const rows = await res.json();
        const formatted = rows.map((r: any) => {
          try {
            const parsed = JSON.parse(r.bond_data);
            return { id: r.id, createdAt: r.created_at, ...parsed } as Reflection;
          } catch {
            return {
              id: r.id,
              connectionType: "General",
              primaryResponse: r.bond_data,
              createdAt: r.created_at,
            } as Reflection;
          }
        });
        setReflections(formatted);
      }
    } catch (error) {
      console.error("Failed to fetch reflections:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveReflection = async () => {
    if (selectedOption === null || !primaryText.trim()) return;

    setIsSaving(true);
    const id = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9);
    const bondData = {
      connectionType: CONNECTION_OPTIONS[selectedOption]?.label || "General",
      primaryResponse: primaryText,
      deeperResponse: deeperText || undefined,
      bondAction: bondText || undefined,
    };

    try {
      const res = await fetch(apiPath("/api/continuing-bonds"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, bondData }),
      });

      if (res.ok) {
        const newRef: Reflection = { id, createdAt: new Date().toISOString(), ...bondData };
        setReflections(prev => [newRef, ...prev]);
        setScreen("review");
      }
    } catch (error) {
      console.error("Failed to save bond:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const deleteReflection = async (id: string) => {
    if (!window.confirm(t("common.confirm_delete", "Are you sure you want to delete this reflection?"))) return;
    try {
      const res = await fetch(apiPath(`/api/continuing-bonds?id=${id}`), { method: "DELETE" });
      if (res.ok) {
        setReflections(prev => prev.filter(r => r.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete reflection:", err);
    }
  };

  const reset = () => {
    setSelectedOption(null);
    setPrimaryText("");
    setDeeperText("");
    setBondText("");
    setScreen("welcome");
  };

  if (screen === "complete") {
    return (
      <PremiumComplete
        title={t("app_title", "Continuing Bonds")}
        message={t("complete_message", "The connection you shared continues in many ways. Remembering and honoring them is a form of deep strength.")}
        onRestart={reset}
                  shareEmoji="️"
                  shareContent={"I just completed 'Continuing Bonds' on TherapyMantra — a guided grief healing exercise that genuinely helped me. Try it! \n\n Android: https://play.google.com/store/apps/details?id=org.mantracare.therapy\n iOS: https://apps.apple.com/pk/app/therapymantra/id1607643888"}
      />
    );
  }

  const tTitles = t("screen_titles", { returnObjects: true });
  const titles: Record<string, string> = (typeof tTitles === 'object' && tTitles !== null && !Array.isArray(tTitles) ? tTitles as any : null) || {
    welcome: "Welcome",
    choose: "Connection",
    bond: "Action",
    review: "Reflection",
    closing: "Final Care",
    history: "History"
  };

  return (
    <PremiumLayout
      title={t("app_title", "Continuing Bonds")}
      subtitle={titles[screen]}
      icon={<Heart className="w-6 h-6 text-primary" />}
      onBack={screen !== "welcome" ? () => setScreen("welcome") : undefined}
      onReset={screen !== "welcome" ? reset : undefined}
    >
      <div className="w-full max-w-md mx-auto flex flex-col min-h-[60vh] select-none relative">
        <AnimatePresence mode="wait">
          {/* WELCOME SCREEN */}
          {screen === "welcome" && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex-1 flex flex-col items-center text-center gap-6 py-6"
            >
              <div className="w-20 h-20 bg-primary/10 rounded-[1.75rem] flex items-center justify-center text-4xl shadow-inner animate-pulse">
                
              </div>
              <div className="space-y-3">
                <h1 className="text-3xl font-black text-slate-800 leading-tight">
                  {t("welcome_title", "Continuing Bonds")}
                </h1>
                <p className="text-slate-500 font-semibold leading-relaxed max-w-xs mx-auto text-sm">
                  {t("welcome_subtitle", "Love doesn't end when someone is gone. The connection you shared continues in many ways.")}
                </p>
              </div>

              <div className="flex flex-col gap-3 w-full max-w-xs pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setScreen("choose")}
                  className="w-full py-4 rounded-2xl bg-primary text-white font-bold shadow-lg"
                >
                  {t("begin_button", "Begin Reflection")}
                </motion.button>

                <button
                  onClick={() => setScreen("history")}
                  className="text-xs font-black uppercase tracking-widest text-slate-450 hover:text-slate-700 py-2"
                >
                  {t("view_past_entries", "View Past Reflections")}
                </button>
              </div>
            </motion.div>
          )}

          {/* CHOOSE CONNECTION */}
          {screen === "choose" && (
            <motion.div
              key="choose"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              className="flex-1 flex flex-col gap-6"
            >
              <h2 className="text-xl font-black text-slate-850 text-center">
                {t("choose_question", "How do you still feel connected?")}
              </h2>

              {selectedOption === null ? (
                <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-1">
                  {Array.isArray(CONNECTION_OPTIONS) && CONNECTION_OPTIONS.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedOption(i)}
                      className="w-full bg-white/60 backdrop-blur-lg border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-5 text-left shadow-sm hover:shadow-md hover:bg-slate-50 transition-all flex items-center gap-4 group"
                    >
                      <div className="w-11 h-11 bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 rounded-xl flex items-center justify-center text-xl group-hover:scale-105 transition-transform shrink-0">
                        {OPTION_EMOJIS[i] || ""}
                      </div>
                      <span className="font-bold text-slate-700 text-sm">{opt.label}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-white rounded-[2rem] p-6 space-y-4 border border-white/60 shadow-md">
                    <p className="text-slate-800 font-extrabold text-sm leading-relaxed italic text-center">
                      "{CONNECTION_OPTIONS[selectedOption]?.prompt}"
                    </p>
                    <textarea
                      value={primaryText}
                      onChange={(e) => setPrimaryText(e.target.value)}
                      placeholder={t("write_heart", "Write from the heart...")}
                      rows={4}
                      className="field-textarea"
                    />
                  </div>

                  <button
                    onClick={() => setScreen("bond")}
                    disabled={!primaryText.trim()}
                    className="w-full py-4 rounded-2xl bg-slate-900 text-white shadow-md font-bold disabled:opacity-30"
                  >
                    {t("continue_button", "Continue")}
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* ACTION / BOND SCREEN */}
          {screen === "bond" && (
            <motion.div
              key="bond"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 flex flex-col gap-6"
            >
              <div className="rounded-[2.5rem] bg-white/60 backdrop-blur-lg border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 shadow-xl flex flex-col items-center text-center">
                <div className="text-5xl mb-4"></div>
                <h2 className="text-xl font-black text-slate-850 mb-2">{t("action_title", "Connecting in Action")}</h2>
                <p className="text-slate-500 font-medium text-xs mb-6 leading-relaxed italic">
                  "{bondPrompt}"
                </p>
                <textarea
                  value={bondText}
                  onChange={(e) => setBondText(e.target.value)}
                  placeholder={t("sharing_optional", "Describe a small action (optional)...")}
                  rows={4}
                  className="field-textarea"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSaveReflection}
                disabled={isSaving}
                className="w-full py-4.5 rounded-2xl bg-primary text-white font-bold shadow-lg"
              >
                {isSaving ? t("preserving", "Preserving...") : t("preserve_button", "Preserve Reflection")}
              </motion.button>
            </motion.div>
          )}

          {/* REVIEW SCREEN */}
          {screen === "review" && (
            <motion.div
              key="review"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col gap-6"
            >
              <div className="w-full bg-white/60 backdrop-blur-lg border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-8 shadow-xl text-center">
                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl"><Book className="inline-block w-8 h-8" /></div>
                <h2 className="text-xl font-black text-slate-900 mb-1">{t("preserved_title", "Preserved")}</h2>
                <p className="text-slate-450 text-xs font-bold leading-relaxed mb-6 italic">
                  {t("preserved_subtitle", "\"This connection is part of you. You can return to it anytime.\"")}
                </p>
                <div className="bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 rounded-2xl p-5 text-left border border-white/60/50">
                  <p className="text-[9px] font-black uppercase tracking-widest text-primary mb-2">
                    {reflections[0]?.connectionType}
                  </p>
                  <p className="text-slate-750 text-sm leading-relaxed font-semibold line-clamp-5">
                    {reflections[0]?.primaryResponse}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setScreen("closing")}
                  className="w-full py-4 rounded-2xl bg-slate-900 text-white shadow-md font-bold shadow-lg"
                >
                  {t("finish_button", "Finish for now")}
                </button>
                <button
                  onClick={reset}
                  className="w-full py-3.5 rounded-2xl bg-white text-slate-650 font-bold text-sm border border-slate-250 transition-all hover:bg-slate-50"
                >
                  {t("add_another", "Add Another")}
                </button>
              </div>
            </motion.div>
          )}

          {/* CLOSING REFLECTIONS */}
          {screen === "closing" && (
            <motion.div
              key="closing"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 flex flex-col items-center text-center gap-6 py-6"
            >
              <div className="w-20 h-20 bg-white/60 backdrop-blur-lg border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[1.75rem] flex items-center justify-center text-4xl shadow-sm"><Feather className="inline-block w-8 h-8" /></div>
              <div className="space-y-4 text-slate-500 font-medium text-sm leading-relaxed max-w-xs mx-auto">
                <p>{t("closing_p1", "The people we love become a part of who we are. ")}</p>
                <p>{t("closing_p2", "They live on in the way you laugh, the stories you tell, and the quiet moments.")}</p>
              </div>
              <button
                onClick={() => setScreen("complete")}
                className="w-full max-w-xs py-4.5 rounded-2xl bg-slate-900 text-white shadow-md font-bold shadow-lg mt-4"
              >
                {t("save_exit_button", "Save & Exit")}
              </button>
            </motion.div>
          )}

          {/* HISTORY ARCHIVE SCREEN */}
          {screen === "history" && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex-1 flex flex-col text-left py-4"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black text-slate-900">{t("past_reflections", "Continuing Bonds Archive")}</h2>
                <button 
                  onClick={() => setScreen("welcome")} 
                  className="text-xs font-bold uppercase tracking-widest text-slate-455 hover:text-slate-800 transition-colors"
                >
                  Back
                </button>
              </div>

              {isLoading ? (
                <div className="text-center py-12 text-slate-400 font-bold text-xs uppercase tracking-widest">
                  Loading entries...
                </div>
              ) : reflections.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-3xl border border-white/60 shadow-sm space-y-4 text-center">
                  <span className="text-4xl block"><MailOpen className="inline-block w-8 h-8" /></span>
                  <p className="text-slate-450 font-bold text-sm">{t("no_reflections_yet", "No reflections logged yet.")}</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
                  {reflections.map((ref) => (
                    <div
                      key={ref.id}
                      className="w-full bg-white/60 backdrop-blur-lg border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-5 hover:shadow-lg transition-all relative group flex flex-col gap-2"
                    >
                      <button
                        onClick={() => deleteReflection(ref.id)}
                        className="absolute top-4 right-4 text-slate-350 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Delete Entry"
                      >
                        <Trash2 size={16} />
                      </button>

                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Calendar size={12} />
                        <span className="text-[10px] font-black uppercase tracking-wider">
                          {parseDbDate(ref.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="inline-block self-start px-2 py-0.5 rounded bg-primary/5 text-primary text-[10px] font-black uppercase tracking-wider">
                        {ref.connectionType}
                      </div>

                      <p className="text-slate-700 text-sm font-semibold leading-relaxed whitespace-pre-line">
                        "{ref.primaryResponse}"
                      </p>

                      {ref.bondAction && (
                        <p className="text-slate-450 text-xs italic font-bold border-t border-slate-50 pt-1.5">
                          Action: "{ref.bondAction}"
                        </p>
                      )}
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

export default function ContinuingBondsPage() {
  return (
    <I18nextProvider i18n={i18n}>
      <ContinuingBondsInner />
    </I18nextProvider>
  );
}