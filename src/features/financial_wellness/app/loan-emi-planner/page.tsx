'use client';

import { useState, useCallback, useEffect } from 'react';
import { 
  Calculator, Save, RotateCcw, ArrowRight, Check, 
  AlertTriangle, TrendingDown, Info, ShieldCheck,
  ChevronRight, BarChart3, PieChart, Landmark, ChevronLeft
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useTranslation } from 'react-i18next';
import { storage, fmt, calc } from '@/lib/storage';
import { PageHeader } from '@/components/layout/PageHeader';
import ClientOnly from '@/components/ClientOnly';

const LOAN_TYPES = ['Personal Loan', 'Home Loan', 'Auto Loan', 'Education Loan', 'Business Loan'];

interface LoanForm {
  principal: number;
  type: string;
  rate: number;
  tenureYears: number;
  processingFee: number;
}

function buildAmortization(principal: number, rate: number, tenureMonths: number) {
  const monthlyRate = rate / 100 / 12;
  const emi = calc.emi(principal, rate, tenureMonths);
  let balance = principal;
  const data: { year: number; principal: number; interest: number; balance: number }[] = [];

  let yearPrincipal = 0;
  let yearInterest = 0;

  for (let month = 1; month <= tenureMonths; month++) {
    const interestPart = Math.max(0, balance * monthlyRate);
    const principalPart = emi - interestPart;
    balance -= principalPart;
    yearPrincipal += principalPart;
    yearInterest += interestPart;

    if (month % 12 === 0 || month === tenureMonths) {
      data.push({
        year: Math.ceil(month / 12),
        principal: Math.round(yearPrincipal),
        interest: Math.round(yearInterest),
        balance: Math.max(0, Math.round(balance)),
      });
      yearPrincipal = 0;
      yearInterest = 0;
    }
  }
  return data;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)', padding: '12px 16px', boxShadow: 'var(--shadow-lg)' }}>
        <div style={{ color: 'var(--text-muted)', marginBottom: 8, fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>YEAR {label}</div>
        {payload.map((p: any) => (
          <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: p.color }} />
            <span style={{ color: 'var(--text-secondary)', fontSize: 12 }}>{p.name}:</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 800, fontSize: 12 }}>{fmt.currency(p.value, true)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function LoanEMIPlanner() {
  const { t } = useTranslation();
  const [step, setStep] = useState(-1);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState<LoanForm>({ principal: 0, type: 'Personal Loan', rate: 12, tenureYears: 5, processingFee: 0 });
  const [result, setResult] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    // 1. Initial local load
    const list = storage.get('loan_history') || [];
    setHistory(Array.isArray(list) ? list : []);
    const local = storage.get('loan_emi_form', null);
    if (local && typeof local === 'object') setForm(prev => ({ ...prev, ...local }));

    // 2. Async server sync
    storage.fetch('loan_emi_form').then(remote => {
      if (remote && typeof remote === 'object') {
        setForm(prev => ({ ...prev, ...remote }));
        storage.set('loan_emi_form', remote);
      }
    });

    storage.fetch('loan_history').then(remoteHistory => {
      if (Array.isArray(remoteHistory)) {
        setHistory(remoteHistory);
        storage.set('loan_history', remoteHistory);
      }
    });
  }, []);

  const compute = useCallback(() => {
    const P = Number(form.principal) || 0;
    const R = Number(form.rate) || 0;
    const T = (Number(form.tenureYears) || 0) * 12;
    
    if (P <= 0 || R <= 0 || T <= 0) return;

    const emi = calc.emi(P, R, T);
    const total = emi * T;
    const interest = total - P;
    const amortization = buildAmortization(P, R, T);
    const resultData = { emi, total, interest, amortization };
    setResult(resultData);
    
    const snapshot = { ...form, ...resultData, date: new Date().toISOString() };
    
    // Save to history (Local + Server)
    const newHistory = [snapshot, ...history.slice(0, 9)];
    storage.set('loan_history', newHistory);
    storage.sync('loan_history', snapshot); // Sync only the new snapshot
    setHistory(newHistory);
    storage.set('loan_emi_form', form);
    storage.sync('loan_emi_form', form);
    
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    
    setStep(1);
  }, [form, history]);

  const handleSave = () => {
    storage.set('loan_form', form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const interestPercent = result ? ((result.interest / result.total) * 100).toFixed(1) : 0;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      {/* Navigation removed as per requirement */}

      <div style={{ maxWidth: 640, margin: '0 auto', padding: 'var(--space-5) var(--space-4) var(--space-16)' }}>
        {(step === 1 || step === 0) && (
          <PageHeader 
            title={t('Loan & EMI Planner')}
            backHref="/"
            rightSlot={step === 1 ? (
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={handleSave} className="btn btn-primary btn-sm">{saved ? <Check size={14} /> : <Save size={14} />} {saved ? t('Saved!') : t('Save')}</button>
                <button onClick={() => { setStep(0); setResult(null); }} className="btn btn-secondary btn-icon btn-sm"><RotateCcw size={14} /></button>
              </div>
            ) : null}
          />
        )}
        {step >= 0 && (
          <div style={{ display: 'flex', gap: 4, marginBottom: 'var(--space-6)' }}>
            <div style={{ flex: 1, height: 3, borderRadius: 2, background: '#0984e3' }} />
            <div style={{ flex: 1, height: 3, borderRadius: 2, background: step === 1 ? '#0984e3' : 'var(--border-default)' }} />
          </div>
        )}

        {step === -1 && (
          <div style={{ textAlign: 'center', padding: 'var(--space-12) var(--space-4)', animation: 'fadeIn 0.5s ease' }}>
            <div style={{ width: 80, height: 80, borderRadius: '24px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-8)', boxShadow: 'var(--shadow-lg)' }}>
              <Landmark size={40} color="var(--brand-primary)" />
            </div>
            <h1 className="display-sm" style={{ marginBottom: 'var(--space-4)' }}>{t("Loan & EMI Strategy")}</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-md)', lineHeight: 1.6, maxWidth: 400, margin: '0 auto var(--space-10)' }}>
              {t("Architect your debt profile. Calculate EMIs, interest impact, and optimize your repayment lifecycle with institutional precision.")}
            </p>
            <button className="btn btn-primary btn-lg" onClick={() => setStep(0)} style={{ minWidth: 200 }}>
              {t("Begin Analysis")} <ArrowRight size={18} />
            </button>

            {history.length > 0 && (
              <div style={{ marginTop: 'var(--space-16)', textAlign: 'left' }}>
                <label className="label-caps" style={{ marginBottom: 'var(--space-4)', display: 'block' }}>{t("Recent Evaluations")}</label>
                <div className="stack-3">
                  {history.map((h, i) => (
                    <div key={i} className="card" style={{ padding: 'var(--space-4)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--text-primary)' }}>{t(h.type || 'Loan')}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{fmt.currency(Number(h.principal) || 0)} @ {Number(h.rate) || 0}%</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 800, fontSize: 13, color: 'var(--brand-primary)' }}>{fmt.currency(Number(h.emi) || 0)}/mo</div>
                        <div style={{ fontSize: 10, color: 'var(--text-faint)' }}>{h.date ? new Date(h.date).toLocaleDateString() : 'Recent'}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {step === 0 && (
          <div style={{ maxWidth: 800, animation: 'fadeIn 0.4s ease' }}>
            <div style={{ marginBottom: 'var(--space-10)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--brand-primary)', fontWeight: 700, fontSize: 'var(--text-xs)', textTransform: 'uppercase', marginBottom: 12 }}>
                <div style={{ width: 12, height: 2, background: 'var(--brand-primary)', borderRadius: 2 }} />
                {t("Debt Management")}
              </div>
              <h1 className="display-sm" style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-3)' }}>{t("Borrow with Strategic Precision")}</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-lg)', lineHeight: 1.6 }}>{t("Architect your debt profile. Calculate EMIs, total interest impact, and optimize your repayment lifecycle.")}</p>
            </div>

            <div className="stack-6">
              <div className="card" style={{ padding: 'var(--space-8)' }}>
                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 700, marginBottom: 'var(--space-4)' }}>{t("Select Debt Type")}</label>
                  <div className="grid-responsive" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 'var(--space-3)' }}>
                    {LOAN_TYPES.map(type => (
                      <button key={type} type="button" className={`card card-hover ${form.type === type ? 'active' : ''}`} 
                        style={{ 
                          padding: '12px 8px', textAlign: 'center', fontSize: 12, fontWeight: 700,
                          border: '1px solid var(--border-subtle)',
                          background: form.type === type ? 'var(--brand-primary-glow)' : 'var(--bg-card)',
                          borderColor: form.type === type ? 'var(--brand-primary)' : 'var(--border-subtle)',
                          color: form.type === type ? 'var(--brand-primary)' : 'var(--text-muted)',
                          cursor: 'pointer', transition: 'all 0.2s ease'
                        }}
                        onClick={() => setForm(f => ({ ...f, type }))}>
                        {t(type)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid-2">
                <div className="card" style={{ padding: 'var(--space-6)' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 700 }}>{t("Principal Amount")}</label>
                    <div className="input-group">
                      <input type="number" className="form-input" style={{ paddingLeft: '2.5rem' }} value={form.principal || ''} onChange={e => setForm(f => ({ ...f, principal: Number(e.target.value) }))} placeholder="0.00" />
                    </div>
                  </div>
                </div>
                <div className="card" style={{ padding: 'var(--space-6)' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 700 }}>{t("Annual Interest (APR)")}</label>
                    <div className="input-group">
                      <input type="number" className="form-input" style={{ paddingRight: '2.5rem' }} value={form.rate || ''} onChange={e => setForm(f => ({ ...f, rate: Number(e.target.value) }))} step="0.1" placeholder="0.00" />
                      <span className="input-suffix" style={{ fontWeight: 700 }}>%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid-2">
                <div className="card" style={{ padding: 'var(--space-6)' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 700 }}>{t("Debt Duration")}: <span style={{ color: 'var(--brand-primary)' }}>{form.tenureYears} {t("Years")}</span></label>
                    <input type="range" min={1} max={30} value={form.tenureYears} onChange={e => setForm(f => ({ ...f, tenureYears: Number(e.target.value) }))} style={{ marginTop: 'var(--space-4)' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-muted)', marginTop: 8, fontWeight: 700 }}>
                      <span>1 {t("YEAR")}</span><span>30 {t("YEARS")}</span>
                    </div>
                  </div>
                </div>
                <div className="card" style={{ padding: 'var(--space-6)' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 700 }}>{t("Processing Overhead (Fixed)")}</label>
                    <div className="input-group">
                      <input type="number" className="form-input" style={{ paddingLeft: '2.5rem' }} value={form.processingFee || ''} onChange={e => setForm(f => ({ ...f, processingFee: Number(e.target.value) }))} placeholder="0.00" />
                    </div>
                  </div>
                </div>
              </div>

              <button className="btn btn-primary btn-lg" disabled={!form.principal || !form.rate} onClick={compute} style={{ alignSelf: 'flex-start', padding: '16px 32px' }}>
                {t("Analyze Repayment")} <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {step === 1 && result && (
          <div style={{ animation: 'fadeIn 0.4s ease' }}>
            {/* Impact Metrics */}
            <div className="responsive-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-6)', marginBottom: 'var(--space-10)' }}>
              <div style={{ background: 'var(--bg-glass-light)', border: '1px solid var(--border-brand)', borderRadius: 'var(--radius-2xl)', padding: 'var(--space-8)' }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>{t("MONTHLY INSTALLMENT")}</div>
                <div className="display-sm" style={{ color: 'var(--brand-primary)' }}>{fmt.currency(result.emi)}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 8, fontWeight: 600 }}>{t("Duration")}: {form.tenureYears} {t("Productive Years")}</div>
              </div>
              <div className="card" style={{ padding: 'var(--space-8)' }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>{t("TOTAL REPAYMENT")}</div>
                <div className="display-sm" style={{ color: 'var(--text-primary)' }}>{fmt.currency(result.total, true)}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 8, fontWeight: 600 }}>{t("Principal + Cumulative Interest")}</div>
              </div>
              <div style={{ background: 'rgba(231,76,60,0.03)', border: '1px solid rgba(231,76,60,0.1)', borderRadius: 'var(--radius-2xl)', padding: 'var(--space-8)' }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>{t("INTEREST OVERHEAD")}</div>
                <div className="display-sm" style={{ color: '#E74C3C' }}>{fmt.currency(result.interest, true)}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 8, fontWeight: 600 }}>{t("Loss Factor")}: {interestPercent}% {t("of Total Capital")}</div>
              </div>
            </div>

            {/* Repayment Chart */}
            <div className="card" style={{ padding: 'var(--space-8)', marginBottom: 'var(--space-10)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-8)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <BarChart3 size={20} color="var(--brand-primary)" />
                  <h2 className="heading-sm" style={{ color: 'var(--text-primary)' }}>{t("Repayment Lifecycle")}</h2>
                </div>
                <div style={{ display: 'flex', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, color: 'var(--text-muted)' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--brand-primary)' }} /> {t("PRINCIPAL")}
                  </div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, color: 'var(--text-muted)' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#E74C3C' }} /> {t("INTEREST")}
                  </div>
                </div>
              </div>
              <div style={{ height: 320, minHeight: 320, width: '100%', position: 'relative', display: 'block' }}>
                <ClientOnly>
                  <ResponsiveContainer width="100%" height="100%" debounce={100}>
                    <AreaChart data={result.amortization}>
                      <defs>
                        <linearGradient id="gradPrincipal" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--brand-primary)" stopOpacity={0.15} />
                          <stop offset="100%" stopColor="var(--brand-primary)" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="gradInterest" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#E74C3C" stopOpacity={0.15} />
                          <stop offset="100%" stopColor="#E74C3C" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
                      <XAxis dataKey="year" tickFormatter={v => `${t("YR")} ${v}`} tick={{ fill: 'var(--text-muted)', fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} />
                      <YAxis tickFormatter={v => fmt.currency(v, true)} tick={{ fill: 'var(--text-muted)', fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} width={80} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area type="monotone" dataKey="principal" name={t("Principal")} stroke="var(--brand-primary)" fill="url(#gradPrincipal)" strokeWidth={3} />
                      <Area type="monotone" dataKey="interest" name={t("Interest")} stroke="#E74C3C" fill="url(#gradInterest)" strokeWidth={3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </ClientOnly>
              </div>
            </div>

            {/* Strategic Insights */}
            <div className="grid-2" style={{ gap: 'var(--space-6)', marginBottom: 'var(--space-10)' }}>
              <div className="card" style={{ padding: 'var(--space-8)', border: '1px solid var(--brand-gold)', background: 'rgba(253,203,110,0.03)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 'var(--space-6)', color: 'var(--text-primary)' }}>
                  <AlertTriangle size={20} color="var(--brand-gold)" />
                  <h2 className="heading-sm">{t("Financial Threshold Guard")}</h2>
                </div>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 'var(--space-4)' }}>
                  {t("For optimal liquidity, your total EMI burden should not exceed 40% of your monthly take-home income.")}
                </p>
                <div style={{ background: 'var(--bg-card)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)' }}>{t("MINIMUM INCOME REQ.")}</span>
                  <span style={{ fontSize: 'var(--text-base)', fontWeight: 800, color: 'var(--text-primary)' }}>{fmt.currency(result.emi / 0.4)} <span style={{ fontSize: 10 }}>/{t("mo")}</span></span>
                </div>
              </div>
              <div className="card" style={{ padding: 'var(--space-8)', border: '1px solid var(--brand-success)', background: 'rgba(0,168,132,0.03)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 'var(--space-6)', color: 'var(--text-primary)' }}>
                  <TrendingDown size={20} color="var(--brand-success)" />
                  <h2 className="heading-sm">{t("Optimization Tactics")}</h2>
                </div>
                <div className="stack-3">
                  {[
                    { text: t("Aggressively negotiate a lower interest rate."), icon: Landmark },
                    { text: t("Execute consistent part-prepayments annually."), icon: ShieldCheck },
                    { text: t("Audit market lenders for balance transfer ops."), icon: BarChart3 },
                  ].map((tip, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', fontWeight: 500 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 'var(--radius-md)', background: 'rgba(0,168,132,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-success)', flexShrink: 0 }}>
                        <tip.icon size={14} />
                      </div>
                      {t(tip.text)}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Repayment Table */}
            <div className="card" style={{ padding: 'var(--space-8)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 'var(--space-8)' }}>
                <Landmark size={20} color="var(--brand-primary)" />
                <h2 className="heading-sm" style={{ color: 'var(--text-primary)' }}>{t("Amortization Schedule")}</h2>
              </div>
              <div className="table-wrapper">
                <table style={{ borderCollapse: 'separate', borderSpacing: '0 8px' }}>
                  <thead>
                    <tr style={{ background: 'transparent' }}>
                      <th style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: 10, textTransform: 'uppercase', padding: '12px 8px', textAlign: 'left', letterSpacing: '0.05em' }}>{t("TIMELINE")}</th>
                      <th style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: 10, textTransform: 'uppercase', padding: '12px 8px', textAlign: 'left', letterSpacing: '0.05em' }}>{t("PRINCIPAL APPLIED")}</th>
                      <th style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: 10, textTransform: 'uppercase', padding: '12px 8px', textAlign: 'left', letterSpacing: '0.05em' }}>{t("INTEREST LOAD")}</th>
                      <th style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: 10, textTransform: 'uppercase', padding: '12px 8px', textAlign: 'left', letterSpacing: '0.05em' }}>{t("RESIDUAL DEBT")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.amortization.map((row: any) => (
                      <tr key={row.year} style={{ background: 'var(--bg-card-hover)' }}>
                        <td style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: 12, borderRadius: 'var(--radius-md) 0 0 var(--radius-md)' }}>{t("YEAR")} {row.year}</td>
                        <td style={{ color: 'var(--brand-primary)', fontWeight: 700, fontSize: 12 }}>{fmt.currency(row.principal)}</td>
                        <td style={{ color: '#E74C3C', fontWeight: 700, fontSize: 12 }}>{fmt.currency(row.interest)}</td>
                        <td style={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: 12, borderRadius: '0 var(--radius-md) var(--radius-md) 0' }}>{fmt.currency(row.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <button className="btn btn-secondary btn-lg" style={{ marginTop: 'var(--space-8)' }} onClick={() => { setStep(0); setResult(null); }}>
              <ChevronRight size={18} style={{ transform: 'rotate(180deg)' }} /> {t("Adjust Parameters")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
