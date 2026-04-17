"use client";
import { useState } from "react";

const moods = [
  { emoji: "😊", label: "Great" },
  { emoji: "😐", label: "Okay" },
  { emoji: "😣", label: "Stressed" },
  { emoji: "😫", label: "Overwhelmed" },
];

const MoodSelector = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="wellness-card">
      <h3 className="text-base font-semibold mb-4 text-foreground">
        How are you feeling today?
      </h3>
      <div className="flex justify-around">
        {moods.map((mood, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all duration-200 ${
              selected === i
                ? "bg-accent scale-110"
                : "hover:bg-muted"
            }`}
          >
            <span className="text-3xl">{mood.emoji}</span>
            <span className="text-xs text-muted-foreground font-medium">
              {mood.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;
