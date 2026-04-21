import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getEntries, saveEntry } from "@/lib/letters";

const EMOTIONS = [
  "I feel lighter than before.",
  "I feel emotional but supported.",
  "I feel neutral, but I'm glad I wrote.",
  "I still feel heavy, but this helped a little.",
  "I'm not sure what I feel yet.",
];

const EmotionalCheckIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const entryId = (location.state as { entryId?: string })?.entryId;
  const [selected, setSelected] = useState<string | null>(null);

  const handleSave = async () => {
    if (!selected || !entryId) return;
    const entries = await getEntries();
    const entry = entries.find((e) => e.id === entryId);
    if (entry) {
      entry.emotionalState = selected;
      entry.updatedAt = new Date().toISOString();
      await saveEntry(entry);
    }
    navigate("/complete");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 fade-enter">
      <div className="max-w-md w-full space-y-8">
        <h1 className="text-2xl font-heading text-center leading-snug">
          After writing this letter, how do you feel?
        </h1>

        <div className="space-y-3">
          {EMOTIONS.map((emotion) => (
            <button
              key={emotion}
              onClick={() => setSelected(emotion)}
              className={`w-full text-left rounded-2xl px-5 py-4 text-sm leading-relaxed border letter-transition ${selected === emotion
                  ? "border-primary bg-accent shadow-sm"
                  : "border-border/60 bg-card hover:border-primary/30"
                }`}
            >
              {emotion}
            </button>
          ))}
        </div>

        <Button
          onClick={handleSave}
          disabled={!selected}
          className="w-full rounded-2xl h-12 text-base"
        >
          Save & Continue
        </Button>
      </div>
    </div>
  );
};

export default EmotionalCheckIn;
