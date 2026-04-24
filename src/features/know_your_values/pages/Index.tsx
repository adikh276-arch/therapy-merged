import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { PremiumIntro } from "../../../components/shared/PremiumIntro";
import { PremiumComplete } from "../../../components/shared/PremiumComplete";
import ValueCard from "../components/ValueCard";
import { allValues } from "../data/values";
import { Reflection, ValueItem } from "../types/reflection";
import { format } from "date-fns";
import { toast } from "sonner";
import { useAuth } from "../components/AuthContext";
import { sql } from '@/lib/db';
import { Sparkles, Brain, ArrowRight, ArrowLeft, RefreshCw, History, Calendar, Check, Target, Heart } from "lucide-react";

const Index = () => {
  const { t } = useTranslation();
  const { userId } = useAuth();
  const [screen, setScreen] = useState<"intro" | "choose" | "reflect" | "action" | "summary" | "history">("intro");
  const [selectedValues, setSelectedValues] = useState<ValueItem[]>([]);
  const [chosenValue, setChosenValue] = useState<ValueItem | null>(null);
  const [reflectionText, setReflectionText] = useState("");
  const [actionText, setActionText] = useState("");
  const [history, setHistory] = useState<Reflection[]>([]);
  const [savedReflection, setSavedReflection] = useState<Reflection | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchHistory = async () => {
    if (!userId) return;
    setIsLoading(true);
    try {
      const res = await sql`SELECT id, user_id, date, value_emoji as "valueEmoji", value_name as "valueName", reflection, action FROM reflections WHERE user_id = ${userId} ORDER BY date DESC`;
      setHistory(res);
    } catch (err) {
      console.error("Failed to fetch history:", err);
      toast.error("Failed to load history");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [userId]);

  const toggleValue = (v: ValueItem) => {
    setSelectedValues((prev) =>
      prev.find((p) => p.name === v.name)
        ? prev.filter((p) => p.name !== v.name)
        : [...prev, v]
    );
  };

  const handleSave = async () => {
    if (!chosenValue || !userId) return;
    setIsLoading(true);
    const r: Omit<Reflection, 'id'> = {
      date: new Date().toISOString(),
      valueEmoji: chosenValue.emoji,
      valueName: chosenValue.name,
      reflection: reflectionText,
      action: actionText,
    };

    try {
      const res = await sql`
        INSERT INTO reflections (user_id, date, value_emoji, value_name, reflection, action) 
        VALUES (${userId}, ${r.date}, ${r.valueEmoji}, ${r.valueName}, ${r.reflection}, ${r.action}) 
        RETURNING id
      `;

      const fullReflection: Reflection = { ...r, id: res[0].id.toString() };
      setSavedReflection(fullReflection);
      setScreen("summary");
      toast.success("Values reflection saved");
    } catch (err) {
      console.error("Failed to save reflection:", err);
      toast.error("Failed to save reflection");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinish = () => {
    fetchHistory();
    setScreen("history");
  };

  const resetActivity = () => {
    setSelectedValues([]);
    setChosenValue(null);
    setReflectionText("");
    setActionText("");
    setSavedReflection(null);
    setScreen("intro");
  };

  const getTitle = () => {
    switch(screen) {
      case 'history': return "Value Journey";
      case 'summary': return "Reflection Complete";
      default: return "Know Your Values";
    }
  };

  return (
    <PremiumLayout 
      title={getTitle()} 
      onReset={screen !== 'intro' ? resetActivity : undefined}
    >
      <AnimatePresence mode="wait">
        {/* INTRO */}
        {screen === "intro" && (
          <motion.div key="intro" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
              <PremiumIntro
                  title={t('app.title')}
                  description={t('app.description1')}
                  onStart={() => setScreen("choose")}
                  icon={<Brain size={32} />}
                  benefits={[
                      t('app.description2'),
                  ]}
              >
                  <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => { fetchHistory(); setScreen("history"); }}
                      className="w-full py-4 rounded-2xl bg-slate-50 text-slate-400 font-bold flex items-center justify-center gap-2 mt-4 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                  >
                      <History size={18} />
                      {t('app.viewHistory')}
                  </motion.button>
              </PremiumIntro>
          </motion.div>
        )}

        {/* CHOOSE VALUES */}
        {screen === "choose" && (
          <motion.div key="choose" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="space-y-8 pb-32">
              <div className="space-y-4">
                  <h1 className="text-3xl font-extrabold text-slate-900 leading-tight">{t('app.chooseTitle')}</h1>
                  <p className="text-slate-500 text-base font-medium leading-relaxed">{t('app.chooseDesc')}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                  {allValues.map((v) => (
                      <ValueCard
                      key={v.name}
                      emoji={v.emoji}
                      name={t(`values.${v.name}`)}
                      selected={!!selectedValues.find((s) => s.name === v.name)}
                      onClick={() => toggleValue(v)}
                      />
                  ))}
              </div>

              <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-sm z-20 flex justify-center">
                <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    disabled={selectedValues.length === 0}
                    onClick={() => setScreen("reflect")}
                    className="w-full max-w-lg py-4.5 rounded-2xl bg-primary text-primary-foreground font-black text-lg shadow-lg shadow-primary/20 hover:shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-40"
                >
                    {t('app.continue')}
                    <ArrowRight size={20} />
                </motion.button>
              </div>
          </motion.div>
        )}

        {/* REFLECT */}
        {screen === "reflect" && (
          <motion.div key="reflect" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="space-y-8 pb-32">
              <div className="space-y-4">
                  <h1 className="text-3xl font-extrabold text-slate-900 leading-tight">{t('app.reflectTitle')}</h1>
                  <p className="text-slate-500 text-base font-medium leading-relaxed">{t('app.reflectDesc')}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                  {selectedValues.map((v) => (
                      <motion.button
                          key={v.name}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setChosenValue(v)}
                          className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-sm ${chosenValue?.name === v.name
                              ? "bg-primary text-white"
                              : "bg-white text-slate-600 border-2 border-slate-100 hover:border-primary/20"
                              }`}
                      >
                          {v.emoji} {t(`values.${v.name}`)}
                      </motion.button>
                  ))}
              </div>

              {chosenValue && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                      <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4">{t('app.reflectQuestion')}</label>
                          <textarea
                              value={reflectionText}
                              onChange={(e) => setReflectionText(e.target.value)}
                              placeholder={t('app.reflectPlaceholder')}
                              className="w-full py-6 rounded-3xl bg-slate-50 border-2 border-transparent focus:border-primary/30 focus:bg-white transition-all outline-none px-8 font-bold text-slate-700 placeholder:text-slate-300 shadow-inner min-h-[150px] resize-none"
                          />
                      </div>
                      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-sm z-20 flex justify-center">
                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            disabled={!reflectionText.trim()}
                            onClick={() => setScreen("action")}
                            className="w-full max-w-lg py-4.5 rounded-2xl bg-primary text-primary-foreground font-black text-lg shadow-lg shadow-primary/20 hover:shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-40"
                        >
                            {t('app.next')}
                            <ArrowRight size={20} />
                        </motion.button>
                      </div>
                  </motion.div>
              )}
          </motion.div>
        )}

        {/* ACTION */}
        {screen === "action" && chosenValue && (
          <motion.div key="action" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="space-y-8 pb-32">
              <div className="space-y-4">
                  <h1 className="text-3xl font-extrabold text-slate-900 leading-tight">{t('app.liveTitle')}</h1>
                  <div className="flex justify-center">
                      <div className="px-6 py-2 rounded-full bg-primary/10 text-primary font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
                          {chosenValue.emoji} {t(`values.${chosenValue.name}`)}
                      </div>
                  </div>
                  <p className="text-slate-500 text-base font-medium leading-relaxed">{t('app.liveDesc')}</p>
              </div>

              <div className="space-y-6">
                  <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4">{t('app.liveQuestion')}</label>
                      <textarea
                          value={actionText}
                          onChange={(e) => setActionText(e.target.value)}
                          placeholder={t('app.livePlaceholder')}
                          className="w-full py-6 rounded-3xl bg-slate-50 border-2 border-transparent focus:border-primary/30 focus:bg-white transition-all outline-none px-8 font-bold text-slate-700 placeholder:text-slate-300 shadow-inner min-h-[150px] resize-none"
                      />
                  </div>
                  <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-sm z-20 flex justify-center">
                    <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        disabled={!actionText.trim() || isLoading}
                        onClick={handleSave}
                        className="w-full max-w-lg py-4.5 rounded-2xl bg-primary text-primary-foreground font-black text-lg shadow-lg shadow-primary/20 hover:shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-40"
                    >
                        {isLoading ? <RefreshCw className="animate-spin" /> : <Check size={20} />}
                        {t('app.saveReflection')}
                    </motion.button>
                  </div>
              </div>
          </motion.div>
        )}

        {/* SUMMARY */}
        {screen === "summary" && savedReflection && (
          <motion.div key="summary" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}>
              <PremiumComplete
                  title={t('app.summaryTitle')}
                  message={t('app.quote')}
                  onRestart={resetActivity}
                  icon={<Target size={48} className="text-primary" />}
              >
                  <div className="space-y-4 my-8">
                      <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 space-y-6">
                          <div className="flex items-center gap-4">
                              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 text-3xl">
                                  {savedReflection.valueEmoji}
                              </div>
                              <h3 className="font-black text-slate-800 text-lg uppercase tracking-wider">{t(`values.${savedReflection.valueName}`)}</h3>
                          </div>
                          
                          <div className="space-y-4">
                              <div className="space-y-1">
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('app.reflectionLabel')}</p>
                                  <p className="text-slate-600 font-bold leading-relaxed">{savedReflection.reflection}</p>
                              </div>
                              <div className="space-y-1">
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('app.actionLabel')}</p>
                                  <p className="text-slate-600 font-bold leading-relaxed">{savedReflection.action}</p>
                              </div>
                          </div>
                      </div>
                      <p className="text-center text-slate-300 text-[10px] font-bold italic">— {t('app.quoteAuthor')}</p>
                  </div>
              </PremiumComplete>
          </motion.div>
        )}

        {/* HISTORY */}
        {screen === "history" && (
          <motion.div key="history" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="space-y-8 pb-32">
              <div className="space-y-4">
                  <h1 className="text-3xl font-extrabold text-slate-900 leading-tight">{t('app.historyTitle')}</h1>
                  <p className="text-slate-500 text-base font-medium leading-relaxed">{t('app.historyDesc')}</p>
              </div>

              {history.length === 0 ? (
                  <div className="p-12 bg-slate-50 rounded-3xl border border-slate-100 text-center space-y-6">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto text-slate-200 shadow-sm">
                          <Calendar size={32} />
                      </div>
                      <p className="text-slate-400 font-bold">{t('app.noHistory')}</p>
                      <motion.button
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={resetActivity}
                          className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-black shadow-lg shadow-primary/20"
                      >
                          {t('app.startActivity')}
                      </motion.button>
                  </div>
              ) : (
                  <div className="space-y-4">
                      {history.map((r, i) => (
                          <motion.div 
                              key={r.id} 
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.03 }}
                              className="p-6 bg-white rounded-3xl border-2 border-slate-50 shadow-sm space-y-4 relative overflow-hidden group hover:border-primary/10 transition-all"
                          >
                              <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-xl group-hover:bg-primary group-hover:text-white transition-colors">
                                          {r.valueEmoji}
                                      </div>
                                      <div>
                                          <h4 className="font-black text-slate-800 text-xs uppercase tracking-wider">{t(`values.${r.valueName}`)}</h4>
                                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{format(new Date(r.date), "MMMM d, yyyy")}</p>
                                      </div>
                                  </div>
                                  <Heart size={14} className="text-slate-100 group-hover:text-primary transition-colors" fill="currentColor" />
                              </div>
                              <div className="space-y-3">
                                  <p className="text-slate-600 text-sm font-bold leading-relaxed line-clamp-2 italic">"{r.reflection}"</p>
                                  <div className="flex items-center gap-2 text-primary font-black text-[9px] uppercase tracking-widest">
                                      <Target size={12} />
                                      Action: {r.action}
                                  </div>
                              </div>
                          </motion.div>
                      ))}
                      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-sm z-20 flex justify-center">
                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={resetActivity}
                            className="w-full max-w-lg py-4.5 rounded-2xl bg-primary text-primary-foreground font-black text-lg shadow-lg shadow-primary/20 hover:shadow-xl transition-all flex items-center justify-center gap-3"
                        >
                            <RefreshCw size={20} />
                            {t('app.startNew')}
                        </motion.button>
                      </div>
                  </div>
              )}
          </motion.div>
        )}
      </AnimatePresence>
    </PremiumLayout>
  );
};


export default Index;
