'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation, I18nextProvider } from "react-i18next";
import { Utensils, Save, ChevronRight, Sparkles } from "lucide-react";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { PremiumComplete } from "@/components/shared/PremiumComplete";
import i18n, { loadLocale } from "./i18n";

type Screen =
  | "intro"
  | "identify"
  | "feeling"
  | "challenge"
  | "takeaway"
  | "close";

const SCREENS: Screen[] = [
  "intro",
  "identify",
  "feeling",
  "challenge",
  "takeaway",
  "close",
];

function ChallengingFoodRulesInner() {
  const { t } = useTranslation(undefined, { i18n });
  const [screen, setScreen] = useState<Screen>("intro");
  const [rule, setRule] = useState("");
  const [customRule, setCustomRule] = useState("");
  const [feeling, setFeeling] = useState("");
  const [customFeeling, setCustomFeeling] = useState("");
  const [challengeChoice, setChallengeChoice] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Sync lang param
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const lang = params.get('lang') || 'en';
      loadLocale(lang);
    }
  }, []);

  const goNext = () => {
    const idx = SCREENS.indexOf(screen);
    if (idx < SCREENS.length - 1) setScreen(SCREENS[idx + 1]);
  };

  const saveRule = async () => {
    setIsSaving(true);
    // Simulate database saving or save locally if needed, but since we don't have database table for this feature, we simulate save
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSaving(false);
    setScreen("close");
  };

  const resetFlow = () => {
    setScreen("intro");
    setRule("");
    setCustomRule("");
    setFeeling("");
    setCustomFeeling("");
    setChallengeChoice("");
  };

  if (screen === "close") {
    return (
      <PremiumLayout title={t("app_title")}>
        <PremiumComplete
          title={t("app_title")}
          message={t("complete_message")}
          onRestart={resetFlow}
        />
      </PremiumLayout>
    );
  }

  const selectedRule = rule === "__custom" ? customRule : rule;
  const selectedFeeling = feeling === "__custom" ? customFeeling : feeling;

  const tReflections = t("reflections", { returnObjects: true });
  const reflections = (typeof tReflections === 'object' && tReflections !== null && !Array.isArray(tReflections) ? tReflections as any : {}) as Record<string, string>;
  const tTitles = t("screen_titles", { returnObjects: true });
  const titles = (typeof tTitles === 'object' && tTitles !== null && !Array.isArray(tTitles) ? tTitles as any : {}) as Record<string, string>;

  const currentIdx = SCREENS.indexOf(screen);

  const ruleOptions = t("rule_options", { returnObjects: true }) as string[];
  const feelingOptions = t("feeling_options", { returnObjects: true }) as string[];

  return (
    <PremiumLayout
      title={t("app_title")}
      subtitle={titles?.[screen] || ""}
      icon={<Utensils className="w-6 h-6 text-primary" />}
      onBack={currentIdx > 0 ? () => setScreen(SCREENS[currentIdx - 1]) : undefined}
      onReset={currentIdx > 0 ? resetFlow : undefined}
    >
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-4 min-h-[70vh]">
        <div className="flex justify-center gap-2 mb-10">
          {SCREENS.slice(0, 5).map((s, i) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-500 ${i <= currentIdx ? "w-8 bg-primary" : "w-2 bg-slate-200"}`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex-1 flex flex-col gap-8"
          >
            {screen === "intro" && (
              <div className="flex-1 flex flex-col gap-10 text-center justify-center">
                <div className="relative overflow-hidden rounded-[3rem] bg-white/70 backdrop-blur-xl border border-white/80 p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                  <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-4xl">
                    🌿
                  </div>
                  <h1 className="text-3xl font-black text-slate-800 mb-4 leading-tight">
                    {t("welcome_title")}
                  </h1>
                  <p className="text-slate-650 font-medium leading-relaxed text-base">
                    {t("welcome_subtitle")}
                  </p>
                </div>
                <button
                  onClick={goNext}
                  className="w-full bg-gradient-to-r from-primary to-sky-400 text-white shadow-lg shadow-primary/30 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:opacity-90 hover:shadow-xl hover:shadow-primary/40 transition-all flex items-center justify-center gap-3"
                >
                  {t("begin_button")}
                  <ChevronRight size={20} strokeWidth={3} />
                </button>
              </div>
            )}

            {screen === "identify" && (
              <div className="space-y-8">
                <header className="text-center space-y-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t("rule_label")}</span>
                  <h2 className="text-2xl font-black text-slate-800 leading-tight">{t("rule_question")}</h2>
                </header>
                <div className="space-y-4">
                  {Array.isArray(ruleOptions) && ruleOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setRule(opt)}
                      className={`w-full text-left p-6 rounded-2xl border transition-all ${rule === opt ? "bg-primary/10 border-primary/30 text-primary shadow-lg shadow-primary/5 backdrop-blur-md" : "bg-white/50 backdrop-blur-md border-white/50 shadow-sm text-slate-600 hover:bg-white/80 hover:shadow-md"}`}
                    >
                      <span className="font-bold text-base">{opt}</span>
                    </button>
                  ))}
                  <button
                    onClick={() => setRule("__custom")}
                    className={`w-full text-left p-6 rounded-2xl border transition-all ${rule === "__custom" ? "bg-primary/10 border-primary/30 text-primary shadow-lg shadow-primary/5 backdrop-blur-md" : "bg-white/50 backdrop-blur-md border-white/50 shadow-sm text-slate-600 hover:bg-white/80 hover:shadow-md"}`}
                  >
                    <span className="font-bold text-base">{t("rule_something_else")}</span>
                  </button>
                </div>
                {rule === "__custom" && (
                  <textarea
                    className="w-full bg-white/60 backdrop-blur-md border border-white/60 shadow-inner rounded-2xl p-6 text-base font-bold min-h-[120px] focus:border-primary/30 outline-none transition-all resize-none"
                    placeholder={t("rule_placeholder")}
                    value={customRule}
                    onChange={(e) => setCustomRule(e.target.value)}
                  />
                )}
                <button
                  onClick={goNext}
                  disabled={!selectedRule}
                  className="w-full bg-gradient-to-r from-primary to-sky-400 text-white shadow-lg shadow-primary/30 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:opacity-90 hover:shadow-xl hover:shadow-primary/40 transition-all disabled:opacity-20 flex items-center justify-center gap-3"
                >
                  {t("continue_button")}
                  <ChevronRight size={20} strokeWidth={3} />
                </button>
              </div>
            )}

            {screen === "feeling" && (
              <div className="space-y-8">
                <header className="text-center space-y-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t("feeling_label")}</span>
                  <h2 className="text-2xl font-black text-slate-800 leading-tight">{t("feeling_question")}</h2>
                </header>
                <div className="grid grid-cols-2 gap-4">
                  {Array.isArray(feelingOptions) && feelingOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setFeeling(opt)}
                      className={`p-6 rounded-3xl border text-center transition-all ${feeling === opt ? "bg-primary/10 border-primary/30 text-primary shadow-lg shadow-primary/5 backdrop-blur-md shadow-lg shadow-primary/5" : "bg-white/50 backdrop-blur-md border-white/50 shadow-sm text-slate-600 hover:bg-white/80 hover:shadow-md"}`}
                    >
                      <span className="font-bold text-sm">{opt}</span>
                    </button>
                  ))}
                </div>
                <button
                  onClick={goNext}
                  disabled={!selectedFeeling}
                  className="w-full bg-gradient-to-r from-primary to-sky-400 text-white shadow-lg shadow-primary/30 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:opacity-90 hover:shadow-xl hover:shadow-primary/40 transition-all disabled:opacity-20 flex items-center justify-center gap-3"
                >
                  {t("next_button", "Next")}
                  <ChevronRight size={20} strokeWidth={3} />
                </button>
              </div>
            )}

            {screen === "challenge" && (
              <div className="space-y-8">
                <header className="text-center space-y-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t("challenge_label")}</span>
                  <h2 className="text-2xl font-black text-slate-800 leading-tight">{t("challenge_question")}</h2>
                </header>
                <div className="space-y-4">
                  {reflections && Object.keys(reflections).map((opt) => (
                    <div key={opt} className="space-y-3">
                      <button
                        onClick={() => setChallengeChoice(opt)}
                        className={`w-full text-left p-6 rounded-2xl border transition-all ${challengeChoice === opt ? "bg-slate-850 text-white border-slate-850 shadow-xl" : "bg-white/50 backdrop-blur-md border-white/50 shadow-sm text-slate-600 hover:bg-white/80 hover:shadow-md"}`}
                      >
                        <span className="font-bold text-base">{opt}</span>
                      </button>
                      <AnimatePresence>
                        {challengeChoice === opt && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
                              <p className="text-amber-900 text-sm font-bold italic leading-relaxed">{reflections[opt]}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
                <button
                  onClick={goNext}
                  disabled={!challengeChoice}
                  className="w-full bg-gradient-to-r from-primary to-sky-400 text-white shadow-lg shadow-primary/30 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:opacity-90 hover:shadow-xl hover:shadow-primary/40 transition-all disabled:opacity-20 flex items-center justify-center gap-3"
                >
                  {t("continue_button")}
                  <ChevronRight size={20} strokeWidth={3} />
                </button>
              </div>
            )}

            {screen === "takeaway" && (
              <div className="flex-1 flex flex-col gap-10 text-center justify-center">
                <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-[3rem] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-8 text-left relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-8 text-primary/10">
                    <Sparkles size={64} />
                  </div>
                  <header className="space-y-2">
                    <span className="inline-block rounded-full bg-primary/5 text-primary px-4 py-1.5 text-[10px] font-black uppercase tracking-widest">
                      {t("your_reflection")}
                    </span>
                    <h3 className="text-2xl font-black text-slate-800">{t("reflection_saved")}</h3>
                  </header>
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t("label_rule", "Rule")}</p>
                      <p className="text-slate-700 font-bold text-lg">{selectedRule}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t("label_feeling", "Feeling")}</p>
                      <p className="text-slate-700 font-bold text-lg">{selectedFeeling}</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={saveRule}
                  disabled={isSaving}
                  className="w-full bg-gradient-to-r from-primary to-sky-400 text-white shadow-lg shadow-primary/30 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:opacity-90 hover:shadow-xl hover:shadow-primary/40 transition-all flex items-center justify-center gap-3"
                >
                  <Save size={20} strokeWidth={3} />
                  {isSaving ? t("preserving", "Preserving...") : t("preserve_button", "Preserve Insight")}
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
}

export default function ChallengingFoodRulesPage() {
  return (
    <I18nextProvider i18n={i18n}>
      <ChallengingFoodRulesInner />
    </I18nextProvider>
  );
}
