import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TypingText from "./TypingText";
import ChipSelect from "./ChipSelect";
import { Utensils, ChevronRight, Save, History, Sparkles } from "lucide-react";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { PremiumComplete } from "@/components/shared/PremiumComplete";
import { neon } from "@neondatabase/serverless";
import { toast } from "sonner";

const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;

const EMOTIONS = ["😰 Stress", "😢 Sadness", "😶 Boredom", "😟 Anxiety", "🥺 Loneliness", "💭 Something else…"];
const FOOD_RESPONSES = ["🍽️ I eat more", "🚫 I eat less", "🍫 I crave specific foods", "😣 I avoid food", "😐 No real change"];
const BODY_SENSATIONS = ["💔 Tight chest", "🪨 Heavy feeling", "🦵 Restless / fidgety", "🔋 Low energy", "🌀 Knots in stomach", "❓ Something else…"];
const SUPPORT_OPTIONS = ["🗣️ Talk to someone", "☕ Take a break", "📝 Journal", "🌬️ Breathe", "🎧 Distract myself"];

const SUPPORT_RESPONSES: Record<string, { title: string; body: string }> = {
  "🗣️ Talk to someone": {
    title: "Reach out 💛",
    body: "Sometimes sharing lightens things a bit. Maybe a simple 'hey, can we talk?'",
  },
  "☕ Take a break": {
    title: "Pause 💛",
    body: "A small pause can help reset things. Maybe step away and take a few slow breaths.",
  },
  "📝 Journal": {
    title: "Write it out 💛",
    body: "You could start with 'right now I feel…' and just let it flow.",
  },
  "🌬️ Breathe": {
    title: "Breathe 💛",
    body: "Inhale 4… hold 2… exhale 6… let's slow it down together.",
  },
  "🎧 Distract myself": {
    title: "Gentle shift 💛",
    body: "A gentle distraction can shift the moment… maybe something light or easy.",
  },
};

