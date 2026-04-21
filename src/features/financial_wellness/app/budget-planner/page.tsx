'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  PieChart as PieIcon, Save, RotateCcw, Check,
  AlertTriangle, TrendingUp, Wallet, Shield,
  ChevronLeft, ChevronRight, ArrowRight, Home, Utensils,
  Car, Zap, HeartPulse, CreditCard, Smile, ShoppingBag,
  Tv, Plane, Dumbbell, PiggyBank, BarChart2, Star
} from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';
import ClientOnly from '@/components/ClientOnly';
import { storage, fmt, calc } from '@/lib/storage';
import { PageHeader } from '@/components/layout/PageHeader';

type Field =
  'income' | 'otherIncome' |
  'housing' | 'utilities' | 'groceries' | 'transport' | 'insurance' | 'debtMin' |
  'entertainment' | 'dining' | 'shopping' | 'subscriptions' | 'travel' | 'gym' |
  'emergencyFund' | 'investments' | 'debtExtra' | 'goalSavings';

const DEFAULT: Record<Field, number> = {
  income: 0, otherIncome: 0,
  housing: 0, utilities: 0, groceries: 0, transport: 0, insurance: 0, debtMin: 0,
  entertainment: 0, dining: 0, shopping: 0, subscriptions: 0, travel: 0, gym: 0,
  emergencyFund: 0, investments: 0, debtExtra: 0, goalSavings: 0,
};

const INCOME_FIELDS: { key: Extract<Field, 'income' | 'otherIncome'>; label: string; icon: any }[] = [
  { key: 'income', label: "Monthly Salary", icon: Wallet },
  { key: 'otherIncome', label: "Other Income", icon: TrendingUp },
];

const NEEDS_FIELDS: { key: Field; label: string; icon: any }[] = [
  { key: 'housing', label: "Housing (Rent/EMI)", icon: Home },
  { key: 'utilities', label: "Utilities & Bills", icon: Zap },
  { key: 'groceries', label: "Groceries & Food", icon: Utensils },
  { key: 'transport', label: "Transport", icon: Car },
  { key: 'insurance', label: "Insurance", icon: HeartPulse },
  { key: 'debtMin', label: "Loan Payments", icon: CreditCard },
];

const WANTS_FIELDS: { key: Field; label: string; icon: any }[] = [
  { key: 'entertainment', label: "Entertainment", icon: Smile },
  { key: 'dining', label: "Dining Out", icon: Utensils },
  { key: 'shopping', label: "Shopping", icon: ShoppingBag },
  { key: 'subscriptions', label: "Subscriptions", icon: Tv },
  { key: 'travel', label: "Travel", icon: Plane },
  { key: 'gym', label: "Gym & Wellness", icon: Dumbbell },
];

const SAVE_FIELDS: { key: Field; label: string; icon: any }[] = [
  { key: 'emergencyFund', label: "Emergency Fund", icon: Shield },
  { key: 'investments', label: "Investments", icon: BarChart2 },
  { key: 'debtExtra', label: "Extra Debt Payment", icon: CreditCard },
  { key: 'goalSavings', label: "Goal Savings", icon: Star },
];

const STEPS = ['Income', 'Expenses', 'Savings & Results'];

