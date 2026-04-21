import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ActivityLayout from "@/components/ActivityLayout";
import BreathingCircle from "@/components/BreathingCircle";
import EmotionChip from "@/components/EmotionChip";
import ActionCategory from "@/components/ActionCategory";
import { Button } from "@/components/ui/button";
import { saveEntry } from "@/lib/pauseHistory";

import { useTranslation } from "react-i18next";

const PauseButton = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const EMOTIONS = useMemo(() => [
    t('emotion_stressed'), 
    t('emotion_anxious'), 
    t('emotion_restless'), 
    t('emotion_bored'), 
    t('emotion_frustrated'), 
    t('emotion_lonely'), 
    t('emotion_calm'), 
    t('emotion_happy')
  ], [t]);

  const ACTION_CATEGORIES = useMemo(() => [
    {
      title: t('cat_mindful'),
      options: [t('opt_deep_breath'), t('opt_5_breaths'), t('opt_close_eyes'), t('opt_sit_quietly'), t('opt_calm_music')],
    },
    {
      title: t('cat_physical'),
      options: [t('opt_stretch'), t('opt_walk'), t('opt_jacks'), t('opt_wash_face'), t('opt_fresh_air')],
    },
    {
      title: t('cat_distraction'),
      options: [t('opt_small_task'), t('opt_organize'), t('opt_read_short'), t('opt_watch_video')],
    },
    {
      title: t('cat_connection'),
      options: [t('opt_call_friend'), t('opt_text_friend'), t('opt_talk_family'), t('opt_check_in')],
    },
    {
      title: t('cat_grounding'),
      options: [t('opt_5_things'), t('opt_focus_breathing'), t('opt_hold_cold'), t('opt_notice_sounds')],
    },
  ], [t]);

  const [screen, setScreen] = useState(1);
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [customEmotion, setCustomEmotion] = useState("");
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const TRANSITION_MS = 700;
  const SCREEN_SWAP_DELAY_MS = 60;

  const goTo = (next: number) => {
    setTransitioning(true);
    setTimeout(() => {
      setScreen(next);
      setTimeout(() => setTransitioning(false), SCREEN_SWAP_DELAY_MS);
    }, TRANSITION_MS);
  };

  const toggleEmotion = (e: string) => {
    setSelectedEmotions((prev) =>
      prev.includes(e) ? prev.filter((x) => x !== e) : [...prev, e]
    );
  };

  const handleConfirmAction = async () => {
    const allEmotions = [...selectedEmotions];
    if (customEmotion.trim()) allEmotions.push(customEmotion.trim());
    try {
      await saveEntry({ emotions: allEmotions, action: selectedAction || "" });
      goTo(5);
    } catch (error) {
      console.error("Failed to save entry:", error);
    }
  };

  const handleReset = () => {
    setTransitioning(true);
    setTimeout(() => {
      setScreen(1);
      setSelectedEmotions([]);
      setCustomEmotion("");
      setSelectedAction(null);
      setTimeout(() => setTransitioning(false), SCREEN_SWAP_DELAY_MS);
    }, TRANSITION_MS);
  };

  const handleBack = () => {
    if (screen === 1) {
      navigate("/");
    } else {
      goTo(screen - 1);
    }
  };

  const allEmotions = [...selectedEmotions, ...(customEmotion.trim() ? [customEmotion.trim()] : [])];

  return (
    <ActivityLayout onBack={handleBack}>
      <div
        className={`flex-1 flex flex-col transition-all duration-700 ease-out ${
          transitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
        }`}
        key={screen}
      >
        {/* Screen 1 — Introduction */}
        {screen === 1 && (
          <>
            <h1 className="text-2xl font-heading font-bold text-foreground mt-4 mb-2">
              {t('start_btn')}
            </h1>
            <p className="text-sm text-secondary font-body mb-4">{t('every_pause_power')}</p>

            <div className="flex-1 space-y-4">
              <p className="text-justified text-foreground font-body leading-relaxed">
                {t('cravings_sneak')}
              </p>
              <p className="text-justified text-foreground font-body leading-relaxed">
                {t('sometimes_best_stop')}
              </p>
              <p className="text-justified text-foreground font-body leading-relaxed">
                {t('quick_pause_control')}
              </p>

              {/* Pause illustration */}
              <div className="flex justify-center py-8">
                <div className="w-32 h-32 rounded-full bg-accent flex items-center justify-center animate-pulse">
                  <div className="flex gap-3">
                    <div className="w-4 h-14 rounded-full bg-primary" />
                    <div className="w-4 h-14 rounded-full bg-primary" />
                  </div>
                </div>
              </div>
            </div>

            <Button size="lg" className="w-full mt-4" onClick={() => goTo(2)}>
              {t('activate_pause_btn')}
            </Button>
          </>
        )}

        {/* Screen 2 — Pause Moment */}
        {screen === 2 && (
          <>
            <h1 className="text-2xl font-heading font-bold text-foreground mt-4 mb-2">
              {t('take_moment')}
            </h1>
            <p className="text-sm text-secondary font-body mb-4">{t('slow_things_together')}</p>

            <div className="flex-1 space-y-4">
              <p className="text-justified text-foreground font-body leading-relaxed">
                {t('close_eyes_seconds')}
              </p>
              <p className="text-justified text-foreground font-body leading-relaxed">
                {t('breathe_in_out')}
              </p>
              <p className="text-justified text-foreground font-body leading-relaxed">
                {t('notice_surroundings')}
              </p>

              <BreathingCircle />
            </div>

            <Button size="lg" className="w-full mt-4" onClick={() => goTo(3)}>
              {t('ready_btn')}
            </Button>
          </>
        )}

        {/* Screen 3 — Emotion Check */}
        {screen === 3 && (
          <>
            <h1 className="text-2xl font-heading font-bold text-foreground mt-4 mb-2">
              {t('how_feeling')}
            </h1>
            <p className="text-sm text-secondary font-body mb-4">{t('no_judgement')}</p>

            <div className="flex-1 space-y-4">
              <p className="text-justified text-foreground font-body leading-relaxed">
                {t('pausing_chance_check')}
              </p>
              <p className="text-justified text-foreground font-body leading-relaxed">
                {t('choose_emotions')}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {EMOTIONS.map((e) => (
                  <EmotionChip
                    key={e}
                    label={e}
                    selected={selectedEmotions.includes(e)}
                    onToggle={() => toggleEmotion(e)}
                  />
                ))}
              </div>

              <div className="pt-2">
                <textarea
                  value={customEmotion}
                  onChange={(e) => setCustomEmotion(e.target.value)}
                  placeholder={t('custom_feeling_placeholder')}
                  className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  rows={2}
                />
              </div>
            </div>

            <Button
              size="lg"
              className="w-full mt-4"
              onClick={() => goTo(4)}
              disabled={selectedEmotions.length === 0 && !customEmotion.trim()}
            >
              {t('next_step_btn')}
            </Button>
          </>
        )}

        {/* Screen 4 — Choose an Action */}
        {screen === 4 && (
          <>
            <h1 className="text-2xl font-heading font-bold text-foreground mt-4 mb-2">
              {t('what_do_next')}
            </h1>
            <p className="text-sm text-secondary font-body mb-4">{t('pick_small_action')}</p>

            <div className="flex-1 space-y-4 overflow-y-auto">
              <p className="text-justified text-foreground font-body leading-relaxed">
                {t('now_paused_choose')}
              </p>

              <div className="space-y-2 pt-2">
                {ACTION_CATEGORIES.map((cat) => (
                  <ActionCategory
                    key={cat.title}
                    title={cat.title}
                    options={cat.options}
                    selectedAction={selectedAction}
                    onSelect={setSelectedAction}
                  />
                ))}
              </div>
            </div>

            <Button
              size="lg"
              className="w-full mt-4"
              onClick={handleConfirmAction}
              disabled={!selectedAction}
            >
              {t('confirm_btn')}
            </Button>
          </>
        )}

        {/* Screen 5 — Positive Reinforcement */}
        {screen === 5 && (
          <>
            <h1 className="text-2xl font-heading font-bold text-foreground mt-4 mb-2">
              {t('nice_pause')}
            </h1>
            <p className="text-sm text-secondary font-body mb-4">{t('doing_amazing')}</p>

            <div className="flex-1 space-y-4">
              <p className="text-justified text-foreground font-body leading-relaxed">
                {t('important_moment_awareness')}
              </p>
              <p className="text-justified text-foreground font-body leading-relaxed">
                {t('easier_stay_control')}
              </p>
              <p className="text-justified text-foreground font-body leading-relaxed">
                {t('small_steps_big_changes')}
              </p>

              {/* Summary Card */}
              <div className="bg-card rounded-2xl p-5 shadow-md space-y-3 mt-4">
                <div>
                  <p className="text-xs text-muted-foreground font-body uppercase tracking-wide mb-1">{t('emotions_logged')}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {allEmotions.map((e) => (
                      <span key={e} className="bg-accent text-accent-foreground text-xs px-3 py-1 rounded-full font-body">
                        {e}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-body uppercase tracking-wide mb-1">{t('action_chosen')}</p>
                  <p className="text-sm font-body text-foreground">{selectedAction}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 mt-4">
              <Button size="lg" className="w-full" onClick={() => navigate("/")}>
                {t('done_btn')}
              </Button>
              <Button size="lg" variant="secondary" className="w-full" onClick={handleReset}>
                {t('try_another_pause')}
              </Button>
              <Button size="lg" variant="outline" className="w-full" onClick={() => navigate("/pause-history")}>
                {t('view_history_btn')}
              </Button>
            </div>
          </>
        )}
      </div>
    </ActivityLayout>
  );
};

export default PauseButton;
