'use client';

import { useState, useEffect, useMemo } from 'react';
import { useTranslation, I18nextProvider } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Brain, Target, Shield, Sparkles, ChevronRight, CheckCircle2, Lightbulb, MessageCircle, ArrowLeft } from 'lucide-react';
import i18n, { loadLocale } from './i18n';
import { PremiumLayout } from '@/components/shared/PremiumLayout';

// --- Types & Tips Data ---

interface Tip {
  id: string;
  title: string;
  preview: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  whyItHelps: string;
  whatYouCanDo: string[];
  gentleReminder?: string;
  example?: { instead: string; tryThis: string };
  actionLabel: string;
}

const TIPS_DATA: Tip[] = [
  {
    id: "enjoyable-activities",
    title: "Engage in Enjoyable Activities",
    preview: "Do small activities that bring even a tiny bit of comfort or interest.",
    icon: Heart,
    iconBg: "bg-rose-50  text-rose-500 border-rose-100 ",
    whyItHelps: "Depression reduces motivation and pleasure. Small enjoyable actions can slowly rebuild positive feelings and energy.",
    whatYouCanDo: [
      "Listen to a favorite song",
      "Take a short walk outside",
      "Watch something light or funny",
      "Try a hobby for 10 minutes",
      "Text or call someone supportive",
    ],
    gentleReminder: "You don't need to feel motivated first. Action can come before motivation.",
    actionLabel: "Try One Small Thing Today",
  },
  {
    id: "challenge-negative-thoughts",
    title: "Challenge Negative Thoughts",
    preview: "Notice harsh thoughts and gently replace them with balanced ones.",
    icon: Brain,
    iconBg: "bg-cyan-50  text-cyan-500 border-cyan-100 ",
    whyItHelps: "Depression often creates automatic negative thoughts that feel true but may not be fully accurate.",
    whatYouCanDo: [
      "Write down the negative thought",
      'Ask: "Is this 100% true?"',
      'Ask: "What would I tell a friend?"',
      "Replace it with a kinder, balanced statement",
    ],
    example: {
      instead: '"I always fail."',
      tryThis: '"I didn\'t succeed this time, but I can try again."',
    },
    actionLabel: "Reframe a Thought Now",
  },
  {
    id: "set-realistic-goals",
    title: "Set Realistic Goals",
    preview: "Break tasks into very small steps and focus on just one.",
    icon: Target,
    iconBg: "bg-blue-50  text-blue-500 border-blue-100 ",
    whyItHelps: "Large tasks can feel overwhelming. Small goals build confidence and momentum.",
    whatYouCanDo: [
      "Choose ONE small task",
      "Break it into 2–3 mini steps",
      "Do just the first step",
      "Acknowledge completion",
    ],
    example: {
      instead: '"Clean the whole room."',
      tryThis: '"Make the bed."',
    },
    actionLabel: "Pick One Small Goal",
  },
  {
    id: "limit-stressors",
    title: "Limit Stressors",
    preview: "Protect your energy by reducing overwhelming situations.",
    icon: Shield,
    iconBg: "bg-emerald-50  text-emerald-500 border-emerald-100 ",
    whyItHelps: "When energy is low, too many stressors can worsen symptoms.",
    whatYouCanDo: [
      "Say no to one non-essential task",
      "Take a short break from social media",
      "Spend quiet time alone",
      "Reduce exposure to negative environments",
    ],
    gentleReminder: "Protecting your energy is not selfish — it's necessary.",
    actionLabel: "Set One Boundary Today",
  },
  {
    id: "practice-self-care",
    title: "Practice Self-Care",
    preview: "Take care of your basic physical and emotional needs.",
    icon: Sparkles,
    iconBg: "bg-amber-50  text-amber-500 border-amber-100 ",
    whyItHelps: "Sleep, hydration, nutrition, and sunlight strongly affect mood and brain chemistry.",
    whatYouCanDo: [
      "Drink a glass of water",
      "Eat something nourishing",
      "Get 10 minutes of sunlight",
      "Sleep at a regular time",
      "Take a warm shower",
    ],
    gentleReminder: "Small physical care can create real emotional change.",
    actionLabel: "Do One Self-Care Act",
  },
];

