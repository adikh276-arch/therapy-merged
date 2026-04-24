import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { PremiumIntro } from "../../../components/shared/PremiumIntro";
import { PremiumComplete } from "../../../components/shared/PremiumComplete";
import { MoneySlider } from "../components/MoneySlider";
import { FullScreenSky } from "../components/FullScreenSky";
import { StoryNamingScreen } from "../components/StoryNamingScreen";
import { Sparkles, Brain, Cloud, Banknote, BookOpen, ArrowRight, RefreshCw } from "lucide-react";
import { PremiumLayout } from "../../../components/shared/PremiumLayout";

type View = "intro" | "choose" | "sky" | "sell" | "name";

const Index = () => {
  const { t } = useTranslation();
  const [view, setView] = useState<View>("intro");
  const [step, setStep] = useState(1);
  const [thought, setThought] = useState("");
  const [sellValue, setSellValue] = useState(50);
  const [storyName, setStoryName] = useState("");

  const reset = () => {
    setStep(1);
    setThought("");
    setSellValue(50);
    setStoryName("");
  };

  const getTitle = () => {
    switch(view) {
      case 'sky': return "Sky and Clouds";
      case 'sell': return "Sell the Thought";
      case 'name': return "Name the Story";
      case 'choose': return "Diffusion Techniques";
      default: return "Diffusion";
    }
  };

  const getSecondaryBack = () => {
    if (view === "choose") return { label: "Back to Start", action: () => setView("intro") };
    if (view !== "intro" && step !== 3) return { label: "Back to Techniques", action: () => { reset(); setView("choose"); } };
    return null;
  };

  const secBack = getSecondaryBack();

  return (
    <PremiumLayout 
      title={getTitle()} 
      onReset={view !== 'intro' ? () => { reset(); setView('intro'); } : undefined}
      onSecondaryBack={secBack?.action}
      secondaryBackLabel={secBack?.label}
    >
      <div className="w-full">
        <AnimatePresence mode="wait">
          {view === "intro" && (
            <motion.div key="intro" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
                <PremiumIntro
                    title={t('intro_title')}
                    description={t('intro_desc1')}
                    onStart={() => setView("choose")}
                    icon={<Brain size={32} />}
                    benefits={[
                        t('intro_desc2'),
                        t('intro_desc3'),
                    ]}
                />
            </motion.div>
          )}

          {view === "choose" && (
            <motion.div key="choose" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="space-y-10">
                <header className="space-y-4">
                    <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.2em]">
                        <Sparkles size={14} />
                        Choose Technique
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 leading-tight tracking-tight">{t('choose_title')}</h1>
                    <p className="text-slate-500 text-base font-bold leading-relaxed max-w-md">{t('choose_desc')}</p>
                </header>

                <div className="grid gap-4">
                    {[
                        { icon: <Cloud />, title: "Sky and Cloud", desc: t('card_sky_desc'), view: "sky" as View, color: "bg-cyan-50 text-cyan-600" },
                        { icon: <Banknote />, title: "Sell the Thought", desc: t('card_sell_desc'), view: "sell" as View, color: "bg-teal-50 text-teal-600" },
                        { icon: <BookOpen />, title: "Name the Story", desc: t('card_name_desc'), view: "name" as View, color: "bg-sky-50 text-sky-600" },
                    ].map((card, i) => (
                        <motion.button
                            key={card.title}
                            whileHover={{ scale: 1.02, x: 5 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => { reset(); setView(card.view); }}
                            className="w-full text-left p-8 rounded-[2.5rem] bg-white border-2 border-slate-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all flex items-center gap-6 group"
                        >
                            <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center shrink-0 ${card.color} group-hover:bg-primary group-hover:text-white transition-all`}>
                                {card.icon}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-black text-slate-800 text-lg group-hover:text-primary transition-colors">{card.title}</h3>
                                <p className="text-slate-400 text-xs font-bold leading-relaxed mt-1.5">{card.desc}</p>
                            </div>
                            <ArrowRight className="text-slate-200 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </motion.button>
                    ))}
                </div>
            </motion.div>
          )}

          {view === "sky" && (
            <div className="w-full">
                <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div key="sky1" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="space-y-10">
                        <div className="space-y-4">
                            <h1 className="text-4xl font-black text-slate-900 leading-tight tracking-tight">{t('sky_title')}</h1>
                            <div className="space-y-4 text-slate-500 text-lg font-bold leading-relaxed">
                                <p>{t('sky_intro_1')}</p>
                                <p>{t('sky_intro_2')}</p>
                            </div>
                        </div>
                        <div className="p-10 bg-white rounded-[3rem] border-2 border-slate-100 shadow-sm space-y-4 group hover:border-primary/20 transition-all">
                            <p className="text-slate-600 text-base font-bold leading-relaxed italic">{t('sky_intro_5')}</p>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setStep(2)}
                            className="w-full py-5 rounded-[2rem] bg-primary text-primary-foreground font-black text-lg shadow-xl shadow-primary/20 hover:shadow-2xl transition-all flex items-center justify-center gap-3"
                        >
                            {t('btn_begin_exercise')}
                            <ArrowRight size={20} />
                        </motion.button>
                    </motion.div>
                )}
                {step === 2 && (
                    <motion.div key="sky2" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="space-y-10">
                        <div className="space-y-4">
                            <h1 className="text-3xl font-black text-slate-900 leading-tight tracking-tight">{t('sky_question')}</h1>
                            <p className="text-slate-500 text-base font-bold leading-relaxed">{t('sky_hint')}</p>
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest px-4">Your current thought</label>
                            <textarea
                                value={thought}
                                onChange={(e) => setThought(e.target.value)}
                                placeholder={t('sky_placeholder')}
                                className="w-full py-8 rounded-[2.5rem] bg-slate-50 border-2 border-transparent focus:border-primary/50 focus:bg-white transition-all outline-none px-10 font-black text-slate-700 placeholder:text-slate-200 shadow-inner min-h-[180px] resize-none"
                            />
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={!thought.trim()}
                            onClick={() => setStep(3)}
                            className="w-full py-5 rounded-[2rem] bg-primary text-primary-foreground font-black text-lg shadow-xl shadow-primary/20 hover:shadow-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-40"
                        >
                            {t('btn_place_on_cloud')}
                            <Cloud size={20} />
                        </motion.button>
                    </motion.div>
                )}
                {step === 3 && (
                    <FullScreenSky key="sky3" thought={thought} onNext={() => setStep(4)} />
                )}
                {step === 4 && (
                    <motion.div key="sky4" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
                        <PremiumComplete
                            title={t('conclusion_sky_title')}
                            message={t('conclusion_sky_desc1') + " " + t('conclusion_sky_desc2')}
                            onRestart={() => { reset(); setView("choose"); }}
                            icon={<Cloud size={48} />}
                        >
                             <div className="flex flex-col gap-3 mt-8">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => { reset(); setView("choose"); }}
                                    className="w-full py-5 rounded-[2rem] bg-white border-2 border-slate-100 text-slate-600 font-black text-xs uppercase tracking-widest shadow-sm flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"
                                >
                                    <RefreshCw size={18} />
                                    {t('btn_try_another')}
                                </motion.button>
                            </div>
                        </PremiumComplete>
                    </motion.div>
                )}
                </AnimatePresence>
            </div>
          )}

          {view === "sell" && (
            <div className="w-full">
                <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div key="sell1" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="space-y-10">
                        <div className="space-y-4">
                            <h1 className="text-4xl font-black text-slate-900 leading-tight tracking-tight">{t('sell_title')}</h1>
                            <div className="space-y-4 text-slate-500 text-lg font-bold leading-relaxed">
                                <p>{t('sell_intro_1')}</p>
                                <p>{t('sell_intro_2')}</p>
                            </div>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setStep(2)}
                            className="w-full py-5 rounded-[2rem] bg-primary text-primary-foreground font-black text-lg shadow-xl shadow-primary/20 hover:shadow-2xl transition-all flex items-center justify-center gap-3"
                        >
                            {t('btn_begin_exercise')}
                            <ArrowRight size={20} />
                        </motion.button>
                    </motion.div>
                )}
                {step === 2 && (
                    <motion.div key="sell2" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="space-y-10">
                        <div className="space-y-4">
                            <h1 className="text-3xl font-black text-slate-900 leading-tight tracking-tight">{t('sell_question')}</h1>
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest px-4">Your current thought</label>
                            <input
                                type="text"
                                value={thought}
                                onChange={(e) => setThought(e.target.value)}
                                placeholder={t('placeholder_sell')}
                                className="w-full py-8 rounded-[2rem] bg-slate-50 border-2 border-transparent focus:border-primary/50 focus:bg-white transition-all outline-none px-10 font-black text-slate-700 placeholder:text-slate-200 shadow-inner"
                            />
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={!thought.trim()}
                            onClick={() => setStep(3)}
                            className="w-full py-5 rounded-[2rem] bg-primary text-primary-foreground font-black text-lg shadow-xl shadow-primary/20 hover:shadow-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-40"
                        >
                            {t('btn_continue')}
                            <ArrowRight size={20} />
                        </motion.button>
                    </motion.div>
                )}
                {step === 3 && (
                    <motion.div key="sell3" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="space-y-10">
                        <div className="space-y-4">
                            <h1 className="text-3xl font-black text-slate-900 leading-tight tracking-tight">{t('sell_cost_question')}</h1>
                            <p className="text-slate-500 text-base font-bold leading-relaxed">{t('sell_cost_hint')}</p>
                        </div>
                        <div className="p-10 bg-white rounded-[3rem] border-2 border-slate-100 shadow-sm hover:border-primary/20 transition-all">
                            <MoneySlider value={sellValue} onChange={setSellValue} />
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setStep(4)}
                            className="w-full py-5 rounded-[2rem] bg-primary text-primary-foreground font-black text-lg shadow-xl shadow-primary/20 hover:shadow-2xl transition-all flex items-center justify-center gap-3"
                        >
                            {t('btn_next')}
                            <ArrowRight size={20} />
                        </motion.button>
                    </motion.div>
                )}
                {step === 4 && (
                    <motion.div key="sell4" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
                        <PremiumComplete
                            title={sellValue < 30 ? t('sell_result_low_title') : sellValue < 70 ? t('sell_result_mid_title') : t('sell_result_high_title')}
                            message={sellValue < 30 ? t('sell_result_low_desc1') : sellValue < 70 ? t('sell_result_mid_desc1') : t('sell_result_high_desc1')}
                            onRestart={() => { reset(); setView("choose"); }}
                            icon={<Banknote size={48} />}
                        >
                            <div className="flex flex-col gap-3 mt-8">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => { reset(); setView("choose"); }}
                                    className="w-full py-5 rounded-[2rem] bg-white border-2 border-slate-100 text-slate-600 font-black text-xs uppercase tracking-widest shadow-sm flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"
                                >
                                    <RefreshCw size={18} />
                                    {t('btn_try_another')}
                                </motion.button>
                            </div>
                        </PremiumComplete>
                    </motion.div>
                )}
                </AnimatePresence>
            </div>
          )}

          {view === "name" && (
            <div className="w-full">
                <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div key="name1" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="space-y-10">
                        <div className="space-y-4">
                            <h1 className="text-4xl font-black text-slate-900 leading-tight tracking-tight">{t('name_title')}</h1>
                            <div className="space-y-4 text-slate-500 text-lg font-bold leading-relaxed">
                                <p>{t('name_intro_1')}</p>
                                <p>{t('name_intro_2')}</p>
                            </div>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setStep(2)}
                            className="w-full py-5 rounded-[2rem] bg-primary text-primary-foreground font-black text-lg shadow-xl shadow-primary/20 hover:shadow-2xl transition-all flex items-center justify-center gap-3"
                        >
                            {t('btn_begin_exercise')}
                            <ArrowRight size={20} />
                        </motion.button>
                    </motion.div>
                )}
                {step === 2 && (
                    <motion.div key="name2" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="space-y-10">
                        <div className="space-y-4">
                            <h1 className="text-3xl font-black text-slate-900 leading-tight tracking-tight">{t('name_question')}</h1>
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest px-4">The recurrent thought</label>
                            <input
                                type="text"
                                value={thought}
                                onChange={(e) => setThought(e.target.value)}
                                placeholder={t('placeholder_name')}
                                className="w-full py-8 rounded-[2rem] bg-slate-50 border-2 border-transparent focus:border-primary/50 focus:bg-white transition-all outline-none px-10 font-black text-slate-700 placeholder:text-slate-200 shadow-inner"
                            />
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={!thought.trim()}
                            onClick={() => setStep(3)}
                            className="w-full py-5 rounded-[2rem] bg-primary text-primary-foreground font-black text-lg shadow-xl shadow-primary/20 hover:shadow-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-40"
                        >
                            {t('btn_continue_simple')}
                            <ArrowRight size={20} />
                        </motion.button>
                    </motion.div>
                )}
                {step === 3 && (
                    <StoryNamingScreen
                        key="name3"
                        storyName={storyName}
                        onStoryNameChange={setStoryName}
                        onContinue={() => setStep(4)}
                        currentStep={3}
                        totalSteps={4}
                    />
                )}
                {step === 4 && (
                    <motion.div key="name4" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
                        <PremiumComplete
                            title={t('conclusion_name_title')}
                            message={`${t('conclusion_name_desc1')} ${t('conclusion_name_desc2')}`}
                            onRestart={() => { reset(); setView("choose"); }}
                            icon={<BookOpen size={48} />}
                        >
                            <div className="p-10 bg-slate-900 rounded-[3rem] text-white my-10 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 text-white/5 pointer-events-none">
                                    <BookOpen size={120} strokeWidth={1} />
                                </div>
                                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4 relative z-10">Remember to say:</p>
                                <p className="text-2xl font-bold italic leading-tight relative z-10">
                                    "{t('conclusion_name_phrase_prefix')} {storyName} {t('conclusion_name_phrase_suffix')}"
                                </p>
                            </div>
                            <div className="flex flex-col gap-3">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => { reset(); setView("choose"); }}
                                    className="w-full py-5 rounded-[2rem] bg-white border-2 border-slate-100 text-slate-600 font-black text-xs uppercase tracking-widest shadow-sm flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"
                                >
                                    <RefreshCw size={18} />
                                    {t('btn_try_another')}
                                </motion.button>
                            </div>
                        </PremiumComplete>
                    </motion.div>
                )}
                </AnimatePresence>
            </div>
          )}
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
};

export default Index;
