'use client';
import { parseDbDate } from '@/lib/dateUtils';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation, I18nextProvider } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Sparkles, Heart, Pencil, Share2, History, Loader2, ArrowLeft, Check, Trash2, Calendar, Target, ArrowRight } from 'lucide-react';
import i18n, { loadLocale } from './i18n';
import { PremiumLayout } from '@/components/shared/PremiumLayout';
import { PremiumIntro } from '@/components/shared/PremiumIntro';
import { PremiumComplete } from '@/components/shared/PremiumComplete';
import ShareModal from '@/components/shared/ShareModal';
import { apiPath } from '@/lib/apiPath';

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
  const [isShareOpen, setIsShareOpen] = useState(false);

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
      const res = await fetch(apiPath('/api/personal-mission-statement'));
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
      const res = await fetch(apiPath('/api/personal-mission-statement'), {
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
      const res = await fetch(apiPath(`/api/personal-mission-statement?id=${id}`), {
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
                  i <= screen ? 'w-8 bg-primary' : 'w-2 bg-slate-150 '
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
                    className="w-full py-3 rounded-xl bg-white/80 backdrop-blur-sm border border-white text-slate-500 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 mt-3 hover:text-sky-600 hover:border-sky-100 transition-all"
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
                className="w-full flex-1 flex flex-col space-y-6 text-left"
              >
                <div className="space-y-2">
                  <span className="act-eyebrow">
                    <Sparkles size={11} />
                    {t('app_title', 'Personal Mission')}
                  </span>
                  <h1 className="act-heading">
                    {t('values_title', 'Choose Your Core Values')}
                  </h1>
                  <p className="act-body">
                    {t('values_subtitle', 'Select up to three values that anchor your heart and mind.')}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 justify-start">
                  {VALUES_OPTIONS.map((v) => {
                    const isSelected = data.values.includes(v.key);
                    return (
                      <motion.button
                        key={v.key}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleToggleValue(v.key)}
                        className={`px-3.5 py-2 rounded-xl font-semibold text-xs uppercase tracking-wider transition-all ${
                          isSelected
                            ? 'bg-primary text-white border border-primary'
                            : 'bg-white/80 backdrop-blur-sm text-slate-600 border border-white hover:border-sky-100'
                        }`}
                      >
                        {isSelected && <span className="mr-1">?</span>}
                        {t(v.key, v.label)}
                      </motion.button>
                    );
                  })}
                </div>

                <div className="pt-2">
                  <button
                    disabled={!canContinueValues}
                    onClick={() => setScreen(2)}
                    className="act-btn-primary"
                  >
                    {t('values_next', 'Continue')}
                    <ArrowRight size={16} strokeWidth={2.5} />
                  </button>
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
                className="w-full flex-1 flex flex-col space-y-6 text-left"
              >
                <div className="space-y-2">
                  <span className="act-eyebrow">
                    <Heart size={11} />
                    {t('app_title', 'Personal Mission')}
                  </span>
                  <h1 className="act-heading">
                    {t('reflection_title', 'Reflect on Identity')}
                  </h1>
                  <p className="act-body">
                    {t('reflection_subtitle', 'Draft your aspirations. Fill out the core components of your purpose.')}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="field-label">
                      {t('reflection_being_label', 'What kind of person do you strive to be?')}
                    </label>
                    <input
                      type="text"
                      placeholder={t('reflection_being_placeholder', 'e.g. Someone who listens deeply and supports others...')}
                      value={data.beingSomeoneWho}
                      onChange={(e) => setData({ ...data, beingSomeoneWho: e.target.value })}
                      className="field-input"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="field-label">
                      {t('reflection_life_label', 'How does living in this way make you feel?')}
                    </label>
                    <input
                      type="text"
                      placeholder={t('reflection_life_placeholder', 'e.g. Complete, peaceful, aligned...')}
                      value={data.lifeFeelMore}
                      onChange={(e) => setData({ ...data, lifeFeelMore: e.target.value })}
                      className="field-input"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    disabled={!canContinueReflections}
                    onClick={() => setScreen(3)}
                    className="act-btn-primary"
                  >
                    {t('reflection_create', 'Construct Mission Statement')}
                    <ArrowRight size={16} strokeWidth={2.5} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* SCREEN 3: RESULT AND DRAFT STATEMENT */}
            {screen === 3 && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full flex-1 flex flex-col"
              >
                <PremiumComplete
                  title={t('app_title', 'Personal Mission')}
                  message={t('mission_is_reminder', 'Your mission statement is ready. Tap to edit the text directly.')}
                  shareContent={`My Personal Mission Statement:\n\n"${statement}"\n\nCreated with TherapyMantra \n Android: https://play.google.com/store/apps/details?id=org.mantracare.therapy\n iOS: https://apps.apple.com/pk/app/therapymantra/id1607643888`}
                  customActions={
                    <div className="space-y-3">
                      {/* Editable statement card */}
                      <div
                        className="rounded-2xl p-5 relative overflow-hidden"
                        style={{
                          background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                          border: '1.5px solid rgba(186,230,255,0.7)',
                          boxShadow: '0 2px 12px rgba(14,165,233,0.08)',
                        }}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <Sparkles size={13} className="text-sky-400" />
                          <span className="text-[11px] font-bold text-sky-500 uppercase tracking-widest">
                            {t('mission_your_statement', 'Your Statement')}
                          </span>
                          <span className="ml-auto text-[10px] text-slate-400 italic flex items-center gap-1">
                            <Pencil size={9} /> tap to edit
                          </span>
                        </div>
                        <textarea
                          value={statement}
                          onChange={(e) => setStatement(e.target.value)}
                          className="w-full bg-transparent text-slate-800 text-[15px] font-semibold border-none p-0 resize-none focus:outline-none leading-[1.8] text-center min-h-[120px]"
                          style={{ fontStyle: 'italic' }}
                        />
                      </div>

                      <p className="text-center text-[12px] text-slate-400 italic leading-relaxed">
                        {t('mission_not_rule', 'A supportive declaration — not a rigid rule. Return whenever you need direction.')}
                      </p>

                      {/* Primary: Save & Finish */}
                      <button
                        onClick={handleSaveStatement}
                        disabled={saveLoading}
                        className="act-btn-primary"
                      >
                        {saveLoading
                          ? <Loader2 className="animate-spin w-4 h-4" />
                          : <Check size={17} strokeWidth={2.5} />}
                        {saveLoading
                          ? t('saving', 'Saving...')
                          : t('mission_save_finish', 'Save & Finish')}
                      </button>

                      {/* Secondary row: Share + Edit */}
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => setIsShareOpen(true)}
                          className="h-[50px] rounded-2xl flex items-center justify-center gap-2 font-semibold text-[14px] text-sky-600 transition-all"
                          style={{
                            background: '#f0f9ff',
                            border: '1.5px solid rgba(186,230,255,0.8)',
                          }}
                        >
                          <Share2 size={15} strokeWidth={2} />
                          {t('mission_share', 'Share')}
                        </button>
                        <button
                          onClick={() => setScreen(2)}
                          className="h-[50px] rounded-2xl flex items-center justify-center gap-2 font-semibold text-[14px] text-slate-500 transition-all"
                          style={{
                            background: '#f8fafc',
                            border: '1.5px solid rgba(226,232,240,0.8)',
                          }}
                        >
                          <Pencil size={14} strokeWidth={2} />
                          {t('mission_edit', 'Edit Draft')}
                        </button>
                      </div>

                      {/* Start over — minimal */}
                      <button
                        onClick={handleResetFlow}
                        className="w-full py-3 text-[13px] text-slate-400 font-medium hover:text-slate-600 transition-colors flex items-center justify-center gap-1.5"
                      >
                        <ArrowLeft size={13} />
                        {t('mission_start_over', 'Start Over')}
                      </button>
                    </div>
                  }
                />
              </motion.div>
            )}

            {/* SCREEN 4: HISTORY VIEW LIST */}
            {screen === 4 && (
              <motion.div
                key="history"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6 text-left w-full"
              >
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <span className="act-eyebrow">
                      <History size={11} />
                      {t('history_title', 'Mission History')}
                    </span>
                    <h1 className="act-heading">
                      {t('history_title', 'Saved Declarations')}
                    </h1>
                  </div>
                  <button
                    onClick={handleResetFlow}
                    className="p-2.5 bg-white/80 backdrop-blur-sm border border-white text-slate-500 rounded-xl hover:border-sky-100 hover:text-sky-600 transition-all"
                  >
                    <ArrowLeft size={16} />
                  </button>
                </div>

                {historyLoading ? (
                  <div className="py-24 text-center flex flex-col items-center justify-center gap-4">
                    <Loader2 className="w-8 h-8 animate-spin text-primary opacity-30" />
                    <p className="text-slate-400 font-medium text-xs uppercase tracking-widest">
                      {t('loading', 'Loading declarations...')}
                    </p>
                  </div>
                ) : historyList.length === 0 ? (
                  <div className="py-12 text-center bg-white/80 backdrop-blur-sm rounded-2xl border border-white shadow-sm px-6 space-y-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto text-slate-200 shadow-sm animate-pulse">
                      <Compass size={22} />
                    </div>
                    <p className="text-slate-400 font-medium text-sm">
                      {t('history_empty', 'No mission statements saved yet')}
                    </p>
                    <p className="text-slate-400 text-xs">
                      {t('history_empty_hint', 'Go through the activity to build your statement')}
                    </p>
                    <button
                      onClick={() => setScreen(1)}
                      className="act-btn-primary"
                    >
                      {t('app.startActivity', 'Create Mission')}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {historyList.map((m, i) => (
                      <motion.div
                        key={m.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className="p-5 bg-white/80 backdrop-blur-sm rounded-2xl border border-white shadow-sm space-y-3 text-center hover:border-sky-100 transition-all"
                      >
                        <div className="flex items-center justify-between border-b border-sky-50 pb-3 text-left">
                          <div className="flex items-center gap-2 text-slate-400">
                            <Calendar size={13} />
                            <span className="text-[11px] font-medium">
                              {parseDbDate(m.date).toLocaleDateString(undefined, {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </span>
                          </div>
                          <button
                            onClick={() => handleDeleteStatement(m.id)}
                            className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>

                        {m.values && m.values.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 justify-center pt-1">
                            {m.values.map((v) => (
                              <span
                                key={v}
                                className="px-2.5 py-1 bg-sky-50 border border-sky-100 text-sky-600 text-[10px] font-semibold uppercase tracking-wider rounded-full"
                              >
                                {t(v, v)}
                              </span>
                            ))}
                          </div>
                        )}

                        <p className="text-slate-700 text-sm font-semibold leading-[1.8] whitespace-pre-line pt-1">
                          {m.statement}
                        </p>
                      </motion.div>
                    ))}

                    <div className="pt-2">
                      <button
                        onClick={handleResetFlow}
                        className="act-btn-primary"
                      >
                        {t('history_back', 'Create New Statement')}
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        activityName={t('app_title', 'Personal Mission Statement')}
        shareContent={statement ? `My Personal Mission Statement:\n\n"${statement}"\n\nCreated with TherapyMantra \n Android: https://play.google.com/store/apps/details?id=org.mantracare.therapy\n iOS: https://apps.apple.com/pk/app/therapymantra/id1607643888` : undefined}
        emoji=""
      />
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