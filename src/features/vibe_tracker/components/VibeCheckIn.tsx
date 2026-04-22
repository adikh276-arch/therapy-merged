import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Clock } from "lucide-react";

const vibes = [
  { emoji: "🌷", label: "Calm" },
  { emoji: "🌤", label: "Light" },
  { emoji: "🔥", label: "Driven" },
  { emoji: "🌸", label: "Content" },
  { emoji: "🌊", label: "Steady" },
  { emoji: "🤍", label: "Tender" },
  { emoji: "🌧", label: "Heavy" },
  { emoji: "🌫", label: "Thoughtful" },
  { emoji: "⚡", label: "Restless" },
  { emoji: "💔", label: "Drained" },
];

interface Props {
  onNext: (vibe: string) => void;
  onHistory: () => void;
}

const VibeCheckIn = ({ onNext, onHistory }: Props) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<string | null>(null);
  const [customVibe, setCustomVibe] = useState("");

  const currentVibe = selected || customVibe.trim();

  return (
    <div className="animate-fade-slide-in flex flex-col px-6 pt-12 pb-28 max-w-xl mx-auto">
      {/* History button */}
      <div className="flex justify-end mb-2">
        <button
          onClick={onHistory}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105"
          style={{
            background: "hsl(var(--primary) / 0.1)",
            color: "#1e88e5",
            border: "1.5px solid #1e88e533",
          }}
        >
          <Clock className="w-4 h-4" />
          {t("history")}
        </button>
      </div>

      <h1 className="font-display text-3xl font-bold text-center text-foreground tracking-tight">
        {t("vibeTracker")}
      </h1>

      <p className="font-heading text-lg text-center text-slate-600 mt-6 mb-8">
        {t("howAreYouFeeling")}
      </p>

      {/* Vibe Grid */}
      <div className="grid grid-cols-2 gap-5 justify-items-center max-w-xs mx-auto w-full">
        {vibes.map((vibe) => (
          <button
            key={vibe.label}
            onClick={() => {
              setSelected(vibe.label);
              setCustomVibe("");
            }}
            className={`vibe-circle ${selected === vibe.label ? "selected animate-gentle-pulse" : ""}`}
          >
            <span className="text-2xl leading-none">{vibe.emoji}</span>
            <span className="text-xs mt-1 font-medium text-slate-900">
              {t(`vibes.${vibe.label}`)}
            </span>
          </button>
        ))}
      </div>

      {/* Custom Vibe */}
      <div className="mt-10 w-full mx-auto">
        <p className="font-heading text-sm font-semibold text-slate-600 mb-3">
          {t("describeOwnVibe")}
        </p>
        <input
          type="text"
          className="vibe-input"
          placeholder={t("rightNowIFeel")}
          value={customVibe}
          onChange={(e) => {
            setCustomVibe(e.target.value);
            if (e.target.value.trim()) setSelected(null);
          }}
        />
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-xl p-6 bg-white/70 backdrop-blur-md">
        <button
          className="vibe-button bg-[#1e88e5] text-white"
          disabled={!currentVibe}
          onClick={() => onNext(currentVibe)}
        >
          {t("saveVibe")}
        </button>
      </div>
    </div>
  );
};

export default VibeCheckIn;

