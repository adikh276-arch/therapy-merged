import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { History, Calendar, ChevronRight, Save, Home, RotateCcw, Brain, Activity } from "lucide-react";
import { toast } from "sonner";
import { PremiumLayout } from "../../../components/shared/PremiumLayout";
import { PremiumIntro } from "../../../components/shared/PremiumIntro";
import { PremiumComplete } from "../../../components/shared/PremiumComplete";

const EMOTIONS = ["Anxious", "Nervous", "Scared", "Overwhelmed", "Uneasy"];

const COMPARISON_OPTIONS = [
  "It turned out almost exactly how I expected",
  "Some parts were right, but not everything",
  "It was quite different from what I expected",
  "It was much easier/better than I imagined",
];

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

const STORAGE_KEY = "prediction-vs-reality-entries";

function loadEntries(): Entry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveEntry(entry: Entry) {
  const entries = loadEntries();
  entries.unshift(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export default function PredictionVsReality() {
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

  useEffect(() => {
    setEntries(loadEntries());
  }, []);

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

  const handleSave = () => {
    const entry: Entry = {
      id: crypto.randomUUID(),
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
    saveEntry(entry);
    setEntries(loadEntries());
    toast.success("Reflection saved!");
    setScreen("complete");
  };

  const toggleEmotion = (e: string) => {
    setEmotions((prev) =>
      prev.includes(e) ? prev.filter((x) => x !== e) : [...prev, e]
    );
  };

  if (screen === "intro") {
    return (
      <PremiumLayout title="Prediction vs Reality">
        <PremiumIntro
          title="Prediction vs Reality"
          description="Compare your anxious predictions with what actually happens to build a more balanced perspective."
          onStart={() => setScreen(1)}
          icon={<Activity size={32} />}
          benefits={[
            "Identify anxious patterns",
            "Collect evidence against fears",
            "Reduce future overthinking"
          ]}
          duration="4-5 minutes"
        />
        <div className="mt-8 flex justify-center pb-20">
          <button 
            onClick={() => setScreen("history")}
            className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest"
          >
            <History size={16} />
            View Past Reflections
          </button>
        </div>
      </PremiumLayout>
    );
  }

  if (screen === "history") {
    return (
      <PremiumLayout title="Past Reflections" onBack={() => setScreen("intro")}>
        <div className="space-y-4 max-w-2xl mx-auto">
          {entries.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
              <p className="text-slate-400 font-medium">No reflections saved yet.</p>
            </div>
          ) : (
            entries.map((entry, i) => (
              <motion.div 
                key={entry.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm space-y-6"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-300">
                    <Calendar size={12} />
                    {new Date(entry.date).toLocaleDateString()}
                  </div>
                  <div className="flex gap-1">
                    {entry.emotions.map(em => (
                      <span key={em} className="px-2 py-1 rounded-lg bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-widest">{em}</span>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 space-y-1">
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Prediction</p>
                    <p className="text-sm text-slate-600 italic">"{entry.prediction}"</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-primary/5 space-y-1">
                    <p className="text-[9px] font-black uppercase tracking-widest text-primary">Reality</p>
                    <p className="text-sm text-slate-900 font-bold">"{entry.reality}"</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-50">
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    <span className="text-slate-900 font-bold">Reflection:</span> {entry.reflection}
                  </p>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </PremiumLayout>
    );
  }

  if (screen === "complete") {
    return (
      <PremiumLayout title="Activity Complete" showBack={false}>
        <PremiumComplete
          title="Reflection Saved"
          message="By looking at the facts, you're helping your mind learn that things are often more manageable than they seem."
          onRestart={reset}
        />
      </PremiumLayout>
    );
  }

  return (
    <PremiumLayout 
      title="Prediction vs Reality" 
      subtitle={`Step ${screen} of 8`}
      onBack={() => setScreen("intro")}
      onReset={reset}
    >
      <div className="max-w-2xl mx-auto py-8">
        <AnimatePresence mode="wait">
          {screen === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100 space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-black text-slate-900">Think of a recent situation</h2>
                <p className="text-slate-500 font-medium">Recall a recent moment where you felt anxious or unsure.</p>
              </div>
              <textarea
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
                placeholder="Describe the situation..."
                className="w-full min-h-[160px] rounded-3xl border-2 border-slate-50 bg-slate-50 p-6 text-lg text-slate-900 focus:outline-none focus:border-primary/30 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all resize-none"
              />
              <button onClick={() => setScreen(2)} disabled={!situation.trim()} className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3 disabled:opacity-30">
                Continue <ChevronRight size={20} />
              </button>
            </motion.div>
          )}

          {screen === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100 space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-black text-slate-900">What did you think would happen?</h2>
                <p className="text-slate-500 font-medium">What were you expecting or fearing in that moment?</p>
              </div>
              <textarea
                value={prediction}
                onChange={(e) => setPrediction(e.target.value)}
                placeholder="I was worried that..."
                className="w-full min-h-[160px] rounded-3xl border-2 border-slate-50 bg-slate-50 p-6 text-lg text-slate-900 focus:outline-none focus:border-primary/30 focus:bg-white transition-all resize-none"
              />
              <button onClick={() => setScreen(3)} disabled={!prediction.trim()} className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3 disabled:opacity-30">
                Continue <ChevronRight size={20} />
              </button>
            </motion.div>
          )}

          {screen === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100 space-y-10">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-black text-slate-900">How did you feel?</h2>
                <p className="text-slate-500 font-medium">Select the emotions you felt and their intensity.</p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {EMOTIONS.map(e => (
                  <button
                    key={e}
                    onClick={() => toggleEmotion(e)}
                    className={`px-6 py-3 rounded-2xl text-sm font-black uppercase tracking-widest transition-all ${
                      emotions.includes(e) ? "bg-primary text-white shadow-lg" : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                    }`}
                  >
                    {e}
                  </button>
                ))}
              </div>
              <div className="space-y-4 pt-4">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
                  <span>Not Intense</span>
                  <span className="text-slate-900 text-lg">{intensity}</span>
                  <span>Very Intense</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={intensity}
                  onChange={(e) => setIntensity(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none bg-slate-100 accent-primary cursor-pointer"
                />
              </div>
              <button onClick={() => setScreen(4)} disabled={emotions.length === 0} className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3 disabled:opacity-30">
                Continue <ChevronRight size={20} />
              </button>
            </motion.div>
          )}

          {screen === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100 space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-black text-slate-900">What actually happened?</h2>
                <p className="text-slate-500 font-medium">Focus on the facts of what really took place.</p>
              </div>
              <textarea
                value={reality}
                onChange={(e) => setReality(e.target.value)}
                placeholder="In reality..."
                className="w-full min-h-[160px] rounded-3xl border-2 border-slate-50 bg-slate-50 p-6 text-lg text-slate-900 focus:outline-none focus:border-primary/30 focus:bg-white transition-all resize-none"
              />
              <button onClick={() => setScreen(5)} disabled={!reality.trim()} className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3 disabled:opacity-30">
                Continue <ChevronRight size={20} />
              </button>
            </motion.div>
          )}

          {screen === 5 && (
            <motion.div key="s5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100 space-y-8 text-center">
              <h2 className="text-3xl font-black text-slate-900">Let's look at both</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-8 rounded-[2rem] bg-slate-50 space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Expectation</p>
                  <p className="text-slate-400 italic">"{prediction}"</p>
                </div>
                <div className="p-8 rounded-[2rem] bg-primary/5 border-2 border-primary/20 space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Reality</p>
                  <p className="text-slate-900 font-bold">"{reality}"</p>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-slate-500 font-medium">How close was your expectation?</p>
                <div className="space-y-2">
                  {COMPARISON_OPTIONS.map(opt => (
                    <button
                      key={opt}
                      onClick={() => setComparison(opt)}
                      className={`w-full text-left p-4 rounded-2xl text-sm font-bold transition-all border-2 ${
                        comparison === opt ? "bg-slate-900 border-slate-900 text-white" : "bg-white border-slate-100 text-slate-600 hover:border-primary/30"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={() => setScreen(6)} disabled={!comparison} className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3 disabled:opacity-30">
                Continue <ChevronRight size={20} />
              </button>
            </motion.div>
          )}

          {screen === 6 && (
            <motion.div key="s6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100 space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-black text-slate-900">What do you notice?</h2>
                <p className="text-slate-500 font-medium">Was it as bad as you thought it would be?</p>
              </div>
              <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="I notice that..."
                className="w-full min-h-[160px] rounded-3xl border-2 border-slate-50 bg-slate-50 p-6 text-lg text-slate-900 focus:outline-none focus:border-primary/30 focus:bg-white transition-all resize-none"
              />
              <button onClick={() => setScreen(7)} className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3">
                Continue <ChevronRight size={20} />
              </button>
            </motion.div>
          )}

          {screen === 7 && (
            <motion.div key="s7" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100 space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-black text-slate-900">Next time</h2>
                <p className="text-slate-500 font-medium">What could you remind yourself if this happens again?</p>
              </div>
              <textarea
                value={reframe}
                onChange={(e) => setReframe(e.target.value)}
                placeholder='e.g., "Maybe it won&apos;t be as bad as I&apos;m imagining."'
                className="w-full min-h-[160px] rounded-3xl border-2 border-slate-50 bg-slate-50 p-6 text-lg text-slate-900 focus:outline-none focus:border-primary/30 focus:bg-white transition-all resize-none"
              />
              <button onClick={() => setScreen(8)} className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3">
                Continue <ChevronRight size={20} />
              </button>
            </motion.div>
          )}

          {screen === 8 && (
            <motion.div key="s8" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100 space-y-10 text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center text-primary mx-auto">
                <Brain size={40} />
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-black text-slate-900">A small reminder</h2>
                <p className="text-lg text-slate-500 font-medium leading-relaxed">Your mind tries to prepare you—but it doesn't always predict accurately. Every time you pause to look at the facts, you build resilience.</p>
              </div>
              <button onClick={handleSave} className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-slate-900/20">
                Save Reflection <Save size={20} />
              </button>
              <button onClick={reset} className="text-slate-400 font-bold uppercase tracking-widest text-xs hover:text-slate-900 transition-colors">Discard Entry</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
}
