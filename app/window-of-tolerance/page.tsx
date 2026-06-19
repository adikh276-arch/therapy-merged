'use client';

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, History, Save, ArrowLeft, ClipboardList, X, Circle } from "lucide-react";
import { useTranslation, I18nextProvider } from "react-i18next";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { PremiumComplete } from "@/components/shared/PremiumComplete";
import i18n, { loadLocale } from "./i18n";
import { apiPath } from '@/lib/apiPath';

export type ZoneType = "hyper" | "safe" | "hypo" | null;

export interface CheckInEntry {
  id: string;
  zone: ZoneType;
  journal?: string;
  timestamp: string;
}

const ZONE_EMOJI: Record<string, string> = { hyper: "", safe: "🟢", hypo: "" };

// --- CUSTOM TOAST HELPERS ---
const localToast = {
  success: (msg: string) => console.log("SUCCESS:", msg),
  error: (msg: string) => {
    console.error("ERROR:", msg);
    if (typeof window !== "undefined") {
      window.alert(msg);
    }
  }
};

// --- SCREENS ---
interface WelcomeProps {
  onBegin: () => void;
  onHistory: () => void;
  onBack: () => void;
}

function WelcomeScreen({ onBegin, onHistory, onBack }: WelcomeProps) {
  const { t } = useTranslation(undefined, { i18n });
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-slate-100 transition-colors">
          <ArrowLeft size={22} />
        </button>
        <button onClick={onHistory} className="p-2 -mr-2 rounded-full hover:bg-slate-100 transition-colors">
          <ClipboardList size={22} />
        </button>
      </div>

      <div className="text-center space-y-3">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">
          {t("screens.welcome.title", "The Window of Tolerance")}
        </h1>
        <p className="text-slate-500 text-base leading-relaxed whitespace-pre-line font-medium">
          {t("screens.welcome.subtitle", "Learn to identify your nervous system's zones of activation, find your green zone, and build a toolkit for emotional regulation.")}
        </p>
      </div>

      <p className="text-slate-600 text-sm leading-relaxed text-center font-medium">
        {t("screens.welcome.description", "Your 'window of tolerance' is the zone where you can function and regulate emotions effectively. When stress overflows, you might get pushed out of it.")}
      </p>

      <div className="bg-amber-50 rounded-2xl p-6 italic text-amber-900 text-sm leading-relaxed border-l-4 border-amber-400 font-medium">
        <p className="text-sm font-medium">{t("screens.welcome.callout", "Understanding your nervous system is a brave first step toward self-regulation.")}</p>
      </div>

      <button
        onClick={onBegin}
        className="w-full py-5 rounded-2xl bg-slate-900 text-white shadow-md font-black text-lg hover:opacity-90 hover:shadow-xl hover:shadow-primary/40 shadow-2xl transition-all duration-300"
      >
        {t("screens.welcome.button", "Get Started")}
      </button>

      <p className="text-xs text-slate-400 text-center leading-relaxed font-medium">
        {t("screens.welcome.disclaimer", "This tool is for educational purposes and does not replace clinical therapy support.")}
      </p>
    </section>
  );
}

