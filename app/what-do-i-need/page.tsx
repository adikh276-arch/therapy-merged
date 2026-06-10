'use client';
'use client';

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartHandshake, Leaf, MessageSquare, Users, Lightbulb, Anchor, ShieldCheck, Award, Search, Mic, Sun, Smartphone, Ban, HelpCircle, Sparkles, BookOpen, Clock, X, Heart, ArrowRight } from "lucide-react";
import { useTranslation, I18nextProvider } from "react-i18next";
import { PremiumLayout } from "@/components/shared/PremiumLayout";
import { PremiumComplete } from "@/components/shared/PremiumComplete";
import { handlePlatformExit } from "@/lib/navigation";
import i18n, { loadLocale } from "./i18n";
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

const NEED_ICON_MAP: Record<string, any> = {
  "Emotional support": HeartHandshake,
  "Space / time for myself": Leaf,
  "Clear communication": MessageSquare,
  "Reassurance": Users,
  "Understanding": Lightbulb,
  "Stability": Anchor,
  "Honesty": ShieldCheck,
  "Respect": Award,
  "Clarity about relationship": Search,
};

const ACTION_ICON_MAP: Record<string, any> = {
  "Say something honestly": Mic,
  "Take time for myself": Sun,
  "Reach out to someone": Smartphone,
  "Set a small boundary": Ban,
  "Not sure yet": HelpCircle,
};

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

interface SavedReflection {
  id: string;
  date: string;
  primaryNeed: string;
  reflection: string;
  action: string;
}

// --- CHIP COMPONENT ---
interface NeedChipProps {
  label: string;
  selected: boolean;
  onToggle: () => void;
  icon?: any;
}

const NeedChip = ({ label, selected, onToggle, icon: Icon }: NeedChipProps) => (
  <motion.button
    onClick={onToggle}
    className={`inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-full text-sm font-medium cursor-pointer select-none transition-all duration-200 ease-out border ${
      selected
        ? "bg-[var(--lavender)] text-white border-[var(--lavender)] scale-[1.05] shadow-[0_4px_14px_rgba(154,106,220,0.3)]"
        : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
    }`}
    whileTap={{ scale: 0.95 }}
    layout
  >
    {Icon && <Icon size={16} className={selected ? "text-white" : "text-primary"} />}
    <span>{label}</span>
  </motion.button>
);

