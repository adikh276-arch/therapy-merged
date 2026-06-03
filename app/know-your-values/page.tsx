'use client';
import { parseDbDate } from '@/lib/dateUtils';

import { useState, useEffect, useCallback } from 'react';
import { useTranslation, I18nextProvider } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Brain, ArrowRight, ArrowLeft, RefreshCw, History, Calendar, Check, Target, Heart, Loader2 } from 'lucide-react';
import i18n, { loadLocale } from './i18n';
import { PremiumLayout } from '@/components/shared/PremiumLayout';
import { PremiumIntro } from '@/components/shared/PremiumIntro';
import { PremiumComplete } from '@/components/shared/PremiumComplete';
import { apiPath } from '@/lib/apiPath';

interface ValueItem {
  emoji: string;
  name: string;
}

const ALL_VALUES: ValueItem[] = [
  { emoji: "❤️", name: "Family" },
  { emoji: "🌿", name: "Health" },
  { emoji: "🎨", name: "Creativity" },
  { emoji: "📚", name: "Learning" },
  { emoji: "🌍", name: "Adventure" },
  { emoji: "🕊️", name: "Freedom" },
  { emoji: "🌱", name: "Growth" },
  { emoji: "🤝", name: "Kindness" },
  { emoji: "⚖️", name: "Balance" },
  { emoji: "✨", name: "Honesty" },
];

interface Reflection {
  id: string;
  date: string;
  valueEmoji: string;
  valueName: string;
  reflection: string;
  action: string;
}

