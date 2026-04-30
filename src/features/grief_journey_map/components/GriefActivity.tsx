import { useState, useCallback } from "react";
import { Compass, ChevronRight, Heart, Sparkles } from "lucide-react";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { PremiumComplete } from "@/components/shared/PremiumComplete";
import { motion, AnimatePresence } from "framer-motion";

const TOTAL_SCREENS = 3;

/* ── Screen 1: Hook ── */
const Screen1 = ({ onNext }: { onNext: () => void }) => (
  <div className="flex flex-1 flex-col gap-8">
    <div className="relative overflow-hidden rounded-[3rem] bg-white border border-slate-100 p-10 shadow-2xl shadow-slate-200/50 flex flex-col justify-center text-center min-h-[450px]">
      <div className="w-24 h-24 bg-primary/10 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 text-6xl animate-bounce-slow">🌊</div>
      <h1 className="text-3xl font-black text-slate-800 mb-4 leading-tight">
        You're not grieving wrong
      </h1>
      <p className="text-slate-600 font-medium leading-relaxed text-base mb-8">
        Grief doesn't arrive in neat stages and leave on schedule. It crashes in, retreats, and comes back when you least expect it. That's not a flaw in you — that's grief.
      </p>
      <div className="bg-sky-50 rounded-2xl p-8 italic text-sky-900 text-base font-bold leading-relaxed border-l-8 border-sky-400">
        "There is no right way to grieve. There is only your way."
      </div>
    </div>
    <button
      onClick={onNext}
      className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
    >
      Tell me more
      <ChevronRight size={20} strokeWidth={3} />
    </button>
  </div>
);

/* ── Screen 2: Graph ── */
const GriefGraph = () => (
  <div className="grid grid-cols-1 gap-6 mt-4">
    <div className="rounded-3xl bg-slate-50 border border-slate-100 p-6">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">The Expectation</p>
      <svg viewBox="0 0 100 40" className="w-full">
        <path d="M10,35 L90,5" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
        <circle cx="10" cy="35" r="3" fill="#94a3b8" />
        <circle cx="90" cy="5" r="3" fill="#94a3b8" />
      </svg>
      <p className="text-[10px] text-slate-500 mt-4 text-center font-black italic tracking-widest uppercase opacity-60">Linear • Predictable • Clear</p>
    </div>

    <div className="rounded-3xl bg-rose-50 border border-rose-100 p-6">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-400 mb-4">The Reality</p>
      <svg viewBox="0 0 100 40" className="w-full">
        <path d="M10,35 C20,5 30,45 40,15 C50,0 60,40 70,10 C80,25 90,5 90,5" fill="none" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="10" cy="35" r="3" fill="#e11d48" />
        <circle cx="90" cy="5" r="3" fill="#e11d48" />
      </svg>
      <p className="text-[10px] text-rose-600 mt-4 text-center font-black italic tracking-widest uppercase">Chaotic • Looping • Human</p>
    </div>
  </div>
);

const Screen2 = ({ onNext }: { onNext: () => void }) => (
  <div className="flex flex-1 flex-col gap-8">
    <div className="relative overflow-hidden rounded-[3rem] bg-white border border-slate-100 p-10 shadow-2xl shadow-slate-200/50 min-h-[450px]">
      <span className="inline-block rounded-full bg-rose-100 text-rose-600 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest mb-6">
        the real picture
      </span>
      <h1 className="text-3xl font-black text-slate-800 mb-4">Grief wears many faces</h1>
      <p className="text-slate-600 font-medium text-base mb-8 leading-relaxed">
        This is what people expect grief to look like — vs what it actually is.
      </p>
      <GriefGraph />
      <p className="text-slate-400 text-xs mt-10 text-center italic font-bold leading-relaxed max-w-[250px] mx-auto">
        "None of these waves are wrong. All of them are grief."
      </p>
    </div>
    <button
      onClick={onNext}
      className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
    >
      One more thing
      <ChevronRight size={20} strokeWidth={3} />
    </button>
  </div>
);

/* ── Screen 3: Gentle Truths ── */
const TruthCard = ({ emoji, title, body }: { emoji: string; title: string; body: string }) => (
  <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6 group hover:bg-white hover:border-primary/20 transition-all">
    <p className="font-black text-slate-800 text-base mb-2 flex items-center gap-3">
      <span className="text-2xl group-hover:scale-110 transition-transform">{emoji}</span> {title}
    </p>
    <p className="text-sm text-slate-500 leading-relaxed font-medium">{body}</p>
  </div>
);

const Screen3 = ({ onNext }: { onNext: () => void }) => (
  <div className="flex flex-1 flex-col gap-8">
    <div className="relative overflow-hidden rounded-[3rem] bg-white border border-slate-100 p-10 shadow-2xl shadow-slate-200/50 min-h-[450px]">
      <span className="inline-block rounded-full bg-emerald-100 text-emerald-600 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest mb-6">
        gentle truths
      </span>
      <h1 className="text-3xl font-black text-slate-800 mb-8">Worth knowing</h1>

      <div className="space-y-6">
        <TruthCard
          emoji="🗓️"
          title="No deadline"
          body="There's no expiry date on loss. Feeling it months or years later doesn't mean you're stuck — it means you loved."
        />
        <TruthCard
          emoji="🌗"
          title="Contradictory feelings"
          body="You can miss someone and feel relieved. You can laugh and grieve. Grief holds opposites."
        />
        <TruthCard
          emoji="🤍"
          title="Love's transformation"
          body="The pain isn't separate from the love. It's the same thing, transformed."
        />
      </div>
    </div>
    <button
      onClick={onNext}
      className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
    >
      Finish Reflection
      <ChevronRight size={20} strokeWidth={3} />
    </button>
  </div>
);

/* ── Main Activity ── */
const GriefActivity = () => {
  const [screen, setScreen] = useState(0);

  const screens = [
    <Screen1 key={0} onNext={() => setScreen(1)} />,
    <Screen2 key={1} onNext={() => setScreen(2)} />,
    <Screen3 key={2} onNext={() => setScreen(3)} />,
  ];

  if (screen === 3) {
    return (
      <PremiumComplete
        title="Journey Honored"
        message="You don't have to move on. You just learn to carry it differently. Your journey is unique, valid, and deeply human."
        onRestart={() => setScreen(0)}
      />
    );
  }

  return (
    <PremiumLayout
      title="Grief Journey"
      subtitle={`The map of loss • ${screen + 1}/${TOTAL_SCREENS}`}
      icon={<Compass className="w-6 h-6 text-primary" />}
      onBack={screen > 0 ? () => setScreen(prev => prev - 1) : undefined}
      onReset={screen > 0 ? () => setScreen(0) : undefined}
    >
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-4 min-h-[70vh]" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif' }}>
        <div className="flex justify-center gap-2 mb-10">
          {Array.from({ length: TOTAL_SCREENS }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${i <= screen ? "w-8 bg-primary" : "w-2 bg-slate-100"}`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex-1 flex flex-col"
          >
            {screens[screen]}
          </motion.div>
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
};

export default GriefActivity;
