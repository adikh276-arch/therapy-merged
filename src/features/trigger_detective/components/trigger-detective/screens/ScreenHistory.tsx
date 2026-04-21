import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ScreenLayout from "../ScreenLayout";
import PrimaryButton from "../PrimaryButton";
import type { TriggerEntry } from "../triggerStorage";
import { query } from "@/lib/db";

interface Props {
  onBack: () => void;
}

const ScreenHistory = ({ onBack }: Props) => {
  const { t, i18n } = useTranslation();
  const [entries, setEntries] = useState<TriggerEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      const userId = sessionStorage.getItem("user_id");
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const res = await query(`
          SELECT 
            te.urge_level as "urgeLevel",
            te.location,
            te.activity,
            te.timestamp,
            COALESCE(json_agg(DISTINCT tr.trigger_name) FILTER (WHERE tr.trigger_name IS NOT NULL), '[]') as triggers,
            COALESCE(json_agg(DISTINCT em.emotion_name) FILTER (WHERE em.emotion_name IS NOT NULL), '[]') as emotions
          FROM trigger_entries te
          LEFT JOIN entry_triggers tr ON te.id = tr.entry_id
          LEFT JOIN entry_emotions em ON te.id = em.entry_id
          WHERE te.user_id = $1
          GROUP BY te.id
          ORDER BY te.timestamp DESC
        `, [userId]);

        setEntries(res.rows);
      } catch (error) {
        console.error("Failed to fetch history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <ScreenLayout onBack={onBack} title={t("history_title")}>
      {loading ? (
        <div className="flex-1 flex items-center justify-center p-12">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : entries.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
          <span className="text-5xl mb-4">🔍</span>
          <p className="font-body text-muted-foreground text-sm">{t("history_empty")}</p>
        </div>
      ) : (
        <div className="space-y-4 mb-6">
          {entries.map((entry, i) => (
            <div key={i} className="bg-card rounded-xl shadow-md p-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-heading font-bold text-sm text-foreground">
                  {t("history_entry_num")}{entries.length - i}
                </span>
                <span className="font-body text-xs text-muted-foreground">
                  {new Date(entry.timestamp).toLocaleDateString(i18n.language, {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm font-body">
                <div>
                  <span className="text-muted-foreground text-xs">{t("history_urge_label")}</span>
                  <p className="font-heading font-bold text-foreground">{entry.urgeLevel}/10</p>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">{t("history_location_label")}</span>
                  <p className="text-foreground">{entry.location || "—"}</p>
                </div>
              </div>

              {entry.triggers.length > 0 && (
                <div>
                  <span className="text-muted-foreground text-xs font-body">{t("history_triggers_label")}</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {entry.triggers.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-full bg-secondary/30 text-xs font-body text-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {entry.emotions.length > 0 && (
                <div>
                  <span className="text-muted-foreground text-xs font-body">{t("history_mood_label")}</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {entry.emotions.map((e) => (
                      <span key={e} className="px-2.5 py-1 rounded-full bg-accent text-xs font-body text-foreground">
                        {e}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {entry.activity && (
                <div>
                  <span className="text-muted-foreground text-xs font-body">{t("history_activity_label")}</span>
                  <p className="text-foreground text-sm font-body">{entry.activity}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-auto pb-6">
        <PrimaryButton onClick={() => window.location.href = "/"}>{t("history_new_btn")}</PrimaryButton>
      </div>
    </ScreenLayout>
  );
};

export default ScreenHistory;
