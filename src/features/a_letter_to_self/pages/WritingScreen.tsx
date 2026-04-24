import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Calendar, Check, Loader2, Sparkles, Send, Save } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
    <div className="flex flex-col items-center py-6 pb-24">
      <div className="w-full max-w-lg space-y-8">
        <header className="flex items-center justify-between">
          <div className="text-left">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-1">Your Letter</h1>
            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
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
              className="text-xs font-bold flex items-center gap-1.5"
            >
              {saveStatus === "saving" && (
                <span className="text-primary flex items-center gap-1">
                  <Loader2 size={14} className="animate-spin" /> Saving...
                </span>
              )}
              {saveStatus === "saved" && (
                <span className="text-emerald-500 flex items-center gap-1">
                  <Check size={14} /> Saved
                </span>
              )}
            </motion.div>
          </AnimatePresence>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
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
            className="w-full min-h-[300px] bg-white border-2 border-slate-100 rounded-[2.5rem] px-8 py-8 text-lg leading-relaxed focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all resize-none shadow-sm placeholder:text-slate-300"
          />
        </motion.div>

        {/* Inspiration Section */}
        <div className="bg-white rounded-3xl border-2 border-slate-100 overflow-hidden shadow-sm">
          <button
            onClick={() => setInspirationOpen(!inspirationOpen)}
            className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2 font-bold text-slate-700">
              <Sparkles className="text-primary" size={18} />
              Need some inspiration?
            </div>
            <motion.div
              animate={{ rotate: inspirationOpen ? 180 : 0 }}
              className="text-slate-400"
            >
              <ChevronDown size={20} />
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
                <div className="px-6 pb-6 grid gap-3">
                  {PROMPTS.map((prompt) => (
                    <motion.button
                      key={prompt}
                      whileHover={{ scale: 1.01, x: 4 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handlePromptClick(prompt)}
                      className="text-left bg-slate-50 text-slate-600 rounded-2xl px-5 py-4 text-sm font-medium hover:bg-primary/5 hover:text-primary transition-all border border-transparent hover:border-primary/20"
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
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-lg px-6 z-20">
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => doSave(content)}
              className="flex-1 py-5 rounded-[2rem] bg-white border-2 border-slate-100 text-slate-600 font-bold shadow-sm flex items-center justify-center gap-2"
            >
              <Save size={20} />
              Save
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleFinish}
              disabled={!content.trim()}
              className="flex-1 py-5 rounded-[2rem] bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-40 disabled:shadow-none"
            >
              Finish
              <Send size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritingScreen;
