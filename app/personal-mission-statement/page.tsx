'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation, I18nextProvider } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Sparkles, Heart, Pencil, Save, History, Loader2, ArrowLeft, Check, Trash2, Calendar, Target, ArrowRight } from 'lucide-react';
import i18n, { loadLocale } from './i18n';
import { PremiumLayout } from '@/components/shared/PremiumLayout';
import { PremiumIntro } from '@/components/shared/PremiumIntro';
import { PremiumComplete } from '@/components/shared/PremiumComplete';

const VALUES_OPTIONS = [
  { key: "value_kindness", label: "Kindness" },
  { key: "value_peace", label: "Peace" },
  { key: "value_connection", label: "Connection" },
  { key: "value_honesty", label: "Honesty" },
  { key: "value_patience", label: "Patience" },
  { key: "value_courage", label: "Courage" },
  { key: "value_self_compassion", label: "Self-compassion" },
  { key: "value_gratitude", label: "Gratitude" },
  { key: "value_creativity", label: "Creativity" },
  { key: "value_growth", label: "Growth" },
  { key: "value_rest", label: "Rest" },
  { key: "value_love", label: "Love" },
  { key: "value_simplicity", label: "Simplicity" },
  { key: "value_freedom", label: "Freedom" },
  { key: "value_purpose", label: "Purpose" },
  { key: "value_joy", label: "Joy" },
];

interface MissionData {
  values: string[];
  beingSomeoneWho: string;
  lifeFeelMore: string;
}

interface SavedMission {
  id: string;
  statement: string;
  values: string[];
  date: string;
}

