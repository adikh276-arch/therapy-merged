import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Trash2, Mail, Loader2, Sparkles, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getEntries, deleteEntry, formatDate, type LetterEntry } from "../lib/letters";
import { PremiumLayout } from "../../../components/shared/PremiumLayout";
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
  const [error, setError] = useState<string | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<LetterEntry | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    const fetchEntries = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getEntries();
        setEntries(data.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ));
      } catch (error) {
        console.error("Failed to fetch entries:", error);
        setError("Failed to load letters. Please try again.");
      } finally {
        setLoading(false);
      }
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
      <PremiumLayout title="My Letters">
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary opacity-20" />
          <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest">Loading Journey...</p>
        </div>
      </PremiumLayout>
    );
  }

  if (error) {
    return (
      <PremiumLayout title="My Letters">
        <div className="text-center py-20">
          <p className="text-red-500 font-medium">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-3 bg-primary text-primary-foreground font-black rounded-2xl shadow-xl shadow-primary/20"
          >
            Retry
          </motion.button>
        </div>
      </PremiumLayout>
    );
  }

  // Full letter view
  if (selectedEntry) {
    return (
      <PremiumLayout 
        title="Letter Detail" 
        onSecondaryBack={() => setSelectedEntry(null)}
        secondaryBackLabel="Back to list"
      >
        <div className="w-full space-y-10 pb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[3rem] border-2 border-slate-100 p-12 shadow-xl shadow-slate-200/40 space-y-10 text-left relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-10 text-slate-100 pointer-events-none opacity-40">
                <Mail size={120} strokeWidth={1} />
            </div>

            <div className="flex items-center justify-between border-b border-slate-50 pb-8 relative z-10">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest">
                  <Calendar size={14} />
                  {formatDate(selectedEntry.date)}
                </div>
                <p className="text-slate-400 font-bold text-xs">{selectedEntry.time}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, color: "#EF4444" }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setDeleteId(selectedEntry.id)}
                className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-300 flex items-center justify-center hover:bg-rose-50 hover:text-rose-500 transition-all border-2 border-transparent hover:border-rose-100"
              >
                <Trash2 size={20} />
              </motion.button>
            </div>

            <p className="text-slate-700 leading-relaxed whitespace-pre-wrap text-xl font-bold relative z-10">
              {selectedEntry.content}
            </p>

            {selectedEntry.emotionalState && (
              <div className="pt-10 border-t border-slate-50 relative z-10">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">How you felt after writing</p>
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-black shadow-sm">
                  <Heart size={16} fill="currentColor" />
                  {selectedEntry.emotionalState}
                </div>
              </div>
            )}
          </motion.div>
        </div>

        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent className="rounded-[3rem] border-4 border-slate-100 p-12 max-w-md">
            <AlertDialogHeader className="space-y-4">
              <AlertDialogTitle className="text-3xl font-black text-slate-900 leading-tight">Delete Letter?</AlertDialogTitle>
              <AlertDialogDescription className="text-slate-500 text-lg font-bold leading-relaxed">
                This memory will be removed from your journey. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-10 gap-4">
              <AlertDialogCancel className="flex-1 rounded-2xl py-4 border-2 border-slate-100 font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-all">Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="flex-1 rounded-2xl py-4 bg-rose-500 hover:bg-rose-600 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-rose-200 transition-all">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </PremiumLayout>
    );
  }

  return (
    <PremiumLayout 
        title="My Letters" 
        onSecondaryBack={() => navigate("..")}
        secondaryBackLabel="Back to start"
    >
      <div className="w-full space-y-10 pb-12">
        <header className="space-y-4">
          <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.2em]">
            <Sparkles size={16} />
            Your Written Journey
          </div>
          <h1 className="text-4xl font-black text-slate-900 leading-tight tracking-tight">Saved Letters</h1>
          <p className="text-slate-500 text-lg font-bold leading-relaxed max-w-sm">
            Reflect on your growth through your past words.
          </p>
        </header>

        {(!entries || entries.length === 0) ? (
          <div className="text-center py-24 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200 space-y-8 group hover:border-primary/20 transition-all">
            <div className="w-24 h-24 bg-white rounded-[2.5rem] flex items-center justify-center mx-auto text-slate-100 shadow-sm group-hover:scale-110 transition-transform">
                <Mail size={48} strokeWidth={1} />
            </div>
            <div className="space-y-2">
                <p className="text-slate-400 font-black text-xs uppercase tracking-widest">No letters found yet</p>
                <p className="text-slate-300 text-sm font-bold">Your future self is waiting to hear from you.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("../write")}
              className="px-10 py-5 bg-primary text-white font-black text-lg rounded-[2rem] shadow-xl shadow-primary/20 hover:shadow-2xl transition-all"
            >
              Write First Letter
            </motion.button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {entries.map((entry, i) => (
              <motion.button
                key={entry.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.01, y: -4 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setSelectedEntry(entry)}
                className="w-full text-left bg-white rounded-[2.5rem] border-2 border-slate-100 p-10 shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all group flex flex-col gap-6"
              >
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3 text-[10px] font-black text-slate-300 uppercase tracking-widest group-hover:text-primary transition-colors">
                      <Calendar size={14} />
                      {formatDate(entry.date)}
                    </div>
                    {entry.emotionalState && (
                      <div className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-sm">
                        {entry.emotionalState}
                      </div>
                    )}
                </div>
                <p className="text-slate-600 font-bold text-lg leading-relaxed line-clamp-3">
                  {entry.content}
                </p>
                <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest group-hover:text-slate-500 transition-colors">Read Full Letter</span>
                    <Mail size={16} className="text-slate-200 group-hover:text-primary transition-all" />
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </PremiumLayout>
  );
};

export default PastLetters;
