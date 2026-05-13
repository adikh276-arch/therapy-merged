import { useState, useCallback } from "react";
import { Brain, Clock, ChevronRight, MessageSquare, History } from "lucide-react";
import { useTranslation, Trans } from "react-i18next";
import BreathingCircle from "./BreathingCircle";
import { PremiumLayout } from "../../../components/shared/PremiumLayout";
import { PremiumIntro } from "../../../components/shared/PremiumIntro";
import { PremiumComplete } from "../../../components/shared/PremiumComplete";
import { motion, AnimatePresence } from "framer-motion";

type ScreenKey = "intro" | "concept" | "input_thought" | "input_name" | "practice" | "reflection" | "complete" | "history";

interface Entry {
  thought: string;
  mindName: string;
  reflection: string;
  date: string;
}

export default function NameYourMind() {
  const { t } = useTranslation();
  const [screen, setScreen] = useState<ScreenKey>("intro");
  const [thought, setThought] = useState("");
  const [mindName, setMindName] = useState("");
  const [reflection, setReflection] = useState("");
  const [history, setHistory] = useState<Entry[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("nym-history") || "[]");
    } catch {
      return [];
    }
  });

  const finish = useCallback(() => {
    const entry: Entry = {
      thought,
      mindName,
      reflection,
      date: new Date().toLocaleDateString(),
    };
    const updated = [entry, ...history].slice(0, 50);
    setHistory(updated);
    localStorage.setItem("nym-history", JSON.stringify(updated));
    setScreen("complete");
  }, [thought, mindName, reflection, history]);

  const reset = () => {
    setThought("");
    setMindName("");
    setReflection("");
    setScreen("intro");
  };

  if (screen === "intro") {
    return (
      <PremiumLayout title={t("app_title")} showBack={true}>
        <PremiumIntro
          title={t("app_title")}
          description={t("app_description")}
          onStart={() => setScreen("concept")}
          icon={<Brain size={32} />}
          benefits={t("intro.benefits", { returnObjects: true }) as string[]}
          duration={t("intro.duration")}
        />
        <div className="mt-8 flex justify-center">
          <button 
            onClick={() => setScreen("history")}
            className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest"
          >
            <History size={16} />
            {t("intro.view_past")}
          </button>
        </div>
      </PremiumLayout>
    );
  }

  if (screen === "history") {
    return (
      <PremiumLayout title={t("app_title")} onBack={() => setScreen("intro")}>
        <div className="space-y-4 max-w-lg mx-auto">
          {history.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
              <p className="text-slate-400 font-medium">{t("history.no_entries")}</p>
            </div>
          ) : (
            history.map((e, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{e.date}</span>
                  <span className="px-2 py-1 rounded-lg bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">{e.mindName}</span>
                </div>
                <p className="text-slate-900 font-bold mb-2">"{e.thought}"</p>
                <p className="text-slate-500 text-sm italic">{t("history.reflection_label", { text: e.reflection })}</p>
              </motion.div>
            ))
          )}
        </div>
      </PremiumLayout>
    );
  }

  if (screen === "complete") {
    return (
      <PremiumLayout title={t("app_title")} showBack={false}>
        <PremiumComplete
          title={t("app_title")}
          message={t("complete.message")}
          onRestart={reset}
        >
          <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10 text-center">
            <p className="text-slate-600 font-medium">
              {t("complete.footer")}
            </p>
          </div>
        </PremiumComplete>
      </PremiumLayout>
    );
  }

  return (
    <PremiumLayout 
      title={t("app_title")} 
      subtitle={
        screen === "concept" ? t("subtitles.concept") : 
        screen === "input_thought" ? t("subtitles.notice") : 
        screen === "input_name" ? t("subtitles.name") : 
        t("subtitles.practice")
      }
      onBack={() => setScreen("intro")}
      onReset={reset}
    >
      <div className="max-w-lg mx-auto min-h-[60vh] flex flex-col justify-center py-8">
        <AnimatePresence mode="wait">
          {screen === "concept" && (
            <motion.div
              key="concept"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/50 border border-slate-100 text-center space-y-8"
            >
              <h2 className="text-3xl font-black text-slate-900 leading-tight">{t("screens.concept.title")}</h2>
              <div className="py-6 px-8 bg-slate-50 rounded-3xl border border-slate-100 relative overflow-hidden group">
                <p className="text-xl italic text-slate-400 group-hover:text-slate-900 transition-colors">{t("screens.concept.example")}</p>
                <div className="absolute top-0 left-0 w-1 h-full bg-slate-200" />
              </div>
              <p className="text-lg text-slate-500 font-medium leading-relaxed">
                <Trans i18nKey="screens.concept.desc">{t("when_a_thought_shows_up_it_often_feels_like_it_s")}<span className="text-slate-900 font-bold">you</span>. But what if you could step back and <span className="text-primary font-bold">notice</span> it instead?
                </Trans>
              </p>
              <button
                onClick={() => setScreen("input_thought")}
                className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
              >
                {t("buttons.continue")}
                <ChevronRight size={20} strokeWidth={3} />
              </button>
            </motion.div>
          )}

          {screen === "input_thought" && (
            <motion.div
              key="input_thought"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/50 border border-slate-100 space-y-8"
            >
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-black text-slate-900 leading-tight">{t("screens.input_thought.title")}</h2>
                <p className="text-slate-500 font-medium">{t("screens.input_thought.desc")}</p>
              </div>
              
              <textarea
                value={thought}
                onChange={(e) => setThought(e.target.value)}
                placeholder={t("screens.input_thought.placeholder")}
                className="w-full min-h-[160px] rounded-3xl border-2 border-slate-100 bg-slate-50 p-6 text-lg text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-primary/30 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all resize-none"
              />

              <button
                disabled={!thought.trim()}
                onClick={() => setScreen("input_name")}
                className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {t("buttons.continue")}
                <ChevronRight size={20} strokeWidth={3} />
              </button>
            </motion.div>
          )}

          {screen === "input_name" && (
            <motion.div
              key="input_name"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/50 border border-slate-100 space-y-8"
            >
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-black text-slate-900 leading-tight">{t("screens.input_name.title")}</h2>
                <p className="text-slate-500 font-medium">{t("screens.input_name.desc")}</p>
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {(t("screens.input_name.examples", { returnObjects: true }) as string[]).map((name) => (
                  <button
                    key={name}
                    onClick={() => setMindName(name)}
                    className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                      mindName === name
                        ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105"
                        : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>

              <input
                value={mindName}
                onChange={(e) => setMindName(e.target.value)}
                placeholder={t("screens.input_name.placeholder")}
                className="w-full py-4 px-6 rounded-2xl border-2 border-slate-100 bg-slate-50 text-center text-lg font-bold text-slate-900 focus:outline-none focus:border-primary/30 focus:bg-white transition-all"
              />

              <button
                disabled={!mindName.trim()}
                onClick={() => setScreen("practice")}
                className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {t("buttons.continue")}
                <ChevronRight size={20} strokeWidth={3} />
              </button>
            </motion.div>
          )}

          {screen === "practice" && (
            <motion.div
              key="practice"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/50 border border-slate-100 space-y-10 text-center"
            >
              <h2 className="text-3xl font-black text-slate-900 leading-tight">{t("screens.practice.title")}</h2>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">{t("screens.practice.instead_of")}</p>
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 italic text-slate-400">
                    "{thought}"
                  </div>
                </div>

                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                  <div className="relative flex justify-center"><span className="bg-white px-4 text-[10px] font-black uppercase tracking-widest text-slate-300">{t("screens.practice.try_saying")}</span></div>
                </div>

                <div className="p-8 rounded-3xl bg-primary/5 border-2 border-primary/20 shadow-inner">
                  <p className="text-xl font-bold text-slate-900 leading-relaxed">
                    <Trans i18nKey="screens.practice.is_telling_me" values={{ name: mindName }}>
                      <span className="text-primary">{{mindName}}</span> is telling me:<br/>
                      <span className="text-2xl mt-2 block font-black">"{{thought}}"</span>
                    </Trans>
                  </p>
                </div>
              </div>

              <div className="space-y-6 pt-4">
                <div className="flex justify-center"><BreathingCircle /></div>
                <p className="text-slate-500 font-medium">{t("screens.practice.guide")}</p>
              </div>

              <button
                onClick={() => setScreen("reflection")}
                className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
              >
                {t("screens.practice.button")}
                <ChevronRight size={20} strokeWidth={3} />
              </button>
            </motion.div>
          )}

          {screen === "reflection" && (
            <motion.div
              key="reflection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/50 border border-slate-100 space-y-8"
            >
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-black text-slate-900 leading-tight">{t("screens.reflection.title")}</h2>
                <p className="text-slate-500 font-medium">{t("screens.reflection.desc")}</p>
              </div>

              <div className="space-y-3">
                {(t("screens.reflection.options", { returnObjects: true }) as string[]).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setReflection(opt)}
                    className={`w-full text-left p-5 rounded-2xl text-sm font-bold transition-all border-2 ${
                      reflection === opt
                        ? "bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-900/10 scale-[1.02]"
                        : "bg-white border-slate-100 text-slate-600 hover:border-primary/30"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              <button
                disabled={!reflection}
                onClick={finish}
                className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {t("screens.reflection.button")}
                <ChevronRight size={20} strokeWidth={3} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
}
