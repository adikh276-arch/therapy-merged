'use client';
import { parseDbDate } from '@/lib/dateUtils';

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { History, Calendar, ChevronRight, ChevronLeft, Save, Brain, Activity, Trash2, Sparkles } from "lucide-react";
import { useTranslation, I18nextProvider } from "react-i18next";
import i18n, { loadLocale } from "./i18n";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { PremiumIntro } from "@/components/shared/PremiumIntro";
import { PremiumComplete } from "@/components/shared/PremiumComplete";
import { apiPath } from '@/lib/apiPath';

interface Entry {
  id: string;
  date: string;
  situation: string;
  prediction: string;
  emotions: string[];
  intensity: number;
  reality: string;
  comparison: string;
  reflection: string;
  reframe: string;
}

function PredictionVsRealityInner() {
  const { t } = useTranslation(undefined, { i18n });
  const [screen, setScreen] = useState<number | "intro" | "history" | "complete">("intro");
  const [situation, setSituation] = useState("");
  const [prediction, setPrediction] = useState("");
  const [emotions, setEmotions] = useState<string[]>([]);
  const [intensity, setIntensity] = useState(5);
  const [reality, setReality] = useState("");
  const [comparison, setComparison] = useState("");
  const [reflection, setReflection] = useState("");
  const [reframe, setReframe] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Sync URL query lang parameter
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const lang = params.get('lang') || 'en';
      loadLocale(lang);
    }
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(apiPath("/api/prediction-vs-reality"));
      if (res.ok) {
        const rows = await res.json();
        const formatted = rows.map((r: any) => JSON.parse(r.entry_data) as Entry);
        setEntries(formatted);
      }
    } catch (err) {
      console.error("Failed to fetch entries:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!situation.trim() || !prediction.trim() || !reality.trim()) return;

    setIsSaving(true);
    const entry: Entry = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
      date: new Date().toISOString(),
      situation,
      prediction,
      emotions,
      intensity,
      reality,
      comparison,
      reflection,
      reframe,
    };

    try {
      const res = await fetch(apiPath("/api/prediction-vs-reality"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });

      if (res.ok) {
        setEntries(prev => [entry, ...prev]);
        setScreen("complete");
      }
    } catch (err) {
      console.error("Failed to save entry:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm(t("common.confirm_delete", "Are you sure you want to delete this prediction log?"))) return;
    try {
      const res = await fetch(apiPath(`/api/prediction-vs-reality?id=${id}`), { method: "DELETE" });
      if (res.ok) {
        setEntries(prev => prev.filter(e => e.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete prediction:", err);
    }
  };

  const reset = () => {
    setScreen("intro");
    setSituation("");
    setPrediction("");
    setEmotions([]);
    setIntensity(5);
    setReality("");
    setComparison("");
    setReflection("");
    setReframe("");
  };

  const toggleEmotion = (e: string) => {
    setEmotions((prev) =>
      prev.includes(e) ? prev.filter((x) => x !== e) : [...prev, e]
    );
  };

  const tEmotions = t("emotions", { returnObjects: true });
  const EMOTIONS = Array.isArray(tEmotions) ? tEmotions : [
    "Anxious", "Fearful", "Nervous", "Worried", "Stressed", "Insecure"
  ];
  
  const tOptions = t("comparison_options", { returnObjects: true });
  const COMPARISON_OPTIONS = Array.isArray(tOptions) ? tOptions : [
    "It went much better than I expected",
    "It went slightly better than I expected",
    "It went exactly as I expected",
    "It went worse than I expected"
  ];

  if (screen === "intro") {
    return (
      <PremiumLayout title={t("app_title", "Prediction vs Reality")}>
        <PremiumIntro
          title={t("app_title", "Prediction vs Reality")}
          description={t("app_description", "Anxiety often tricks us into predicting the worst possible outcomes. Use this cognitive tool to test your predictions against real-life outcomes.")}
          onStart={() => setScreen(1)}
          icon={<Activity size={32} />}
          benefits={((_t => Array.isArray(_t) ? _t : null)(t("intro.benefits", { returnObjects: true }))) || [
            "Challenge automatic negative predictions",
            "Build realistic expectations over time",
            "Collect objective proof of your resilience"
          ]}
          duration={t("intro.duration", "3 minutes")}
        >
          <div className="mt-8 flex justify-center">
            <button 
              onClick={() => setScreen("history")}
              className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-xs font-black uppercase tracking-widest bg-white px-6 py-3.5 rounded-2xl border border-white/60 shadow-sm"
            >
              <History size={16} />
              {t("intro.view_past", "View Past Logs")}
            </button>
          </div>
        </PremiumIntro>
      </PremiumLayout>
    );
  }

  if (screen === "history") {
    return (
      <PremiumLayout title={t("app_title", "Prediction vs Reality")} onBack={() => setScreen("intro")}>
        <div className="space-y-6 max-w-lg mx-auto select-none">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-900">{t("history.past_logs", "Past Reflections")}</h2>
            <button 
              onClick={() => setScreen("intro")} 
              className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-800 transition-all"
            >
              Back
            </button>
          </div>

          {isLoading ? (
            <div className="text-center py-12 text-slate-450 font-bold text-xs uppercase tracking-widest">
              Loading entries...
            </div>
          ) : entries.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-[2.5rem] border border-white/60 shadow-sm space-y-4">
              <span className="text-4xl block">📋</span>
              <p className="text-slate-450 font-medium">{t("history.no_reflections", "No predictions logged yet.")}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {entries.map((entry) => (
                <motion.div 
                  key={entry.id}
                  className="bg-white rounded-[2.5rem] p-6.5 border border-white/60 shadow-sm space-y-5 relative group text-left"
                >
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="absolute top-5 right-5 text-slate-350 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Delete Entry"
                  >
                    <Trash2 size={16} />
                  </button>

                  <div className="flex justify-between items-center pr-6">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-350">
                      <Calendar size={12} />
                      {parseDbDate(entry.date).toLocaleDateString()}
                    </div>
                    <div className="flex gap-1 flex-wrap">
                      {entry.emotions.map(em => (
                        <span key={em} className="px-2 py-0.5 rounded bg-primary/5 text-primary text-[9px] font-black uppercase tracking-widest">{em}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4.5 rounded-2xl bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 border border-white/60 space-y-1">
                      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{t("history.prediction_label", "Expectation")}</p>
                      <p className="text-sm text-slate-650 italic font-medium">"{entry.prediction}"</p>
                    </div>
                    <div className="p-4.5 rounded-2xl bg-primary/5 border border-primary/10 space-y-1">
                      <p className="text-[9px] font-black uppercase tracking-widest text-primary">{t("history.reality_label", "What actually happened")}</p>
                      <p className="text-sm text-slate-850 font-extrabold">"{entry.reality}"</p>
                    </div>
                  </div>

                  <div className="pt-3.5 border-t border-slate-50 flex flex-col gap-1.5">
                    <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                      <span className="text-slate-900 font-extrabold">{t("history.reflection_label", "Reflection:")}</span> {entry.reflection}
                    </p>
                    {entry.reframe && (
                      <p className="text-xs text-primary leading-relaxed font-bold">
                        <span>💡 {t("history.reframe_label", "New Balanced View:")}</span> {entry.reframe}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </PremiumLayout>
    );
  }

  if (screen === "complete") {
    return (
      <PremiumLayout title={t("app_title", "Prediction vs Reality")} showBack={false}>
        <PremiumComplete
          title={t("app_title", "Prediction vs Reality")}
          message={t("complete.message", "Excellent job testing your anxiety predictions. Over time, this builds deep confidence that you can handle whatever life brings.")}
          onRestart={reset}
        />
      </PremiumLayout>
    );
  }

  return (
    <PremiumLayout 
      title={t("app_title", "Prediction vs Reality")} 
      subtitle={t("step_label", `Step ${screen} of 8`, { current: screen })}
      onBack={() => setScreen(screen === 1 ? "intro" : (screen as number) - 1)}
      onReset={reset}
    >
      <div className="max-w-md mx-auto py-4 select-none">
        {/* Step dots */}
        <div className="flex justify-center gap-1.5 mb-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${
                i + 1 <= (screen as number) ? "w-6 bg-primary" : "w-1.5 bg-slate-200"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {screen === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-white/60 space-y-6 text-left">
              <div className="space-y-2">
                <span className="inline-flex px-3 py-1 rounded-full bg-primary/10 text-primary text-[9px] font-black uppercase tracking-wider">
                  SITUATION
                </span>
                <h2 className="text-2xl font-black text-slate-900">{t("screens.s1.title", "What situation is causing anxiety?")}</h2>
                <p className="text-slate-450 text-xs font-semibold">{t("screens.s1.desc", "Describe the upcoming event, conversation, or task.")}</p>
              </div>
              <textarea
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
                placeholder={t("screens.s1.placeholder", "e.g., Giving a presentation tomorrow morning...")}
                rows={4}
                className="w-full rounded-2xl border border-slate-50 bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 p-5 text-sm text-slate-800 placeholder:text-slate-350 focus:outline-none focus:border-primary/20 focus:bg-white transition-all resize-none font-medium"
              />
              <button 
                onClick={() => setScreen(2)} 
                disabled={!situation.trim()} 
                className="w-full py-4 rounded-2xl bg-slate-900 text-white shadow-md font-bold hover:opacity-90 hover:shadow-xl hover:shadow-primary/40 transition-all flex items-center justify-center gap-2 disabled:opacity-30"
              >
                {t("buttons.continue", "Continue")} <ChevronRight size={18} />
              </button>
            </motion.div>
          )}

          {screen === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-white/60 space-y-6 text-left">
              <div className="space-y-2">
                <span className="inline-flex px-3 py-1 rounded-full bg-primary/10 text-primary text-[9px] font-black uppercase tracking-wider">
                  PREDICTION
                </span>
                <h2 className="text-2xl font-black text-slate-900">{t("screens.s2.title", "What do you predict will happen?")}</h2>
                <p className="text-slate-450 text-xs font-semibold">{t("screens.s2.desc", "What is the worst-case scenario that your mind is spinning?")}</p>
              </div>
              <textarea
                value={prediction}
                onChange={(e) => setPrediction(e.target.value)}
                placeholder={t("screens.s2.placeholder", "e.g., I will forget my slides and everyone will judge me...")}
                rows={4}
                className="w-full rounded-2xl border border-slate-50 bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 p-5 text-sm text-slate-800 placeholder:text-slate-350 focus:outline-none focus:border-primary/20 focus:bg-white transition-all resize-none font-medium"
              />
              <button 
                onClick={() => setScreen(3)} 
                disabled={!prediction.trim()} 
                className="w-full py-4 rounded-2xl bg-slate-900 text-white shadow-md font-bold hover:opacity-90 hover:shadow-xl hover:shadow-primary/40 transition-all flex items-center justify-center gap-2 disabled:opacity-30"
              >
                {t("buttons.continue", "Continue")} <ChevronRight size={18} />
              </button>
            </motion.div>
          )}

          {screen === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-white/60 space-y-8 text-left">
              <div className="space-y-2">
                <span className="inline-flex px-3 py-1 rounded-full bg-primary/10 text-primary text-[9px] font-black uppercase tracking-wider">
                  EMOTIONS
                </span>
                <h2 className="text-2xl font-black text-slate-900">{t("screens.s3.title", "Select emotions and intensity")}</h2>
                <p className="text-slate-450 text-xs font-semibold">{t("screens.s3.desc", "How does this prediction make you feel right now?")}</p>
              </div>
              
              <div className="flex flex-wrap gap-2 justify-center">
                {EMOTIONS.map(e => {
                  const active = emotions.includes(e);
                  return (
                    <button
                      key={e}
                      onClick={() => toggleEmotion(e)}
                      className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all border ${
                        active 
                          ? "bg-primary border-primary text-white shadow-lg shadow-primary/30" 
                          : "bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 border-transparent text-slate-500 hover:bg-slate-100"
                      }`}
                    >
                      {e}
                    </button>
                  );
                })}
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-50">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span>{t("intensity_labels.not_intense", "Mild")}</span>
                  <span className="text-slate-900 text-lg font-black">{intensity}</span>
                  <span>{t("intensity_labels.very_intense", "Extreme")}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={intensity}
                  onChange={(e) => setIntensity(Number(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none bg-slate-100 accent-primary cursor-pointer"
                />
              </div>

              <button 
                onClick={() => setScreen(4)} 
                disabled={emotions.length === 0} 
                className="w-full py-4 rounded-2xl bg-slate-900 text-white shadow-md font-bold hover:opacity-90 hover:shadow-xl hover:shadow-primary/40 transition-all flex items-center justify-center gap-2 disabled:opacity-30"
              >
                {t("buttons.continue", "Continue")} <ChevronRight size={18} />
              </button>
            </motion.div>
          )}

          {screen === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-white/60 space-y-6 text-left">
              <div className="space-y-2">
                <span className="inline-flex px-3 py-1 rounded-full bg-primary/10 text-primary text-[9px] font-black uppercase tracking-wider">
                  REALITY CHECK
                </span>
                <h2 className="text-2xl font-black text-slate-900">{t("screens.s4.title", "What actually happened?")}</h2>
                <p className="text-slate-450 text-xs font-semibold">{t("screens.s4.desc", "Now that the situation has passed, write down the actual objective outcome.")}</p>
              </div>
              <textarea
                value={reality}
                onChange={(e) => setReality(e.target.value)}
                placeholder={t("screens.s4.placeholder", "e.g., I stumbled slightly in the beginning, but recovered and finished smoothly...")}
                rows={4}
                className="w-full rounded-2xl border border-slate-50 bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 p-5 text-sm text-slate-800 placeholder:text-slate-350 focus:outline-none focus:border-primary/20 focus:bg-white transition-all resize-none font-medium"
              />
              <button 
                onClick={() => setScreen(5)} 
                disabled={!reality.trim()} 
                className="w-full py-4 rounded-2xl bg-slate-900 text-white shadow-md font-bold hover:opacity-90 hover:shadow-xl hover:shadow-primary/40 transition-all flex items-center justify-center gap-2 disabled:opacity-30"
              >
                {t("buttons.continue", "Continue")} <ChevronRight size={18} />
              </button>
            </motion.div>
          )}

          {screen === 5 && (
            <motion.div key="s5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-white/60 space-y-6 text-left">
              <h2 className="text-2xl font-black text-slate-900 text-center">{t("screens.s5.title", "Comparison")}</h2>
              
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 border border-white/60 space-y-1">
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{t("screens.s5.expectation", "Expectation")}</p>
                  <p className="text-sm text-slate-500 italic">"{prediction}"</p>
                </div>
                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 space-y-1">
                  <p className="text-[9px] font-black uppercase tracking-widest text-primary">{t("screens.s5.reality", "Reality")}</p>
                  <p className="text-sm text-slate-855 font-bold">"{reality}"</p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <p className="text-slate-500 text-xs font-bold text-center">{t("screens.s5.question", "How did the reality compare to your prediction?")}</p>
                <div className="space-y-2">
                  {COMPARISON_OPTIONS.map(opt => (
                    <button
                      key={opt}
                      onClick={() => setComparison(opt)}
                      className={`w-full text-left px-5 py-3.5 rounded-2xl text-xs font-bold transition-all border ${
                        comparison === opt 
                          ? "bg-gradient-to-r from-primary to-sky-400 border-none border-slate-900 text-white" 
                          : "bg-white border-white/60 text-slate-600 hover:border-primary/25"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => setScreen(6)} 
                disabled={!comparison} 
                className="w-full py-4 rounded-2xl bg-slate-900 text-white shadow-md font-bold hover:opacity-90 hover:shadow-xl hover:shadow-primary/40 transition-all flex items-center justify-center gap-2 disabled:opacity-30"
              >
                {t("buttons.continue", "Continue")} <ChevronRight size={18} />
              </button>
            </motion.div>
          )}

          {screen === 6 && (
            <motion.div key="s6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-white/60 space-y-6 text-left">
              <div className="space-y-2">
                <span className="inline-flex px-3 py-1 rounded-full bg-primary/10 text-primary text-[9px] font-black uppercase tracking-wider">
                  REFLECTION
                </span>
                <h2 className="text-2xl font-black text-slate-900">{t("screens.s6.title", "Reflection")}</h2>
                <p className="text-slate-450 text-xs font-semibold">{t("screens.s6.desc", "What did you learn about your anxiety predictions from this outcome?")}</p>
              </div>
              <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder={t("screens.s6.placeholder", "e.g., My anxiety made me think I'd fail completely, but I coped much better than expected...")}
                rows={4}
                className="w-full rounded-2xl border border-slate-50 bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 p-5 text-sm text-slate-800 placeholder:text-slate-350 focus:outline-none focus:border-primary/20 focus:bg-white transition-all resize-none font-medium"
              />
              <button 
                onClick={() => setScreen(7)} 
                disabled={!reflection.trim()} 
                className="w-full py-4 rounded-2xl bg-slate-900 text-white shadow-md font-bold hover:opacity-90 hover:shadow-xl hover:shadow-primary/40 transition-all flex items-center justify-center gap-2 disabled:opacity-30"
              >
                {t("buttons.continue", "Continue")} <ChevronRight size={18} />
              </button>
            </motion.div>
          )}

          {screen === 7 && (
            <motion.div key="s7" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-white/60 space-y-6 text-left">
              <div className="space-y-2">
                <span className="inline-flex px-3 py-1 rounded-full bg-primary/10 text-primary text-[9px] font-black uppercase tracking-wider">
                  REFRAME
                </span>
                <h2 className="text-2xl font-black text-slate-900">{t("screens.s7.title", "Create a balanced viewpoint")}</h2>
                <p className="text-slate-450 text-xs font-semibold">{t("screens.s7.desc", "Write a realistic, balanced reminder to tell yourself next time you face a similar situation.")}</p>
              </div>
              <textarea
                value={reframe}
                onChange={(e) => setReframe(e.target.value)}
                placeholder={t("screens.s7.placeholder", "e.g., Although I feel nervous, I have proven I can prepare and succeed despite the fear...")}
                rows={4}
                className="w-full rounded-2xl border border-slate-50 bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 p-5 text-sm text-slate-800 placeholder:text-slate-350 focus:outline-none focus:border-primary/20 focus:bg-white transition-all resize-none font-medium"
              />
              <button 
                onClick={() => setScreen(8)} 
                disabled={!reframe.trim()} 
                className="w-full py-4 rounded-2xl bg-slate-900 text-white shadow-md font-bold hover:opacity-90 hover:shadow-xl hover:shadow-primary/40 transition-all flex items-center justify-center gap-2 disabled:opacity-30"
              >
                {t("buttons.continue", "Continue")} <ChevronRight size={18} />
              </button>
            </motion.div>
          )}

          {screen === 8 && (
            <motion.div key="s8" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-white/60 space-y-6 text-center">
              <div className="w-16 h-16 bg-primary/15 rounded-3xl flex items-center justify-center text-primary mx-auto">
                <Brain size={36} />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-slate-900">{t("screens.s8.title", "Reframing Completed")}</h2>
                <p className="text-slate-450 text-sm font-medium leading-relaxed">{t("screens.s8.desc", "You've successfully tested your anxiety predictions. Storing this log will help you retrain your brain over time.")}</p>
              </div>
              <button 
                onClick={handleSave} 
                disabled={isSaving}
                className="w-full py-4.5 rounded-2xl bg-slate-900 text-white shadow-md font-bold hover:opacity-90 hover:shadow-xl hover:shadow-primary/40 transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10"
              >
                {isSaving ? "Saving..." : t("screens.s8.button", "Save & Complete")} <Save size={18} />
              </button>
              <button 
                onClick={reset} 
                className="text-slate-400 font-bold uppercase tracking-widest text-[10px] hover:text-slate-800 transition-colors block mx-auto"
              >
                {t("screens.s8.discard", "Discard Entries")}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
}

export default function PredictionVsRealityPage() {
  return (
    <I18nextProvider i18n={i18n}>
      <PredictionVsRealityInner />
    </I18nextProvider>
  );
}
