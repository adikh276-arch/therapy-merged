'use client';

import { useState, useRef, useEffect } from 'react';
import { Save, Moon, ChevronRight, ChevronLeft, Sun, Lightbulb, PhoneOff, Ban, Bath, Pen, Target, Play } from "lucide-react";
import { useTranslation, I18nextProvider } from "react-i18next";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { PremiumComplete } from "@/components/shared/PremiumComplete";
import { motion, AnimatePresence } from "framer-motion";
import i18n, { loadLocale } from './i18n';
import { apiPath } from '@/lib/apiPath';

const toast = {
  success: (msg: string) => console.log("SUCCESS:", msg),
  error: (msg: string) => {
    console.error("ERROR:", msg);
    if (typeof window !== "undefined") {
      window.alert(msg);
    }
  }
};

// --- TIMEPICKER ---
interface TimePickerProps {
  hour: number;
  minute: number;
  amPm: 'AM' | 'PM';
  onHourChange: (h: number) => void;
  onMinuteChange: (m: number) => void;
  onAmPmChange: (v: 'AM' | 'PM') => void;
}

const TimePicker = ({ hour, minute, amPm, onHourChange, onMinuteChange, onAmPmChange }: TimePickerProps) => {
  const cycleHour = (dir: 1 | -1) => {
    let next = hour + dir;
    if (next > 12) next = 1;
    if (next < 1) next = 12;
    onHourChange(next);
  };

  const cycleMinute = (dir: 1 | -1) => {
    const steps = [0, 15, 30, 45];
    const idx = steps.indexOf(minute);
    const next = (idx + dir + 4) % 4;
    onMinuteChange(steps[next]);
  };

  return (
    <div className="flex items-center justify-center gap-2 py-4">
      <div className="flex flex-col items-center">
        <button className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-primary transition-colors" onClick={() => cycleHour(1)}>▲</button>
        <div className="text-3xl font-bold text-slate-800 w-12 text-center">{hour}</div>
        <button className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-primary transition-colors" onClick={() => cycleHour(-1)}>▼</button>
      </div>
      <div className="text-3xl font-bold text-slate-800 pb-1">:</div>
      <div className="flex flex-col items-center">
        <button className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-primary transition-colors" onClick={() => cycleMinute(1)}>▲</button>
        <div className="text-3xl font-bold text-slate-800 w-12 text-center">{String(minute).padStart(2, '0')}</div>
        <button className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-primary transition-colors" onClick={() => cycleMinute(-1)}>▼</button>
      </div>
      <div className="flex flex-col gap-2 ml-4">
        {(['AM', 'PM'] as const).map(v => (
          <button key={v} onClick={() => onAmPmChange(v)} className={`w-12 h-8 rounded-lg text-xs font-bold transition-all border ${amPm === v ? 'bg-primary border-primary text-white' : 'bg-transparent border-slate-200 text-slate-500 hover:border-slate-300'}`}>
            {v}
          </button>
        ))}
      </div>
    </div>
  );
};

// --- WAKE TIME HELPERS ---
function formatTime(hour: number, minute: number, amPm: 'AM' | 'PM') {
  return `${hour}:${String(minute).padStart(2, '0')} ${amPm}`;
}

function calcBedtime(wakeHour: number, wakeMinute: number, wakeAmPm: 'AM' | 'PM', duration: number) {
  let wake24 = wakeHour % 12 + (wakeAmPm === 'PM' ? 12 : 0);
  let totalWakeMins = wake24 * 60 + wakeMinute;
  let bedMins = totalWakeMins - duration * 60;
  if (bedMins < 0) bedMins += 24 * 60;

  let bedHour24 = Math.floor(bedMins / 60) % 24;
  let bedMin = Math.round(bedMins % 60);
  let bedAmPm: 'AM' | 'PM' = bedHour24 >= 12 ? 'PM' : 'AM';
  let bedHour12 = bedHour24 % 12 || 12;

  return { hour: bedHour12, minute: bedMin, amPm: bedAmPm };
}

