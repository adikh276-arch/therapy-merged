import { useState } from "react";
import { Heart, ChevronRight, ChevronLeft, Sparkles, Brain } from "lucide-react";
import FloatingHearts from "./FloatingHearts";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { PremiumComplete } from "@/components/shared/PremiumComplete";
import { motion, AnimatePresence } from "framer-motion";

const screen1Hearts = ["#F4C0D1", "#D4537E", "#ED93B1", "#F4C0D1", "#D4537E"];
const screen2Hearts = ["#CEC9F6", "#AFA9EC", "#CEC9F6", "#AFA9EC", "#CEC9F6"];

const PsychoeducationActivity = () => {
  const [currentScreen, setCurrentScreen] = useState(0);

  if (currentScreen === 2) {
    return (
      <PremiumComplete
        title="Clarity Gained"
        message="Understanding the chemistry of missing someone is the first step toward healing. Your feelings are valid, and your brain is simply doing its job to protect and process."
        onRestart={() => setCurrentScreen(0)}
      />
    );
  }

  const subtitles = [
    "Validation",
    "Internal Wisdom",
    "Complete"
  ];

  return (
    <PremiumLayout
      title="Missing Someone"
      subtitle={subtitles[currentScreen]}
      icon={<Heart className="w-6 h-6 text-primary" />}
      onBack={currentScreen > 0 ? () => setCurrentScreen(prev => prev - 1) : undefined}
    >
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-4 min-h-[70vh]" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif' }}>
        <div className="flex justify-center gap-2 mb-10">
          {[0, 1].map((i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${i <= currentScreen ? "w-8 bg-primary" : "w-2 bg-slate-100"}`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {currentScreen === 0 && (
            <motion.div
              key="screen1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex-1 flex flex-col gap-8"
            >
              <div className="relative overflow-hidden rounded-[3rem] bg-white border border-slate-100 p-8 shadow-2xl shadow-slate-200/50 min-h-[450px]">
                <div className="absolute top-[-20px] right-[-20px] w-32 h-32 rounded-full bg-pink-100/50 blur-3xl" />
                <div className="absolute bottom-[-20px] left-[-20px] w-32 h-32 rounded-full bg-amber-100/30 blur-3xl" />
                <FloatingHearts colors={screen1Hearts} />
                
                <div className="relative z-10 space-y-6">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-pink-50 text-pink-600 text-[10px] font-black uppercase tracking-widest">
                    Validation
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-slate-400 font-bold text-sm">It doesn't mean you're weak.</p>
                    <h1 className="text-3xl font-black text-slate-800 leading-tight">
                      Missing someone who hurt you is deeply human.
                    </h1>
                    <p className="text-slate-600 leading-relaxed font-medium text-base">
                      You left. Or they left. And yet — you still reach for your phone hoping it's them. You still replay the good moments more than the painful ones. This contradiction isn't a flaw. It's how your brain processes loss.
                    </p>
                  </div>

                  <div className="bg-pink-50/50 border-l-4 border-pink-400 rounded-2xl p-6 italic text-pink-900 text-sm leading-relaxed shadow-sm">
                    "You don't just miss the person. You miss the feeling of being bonded to them."
                  </div>
                </div>
              </div>

              <button
                onClick={() => setCurrentScreen(1)}
                className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
              >
                Next Step
                <ChevronRight size={20} strokeWidth={3} />
              </button>
            </motion.div>
          )}

          {currentScreen === 1 && (
            <motion.div
              key="screen2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex-1 flex flex-col gap-8"
            >
              <div className="relative overflow-hidden rounded-[3rem] bg-white border border-slate-100 p-8 shadow-2xl shadow-slate-200/50 min-h-[450px]">
                <div className="absolute top-[-20px] left-[-20px] w-32 h-32 rounded-full bg-indigo-100/50 blur-3xl" />
                <div className="absolute bottom-[-20px] right-[-20px] w-32 h-32 rounded-full bg-pink-100/30 blur-3xl" />
                <FloatingHearts colors={screen2Hearts} />

                <div className="relative z-10 space-y-6">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest">
                    Brain Science
                  </div>

                  <div className="space-y-4">
                    <p className="text-slate-400 font-bold text-sm">Internal Wisdom</p>
                    <h1 className="text-3xl font-black text-slate-800 leading-tight">
                      Love creates a chemical bond.
                    </h1>
                    <p className="text-slate-600 leading-relaxed font-medium text-base">
                      When you love someone, your brain releases dopamine, oxytocin, and serotonin. When it ends, those levels drop. Your brain grieves — not just the person, but the feeling of closeness.
                    </p>
                  </div>

                  <div className="bg-indigo-50/50 border-l-4 border-indigo-400 rounded-2xl p-6 italic text-indigo-900 text-sm leading-relaxed shadow-sm">
                    "Missing them doesn't mean you should go back. Your heart is grieving a bond — not necessarily the person as they truly were."
                  </div>
                </div>
              </div>

              <button
                onClick={() => setCurrentScreen(2)}
                className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
              >
                Finish Reflection
                <ChevronRight size={20} strokeWidth={3} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
};

export default PsychoeducationActivity;
