import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import BACCalculator from "@/components/BACCalculator";
import CostCalculator from "@/components/CostCalculator";
import SessionImpactCalculator from "@/components/SessionImpactCalculator";
import ReductionCalculator from "@/components/ReductionCalculator";
import LanguageSelector from "@/components/LanguageSelector";
import { Button } from "@/components/ui/button";
import { RotateCcw, Car, Wallet, AlertTriangle, ArrowDownCircle, ChevronDown } from "lucide-react";

const Index = () => {
  const { t } = useTranslation();
  const [openId, setOpenId] = useState<string | null>(null);
  const [resetKey, setResetKey] = useState(0);

  const CARDS = [
    {
      id: "bac",
      title: t("cards.bac.title"),
      subtitle: t("cards.bac.subtitle"),
      icon: Car,
      iconBg: "bg-bac-bg",
      iconColor: "text-bac-accent",
      borderColor: "border-bac-accent/20",
      component: BACCalculator,
    },
    {
      id: "cost",
      title: t("cards.cost.title"),
      subtitle: t("cards.cost.subtitle"),
      icon: Wallet,
      iconBg: "bg-cost-bg",
      iconColor: "text-cost-accent",
      borderColor: "border-cost-accent/20",
      component: CostCalculator,
    },
    {
      id: "session",
      title: t("cards.session.title"),
      subtitle: t("cards.session.subtitle"),
      icon: AlertTriangle,
      iconBg: "bg-health-bg",
      iconColor: "text-health-accent",
      borderColor: "border-health-accent/20",
      component: SessionImpactCalculator,
    },
    {
      id: "reduction",
      title: t("cards.reduction.title"),
      subtitle: t("cards.reduction.subtitle"),
      icon: ArrowDownCircle,
      iconBg: "bg-reduce-bg",
      iconColor: "text-reduce-accent",
      borderColor: "border-reduce-accent/20",
      component: ReductionCalculator,
    },
  ];

  const handleReset = () => {
    setResetKey((k) => k + 1);
    setOpenId(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <LanguageSelector />
      <div className="mx-auto max-w-lg px-4 py-10 space-y-8">
        {/* Header */}
        <header className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-medium">
            {t("common.private_notice")}
          </div>
          <h1 className="font-display text-4xl font-bold text-foreground tracking-tight leading-tight whitespace-pre-line">
            {t("common.title").replace(" ", "\n")}
          </h1>
          <p className="text-sm text-muted-foreground max-w-[280px] mx-auto leading-relaxed">
            {t("common.description")}
          </p>
        </header>

        {/* Cards */}
        <div key={resetKey} className="space-y-3">
          {CARDS.map((card) => {
            const isOpen = openId === card.id;
            const Icon = card.icon;
            const Comp = card.component;

            return (
              <div
                key={card.id}
                className={`rounded-2xl border bg-card overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? card.borderColor + " shadow-lg shadow-black/[0.03]"
                    : "border-border hover:border-border/80 hover:shadow-sm"
                }`}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : card.id)}
                  className="w-full flex items-center gap-3.5 p-4 text-left transition-colors"
                >
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${card.iconBg}`}>
                    <Icon className={`h-5 w-5 ${card.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-[15px] font-semibold text-foreground leading-tight">{card.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{card.subtitle}</p>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-5 pt-1 border-t border-border/50">
                        <Comp />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Reset */}
        <div className="flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-muted-foreground gap-2 hover:text-foreground"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            {t("common.start_over")}
          </Button>
        </div>

        {/* Footer */}
        <footer className="text-center pb-6">
          <p className="text-[11px] text-muted-foreground/50 leading-relaxed whitespace-pre-line">
            {t("common.disclaimer")}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
