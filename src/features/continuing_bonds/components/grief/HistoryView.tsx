import { Reflection } from "@/features/continuing_bonds/hooks/useReflections";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

interface HistoryViewProps {
  reflections: Reflection[];
  onClose: () => void;
}

const HistoryView = ({ reflections, onClose }: HistoryViewProps) => (
  <div className="min-h-[100dvh] max-w-md mx-auto bg-background flex flex-col w-full">
    <div className="flex items-center px-4 pt-4 pb-1">
      <button
        onClick={onClose}
        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted active:bg-muted transition-colors text-foreground"
        aria-label={t("close_history")}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      </button>
      <h2 className="flex-1 text-center font-heading text-xl text-foreground pr-10">{t("past_reflections")}</h2>
    </div>

    <div className="flex-1 px-6 py-4 space-y-4 overflow-y-auto">
      {reflections.length === 0 ? (
        <p className="text-center text-muted-foreground font-body mt-20">{t("no_reflections_yet")}<br />{t("your_entries_will_appear_here")}</p>
      ) : (
        reflections.map((r) => (
          <div key={r.id} className="bg-card rounded-lg p-5 shadow-card animate-fade-in">
            <p className="text-xs text-muted-foreground font-body mb-1">
              {format(r.createdAt, "MMMM d, yyyy")}
            </p>
            <p className="text-sm font-body text-accent font-semibold mb-2">{r.connectionType}</p>
            <p className="font-body text-foreground leading-relaxed">{r.primaryResponse}</p>
            {r.deeperResponse && (
              <p className="font-body text-muted-foreground mt-2 text-sm italic">
                {r.deeperResponse}
              </p>
            )}
            {r.bondAction && (
              <p className="font-body text-foreground mt-2 text-sm border-t border-border pt-2">
                {r.bondAction}
              </p>
            )}
          </div>
        ))
      )}
    </div>
  </div>
);

export default HistoryView;
