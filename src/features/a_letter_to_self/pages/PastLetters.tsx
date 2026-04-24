import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, ChevronLeft, Trash2, Loader2, Mail, ArrowLeft, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getEntries, deleteEntry, formatDate, type LetterEntry } from "../lib/letters";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";

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
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Full letter view
  if (selectedEntry) {
    return (
      <div className="flex flex-col items-center py-6 pb-24">
        <div className="w-full max-w-lg space-y-6">
          <motion.button
            whileHover={{ x: -4 }}
            onClick={() => setSelectedEntry(null)}
            className="flex items-center gap-2 text-slate-500 font-bold text-sm hover:text-primary transition-colors"
          >
            <ArrowLeft size={18} /> Back to Letters
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2.5rem] border-2 border-slate-100 p-8 shadow-sm space-y-6 text-left"
          >
            <div className="flex items-center justify-between border-b border-slate-50 pb-4">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                <Calendar size={14} />
                {formatDate(selectedEntry.date)} · {selectedEntry.time}
              </div>
              <motion.button
                whileHover={{ scale: 1.1, color: "#EF4444" }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setDeleteId(selectedEntry.id)}
                className="text-slate-300 transition-colors"
              >
                <Trash2 size={18} />
              </motion.button>
            </div>

            <p className="text-slate-700 leading-relaxed whitespace-pre-wrap text-lg">
              {selectedEntry.content}
            </p>

            {selectedEntry.emotionalState && (
              <div className="pt-6 border-t border-slate-50">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Feeling After Writing</p>
                <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold">
                  {selectedEntry.emotionalState}
                </span>
              </div>
            )}
          </motion.div>
        </div>

        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent className="rounded-[2.5rem] border-2 border-slate-100 p-8">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl font-extrabold text-slate-900">Delete this letter?</AlertDialogTitle>
              <AlertDialogDescription className="text-slate-500">
                This action cannot be undone. This letter will be permanently removed from your journey.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-6">
              <AlertDialogCancel className="rounded-2xl border-2 border-slate-100 font-bold">Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold">
                Delete Letter
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-6 pb-24">
      <div className="w-full max-w-lg space-y-8">
        <header className="flex items-center justify-between">
          <div className="text-left">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-1">My Letters</h1>
            <p className="text-slate-500 text-sm">Your journey in words</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("..")}
            className="p-3 bg-slate-100 text-slate-600 rounded-2xl hover:bg-slate-200 transition-all shadow-sm"
          >
            <Home size={20} />
          </motion.button>
        </header>

        {(!entries || entries.length === 0) ? (
          <div className="text-center py-20 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
            <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center mx-auto mb-4 text-slate-200 shadow-sm">
                <Mail size={32} />
            </div>
            <p className="text-slate-400 font-bold mb-6">No letters found yet.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("../write")}
              className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-2xl shadow-lg shadow-primary/20"
            >
              Write Your First Letter
            </motion.button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {entries.map((entry, i) => (
              <motion.button
                key={entry.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedEntry(entry)}
                className="w-full text-left bg-white rounded-[2rem] border-2 border-slate-100 p-6 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  <Calendar size={14} />
                  {formatDate(entry.date)}
                </div>
                <p className="text-slate-700 font-medium leading-relaxed line-clamp-3 mb-4">
                  {entry.content}
                </p>
                {entry.emotionalState && (
                  <div className="inline-block bg-primary/5 text-primary px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest">
                    {entry.emotionalState}
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        )}

        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent className="rounded-[2.5rem] border-2 border-slate-100 p-8">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl font-extrabold text-slate-900">Delete this letter?</AlertDialogTitle>
              <AlertDialogDescription className="text-slate-500">
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-6">
              <AlertDialogCancel className="rounded-2xl border-2 border-slate-100 font-bold">Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold">
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
