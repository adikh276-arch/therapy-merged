import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Heart, History, Save } from "lucide-react";
import WelcomeScreen from "@/features/memory_box/components/memory-box/WelcomeScreen";
import WhoScreen from "@/features/memory_box/components/memory-box/WhoScreen";
import ExpressionScreen from "@/features/memory_box/components/memory-box/ExpressionScreen";
import MemoryBoxScreen from "@/features/memory_box/components/memory-box/MemoryBoxScreen";
import ClosingScreen from "@/features/memory_box/components/memory-box/ClosingScreen";
import HistorySheet from "@/features/memory_box/components/memory-box/HistorySheet";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { PremiumComplete } from "@/components/shared/PremiumComplete";
import { neon } from "@neondatabase/serverless";
import { toast } from "sonner";

const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;

export interface Memory {
  id: string;
  name: string;
  relation?: string;
  category: string;
  text: string;
  message?: string;
  createdAt: Date;
}

const Index = () => {
  const [screen, setScreen] = useState(0);
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("");
  const [category, setCategory] = useState("");
  const [memoryText, setMemoryText] = useState("");
  const [message, setMessage] = useState("");
  const [memories, setMemories] = useState<Memory[]>([]);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [lastSaved, setLastSaved] = useState<Memory | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchMemories();
  }, []);

  const fetchMemories = async () => {
    const userId = sessionStorage.getItem("user_id");
    if (!userId || !DATABASE_URL) return;

    try {
      const sql = neon(DATABASE_URL);
      const rows = await sql`SELECT memory_data FROM memory_box_entries WHERE user_id = ${userId} ORDER BY created_at DESC`;
      setMemories(rows.map(r => r.memory_data as Memory));
    } catch (error) {
      console.error("Failed to fetch memories:", error);
    }
  };

  const saveMemory = async () => {
    const userId = sessionStorage.getItem("user_id");
    if (!userId || !DATABASE_URL) {
      toast.error("Auth session missing or DB not configured");
      return;
    }

    setIsSaving(true);
    const newMemory: Memory = {
      id: crypto.randomUUID(),
      name,
      relation,
      category,
      text: memoryText,
      message,
      createdAt: new Date(),
    };

    try {
      const sql = neon(DATABASE_URL);
      await sql`INSERT INTO memory_box_entries (user_id, memory_data) VALUES (${userId}, ${newMemory})`;
      toast.success("Memory preserved");
      setMemories(prev => [newMemory, ...prev]);
      setLastSaved(newMemory);
      setScreen(3);
    } catch (error) {
      console.error("Failed to save memory:", error);
      toast.error("Failed to preserve memory");
    } finally {
      setIsSaving(false);
    }
  };

  const resetForNew = () => {
    setName("");
    setRelation("");
    setCategory("");
    setMemoryText("");
    setMessage("");
    setScreen(1);
  };

  const resetAll = () => {
    resetForNew();
    setScreen(0);
  };

  if (screen === 5) {
    return (
      <PremiumComplete
        title="Memory Preserved"
        message={`You've safely placed a memory of ${name || "your loved one"} in your box. These moments of connection are yours to keep, always.`}
        onRestart={resetAll}
      />
    );
  }

  const titles = ["Your Box", "Honoring", "Expressing", "Preserved", "Gentle Care"];

  return (
    <PremiumLayout
      title="Memory Box"
      subtitle={titles[screen]}
      icon={<Heart className="w-6 h-6 text-primary" />}
      onBack={screen > 0 ? () => setScreen(prev => prev - 1) : undefined}
      actions={screen === 0 ? (
        <button onClick={() => setHistoryOpen(true)} className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-600">
          <History size={20} />
        </button>
      ) : undefined}
    >
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-4 min-h-[70vh]" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
        <div className="flex justify-center gap-2 mb-10">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${i <= screen ? "w-8 bg-primary" : "w-2 bg-slate-100"}`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {screen === 0 && (
            <WelcomeScreen
              key="welcome"
              onBegin={() => setScreen(1)}
              onHistory={() => setHistoryOpen(true)}
            />
          )}
          {screen === 1 && (
            <WhoScreen
              key="who"
              name={name}
              setName={setName}
              relation={relation}
              setRelation={setRelation}
              category={category}
              setCategory={setCategory}
              onContinue={() => setScreen(2)}
              onBack={() => setScreen(0)}
            />
          )}
          {screen === 2 && (
            <div className="flex-1 flex flex-col gap-8">
              <ExpressionScreen
                key="expression"
                category={category}
                name={name}
                memoryText={memoryText}
                setMemoryText={setMemoryText}
                message={message}
                setMessage={setMessage}
                onSave={saveMemory}
                onSkip={() => setScreen(3)}
                onBack={() => setScreen(1)}
              />
              <button
                onClick={saveMemory}
                disabled={isSaving}
                className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
              >
                <Save size={20} strokeWidth={3} />
                {isSaving ? "Preserving..." : "Preserve Memory"}
              </button>
            </div>
          )}
          {screen === 3 && (
            <MemoryBoxScreen
              key="memorybox"
              lastSaved={lastSaved}
              onAddAnother={resetForNew}
              onFinish={() => setScreen(5)}
              onBack={() => setScreen(2)}
            />
          )}
          {screen === 4 && (
            <ClosingScreen
              key="closing"
              onExit={() => setScreen(5)}
            />
          )}
        </AnimatePresence>

        <HistorySheet
          open={historyOpen}
          onOpenChange={setHistoryOpen}
          memories={memories}
        />
      </div>
    </PremiumLayout>
  );
};

export default Index;
