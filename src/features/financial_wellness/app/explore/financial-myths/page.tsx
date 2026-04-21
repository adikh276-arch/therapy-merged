'use client';

import {
  AlertCircle, Check, X, Home, CreditCard,
  Landmark, Shield, TrendingUp, Timer, Wallet,
  Smartphone, Activity, XCircle, AlertTriangle, HelpCircle,
  Coins, Layout, Info
} from 'lucide-react';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useTranslation } from 'react-i18next';

const MYTHS = [
  { myth: "I need a lot of money to start investing", reality: "Wealth building is about consistency and time. Many platforms allow micro-investments. Start small, but start now.", verdict: 'MYTH', icon: Coins },
  { myth: "Budgeting means giving up everything fun", reality: "Effective budgeting includes a dedicated \"wants\" category. It gives you guilt-free permission to enjoy your money.", verdict: 'MYTH', icon: Layout },
  { myth: "Strategic debt should always be avoided", reality: "Low-interest debt used to acquire high-yield assets can build wealth faster (e.g., mortgages or student loans).", verdict: 'COMPLEX', icon: CreditCard },
  { myth: "Insurance is a form of investment", reality: "Insurance is for protection; investments are for growth. Mixing them usually results in higher costs and lower returns.", verdict: 'MYTH', icon: Shield },
  { myth: "You are too young to worry about retirement", reality: "Compounding is most powerful in your 20s. Starting at 25 vs 35 can significantly change your terminal wealth.", verdict: 'MYTH', icon: Timer },
];

const VERDICT_CONFIG = {
  MYTH: { color: 'var(--brand-danger)', icon: XCircle, label: "Busted" },
  PARTIAL: { color: 'var(--brand-gold)', icon: AlertTriangle, label: "Partial Truth" },
  COMPLEX: { color: 'var(--brand-accent)', icon: HelpCircle, label: "Nuanced" }
};

export default function FinancialMyths() {
  const { t } = useTranslation();
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      <div className="topbar">
        <div style={{ width: 44, height: 44, borderRadius: '12px', background: 'var(--brand-danger)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(225,112,85,0.3)' }}>
          <AlertCircle size={20} color="white" />
        </div>
        <div style={{ flex: 1 }}><h1 className="heading-md">{t('Myth vs. Reality')}</h1></div>
        <LanguageSelector />
      </div>

      <div className="page-wrapper">
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <h2 className="display-sm" style={{ marginBottom: 4 }}>{t("Dismantling Fallacies")}</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{t("We expose the most common financial misconceptions sabotaging your wealth.")}</p>
        </div>

        <div className="stack-6">
          {MYTHS.map((item, i) => {
            const config = VERDICT_CONFIG[item.verdict as keyof typeof VERDICT_CONFIG];
            const VerdictIcon = config.icon;
            const MythIcon = item.icon;
            return (
              <div key={i} className="card card-hover" style={{ borderLeft: `6px solid ${config.color}`, padding: 'var(--space-6)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 12px', background: `${config.color}10`, borderRadius: 99, color: config.color, fontSize: 10, fontWeight: 900 }}>
                       <VerdictIcon size={12} /> {t(config.label)}
                    </div>
                </div>
                
                 <div style={{ background: '#f8f9fa', padding: '16px', borderRadius: 12, marginBottom: 12 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', display: 'flex', gap: 8 }}>
                       <X size={16} color="var(--brand-danger)" /> "{t(item.myth)}"
                    </div>
                 </div>
 
                 <div style={{ background: '#e6f4ea', padding: '16px', borderRadius: 12 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#00A884', lineHeight: 1.6, display: 'flex', gap: 8 }}>
                       <Check size={18} color="#00A884" /> <span><strong>{t('The Reality')}:</strong> {t(item.reality)}</span>
                    </div>
                 </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
