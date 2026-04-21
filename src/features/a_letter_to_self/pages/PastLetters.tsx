import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, ChevronLeft, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getEntries, deleteEntry, formatDate, type LetterEntry } from "@/lib/letters";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const PastLetters = () => {
  const navigate = useNavigate();
  const [entries, setEntries] = useState<LetterEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState<LetterEntry | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    const fetchEntries = async () => {
      setLoading(true);
      const data = await getEntries();
      setEntries(data.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ));
      setLoading(false);
    };
    fetchEntries();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteEntry(deleteId);
    setEntries((prev) => prev.filter((e) => e.id !== deleteId));
    if (selectedEntry?.id === deleteId) setSelectedEntry(null);
    setDeleteId(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  // Full letter view
  if (selectedEntry) {
    return (
      <div className="min-h-screen px-4 py-8 fade-enter">
        <div className="max-w-lg mx-auto space-y-6">
          <button
            onClick={() => setSelectedEntry(null)}
            className="flex items-center gap-1.5 text-muted-foreground text-sm hover:text-foreground letter-transition"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Letters
          </button>

          <div className="bg-card rounded-2xl border border-border/60 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(selectedEntry.date)} · {selectedEntry.time}
              </div>
              <button
                onClick={() => setDeleteId(selectedEntry.id)}
                className="text-destructive/60 hover:text-destructive letter-transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <p className="text-justified leading-relaxed whitespace-pre-wrap">
              {selectedEntry.content}
            </p>

            {selectedEntry.emotionalState && (
              <div className="pt-2 border-t border-border/40">
                <p className="text-sm text-muted-foreground">
                  Feeling: {selectedEntry.emotionalState}
                </p>
              </div>
            )}
          </div>
        </div>

        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent className="rounded-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="font-heading">Delete this letter?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This letter will be permanently removed.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="rounded-2xl">Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="rounded-2xl bg-destructive text-destructive-foreground">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 fade-enter">
      <div className="max-w-lg mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-heading">My Letters</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/")}
            className="rounded-2xl"
          >
            Home
          </Button>
        </div>

        {entries.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <p className="text-muted-foreground">No letters yet.</p>
            <Button
              onClick={() => navigate("/write")}
              className="rounded-2xl"
            >
              Write Your First Letter
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {entries.map((entry) => (
              <button
                key={entry.id}
                onClick={() => setSelectedEntry(entry)}
                className="w-full text-left bg-card rounded-2xl border border-border/60 p-5 space-y-2 prompt-card-hover"
              >
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(entry.date)}
                </div>
                <p className="text-sm leading-relaxed line-clamp-3">
                  {entry.content.slice(0, 120)}
                  {entry.content.length > 120 ? "…" : ""}
                </p>
                {entry.emotionalState && (
                  <p className="text-xs text-muted-foreground">
                    {entry.emotionalState}
                  </p>
                )}
              </button>
            ))}
          </div>
        )}

        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent className="rounded-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="font-heading">Delete this letter?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="rounded-2xl">Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="rounded-2xl bg-destructive text-destructive-foreground">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default PastLetters;
