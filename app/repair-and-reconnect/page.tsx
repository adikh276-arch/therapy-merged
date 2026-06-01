'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Save, ArrowLeft, ChevronRight, Copy, CheckCircle } from "lucide-react";
import { useTranslation, I18nextProvider } from "react-i18next";
import i18n, { loadLocale } from "./i18n";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { PremiumComplete } from "@/components/shared/PremiumComplete";
import { apiPath } from '@/lib/apiPath';

type Approach = { id: string; label: string; emoji: string };

function RepairReconnectInner() {
  const { t } = useTranslation(undefined, { i18n });
  const [step, setStep] = useState(0);
  const [person, setPerson] = useState("");
  const [approach, setApproach] = useState("");
  const [editedMsg, setEditedMsg] = useState("");
  const [selectedMsgIdx, setSelectedMsgIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Sync URL query lang parameter
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const lang = params.get('lang') || 'en';
      loadLocale(lang);
    }
  }, []);

  const next = () => setStep((s) => s + 1);
  
  const reset = () => {
    setStep(0);
    setPerson("");
    setApproach("");
    setEditedMsg("");
    setSelectedMsgIdx(0);
    setRevealed(false);
    setCopied(false);
  };

  const done = async () => {
    setIsSaving(true);
    const id = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9);
    const repairData = { person, approach, message: editedMsg, completedAt: new Date().toISOString() };

    try {
      const res = await fetch(apiPath("/api/repair-and-reconnect"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, repairData }),
      });

      if (res.ok) {
        setStep(4); // Complete screen
      }
    } catch (error) {
      console.error("Failed to save repair entry:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const personOptions = [
    { id: "friend", label: t("choose_person.options.friend", "A Friend"), emoji: "🤝" },
    { id: "family", label: t("choose_person.options.family", "A Family Member"), emoji: "🏠" },
    { id: "colleague", label: t("choose_person.options.colleague", "A Colleague"), emoji: "💼" },
    { id: "other", label: t("choose_person.options.other", "Someone Else"), emoji: "👤" },
  ];

  const approaches = (t(`choose_approach.approaches.${person}`, { returnObjects: true }) || 
                      t(`choose_approach.approaches.other`, { returnObjects: true })) as Approach[];

  const actionData = t(`guided_action.actions.${approach}`, { returnObjects: true }) as any;
  const emojiMap: Record<string, string> = {
    message: "💬",
    acknowledge: "🫶",
    pause: "⏸️",
    letgo: "🍃",
    reflect: "💭"
  };

  // Sync edited message when template action data changes
  useEffect(() => {
    if (actionData?.prompts?.[0]) {
      setEditedMsg(actionData.prompts[0]);
      setSelectedMsgIdx(0);
    }
  }, [actionData]);

  const handleSelectMsg = (idx: number, val: string) => {
    setSelectedMsgIdx(idx);
    setEditedMsg(val);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(editedMsg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const safetyLine = approach === "pause" ? t("guided_action.safety_line_pause", "Take your time—there's no rush. 💛") : 
                    approach === "reflect" ? t("guided_action.safety_line_reflect", "This is just for you—no one else needs to see this. 💛") : 
                    t("guided_action.safety_line_default", "You don't have to send anything right now. 💛");

  const personLabel = person ? (t(`choose_person.options.${person}`) || person) : t("complete.default_person", "someone important");

  if (step === 4) {
    return (
      <PremiumLayout title={t("app_title", "Repair & Reconnect")} showBack={false}>
        <PremiumComplete
          title={t("app_title", "Repair & Reconnect")}
          message={t("complete.message", `You've taken a brave step toward repairing your connection with {{person}}. Small, intentional actions build lasting bridges.`, { person: personLabel })}
          onRestart={reset}
        />
      </PremiumLayout>
    );
  }

  const titles = [
    t("steps.welcome", "Welcome"),
    t("steps.choose_person", "Choose Person"),
    t("steps.choose_approach", "Choose Approach"),
    t("steps.guided_action", "Guided Action")
  ];

  return (
    <PremiumLayout
      title={t("app_title", "Repair & Reconnect")}
      subtitle={titles[step]} 
      icon={<Heart className="w-6 h-6 text-primary" />}
      onBack={step > 0 ? () => setStep(prev => prev - 1) : undefined}
      onReset={step > 0 ? reset : undefined}
    >
      <div className="w-full max-w-md mx-auto flex flex-col min-h-[60vh] select-none relative">
        <div className="flex justify-center gap-1.5 mb-8">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i <= step ? "w-8 bg-primary" : "w-1.5 bg-slate-200"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* STEP 0: WELCOME INTRO */}
          {step === 0 && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="glass-card p-8 text-center space-y-6 relative rounded-[2.5rem] bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between"
            >
              <div className="text-6xl mt-4">🤝</div>

              <h1 className="text-3xl font-black text-slate-800 leading-tight">
                {t("intro.title", "Repair & Reconnect")}
              </h1>

              <p className="text-slate-500 text-sm font-semibold leading-relaxed max-w-xs mx-auto">
                {t("intro.description", "Anger can create distance between us and the people we care about. But small, gentle steps can help rebuild that connection.")}
              </p>

              <div className="bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 border border-white/60 rounded-2xl p-5 italic text-slate-500 text-xs font-bold leading-relaxed text-center">
                {t("intro.quote", "\"Repair doesn't mean you were wrong—it means you care enough to try.\"")}
              </div>

              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                {t("intro.small_efforts", "Even small efforts can make a difference.")}
              </p>

              <button 
                onClick={next} 
                className="w-full py-4.5 bg-slate-900 text-white shadow-md font-bold rounded-2xl shadow-lg hover:opacity-90 hover:shadow-xl hover:shadow-primary/40 transition-all flex items-center justify-center gap-2"
              >
                {t("intro.button", "Start Reflection")} <ChevronRight size={18} />
              </button>
            </motion.div>
          )}

          {/* STEP 1: CHOOSE PERSON */}
          {step === 1 && (
            <motion.div
              key="person"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="bg-white/60 backdrop-blur-lg border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 rounded-[2.5rem] shadow-xl space-y-6 text-left"
            >
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-black text-slate-850">
                  {t("choose_person.title", "Who would you like to reconnect with?")}
                </h2>
                <p className="text-slate-450 text-xs font-semibold">
                  {t("choose_person.desc", "Thinking about a specific relationship helps make the steps feel real.")}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                {personOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setPerson(opt.id)}
                    className={`p-5 rounded-[2rem] border flex flex-col items-center gap-3 transition-all ${
                      person === opt.id
                        ? "border-primary bg-primary/5 text-primary scale-105 shadow-md"
                        : "border-white/60 bg-white text-slate-650 hover:bg-slate-50"
                    }`}
                  >
                    <span className="text-4xl">{opt.emoji}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-center leading-tight">
                      {opt.label}
                    </span>
                  </button>
                ))}
              </div>

              <button
                onClick={next}
                disabled={!person}
                className="w-full py-4 rounded-2xl bg-slate-900 text-white shadow-md font-bold disabled:opacity-30 disabled:pointer-events-none mt-4"
              >
                {t("choose_person.button", "Continue")}
              </button>
            </motion.div>
          )}

          {/* STEP 2: CHOOSE APPROACH */}
          {step === 2 && (
            <motion.div
              key="approach"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/60 backdrop-blur-lg border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 rounded-[2.5rem] shadow-xl space-y-6 text-left"
            >
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-black text-slate-850">
                  {t("choose_approach.title", "What feels right for you?")}
                </h2>
                <p className="text-slate-450 text-xs font-semibold">
                  {t("choose_approach.desc", "Pick one small step that feels doable.")}
                </p>
              </div>

              <div className="space-y-2.5 max-h-[30vh] overflow-y-auto pr-1">
                {Array.isArray(approaches) && approaches.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => setApproach(a.id)}
                    className={`w-full p-4 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                      approach === a.id
                        ? "border-primary bg-primary/5 text-primary shadow-sm"
                        : "border-white/60 bg-white text-slate-600 hover:border-primary/25"
                    }`}
                  >
                    <span className="text-xl">{a.emoji}</span>
                    <span className="font-bold text-xs uppercase tracking-wider">{a.label}</span>
                  </button>
                ))}
              </div>

              <p className="text-[10px] text-slate-450 font-semibold text-center leading-relaxed">
                {t("choose_approach.safety", "You don't have to fix everything—just choose one small step.")}
              </p>

              <button
                onClick={next}
                disabled={!approach}
                className="w-full py-4 rounded-2xl bg-slate-900 text-white shadow-md font-bold disabled:opacity-30"
              >
                {t("choose_approach.button", "Try This")}
              </button>
            </motion.div>
          )}

          {/* STEP 3: GUIDED ACTION */}
          {step === 3 && actionData && (
            <motion.div
              key="action"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-5 text-left"
            >
              {/* Action Banner */}
              <div className="bg-white/60 backdrop-blur-lg border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-6 shadow-xl text-center space-y-3">
                <div className="text-5xl">{emojiMap[approach] || "✨"}</div>
                <h2 className="text-xl font-black text-slate-850">{actionData.title}</h2>
                <p className="text-slate-500 font-semibold text-xs leading-relaxed max-w-xs mx-auto">{actionData.why}</p>
                <div className="bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 rounded-2xl p-4.5 border border-white/60/50">
                  <p className="text-[11px] text-slate-650 font-bold leading-relaxed">💡 {actionData.insight}</p>
                </div>
              </div>

              {/* Reveal Instruction */}
              <button
                onClick={() => setRevealed(true)}
                className="w-full bg-white/60 backdrop-blur-lg border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-5 rounded-3xl text-left space-y-1.5 shadow-sm hover:shadow-md transition-all"
              >
                <p className="font-extrabold text-sm text-slate-800">{actionData.howTitle}</p>
                <AnimatePresence mode="wait">
                  {!revealed ? (
                    <motion.p
                      key="tap"
                      exit={{ opacity: 0 }}
                      className="text-[11px] font-black text-primary uppercase tracking-wider"
                    >
                      {t("guided_action.tap_reveal", "Tap to see how ✨")}
                    </motion.p>
                  ) : (
                    <motion.p
                      key="content"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="text-xs text-slate-500 font-semibold leading-relaxed"
                    >
                      {actionData.howBody}
                    </motion.p>
                  )}
                </AnimatePresence>
              </button>

              {/* Choose templates */}
              <div className="space-y-2">
                <p className="text-[10px] font-black text-slate-450 uppercase tracking-widest pl-1">
                  {actionData.promptLabel}
                </p>
                <div className="space-y-2">
                  {actionData.prompts.map((msg: string, i: number) => (
                    <button
                      key={i}
                      onClick={() => handleSelectMsg(i, msg)}
                      className={`w-full bg-white border p-4 rounded-2xl text-left transition-all ${
                        selectedMsgIdx === i ? "border-primary bg-primary/5 ring-2 ring-primary/10 shadow-sm" : "border-white/60"
                      }`}
                    >
                      <p className="text-xs text-slate-700 font-bold leading-relaxed">"{msg}"</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom message field */}
              <div className="space-y-2">
                <p className="text-[10px] font-black text-slate-450 uppercase tracking-widest pl-1">
                  {actionData.editLabel}
                </p>
                <textarea
                  value={editedMsg}
                  onChange={(e) => setEditedMsg(e.target.value)}
                  rows={3}
                  className="w-full bg-white/60 backdrop-blur-md border border-white/60 shadow-inner rounded-2xl p-4 font-semibold text-xs text-slate-750 resize-none focus:outline-none focus:border-primary transition-all shadow-inner"
                />
              </div>

              {/* Actions panel */}
              <div className="flex flex-col gap-3">
                <div className="flex gap-2 w-full">
                  {(approach === "message" || approach === "acknowledge") && (
                    <button
                      onClick={handleCopy}
                      className="flex-1 bg-white border border-slate-200 py-3.5 rounded-2xl text-slate-650 font-bold text-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                    >
                      <Copy size={16} />
                      {copied ? t("common.copied", "Copied!") : t("guided_action.copy_button", "Copy")}
                    </button>
                  )}
                  <button
                    onClick={done}
                    disabled={isSaving}
                    className="flex-1 bg-slate-900 text-white shadow-md py-3.5 rounded-2xl font-bold text-sm hover:opacity-90 hover:shadow-xl hover:shadow-primary/40 transition-all flex items-center justify-center gap-2"
                  >
                    <Save size={16} />
                    {isSaving ? t("toasts.preserving", "Saving...") : t("toasts.complete_button", "Complete & Save")}
                  </button>
                </div>
                
                {/* Safety Line */}
                <p className="text-[10px] text-slate-400 font-bold text-center italic">
                  {safetyLine}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
}

export default function RepairReconnectPage() {
  return (
    <I18nextProvider i18n={i18n}>
      <RepairReconnectInner />
    </I18nextProvider>
  );
}