function ExplainScreen({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const { t } = useTranslation(undefined, { i18n });
  return (
    <section className="space-y-6">
      <h2 className="font-display text-2xl font-bold text-slate-800 text-center">{t("screens.explain.title", "Understanding the Zones")}</h2>

      {/* Window Diagram */}
      <div className="flex justify-center my-6">
        <div className="w-[140px] rounded-3xl overflow-hidden border border-white/60 shadow-xl">
          <div className="h-[80px] flex items-center justify-center text-sm font-black uppercase tracking-widest bg-rose-400 text-white">
            {t("screens.explain.zones.hyper.tag", "Hyper")}
          </div>
          <div className="h-[80px] flex items-center justify-center text-sm font-black uppercase tracking-widest bg-emerald-400 text-white">
            {t("screens.explain.zones.safe.tag", "Safe")}
          </div>
          <div className="h-[80px] flex items-center justify-center text-sm font-black uppercase tracking-widest bg-sky-400 text-white">
            {t("screens.explain.zones.hypo.tag", "Hypo")}
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div className="flex gap-4 items-start p-4 rounded-2xl bg-white/40 backdrop-blur-sm shadow-sm border border-white/50">
          <span className="text-lg mt-0.5"><Circle className="inline-block w-8 h-8" /></span>
          <div>
            <p className="font-bold text-slate-800 text-sm">{t("screens.explain.zones.hyper.label", "Hyper-arousal (Flight or Fight)")}</p>
            <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1">{t("screens.explain.zones.hyper.desc", "Feeling anxious, angry, flooded, or overwhelmed. Your system is stuck in high gear.")}</p>
          </div>
        </div>
        <div className="flex gap-4 items-start p-4 rounded-2xl bg-white/40 backdrop-blur-sm shadow-sm border border-white/50">
          <span className="text-lg mt-0.5"><Circle className="inline-block w-8 h-8" /></span>
          <div>
            <p className="font-bold text-slate-800 text-sm">{t("screens.explain.zones.safe.label", "Optimal Zone (Connected & Calm)")}</p>
            <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1">{t("screens.explain.zones.safe.desc", "Feeling grounded, present, and capable. You can handle emotional waves easily.")}</p>
          </div>
        </div>
        <div className="flex gap-4 items-start p-4 rounded-2xl bg-white/40 backdrop-blur-sm shadow-sm border border-white/50">
          <span className="text-lg mt-0.5"><Circle className="inline-block w-8 h-8" /></span>
          <div>
            <p className="font-bold text-slate-800 text-sm">{t("screens.explain.zones.hypo.label", "Hypo-arousal (Freeze or Shut Down)")}</p>
            <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1">{t("screens.explain.zones.hypo.desc", "Feeling numb, exhausted, spaced out, or disconnected. Your system has shut down to protect you.")}</p>
          </div>
        </div>
      </div>

      <p className="text-sm text-slate-650 leading-relaxed text-center font-medium my-4">
        {t("screens.explain.footer", "Learning which zone you're in helps you choose the right tools to regulate your system.")}
      </p>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-4 rounded-2xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-all duration-300"
        >
          {t("screens.explain.back", "Back")}
        </button>
        <button
          onClick={onNext}
          className="flex-1 py-4 rounded-2xl bg-slate-900 text-white shadow-md font-bold hover:opacity-90 hover:shadow-xl hover:shadow-primary/40 shadow-lg transition-all duration-300"
        >
          {t("screens.explain.next", "Next")}
        </button>
      </div>
    </section>
  );
}

interface CheckInProps {
  selected: ZoneType;
  onSelect: (zone: ZoneType) => void;
  onBack: () => void;
  onNext: () => void;
}

function CheckInScreen({ selected, onSelect, onBack, onNext }: CheckInProps) {
  const { t } = useTranslation(undefined, { i18n });

  const zones = [
    {
      id: "hyper" as const,
      icon: <Circle className="w-5 h-5" />,
      label: t("screens.checkin.zones.hyper.label", "Hyper-arousal (High Activation)"),
      desc: t("screens.checkin.zones.hyper.desc", "I feel jittery, overwhelmed, angry, or anxious."),
      color: "border-rose-200 bg-rose-50/40"
    },
    {
      id: "safe" as const,
      icon: <Circle className="w-5 h-5" />,
      label: t("screens.checkin.zones.safe.label", "Within My Window (Optimal State)"),
      desc: t("screens.checkin.zones.safe.desc", "I feel present, calm, and able to think clearly."),
      color: "border-emerald-200 bg-emerald-50/40"
    },
    {
      id: "hypo" as const,
      icon: <Circle className="w-5 h-5" />,
      label: t("screens.checkin.zones.hypo.label", "Hypo-arousal (Low Activation)"),
      desc: t("screens.checkin.zones.hypo.desc", "I feel numb, spaced out, heavy, or unmotivated."),
      color: "border-sky-200 bg-sky-50/40"
    },
  ];

  return (
    <section className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="font-display text-2xl font-bold text-slate-850">{t("screens.checkin.title", "Where are you right now?")}</h2>
        <p className="text-sm text-slate-500 font-medium">{t("screens.checkin.subtitle", "Tune into your body and thoughts to pick your current zone.")}</p>
      </div>

      <div className="space-y-4">
        {zones.map((z) => (
          <button
            key={z.id}
            onClick={() => onSelect(z.id)}
            className={`w-full text-left p-6 rounded-3xl border transition-all duration-300 flex gap-4 items-start shadow-sm ${
              selected === z.id ? z.color : "border-white/60 bg-white hover:bg-slate-50"
            }`}
          >
            <span className="text-3xl mt-0.5">{z.icon}</span>
            <div>
              <p className="font-bold text-slate-800">{z.label}</p>
              <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1.5">{z.desc}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="flex gap-3 pt-4">
        <button
          onClick={onBack}
          className="flex-1 py-4 rounded-2xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-all duration-300"
        >
          {t("screens.checkin.back", "Back")}
        </button>
        <button
          onClick={onNext}
          disabled={!selected}
          className="flex-1 py-4 rounded-2xl bg-slate-900 text-white shadow-md font-bold hover:opacity-90 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {t("screens.checkin.next", "Next")}
        </button>
      </div>

      <p className="text-xs text-slate-400 text-center font-medium leading-relaxed">
        {t("screens.checkin.footer", "Take a deep breath and listen to what your body is whispering.")}
      </p>
    </section>
  );
}

interface ZoneProps {
  zone: ZoneType;
  onContinue: () => void;
  onBack: () => void;
}

function ZoneScreen({ zone, onContinue, onBack }: ZoneProps) {
  const { t } = useTranslation(undefined, { i18n });
  if (!zone) return null;

  const data = (t(`screens.zone.${zone}`, { returnObjects: true }) as any) || {
    title: zone === "hyper" ? "Hyper-arousal" : zone === "safe" ? "Optimal Zone" : "Hypo-arousal",
    subtitle: "Understanding your current nervous system activation state.",
    feelings: ["Overwhelmed", "Anxious"],
    tools: [
      { name: "Box Breathing", desc: "Regulate your nervous system with box-style breaths." }
    ],
    button: "Build Regulator Toolkit",
    footer: "Your system has safety logic. We can work with it."
  };

  const colors: Record<string, string> = {
    hyper: "text-rose-500",
    safe: "text-emerald-500",
    hypo: "text-sky-500",
  };
  const emojis: Record<string, string> = {
    hyper: "",
    safe: "🟢",
    hypo: "",
  };
  const toolIcons: Record<string, string> = {
    "Box Breathing": "️",
    "5-4-3-2-1 Grounding": "️",
    "Feet on Floor": "",
    "Gentle Movement": "",
    "Rhythmic Sound": "",
    "Speak Out Loud": "",
    "Keep Breathing Slowly": "",
    "Reflect": "",
    "Self-Compassion": "",
  };

  return (
    <section className="space-y-6">
      <button
        onClick={onBack}
        className="p-2 -ml-2 rounded-full hover:bg-slate-100 transition-colors text-slate-500 text-xs font-bold uppercase tracking-wider flex items-center gap-1"
      >
        ← Back
      </button>

      <div className="text-center space-y-3">
        <h2 className={`font-display text-2xl font-black ${colors[zone]}`}>
          {emojis[zone]} {data.title}
        </h2>
        <p className="text-sm text-slate-500 leading-relaxed font-medium">{data.subtitle}</p>
      </div>

      <div className="flex flex-wrap gap-2.5 justify-center">
        {data.feelings && data.feelings.map((f: string) => (
          <span key={f} className="inline-flex px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wide">{f}</span>
        ))}
      </div>

      <div className="space-y-4">
        {data.tools && data.tools.map((tool: any) => (
          <div key={tool.name} className="p-5 rounded-2xl bg-white/60 backdrop-blur-lg border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] shadow-sm flex gap-4 items-start">
            <span className="text-2xl mt-0.5">{toolIcons[tool.name] || ""}</span>
            <div>
              <p className="font-extrabold text-sm text-slate-800">{tool.name}</p>
              <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1.5">{tool.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3 pt-4">
        <button
          onClick={onContinue}
          className="w-full py-5 rounded-2xl bg-slate-900 text-white shadow-md font-black text-lg hover:opacity-90 hover:shadow-xl hover:shadow-primary/40 shadow-xl transition-all duration-300"
        >
          {data.button}
        </button>
      </div>

      <p className="text-xs text-slate-400 text-center font-medium leading-relaxed">{data.footer}</p>
    </section>
  );
}

interface ToolkitProps {
  journal: string;
  onJournalChange: (v: string) => void;
  weekTracker: (ZoneType)[];
  onSave: () => void;
  onBack: () => void;
  isSaving: boolean;
}

function ToolkitScreen({ journal, onJournalChange, weekTracker, onSave, onBack, isSaving }: ToolkitProps) {
  const { t } = useTranslation(undefined, { i18n });
  const DAYS = ((_t => Array.isArray(_t) ? _t : null)(t("days", { returnObjects: true }))) || ["M", "T", "W", "T", "F", "S", "S"];
  const tools_list = ((_t => Array.isArray(_t) ? _t : null)(t("screens.toolkit.tools_list", { returnObjects: true }))) || [
    "Breathing Exercise",
    "Sensory Mindfulness",
    "Self-Compassion Writing"
  ];

  return (
    <section className="space-y-6">
      <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-slate-100 transition-colors text-slate-500 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
        ← Back
      </button>

      <div className="text-center space-y-2">
        <h2 className="font-display text-2xl font-bold text-slate-800">{t("screens.toolkit.title", "Create Your Toolkit")}</h2>
        <p className="text-sm text-slate-500 font-medium">{t("screens.toolkit.subtitle", "Equip yourself with grounding strategies to widen your window.")}</p>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {tools_list && tools_list.map((t) => (
          <span key={t} className="inline-flex px-3 py-1 rounded-full bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 border border-slate-150 text-slate-600 text-xs font-semibold">{t}</span>
        ))}
      </div>

      {/* Journal */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-800">{t("screens.toolkit.journal_label", "Coping Reflections")}</label>
        <p className="text-xs text-slate-450 font-medium">
          {t("screens.toolkit.journal_desc", "Jot down how you want to support your nervous system today.")}
        </p>
        <textarea
          value={journal}
          onChange={(e) => onJournalChange(e.target.value)}
          placeholder={t("screens.toolkit.journal_placeholder", "e.g. Next time I notice hyperactivation, I'll take 5 slow breaths...")}
          rows={3}
          className="w-full p-4 rounded-2xl border border-slate-200 bg-white text-slate-800 text-sm resize-none focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all font-medium"
        />
      </div>

      {/* Weekly Tracker */}
      <div className="space-y-3 border-t border-slate-50 pt-4">
        <label className="text-sm font-bold text-slate-800">{t("screens.toolkit.history_label", "Nervous System Week Calendar")}</label>
        <div className="flex justify-between px-2 bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 py-4 rounded-2xl border border-white/60 shadow-inner">
          {DAYS.map((day, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5" title={day}>
              <span className="text-lg">{weekTracker[i] ? ZONE_EMOJI[weekTracker[i]!] : ""}</span>
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider">{day}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onSave}
        disabled={isSaving}
        className="w-full py-5 rounded-2xl bg-slate-900 text-white shadow-md font-black text-lg hover:opacity-90 hover:shadow-xl hover:shadow-primary/40 shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
      >
        <Save size={20} />
        {isSaving ? t("screens.toolkit.preserving", "Saving...") : t("screens.toolkit.save_button", "Save & Finish Check-in")}
      </button>

      <p className="text-xs text-slate-400 text-center font-medium leading-relaxed">
        {t("screens.toolkit.footer", "Consistency shapes your system's baseline over time.")}
      </p>
    </section>
  );
}

// --- HISTORY MODAL ---
interface HistoryModalProps {
  entries: CheckInEntry[];
  onClose: () => void;
}

function HistoryModal({ entries, onClose }: HistoryModalProps) {
  const { t } = useTranslation(undefined, { i18n });

  const ZONE_LABELS: Record<string, { emoji?: string; icon?: React.ReactNode; label: string }> = {
    hyper: { icon: <Circle className="w-5 h-5" />, label: t("screens.checkin.zones.hyper.label", "Hyper-arousal") },
    safe: { icon: <Circle className="w-5 h-5" />, label: t("screens.checkin.zones.safe.label", "Window of Tolerance") },
    hypo: { icon: <Circle className="w-5 h-5" />, label: t("screens.checkin.zones.hypo.label", "Hypo-arousal") },
  };

  function formatTime(timestampStr: string) {
    const d = new Date(timestampStr);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const hours = diff / (1000 * 60 * 60);
    const timeStr = d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    if (hours < 24) return `Today at ${timeStr}`;
    if (hours < 48) return `Yesterday at ${timeStr}`;
    return `${d.toLocaleDateString([], { month: "short", day: "numeric" })} at ${timeStr}`;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-[2.5rem] p-8 w-full max-w-[440px] max-h-[80vh] overflow-y-auto shadow-2xl z-10"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-xl font-bold text-slate-900"> {t("history.title", "Check-in History")}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-400">
            <X size={20} />
          </button>
        </div>
        {entries.length === 0 ? (
          <p className="text-slate-400 text-center py-8 font-medium">{t("history.empty", "No entries logged yet.")}</p>
        ) : (
          <div className="space-y-3 pr-1 max-h-[50vh] overflow-y-auto">
            {entries.map((entry, i) => {
              const zone = ZONE_LABELS[entry.zone! || "safe"];
              return (
                <div key={entry.id || i} className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 border border-white/60 text-left">
                  <span className="text-2xl">{zone ? zone.icon : ""}</span>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-800">{zone ? zone.label : "General Check-in"}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{formatTime(entry.timestamp)}</p>
                    {entry.journal && (
                      <p className="text-xs text-slate-500 italic mt-2 border-t border-slate-200/50 pt-1.5">"{entry.journal}"</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// --- MAIN WRAPPER ---
function WindowInner() {
  const { t } = useTranslation(undefined, { i18n });
  const [screen, setScreen] = useState(0);
  const [selectedZone, setSelectedZone] = useState<ZoneType>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [journal, setJournal] = useState("");
  const [history, setHistory] = useState<CheckInEntry[]>([]);
  const [weekTracker, setWeekTracker] = useState<(ZoneType)[]>([null, null, null, null, null, null, null]);
  const [isSaving, setIsSaving] = useState(false);

  // Sync lang parameter from query
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const lang = params.get('lang') || 'en';
      loadLocale(lang);
    }
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await fetch(apiPath("/api/window-of-tolerance"));
      if (res.ok) {
        const rows = await res.json();
        const fetchedHistory = rows.map((r: any) => {
          let parsed: any = {};
          try {
            parsed = JSON.parse(r.check_in_data);
          } catch {
            parsed = { zone: r.check_in_data, journal: "" };
          }
          return {
            id: r.id,
            zone: parsed.zone,
            journal: parsed.journal,
            timestamp: r.created_at
          } as CheckInEntry;
        });
        setHistory(fetchedHistory);
        
        // Update week tracker based on recent history
        const newWeek = [null, null, null, null, null, null, null] as (ZoneType)[];
        fetchedHistory.forEach((entry: CheckInEntry) => {
          const day = new Date(entry.timestamp).getDay();
          const adjustedDay = day === 0 ? 6 : day - 1;
          if (newWeek[adjustedDay] === null) newWeek[adjustedDay] = entry.zone;
        });
        setWeekTracker(newWeek);
      }
    } catch (error) {
      console.error("Failed to fetch history:", error);
    }
  };

  const navigate = useCallback((s: number) => {
    setScreen(s);
  }, []);

  const handleCheckIn = useCallback((zone: ZoneType) => {
    setSelectedZone(zone);
  }, []);

  const goToZoneScreen = useCallback(async () => {
    if (!selectedZone) return;
    setScreen(3);
  }, [selectedZone]);

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    
    const entryData = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
      zone: selectedZone,
      journal,
    };

    try {
      const res = await fetch(apiPath("/api/window-of-tolerance"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entryData),
      });

      if (res.ok) {
        localToast.success(t("toasts.save_success", "Check-in saved"));
        fetchHistory();
        setJournal("");
        setSelectedZone(null);
        setScreen(5); // Go to complete
      } else {
        localToast.error(t("toasts.save_error", "Failed to save check-in"));
      }
    } catch (error) {
      console.error("Failed to save check-in:", error);
      localToast.error(t("toasts.save_error", "Failed to save check-in"));
    } finally {
      setIsSaving(false);
    }
  }, [selectedZone, journal, t]);

  if (screen === 5) {
    return (
      <PremiumComplete
        title={t("app_title", "Window of Tolerance")}
        message={t("complete.message", "Excellent job tuning in and regulating your nervous system today. Over time, checking in creates self-directed regulation baselines.")}
        onRestart={() => setScreen(0)}
                  shareContent={"I just completed 'Window of Tolerance' on TherapyMantra — a guided emotional regulation that genuinely helped me. Try it! \n\n Android: https://play.google.com/store/apps/details?id=org.mantracare.therapy\n iOS: https://apps.apple.com/pk/app/therapymantra/id1607643888"}
      />
    );
  }

  const titles = ((_t => Array.isArray(_t) ? _t : null)(t("nav", { returnObjects: true }))) || [
    "Welcome",
    "Understanding Zones",
    "Check-in State",
    "Zone Tools",
    "Regulator Toolkit"
  ];

  return (
    <PremiumLayout
      title={t("app_title", "Window of Tolerance")}
      subtitle={titles[screen]}
      icon={<Activity className="w-6 h-6 text-primary" />}
      onBack={screen > 0 ? () => setScreen(prev => prev - 1) : undefined}
      exitOnBack={screen === 0}
    >
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-4 min-h-[70vh]">
        <div className="flex justify-center gap-2 mb-10">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${i <= screen ? "w-8 bg-primary" : "w-2 bg-slate-100"}`}
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
            className="flex-1 flex flex-col"
          >
            {screen === 0 && (
              <WelcomeScreen
                onBegin={() => navigate(1)}
                onHistory={() => setShowHistory(true)}
                onBack={() => {}}
              />
            )}
            {screen === 1 && (
              <ExplainScreen onBack={() => navigate(0)} onNext={() => navigate(2)} />
            )}
            {screen === 2 && (
              <CheckInScreen
                selected={selectedZone}
                onSelect={handleCheckIn}
                onBack={() => navigate(1)}
                onNext={goToZoneScreen}
              />
            )}
            {screen === 3 && (
              <ZoneScreen
                zone={selectedZone!}
                onContinue={() => navigate(4)}
                onBack={() => navigate(2)}
              />
            )}
            {screen === 4 && (
              <div className="flex-1 flex flex-col gap-8">
                <ToolkitScreen
                  journal={journal}
                  onJournalChange={setJournal}
                  weekTracker={weekTracker}
                  onSave={handleSave}
                  onBack={() => navigate(3)}
                  isSaving={isSaving}
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {showHistory && (
        <HistoryModal entries={history} onClose={() => setShowHistory(false)} />
      )}
    </PremiumLayout>
  );
}

export default function WindowPage() {
  return (
    <I18nextProvider i18n={i18n}>
      <WindowInner />
    </I18nextProvider>
  );
}