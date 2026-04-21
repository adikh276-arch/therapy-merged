'use client';

import { useState, useCallback, useEffect } from 'react';
import {
  TrendingUp, ChevronLeft, ChevronRight, ArrowRight,
  Shield, Zap, Target, Check, Save, RotateCcw,
  PieChart as PieChartIcon, Landmark, Activity, BarChart3
} from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { storage, fmt, calc } from '@/lib/storage';
import { PageHeader } from '@/components/layout/PageHeader';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'next/navigation';

interface FormData {
  amount: number; period: number;
  risk: 'Conservative' | 'Moderate' | 'Aggressive';
  goal: string; monthly: number;
}

const RISK_PROFILES = {
  Conservative: {
    return: 7.5, label: "PRESERVATION", color: '#00A884',
    gradient: 'linear-gradient(135deg, #00A884, #00D2D3)',
    desc: "Stable, lower-risk. capital preservation.",
    allocation: [
      { name: 'Fixed Income', value: 50, color: '#00A884' },
      { name: 'Bullion', value: 20, color: '#F39C12' },
      { name: 'Equity', value: 20, color: '#2563EB' },
      { name: 'Liquidity', value: 10, color: '#9CA3AF' },
    ],
    vehicles: ['Debt Mutual Funds', 'Sovereign Gold Bonds', 'PPF', 'NPS'],
    returnRange: '7-9%',
  },
  Moderate: {
    return: 11, label: "BALANCED", color: '#2563EB',
    gradient: 'linear-gradient(135deg, #2563EB, #60A5FA)',
    desc: "Balanced. Mix of growth and stability.",
    allocation: [
      { name: 'Equity', value: 50, color: '#2563EB' },
      { name: 'Fixed Income', value: 25, color: '#00A884' },
      { name: 'Bullion', value: 15, color: '#F39C12' },
      { name: 'Liquidity', value: 10, color: '#9CA3AF' },
    ],
    vehicles: ['Hybrid Mutual Funds', 'Large-cap Index Funds', 'Corporate Bonds', 'Blue-chip Stocks'],
    returnRange: '10-13%',
  },
  Aggressive: {
    return: 15, label: "EXPANSION", color: '#e84393',
    gradient: 'linear-gradient(135deg, #e84393, #fd79a8)',
    desc: "High-growth. Suited for long horizons.",
    allocation: [
      { name: 'Equity', value: 75, color: '#e84393' },
      { name: 'Fixed Income', value: 10, color: '#00A884' },
      { name: 'Bullion', value: 10, color: '#F39C12' },
      { name: 'Liquidity', value: 5, color: '#9CA3AF' },
    ],
    vehicles: ['Direct Equity', 'Small-cap Focus Funds', 'Sector ETFs', 'International Funds'],
    returnRange: '14-18%',
  },
};

const GOALS = ['Wealth Creation', 'Retirement', 'Real Estate', 'Education', 'Other'];
const PERIODS = [1, 3, 5, 10, 20];

const STEPS = ['Capital', 'Strategy', 'Results'];