// --- SCREENS ---
const Screen1 = ({ onNext }: { onNext: () => void }) => {
  const { t } = useTranslation(undefined, { i18n });
  return (
    <div className="flex flex-col flex-1 px-2 justify-center items-center text-center">
      <div className="mb-6 bg-primary/10 w-24 h-24 rounded-full flex items-center justify-center shadow-inner">
        <Moon className="w-10 h-10 text-primary" />
      </div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6 leading-tight max-w-xs">
        {t("screen1.title", "Your sleep window matters more than you think")}
      </h1>
      <div className="text-sm text-slate-600 leading-relaxed space-y-4 max-w-sm mb-8 font-medium">
        <p>
          {t("screen1.p1", "A sleep window is the fixed time between when you go to bed and when you wake up. Keeping it consistent — even on weekends — is one of the most powerful things you can do for your sleep.")}
        </p>
        <p>
          {t("screen1.p2", "This tool helps you build yours in under 2 minutes.")}
        </p>
      </div>

      <div className="w-full p-5 bg-slate-50 border border-slate-100 border-l-4 border-l-primary rounded-2xl shadow-sm text-left mb-8 flex gap-4 items-start">
        <div className="mt-0.5 text-primary">
          <Lightbulb className="w-6 h-6" />
        </div>
        <p className="text-xs font-semibold italic text-slate-600 leading-relaxed">
          {t("screen1.insight", "Even a 1-hour difference in sleep times on weekends can disrupt how you feel all week.")}
        </p>
      </div>

      <div className="mt-auto flex items-center gap-2 text-xs text-slate-500 font-bold uppercase tracking-widest pt-4">
        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
        {t("screen1.meta", "Simple. Personal. Effective.")}
      </div>
    </div>
  );
};

interface Screen2Props {
  wakeHour: number;
  wakeMinute: number;
  wakeAmPm: 'AM' | 'PM';
  sleepDuration: number;
  onWakeHourChange: (h: number) => void;
  onWakeMinuteChange: (m: number) => void;
  onWakeAmPmChange: (v: 'AM' | 'PM') => void;
  onSleepDurationChange: (d: number) => void;
}

const Screen2 = (props: Screen2Props) => {
  const { t } = useTranslation(undefined, { i18n });
  const { wakeHour, wakeMinute, wakeAmPm, sleepDuration } = props;
  const bedtime = calcBedtime(wakeHour, wakeMinute, wakeAmPm, sleepDuration);
  const wakeStr = formatTime(wakeHour, wakeMinute, wakeAmPm);
  const bedStr = formatTime(bedtime.hour, bedtime.minute, bedtime.amPm);

  return (
    <div className="flex flex-col flex-1 px-2 pt-2">
      <h1 className="text-xl font-bold text-slate-800 mb-6">
        {t("screen2.title", "Let's set your sleep window")}
      </h1>

      <div className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm mb-4">
        <div className="text-[10px] font-bold text-primary tracking-widest uppercase mb-1">
          {t("screen2.step1.title", "STEP 1 — WAKE-UP TIME")}
        </div>
        <p className="text-sm font-medium text-slate-600 mb-2">
          {t("screen2.step1.desc", "What time do you need to wake up most days?")}
        </p>
        <TimePicker
          hour={wakeHour} minute={wakeMinute} amPm={wakeAmPm}
          onHourChange={props.onWakeHourChange}
          onMinuteChange={props.onWakeMinuteChange}
          onAmPmChange={props.onWakeAmPmChange}
        />
      </div>

      <div className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm mb-6">
        <div className="text-[10px] font-bold text-primary tracking-widest uppercase mb-1">
          {t("screen2.step2.title", "STEP 2 — SLEEP DURATION")}
        </div>
        <p className="text-sm font-medium text-slate-600 mb-6">
          {t("screen2.step2.desc", "How many hours of sleep do you want?")}
        </p>
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold text-slate-400">6h</span>
          <input
            type="range" min={6} max={9} step={0.5} value={sleepDuration}
            onChange={e => props.onSleepDurationChange(parseFloat(e.target.value))}
            className="flex-1 accent-primary"
          />
          <span className="text-xs font-bold text-slate-400">9h</span>
          <span className="text-sm font-bold text-primary w-10 text-right">
            {sleepDuration}h
          </span>
        </div>
      </div>

      <div className="p-5 bg-primary/5 border border-primary/20 rounded-2xl shadow-inner mb-6">
        <div className="flex justify-between items-center mb-3">
          <span className="font-bold text-slate-700 flex items-center gap-2"><Moon className="w-4 h-4 text-indigo-500" /> {bedStr}</span>
          <span className="font-bold text-slate-700 flex items-center gap-2"><Sun className="w-4 h-4 text-amber-500" /> {wakeStr}</span>
        </div>
        <div className="relative h-2.5 rounded-full bg-gradient-to-r from-indigo-300 to-amber-200 mb-3 shadow-inner">
          <div className="absolute -left-1 -top-1 w-4.5 h-4.5 rounded-full bg-indigo-500 border-2 border-white shadow-sm" />
          <div className="absolute -right-1 -top-1 w-4.5 h-4.5 rounded-full bg-amber-400 border-2 border-white shadow-sm" />
        </div>
        <p className="text-center text-xs font-semibold text-slate-500">
          {t("screen2.live_window.duration", { hours: sleepDuration, defaultValue: `${sleepDuration} hours of sleep` })}
        </p>
      </div>

      <p className="text-xs font-medium italic text-slate-400 text-center mt-auto">
        {t("screen2.italic", "Most adults need 7–9 hours. Choose what feels right.")}
      </p>
    </div>
  );
};

