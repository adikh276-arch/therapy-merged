import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronRight } from "lucide-react";
import { Tip } from "@/data/tips";

const bgMap: Record<string, string> = {
  "pastel-pink": "bg-pastel-pink",
  "pastel-purple": "bg-pastel-purple",
  "pastel-blue": "bg-pastel-blue",
  "pastel-green": "bg-pastel-green",
  "pastel-beige": "bg-pastel-beige",
};

const iconColorMap: Record<string, string> = {
  "pastel-pink": "text-pink-500",
  "pastel-purple": "text-purple-500",
  "pastel-blue": "text-blue-500",
  "pastel-green": "text-emerald-500",
  "pastel-beige": "text-amber-500",
};

// Map tip id -> translation key prefix
const TIP_KEY_MAP: Record<string, string> = {
  "enjoyable-activities": "t1",
  "challenge-negative-thoughts": "t2",
  "set-realistic-goals": "t3",
  "limit-stressors": "t4",
  "practice-self-care": "t5",
};

export default function TipCard({ tip, index }: { tip: Tip; index: number }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const Icon = tip.icon;
  const k = TIP_KEY_MAP[tip.id] ?? "";

  return (
    <button
      onClick={() => navigate(`/tip/${tip.id}`)}
      className="flex w-full items-center gap-4 rounded-lg bg-card p-4 shadow-card transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5 text-left animate-fade-in-up"
      style={{ animationDelay: `${index * 80}ms`, opacity: 0 }}
    >
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${bgMap[tip.iconBg]}`}
      >
        <Icon className={`h-5 w-5 ${iconColorMap[tip.iconBg]}`} />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-sm text-foreground">
          {k ? t(`${k}_title`) : tip.title}
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
          {k ? t(`${k}_preview`) : tip.preview}
        </p>
      </div>
      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
    </button>
  );
}