const EmotionFlow = () => {
  const [step, setStep] = useState(0);
  const [emotion, setEmotion] = useState<string | null>(null);
  const [foodResponse, setFoodResponse] = useState<string | null>(null);
  const [thought, setThought] = useState("");
  const [bodySensation, setBodySensation] = useState<string | null>(null);
  const [supportChoice, setSupportChoice] = useState<string | null>(null);
  const [closingFeeling, setClosingFeeling] = useState<string | null>(null);
  const [textReady, setTextReady] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const userId = sessionStorage.getItem("user_id");
    if (!userId || !DATABASE_URL) return;
    try {
      const sql = neon(DATABASE_URL);
      const rows = await sql`SELECT map_data FROM food_emotion_map_entries WHERE user_id = ${userId} ORDER BY created_at DESC`;
      setHistory(rows.map(r => r.map_data));
    } catch (error) {
      console.error("Failed to fetch history:", error);
    }
  };

  const next = () => {
    setTextReady(false);
    setStep(s => s + 1);
  };

  const saveMap = async () => {
    const userId = sessionStorage.getItem("user_id");
    if (!userId || !DATABASE_URL) {
      toast.error("Auth session missing or DB not configured");
      return;
    }

    setIsSaving(true);
    const mapData = {
      emotion,
      foodResponse,
      thought,
      bodySensation,
      supportChoice,
      closingFeeling,
      createdAt: new Date().toISOString(),
    };

    try {
      const sql = neon(DATABASE_URL);
      await sql`INSERT INTO food_emotion_map_entries (user_id, map_data) VALUES (${userId}, ${mapData})`;
      toast.success("Pattern preserved");
      setHistory(prev => [mapData, ...prev]);
      setStep(7); // Go to complete
    } catch (error) {
      console.error("Failed to save map:", error);
      toast.error("Failed to preserve pattern");
    } finally {
      setIsSaving(false);
    }
  };

  if (step === 7) {
    return (
      <PremiumComplete
        title="Map Preserved"
        message="You've successfully mapped the connection between your feelings and food. This awareness is a powerful tool for gentle change."
        onRestart={() => {
          setStep(0);
          setEmotion(null);
          setFoodResponse(null);
          setThought("");
          setBodySensation(null);
          setSupportChoice(null);
          setClosingFeeling(null);
        }}
      />
    );
  }

  const titles = ["Welcome", "Food Patterns", "Internal Dialogue", "Physical Sensing", "The Map", "Gentle Support", "Final Look", "Reflecting"];

  return (
    <PremiumLayout
      title="Food & Emotion Map"
      subtitle={titles[step]}
      icon={<Utensils className="w-6 h-6 text-primary" />}
      onBack={step > 0 ? () => setStep(prev => prev - 1) : undefined}
    >
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-4 min-h-[70vh]" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif' }}>
        <div className="flex justify-center gap-2 mb-10">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${i <= step ? "w-8 bg-primary" : "w-2 bg-slate-100"}`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex-1 flex flex-col gap-6"
          >
            {step === 0 && (
              <div className="flex-1 flex flex-col gap-8 text-center justify-center py-8">
                <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-10 h-10 text-primary" />
                </div>
                <TypingText
                  text="Hey… I'm really glad you're here 💛 Let's gently map out what's been going on."
                  className="text-2xl font-black text-slate-800 leading-tight"
                  onComplete={() => setTextReady(true)}
                />
                {textReady && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 mt-4">
                    <div className="space-y-4">
                      <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">What's coming up lately?</p>
                      <ChipSelect options={EMOTIONS} selected={emotion} onSelect={setEmotion} />
                    </div>
                    {emotion && (
                      <button
                        onClick={next}
                        className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
                      >
                        Begin Mapping
                        <ChevronRight size={20} strokeWidth={3} />
                      </button>
                    )}
                  </motion.div>
                )}
              </div>
            )}

            {step === 1 && (
              <div className="flex-1 flex flex-col gap-8 text-center justify-center py-8">
                <TypingText
                  text={`Hmm… I hear you. When you feel ${emotion?.toLowerCase()}… how does food usually show up?`}
                  className="text-xl font-bold text-slate-700 leading-relaxed"
                  onComplete={() => setTextReady(true)}
                />
                {textReady && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 mt-4">
                    <ChipSelect options={FOOD_RESPONSES} selected={foodResponse} onSelect={setFoodResponse} />
                    {foodResponse && (
                      <button
                        onClick={next}
                        className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
                      >
                        Continue
                        <ChevronRight size={20} strokeWidth={3} />
                      </button>
                    )}
                  </motion.div>
                )}
              </div>
            )}

            {step === 2 && (
              <div className="flex-1 flex flex-col gap-8 text-center justify-center py-8">
                <TypingText
                  text="In those moments… what kind of thoughts pop up?"
                  className="text-xl font-bold text-slate-700 leading-relaxed"
                  onComplete={() => setTextReady(true)}
                />
                {textReady && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 mt-4">
                    <textarea
                      value={thought}
                      onChange={(e) => setThought(e.target.value)}
                      placeholder="Write whatever comes to mind…"
                      className="w-full bg-white border border-slate-100 rounded-3xl p-6 text-base font-medium min-h-[150px] focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all shadow-sm"
                    />
                    {thought.trim() && (
                      <button
                        onClick={next}
                        className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
                      >
                        Continue
                        <ChevronRight size={20} strokeWidth={3} />
                      </button>
                    )}
                  </motion.div>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="flex-1 flex flex-col gap-8 text-center justify-center py-8">
                <TypingText
                  text="If you pause for a second… what do you notice in your body?"
                  className="text-xl font-bold text-slate-700 leading-relaxed"
                  onComplete={() => setTextReady(true)}
                />
                {textReady && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 mt-4">
                    <ChipSelect options={BODY_SENSATIONS} selected={bodySensation} onSelect={setBodySensation} />
                    {bodySensation && (
                      <button
                        onClick={next}
                        className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
                      >
                        Continue
                        <ChevronRight size={20} strokeWidth={3} />
                      </button>
                    )}
                  </motion.div>
                )}
              </div>
            )}

            {step === 4 && (
              <div className="flex-1 flex flex-col gap-8 py-8">
                <div className="bg-white border border-slate-100 rounded-[3rem] p-10 shadow-2xl shadow-slate-200/50 space-y-8">
                  <div className="inline-flex px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
                    The Pattern
                  </div>
                  <div className="space-y-6">
                    <p className="text-slate-600 text-lg leading-relaxed font-medium">
                      When you feel <span className="font-black text-slate-900 underline decoration-primary/30 decoration-4 underline-offset-4">{emotion?.toLowerCase()}</span>, your body feels <span className="font-black text-slate-900 underline decoration-primary/30 decoration-4 underline-offset-4">{bodySensation?.toLowerCase()}</span>…
                    </p>
                    <p className="text-slate-600 text-lg leading-relaxed font-medium">
                      …and food becomes a way to <span className="font-black text-slate-900 underline decoration-primary/30 decoration-4 underline-offset-4">{foodResponse?.toLowerCase()}</span>, while thoughts like <span className="italic font-bold text-slate-800">"{thought}"</span> show up.
                    </p>
                  </div>
                  <div className="pt-6 border-t border-slate-50 italic text-slate-400 text-xs font-bold uppercase tracking-widest text-center">
                    "Pattern awareness is freedom"
                  </div>
                </div>
                <button
                  onClick={next}
                  className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
                >
                  Continue
                  <ChevronRight size={20} strokeWidth={3} />
                </button>
              </div>
            )}

            {step === 5 && (
              <div className="flex-1 flex flex-col gap-8 text-center justify-center py-8">
                <TypingText
                  text="In moments like this… what might help you—even a little?"
                  className="text-xl font-bold text-slate-700 leading-relaxed"
                  onComplete={() => setTextReady(true)}
                />
                {textReady && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 mt-4">
                    <ChipSelect options={SUPPORT_OPTIONS} selected={supportChoice} onSelect={setSupportChoice} />
                    {supportChoice && (
                      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-primary/5 rounded-[2rem] p-8 text-left border border-primary/10">
                        <p className="font-black text-primary text-sm mb-3 uppercase tracking-widest">{SUPPORT_RESPONSES[supportChoice].title}</p>
                        <p className="text-slate-600 font-medium leading-relaxed">{SUPPORT_RESPONSES[supportChoice].body}</p>
                      </motion.div>
                    )}
                    {supportChoice && (
                      <button
                        onClick={next}
                        className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
                      >
                        Continue
                        <ChevronRight size={20} strokeWidth={3} />
                      </button>
                    )}
                  </motion.div>
                )}
              </div>
            )}

            {step === 6 && (
              <div className="flex-1 flex flex-col gap-8 text-center justify-center py-8">
                <TypingText
                  text="You're understanding yourself a little better. That's more than enough 💛"
                  className="text-xl font-bold text-slate-700 leading-relaxed"
                  onComplete={() => setTextReady(true)}
                />
                {textReady && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 mt-4">
                    <div className="space-y-4">
                      <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">How are you feeling now?</p>
                      <textarea
                        value={closingFeeling || ""}
                        onChange={(e) => setClosingFeeling(e.target.value)}
                        placeholder="Write whatever comes to mind…"
                        className="w-full bg-white border border-slate-100 rounded-3xl p-6 text-base font-medium min-h-[150px] focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all shadow-sm"
                      />
                    </div>
                    <button
                      onClick={saveMap}
                      disabled={isSaving || !closingFeeling?.trim()}
                      className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
                    >
                      <Save size={20} strokeWidth={3} />
                      {isSaving ? "Preserving..." : "Preserve Map"}
                    </button>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
};

// Progressive insight reveal component
const InsightMessage = ({
  messages,
  onComplete,
}: {
  messages: string[];
  onComplete: () => void;
}) => {
  const [visibleCount, setVisibleCount] = useState(0);

  const handleMessageDone = () => {
    if (visibleCount < messages.length - 1) {
      setTimeout(() => setVisibleCount(v => v + 1), 400);
    } else {
      onComplete();
    }
  };

  // Show first message on mount
  useState(() => {
    setVisibleCount(0);
  });

  return (
    <div className="space-y-4">
      {messages.slice(0, visibleCount + 1).map((msg, i) => (
        <TypingText
          key={i}
          text={msg}
          speed={25}
          className={`text-lg font-display leading-relaxed ${
            i === messages.length - 1 ? "font-semibold" : ""
          }`}
          onComplete={i === visibleCount ? handleMessageDone : undefined}
        />
      ))}
    </div>
  );
};

export default EmotionFlow;
