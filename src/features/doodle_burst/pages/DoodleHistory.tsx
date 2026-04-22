import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getDoodleHistory, deleteDoodle, groupByDate, type DoodleEntry } from "../lib/doodleHistory";
import { ArrowLeft, Trash2, X, Calendar, Share2 } from "lucide-react";
import ShareModal from "../components/ShareModal";
import { shareDoodle } from "../lib/share";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../components/LanguageSelector";

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
    <div className="min-h-screen bg-playful p-4">
      <LanguageSelector />
      <div className="w-full mx-auto py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(".")}
            className="p-2 rounded-xl bg-card shadow-soft"
          >
            <ArrowLeft size={20} className="text-foreground" />
          </motion.button>
          <div>
            <h1 className="text-2xl font-black text-foreground">{t("history_title")} 📒</h1>
            <p className="text-sm text-muted-foreground">
              {entries.length} {entries.length === 1 ? t("doodle") : t("doodles")} {t("saved")}
            </p>
          </div>
        </div>

        {/* Empty state */}
        {entries.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 text-center shadow-soft"
          >
            <Calendar size={48} className="text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-lg font-bold text-foreground mb-2">{t("no_doodles")}</p>
            <p className="text-muted-foreground text-center">
              {t("history_empty_desc")}
            </p>
          </motion.div>
        )}

        {/* Grouped entries */}
        <div className="flex flex-col gap-6">
          {sortedDates.map((date) => (
            <motion.div
              key={date}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Calendar size={16} className="text-primary" />
                <h2 className="text-base font-bold text-foreground">
                  {formatDate(date)}
                </h2>
                <span className="text-xs text-muted-foreground font-semibold">
                  ({grouped[date].length})
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {grouped[date].map((entry) => (
                  <motion.div
                    key={entry.doodle_id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative bg-card rounded-2xl overflow-hidden shadow-soft border border-border cursor-pointer group"
                    onClick={() => setViewEntry(entry)}
                  >
                    <img
                      src={entry.dataUrl}
                      alt="Doodle"
                      className="w-full aspect-square object-contain bg-card"
                    />
                    <div className="p-2 text-center">
                      <span className="text-xs font-semibold text-muted-foreground">
                        {formatTime(entry.timestamp)}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(entry.doodle_id);
                      }}
                      className="absolute top-2 right-2 p-1.5 rounded-xl bg-destructive/80 text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={14} />
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
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
            className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setViewEntry(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-3xl shadow-soft w-full w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4">
                <div>
                  <p className="font-bold text-foreground text-sm">
                    {new Date(viewEntry.timestamp).toLocaleDateString(i18n.language, {
                      weekday: "long",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatTime(viewEntry.timestamp)}
                  </p>
                </div>
                <button
                  onClick={() => setViewEntry(null)}
                  className="p-2 rounded-xl bg-muted"
                >
                  <X size={18} className="text-foreground" />
                </button>
              </div>
              <img
                src={viewEntry.dataUrl}
                alt="Doodle"
                className="w-full bg-card"
              />
              <div className="p-4 flex justify-center gap-3">
                <button
                  onClick={() => setIsShareModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-sm"
                >
                  <Share2 size={16} />
                  {t("share_doodle")}
                </button>
                <button
                  onClick={() => handleDelete(viewEntry.doodle_id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-destructive text-destructive-foreground font-semibold text-sm"
                >
                  <Trash2 size={16} />
                  {t("delete_doodle")}
                </button>
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