interface Screen3Props {
  bedtime: string;
  wakeTime: string;
  duration: number;
}

const Screen3 = ({ bedtime, wakeTime, duration }: Screen3Props) => {
  const { t } = useTranslation(undefined, { i18n });
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [selectedCommitment, setSelectedCommitment] = useState<number | null>(null);

  const toggleAccordion = (idx: number) => {
    setOpenAccordion(prev => prev === idx ? null : idx);
  };

  const selectCommitment = (idx: number) => {
    setSelectedCommitment(idx);
  };

  const tips = ((_t => Array.isArray(_t) ? _t : null)(t("screen3.accordion1.tips", { returnObjects: true }))) || [
    { icon: <PhoneOff className="w-5 h-5" />, text: "Wind down 30 mins before your bedtime" },
    { icon: <Sun className="w-5 h-5" />, text: "Same wake time every day — yes, weekends too" },
    { icon: <Ban className="w-5 h-5" />, text: "Avoid naps longer than 20 mins after 3pm" }
  ];
  
  const commitments = ((_t => Array.isArray(_t) ? _t : null)(t("screen3.accordion2.commitments", { returnObjects: true }))) || [
    { icon: <PhoneOff className="w-5 h-5 text-indigo-500" />, text: "Put my phone away before bed" },
    { icon: <Bath className="w-5 h-5 text-sky-500" />, text: "Start a wind-down routine" },
    { icon: <Lightbulb className="w-5 h-5 text-amber-500" />, text: "Dim the lights an hour before bed" },
    { icon: <Pen className="w-5 h-5 text-rose-500" />, text: "Finish my to-do list early" }
  ];

  return (
    <div className="flex flex-col flex-1 px-2 pt-2">
      <h1 className="text-xl font-bold text-slate-800 mb-6">
        {t("screen3.title", "Your sleep window")}
      </h1>

      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm mb-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-slate-500">{t("screen3.result.bedtime", "Bedtime")}</span>
          <span className="text-base font-bold text-slate-800">{bedtime}</span>
        </div>
        <div className="h-px bg-slate-100 w-full mb-3" />
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-slate-500">{t("screen3.result.waketime", "Wake time")}</span>
          <span className="text-base font-bold text-slate-800">{wakeTime}</span>
        </div>
        <div className="h-px bg-slate-100 w-full mb-3" />
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-slate-500">{t("screen3.result.duration", "Duration")}</span>
          <span className="text-base font-bold text-slate-800">
            {t("screen3.result.hours", { hours: duration, defaultValue: `${duration} hours` })}
          </span>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm mb-4 transition-all">
        <button onClick={() => toggleAccordion(0)} className="w-full flex items-center gap-3 p-4 bg-transparent hover:bg-slate-50 transition-colors">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-500 shrink-0">
            <Lightbulb size={18} />
          </div>
          <span className="flex-1 text-sm font-bold text-slate-800 text-left">{t("screen3.accordion1.title", "3 ways to protect it")}</span>
          <motion.div animate={{ rotate: openAccordion === 0 ? 90 : 0 }} className="text-slate-400 shrink-0">
            <ChevronRight size={20} />
          </motion.div>
        </button>
        <AnimatePresence>
          {openAccordion === 0 && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <div className="px-4 pb-4 pt-1 flex flex-col gap-3">
                {Array.isArray(tips) && tips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-3 pt-2 border-t border-slate-50">
                    <div className="text-slate-400 mt-0.5 shrink-0">{tip.icon}</div>
                    <span className="text-sm font-medium text-slate-600">{tip.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm mb-8 transition-all">
        <button onClick={() => toggleAccordion(1)} className="w-full flex items-center gap-3 p-4 bg-transparent hover:bg-slate-50 transition-colors">
          <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-rose-500 shrink-0">
            <Target size={18} />
          </div>
          <span className="flex-1 text-sm font-bold text-slate-800 text-left">{t("screen3.accordion2.title", "Commit to 1 thing tonight")}</span>
          <motion.div animate={{ rotate: openAccordion === 1 ? 90 : 0 }} className="text-slate-400 shrink-0">
            <ChevronRight size={20} />
          </motion.div>
        </button>
        <AnimatePresence>
          {openAccordion === 1 && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <div className="px-4 pb-4 pt-1 flex flex-col gap-2">
                {Array.isArray(commitments) && commitments.map((c, i) => (
                  <button key={i} onClick={() => selectCommitment(i)} className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left w-full ${selectedCommitment === i ? 'bg-primary/5 border-primary shadow-sm' : 'bg-slate-50 border-slate-100 hover:border-slate-200'}`}>
                    <span className="shrink-0">{c.icon}</span>
                    <span className="text-sm font-medium text-slate-700">{c.text}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl shadow-sm text-center">
        <p className="text-sm font-medium italic text-slate-600 leading-relaxed">
          "{t("screen3.quote", "Consistency is more powerful than perfection. One good night builds the next.")}"
        </p>
      </div>
    </div>
  );
};

// --- MAIN WRAPPER ---
function SleepWindowInner() {
  const { t } = useTranslation(undefined, { i18n });
  const [screen, setScreen] = useState(1);
  const [wakeHour, setWakeHour] = useState(7);
  const [wakeMinute, setWakeMinute] = useState(0);
  const [wakeAmPm, setWakeAmPm] = useState<'AM' | 'PM'>('AM');
  const [sleepDuration, setSleepDuration] = useState(7.5);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const lang = params.get('lang') || 'en';
      loadLocale(lang);
    }
  }, []);

  const navigate = (to: number) => setScreen(to);

  const handleSave = async () => {
    setIsSaving(true);
    const bed = calcBedtime(wakeHour, wakeMinute, wakeAmPm, sleepDuration);
    
    const entryData = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
      wake_time: formatTime(wakeHour, wakeMinute, wakeAmPm),
      bedtime: formatTime(bed.hour, bed.minute, bed.amPm),
      duration: sleepDuration,
    };

    try {
      const res = await fetch(apiPath("/api/sleep-window-planner"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entryData),
      });

      if (res.ok) {
        toast.success(t("toasts.save_success", "Sleep window saved"));
        navigate(4);
      } else {
        toast.error(t("toasts.save_error", "Failed to save sleep window"));
      }
    } catch (error) {
      console.error("Failed to save sleep window:", error);
      toast.error(t("toasts.save_error", "Failed to save sleep window"));
    } finally {
      setIsSaving(false);
    }
  };

  if (screen === 4) {
    return (
      <PremiumComplete
        title={t("app_title", "Sleep Window Planner")}
        message={t("complete.message", "Your ideal sleep window has been mapped. Consistency is the key to deep, restorative rest.")}
        onRestart={() => setScreen(1)}
        shareEmoji="🌙"
        shareContent={"I just completed 'Sleep Window Planner' on TherapyMantra — a guided sleep scheduling that genuinely helped me. Try it! \n\n Android: https://play.google.com/store/apps/details?id=org.mantracare.therapy\n iOS: https://apps.apple.com/pk/app/therapymantra/id1607643888"}
      />
    );
  }

  const bed = calcBedtime(wakeHour, wakeMinute, wakeAmPm, sleepDuration);
  const bedStr = formatTime(bed.hour, bed.minute, bed.amPm);
  const wakeStr = formatTime(wakeHour, wakeMinute, wakeAmPm);

  const pillLabels = ((_t => Array.isArray(_t) ? _t : null)(t("pill_labels", { returnObjects: true }))) || [
    "Build your window",
    "Set your times",
    "Your sleep window"
  ];

  return (
    <PremiumLayout
      title={t("app_title", "Sleep Window Planner")}
      subtitle={pillLabels[screen - 1]}
      icon={<Moon className="w-6 h-6 text-primary" />}
      onBack={screen > 1 && screen < 4 ? () => navigate(screen - 1) : undefined}
    >
      <div className="w-full max-w-md mx-auto min-h-[70vh] flex flex-col px-6 py-4">
        <div className="flex justify-center gap-2 mb-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${i <= screen ? "w-8 bg-primary" : "w-2 bg-slate-200"}`}
            />
          ))}
        </div>

        <div className="flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={screen}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="flex-1 flex flex-col"
            >
              {screen === 1 && (
                <div className="flex-1 flex flex-col pb-4">
                  <Screen1 onNext={() => navigate(2)} />
                  <div className="mt-8 pt-4">
                    <button
                      onClick={() => navigate(2)}
                      className="act-btn-primary"
                    >
                      {t("screen1.button", "Let's build mine")}
                    </button>
                  </div>
                </div>
              )}
              {screen === 2 && (
                <div className="flex-1 flex flex-col pb-4">
                  <Screen2
                    wakeHour={wakeHour} wakeMinute={wakeMinute} wakeAmPm={wakeAmPm}
                    sleepDuration={sleepDuration}
                    onWakeHourChange={setWakeHour} onWakeMinuteChange={setWakeMinute}
                    onWakeAmPmChange={setWakeAmPm} onSleepDurationChange={setSleepDuration}
                  />
                  <div className="mt-8 pt-4">
                    <button
                      onClick={() => navigate(3)}
                      className="act-btn-primary"
                    >
                      {t("screen2.button", "See my sleep window")}
                    </button>
                  </div>
                </div>
              )}
              {screen === 3 && (
                <div className="flex-1 flex flex-col pb-4">
                  <Screen3 bedtime={bedStr} wakeTime={wakeStr} duration={sleepDuration} />
                  <div className="mt-8 pt-4 space-y-3">
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="act-btn-primary"
                    >
                      {isSaving ? t("toasts.saving", "Saving...") : t("screen3.button", "Save my sleep window")}
                    </button>
                    <button
                      onClick={() => navigate(2)}
                      className="act-btn-secondary w-full"
                    >
                      {t("screen3.adjust_times", "Adjust Times")}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </PremiumLayout>
  );
}

export default function SleepWindowPage() {
  return (
    <I18nextProvider i18n={i18n}>
      <SleepWindowInner />
    </I18nextProvider>
  );
}