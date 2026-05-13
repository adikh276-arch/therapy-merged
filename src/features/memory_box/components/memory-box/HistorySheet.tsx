import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/features/memory_box/components/ui/sheet";
import type { Memory } from "@/features/memory_box/pages/Index";
import { useTranslation } from "react-i18next";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  memories: Memory[];
}

const HistorySheet = ({ open, onOpenChange, memories }: Props) => (
  <Sheet open={open} onOpenChange={onOpenChange}>
    <SheetContent side="bottom" className="bg-background rounded-t-3xl max-h-[80vh] overflow-y-auto">
      <SheetHeader className="text-center pb-4">
        <SheetTitle className="font-heading text-xl text-foreground">{t("past_entries")}</SheetTitle>
      </SheetHeader>

      {memories.length === 0 ? (
        <p className="text-center text-muted-foreground font-body text-sm py-8">{t("no_memories_saved_yet")}</p>
      ) : (
        <div className="space-y-3 pb-6">
          {memories.map((m) => (
            <div key={m.id} className="bg-card border border-border rounded-xl p-4 space-y-2 text-left">
              <p className="font-heading text-base text-foreground">{m.name}</p>
              <p className="font-body text-xs text-accent">{m.category}</p>
              <p className="font-body text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {m.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </SheetContent>
  </Sheet>
);

export default HistorySheet;
