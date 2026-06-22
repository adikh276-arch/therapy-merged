'use client';

import { useState, useRef, useEffect } from 'react';
import { Save, Moon, ChevronRight, ChevronLeft, Sun, Lightbulb, PhoneOff, Ban, Bath, Pen, Target, Play } from "lucide-react";
import { useTranslation, I18nextProvider } from "react-i18next";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { PremiumComplete } from "@/components/shared/PremiumComplete";
import { motion, AnimatePresence } from "framer-motion";
const toast = {
  success: (msg: string) => console.log("SUCCESS:", msg),
  error: (msg: string) => {
    console.error("ERROR:", msg);
    if (typeof window !== "undefined") {
      window.alert(msg);
    }
  }
};
import i18n, { loadLocale } from './i18n';
import { apiPath } from '@/lib/apiPath';

// --- STAR BACKGROUND ---
const stars = [
  { top: '5%', left: '10%', delay: '0s', size: 3 },
  { top: '8%', left: '75%', delay: '0.8s', size: 2 },
  { top: '12%', left: '45%', delay: '1.6s', size: 2 },
  { top: '3%', left: '88%', delay: '2.4s', size: 3 },
  { top: '18%', left: '20%', delay: '0.4s', size: 2 },
  { top: '22%', left: '65%', delay: '1.2s', size: 3 },
  { top: '15%', left: '35%', delay: '2.0s', size: 2 },
  { top: '25%', left: '52%', delay: '0.6s', size: 2 },
];

const StarBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0"
    style={{ background: 'linear-gradient(180deg, var(--sleep-bg-start), var(--sleep-bg-mid), var(--sleep-bg-end))' }}>
    {stars.map((s, i) => (
      <div key={i} style={{
        position: 'absolute', top: s.top, left: s.left,
        width: s.size, height: s.size, borderRadius: '50%',
        backgroundColor: 'var(--sleep-star)',
        animation: `sparkle 3s ease-in-out ${s.delay} infinite`,
      }} />
    ))}
  </div>
);

// --- CONFETTI BURST ---
const CONFETTI_COLORS = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#c77dff', '#ff9a3c'];

interface ConfettiProps {
  trigger: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const Confetti = ({ trigger, containerRef }: ConfettiProps) => {
  const [pieces, setPieces] = useState<{ id: number; x: number; y: number; color: string; round: boolean; delay: number }[]>([]);

  useEffect(() => {
    if (trigger === 0) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const newPieces = Array.from({ length: 14 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * (rect.width - 12),
      y: rect.height / 2,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      round: Math.random() > 0.5,
      delay: Math.random() * 0.3,
    }));
    setPieces(newPieces);
    const timeout = setTimeout(() => setPieces([]), 1200);
    return () => clearTimeout(timeout);
  }, [trigger, containerRef]);

  return (
    <>
      {pieces.map(p => (
        <div key={p.id} style={{
          position: 'absolute', left: p.x, top: p.y,
          width: 6, height: 6, borderRadius: p.round ? '50%' : 1,
          backgroundColor: p.color, pointerEvents: 'none',
          animation: `confetti-burst 0.8s ease-out ${p.delay}s forwards`,
        }} />
      ))}
    </>
  );
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

  const arrowBtn: React.CSSProperties = {
    width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 16, color: 'var(--sleep-sub-color)', cursor: 'pointer',
    background: 'transparent', border: 'none',
  };

  const numStyle: React.CSSProperties = {
    fontSize: 28, fontWeight: 500, color: 'var(--sleep-body-color)',
    textAlign: 'center', width: 44, lineHeight: '36px',
  };