function KnowYourValuesInner() {
  const { t } = useTranslation(undefined, { i18n });
  const [screen, setScreen] = useState<'intro' | 'choose' | 'reflect' | 'action' | 'summary' | 'history'>('intro');
  
  const [selectedValues, setSelectedValues] = useState<ValueItem[]>([]);
  const [chosenValue, setChosenValue] = useState<ValueItem | null>(null);
  const [reflectionText, setReflectionText] = useState('');
  const [actionText, setActionText] = useState('');
  
  const [historyList, setHistoryList] = useState<Reflection[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [savedReflection, setSavedReflection] = useState<Reflection | null>(null);

  // Sync lang URL parameter
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const lang = params.get('lang') || 'en';
      loadLocale(lang);
    }
  }, []);

  const fetchHistory = useCallback(async () => {
    setHistoryLoading(true);
    try {
      const res = await fetch(apiPath('/api/know-your-values'));
      if (res.ok) {
        const data = await res.json();
        setHistoryList(data);
      }
    } catch (err) {
      console.error('Failed to load reflections history:', err);
    } finally {
      setHistoryLoading(false);
    }
  }, []);

  const handleToggleValue = (v: ValueItem) => {
    setSelectedValues((prev) =>
      prev.find((p) => p.name === v.name)
        ? prev.filter((p) => p.name !== v.name)
        : [...prev, v]
    );
  };

  const handleSave = async () => {
    if (!chosenValue || !reflectionText.trim() || !actionText.trim()) return;
    setSaveLoading(true);

    const payload = {
      valueEmoji: chosenValue.emoji,
      valueName: chosenValue.name,
      reflection: reflectionText,
      action: actionText,
    };

    try {
      const res = await fetch(apiPath('/api/know-your-values'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        const full: Reflection = {
          id: data.id,
          date: data.date,
          valueEmoji: chosenValue.emoji,
          valueName: chosenValue.name,
          reflection: reflectionText,
          action: actionText,
        };
        setSavedReflection(full);
        setScreen('summary');
      }
    } catch (err) {
      console.error('Failed to save reflection:', err);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleResetActivity = () => {
    setSelectedValues([]);
    setChosenValue(null);
    setReflectionText('');
    setActionText('');
    setSavedReflection(null);
    setScreen('intro');
  };

  const handleViewHistory = () => {
    fetchHistory();
    setScreen('history');
  };

  const getTitle = () => {
    switch (screen) {
      case 'history':
        return t('screens.history.title', 'History');
      case 'summary':
        return t('screens.summary.title', 'Summary');
      default:
        return t('app_title', 'Values Reflection');
    }
  };

  return (
    <PremiumLayout
      title={getTitle()}
      icon={<Brain className="w-6 h-6 text-primary" />}
      onBack={screen !== 'intro' ? handleResetActivity : undefined}
      onReset={screen !== 'intro' ? handleResetActivity : undefined}
    >
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-4 min-h-[70vh] text-center">
        <AnimatePresence mode="wait">
          {/* SCREEN 1: INTRO */}
          {screen === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="w-full flex-1 flex flex-col"
            >
              <PremiumIntro
                title={t('app_title', 'Values Reflection')}
                description={t(
                  'app_description',
                  'Discover and clarify your core personal values to steer your choices toward a meaningful life.'
                )}
                onStart={() => setScreen('choose')}
                icon={<Brain size={32} />}
                benefits={[
                  t('app.description2', 'Examine what matters most in your relationships, career, and growth'),
                ]}
                duration={t('app_duration', '5 minutes')}
              >
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={handleViewHistory}
                  className="w-full py-5 rounded-2xl bg-white dark:bg-slate-900 border border-white/60 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 mt-4 hover:text-primary hover:border-primary/20 hover:shadow-md transition-all"
                >
                  <History size={16} strokeWidth={2.5} />
                  {t('app.viewHistory', 'View History')}
                </motion.button>
              </PremiumIntro>
            </motion.div>
          )}

          {/* SCREEN 2: CHOOSE VALUES */}
          {screen === 'choose' && (
            <motion.div
              key="choose"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6 pb-24 text-left w-full"
            >
              <div className="space-y-2">
                <span className="flex items-center gap-1.5 text-primary font-bold text-[10px] uppercase tracking-widest">
                  <Sparkles size={12} />
                  {t('app_title', 'Values Reflection')}
                </span>
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                  {t('app.chooseTitle', 'Select Your Core Values')}
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">
                  {t('app.chooseDesc', 'Choose a few values that resonate most deeply with how you want to live.')}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                {ALL_VALUES.map((v) => {
                  const isSelected = !!selectedValues.find((s) => s.name === v.name);
                  return (
                    <motion.button
                      key={v.name}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleToggleValue(v)}
                      className={`relative flex flex-col items-center justify-center gap-3 p-5 rounded-[2rem] border transition-all duration-200 aspect-square ${
                        isSelected
                          ? 'bg-primary/5 dark:bg-primary/10 border-primary shadow-sm'
                          : 'bg-white dark:bg-slate-900 border-white/60 dark:border-slate-800 hover:border-slate-200'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-3.5 right-3.5 w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-black">
                          ✓
                        </div>
                      )}
                      <span className="text-3xl filter drop-shadow-sm leading-none">{v.emoji}</span>
                      <span className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                        {t(`values.${v.name}`, v.name)}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white dark:from-slate-950 via-white dark:via-slate-950 to-transparent pt-12 flex justify-center z-50">
                <motion.button
                  whileHover={selectedValues.length > 0 ? { scale: 1.01 } : {}}
                  whileTap={selectedValues.length > 0 ? { scale: 0.99 } : {}}
                  disabled={selectedValues.length === 0}
                  onClick={() => setScreen('reflect')}
                  className="w-full max-w-md py-4.5 rounded-2xl bg-primary text-primary-foreground font-black text-base shadow-lg shadow-primary/10 hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:shadow-none"
                >
                  {t('app.continue', 'Continue')}
                  <ArrowRight size={18} />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* SCREEN 3: REFLECT TEXTAREA */}
          {screen === 'reflect' && (
            <motion.div
              key="reflect"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6 pb-24 text-left w-full"
            >
              <div className="space-y-2">
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                  {t('app.reflectTitle', 'Reflect on a Value')}
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">
                  {t('app.reflectDesc', 'Select one value from your set and write down what it means to you.')}
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {selectedValues.map((v) => {
                  const isChosen = chosenValue?.name === v.name;
                  return (
                    <motion.button
                      key={v.name}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setChosenValue(v)}
                      className={`px-4.5 py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all shadow-sm ${
                        isChosen
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-white dark:bg-slate-900 text-slate-650 dark:text-slate-300 border border-white/60 dark:border-slate-800'
                      }`}
                    >
                      {v.emoji} {t(`values.${v.name}`, v.name)}
                    </motion.button>
                  );
                })}
              </div>

              {chosenValue && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1 block">
                      {t('app.reflectQuestion', 'Why is this value essential in your life right now?')}
                    </label>
                    <textarea
                      value={reflectionText}
                      onChange={(e) => setReflectionText(e.target.value)}
                      placeholder={t('app.reflectPlaceholder', 'Write your thoughts and feelings here...')}
                      rows={5}
                      className="w-full py-5 rounded-3xl bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 dark:bg-slate-950 border border-transparent focus:border-primary/30 focus:bg-white dark:focus:bg-gradient-to-r from-primary to-sky-400 border-none transition-all outline-none px-6 font-bold text-slate-700 dark:text-slate-200 placeholder:text-slate-350 dark:placeholder:text-slate-600 resize-none shadow-sm leading-relaxed"
                    />
                  </div>

                  <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white dark:from-slate-950 via-white dark:via-slate-950 to-transparent pt-12 flex justify-center z-50">
                    <motion.button
                      whileHover={reflectionText.trim() ? { scale: 1.01 } : {}}
                      whileTap={reflectionText.trim() ? { scale: 0.99 } : {}}
                      disabled={!reflectionText.trim()}
                      onClick={() => setScreen('action')}
                      className="w-full max-w-md py-4.5 rounded-2xl bg-primary text-primary-foreground font-black text-base shadow-lg shadow-primary/10 hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:shadow-none"
                    >
                      {t('app.next', 'Continue')}
                      <ArrowRight size={18} />
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* SCREEN 4: ACTION DEFINITION */}
          {screen === 'action' && chosenValue && (
            <motion.div
              key="action"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6 pb-24 text-left w-full"
            >
              <div className="space-y-2">
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                  {t('app.liveTitle', 'Live Your Values')}
                </h1>
                <div className="flex justify-start">
                  <div className="px-3.5 py-1.5 rounded-xl bg-primary/10 text-primary font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
                    {chosenValue.emoji} {t(`values.${chosenValue.name}`, chosenValue.name)}
                  </div>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">
                  {t(
                    'app.liveDesc',
                    'How can you put this value into action? Define one practical action you can perform.'
                  )}
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1 block">
                    {t('app.liveQuestion', 'One practical action item')}
                  </label>
                  <textarea
                    value={actionText}
                    onChange={(e) => setActionText(e.target.value)}
                    placeholder={t('app.livePlaceholder', 'e.g. Call my partner to check in at lunch, or block 30 minutes to practice painting...')}
                    rows={5}
                    className="w-full py-5 rounded-3xl bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 dark:bg-slate-950 border border-transparent focus:border-primary/30 focus:bg-white dark:focus:bg-gradient-to-r from-primary to-sky-400 border-none transition-all outline-none px-6 font-bold text-slate-700 dark:text-slate-200 placeholder:text-slate-350 dark:placeholder:text-slate-650 resize-none shadow-sm leading-relaxed"
                  />
                </div>

                <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white dark:from-slate-950 via-white dark:via-slate-950 to-transparent pt-12 flex justify-center z-50">
                  <motion.button
                    whileHover={actionText.trim() && !saveLoading ? { scale: 1.01 } : {}}
                    whileTap={actionText.trim() && !saveLoading ? { scale: 0.99 } : {}}
                    disabled={!actionText.trim() || saveLoading}
                    onClick={handleSave}
                    className="w-full max-w-md py-4.5 rounded-2xl bg-primary text-primary-foreground font-black text-base shadow-lg shadow-primary/10 hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:shadow-none"
                  >
                    {saveLoading ? <Loader2 className="animate-spin w-5 h-5" /> : <Check size={18} />}
                    {t('app.saveReflection', 'Save Reflection')}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* SCREEN 5: SUMMARY COMPLETE */}
          {screen === 'summary' && savedReflection && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full flex-1 flex flex-col"
            >
              <PremiumComplete
                title={t('app_title', 'Values Reflection')}
                message={t('app.quote', 'A life aligned with your values is a life of strength, peace, and clarity.')}
                onRestart={handleResetActivity}
                icon={<Target size={48} className="text-primary animate-pulse" />}
              >
                <div className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-white/60 dark:border-slate-800 text-left space-y-6 my-6 shadow-sm">
                  <div className="flex items-center gap-4 border-b border-slate-50 dark:border-slate-850 pb-4">
                    <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center text-3xl leading-none">
                      {savedReflection.valueEmoji}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-800 dark:text-slate-200 text-base leading-snug">
                        {t(`values.${savedReflection.valueName}`, savedReflection.valueName)}
                      </h3>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        {t('app.aligned', 'ALIGNED')}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <span className="text-[9px] font-black text-slate-350 dark:text-slate-500 uppercase tracking-widest block">
                        {t('app.reflectionLabel', 'My Reflection')}
                      </span>
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-300 leading-relaxed italic">
                        &quot;{savedReflection.reflection}&quot;
                      </p>
                    </div>

                    <div className="space-y-1 border-t border-slate-50 dark:border-slate-850 pt-4">
                      <span className="text-[9px] font-black text-slate-350 dark:text-slate-500 uppercase tracking-widest block text-primary">
                        {t('app.actionLabel', 'Action Commitment')}
                      </span>
                      <p className="text-sm font-extrabold text-slate-800 dark:text-slate-100 leading-relaxed">
                        {savedReflection.action}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={handleViewHistory}
                    className="w-full py-4.5 rounded-2xl bg-primary text-primary-foreground font-black text-base shadow-lg shadow-primary/10 hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <History size={16} />
                    {t('app.viewHistory', 'View History')}
                  </motion.button>
                </div>
              </PremiumComplete>
            </motion.div>
          )}

          {/* SCREEN 6: REFLECTIONS HISTORY LIST */}
          {screen === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6 pb-24 text-left w-full"
            >
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <span className="flex items-center gap-1.5 text-primary font-bold text-[10px] uppercase tracking-widest">
                    <History size={12} />
                    {t('app.viewHistory', 'History')}
                  </span>
                  <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                    {t('app.historyTitle', 'Reflections History')}
                  </h1>
                </div>
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={handleResetActivity}
                  className="p-3 bg-slate-100 dark:bg-slate-900 text-slate-650 dark:text-slate-300 rounded-2xl shadow-sm hover:bg-slate-200 transition-colors"
                >
                  <ArrowLeft size={18} />
                </motion.button>
              </div>

              {historyLoading ? (
                <div className="py-24 text-center flex flex-col items-center justify-center gap-4">
                  <Loader2 className="w-8 h-8 animate-spin text-primary opacity-30" />
                  <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">
                    {t('loading', 'Loading reflections...')}
                  </p>
                </div>
              ) : historyList.length === 0 ? (
                <div className="py-16 text-center bg-slate-55/40 dark:bg-slate-900/40 rounded-[2.5rem] border border-dashed border-white/60 dark:border-slate-800 px-6 space-y-6">
                  <div className="w-14 h-14 bg-white dark:bg-slate-950 rounded-2xl flex items-center justify-center mx-auto text-slate-200 dark:text-slate-800 shadow-sm">
                    <Calendar size={24} />
                  </div>
                  <p className="text-slate-400 dark:text-slate-500 font-bold text-xs uppercase tracking-widest">
                    {t('app.noHistory', 'No reflection entries yet')}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setScreen('choose')}
                    className="w-full py-4.5 rounded-2xl bg-primary text-primary-foreground font-black text-sm shadow-md"
                  >
                    {t('app.startActivity', 'Start Reflection')}
                  </motion.button>
                </div>
              ) : (
                <div className="space-y-4">
                  {historyList.map((r, i) => (
                    <motion.div
                      key={r.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="p-6 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-white/60 dark:border-slate-800 shadow-sm space-y-4 relative overflow-hidden group hover:border-primary/10 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3.5">
                          <div className="w-11 h-11 rounded-xl bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 dark:bg-slate-950 flex items-center justify-center text-xl shadow-inner leading-none shrink-0">
                            {r.valueEmoji}
                          </div>
                          <div>
                            <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">
                              {t(`values.${r.valueName}`, r.valueName)}
                            </h4>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                              {parseDbDate(r.date).toLocaleDateString(undefined, {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </p>
                          </div>
                        </div>
                        <Heart size={14} className="text-slate-100 dark:text-slate-800 group-hover:text-primary transition-colors" fill="currentColor" />
                      </div>

                      <div className="space-y-3 pt-2">
                        <p className="text-slate-650 dark:text-slate-350 text-sm font-bold leading-relaxed italic">
                          &quot;{r.reflection}&quot;
                        </p>
                        <div className="flex items-center gap-2 text-primary font-black text-[9px] uppercase tracking-widest pt-2 border-t border-slate-50 dark:border-slate-850">
                          <Target size={12} />
                          {t('app.actionLabel', 'Action Commitment')}: {r.action}
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white dark:from-slate-950 via-white dark:via-slate-950 to-transparent pt-12 flex justify-center z-50">
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={handleResetActivity}
                      className="w-full max-w-md py-4.5 rounded-2xl bg-primary text-primary-foreground font-black text-base shadow-lg shadow-primary/10 hover:shadow-xl transition-all flex items-center justify-center gap-2"
                    >
                      <RefreshCw size={18} />
                      {t('app.startNew', 'Reflect Again')}
                    </motion.button>
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

export default function KnowYourValuesPage() {
  return (
    <I18nextProvider i18n={i18n}>
      <KnowYourValuesInner />
    </I18nextProvider>
  );
}
