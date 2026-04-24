import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getDoodleHistory, deleteDoodle, groupByDate, type DoodleEntry } from "../lib/doodleHistory";
import { Trash2, X, Share2, Image as ImageIcon, Loader2 } from "lucide-react";
import ShareModal from "../components/ShareModal";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PremiumLayout } from "../../../components/shared/PremiumLayout";

const DoodleHistory = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [entries, setEntries] = useState<DoodleEntry[]>([]);
  const [viewEntry, setViewEntry] = useState<DoodleEntry | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getDoodleHistory()
      .then(setEntries)
      .catch((err) => {
        console.error("Failed to load doodle history:", err);
        setError("Failed to load history. Please try again.");
      })
      .finally(() => setIsLoading(false));
  }, []);

  const grouped = useMemo(() => groupByDate(entries), [entries]);
  const sortedDates = useMemo(
    () => Object.keys(grouped).sort((a, b) => b.localeCompare(a)),
    [grouped]
  );

  const handleDelete = async (id: string) => {
    await deleteDoodle(id);
    const updated = await getDoodleHistory();
    setEntries(updated);
    if (viewEntry?.doodle_id === id) setViewEntry(null);
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + "T00:00:00");
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    if (dateStr === todayStr) return t("today");
    if (dateStr === yesterdayStr) return t("yesterday");

    return d.toLocaleDateString(i18n.language, {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString(i18n.language, {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <PremiumLayout
      title="Doodle Gallery"
      onSecondaryBack={() => navigate("..")}
      secondaryBackLabel="Back to Burst"
    >
      <div className="w-full space-y-10">
        {/* Empty state */}
        {!isLoading && entries.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-100">
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-100 shadow-sm">
              <ImageIcon size={36} />
            </div>
            <p className="text-slate-400 font-black text-xs uppercase tracking-widest mb-8 px-10 leading-relaxed">{t("no_doodles")}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("..")}
              className="px-10 py-5 bg-primary text-primary-foreground font-black rounded-2xl shadow-xl shadow-primary/20"
            >
              Start Doodling
            </motion.button>
          </div>
        )}

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-primary opacity-20" />
            <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest">Loading gallery...</p>
          </div>
        )}

        {error && (
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
        )}

        {/* Grouped entries */}
        <div className="space-y-12">
          {sortedDates.map((date) => (
            <div key={date} className="space-y-6">
              <div className="flex items-center gap-4">
                <h2 className="text-sm font-black text-slate-800 tracking-tight">
                  {formatDate(date)}
                </h2>
                <div className="h-0.5 flex-1 bg-slate-100 rounded-full" />
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                  {grouped[date].length} {grouped[date].length === 1 ? t("doodle") : t("doodles")}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {grouped[date].map((entry, i) => (
                  <motion.div
                    key={entry.doodle_id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative aspect-square bg-white rounded-[2.5rem] border-2 border-slate-100 p-3 shadow-sm cursor-pointer overflow-hidden hover:border-primary/20 transition-all"
                    onClick={() => setViewEntry(entry)}
                  >
                    <img
                      src={entry.dataUrl}
                      alt="Doodle"
                      className="w-full h-full object-contain rounded-[2rem]"
                    />
                    <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-[10px] font-black text-white uppercase tracking-widest bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
                        {formatTime(entry.timestamp)}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {viewEntry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setViewEntry(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-[3rem] w-full max-w-lg overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-8 border-b border-slate-50">
                <div className="text-left">
                  <p className="text-lg font-black text-slate-900 tracking-tight">
                    {new Date(viewEntry.timestamp).toLocaleDateString(i18n.language, {
                      weekday: "long",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                    {formatTime(viewEntry.timestamp)}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setViewEntry(null)}
                  className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X size={24} />
                </motion.button>
              </div>

              <div className="p-6 bg-slate-50">
                <div className="bg-white rounded-[2.5rem] p-4 shadow-inner border-2 border-white">
                  <img
                    src={viewEntry.dataUrl}
                    alt="Doodle"
                    className="w-full aspect-square object-contain"
                  />
                </div>
              </div>

              <div className="p-8 flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsShareModalOpen(true)}
                  className="flex-1 py-4 bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-primary/20"
                >
                  <Share2 size={16} />
                  {t("share_doodle")}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDelete(viewEntry.doodle_id)}
                  className="flex-1 py-4 bg-rose-50 text-rose-500 font-black text-xs uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 hover:bg-rose-100 transition-all"
                >
                  <Trash2 size={16} />
                  {t("delete_doodle")}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        originalDataUrl={viewEntry?.dataUrl || ""}
      />
    </PremiumLayout>
  );
};

export default DoodleHistory;
