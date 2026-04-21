'use client';

import { useState, useEffect } from 'react';
import { 
  Shield, Save, Check, Info, AlertTriangle, 
  HeartPulse, Briefcase, Home, Users, Wallet,
  BarChart4, TrendingUp, MapPin, Calendar, ArrowRight,
  TrendingDown, MinusCircle, XCircle, ChevronLeft, RotateCcw, Clock
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { storage, fmt } from '@/lib/storage';
import { PageHeader } from '@/components/layout/PageHeader';

interface EFData {
  monthlyExpenses: number;
  monthsCover: number;
  currentSaved: number;
}

interface EFHistory {
  date: string;
  monthlyExpenses: number;
  monthsCover: number;
  currentSaved: number;
  target: number;
}

const SCENARIOS = [
  { icon: HeartPulse, label: "Medical Emergency", months: 2, desc: "Covers typical urgent medical crises" },
  { icon: Briefcase, label: "Income Security", months: 6, desc: "Safety net for potential job loss" },
  { icon: Home, label: "Asset Repair", months: 1, desc: "Coverage for major home/car repairs" },
  { icon: Users, label: "Family Support", months: 3, desc: "Funds for unexpected family needs" },
];

const WHERE_TIPS = [
  { icon: Wallet, label: "High-Yield Savings", rate: '3-5%', pros: 'Fully liquid, instant access', cons: 'Lower relative returns' },
  { icon: BarChart4, label: "Fixed Deposits", rate: '6-8%', pros: 'Guaranteed, FDIC-insured', cons: 'Time-locked capital' },
  { icon: TrendingUp, label: "Money Market Funds", rate: '4-6%', pros: 'Better than savings', cons: 'T+1 withdrawal time' },
];

export default function EmergencyFund() {
  const { t } = useTranslation();
  const [data, setData] = useState<EFData>({ monthlyExpenses: 0, monthsCover: 6, currentSaved: 0 });
  const [history, setHistory] = useState<EFHistory[]>([]);
  const [saved, setSaved] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    // 1. Initial local load
    const local = storage.get<EFData>('emergency_fund', { monthlyExpenses: 0, monthsCover: 6, currentSaved: 0 });
    if (local && typeof local === 'object') setData(prev => ({ ...prev, ...local }));
    
    const list = storage.get<EFHistory[]>('emergency_fund_history', []);
    setHistory(Array.isArray(list) ? list : []);

    // 2. Async server sync
    storage.fetch('emergency_fund').then(remote => {
      if (remote && typeof remote === 'object') {
        setData(prev => ({ ...prev, ...remote }));
        storage.set('emergency_fund', remote);
      }
    });
    storage.fetch('emergency_fund_history').then(remoteHistory => {
      if (Array.isArray(remoteHistory)) {
        setHistory(remoteHistory);
        storage.set('emergency_fund_history', remoteHistory);
      }
    });
  }, []);

  const target = data.monthlyExpenses * data.monthsCover;
  const remaining = Math.max(0, target - data.currentSaved);
  const percent = target > 0 ? Math.min(100, (data.currentSaved / target) * 100) : 0;
  const monthlyNeeded12 = remaining > 0 ? remaining / 12 : 0;
  const monthlyNeeded6 = remaining > 0 ? remaining / 6 : 0;

  const handleSave = () => {
    storage.set('emergency_fund', data);
    const newEntry: EFHistory = {
      date: new Date().toISOString(),
      ...data,
      target
    };
    const updatedHistory = [newEntry, ...history].slice(0, 10);
    setHistory(updatedHistory);
    storage.set('emergency_fund_history', updatedHistory);
    storage.sync('emergency_fund', data);
    storage.sync('emergency_fund_history', newEntry); // Sync only the new entry
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const scenariosCovers = SCENARIOS.map(s => ({
    ...s,
    covered: data.currentSaved >= data.monthlyExpenses * s.months,
  }));

  const getStatusLabel = () => {
    if (percent === 0) return { label: t("NOT STARTED"), color: 'var(--brand-danger)' };
    if (percent < 30) return { label: t("VULNERABLE"), color: 'var(--brand-danger)' };
    if (percent < 60) return { label: t("DEVELOPING"), color: 'var(--brand-gold)' };
    if (percent < 95) return { label: t("RESILIENT"), color: 'var(--brand-accent)' };
    return { label: t("MASTERED"), color: 'var(--brand-success)' };
  };

  const status = getStatusLabel();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      <PageHeader 
        title={t("Emergency Fund Builder")}
        backHref="/"
        accentColor="#e84393"
        rightSlot={(
           <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-primary btn-sm" onClick={handleSave}>
                 {saved ? <Check size={14} /> : <Save size={14} />} {saved ? t('Saved') : t('Save')}
              </button>
           </div>
        )}
      />
      <div style={{ maxWidth: 640, margin: '0 auto', padding: 'var(--space-6) var(--space-4) var(--space-16)' }}>

        {showHistory && history.length > 0 && (
          <div className="card" style={{ padding: 'var(--space-6)', marginBottom: 'var(--space-8)', animation: 'slideInDown 0.3s ease' }}>
            <label className="label-caps">{t('Financial History')}</label>
            <div className="stack-3" style={{ marginTop: 'var(--space-4)' }}>
              {history.map((h, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < history.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{new Date(h.date).toLocaleDateString()}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>{fmt.currency(h.currentSaved)} / {fmt.currency(h.target)}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="stack-8">
          {/* Section 1: Expenses */}
          <div className="card" style={{ padding: 'var(--space-8)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 'var(--space-8)' }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--brand-primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Wallet size={20} color="var(--brand-primary)" />
              </div>
              <h2 className="heading-md">{t('Expense Assessment')}</h2>
            </div>

            <div className="stack-6">
              <div className="form-group">
                <label className="form-label">{t('Monthly Essential Spend')}</label>
                <div className="input-group">
                  <span className="input-prefix"></span>
                  <input type="number" className="form-input" style={{ fontSize: 20, fontWeight: 800 }} placeholder="0.00" value={data.monthlyExpenses || ''} onChange={e => setData(d => ({ ...d, monthlyExpenses: Number(e.target.value) }))} />
                </div>
                <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 8 }}>{t('Fixed bills, rent, food, and necessary debt.')}</p>
              </div>

              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <label className="form-label">{t('Duration Multiplier')}</label>
                  <span style={{ fontSize: 16, fontWeight: 900, color: 'var(--brand-primary)' }}>{data.monthsCover} Months</span>
                </div>
                <input type="range" min={3} max={12} value={data.monthsCover} onChange={e => setData(d => ({ ...d, monthsCover: Number(e.target.value) }))} style={{ width: '100%', height: 6, borderRadius: 3, appearance: 'none', background: 'var(--border-subtle)', outline: 'none' }} className="accent-brand" />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)' }}>{t("3M (Standard)")}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)' }}>{t("12M (Ultimate)")}</span>
                </div>
              </div>

              {target > 0 && (
                <div style={{ padding: 'var(--space-6)', background: 'var(--bg-glass-light)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-brand)', textAlign: 'center' }}>
                  <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: 4 }}>{t('TARGET RESERVE CAPITAL')}</div>
                  <div style={{ fontSize: 32, fontWeight: 900, color: 'var(--brand-primary)', fontFamily: 'var(--font-display)' }}>{fmt.currency(target)}</div>
                </div>
              )}
            </div>
          </div>

          {/* Section 2: Progress */}
          <div className="card" style={{ padding: 'var(--space-8)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 'var(--space-8)' }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(0,168,132,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TrendingUp size={20} color="#00A884" />
              </div>
              <h2 className="heading-md">{t('Funding Status')}</h2>
            </div>

            <div className="stack-6">
              <div className="form-group">
                <label className="form-label">{t('Current Reserve Balance')}</label>
                <div className="input-group">
                  <input type="number" className="form-input" style={{ fontSize: 20, fontWeight: 800 }} placeholder="0.00" value={data.currentSaved || ''} onChange={e => setData(d => ({ ...d, currentSaved: Number(e.target.value) }))} />
                </div>
              </div>

              {target > 0 && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12 }}>
                     <div>
                        <div style={{ fontSize: 10, fontWeight: 900, color: status.color, marginBottom: 2 }}>{status.label}</div>
                        <div style={{ fontSize: 18, fontWeight: 800 }}>{Math.round(percent)}% Funded</div>
                     </div>
                     <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--text-muted)' }}>{t('GAP')}</div>
                        <div style={{ fontSize: 14, fontWeight: 800 }}>{fmt.currency(remaining)}</div>
                     </div>
                  </div>
                  <div className="progress-bar" style={{ height: 12, background: 'var(--border-subtle)' }}>
                     <div className="progress-fill" style={{ width: `${percent}%`, background: percent >= 95 ? 'var(--brand-success)' : 'var(--brand-primary)' }} />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Section 3: Strategic Scenarios */}
          <div className="card" style={{ padding: 'var(--space-8)' }}>
             <label className="label-caps" style={{ marginBottom: 'var(--space-6)' }}>{t('Resilience Scenarios')}</label>
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                {scenariosCovers.map(s => (
                  <div key={s.label} style={{ padding: 'var(--space-5)', borderRadius: 'var(--radius-xl)', background: s.covered ? '#00A88408' : '#e8439308', border: `1px solid ${s.covered ? '#00A88415' : '#e8439315'}` }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <s.icon size={18} color={s.covered ? '#00A884' : '#e84393'} />
                        {s.covered ? <Check size={14} color="#00A884" strokeWidth={3} /> : <XCircle size={14} color="#e84393" />}
                     </div>
                     <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)' }}>{t(s.label)}</div>
                     <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)' }}>{t('{{count}} Mo Fund', { count: s.months })}</div>
                  </div>
                ))}
             </div>
          </div>

          {/* Section 4: Where to put it */}
          <div>
            <label className="label-caps" style={{ marginBottom: 'var(--space-4)' }}>{t('Deployment Channels')}</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-3)' }}>
              {WHERE_TIPS.map(tip => (
                <div key={tip.label} className="card" style={{ padding: 'var(--space-5)' }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>{t(tip.label)}</div>
                  <div style={{ fontSize: 18, fontWeight: 900, color: 'var(--brand-success)', marginBottom: 8 }}>{tip.rate} {t('Est.')}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', lineHeight: 1.4 }}>{t(tip.pros)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
