import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getDoodleHistory, deleteDoodle, groupByDate, type DoodleEntry } from "../lib/doodleHistory";
import { ArrowLeft, Trash2, X, Calendar, Share2, Image as ImageIcon, Home } from "lucide-react";
import ShareModal from "../components/ShareModal";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const DoodleHistory = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [entries, setEntries] = useState<DoodleEntry[]>([]);
  const [viewEntry, setViewEntry] = useState<DoodleEntry | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  useEffect(() => {
    getDoodleHistory().then(setEntries).catch(console.error);
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
      year: "numeric",
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
    <div className="flex flex-col items-center py-6 pb-24">
      <div className="w-full max-w-lg space-y-8">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="text-left">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-1">{t("history_title")}</h1>
            <p className="text-slate-500 text-sm">
              {entries.length} {entries.length === 1 ? t("doodle") : t("doodles")} {t("saved")}
            </p>
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

        {/* Empty state */}
        {entries.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
            <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center mx-auto mb-4 text-slate-200 shadow-sm">
                <ImageIcon size={32} />
            </div>
            <p className="text-slate-400 font-bold mb-6">{t("no_doodles")}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("..")}
              className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-2xl shadow-lg shadow-primary/20"
            >
              Start Doodling
            </motion.button>
          </div>
        )}

        {/* Grouped entries */}
        <div className="space-y-10">
          {sortedDates.map((date) => (
            <div key={date} className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-px flex-1 bg-slate-100" />
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">
                  {formatDate(date)}
                </h2>
                <div className="h-px flex-1 bg-slate-100" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {grouped[date].map((entry, i) => (
                  <motion.div
                    key={entry.doodle_id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative aspect-square bg-white rounded-[2rem] border-2 border-slate-100 p-2 shadow-sm cursor-pointer overflow-hidden"
                    onClick={() => setViewEntry(entry)}
                  >
                    <img
                      src={entry.dataUrl}
                      alt="Doodle"
                      className="w-full h-full object-contain rounded-[1.5rem]"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">
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
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setViewEntry(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-[3rem] w-full max-w-lg overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-50">
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-900">
                    {new Date(viewEntry.timestamp).toLocaleDateString(i18n.language, {
                      weekday: "long",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    {formatTime(viewEntry.timestamp)}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setViewEntry(null)}
                  className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X size={20} />
                </motion.button>
              </div>

              <div className="p-4 bg-slate-50">
                <img
                    src={viewEntry.dataUrl}
                    alt="Doodle"
                    className="w-full aspect-square object-contain bg-white rounded-[2rem] shadow-inner"
                />
              </div>

              <div className="p-6 flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsShareModalOpen(true)}
                  className="flex-1 py-4 bg-primary text-primary-foreground font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                >
                  <Share2 size={18} />
                  {t("share_doodle")}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDelete(viewEntry.doodle_id)}
                  className="flex-1 py-4 bg-rose-50 text-rose-500 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-rose-100 transition-all"
                >
                  <Trash2 size={18} />
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
    </div>
  );
};

export default DoodleHistory;

