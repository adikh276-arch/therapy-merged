import { useState } from "react";

const LOCATIONS = ["Home", "Work", "Outside", "Social", "Car"];
const TRIGGERS = ["Stress", "Boredom", "After meal", "With coffee", "Social", "Habit"];
const MOODS = ["😊", "😐", "😔", "😤", "😰"];

interface DetailExpanderProps {
  onUpdate: (details: { location?: string; trigger?: string; mood?: string; notes?: string }) => void;
}

export default function DetailExpander({ onUpdate }: DetailExpanderProps) {
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState<string>();
  const [trigger, setTrigger] = useState<string>();
  const [mood, setMood] = useState<string>();
  const [notes, setNotes] = useState("");

  const handleChange = (updates: Partial<{ location: string; trigger: string; mood: string; notes: string }>) => {
    const next = { location, trigger, mood, notes, ...updates };
    if (updates.location !== undefined) setLocation(updates.location);
    if (updates.trigger !== undefined) setTrigger(updates.trigger);
    if (updates.mood !== undefined) setMood(updates.mood);
    if (updates.notes !== undefined) setNotes(updates.notes);
    onUpdate(next);
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="text-xs text-muted-foreground hover:text-primary transition-colors"
      >
        + Add detail
      </button>
    );
  }

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
      {/* Location */}
      <div>
        <p className="text-xs text-muted-foreground mb-1.5">Where</p>
        <div className="flex flex-wrap gap-1.5">
          {LOCATIONS.map((l) => (
            <button
              key={l}
              onClick={() => handleChange({ location: location === l ? undefined : l })}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                location === l ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-accent"
              }`}
            >{l}</button>
          ))}
        </div>
      </div>

      {/* Trigger */}
      <div>
        <p className="text-xs text-muted-foreground mb-1.5">What triggered it</p>
        <div className="flex flex-wrap gap-1.5">
          {TRIGGERS.map((t) => (
            <button
              key={t}
              onClick={() => handleChange({ trigger: trigger === t ? undefined : t })}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                trigger === t ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-accent"
              }`}
            >{t}</button>
          ))}
        </div>
      </div>

      {/* Mood */}
      <div>
        <p className="text-xs text-muted-foreground mb-1.5">Mood</p>
        <div className="flex gap-2">
          {MOODS.map((m) => (
            <button
              key={m}
              onClick={() => handleChange({ mood: mood === m ? undefined : m })}
              className={`text-2xl p-1.5 rounded-lg transition-all ${
                mood === m ? "bg-primary/10 scale-110" : "hover:bg-secondary"
              }`}
            >{m}</button>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div>
        <input
          placeholder="Quick note..."
          value={notes}
          onChange={(e) => handleChange({ notes: e.target.value })}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
    </div>
  );
}