export default function InvestmentPlanner() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const suffix = query ? `?${query}` : '';

  const [step, setStep] = useState(-1);
  const [saved, setSaved] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [form, setForm] = useState<FormData>({
    amount: 0, period: 5, risk: 'Moderate', goal: 'Wealth Creation', monthly: 0
  });

  useEffect(() => {
    // 1. Local
    const list = storage.get('invest_history') || [];
    setHistory(Array.isArray(list) ? list : []);
    const local = storage.get('investment_form', null);
    if (local && typeof local === 'object') setForm(prev => ({ ...prev, ...local }));

    // 2. Server
    storage.fetch('invest_history').then(remote => {
      if (Array.isArray(remote)) {
        setHistory(remote);
        storage.set('invest_history', remote);
      }
    });

    storage.fetch('investment_form').then(remote => {
      if (remote && typeof remote === 'object') {
        setForm(prev => ({ ...prev, ...remote }));
        storage.set('investment_form', remote);
      }
    });
  }, []);

  const profile = RISK_PROFILES[form.risk];

  const compute = useCallback(() => {
    const projectedAmount = calc.futureValue(form.amount, profile.return, form.period, form.monthly);
    const totalInvested = form.amount + form.monthly * form.period * 12;
    const returns = projectedAmount - totalInvested;
    const snapshot = { projectedAmount, totalInvested, returns, riskLevel: profile.label, goal: form.goal, date: new Date().toISOString() };
    
    // Save to history
    const newHistory = [snapshot, ...history.slice(0, 4)];
    storage.set('invest_history', newHistory);
    storage.sync('invest_history', newHistory);
    setHistory(newHistory);
    
    setStep(2);
  }, [form, profile, history]);

  const handleSave = () => {
    storage.set('investment_form', form);
    storage.sync('investment_form', form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const projectedAmount = calc.futureValue(form.amount, profile.return, form.period, form.monthly);
  const totalInvested = form.amount + form.monthly * form.period * 12;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      <div style={{ maxWidth: 640, margin: '0 auto', padding: 'var(--space-6) var(--space-4) var(--space-16)' }}>
        
        {true && (
          <PageHeader 
            title={t('Investment Planner')}
            backHref="/"
            accentColor="#2563EB"
            rightSlot={step === 2 ? (
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={handleSave} className="btn btn-primary btn-sm">{saved ? <Check size={14} /> : <Save size={14} />} {saved ? t('Success') : t('Save')}</button>
                <button onClick={() => { setStep(0); setForm({ amount: 0, period: 5, risk: 'Moderate', goal: 'Wealth Creation', monthly: 0 }); }} className="btn btn-secondary btn-icon btn-sm"><RotateCcw size={14} /></button>
              </div>
            ) : null}
          />
        )}

        {step === -1 && (
          <div style={{ textAlign: 'center', padding: 'var(--space-12) var(--space-4)', animation: 'fadeIn 0.5s ease' }}>
            <div style={{ width: 80, height: 80, borderRadius: '24px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-8)', boxShadow: 'var(--shadow-lg)' }}>
              <TrendingUp size={40} color="var(--brand-primary)" />
            </div>
            <h1 className="display-sm" style={{ marginBottom: 'var(--space-4)' }}>{t('Wealth Projection')}</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-md)', lineHeight: 1.6, maxWidth: 440, margin: '0 auto var(--space-10)' }}>
              {t('Model your financial future. Simulate asset growth across diverse risk profiles and optimize your portfolio allocation.')}
            </p>
            <button className="btn btn-primary btn-lg" onClick={() => setStep(0)} style={{ minWidth: 220 }}>
              {t('Begin Analysis')} <ArrowRight size={18} style={{ marginLeft: 8 }} />
            </button>

            {history.length > 0 && (
              <div style={{ marginTop: 'var(--space-16)', textAlign: 'left' }}>
                <label className="label-caps" style={{ marginBottom: 'var(--space-4)', display: 'block' }}>{t('Recent Projections')}</label>
                <div className="stack-3">
                  {history.map((h, i) => (
                    <div key={i} className="card" style={{ padding: 'var(--space-4)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--text-primary)' }}>{t(h.goal)}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Target: {fmt.currency(h.projectedAmount)}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 800, fontSize: 13, color: 'var(--brand-primary)' }}>{t(h.riskLevel)}</div>
                        <div style={{ fontSize: 10, color: 'var(--text-faint)' }}>{new Date(h.date).toLocaleDateString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {step >= 0 && (
           <div style={{ display: 'flex', gap: 6, marginBottom: 'var(--space-8)' }}>
             {STEPS.map((s, i) => (
               <div key={s} style={{
                 flex: 1, height: 3, borderRadius: 2,
                 background: i <= step ? 'var(--brand-primary)' : 'var(--border-default)',
                 transition: 'all 0.4s ease',
               }} />
             ))}
           </div>
        )}

        {step === 0 && (
          <div style={{ animation: 'fadeInUp 0.4s ease both' }}>
            <p className="label-caps" style={{ color: 'var(--brand-primary)', marginBottom: 'var(--space-2)' }}>{t('Step 1: Capital Configuration')}</p>
            <h2 className="heading-xl" style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-6)' }}>{t('Determine your seed capital')}</h2>
            
            <div className="stack-4" style={{ marginBottom: 'var(--space-8)' }}>
              <div className="card" style={{ padding: 'var(--space-5)' }}>
                <label className="form-label" style={{ marginBottom: 8, display: 'block' }}>{t('Initial Lump Sum')}</label>
                <input
                  type="number" className="form-input"
                  style={{ fontSize: 'var(--text-xl)', fontWeight: 700 }}
                  value={form.amount || ''}
                  onChange={e => setForm(f => ({ ...f, amount: Number(e.target.value) }))}
                  placeholder="0"
                />
              </div>

              <div className="card" style={{ padding: 'var(--space-5)' }}>
                <label className="form-label" style={{ marginBottom: 8, display: 'block' }}>{t('Monthly Contribution (SIP)')}</label>
                <input
                  type="number" className="form-input"
                  style={{ fontSize: 'var(--text-xl)', fontWeight: 700 }}
                  value={form.monthly || ''}
                  onChange={e => setForm(f => ({ ...f, monthly: Number(e.target.value) }))}
                  placeholder="0"
                />
              </div>
            </div>

            <button onClick={() => setStep(1)} disabled={!form.amount && !form.monthly} className="btn btn-primary btn-lg btn-full">
              {t('Proceed to Strategy')} <ArrowRight size={18} />
            </button>
          </div>
        )}

        {step === 1 && (
          <div style={{ animation: 'slideInRight 0.35s ease both' }}>
            <p className="label-caps" style={{ color: 'var(--brand-primary)', marginBottom: 'var(--space-2)' }}>{t('Step 2: Risk Profile')}</p>
            <h2 className="heading-xl" style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-6)' }}>{t('Asset Allocation Strategy')}</h2>

            <div className="stack-3" style={{ marginBottom: 'var(--space-8)' }}>
              {(['Conservative', 'Moderate', 'Aggressive'] as const).map(r => {
                const p = RISK_PROFILES[r];
                const selected = form.risk === r;
                return (
                  <button key={r} onClick={() => setForm(f => ({ ...f, risk: r }))} className={`option-btn ${selected ? 'active' : ''}`} style={{ borderColor: selected ? p.color : undefined }}>
                    <div className="option-letter" style={{ color: p.color, background: selected ? `${p.color}15` : undefined }}>{r[0]}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{t(r)}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-faint)' }}>{t('Target')} {p.returnRange} {t('CAGR')}</div>
                    </div>
                    {selected && <Check size={16} color={p.color} />}
                  </button>
                );
              })}
            </div>

            <div style={{ marginBottom: 'var(--space-8)' }}>
              <label className="form-label" style={{ marginBottom: 12, display: 'block' }}>{t('Investment Horizon')}</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {PERIODS.map(p => (
                  <button key={p} onClick={() => setForm(f => ({ ...f, period: p }))} style={{ flex: 1 }} className={`btn ${form.period === p ? 'btn-primary' : 'btn-secondary'} btn-sm`}>
                    {p}Y
                  </button>
                ))}
              </div>
            </div>

            <button onClick={compute} className="btn btn-primary btn-lg btn-full">
              {t('Generate Portfolio')} <BarChart3 size={18} />
            </button>
          </div>
        )}

        {step === 2 && (
          <div style={{ animation: 'fadeInUp 0.5s ease both' }}>
            <div style={{ background: profile.gradient, borderRadius: 'var(--radius-2xl)', padding: 'var(--space-8)', marginBottom: 'var(--space-6)', color: 'white' }}>
               <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', opacity: 0.8, letterSpacing: '0.05em' }}>{t('Forecasted Wealth ({{period}}Y)', { period: form.period })}</div>
               <div style={{ fontSize: 44, fontWeight: 900, fontFamily: 'var(--font-display)', margin: '8px 0' }}>{fmt.currency(projectedAmount, true)}</div>
               <div className="badge" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>{t('{{strategy}} Strategy', { strategy: t(profile.label) })}</div>
            </div>

            <div className="grid-responsive" style={{ gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
              <div className="card" style={{ padding: 'var(--space-5)' }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--text-faint)', textTransform: 'uppercase' }}>{t('Invested')}</div>
                <div style={{ fontSize: 18, fontWeight: 800 }}>{fmt.currency(totalInvested, true)}</div>
              </div>
              <div className="card" style={{ padding: 'var(--space-5)' }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--text-faint)', textTransform: 'uppercase' }}>{t('Gains')}</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--brand-success)' }}>{fmt.currency(projectedAmount - totalInvested, true)}</div>
              </div>
            </div>

            <div className="card" style={{ padding: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
              <div style={{ fontWeight: 800, fontSize: 11, color: 'var(--text-faint)', textTransform: 'uppercase', marginBottom: 'var(--space-5)' }}>{t('Institutional Allocation')}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                <div style={{ width: 140, height: 140 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={profile.allocation} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={4} dataKey="value">
                        {profile.allocation.map((entry: any, i: number) => <Cell key={i} fill={entry.color} stroke="none" />)}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="stack-2" style={{ flex: 1 }}>
                   {profile.allocation.map((a: any) => (
                     <div key={a.name} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
                       <div style={{ width: 8, height: 8, borderRadius: '50%', background: a.color }} />
                       <span style={{ fontWeight: 600, flex: 1 }}>{t(a.name)}</span>
                       <span style={{ fontWeight: 800 }}>{a.value}%</span>
                     </div>
                   ))}
                </div>
              </div>
            </div>

            <button onClick={() => setStep(-1)} className="btn btn-secondary btn-full">
              <RotateCcw size={16} /> {t('New Assessment')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