function WhatDoINeedInner() {
  const { t } = useTranslation(undefined, { i18n });
  const [screen, setScreen] = useState(1);
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);
  const [customNeed, setCustomNeed] = useState("");
  const [step2Phase, setStep2Phase] = useState<"select" | "prioritize" | "focus">("select");
  const [primaryNeed, setPrimaryNeed] = useState("");
  const [reflection, setReflection] = useState("");
  const [selectedAction, setSelectedAction] = useState("");
  const [customAction, setCustomAction] = useState("");
  const [step3Phase, setStep3Phase] = useState<"reflect" | "action" | "closing">("reflect");
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<SavedReflection[]>([]);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

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
    setIsLoadingHistory(true);
    try {
      const res = await fetch(apiPath("/api/what-do-i-need"));
      if (res.ok) {
        const rows = await res.json();
        setHistory(rows.map((r: any) => {
          let parsed: any = {};
          try {
            parsed = JSON.parse(r.needs);
          } catch {
            parsed = { primaryNeed: r.needs, reflection: "", action: "" };
          }
          return {
            id: r.id,
            date: (() => {
              if (!r.created_at) return "N/A";
              try {
                const normalized = String(r.created_at).replace(" ", "T");
                const d = new Date(normalized);
                if (isNaN(d.getTime())) {
                  const d2 = new Date(r.created_at);
                  if (isNaN(d2.getTime())) return "N/A";
                  return d2.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
                }
                return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
              } catch {
                return "N/A";
              }
            })(),
            primaryNeed: parsed.primaryNeed || "General",
            reflection: parsed.reflection || "",
            action: parsed.action || "",
          };
        }));
      }
    } catch (error) {
      console.error("Failed to fetch history:", error);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const deleteReflection = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this reflection?")) return;
    try {
      const res = await fetch(apiPath(`/api/what-do-i-need?id=${id}`), { method: "DELETE" });
      if (res.ok) {
        setHistory(prev => prev.filter(item => item.id !== id));
        toast.success("Reflection deleted");
      } else {
        toast.error("Failed to delete reflection");
      }
    } catch (err) {
      console.error("Failed to delete reflection:", err);
      toast.error("Failed to delete reflection");
    }
  };

  const tNeeds = t("needs", { returnObjects: true });
  const needs_obj = (typeof tNeeds === 'object' && tNeeds !== null && !Array.isArray(tNeeds) ? tNeeds as any : null) || {
    "Emotional support": { label: "Emotional support", prompt: "What kind of support would actually help you right now?", hints: ["I just need someone to...", "It would help if...", "What I really want is..."] },
    "Space / time for myself": { label: "Space / time for myself", prompt: "What would having that space look like for you?", hints: ["I'd use that time to...", "Space would let me...", "I need room to..."] },
    "default": { prompt: "What would this look like in a real situation?", hints: ["What comes to mind is...", "Right now I feel...", "If I'm honest with myself..."] }
  };

  const default_needs = Object.keys(NEED_ICON_MAP);
  const current_need_data = needs_obj[primaryNeed] || needs_obj["default"];
  const hints = current_need_data.hints || [];

  useEffect(() => {
    if (step3Phase !== "reflect" || hints.length === 0) return;
    const interval = setInterval(() => {
      setPlaceholderIdx((i) => (i + 1) % hints.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [step3Phase, hints.length]);

  const toggleNeed = useCallback((need: string) => {
    setSelectedNeeds((prev) =>
      prev.includes(need) ? prev.filter((n) => n !== need) : [...prev, need]
    );
  }, []);

  const addCustomNeed = () => {
    if (customNeed.trim() && !selectedNeeds.includes(customNeed.trim())) {
      setSelectedNeeds((prev) => [...prev, customNeed.trim()]);
      setCustomNeed("");
    }
  };

  const goToPrioritize = () => setStep2Phase("prioritize");
  const selectPrimary = (need: string) => {
    setPrimaryNeed(need);
    setStep2Phase("focus");
  };

  const goToScreen3 = () => {
    setScreen(3);
    setStep3Phase("reflect");
    setPlaceholderIdx(0);
  };

  const goToAction = () => setStep3Phase("action");
  const goToClosing = () => setStep3Phase("closing");

  const handleSave = async () => {
    const needsData = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
      primaryNeed,
      reflection,
      action: selectedAction || customAction,
    };

    try {
      const res = await fetch(apiPath("/api/what-do-i-need"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(needsData),
      });

      if (res.ok) {
        toast.success(t("toasts.save_success", "Reflection saved"));
        fetchHistory();
        setScreen(4);
      } else {
        toast.error(t("toasts.save_error", "Failed to save reflection"));
      }
    } catch (error) {
      console.error("Failed to save reflection:", error);
      toast.error(t("toasts.save_error", "Failed to save reflection"));
    }
  };

  const handleFinish = () => setScreen(4);

  const handleBack = () => {
    if (screen === 1) return;
    if (screen === 2) {
      if (step2Phase === "focus") setStep2Phase("prioritize");
      else if (step2Phase === "prioritize") setStep2Phase("select");
      else setScreen(1);
    } else if (screen === 3) {
      if (step3Phase === "closing") setStep3Phase("action");
      else if (step3Phase === "action") setStep3Phase("reflect");
      else { setScreen(2); setStep2Phase("focus"); }
    }
  };

  if (screen === 4) {
    return (
      <PremiumComplete
        shareEmoji=""
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PremiumLayout>
  );
}

function TrashIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2">
      <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6" />
    </svg>
  );
}

export default function WhatDoINeedPage() {
  return (
    <I18nextProvider i18n={i18n}>
      <WhatDoINeedInner />
    </I18nextProvider>
  );
}