export default function BudgetPlanner() {
  const { t } = useTranslation();
  const [step, setStep] = useState(-1);
  const [form, setForm] = useState<Record<Field, number>>(DEFAULT);
  const [saved, setSaved] = useState(false);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    // 1. Initial local load
    setHistory(storage.get('budget_history') || []);
    const local = storage.get('budget', null);
    if (local && typeof local === 'object') {
      if (local.form) setForm(local.form);
      else if (local.income !== undefined) setForm({ ...DEFAULT, ...local });
    }

    // 2. Async server sync
    storage.fetch('budget').then(remote => {
      if (remote && typeof remote === 'object') {
        if (remote.form) {
          setForm(remote.form);
          storage.set('budget', remote);
        } else if (remote.income !== undefined) {
          const legacy = { ...DEFAULT, ...remote };
          setForm(legacy);
          storage.set('budget', { form: legacy });
        }
      }
    });

    storage.fetch('budget_history').then(remoteHistory => {
      if (Array.isArray(remoteHistory)) {
        setHistory(remoteHistory);
        storage.set('budget_history', remoteHistory);
      }
    });
  }, []);

  const set = (key: Field, val: number) => setForm(f => ({ ...f, [key]: val }));

  const totalIncome = form.income + form.otherIncome;
  const totalNeeds = NEEDS_FIELDS.reduce((s, f) => s + form[f.key], 0);
  const totalWants = WANTS_FIELDS.reduce((s, f) => s + form[f.key], 0);
  const totalSavings = SAVE_FIELDS.reduce((s, f) => s + form[f.key], 0);
  const totalExpenses = totalNeeds + totalWants + totalSavings;
  const surplus = totalIncome - totalExpenses;

  const needsPct = totalIncome > 0 ? (totalNeeds / totalIncome) * 100 : 0;
  const wantsPct = totalIncome > 0 ? (totalWants / totalIncome) * 100 : 0;
  const savePct = totalIncome > 0 ? (totalSavings / totalIncome) * 100 : 0;

  const chartData = [
    { name: 'Needs', value: totalNeeds, color: '#2563EB', pct: Math.round(needsPct) },
    { name: 'Wants', value: totalWants, color: '#F39C12', pct: Math.round(wantsPct) },
    { name: 'Savings', value: totalSavings, color: '#00A884', pct: Math.round(savePct) },
    ...(surplus > 0 ? [{ name: 'Unallocated', value: surplus, color: '#E5E7EB', pct: Math.round((surplus / totalIncome) * 100) }] : []),
  ].filter(d => d.value > 0);

  const handleSave = () => {
    const data = { form, totalIncome, totalNeeds, totalWants, totalSavings, surplus, date: new Date().toISOString() };
    storage.set('budget', data);
    storage.sync('budget', data);
    
    // Save to history (Local + Server)
    const newHistory = [data, ...history.slice(0, 9)];
    storage.set('budget_history', newHistory);
    storage.sync('budget_history', data); // Only sync the single new snapshot
    setHistory(newHistory);
    
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  const InputRow = ({ icon: Icon, label, fieldKey }: { icon: any; label: string; fieldKey: Field }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-3) var(--space-4)', background: 'white', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xs)' }}>
      <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-lg)', background: 'var(--bg-base)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon size={16} color="var(--text-muted)" strokeWidth={2} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-faint)', display: 'block', marginBottom: 2 }}>{t(label)}</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <input
            type="number"
            value={form[fieldKey] || ''}
            onChange={e => set(fieldKey, Number(e.target.value))}
            placeholder="0"
            style={{
              border: 'none', outline: 'none', background: 'transparent',
              fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--text-primary)',
              width: '100%', fontFamily: 'var(--font-display)',
            }}
          />
        </div>
      </div>
      {form[fieldKey] > 0 && (
        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--brand-primary)', background: 'var(--brand-primary-glow)', padding: '2px 8px', borderRadius: 99, flexShrink: 0 }}>
          {fmt.currency(form[fieldKey], true)}
        </span>
      )}
    </div>
  );

  const PctBar = ({ label, pct, target, color }: { label: string; pct: number; target: number; color: string }) => (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)' }}>{t(label)}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-faint)' }}>Target {target}%</span>
          <span style={{ fontSize: 13, fontWeight: 800, color: pct > target ? '#E74C3C' : '#00A884' }}>{Math.round(pct)}%</span>
        </div>
      </div>
      <div style={{ height: 8, background: 'var(--bg-base)', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${Math.min(pct, 100)}%`, background: pct > target ? 'linear-gradient(90deg, #E74C3C, #C0392B)' : `linear-gradient(90deg, ${color}aa, ${color})`, borderRadius: 4, transition: 'width 0.8s ease' }} />
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      <div style={{ maxWidth: 640, margin: '0 auto', padding: 'var(--space-6) var(--space-4) var(--space-16)' }}>
        
        {true && (
          <PageHeader 
            title={t('Budget Planner')}
            backHref="/"
            steps={step >= 0 ? STEPS : undefined}
            currentStep={step >= 0 ? step : undefined}
            accentColor="#00A884"
          />
        )}

        {step === -1 && (
          <div style={{ textAlign: 'center', padding: 'var(--space-12) var(--space-4)', animation: 'fadeIn 0.5s ease' }}>
            <div style={{ width: 80, height: 80, borderRadius: '24px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-8)', boxShadow: 'var(--shadow-lg)' }}>
              <Wallet size={40} color="var(--brand-primary)" />
            </div>
            <h1 className="display-sm" style={{ marginBottom: 'var(--space-4)' }}>{t('Budget Architecture')}</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-md)', lineHeight: 1.6, maxWidth: 440, margin: '0 auto var(--space-10)' }}>
              {t('Master your cash flow. Optimize the 50/30/20 rule and ensure every dollar serves your long-term wealth strategy.')}
            </p>
            <button className="btn btn-primary btn-lg" onClick={() => setStep(0)} style={{ minWidth: 220 }}>
              {t("Begin Analysis")} <ArrowRight size={18} />
            </button>

            {history.length > 0 && (
              <div style={{ marginTop: 'var(--space-16)', textAlign: 'left' }}>
                <label className="label-caps" style={{ marginBottom: 'var(--space-4)', display: 'block' }}>{t('Recent Snapshots')}</label>
                <div className="stack-3">
                  {history.map((h, i) => (
                    <div key={i} className="card" style={{ padding: 'var(--space-4)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--text-primary)' }}>{t('Monthly Flow')}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Income: {fmt.currency(h.totalIncome)}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 800, fontSize: 13, color: h.surplus >= 0 ? 'var(--brand-success)' : 'var(--brand-danger)' }}>
                          {h.surplus >= 0 ? '+' : ''}{fmt.currency(h.surplus)}
                        </div>
                        <div style={{ fontSize: 10, color: 'var(--text-faint)' }}>{new Date(h.date).toLocaleDateString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {step === 0 && (
          <div style={{ animation: 'fadeInUp 0.4s ease both' }}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
              <div style={{ width: 56, height: 56, borderRadius: 'var(--radius-2xl)', background: 'linear-gradient(135deg, #00A884, #00D2D3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-4)', boxShadow: '0 8px 20px rgba(0,168,132,0.3)' }}>
                <Wallet size={26} color="white" strokeWidth={2.5} />
              </div>
              <p className="label-caps" style={{ color: '#00A884', marginBottom: 6 }}>{t('Step 1 of 3')}</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{t('What\'s your income?')}</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', marginTop: 6 }}>{t('Enter all monthly income sources')}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginBottom: 'var(--space-8)' }}>
              {INCOME_FIELDS.map(f => <InputRow key={f.key} icon={f.icon} label={f.label} fieldKey={f.key} />)}
            </div>
            {totalIncome > 0 && (
              <div style={{ background: 'linear-gradient(135deg, #00A88415, #00D2D310)', border: '1px solid rgba(0,168,132,0.2)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-4)', textAlign: 'center', marginBottom: 'var(--space-6)' }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#00A884', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{t('Total Monthly Income')}</p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.025em' }}>{fmt.currency(totalIncome, true)}</p>
              </div>
            )}
            <button onClick={() => setStep(1)} disabled={!totalIncome} className="btn btn-primary btn-lg" style={{ width: '100%' }}>
              {t('Next: Expenses')} <ArrowRight size={18} />
            </button>
          </div>
        )}

        {step === 1 && (
          <div style={{ animation: 'slideInRight 0.35s ease both' }}>
            <p className="label-caps" style={{ color: 'var(--brand-primary)', marginBottom: 4 }}>{t('Step 2 of 3')}</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 'var(--space-5)' }}>{t('Monthly spending')}</h2>

            <div style={{ marginBottom: 'var(--space-5)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 'var(--space-3)' }}>
                <div style={{ width: 24, height: 24, borderRadius: 'var(--radius-md)', background: '#2563EB15', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Home size={13} color="#2563EB" />
                </div>
                <span style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>{t('Needs')}</span>
                <span style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, color: '#2563EB' }}>{fmt.currency(totalNeeds, true)}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                {NEEDS_FIELDS.map(f => <InputRow key={f.key} icon={f.icon} label={f.label} fieldKey={f.key} />)}
              </div>
            </div>

            <div style={{ marginBottom: 'var(--space-6)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 'var(--space-3)' }}>
                <div style={{ width: 24, height: 24, borderRadius: 'var(--radius-md)', background: '#F39C1215', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Smile size={13} color="#F39C12" />
                </div>
                <span style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>{t('Wants')}</span>
                <span style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, color: '#F39C12' }}>{fmt.currency(totalWants, true)}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                {WANTS_FIELDS.map(f => <InputRow key={f.key} icon={f.icon} label={f.label} fieldKey={f.key} />)}
              </div>
            </div>

            <button onClick={() => setStep(2)} className="btn btn-primary btn-lg" style={{ width: '100%' }}>{t('Savings & Results ')}<ChevronRight size={18} /></button>
          </div>
        )}

        {step === 2 && (
          <div style={{ animation: 'fadeInUp 0.4s ease both' }}>
            <p className="label-caps" style={{ color: 'var(--brand-primary)', marginBottom: 4 }}>{t('Step 3 of 3')}</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.015em', marginBottom: 'var(--space-4)' }}>
              {t('Savings allocation')}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginBottom: 'var(--space-6)' }}>
              {SAVE_FIELDS.map(f => <InputRow key={f.key} icon={f.icon} label={f.label} fieldKey={f.key} />)}
            </div>

            <div style={{
              background: surplus >= 0 ? 'linear-gradient(135deg, #00A884, #00D2D3)' : 'linear-gradient(135deg, #E74C3C, #C0392B)',
              borderRadius: 'var(--radius-2xl)', padding: 'var(--space-5)', marginBottom: 'var(--space-5)',
              position: 'relative', overflow: 'hidden',
              boxShadow: surplus >= 0 ? '0 8px 24px rgba(0,168,132,0.3)' : '0 8px 24px rgba(231,76,60,0.3)',
            }}>
              <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
                {surplus >= 0 ? t('Monthly Surplus') : t('Monthly Deficit')}
              </p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-4xl)', fontWeight: 900, color: 'white', letterSpacing: '-0.03em', lineHeight: 1 }}>
                {surplus >= 0 ? '+' : ''}{fmt.currency(Math.abs(surplus), true)}
              </p>
              <div style={{ display: 'flex', gap: 8, marginTop: 'var(--space-4)' }}>
                <button onClick={handleSave} className="btn btn-secondary btn-sm" style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white' }}>
                  {saved ? <Check size={14} /> : <Save size={14} />} {saved ? t('Saved!') : t('Save Result')}
                </button>
              </div>
            </div>

            <div style={{ background: 'white', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-5)', marginBottom: 'var(--space-4)', boxShadow: 'var(--shadow-xs)' }}>
              <p style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>{t("50/30/20 Analysis")}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <PctBar label={t('Needs')} pct={needsPct} target={50} color="#2563EB" />
                <PctBar label={t('Wants')} pct={wantsPct} target={30} color="#F39C12" />
                <PctBar label={t('Savings')} pct={savePct} target={20} color="#00A884" />
              </div>
            </div>

            <div style={{ background: 'white', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-5)', marginBottom: 'var(--space-4)', boxShadow: 'var(--shadow-xs)' }}>
              <p style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <PieIcon size={16} color="var(--brand-primary)" /> {t('Budget Breakdown')}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', width: '100%' }}>
                <div style={{ height: 160, minHeight: 160, width: 160, minWidth: 160, position: 'relative', display: 'block' }}>
                  <ClientOnly>
                    <ResponsiveContainer width="100%" height="100%" debounce={50}>
                      <PieChart>
                        <Pie data={chartData} cx="50%" cy="50%" innerRadius={45} outerRadius={68} paddingAngle={3} dataKey="value">
                          {chartData.map((d, i) => <Cell key={i} fill={d.color} stroke="none" />)}
                        </Pie>
                        <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid rgba(0,0,0,0.06)', fontSize: 12 }} formatter={(v: any) => fmt.currency(v)} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ClientOnly>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                  {chartData.map(d => (
                    <div key={t(d.name)} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: d.color, flexShrink: 0 }} />
                      <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 600, flex: 1 }}>{t(d.name)}</span>
                      <span style={{ fontSize: 12, fontWeight: 800, color: d.color }}>{d.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              <button onClick={() => { setStep(0); setForm(DEFAULT); }} className="btn btn-secondary" style={{ flex: 1 }}><RotateCcw size={14} /> {t('Reset All')}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