const TIP_KEY_MAP: Record<string, string> = {
  "enjoyable-activities": "t1",
  "challenge-negative-thoughts": "t2",
  "set-realistic-goals": "t3",
  "limit-stressors": "t4",
  "practice-self-care": "t5",
};

// --- Sub-components ---

function TipsList({ onSelectTip }: { onSelectTip: (id: string) => void }) {
  const { t } = useTranslation(undefined, { i18n });

  return (
    <div className="w-full space-y-10">
      <header className="space-y-4 text-left">
        <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.2em]">
          <Sparkles size={14} />
          {t('notAlone', "You're not alone ")}
        </div>
        <h1 className="text-4xl font-black text-slate-900 leading-tight tracking-tight">
          {t('supportForLowMood', 'Support for Low Mood')}
        </h1>
        <p className="text-slate-500 text-base font-bold leading-relaxed max-w-md">
          {t('gentleSteps', 'Gentle steps to help you move forward, one day at a time.')}
        </p>
      </header>

      <div className="space-y-6 text-left">
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] px-1">
          {t('dailySupportTips', 'Daily Support Tips')}
        </h2>

        <div className="grid gap-4.5">
          {TIPS_DATA.map((tip, i) => {
            const Icon = tip.icon;
            const k = TIP_KEY_MAP[tip.id] ?? "";
            return (
              <motion.button
                key={tip.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.01, x: 4 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => onSelectTip(tip.id)}
                className="w-full text-left p-5.5 rounded-3xl bg-white border border-white/60 shadow-sm hover:shadow-md hover:border-primary/20 transition-all flex items-center gap-4 group"
              >
                <div className={`w-14 h-14 rounded-2xl ${tip.iconBg} flex items-center justify-center shrink-0 transition-transform group-hover:scale-105`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-850 text-base group-hover:text-primary transition-colors">
                    {k ? t(`${k}_title`, tip.title) : tip.title}
                  </h3>
                  <p className="text-slate-400 text-xs font-medium leading-relaxed mt-1 line-clamp-2">
                    {k ? t(`${k}_preview`, tip.preview) : tip.preview}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:translate-x-1 transition-transform shrink-0" />
              </motion.button>
            );
          })}
        </div>
      </div>

      <p className="text-center text-slate-350 text-[10px] font-black uppercase tracking-[0.2em] mt-16 px-6 leading-relaxed opacity-80">
        {t('strugglingMessage', "If you're struggling deeply, consider reaching out to someone you trust or a mental health professional.")}
      </p>
    </div>
  );
}

