'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslation, I18nextProvider } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Save, Sparkles, Clock, Check, HelpCircle, Loader2, ArrowLeft, History } from 'lucide-react';
import i18n, { loadLocale } from './i18n';
import { PremiumLayout } from '@/components/shared/PremiumLayout';
import { PremiumComplete } from '@/components/shared/PremiumComplete';
import { apiPath } from '@/lib/apiPath';

const TOTAL_CYCLES = 3;

function CompassionBreakInner() {
  const { t } = useTranslation(undefined, { i18n });
  const [screen, setScreen] = useState(0);

  // Form states
  const [beforeIntensity, setBeforeIntensity] = useState(5);
  const [emotions, setEmotions] = useState<string[]>([]);
  const [customEmotion, setCustomEmotion] = useState("");
  const [kindSentence, setKindSentence] = useState("");
  const [afterIntensity, setAfterIntensity] = useState(5);
  const [isSaving, setIsSaving] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  // Breathing internal state
  const [breathePhase, setBreathePhase] = useState(0);
  const [breatheCycle, setBreatheCycle] = useState(0);
  const [breatheDone, setBreatheDone] = useState(false);
  const [breatheOverlayIdx, setBreatheOverlayIdx] = useState(-1);
  const [breatheScale, setBreatheScale] = useState(0.6);

  // Sync lang param
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const lang = params.get('lang') || 'en';
      loadLocale(lang);
    }
  }, []);

  const fetchHistory = useCallback(async () => {
    setLoadingHistory(true);
    try {
      const res = await fetch(apiPath('/api/compassion-break'));
      if (res.ok) {
        const data = await res.json();
        setHistory(data);
      }
    } catch (err) {
      console.error('Failed to fetch compassion break history:', err);
    } finally {
      setLoadingHistory(false);
    }
  }, []);

  useEffect(() => {
    if (showHistory) {
      fetchHistory();
    }
  }, [showHistory, fetchHistory]);

  const handleSave = async (shouldSave: boolean) => {
    if (!shouldSave) {
      setScreen(6); // directly complete
      return;
    }

    setIsSaving(true);
    const breakData = {
      beforeIntensity,
      afterIntensity,
      emotions,
      kindSentence,
      createdAt: new Date().toISOString()
    };

    try {
      const res = await fetch(apiPath('/api/compassion-break'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(breakData)
      });
      if (res.ok) {
        setScreen(6); // complete
      }
    } catch (error) {
      console.error('Failed to save compassion break:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const resetFlow = () => {
    setScreen(0);
    setBeforeIntensity(5);
    setEmotions([]);
    setCustomEmotion("");
    setKindSentence("");
    setAfterIntensity(5);
    setBreathePhase(0);
    setBreatheCycle(0);
    setBreatheDone(false);
    setBreatheOverlayIdx(-1);
    setBreatheScale(0.6);
  };

  // Emotion toggle helper
  const toggleEmotion = (e: string) => {
    if (emotions.includes(e)) {
      setEmotions(emotions.filter(x => x !== e));
    } else {
      if (emotions.length >= 2) {
        setEmotions([emotions[1], e]);
      } else {
        setEmotions([...emotions, e]);
      }
    }
  };

  const getEmotionsList = (): string[] => {
    const raw = t("emotions_list", { returnObjects: true }) as unknown;
    if (Array.isArray(raw)) return raw as string[];
    return ["Stressed", "Anxious", "Overwhelmed", "Frustrated", "Sad", "Tired", "Lonely", "Insecure"];
  };

  const getBreathePhases = () => [
    { label: t("breathe_in", "Inhale Gently"), duration: 4000, scale: 1 },
    { label: t("hold", "Hold..."), duration: 2000, scale: 1 },
    { label: t("breathe_out", "Exhale Slowly"), duration: 6000, scale: 0.6 },
  ];

  const getBreatheOverlays = () => [
    t("overlay_1", "This is a moment of suffering."),
    t("overlay_2", "Suffering is a part of life. We are not alone."),
  ];

  const EMOTIONS = getEmotionsList();
  const PHASES = getBreathePhases();
  const OVERLAYS = getBreatheOverlays();

  const currentPhase = PHASES[breathePhase];

  // Breathing lifecycle hook
  useEffect(() => {
    if (screen !== 2 || breatheDone) return;
    const phase = PHASES[breathePhase];
    setBreatheScale(phase.scale);
    const timer = setTimeout(() => {
      setBreathePhase((prev) => {
        const next = (prev + 1) % 3;
        if (next === 0) {
          setBreatheCycle((c) => {
            const newC = c + 1;
            if (newC >= TOTAL_CYCLES) {
              setBreatheDone(true);
            }
            return newC;
          });
        }
        return next;
      });
    }, phase.duration);

    return () => clearTimeout(timer);
  }, [screen, breathePhase, breatheDone, PHASES]);

  // Breathing Overlay Index update
  useEffect(() => {
    if (screen !== 2) return;
    if (breatheCycle === 1 && breatheOverlayIdx < 0) setBreatheOverlayIdx(0);
    if (breatheCycle === 2 && breatheOverlayIdx < 1) setBreatheOverlayIdx(1);
  }, [screen, breatheCycle, breatheOverlayIdx]);

  const titles = t("screen_titles", { returnObjects: true }) as string[] || [
    "Pause & Check In", "Name Your Feeling", "Kindness Breathing", "Compassionate Response", "Notice Shift", "Preserve Break"
  ];

  if (screen === 6) {
    return (
      <PremiumComplete
        title={t("app_title", "Self-Compassion Break")}
        message={t("complete_message", "You have successfully taken a mindful moment for self-compassion. Always offer yourself gentleness and care.")}
        onRestart={resetFlow}
      >
        <div className="w-full max-w-sm mx-auto mt-6">
          <button
            onClick={() => setShowHistory(true)}
            className="w-full py-5 rounded-[2rem] bg-white/60 backdrop-blur-md border border-white/60 shadow-inner text-slate-500 font-black text-sm uppercase tracking-widest shadow-xl shadow-slate-200/50 hover:text-primary hover:border-primary/20 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-350 dark:shadow-none transition-all flex items-center justify-center gap-3"
          >
            <Clock size={20} />
            {t("intro.view_past", "View Past Sessions")}
          </button>
        </div>
      </PremiumComplete>
    );
  }

  return (
    <PremiumLayout
      title={t("app_title", "Self-Compassion Break")}
      subtitle={titles[screen]}
      icon={<Heart className="w-6 h-6 text-primary animate-pulse" />}
      onBack={screen > 0 && !showHistory ? () => setScreen(prev => prev - 1) : undefined}
      onReset={screen > 0 && !showHistory ? resetFlow : undefined}
    >
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-4 min-h-[70vh]">
        {!showHistory && (
          <div className="flex justify-center gap-2 mb-10">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i <= screen ? "w-8 bg-primary" : "w-2 bg-slate-150 dark:bg-slate-800"
                }`}
              />
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {showHistory ? (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowHistory(false)}
                  className="p-3 bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 dark:bg-slate-900 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 rounded-2xl border border-white/60 dark:border-slate-800 transition-colors shadow-sm"
                >
                  <ArrowLeft size={16} />
                </button>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                  {t("history.title", "Self-Compassion History")}
                </h2>
              </div>

              {loadingHistory ? (
                <div className="py-20 flex flex-col items-center justify-center gap-3">
                  <Loader2 className="h-8 w-8 animate-spin text-primary opacity-30" />
                  <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                    {t("loading", "Loading History...")}
                  </p>
                </div>
              ) : history.length === 0 ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-14 h-14 bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto text-slate-300">
                    <Heart size={28} />
                  </div>
                  <p className="text-slate-405 font-bold text-sm">
                    {t("history.no_entries", "No past break logs found.")}
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
                  {history.map((e, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-white/60 backdrop-blur-lg border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:bg-slate-900 dark:border-slate-800 shadow-sm space-y-4">
                      <div className="flex justify-between items-center border-b border-slate-50 dark:border-slate-850 pb-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                          {new Date(e.createdAt || e.date).toLocaleDateString()}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400 line-through text-xs">{e.beforeIntensity}</span>
                          <span className="text-primary font-black text-xs">→ {e.afterIntensity}</span>
                        </div>
                      </div>
                      <p className="text-slate-850 dark:text-white font-bold leading-relaxed italic">
                        "{e.kindSentence}"
                      </p>
                      {e.emotions && e.emotions.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {e.emotions.map((emo: string) => (
                            <span key={emo} className="px-2 py-0.5 rounded-lg bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 dark:bg-slate-950 text-[10px] font-bold text-slate-400 border border-white/60 dark:border-slate-850">
                              {emo}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key={screen}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex-1 flex flex-col justify-center"
            >
              {/* SCREEN 0: PAUSE CHECK-IN */}
              {screen === 0 && (
                <div className="flex flex-col items-center text-center py-4">
                  <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">
                    {t("pause_title", "Pause & Check In")}
                  </h1>
                  <p className="text-slate-500 dark:text-slate-400 text-base mb-8 leading-relaxed">
                    {t("pause_description", "Take a moment to check in with yourself. How heavy or intense do things feel right now?")}
                  </p>

                  <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-white/60 dark:border-slate-800 p-8 shadow-xl w-full mb-8">
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-6 uppercase tracking-widest">
                      {t("intensity_label", "Emotional Intensity Level")}
                    </p>

                    <div className="relative mb-6">
                      <input
                        type="range"
                        min={0}
                        max={10}
                        value={beforeIntensity}
                        onChange={(e) => setBeforeIntensity(Number(e.target.value))}
                        className="w-full h-3 rounded-full appearance-none cursor-pointer bg-slate-100 dark:bg-slate-950"
                        style={{
                          background: `linear-gradient(to right, #e2e8f0 0%, var(--color-primary) ${beforeIntensity * 10}%, #f1f5f9 ${beforeIntensity * 10}%)`,
                        }}
                      />
                      <div className="flex justify-between text-[10px] font-black text-slate-350 mt-3">
                        <span>{t("label_calm", "Calm / Clear")}</span>
                        <span>{t("label_intense", "Very Heavy")}</span>
                      </div>
                    </div>

                    <div className="bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 dark:bg-slate-950 rounded-2xl p-4 border border-white/60 dark:border-slate-850">
                      <p className="text-sm text-slate-700 dark:text-slate-300 font-bold">
                        {beforeIntensity <= 3 ? t("feedback_calm", "Things feel peaceful or stable right now.") :
                         beforeIntensity <= 6 ? t("feedback_noticing", "You're noticing some emotional waves. Perfectly natural.") :
                         t("feedback_heavy", "Things feel quite heavy. Let's create a space of deep gentleness.")}
                      </p>
                    </div>
                  </div>

                  <button
                    className="w-full bg-primary text-primary-foreground py-5 rounded-[2rem] font-black text-lg shadow-xl hover:opacity-95 transition-all"
                    onClick={() => setScreen(1)}
                  >
                    {t("continue_button", "Continue")}
                  </button>

                  <button
                    onClick={() => setShowHistory(true)}
                    className="mt-6 inline-flex items-center gap-2 text-slate-450 dark:text-slate-500 hover:text-primary transition-colors text-xs font-black uppercase tracking-widest"
                  >
                    <History size={14} />
                    {t("intro.view_past", "History")}
                  </button>
                </div>
              )}

              {/* SCREEN 1: NAME IT */}
              {screen === 1 && (
                <div className="flex flex-col items-center text-center py-4">
                  <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
                    {t("nameit_title", "Name Your Feeling")}
                  </h1>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-8">
                    {t("nameit_subtitle", "Gently acknowledge what is present. Select up to 2, or type your own.")}
                  </p>

                  <div className="flex flex-wrap justify-center gap-2.5 mb-8 w-full">
                    {EMOTIONS.map((e) => {
                      const isSel = emotions.includes(e);
                      return (
                        <motion.button
                          key={e}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all duration-300 ${
                            isSel
                              ? "bg-primary text-white shadow-lg shadow-primary/10"
                              : "bg-white text-slate-600 border border-white/60 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-350 hover:bg-slate-50 shadow-sm"
                          }`}
                          onClick={() => toggleEmotion(e)}
                        >
                          {e}
                        </motion.button>
                      );
                    })}
                  </div>

                  <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-white/60 dark:border-slate-800 p-6 shadow-xl mb-8">
                    <p className="text-[10px] font-black text-slate-350 dark:text-slate-500 uppercase tracking-widest mb-3">
                      {t("label_custom_emotion", "Or Type Your Emotion")}
                    </p>
                    <input
                      type="text"
                      className="w-full bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 border-none dark:bg-slate-950 dark:text-white rounded-2xl p-4 text-center text-lg font-bold text-slate-800 focus:ring-2 focus:ring-primary/20 transition-all shadow-inner"
                      placeholder={t("placeholder_emotion", "Feeling...")}
                      maxLength={30}
                      value={customEmotion}
                      onChange={(e) => setCustomEmotion(e.target.value)}
                    />
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-3 font-semibold italic">
                      {t("nameit_footer", "Naming your pain takes away its invisible grip.")}
                    </p>
                  </div>

                  <button
                    className="w-full bg-primary text-primary-foreground py-5 rounded-[2rem] font-black text-lg shadow-xl disabled:opacity-30 transition-all"
                    onClick={() => {
                      const finalEmos = customEmotion.trim() ? [customEmotion.trim()] : emotions;
                      if (finalEmos.length > 0) {
                        setEmotions(finalEmos);
                        setScreen(2);
                      }
                    }}
                    disabled={emotions.length === 0 && !customEmotion.trim()}
                  >
                    {t("continue_button", "Continue")}
                  </button>
                </div>
              )}

              {/* SCREEN 2: MINDFUL BREATHING */}
              {screen === 2 && (
                <div className="flex flex-col items-center text-center py-4">
                  <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
                    {t("breathe_title", "Kindness Breathing")}
                  </h1>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-8">
                    {t("breathe_subtitle", "Sync your breath with the expanding circle. Let your body land.")}
                  </p>

                  <div className="relative flex items-center justify-center mb-10 w-[240px] h-[240px] mx-auto">
                    <motion.div
                      className="absolute rounded-full border border-primary/10"
                      style={{
                        width: 220,
                        height: 220,
                        background: "radial-gradient(circle, rgba(79,149,255,0.08) 0%, rgba(79,149,255,0) 70%)",
                      }}
                      animate={{ scale: breatheScale * 1.3 }}
                      transition={{ duration: currentPhase.duration / 1000, ease: "easeInOut" }}
                    />
                    <motion.div
                      className="absolute rounded-full flex items-center justify-center shadow-2xl shadow-primary/20"
                      style={{
                        width: 170,
                        height: 170,
                        background: "linear-gradient(135deg, var(--color-primary), #93c5fd)",
                      }}
                      animate={{ scale: breatheScale }}
                      transition={{ duration: currentPhase.duration / 1000, ease: "easeInOut" }}
                    >
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={currentPhase.label}
                          className="text-base font-black text-white px-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {currentPhase.label}
                        </motion.span>
                      </AnimatePresence>
                    </motion.div>
                  </div>

                  <div className="h-16 mb-4 flex items-center justify-center px-4">
                    <AnimatePresence mode="wait">
                      {breatheOverlayIdx >= 0 && (
                        <motion.p
                          key={OVERLAYS[breatheOverlayIdx]}
                          className="text-base text-slate-700 dark:text-slate-350 font-bold italic"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.8 }}
                        >
                          "{OVERLAYS[breatheOverlayIdx]}"
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <p className="text-[10px] font-black text-slate-350 dark:text-slate-500 uppercase tracking-widest mb-10">
                    {t("breathe_footer", "Breathe in ease, exhale distress.")}
                  </p>

                  <AnimatePresence>
                    {breatheDone && (
                      <motion.button
                        key="btn"
                        className="w-full bg-primary text-primary-foreground py-5 rounded-[2rem] font-black text-lg shadow-xl"
                        onClick={() => setScreen(3)}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {t("continue_button", "Continue")}
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* SCREEN 3: COMPASSIONATE RESPONSE */}
              {screen === 3 && (
                <div className="flex flex-col items-center text-center py-4">
                  <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
                    {t("kindness_title", "Compassionate Response")}
                  </h1>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-8">
                    {t("kindness_subtitle", "What kind words do you need to offer yourself? Speak to yourself as you would to a dear friend.")}
                  </p>

                  <div className="w-full bg-white dark:bg-slate-900 rounded-[2rem] border border-white/60 dark:border-slate-800 p-8 shadow-xl mb-8">
                    <p className="text-[10px] font-black text-slate-350 dark:text-slate-500 uppercase tracking-widest mb-4">
                      {t("label_kind_message", "Your Compassionate Message")}
                    </p>
                    <textarea
                      className="w-full bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 border-none dark:bg-slate-950 dark:text-white rounded-2xl p-6 text-center text-lg font-bold text-slate-800 focus:ring-2 focus:ring-primary/20 transition-all shadow-inner resize-none min-h-[160px]"
                      placeholder={t("placeholder_kind_message", "May I accept myself as I am...")}
                      value={kindSentence}
                      onChange={(e) => setKindSentence(e.target.value)}
                    />
                  </div>

                  <button
                    className="w-full bg-primary text-primary-foreground py-5 rounded-[2rem] font-black text-lg shadow-xl disabled:opacity-30"
                    onClick={() => setScreen(4)}
                    disabled={!kindSentence.trim()}
                  >
                    {t("continue_button", "Continue")}
                  </button>
                </div>
              )}

              {/* SCREEN 4: NOTICE SHIFT */}
              {screen === 4 && (
                <div className="flex flex-col items-center text-center py-4">
                  <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-6">
                    {t("shift_title", "Notice the Shift")}
                  </h1>

                  <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-white/60 dark:border-slate-800 p-8 shadow-xl w-full mb-8">
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-8 uppercase tracking-widest">
                      {t("shift_question", "How intense does the feeling feel now?")}
                    </p>

                    <input
                      type="range"
                      min={0}
                      max={10}
                      value={afterIntensity}
                      onChange={(e) => setAfterIntensity(Number(e.target.value))}
                      className="w-full h-3 rounded-full appearance-none cursor-pointer bg-slate-100 dark:bg-slate-955"
                      style={{
                        background: `linear-gradient(to right, #e2e8f0 0%, var(--color-primary) ${afterIntensity * 10}%, #f1f5f9 ${afterIntensity * 10}%)`,
                      }}
                    />
                    <div className="flex justify-between text-[10px] font-black text-slate-350 mt-4">
                      <span>{t("label_calm", "Calm / Clear")}</span>
                      <span>{t("label_intense", "Very Heavy")}</span>
                    </div>
                  </div>

                  <div className="w-full bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 dark:bg-slate-950 rounded-2xl p-6 border border-white/60 dark:border-slate-850 mb-8">
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">
                      {t("label_notice_shift", "Noticing Shifts")}
                    </p>
                    <p className="text-slate-700 dark:text-slate-300 font-bold italic">
                      {t("shift_footer", "Even a microscopic shift represents incredible mindfulness. Trust the process.")}
                    </p>
                  </div>

                  <button
                    className="w-full bg-primary text-primary-foreground py-5 rounded-[2rem] font-black text-lg shadow-xl"
                    onClick={() => setScreen(5)}
                  >
                    {t("continue_button", "Continue")}
                  </button>
                </div>
              )}

              {/* SCREEN 5: PRESERVE & FINISH */}
              {screen === 5 && (
                <div className="flex flex-col items-center text-center py-4">
                  <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">
                    {t("save_title", "Mindful Break Summary")}
                  </h1>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-8">
                    {t("save_subtitle", "Review your self-compassion check-in. Choose whether to preserve it in your quiet journal.")}
                  </p>

                  <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-white/60 dark:border-slate-800 p-8 shadow-xl w-full mb-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                      <Heart size={80} fill="currentColor" className="text-primary" />
                    </div>

                    <p className="text-[10px] font-black text-slate-350 dark:text-slate-500 uppercase tracking-widest mb-6 text-left">
                      {t("label_your_checkin", "Check-In Summary")}
                    </p>
                    <div className="space-y-4 text-sm text-left relative z-10">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 dark:text-slate-500 font-bold">{t("label_intensity_shift", "Intensity Change")}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400 line-through">{beforeIntensity}</span>
                          <span className="text-primary font-black text-lg">→ {afterIntensity}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 dark:text-slate-500 font-bold">{t("label_feelings", "Emotions")}</span>
                        <span className="text-slate-700 dark:text-slate-300 font-black uppercase tracking-tight">{emotions.join(", ")}</span>
                      </div>
                      <div className="pt-6 border-t border-slate-50 dark:border-slate-850 mt-2">
                        <p className="text-slate-405 dark:text-slate-505 font-bold text-[10px] uppercase tracking-widest mb-2">{t("label_your_kind_words", "Compassionate Mantra")}</p>
                        <p className="text-slate-800 dark:text-slate-200 font-bold text-lg leading-relaxed italic">"{kindSentence}"</p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full space-y-4">
                    <button
                      className="w-full bg-primary text-primary-foreground py-5 rounded-[2rem] font-black text-lg shadow-xl flex items-center justify-center gap-3"
                      onClick={() => handleSave(true)}
                    >
                      <Save size={20} />
                      {t("save_finish_button", "Save & Finish")}
                    </button>
                    <button
                      className="w-full py-5 rounded-[2rem] bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 text-slate-400 border border-slate-150 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-550 font-black text-base hover:bg-slate-100 transition-colors"
                      onClick={() => handleSave(false)}
                    >
                      {t("finish_no_save_button", "Finish Without Saving")}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
}

export default function CompassionBreakPage() {
  return (
    <I18nextProvider i18n={i18n}>
      <CompassionBreakInner />
    </I18nextProvider>
  );
}
