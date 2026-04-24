import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Calendar, Check, Loader2, Sparkles, Send, Save } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PremiumLayout } from "../../../components/shared/PremiumLayout";
import {
  generateId,
  getCurrentDate,
  getCurrentTime,
  saveEntry,
  type LetterEntry,
} from "../lib/letters";

const PROMPTS = [
  "What have I been handling well lately?",
  "What would I tell myself on a difficult day?",
  "What strengths helped me get through recent stress?",
  "What hope or encouragement do I need right now?",
  "What would a kind friend say to me today?",
  "What am I proud of, even quietly?",
];

const WritingScreen = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [inspirationOpen, setInspirationOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const entryRef = useRef<LetterEntry>({
    id: generateId(),
    date: getCurrentDate(),
    time: getCurrentTime(),
    content: "",
    emotionalState: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const doSave = useCallback(
    async (text: string) => {
      setSaveStatus("saving");
      entryRef.current.content = text;
      entryRef.current.updatedAt = new Date().toISOString();
      await saveEntry(entryRef.current);
      setSaveStatus("saved");
    },
    []
  );

  useEffect(() => {
    if (!content) return;
    const timer = setInterval(() => {
      doSave(content);
    }, 5000);
    return () => clearInterval(timer);
  }, [content, doSave]);

  const handlePromptClick = (prompt: string) => {
    setContent((prev) => (prev ? prev + "\n\n" + prompt + "\n" : prompt + "\n"));
    textareaRef.current?.focus();
  };

  const handleFinish = async () => {
    await doSave(content);
    navigate("../check-in", { state: { entryId: entryRef.current.id } });
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <PremiumLayout 
        title="Compose Letter" 
        onSecondaryBack={() => navigate("..")}
        secondaryBackLabel="Back to start"
    >
      <div className="w-full space-y-10 pb-32">
        <header className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-slate-900 leading-tight tracking-tight">Your Letter</h1>
            <div className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-widest">
              <Calendar size={14} />
              {currentDate}
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={saveStatus}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="font-black text-[10px] uppercase tracking-widest flex items-center gap-2"
            >
              {saveStatus === "saving" && (
                <span className="text-primary flex items-center gap-1.5">
                  <Loader2 size={12} className="animate-spin" /> Saving...
                </span>
              )}
              {saveStatus === "saved" && (
                <span className="text-emerald-500 flex items-center gap-1.5">
                  <Check size={12} /> Saved
                </span>
              )}
            </motion.div>
          </AnimatePresence>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              setSaveStatus("idle");
            }}
            placeholder="Right now, I want you to remember..."
            className="w-full min-h-[400px] bg-slate-50 border-2 border-transparent focus:bg-white focus:border-primary/30 rounded-[3rem] px-10 py-10 text-xl font-bold leading-relaxed outline-none transition-all resize-none shadow-inner placeholder:text-slate-200"
          />
        </motion.div>

        {/* Inspiration Section */}
        <div className="bg-white rounded-[2.5rem] border-2 border-slate-100 overflow-hidden shadow-sm group hover:border-primary/20 transition-all">
          <button
            onClick={() => setInspirationOpen(!inspirationOpen)}
            className="w-full flex items-center justify-between px-8 py-6 text-left hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3 font-black text-slate-700 uppercase text-xs tracking-widest">
              <Sparkles className="text-primary" size={20} />
              Need some inspiration?
            </div>
            <motion.div
              animate={{ rotate: inspirationOpen ? 180 : 0 }}
              className="text-slate-300 group-hover:text-primary transition-colors"
            >
              <ChevronDown size={24} />
            </motion.div>
          </button>

          <AnimatePresence>
            {inspirationOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="px-8 pb-8 grid gap-4">
                  {PROMPTS.map((prompt) => (
                    <motion.button
                      key={prompt}
                      whileHover={{ scale: 1.02, x: 8 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handlePromptClick(prompt)}
                      className="text-left bg-slate-50 text-slate-700 rounded-2xl px-6 py-5 text-base font-bold hover:bg-primary/5 hover:text-primary transition-all border-2 border-transparent hover:border-primary/10 shadow-sm"
                    >
                      "{prompt}"
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Buttons */}
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-xl px-10 z-20">
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => doSave(content)}
              className="flex-1 py-5 rounded-[2rem] bg-white border-2 border-slate-100 text-slate-400 font-black text-sm uppercase tracking-widest shadow-xl shadow-slate-200/50 flex items-center justify-center gap-3 hover:text-slate-900 hover:border-slate-200 transition-all"
            >
              <Save size={20} />
              Save
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleFinish}
              disabled={!content.trim()}
              className="flex-2 py-5 rounded-[2rem] bg-primary text-primary-foreground font-black text-lg shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-40 disabled:shadow-none"
            >
              Finish
              <Send size={22} />
            </motion.button>
          </div>
        </div>
      </div>
    </PremiumLayout>
  );
};

export default WritingScreen;