function TipDetailView({ tipId, onBack }: { tipId: string; onBack: () => void }) {
  const { t } = useTranslation(undefined, { i18n });
  const tip = useMemo(() => TIPS_DATA.find((t) => t.id === tipId), [tipId]);

  if (!tip) return null;

  const Icon = tip.icon;
  const k = TIP_KEY_MAP[tip.id] ?? "";
  const doKeys = tip.whatYouCanDo.map((_, i) => `${k}_do${i + 1}`);

  return (
    <div className="w-full space-y-8 pb-12 text-left">
      <div className="flex items-center justify-between">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={onBack}
          className="p-3 bg-slate-100 text-slate-650 rounded-2xl hover:bg-slate-200 hover:shadow-xl hover:shadow-primary/40 transition-colors shadow-sm"
        >
          <ArrowLeft size={18} />
        </motion.button>
        <span className="act-eyebrow">
          <Sparkles size={12} />
          {t('dailySupportTips', 'Daily Support Tips')}
        </span>
      </div>

      <div className="flex items-center gap-5 pt-2">
        <div className={`w-18 h-18 rounded-[1.75rem] ${tip.iconBg} flex items-center justify-center shrink-0 shadow-sm border border-primary/5`}>
          <Icon className="w-8 h-8" />
        </div>
        <motion.h1
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl md:text-3xl font-black text-slate-900 leading-tight tracking-tight"
        >
          {k ? t(`${k}_title`, tip.title) : tip.title}
        </motion.h1>
      </div>

      {/* Why It Helps */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-[2rem] border border-white/60 p-8 shadow-sm hover:border-primary/20 transition-all"
      >
        <h2 className="text-[10px] font-black text-primary uppercase tracking-[0.25em] mb-4">
          {t('whyItHelps', 'Why It Helps')}
        </h2>
        <p className="text-slate-650 text-base font-bold leading-relaxed">
          {k ? t(`${k}_why`, tip.whyItHelps) : tip.whyItHelps}
        </p>
      </motion.section>

      {/* What You Can Do */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <h2 className="text-lg font-black text-slate-800 tracking-tight px-1">
          {t('whatYouCanDo', 'What You Can Do')}
        </h2>
        <div className="grid gap-3">
          {doKeys.map((key, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + i * 0.08 }}
              className="flex items-start gap-4 p-5 bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 rounded-2xl border border-transparent hover:bg-white hover:border-primary/25 transition-all shadow-sm"
            >
              <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 size={16} strokeWidth={3} />
              </div>
              <span className="text-slate-700 text-sm font-bold leading-relaxed">
                {t(key, tip.whatYouCanDo[i])}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Example */}
      {tip.example && (
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="p-8 bg-emerald-50/50 rounded-[2rem] border border-emerald-100 shadow-sm space-y-5"
        >
          <div className="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-[0.25em]">
            <Lightbulb size={14} fill="currentColor" />
            {t('example', 'Example')}
          </div>
          <div className="space-y-4">
            <div className="space-y-1">
              <p className="text-[9px] font-black text-emerald-400 uppercase tracking-[0.2em]">
                {t('insteadOf', 'Instead of:')}
              </p>
              <p className="text-emerald-900/60 text-sm font-bold leading-relaxed">
                {k ? t(`${k}_ex_instead`, tip.example.instead) : tip.example.instead}
              </p>
            </div>
            <div className="h-0.5 w-8 bg-emerald-100/60 rounded-full" />
            <div className="space-y-1">
              <p className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.2em]">
                {t('try', 'Try:')}
              </p>
              <p className="text-emerald-900 text-base font-black leading-snug tracking-tight">
                {k ? t(`${k}_ex_try`, tip.example.tryThis) : tip.example.tryThis}
              </p>
            </div>
          </div>
        </motion.section>
      )}

      {/* Gentle Reminder */}
      {tip.gentleReminder && (
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-8 bg-gradient-to-r from-primary to-sky-400 border-none rounded-[2rem] text-white space-y-4 shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-6 text-white/5 pointer-events-none">
            <MessageCircle size={100} strokeWidth={1} />
          </div>
          <div className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-[0.25em] relative z-10">
            <Sparkles size={14} />
            {t('gentleReminder', 'Gentle Reminder')}
          </div>
          <p className="text-slate-200 text-base font-bold italic leading-relaxed relative z-10">
            "{k ? t(`${k}_rem`, tip.gentleReminder) : tip.gentleReminder}"
          </p>
        </motion.section>
      )}
    </div>
  );
}

// --- Main Page Component ---

function DepressionTipsInner() {
  const { t } = useTranslation(undefined, { i18n });
  const [selectedTipId, setSelectedTipId] = useState<string | null>(null);

  // Sync URL query lang parameter
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const lang = params.get('lang') || 'en';
      loadLocale(lang);
    }
  }, []);

  return (
    <PremiumLayout
      title={t('app_title', 'Depression Tips')}
      icon={<Heart className="w-6 h-6 text-primary" />}
      onBack={selectedTipId !== null ? () => setSelectedTipId(null) : undefined}
    >
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-4 min-h-[70vh]">
        <div className="relative flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            {selectedTipId === null ? (
              <motion.div
                key="list"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="w-full flex-1 flex flex-col"
              >
                <TipsList onSelectTip={(id) => setSelectedTipId(id)} />
              </motion.div>
            ) : (
              <motion.div
                key="detail"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                className="w-full flex-1 flex flex-col"
              >
                <TipDetailView tipId={selectedTipId} onBack={() => setSelectedTipId(null)} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PremiumLayout>
  );
}

export default function DepressionTipsPage() {
  return (
    <I18nextProvider i18n={i18n}>
      <DepressionTipsInner />
    </I18nextProvider>
  );
}