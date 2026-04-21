import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ScreenLayout from "../ScreenLayout";
import PrimaryButton from "../PrimaryButton";
import { TriggerData } from "../TriggerDetective";
import { query } from "@/lib/db";

interface Props {
  data: TriggerData;
  onBack: () => void;
  onViewHistory: () => void;
}

const ScreenPatterns = ({ data, onBack, onViewHistory }: Props) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [aggregatedTriggers, setAggregatedTriggers] = useState<{ name: string; percent: number }[]>([]);
  const [globalEmotions, setGlobalEmotions] = useState<string[]>([]);
  const [globalTriggers, setGlobalTriggers] = useState<string[]>([]);
  const [globalLocations, setGlobalLocations] = useState<string[]>([]);

  useEffect(() => {
    const fetchPatterns = async () => {
      const userId = sessionStorage.getItem("user_id");
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        // Fetch all triggers and their counts
        const triggerRes = await query(`
          SELECT tr.trigger_name as name, COUNT(*)::int as count
          FROM entry_triggers tr
          JOIN trigger_entries te ON tr.entry_id = te.id
          WHERE te.user_id = $1
          GROUP BY tr.trigger_name
        `, [userId]);

        const emotionRes = await query(`
          SELECT em.emotion_name as name, COUNT(*)::int as count
          FROM entry_emotions em
          JOIN trigger_entries te ON em.entry_id = te.id
          WHERE te.user_id = $1
          GROUP BY em.emotion_name
        `, [userId]);

        const locationRes = await query(`
          SELECT location as name, COUNT(*)::int as count
          FROM trigger_entries
          WHERE user_id = $1 AND location IS NOT NULL AND location != ''
          GROUP BY location
        `, [userId]);

        const totalEntriesRes = await query("SELECT COUNT(*)::int FROM trigger_entries WHERE user_id = $1", [userId]);
        const totalEntries = totalEntriesRes.rows[0].count || 1;

        setAggregatedTriggers(triggerRes.rows.map(r => ({
          name: r.name,
          percent: Math.min(100, Math.round((r.count / totalEntries) * 100))
        })));

        setGlobalTriggers(triggerRes.rows.map(r => r.name));
        setGlobalEmotions(emotionRes.rows.map(r => r.name));
        setGlobalLocations(locationRes.rows.map(r => r.name));

      } catch (error) {
        console.error("Failed to fetch patterns:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatterns();
  }, []);

  const insights: { emoji: string; text: string }[] = [];

  // Check across all user history (globalTriggers, globalEmotions, globalLocations)
  // or use the current 'data' if that's what's intended for session insights.
  // We'll use global data for a better "detective" experience.

  if (globalTriggers.includes(t("trigger_option_stress")) || globalEmotions.includes(t("emotion_stressed")) || 
      globalTriggers.includes("Stress") || globalEmotions.includes("Stressed")) {
    insights.push({ emoji: "😰", text: t("insight_stress") });
  }
  if (globalLocations.includes(t("location_alone")) || globalTriggers.includes(t("trigger_option_loneliness")) || 
      globalEmotions.includes(t("emotion_lonely")) || globalLocations.includes("Alone")) {
    insights.push({ emoji: "🧍", text: t("insight_alone") });
  }
  if (globalTriggers.includes(t("trigger_option_boredom")) || globalEmotions.includes(t("emotion_bored")) ||
      globalTriggers.includes("Boredom") || globalEmotions.includes("Bored")) {
    insights.push({ emoji: "😐", text: t("insight_boredom") });
  }
  if (globalTriggers.includes(t("trigger_option_anxiety")) || globalEmotions.includes(t("emotion_anxious")) ||
      globalTriggers.includes("Anxiety") || globalEmotions.includes("Anxious")) {
    insights.push({ emoji: "😟", text: t("insight_anxiety") });
  }
  if (globalTriggers.includes(t("trigger_option_social_pressure")) || globalTriggers.includes("Social pressure")) {
    insights.push({ emoji: "👥", text: t("insight_social") });
  }
  if (globalTriggers.includes(t("trigger_option_routine")) || globalTriggers.includes("Routine / habit")) {
    insights.push({ emoji: "🔄", text: t("insight_routine") });
  }
  if (globalEmotions.includes(t("emotion_frustrated")) || globalEmotions.includes("Frustrated")) {
    insights.push({ emoji: "😤", text: t("insight_frustration") });
  }
  if (globalEmotions.includes(t("emotion_restless")) || globalEmotions.includes("Restless")) {
    insights.push({ emoji: "⚡", text: t("insight_restless") });
  }

  if (insights.length === 0 && !loading) {
    insights.push({ emoji: "🔍", text: t("insight_none") });
  }

  return (
    <ScreenLayout onBack={onBack} title={t("patterns_title")}>
      {loading ? (
        <div className="flex-1 flex items-center justify-center p-12">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <div className="text-justified text-foreground font-body text-[15px] leading-relaxed space-y-2 mb-6">
            <p>{t("patterns_para1")}</p>
            <p>{t("patterns_para2")}</p>
          </div>

          {/* Insights */}
          <div className="space-y-3 mb-6">
            {insights.map((insight, i) => (
              <InsightCard key={i} emoji={insight.emoji} text={insight.text} />
            ))}
          </div>

          {/* Trigger frequency */}
          {aggregatedTriggers.length > 0 && (
            <div className="bg-card rounded-xl shadow-md p-5 mb-4">
              <h3 className="font-heading text-sm font-bold text-foreground mb-3">{t("patterns_freq_title")}</h3>
              <div className="space-y-2">
                {aggregatedTriggers.map((trigger) => (
                  <div key={trigger.name} className="flex items-center gap-3">
                    <span className="text-xs font-body text-muted-foreground w-24 shrink-0 truncate">{trigger.name}</span>
                    <div className="flex-1 h-3 rounded-full bg-accent overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-500"
                        style={{ width: `${trigger.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <div className="mt-auto pb-6 space-y-3">
        <PrimaryButton onClick={onViewHistory}>{t("patterns_progress_btn")}</PrimaryButton>
      </div>
    </ScreenLayout>
  );
};

const InsightCard = ({ emoji, text }: { emoji: string; text: string }) => (
  <div className="flex items-center gap-3 bg-card rounded-lg p-3.5 shadow-sm">
    <span className="text-xl">{emoji}</span>
    <span className="font-body text-sm text-foreground">{text}</span>
  </div>
);

export default ScreenPatterns;
