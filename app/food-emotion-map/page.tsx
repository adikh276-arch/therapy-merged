'use client';

import { useState, useEffect, useCallback, useMemo } from "react";
import { Utensils, ChevronRight, Save, History, Sparkles, Trash2, Calendar, X } from "lucide-react";
import { useTranslation, I18nextProvider } from "react-i18next";
import i18n, { loadLocale } from "./i18n";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { PremiumComplete } from "@/components/shared/PremiumComplete";
import { motion, AnimatePresence } from "framer-motion";
import { apiPath } from '@/lib/apiPath';

interface TypingTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
}

const TypingText = ({ text, speed = 25, onComplete, className = "" }: TypingTextProps) => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
        onComplete?.();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, onComplete]);

  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={className}
    >
      {displayed}
      {!done && <span className="animate-pulse text-primary font-bold">|</span>}
    </motion.p>
  );
};

interface FoodMapEntry {
  id: string;
  date: string;
  emotion: string;
  foodResponse: string;
  thought: string;
  bodySensation: string;
  supportChoice: string;
  closingFeeling: string;
}

function FoodEmotionMapInner() {
  const { t } = useTranslation(undefined, { i18n });
  const [step, setStep] = useState<number | "history">(0);
  const [emotion, setEmotion] = useState<string | null>(null);
  const [foodResponse, setFoodResponse] = useState<string | null>(null);
  const [thought, setThought] = useState("");
  const [bodySensation, setBodySensation] = useState<string | null>(null);
  const [supportChoice, setSupportChoice] = useState<string | null>(null);
  const [closingFeeling, setClosingFeeling] = useState<string | null>(null);
  const [textReady, setTextReady] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [historyLogs, setHistoryLogs] = useState<FoodMapEntry[]>([]);
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
      const res = await fetch(apiPath("/api/food-emotion-map"));
      if (res.ok) {
        const rows = await res.json();
        const formatted = rows.map((r: any) => {
          const parsed = typeof r.map_data === "string" ? JSON.parse(r.map_data) : r.map_data;
          return {
            id: r.id,
            date: r.created_at,
            emotion: parsed.emotion || "",
            foodResponse: parsed.foodResponse || "",
            thought: parsed.thought || "",
            bodySensation: parsed.bodySensation || "",
            supportChoice: parsed.supportChoice || "",
            closingFeeling: parsed.closingFeeling || "",
          } as FoodMapEntry;
        });
        setHistoryLogs(formatted);
      }
    } catch (error) {
      console.error("Failed to fetch history:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    setTextReady(false);
    setStep(s => (s as number) + 1);
  };

  const saveMap = async () => {
    if (!emotion || !foodResponse || !thought.trim() || !bodySensation || !supportChoice || !closingFeeling?.trim()) return;

    setIsSaving(true);
    const id = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9);
    const mapData = {
      emotion,
      foodResponse,
      thought,
      bodySensation,
      supportChoice,
      closingFeeling,
    };

    try {
      const res = await fetch(apiPath("/api/food-emotion-map"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, mapData }),
      });

      if (res.ok) {
        const newEntry: FoodMapEntry = {
          id,
          date: new Date().toISOString(),
          ...mapData,
        };
        setHistoryLogs(prev => [newEntry, ...prev]);
        setStep(7); // Complete screen
      }
    } catch (error) {
      console.error("Failed to save map:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const deleteEntry = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm(t("common.confirm_delete", "Are you sure you want to delete this mapping?"))) return;
    try {
      const res = await fetch(`/api/food-emotion-map?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setHistoryLogs(prev => prev.filter(h => h.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete entry:", err);
    }
  };

  const reset = () => {
    setStep(0);
    setEmotion(null);
    setFoodResponse(null);
    setThought("");
    setBodySensation(null);
    setSupportChoice(null);
    setClosingFeeling(null);
    setTextReady(false);
  };

  const EMOTIONS = ((_t => Array.isArray(_t) ? _t : null)(t("emotions_list", { returnObjects: true }))) || [
    "😰 Stress", "😢 Sadness", "😶 Boredom", "😟 Anxiety", "🥺 Loneliness", "💭 Something else…"
  ];
  const FOOD_RESPONSES = ((_t => Array.isArray(_t) ? _t : null)(t("food_responses", { returnObjects: true }))) || [
    "🍽️ I eat more", "🚫 I eat less", "🍫 I crave specific foods", "😣 I avoid food", "😐 No real change"
  ];
  const BODY_SENSATIONS = ((_t => Array.isArray(_t) ? _t : null)(t("body_sensations", { returnObjects: true }))) || [
    "💔 Tight chest", "🪨 Heavy feeling", "🦵 Restless / fidgety", "🔋 Low energy", "🌀 Knots in stomach", "❓ Something else…"
  ];
  const SUPPORT_OPTIONS = ((_t => Array.isArray(_t) ? _t : null)(t("support_options", { returnObjects: true }))) || [
    "🗣️ Talk to someone", "☕ Take a break", "📝 Journal", "🌬️ Breathe", "🎧 Distract myself"
  ];
  const tSupport = t("support_responses", { returnObjects: true });
  const SUPPORT_RESPONSES: Record<string, { title: string; body: string }> = (typeof tSupport === 'object' && tSupport !== null && !Array.isArray(tSupport) ? tSupport as any : null) || {
    "🗣️ Talk to someone": { title: "Reach out 💛", body: "Sometimes sharing lightens things a bit. Maybe a simple 'hey, can we talk?'" },
    "☕ Take a break": { title: "Pause 💛", body: "A small pause can help reset things. Maybe step away and take a few slow breaths." },
    "📝 Journal": { title: "Write it out 💛", body: "You could start with 'right now I feel…' and just let it flow." },
    "🌬️ Breathe": { title: "Breathe 💛", body: "Inhale 4… hold 2… exhale 6… let's slow it down together." },
    "🎧 Distract myself": { title: "Gentle shift 💛", body: "A gentle distraction can shift the moment… maybe something light or easy." }
  };

  const screenTitles = ((_t => Array.isArray(_t) ? _t : null)(t("screen_titles", { returnObjects: true }))) || [
    "Welcome", "Food Patterns", "Internal Dialogue", "Physical Sensing", "The Map", "Gentle Support", "Final Look", "Complete"
  ];

  if (step === 7) {
    return (
      <PremiumLayout title={t("app_title", "Food & Emotion Map")} showBack={false}>
        <PremiumComplete
          title={t("app_title", "Food & Emotion Map")}
          message={t("complete_message", "You've successfully mapped the connection between your feelings and food. This awareness is a powerful tool for gentle change.")}
          onRestart={reset}
        />
      </PremiumLayout>
    );
  }

  return (
    <PremiumLayout
      title={t("app_title", "Food & Emotion Map")}
      subtitle={step !== "history" ? screenTitles[step] : "Mapping Logs"}
      icon={<Utensils className="w-6 h-6 text-primary" />}
      onBack={step === "history" ? () => setStep(0) : step > 0 ? () => setStep((s) => (s as number) - 1) : undefined}
      onReset={step !== "history" && step > 0 ? reset : undefined}
    >
      <div className="w-full max-w-md mx-auto flex flex-col min-h-[60vh] relative select-none">
        {step !== "history" && (
          <div className="flex justify-center gap-1.5 mb-8">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i <= (step as number) ? "w-8 bg-primary" : "w-1.5 bg-slate-200"
                }`}
              />
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* STEP 0: WELCOME & EMOTION SELECTION */}
          {step === 0 && (
            <motion.div
              key="s0"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex-1 flex flex-col gap-6 text-center justify-center py-4"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-[1.75rem] flex items-center justify-center mx-auto mb-2 text-primary">
                <Sparkles className="w-8 h-8" />
              </div>
              
              <TypingText
                text={t("welcome_text", "Hey… Let's gently map out the connection between how you feel and how you eat.")}
                className="text-xl font-black text-slate-800 leading-snug"
                onComplete={() => setTextReady(true)}
              />

              {textReady && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="space-y-3">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      {t("coming_up_label", "What feeling is prominent today?")}
                    </p>
                    <div className="flex flex-wrap gap-2.5 justify-center">
                      {EMOTIONS.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setEmotion(opt)}
                          className={`px-4.5 py-3 rounded-2xl text-xs font-bold transition-all border ${
                            emotion === opt
                              ? "bg-primary border-primary text-white shadow-lg shadow-primary/30"
                              : "bg-white/50 backdrop-blur-md border-white/50 shadow-sm text-slate-500 hover:bg-white/80 hover:shadow-md"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {emotion && (
                    <div className="flex flex-col gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={nextStep}
                        className="w-full bg-slate-900 text-white shadow-md py-4 rounded-2xl font-bold shadow-lg"
                      >
                        {t("begin_mapping", "Begin Mapping")}
                      </motion.button>
                      
                      <button
                        onClick={() => setStep("history")}
                        className="text-xs font-black uppercase tracking-widest text-slate-450 hover:text-slate-700"
                      >
                        {t("view_weekly", "View Map History")}
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}

          {/* STEP 1: FOOD PATTERNS */}
          {step === 1 && (
            <motion.div
              key="s1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex-1 flex flex-col gap-6 text-center justify-center py-4"
            >
              <TypingText
                text={t("food_patterns_q", { emotion: emotion?.split(" ").slice(-1)[0].toLowerCase() })}
                className="text-lg font-black text-slate-700 leading-relaxed"
                onComplete={() => setTextReady(true)}
              />

              {textReady && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="flex flex-wrap gap-2.5 justify-center">
                    {FOOD_RESPONSES.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setFoodResponse(opt)}
                        className={`px-4.5 py-3.5 rounded-2xl text-xs font-bold transition-all border ${
                          foodResponse === opt
                            ? "bg-primary border-primary text-white shadow-lg shadow-primary/30"
                            : "bg-white/50 backdrop-blur-md border-white/50 shadow-sm text-slate-500 hover:bg-white/80 hover:shadow-md"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  {foodResponse && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={nextStep}
                      className="w-full bg-slate-900 text-white shadow-md py-4 rounded-2xl font-bold"
                    >
                      {t("continue_button", "Continue")}
                    </motion.button>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}

          {/* STEP 2: THOUGHT CHECK */}
          {step === 2 && (
            <motion.div
              key="s2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex-1 flex flex-col gap-6 text-center justify-center py-4"
            >
              <TypingText
                text={t("internal_dialogue_q", "In those moments… what kind of thoughts pop up?")}
                className="text-lg font-black text-slate-700 leading-relaxed"
                onComplete={() => setTextReady(true)}
              />

              {textReady && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <textarea
                    value={thought}
                    onChange={(e) => setThought(e.target.value)}
                    placeholder={t("write_placeholder", "e.g., 'I just need comfort right now' or 'I shouldn't be eating this'...")}
                    rows={4}
                    className="w-full bg-white/60 backdrop-blur-md border border-white/60 shadow-inner rounded-2xl p-5 text-sm font-medium focus:ring-4 focus:ring-primary/5 focus:border-primary/25 outline-none transition-all shadow-inner"
                  />

                  {thought.trim() && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={nextStep}
                      className="w-full bg-slate-900 text-white shadow-md py-4 rounded-2xl font-bold"
                    >
                      {t("continue_button", "Continue")}
                    </motion.button>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}

          {/* STEP 3: PHYSICAL SENSATIONS */}
          {step === 3 && (
            <motion.div
              key="s3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex-1 flex flex-col gap-6 text-center justify-center py-4"
            >
              <TypingText
                text={t("physical_sensing_q", "If you pause for a second… what do you notice in your body?")}
                className="text-lg font-black text-slate-700 leading-relaxed"
                onComplete={() => setTextReady(true)}
              />

              {textReady && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="flex flex-wrap gap-2.5 justify-center">
                    {BODY_SENSATIONS.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setBodySensation(opt)}
                        className={`px-4.5 py-3 rounded-2xl text-xs font-bold transition-all border ${
                          bodySensation === opt
                            ? "bg-primary border-primary text-white shadow-lg shadow-primary/30"
                            : "bg-white/50 backdrop-blur-md border-white/50 shadow-sm text-slate-500 hover:bg-white/80 hover:shadow-md"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  {bodySensation && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={nextStep}
                      className="w-full bg-slate-900 text-white shadow-md py-4 rounded-2xl font-bold"
                    >
                      {t("continue_button", "Continue")}
                    </motion.button>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}

          {/* STEP 4: INTERACTIVE MAP SUMMARY */}
          {step === 4 && (
            <motion.div
              key="s4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="flex-1 flex flex-col gap-6 py-4 text-left"
            >
              <div className="bg-white/60 backdrop-blur-lg border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-8 shadow-xl space-y-6">
                <span className="inline-flex px-3 py-1 rounded-full bg-primary/10 text-primary text-[9px] font-black uppercase tracking-wider">
                  {t("the_pattern_label", "The Pattern Map")}
                </span>
                
                <div className="space-y-5">
                  <p className="text-slate-650 text-base leading-relaxed font-semibold">
                    {t("pattern_desc_1", `When you feel {{emotion}}, your body feels {{sensation}}…`, {
                      emotion: <span className="text-primary font-black">{emotion}</span>,
                      sensation: <span className="text-slate-900 font-extrabold">{bodySensation}</span>,
                    })}
                  </p>
                  
                  <p className="text-slate-650 text-base leading-relaxed font-semibold">
                    {t("pattern_desc_2", `…and food becomes a way to {{response}}, while thoughts like "{{thought}}" show up.`, {
                      response: <span className="text-primary font-black">{foodResponse}</span>,
                      thought: <span className="italic text-slate-800 font-bold">{thought}</span>,
                    })}
                  </p>
                </div>

                <div className="pt-5 border-t border-slate-50 italic text-slate-400 text-xs font-bold uppercase tracking-widest text-center">
                  {t("pattern_footer", '"Pattern awareness is freedom"')}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={nextStep}
                className="w-full bg-slate-900 text-white shadow-md py-4 rounded-2xl font-bold shadow-lg"
              >
                {t("continue_button", "Continue")}
              </motion.button>
            </motion.div>
          )}

          {/* STEP 5: SUPPORT DECISIONS */}
          {step === 5 && (
            <motion.div
              key="s5"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex-1 flex flex-col gap-6 text-center justify-center py-4"
            >
              <TypingText
                text={t("support_q", "In those moments… what might help you—even a little?")}
                className="text-lg font-black text-slate-700 leading-relaxed"
                onComplete={() => setTextReady(true)}
              />

              {textReady && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6 text-left"
                >
                  <div className="flex flex-wrap gap-2.5 justify-center">
                    {SUPPORT_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setSupportChoice(opt)}
                        className={`px-4.5 py-3 rounded-2xl text-xs font-bold transition-all border ${
                          supportChoice === opt
                            ? "bg-primary border-primary text-white shadow-lg shadow-primary/30"
                            : "bg-white/50 backdrop-blur-md border-white/50 shadow-sm text-slate-500 hover:bg-white/80 hover:shadow-md"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  {supportChoice && SUPPORT_RESPONSES[supportChoice] && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-primary/5 rounded-3xl p-6.5 border border-primary/10 shadow-sm"
                    >
                      <p className="font-black text-primary text-sm mb-1.5 uppercase tracking-widest">
                        {SUPPORT_RESPONSES[supportChoice].title}
                      </p>
                      <p className="text-slate-650 text-sm font-semibold leading-relaxed">
                        {SUPPORT_RESPONSES[supportChoice].body}
                      </p>
                    </motion.div>
                  )}

                  {supportChoice && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={nextStep}
                      className="w-full bg-slate-900 text-white shadow-md py-4 rounded-2xl font-bold shadow-lg"
                    >
                      {t("continue_button", "Continue")}
                    </motion.button>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}

          {/* STEP 6: REFLECT & PRESERVE */}
          {step === 6 && (
            <motion.div
              key="s6"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex-1 flex flex-col gap-6 text-center justify-center py-4"
            >
              <TypingText
                text={t("understanding_text", "You're understanding yourself a little better. That's more than enough 💛")}
                className="text-lg font-black text-slate-700 leading-relaxed animate-pulse"
                onComplete={() => setTextReady(true)}
              />

              {textReady && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6 text-left"
                >
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-450 uppercase tracking-widest pl-1">
                      {t("how_feeling_now", "How are you feeling now?")}
                    </label>
                    <textarea
                      value={closingFeeling || ""}
                      onChange={(e) => setClosingFeeling(e.target.value)}
                      placeholder={t("write_placeholder", "Describe briefly...")}
                      rows={4}
                      className="w-full bg-white/60 backdrop-blur-md border border-white/60 shadow-inner rounded-2xl p-5 text-sm font-medium focus:ring-4 focus:ring-primary/5 focus:border-primary/25 outline-none transition-all shadow-inner"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: closingFeeling?.trim() ? 1.02 : 1 }}
                    whileTap={{ scale: closingFeeling?.trim() ? 0.98 : 1 }}
                    onClick={saveMap}
                    disabled={isSaving || !closingFeeling?.trim()}
                    className="w-full bg-slate-900 text-white shadow-md py-4.5 rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2 disabled:opacity-30"
                  >
                    <Save size={18} />
                    {isSaving ? t("preserving", "Preserving...") : t("preserve_button", "Preserve Map")}
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* HISTORY ARCHIVE VIEW */}
          {step === "history" && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex-1 flex flex-col relative z-10 py-4 text-left select-none"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black text-slate-900">Map Archive</h2>
                <button 
                  onClick={() => setStep(0)} 
                  className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-800 transition-colors"
                >
                  Back
                </button>
              </div>

              {isLoading ? (
                <div className="text-center py-12 text-slate-400 font-bold text-xs uppercase tracking-widest">
                  Loading history...
                </div>
              ) : historyLogs.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-3xl border border-white/60 shadow-sm space-y-4 text-center">
                  <span className="text-4xl block">📭</span>
                  <p className="text-slate-450 font-bold text-sm">No eating pattern maps found.</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
                  {historyLogs.map((entry) => (
                    <div
                      key={entry.id}
                      className="w-full bg-white/60 backdrop-blur-lg border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-6 relative group flex flex-col gap-3 shadow-sm hover:shadow-md transition-all"
                    >
                      <button
                        onClick={(e) => deleteEntry(entry.id, e)}
                        className="absolute top-4 right-4 text-slate-350 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Delete log"
                      >
                        <X size={16} />
                      </button>

                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Calendar size={12} />
                        <span className="text-[10px] font-black uppercase tracking-wider">
                          {new Date(entry.date).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex gap-2 flex-wrap">
                        <span className="px-2.5 py-1 rounded bg-primary/5 text-primary text-[10px] font-black uppercase tracking-wider">
                          {entry.emotion}
                        </span>
                        <span className="px-2.5 py-1 rounded bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 text-slate-500 text-[10px] font-black uppercase tracking-wider">
                          {entry.bodySensation}
                        </span>
                      </div>

                      <div className="p-4 rounded-2xl bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 text-xs font-semibold leading-relaxed text-slate-655 space-y-2 border border-white/60/50">
                        <p>💡 <span className="font-black text-slate-800">Thoughts:</span> "{entry.thought}"</p>
                        <p>🍽️ <span className="font-black text-slate-800">Response:</span> {entry.foodResponse}</p>
                        <p>🌱 <span className="font-black text-slate-850">Support Anchor:</span> {entry.supportChoice}</p>
                      </div>

                      {entry.closingFeeling && (
                        <p className="text-slate-650 text-xs font-bold leading-relaxed border-t border-slate-50 pt-2 text-primary">
                          💭 Feel check: "{entry.closingFeeling}"
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

export default function FoodEmotionMapPage() {
  return (
    <I18nextProvider i18n={i18n}>
      <FoodEmotionMapInner />
    </I18nextProvider>
  );
}
