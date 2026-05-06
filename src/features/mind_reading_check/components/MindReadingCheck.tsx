import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Clock, RotateCcw, List, ChevronRight, CheckCircle2, History, MessageCircle } from "lucide-react";
import { PremiumLayout } from "../../../components/shared/PremiumLayout";
import { PremiumIntro } from "../../../components/shared/PremiumIntro";
import { PremiumComplete } from "../../../components/shared/PremiumComplete";

const TOTAL_SCREENS = 11;

interface ActivityData {
  situation: string;
  thought: string;
  evidence: string;
  alternatives: string[];
  beliefLevel: number;
  balancedThought: string;
  actionStep: string;
}

const emptyData: ActivityData = {
  situation: "",
  thought: "",
  evidence: "",
  alternatives: ["", "", ""],
  beliefLevel: 50,
  balancedThought: "",
  actionStep: "",
};

export default function MindReadingCheck() {
  const [screen, setScreen] = useState<number | "intro" | "history" | "complete">("intro");
  const [data, setData] = useState<ActivityData>({ ...emptyData });
  const [history, setHistory] = useState<any[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("mrc-history") || "[]");
    } catch {
      return [];
    }
  });

  const next = () => {
    if (typeof screen === 'number' && screen < TOTAL_SCREENS - 1) setScreen(screen + 1);
  };

  const finish = () => {
    const updatedHistory = [{ ...data, date: new Date().toISOString() }, ...history].slice(0, 20);
    setHistory(updatedHistory);
    localStorage.setItem("mrc-history", JSON.stringify(updatedHistory));
    setScreen("complete");
  };

  const reset = () => {
    setData({ ...emptyData });
    setScreen("intro");
  };

  const updateAlt = (i: number, v: string) => {
    const alts = [...data.alternatives];
    alts[i] = v;
    setData({ ...data, alternatives: alts });
  };

  if (screen === "intro") {
    return (
      <PremiumLayout title="Mind Reading Check">
        <PremiumIntro
          title="Mind Reading Check"
          description="Question the assumptions you make about what others are thinking."
          onStart={() => setScreen(1)}
          icon={<MessageCircle size={32} />}
          benefits={[
            "Stop assuming the worst",
            "Identify biased interpretations",
            "Build clearer communication"
          ]}
          duration="3-4 minutes"
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
        <div className="space-y-4 max-w-lg mx-auto">
          {history.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 font-bold text-slate-400 uppercase tracking-widest text-xs">
              No entries yet
            </div>
          ) : (
            history.map((entry: any, i: number) => (
              <div key={i} className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">
                    {new Date(entry.date).toLocaleDateString()}
                  </span>
                  <span className="px-2 py-1 rounded-lg bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
                    Belief: {entry.beliefLevel}%
                  </span>
                </div>
                <p className="text-slate-900 font-bold mb-2">"{entry.thought}"</p>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Balanced Thought</p>
                  <p className="text-xs text-slate-600 font-medium">{entry.balancedThought}</p>
                </div>
              </div>
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
          title="Great Insights!"
          message="By questioning your assumptions, you're building a more objective and compassionate mind."
          onRestart={reset}
        />
      </PremiumLayout>
    );
  }

  return (
    <PremiumLayout 
      title="Mind Reading Check" 
      subtitle={`Step ${screen} of 10`}
      onBack={() => setScreen("intro")}
      onReset={reset}
    >
      <div className="max-w-2xl mx-auto py-8">
        <AnimatePresence mode="wait">
          {screen === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100 space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-black text-slate-900">What happened?</h2>
                <p className="text-slate-500 font-medium">Describe a recent moment where you felt judged or unsure.</p>
              </div>
              <textarea
                value={data.situation}
                onChange={(v) => setData({ ...data, situation: v.target.value })}
                placeholder="Description of the situation..."
                className="w-full min-h-[160px] rounded-3xl border-2 border-slate-50 bg-slate-50 p-6 text-lg text-slate-900 focus:outline-none focus:border-primary/30 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all resize-none"
              />
              <button onClick={next} disabled={!data.situation.trim()} className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3 disabled:opacity-30">
                Continue <ChevronRight size={20} />
              </button>
            </motion.div>
          )}

          {screen === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100 space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-black text-slate-900">What went through your mind?</h2>
                <p className="text-slate-500 font-medium">What did you assume they were thinking about you?</p>
              </div>
              <textarea
                value={data.thought}
                onChange={(v) => setData({ ...data, thought: v.target.value })}
                placeholder="I assumed they were thinking..."
                className="w-full min-h-[160px] rounded-3xl border-2 border-slate-50 bg-slate-50 p-6 text-lg text-slate-900 focus:outline-none focus:border-primary/30 focus:bg-white transition-all resize-none"
              />
              <button onClick={next} disabled={!data.thought.trim()} className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3 disabled:opacity-30">
                Continue <ChevronRight size={20} />
              </button>
            </motion.div>
          )}

          {screen === 3 && (
            <motion.div key="s3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-white rounded-[2.5rem] p-12 shadow-xl border border-slate-100 space-y-10 text-center">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 4, repeat: Infinity }} className="w-12 h-12 bg-primary/20 rounded-full" />
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-black text-slate-900">Let's slow this down</h2>
                <p className="text-lg text-slate-500 font-medium leading-relaxed">Right now, this thought can feel true. But before accepting it as a fact, let's take a step back and look at it more closely.</p>
              </div>
              <button onClick={next} className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3">
                Pause & Continue <ChevronRight size={20} />
              </button>
            </motion.div>
          )}

          {screen === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100 space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-black text-slate-900">Is this true?</h2>
                <p className="text-slate-500 font-medium">Is there any clear evidence (facts, not assumptions) that supports this thought?</p>
              </div>
              <textarea
                value={data.evidence}
                onChange={(v) => setData({ ...data, evidence: v.target.value })}
                placeholder="The evidence I see is..."
                className="w-full min-h-[160px] rounded-3xl border-2 border-slate-50 bg-slate-50 p-6 text-lg text-slate-900 focus:outline-none focus:border-primary/30 focus:bg-white transition-all resize-none"
              />
              <button onClick={next} disabled={!data.evidence.trim()} className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3 disabled:opacity-30">
                Continue <ChevronRight size={20} />
              </button>
            </motion.div>
          )}

          {screen === 5 && (
            <motion.div key="s5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100 space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-black text-slate-900">What else could be going on?</h2>
                <p className="text-slate-500 font-medium">What are 2–3 other possible explanations?</p>
              </div>
              <div className="space-y-4">
                {data.alternatives.map((alt, i) => (
                  <input
                    key={i}
                    value={alt}
                    onChange={(e) => updateAlt(i, e.target.value)}
                    placeholder={`Possibility ${i + 1}...`}
                    className="w-full py-4 px-6 rounded-2xl border-2 border-slate-50 bg-slate-50 text-slate-900 font-medium focus:outline-none focus:border-primary/30 focus:bg-white transition-all"
                  />
                ))}
              </div>
              <button onClick={next} disabled={data.alternatives.filter(a => a.trim()).length < 2} className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3 disabled:opacity-30">
                Continue <ChevronRight size={20} />
              </button>
            </motion.div>
          )}

          {screen === 6 && (
            <motion.div key="s6" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100 space-y-10 text-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-black text-slate-900">Check your belief</h2>
                <p className="text-slate-500 font-medium">How strongly do you believe your original thought now?</p>
              </div>
              <div className="space-y-6">
                <div className="text-5xl font-black text-primary">{data.beliefLevel}%</div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={data.beliefLevel}
                  onChange={(e) => setData({ ...data, beliefLevel: Number(e.target.value) })}
                  className="w-full h-2 rounded-full appearance-none bg-slate-100 accent-primary cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-300">
                  <span>Not at all</span>
                  <span>Completely</span>
                </div>
              </div>
              <button onClick={next} className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3">
                Continue <ChevronRight size={20} />
              </button>
            </motion.div>
          )}

          {screen === 7 && (
            <motion.div key="s7" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100 space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-black text-slate-900">A more balanced view</h2>
                <p className="text-slate-500 font-medium">Write a thought that feels more fair and less certain.</p>
              </div>
              <textarea
                value={data.balancedThought}
                onChange={(v) => setData({ ...data, balancedThought: v.target.value })}
                placeholder="A more balanced thought..."
                className="w-full min-h-[160px] rounded-3xl border-2 border-slate-50 bg-slate-50 p-6 text-lg text-slate-900 focus:outline-none focus:border-primary/30 focus:bg-white transition-all resize-none"
              />
              <button onClick={next} disabled={!data.balancedThought.trim()} className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3 disabled:opacity-30">
                Continue <ChevronRight size={20} />
              </button>
            </motion.div>
          )}

          {screen === 8 && (
            <motion.div key="s8" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100 space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-black text-slate-900">Next time</h2>
                <p className="text-slate-500 font-medium">What could you do instead of assuming?</p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {["Ask for clarification", "Give it some time", "Notice without reacting"].map(ex => (
                  <span key={ex} className="px-3 py-1.5 rounded-xl bg-slate-50 text-[10px] font-bold uppercase tracking-widest text-slate-400 border border-slate-100">{ex}</span>
                ))}
              </div>
              <textarea
                value={data.actionStep}
                onChange={(v) => setData({ ...data, actionStep: v.target.value })}
                placeholder="Next time, I could..."
                className="w-full min-h-[160px] rounded-3xl border-2 border-slate-50 bg-slate-50 p-6 text-lg text-slate-900 focus:outline-none focus:border-primary/30 focus:bg-white transition-all resize-none"
              />
              <button onClick={next} disabled={!data.actionStep.trim()} className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3 disabled:opacity-30">
                Continue <ChevronRight size={20} />
              </button>
            </motion.div>
          )}

          {screen === 9 && (
            <motion.div key="s9" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100 space-y-10">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-black text-slate-900">Notice the shift</h2>
                <p className="text-slate-500 font-medium">You explored different possibilities and created space for a more balanced view.</p>
              </div>
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Original Thought</p>
                  <p className="text-slate-900 font-bold">"{data.thought}"</p>
                </div>
                <div className="p-5 rounded-2xl bg-primary/5 border-2 border-primary/20">
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Balanced Perspective</p>
                  <p className="text-slate-900 font-bold">"{data.balancedThought}"</p>
                </div>
              </div>
              <button onClick={next} className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-slate-900/20">
                Finish Reflection <ChevronRight size={20} />
              </button>
            </motion.div>
          )}

          {screen === 10 && (
            <motion.div key="s10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-white rounded-[2.5rem] p-12 shadow-xl border border-slate-100 space-y-10 text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center mx-auto text-primary">
                <Brain size={40} />
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-black text-slate-900">A small shift</h2>
                <p className="text-lg text-slate-500 font-medium leading-relaxed">Your mind tries to fill in the gaps. But not every thought is a fact. Taking a step back helps you see things clearly.</p>
              </div>
              <button onClick={finish} className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3">
                Complete Activity
                <CheckCircle2 size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
}