function PersonalMissionStatementInner() {
  const { t } = useTranslation(undefined, { i18n });
  const [screen, setScreen] = useState(0); // 0: intro, 1: values, 2: reflect, 3: result/statement, 4: history
  
  const [data, setData] = useState<MissionData>({
    values: [],
    beingSomeoneWho: '',
    lifeFeelMore: '',
  });

  const [statement, setStatement] = useState('');
  const [historyList, setHistoryList] = useState<SavedMission[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  // Sync lang URL parameter
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const lang = params.get('lang') || 'en';
      loadLocale(lang);
    }
  }, []);

  // Fetch history list
  const fetchHistory = useCallback(async () => {
    setHistoryLoading(true);
    try {
      const res = await fetch('/api/personal-mission-statement');
      if (res.ok) {
        const list = await res.json();
        setHistoryList(list);
      }
    } catch (err) {
      console.error('Failed to load mission statements:', err);
    } finally {
      setHistoryLoading(false);
    }
  }, []);

  // Compute live statement draft
  const valuesText = useMemo(() => {
    const labels = data.values.map((v) => t(v, v));
    if (labels.length === 0) return t('mission_my_values', 'my values');
    if (labels.length === 1) return labels[0];
    const andWord = t('mission_and', ' and ');
    return labels.slice(0, -1).join(', ') + `, ${andWord}` + labels[labels.length - 1];
  }, [data.values, t]);

  useEffect(() => {
    if (screen === 3 && !statement) {
      setStatement(
        `${t('mission_i_choose', 'I choose to live my life with ')}${valuesText.toLowerCase()},\n${t(
          'mission_and_to_be',
          'to focus on being someone who '
        )}${data.beingSomeoneWho.toLowerCase()},\n${t(
          'mission_so_my_life',
          'so that my life feels more '
        )}${data.lifeFeelMore.toLowerCase()}.`
      );
    }
  }, [screen, statement, valuesText, data.beingSomeoneWho, data.lifeFeelMore, t]);

  const handleToggleValue = (val: string) => {
    setData((prev) => {
      const isSelected = prev.values.includes(val);
      if (isSelected) {
        return { ...prev, values: prev.values.filter((v) => v !== val) };
      } else if (prev.values.length < 3) {
        return { ...prev, values: [...prev.values, val] };
      }
      return prev;
    });
  };

  const handleSaveStatement = async () => {
    setSaveLoading(true);
    try {
      const res = await fetch('/api/personal-mission-statement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          statement: statement,
          values: data.values,
        }),
      });

      if (res.ok) {
        setScreen(4);
        fetchHistory();
      }
    } catch (err) {
      console.error('Failed to save statement:', err);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDeleteStatement = async (id: string) => {
    try {
      const res = await fetch(`/api/personal-mission-statement?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setHistoryList((prev) => prev.filter((m) => m.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete statement:', err);
    }
  };

  const handleResetFlow = () => {
    setData({
      values: [],
      beingSomeoneWho: '',
      lifeFeelMore: '',
    });
    setStatement('');
    setScreen(0);
  };

  const handleViewHistory = () => {
    fetchHistory();
    setScreen(4);
  };

  const canContinueValues = data.values.length > 0;
  const canContinueReflections = data.beingSomeoneWho.trim() && data.lifeFeelMore.trim();

  return (
    <PremiumLayout
      title={t('app_title', 'Personal Mission Statement')}
      icon={<Compass className="w-6 h-6 text-primary animate-pulse" />}
      onBack={screen > 0 && screen < 4 ? () => setScreen((s) => s - 1) : undefined}
      onReset={screen > 0 && screen < 4 ? handleResetFlow : undefined}
    >
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-4 min-h-[70vh] text-center">
        {screen > 0 && screen < 3 && (
          <div className="flex justify-center gap-2 mb-10">
            {[1, 2].map((i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i <= screen ? 'w-8 bg-primary' : 'w-2 bg-slate-150 dark:bg-slate-800'
                }`}
              />
            ))}
          </div>
        )}

        <div className="relative flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            {/* SCREEN 0: INTRO */}
            {screen === 0 && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="w-full flex-1 flex flex-col"
              >
                <PremiumIntro
                  title={t('app_title', 'Personal Mission Statement')}
                  description={t(
                    'app_description',
                    'Craft a personalized declaration of your values, identity, and lifetime goals to guide your daily decisions.'
                  )}
                  onStart={() => setScreen(1)}
                  icon={<Compass size={32} />}
                  benefits={[
                    t('intro_benefit_1', 'Gain absolute clarity on your core beliefs'),
                    t('intro_benefit_2', 'Set clear targets for personal transformation'),
                  ]}
                  duration={t('app_duration', '5 minutes')}
                >
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={handleViewHistory}
                    className="w-full py-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 mt-4 hover:text-primary hover:border-primary/20 hover:shadow-md transition-all"
                  >
                    <History size={16} strokeWidth={2.5} />
                    {t('history_title', 'View Stored Statements')}
                  </motion.button>
                </PremiumIntro>
              </motion.div>
            )}

            {/* SCREEN 1: SELECT VALUE CHIPS */}
            {screen === 1 && (
              <motion.div
                key="values"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full flex-1 flex flex-col space-y-6 text-left pb-20"
              >
                <div className="space-y-2">
                  <span className="flex items-center gap-1.5 text-primary font-bold text-[10px] uppercase tracking-widest">
                    <Sparkles size={12} />
                    {t('app_title', 'Personal Mission')}
                  </span>
                  <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                    {t('values_title', 'Choose Your Core Values')}
                  </h1>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">
                    {t('values_subtitle', 'Select up to three values that anchor your heart and mind.')}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5 justify-start">
                  {VALUES_OPTIONS.map((v) => {
                    const isSelected = data.values.includes(v.key);
                    return (
                      <motion.button
                        key={v.key}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleToggleValue(v.key)}
                        className={`px-4.5 py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all shadow-sm ${
                          isSelected
                            ? 'bg-primary text-primary-foreground border-2 border-primary'
                            : 'bg-white dark:bg-slate-900 text-slate-650 dark:text-slate-350 border-2 border-slate-100 dark:border-slate-800'
                        }`}
                      >
                        {isSelected && <span className="mr-1.5">✓</span>}
                        {t(v.key, v.label)}
                      </motion.button>
                    );
                  })}
                </div>

                <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white dark:from-slate-950 via-white dark:via-slate-950 to-transparent pt-12 flex justify-center z-50">
                  <motion.button
                    whileHover={canContinueValues ? { scale: 1.01 } : {}}
                    whileTap={canContinueValues ? { scale: 0.99 } : {}}
                    disabled={!canContinueValues}
                    onClick={() => setScreen(2)}
                    className="w-full max-w-md py-4.5 rounded-2xl bg-primary text-primary-foreground font-black text-base shadow-lg shadow-primary/10 hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:shadow-none"
                  >
                    {t('values_next', 'Continue')}
                    <ArrowRight size={18} />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* SCREEN 2: DRAFT REFLECTIONS */}
            {screen === 2 && (
              <motion.div
                key="reflect"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full flex-1 flex flex-col space-y-6 text-left pb-20"
              >
                <div className="space-y-2">
                  <span className="flex items-center gap-1.5 text-primary font-bold text-[10px] uppercase tracking-widest">
                    <Heart size={12} />
                    {t('app_title', 'Personal Mission')}
                  </span>
                  <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                    {t('reflection_title', 'Reflect on Identity')}
                  </h1>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">
                    {t('reflection_subtitle', 'Draft your aspirations. Fill out the core components of your purpose.')}
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-4 block">
                      {t('reflection_being_label', 'What kind of person do you strive to be?')}
                    </label>
                    <input
                      type="text"
                      placeholder={t('reflection_being_placeholder', 'e.g. Someone who listens deeply and supports others...')}
                      value={data.beingSomeoneWho}
                      onChange={(e) => setData({ ...data, beingSomeoneWho: e.target.value })}
                      className="w-full py-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 font-bold px-6 text-slate-700 dark:text-slate-200 focus:border-primary focus:bg-white outline-none transition-all shadow-sm"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-4 block">
                      {t('reflection_life_label', 'How does living in this way make you feel?')}
                    </label>
                    <input
                      type="text"
                      placeholder={t('reflection_life_placeholder', 'e.g. Complete, peaceful, aligned...')}
                      value={data.lifeFeelMore}
                      onChange={(e) => setData({ ...data, lifeFeelMore: e.target.value })}
                      className="w-full py-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 font-bold px-6 text-slate-700 dark:text-slate-200 focus:border-primary focus:bg-white outline-none transition-all shadow-sm"
                    />
                  </div>
                </div>

                <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white dark:from-slate-950 via-white dark:via-slate-950 to-transparent pt-12 flex justify-center z-50">
                  <motion.button
                    whileHover={canContinueReflections ? { scale: 1.01 } : {}}
                    whileTap={canContinueReflections ? { scale: 0.99 } : {}}
                    disabled={!canContinueReflections}
                    onClick={() => setScreen(3)}
                    className="w-full max-w-md py-4.5 rounded-2xl bg-primary text-primary-foreground font-black text-base shadow-lg shadow-primary/10 hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:shadow-none"
                  >
                    {t('reflection_create', 'Construct Mission Statement')}
                    <ArrowRight size={18} />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* SCREEN 3: RESULT AND DRAFT STATEMENT */}
            {screen === 3 && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full flex-1 flex flex-col pb-20"
              >
                <PremiumComplete
                  title={t('app_title', 'Personal Mission')}
                  message={t('mission_is_reminder', 'Here is your drafted mission statement. You can edit the text directly.')}
                  onRestart={handleResetFlow}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white dark:bg-slate-900 rounded-[2.5rem] border-2 border-slate-100 dark:border-slate-800 p-8 shadow-xl text-center relative overflow-hidden my-6"
                  >
                    <textarea
                      value={statement}
                      onChange={(e) => setStatement(e.target.value)}
                      className="w-full bg-transparent text-slate-800 dark:text-slate-100 text-lg font-bold border-none p-0 resize-none placeholder:text-slate-300 focus:outline-none transition-all leading-[1.8] text-center min-h-[140px]"
                    />
                  </motion.div>

                  <div className="space-y-4 text-slate-500 dark:text-slate-450 text-xs font-bold leading-relaxed text-center italic max-w-xs mx-auto mb-6">
                    <p>{t('mission_not_rule', 'Remember: This is a supportive declaration, not a rigid set of rules.')}</p>
                    <p>{t('mission_return_whenever', 'Return and reflect whenever you need to align your decisions.')}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3.5">
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={handleSaveStatement}
                      disabled={saveLoading}
                      className="py-4.5 bg-primary text-primary-foreground font-black text-sm rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary/10 hover:shadow-xl transition-all"
                    >
                      {saveLoading ? <Loader2 className="animate-spin w-4 h-4" /> : <Save size={16} />}
                      {t('mission_save', 'Save Statement')}
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setScreen(2)}
                      className="py-4.5 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-350 font-black text-sm rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-950 transition-all shadow-sm"
                    >
                      <Pencil size={16} />
                      {t('mission_edit', 'Modify Draft')}
                    </motion.button>
                  </div>
                </PremiumComplete>
              </motion.div>
            )}

            {/* SCREEN 4: HISTORY VIEW LIST */}
            {screen === 4 && (
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
                      {t('history_title', 'Mission History')}
                    </span>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                      {t('history_title', 'Saved Declarations')}
                    </h1>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={handleResetFlow}
                    className="p-3 bg-slate-100 dark:bg-slate-900 text-slate-650 dark:text-slate-300 rounded-2xl shadow-sm hover:bg-slate-200 transition-colors"
                  >
                    <ArrowLeft size={18} />
                  </motion.button>
                </div>

                {historyLoading ? (
                  <div className="py-24 text-center flex flex-col items-center justify-center gap-4">
                    <Loader2 className="w-8 h-8 animate-spin text-primary opacity-30" />
                    <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">
                      {t('loading', 'Loading declarations...')}
                    </p>
                  </div>
                ) : historyList.length === 0 ? (
                  <div className="py-16 text-center bg-slate-55/40 dark:bg-slate-900/40 rounded-[2.5rem] border-2 border-dashed border-slate-100 dark:border-slate-800 px-6 space-y-6">
                    <div className="w-14 h-14 bg-white dark:bg-slate-950 rounded-2xl flex items-center justify-center mx-auto text-slate-200 dark:text-slate-800 shadow-sm animate-pulse">
                      <Compass size={24} />
                    </div>
                    <p className="text-slate-400 dark:text-slate-500 font-bold text-xs uppercase tracking-widest">
                      {t('history_empty', 'No mission statements saved yet')}
                    </p>
                    <p className="text-slate-350 dark:text-slate-550 text-[10px] font-bold tracking-wider uppercase">
                      {t('history_empty_hint', 'Go through the activity to build your statement')}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setScreen(1)}
                      className="w-full py-4.5 rounded-2xl bg-primary text-primary-foreground font-black text-sm shadow-md"
                    >
                      {t('app.startActivity', 'Create Mission')}
                    </motion.button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {historyList.map((m, i) => (
                      <motion.div
                        key={m.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className="p-6.5 bg-white dark:bg-slate-900 rounded-[2.5rem] border-2 border-slate-100 dark:border-slate-800 shadow-sm space-y-4 relative overflow-hidden group hover:border-primary/10 transition-all text-center"
                      >
                        <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-850 pb-3 text-left">
                          <div className="flex items-center gap-2 text-slate-400">
                            <Calendar size={14} />
                            <span className="text-[10px] font-bold uppercase tracking-wider">
                              {new Date(m.date).toLocaleDateString(undefined, {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </span>
                          </div>
                          <button
                            onClick={() => handleDeleteStatement(m.id)}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        {m.values && m.values.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 justify-center pt-2">
                            {m.values.map((v) => (
                              <span
                                key={v}
                                className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full"
                              >
                                {t(v, v)}
                              </span>
                            ))}
                          </div>
                        )}

                        <p className="text-slate-700 dark:text-slate-200 text-base font-extrabold leading-[1.8] whitespace-pre-line pt-2">
                          {m.statement}
                        </p>
                      </motion.div>
                    ))}

                    <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white dark:from-slate-950 via-white dark:via-slate-950 to-transparent pt-12 flex justify-center z-50">
                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={handleResetFlow}
                        className="w-full max-w-md py-4.5 rounded-2xl bg-primary text-primary-foreground font-black text-base shadow-lg shadow-primary/10 hover:shadow-xl transition-all flex items-center justify-center gap-2"
                      >
                        {t('history_back', 'Create New Statement')}
                      </motion.button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PremiumLayout>
  );
}

export default function PersonalMissionStatementPage() {
  return (
    <I18nextProvider i18n={i18n}>
      <PersonalMissionStatementInner />
    </I18nextProvider>
  );
}
