import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { CheckInEntry } from "./WindowApp";

function formatTime(d: Date) {
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const hours = diff / (1000 * 60 * 60);
  const timeStr = d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  if (hours < 24) return `Today at ${timeStr}`;
  if (hours < 48) return `Yesterday at ${timeStr}`;
  return `${d.toLocaleDateString([], { month: "short", day: "numeric" })} at ${timeStr}`;
}

interface Props {
  entries: CheckInEntry[];
  onClose: () => void;
}

export default function HistoryModal({ entries, onClose }: Props) {
  const { t } = useTranslation();

  const ZONE_LABELS: Record<string, { emoji: string; label: string }> = {
    hyper: { emoji: "🔴", label: t("screens.checkin.zones.hyper.label") },
    safe: { emoji: "🟢", label: t("screens.checkin.zones.safe.label") },
    hypo: { emoji: "🔵", label: t("screens.checkin.zones.hypo.label") },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" />
      <div
        className="relative bg-card rounded-3xl p-6 w-full max-w-[440px] max-h-[80vh] overflow-y-auto fade-in"
        style={{ boxShadow: "var(--shadow-lift)" }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label={t("check_in_history")}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-xl font-semibold text-foreground">📋 {t("history.title")}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-muted transition-colors" aria-label={t("close")}>
            <X size={20} />
          </button>
        </div>
        {entries.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">{t("history.empty")}</p>
        ) : (
          <div className="space-y-3">
            {entries.map((entry, i) => {
              const zone = ZONE_LABELS[entry.zone!];
              return (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                  <span className="text-lg">{zone.emoji}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{zone.label}</p>
                    <p className="text-xs text-muted-foreground">{formatTime(new Date(entry.timestamp))}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