  return (
    <div className="flex items-center justify-center gap-1 py-2">
      <div className="flex flex-col items-center">
        <button style={arrowBtn} onClick={() => cycleHour(1)}>▲</button>
        <div style={numStyle}>{hour}</div>
        <button style={arrowBtn} onClick={() => cycleHour(-1)}>▼</button>
      </div>
      <div style={{ fontSize: 28, fontWeight: 500, color: 'var(--sleep-body-color)', padding: '0 2px' }}>:</div>
      <div className="flex flex-col items-center">
        <button style={arrowBtn} onClick={() => cycleMinute(1)}>▲</button>
        <div style={numStyle}>{String(minute).padStart(2, '0')}</div>
        <button style={arrowBtn} onClick={() => cycleMinute(-1)}>▼</button>
      </div>
      <div className="flex flex-col gap-1 ml-3">
        {(['AM', 'PM'] as const).map(v => (
          <button key={v} onClick={() => onAmPmChange(v)} style={{
            width: 44, height: 32, borderRadius: 8, fontSize: 12, fontWeight: 500,
            cursor: 'pointer', border: '1.5px solid',
            background: amPm === v ? 'var(--sleep-accent-hex)' : 'transparent',
            color: amPm === v ? '#fff' : 'var(--sleep-accent-hex)',
            borderColor: amPm === v ? 'var(--sleep-accent-hex)' : 'var(--sleep-card-border)',
            transition: 'all 200ms ease',
          }}>
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
const cardStyle: React.CSSProperties = {
  background: 'var(--sleep-card-bg)',
  border: '1px solid var(--sleep-card-border)',
  borderRadius: 16,
  padding: 16,
};

const Screen1 = ({ onNext }: { onNext: () => void }) => {
  const { t } = useTranslation(undefined, { i18n });
  return (
    <div className="flex flex-col flex-1 px-5 pb-6 justify-center" style={{ minHeight: 0 }}>
      <div className="flex flex-col items-center text-center gap-4 flex-1 justify-center">
        <div style={{ fontSize: 62, lineHeight: 1 }}><Moon className="inline-block w-8 h-8" /></div>
        <h1 style={{ fontSize: 20, fontWeight: 600, color: 'var(--sleep-body-color)', lineHeight: 1.35 }}>
          {t("screen1.title", "Your sleep window matters more than you think")}
        </h1>
        <p style={{ fontSize: 13.5, color: 'var(--sleep-sub-color)', lineHeight: 1.65 }}>
          {t("screen1.p1", "A sleep window is the fixed time between when you go to bed and when you wake up. Keeping it consistent — even on weekends — is one of the most powerful things you can do for your sleep.")}
        </p>
        <p style={{ fontSize: 13.5, color: 'var(--sleep-sub-color)', lineHeight: 1.65 }}>
          {t("screen1.p2", "This tool helps you build yours in under 2 minutes.")}
        </p>

        <div style={{
          ...cardStyle,
          background: 'var(--sleep-insight-bg)',
          borderLeft: '3px solid var(--sleep-insight-border)',
          textAlign: 'left',
        }}>
          <div className="flex gap-2 items-start">
            <span style={{ fontSize: 18 }}><Lightbulb className="inline-block w-8 h-8" /></span>
            <p style={{ fontSize: 12.5, fontStyle: 'italic', color: 'var(--sleep-sub-color)', lineHeight: 1.6 }}>
              {t("screen1.insight", "Even a 1-hour difference in sleep times on weekends can disrupt how you feel all week.")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 justify-center">
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--sleep-meta-color)' }} />
          <span style={{ fontSize: 12, color: 'var(--sleep-meta-color)' }}>{t("screen1.meta", "Simple. Personal. Effective.")}</span>
        </div>
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
  onNext: () => void;
}

const Screen2 = (props: Screen2Props) => {
  const { t } = useTranslation(undefined, { i18n });
  const { wakeHour, wakeMinute, wakeAmPm, sleepDuration } = props;
  const bedtime = calcBedtime(wakeHour, wakeMinute, wakeAmPm, sleepDuration);
  const wakeStr = formatTime(wakeHour, wakeMinute, wakeAmPm);
  const bedStr = formatTime(bedtime.hour, bedtime.minute, bedtime.amPm);

  return (
    <div className="flex flex-col flex-1 px-5 pb-6 overflow-y-auto" style={{ minHeight: 0 }}>
      <h1 style={{ fontSize: 18, fontWeight: 600, color: 'var(--sleep-body-color)', marginBottom: 14 }}>
        {t("screen2.title", "Let's set your sleep window")}
      </h1>

      <div style={cardStyle} className="mb-3">
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--sleep-accent-hex)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>
          {t("screen2.step1.title", "STEP 1 — WAKE-UP TIME")}
        </div>
        <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--sleep-body-color)', marginBottom: 4 }}>
          {t("screen2.step1.desc", "What time do you need to wake up most days?")}
        </p>
        <TimePicker
          hour={wakeHour} minute={wakeMinute} amPm={wakeAmPm}
          onHourChange={props.onWakeHourChange}
          onMinuteChange={props.onWakeMinuteChange}
          onAmPmChange={props.onWakeAmPmChange}
        />
      </div>

      <div style={cardStyle} className="mb-3">
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--sleep-accent-hex)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>
          {t("screen2.step2.title", "STEP 2 — SLEEP DURATION")}
        </div>
        <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--sleep-body-color)', marginBottom: 10 }}>
          {t("screen2.step2.desc", "How many hours of sleep do you want?")}
        </p>
        <div className="flex items-center gap-3">
          <span style={{ fontSize: 11, color: 'var(--sleep-sub-color)' }}>6h</span>
          <input
            type="range" min={6} max={9} step={0.5} value={sleepDuration}
            onChange={e => props.onSleepDurationChange(parseFloat(e.target.value))}
            style={{ flex: 1, accentColor: 'var(--sleep-accent-hex)' }}
          />
          <span style={{ fontSize: 11, color: 'var(--sleep-sub-color)' }}>9h</span>
          <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--sleep-accent-hex)', minWidth: 32 }}>
            {sleepDuration}h
          </span>
        </div>
      </div>

      <div style={{
        background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(140,180,240,0.4)',
        borderRadius: 14, padding: 14, marginBottom: 12,
      }}>
        <div className="flex justify-between items-center mb-2">
          <span style={{ fontWeight: 500, fontSize: 14, color: 'var(--sleep-body-color)' }}> {bedStr}</span>
          <span style={{ fontWeight: 500, fontSize: 14, color: 'var(--sleep-body-color)' }}>️ {wakeStr}</span>
        </div>
        <div style={{ position: 'relative', height: 10, borderRadius: 5, background: 'linear-gradient(90deg, #a0c0ff, #c0a0ff)', marginBottom: 8 }}>
          <div style={{
            position: 'absolute', left: -5, top: -3,
            width: 16, height: 16, borderRadius: '50%',
            background: '#8090c0', border: '2px solid #fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 8,
          }}><Moon className="inline-block w-8 h-8" /></div>
          <div style={{
            position: 'absolute', right: -5, top: -3,
            width: 16, height: 16, borderRadius: '50%',
            background: '#f0c060', border: '2px solid #fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 8,
          }}><Sun className="inline-block w-8 h-8" /></div>
        </div>
        <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--sleep-sub-color)' }}>
          {t("screen2.live_window.duration", { hours: sleepDuration, defaultValue: `${sleepDuration} hours of sleep` })}
        </p>
      </div>

      <p style={{ fontSize: 12, fontStyle: 'italic', color: 'var(--sleep-sub-color)', textAlign: 'center', marginBottom: 16 }}>
        {t("screen2.italic", "Most adults need 7–9 hours. Choose what feels right.")}
      </p>
    </div>
  );
};

