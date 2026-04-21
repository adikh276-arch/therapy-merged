import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Calendar, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  generateId,
  getCurrentDate,
  getCurrentTime,
  saveEntry,
  type LetterEntry,
} from "@/lib/letters";

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

  // Auto-save every 5 seconds
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

  const handleSave = async () => {
    await doSave(content);
  };

  const handleFinish = async () => {
    await doSave(content);
    navigate("/check-in", { state: { entryId: entryRef.current.id } });
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen px-4 py-8 fade-enter">
      <div className="max-w-lg mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-heading">Your Letter</h1>
          <div className="text-sm text-muted-foreground flex items-center gap-1.5">
            {saveStatus === "saving" && (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving…
              </>
            )}
            {saveStatus === "saved" && (
              <>
                <Check className="w-3.5 h-3.5 text-accent-foreground" /> Saved ✓
              </>
            )}
          </div>
        </div>

        {/* Date */}
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <Calendar className="w-4 h-4" />
          {currentDate}
        </div>

        {/* Text Area */}
        <Textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            setSaveStatus("idle");
          }}
          placeholder="Right now, I want you to remember…"
          className="min-h-[240px] rounded-2xl p-5 text-base leading-relaxed resize-none border-border/60 focus:ring-2 focus:ring-primary/20 letter-transition"
        />

        {/* Inspiration Section */}
        <div className="bg-card rounded-2xl border border-border/60 overflow-hidden">
          <button
            onClick={() => setInspirationOpen(!inspirationOpen)}
            className="w-full flex items-center justify-between px-5 py-4 text-left letter-transition"
          >
            <span className="font-medium text-sm">
              ✨ Need Some Inspiration?
            </span>
            <ChevronDown
              className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${inspirationOpen ? "rotate-180" : ""
                }`}
            />
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${inspirationOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
              }`}
          >
            <div className="px-5 pb-5 grid gap-3">
              {PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handlePromptClick(prompt)}
                  className="text-left bg-prompt text-prompt-foreground rounded-xl px-4 py-3 text-sm leading-relaxed prompt-card-hover"
                >
                  "{prompt}"
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <Button
            variant="outline"
            onClick={handleSave}
            className="flex-1 rounded-2xl h-12 text-base"
          >
            Save Letter
          </Button>
          <Button
            onClick={handleFinish}
            className="flex-1 rounded-2xl h-12 text-base"
            disabled={!content.trim()}
          >
            Finish
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WritingScreen;
