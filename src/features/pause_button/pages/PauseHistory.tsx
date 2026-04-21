import { useNavigate } from "react-router-dom";
import ActivityLayout from "@/components/ActivityLayout";
import { getHistory, PauseEntry } from "@/lib/pauseHistory";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const PauseHistory = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [history, setHistory] = useState<PauseEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      const data = await getHistory();
      setHistory(data);
      setLoading(false);
    };
    fetchHistory();
  }, []);

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleString(i18n.language, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <ActivityLayout onBack={() => navigate("/pause-button")}>
      <h1 className="text-2xl font-heading font-bold text-foreground mt-4 mb-4">
        {t('history_title')}
      </h1>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : history.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground font-body text-sm text-center">
            {t('no_pauses_yet')}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((entry) => (
            <div key={entry.id} className="bg-card rounded-2xl p-5 shadow-md space-y-3">
              <p className="text-xs text-muted-foreground font-body">
                {formatDate(entry.date)}
              </p>
              <div>
                <p className="text-xs text-muted-foreground font-body uppercase tracking-wide mb-1">{t('emotions_label')}</p>
                <div className="flex flex-wrap gap-1.5">
                  {(entry.emotions || []).map((e, i) => (
                    <span key={i} className="bg-accent text-accent-foreground text-xs px-3 py-1 rounded-full font-body">
                      {e}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-body uppercase tracking-wide mb-1">{t('action_label')}</p>
                <p className="text-sm font-body text-foreground">{entry.action}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </ActivityLayout>
  );
};

export default PauseHistory;