interface Screen3Props {
  bedtime: string;
  wakeTime: string;
  duration: number;
  onReset?: () => void;
}

const dividerStyle: React.CSSProperties = {
  height: 1, background: 'var(--sleep-divider)', margin: '10px 0',
};

const Screen3 = ({ bedtime, wakeTime, duration, onReset }: Screen3Props) => {
  const { t } = useTranslation(undefined, { i18n });
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [selectedCommitment, setSelectedCommitment] = useState<number | null>(null);
  const [confettiTrigger, setConfettiTrigger] = useState(0);
  const commitRef = useRef<HTMLDivElement | null>(null);

  const toggleAccordion = (idx: number) => {
    setOpenAccordion(prev => prev === idx ? null : idx);
  };

  const selectCommitment = (idx: number) => {
    if (selectedCommitment === idx) return;
    setSelectedCommitment(idx);
    setConfettiTrigger(t => t + 1);
  };

  const tips = ((_t => Array.isArray(_t) ? _t : null)(t("screen3.accordion1.tips", { returnObjects: true }))) || [
    { icon: <PhoneOff className="w-5 h-5" />, text: "Wind down 30 mins before your bedtime" },
    { emoji: "⏰", text: "Same wake time every day — yes, weekends too" },
    { icon: <Ban className="w-5 h-5" />, text: "Avoid naps longer than 20 mins after 3pm" }
  ];
  const commitments = ((_t => Array.isArray(_t) ? _t : null)(t("screen3.accordion2.commitments", { returnObjects: true }))) || [
    { icon: <PhoneOff className="w-5 h-5" />, text: "Put my phone away before bed" },
    { icon: <Bath className="w-5 h-5" />, text: "Start a wind-down routine" },
    { icon: <Lightbulb className="w-5 h-5" />, text: "Dim the lights an hour before bed" },
    { icon: <Pen className="w-5 h-5" />, text: "Finish my to-do list early" }
  ];

  return (
    <div className="flex flex-col flex-1 px-5 pb-6 overflow-y-auto" style={{ minHeight: 0 }}>
      <h1 style={{ fontSize: 18, fontWeight: 600, color: 'var(--sleep-body-color)', marginBottom: 14 }}>
        {t("screen3.title", "Your sleep window ")}
      </h1>

      <div style={cardStyle} className="mb-3">
        <div className="flex justify-between items-center">
          <span style={{ fontSize: 13, color: 'var(--sleep-sub-color)' }}> {t("screen3.result.bedtime", "Bedtime")}</span>
          <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--sleep-body-color)' }}>{bedtime}</span>
        </div>
        <div style={dividerStyle} />
        <div className="flex justify-between items-center">
          <span style={{ fontSize: 13, color: 'var(--sleep-sub-color)' }}>️ {t("screen3.result.waketime", "Wake time")}</span>
          <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--sleep-body-color)' }}>{wakeTime}</span>
        </div>
        <div style={dividerStyle} />
        <div className="flex justify-between items-center">
          <span style={{ fontSize: 13, color: 'var(--sleep-sub-color)' }}>⏱️ {t("screen3.result.duration", "Duration")}</span>
          <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--sleep-body-color)' }}>
            {t("screen3.result.hours", { hours: duration, defaultValue: `${duration} hours` })}
          </span>
        </div>
      </div>

      <div style={{ ...cardStyle, borderRadius: 16, padding: 0, marginBottom: 8 }}>
        <button onClick={() => toggleAccordion(0)} style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 10,
          padding: '12px 14px', background: 'transparent', border: 'none',
          cursor: 'pointer', textAlign: 'left',
        }}>
          <span style={{ width: 28, height: 28, borderRadius: 8, background: '#ddeeff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>️</span>
          <span style={{ flex: 1, fontSize: 13.5, fontWeight: 500, color: 'var(--sleep-body-color)' }}>{t("screen3.accordion1.title", "3 ways to protect it")}</span>
          <span style={{
            fontSize: 12, color: 'var(--sleep-sub-color)',
            transform: openAccordion === 0 ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 300ms ease',
          }}><Play className="inline-block w-8 h-8" /></span>
        </button>
        <div style={{
          maxHeight: openAccordion === 0 ? 200 : 0,
          overflow: 'hidden',
          transition: 'max-height 350ms ease',
        }}>
          <div style={{ padding: '0 14px 12px' }}>
            {Array.isArray(tips) && tips.map((tip, i) => (
              <div key={i}>
                {i > 0 && <div style={dividerStyle} />}
                <div className="flex items-center gap-2" style={{ fontSize: 12.5, color: 'var(--sleep-body-color)', padding: '4px 0' }}>
                  <span>{tip.icon}</span><span>{tip.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ ...cardStyle, borderRadius: 16, padding: 0, marginBottom: 12, position: 'relative' }} ref={commitRef}>
        <button onClick={() => toggleAccordion(1)} style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 10,
          padding: '12px 14px', background: 'transparent', border: 'none',
          cursor: 'pointer', textAlign: 'left',
        }}>
          <span style={{ width: 28, height: 28, borderRadius: 8, background: '#e8d8ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}><Target className="inline-block w-8 h-8" /></span>
          <span style={{ flex: 1, fontSize: 13.5, fontWeight: 500, color: 'var(--sleep-body-color)' }}>{t("screen3.accordion2.title", "Commit to 1 thing tonight")}</span>
          <span style={{
            fontSize: 12, color: 'var(--sleep-sub-color)',
            transform: openAccordion === 1 ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 300ms ease',
          }}><Play className="inline-block w-8 h-8" /></span>
        </button>
        <div style={{
          maxHeight: openAccordion === 1 ? 300 : 0,
          overflow: 'hidden',
          transition: 'max-height 350ms ease',
        }}>
          <div style={{ padding: '0 14px 12px' }} className="flex flex-col gap-2">
            {Array.isArray(commitments) && commitments.map((c, i) => (
              <button key={i} onClick={() => selectCommitment(i)} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 13px', borderRadius: 13,
                background: selectedCommitment === i ? 'rgba(74,126,232,0.12)' : 'rgba(255,255,255,0.65)',
                border: `1.5px solid ${selectedCommitment === i ? 'var(--sleep-accent-hex)' : 'rgba(180,200,240,0.4)'}`,
                cursor: 'pointer', textAlign: 'left', width: '100%',
                transition: 'all 200ms ease',
              }}>
                <span style={{ fontSize: 16 }}>{c.icon}</span>
                <span style={{ fontSize: 12.5, color: 'var(--sleep-body-color)' }}>{c.text}</span>
              </button>
            ))}
          </div>
        </div>
        <Confetti trigger={confettiTrigger} containerRef={commitRef} />
      </div>

      <div style={{
        background: 'linear-gradient(135deg, rgba(220,235,255,0.8), rgba(230,220,255,0.8))',
        border: '1px solid rgba(140,160,240,0.3)',
        borderRadius: 16, padding: 16, textAlign: 'center', marginBottom: 16,
      }}>
        <div style={{ fontSize: 24, color: '#a0b0d8', marginBottom: 4 }}>"</div>
        <p style={{ fontSize: 12.5, fontStyle: 'italic', color: 'var(--sleep-body-color)', lineHeight: 1.6 }}>
          {t("screen3.quote", "Consistency is more powerful than perfection. One good night builds the next.")}
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

  // Sync lang parameter from query
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
        const errData = await res.json().catch(() => ({}));
        const detailedError = errData.message || errData.error || res.statusText;
        console.error("Detailed API Error:", detailedError);
        toast.error(`Failed to save: ${detailedError}`);
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
      <style>{`
        :root {
          --sleep-accent-hex: #4a7ee8;
          --sleep-purple-hex: #7050d0;
          --sleep-bg-start: #ddeeff;
          --sleep-bg-mid: #eee8ff;
          --sleep-bg-end: #fde8ff;
          --sleep-star: #7090d0;
          --sleep-card-bg: rgba(255, 255, 255, 0.6);
          --sleep-card-border: rgba(180, 200, 240, 0.5);
          --sleep-insight-bg: rgba(255, 255, 255, 0.65);
          --sleep-insight-border: #4a7ee8;
          --sleep-meta-color: #8a9cbc;
          --sleep-divider: rgba(180, 200, 240, 0.3);
          --sleep-body-color: #3a4870;
          --sleep-sub-color: #6a80a8;
        }
      `}</style>
      <div className="relative w-full max-w-md mx-auto min-h-[70vh] flex flex-col px-6">
        <StarBackground />
        
        <div className="flex justify-center gap-2 mb-10 relative z-10">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${i <= screen ? "w-8 bg-primary" : "w-2 bg-slate-100/60"}`}
            />
          ))}
        </div>

        <div className="relative z-10 flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={screen}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex-1 flex flex-col"
            >
              {screen === 1 && (
                <div className="flex-1 flex flex-col gap-8 py-8">
                  <Screen1 onNext={() => navigate(2)} />
                  <button
                    onClick={() => navigate(2)}
                    className="w-full bg-slate-900 text-white shadow-md py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:opacity-90 hover:shadow-xl hover:shadow-primary/40 transition-all flex items-center justify-center gap-3"
                  >
                    {t("screen1.button", "Let's build mine →")}
                  </button>
                </div>
              )}
              {screen === 2 && (
                <div className="flex-1 flex flex-col gap-8 py-8">
                  <Screen2
                    wakeHour={wakeHour} wakeMinute={wakeMinute} wakeAmPm={wakeAmPm}
                    sleepDuration={sleepDuration}
                    onWakeHourChange={setWakeHour} onWakeMinuteChange={setWakeMinute}
                    onWakeAmPmChange={setWakeAmPm} onSleepDurationChange={setSleepDuration}
                    onNext={() => navigate(3)}
                  />
                  <button
                    onClick={() => navigate(3)}
                    className="w-full bg-slate-900 text-white shadow-md py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:opacity-90 hover:shadow-xl hover:shadow-primary/40 transition-all flex items-center justify-center gap-3"
                  >
                    {t("screen2.button", "See my sleep window →")}
                  </button>
                </div>
              )}
              {screen === 3 && (
                <div className="flex-1 flex flex-col py-8">
                  <Screen3 bedtime={bedStr} wakeTime={wakeStr} duration={sleepDuration} onReset={() => navigate(1)} />
                  <div className="mt-10 space-y-4">
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="w-full bg-slate-900 text-white shadow-md py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:opacity-90 hover:shadow-xl hover:shadow-primary/40 transition-all flex items-center justify-center gap-3"
                    >
                      <Save size={20} strokeWidth={3} />
                      {isSaving ? t("toasts.saving", "Saving...") : t("screen3.button", "Save my sleep window ")}
                    </button>
                    <button
                      onClick={() => navigate(2)}
                      className="w-full bg-white text-slate-600 py-5 rounded-2xl font-black text-lg border border-slate-200 hover:bg-slate-50 transition-all shadow-sm"
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