'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Award, TrendingUp, Shield, Activity, Target, 
  ArrowRight, ChevronLeft, ChevronRight, Check, Save, RotateCcw, 
  Search, Calculator, Wallet, Zap, Heart, AlertCircle, Clock, Compass
} from 'lucide-react';
import { storage } from '@/lib/storage';
import { PageHeader } from '@/components/layout/PageHeader';

/* Questions */
const QUESTIONS = [
  { id: 'incomeStability', text: "How stable is your income?", options: [{ label: "Very stable (salaried)", score: 10 }, { label: "Somewhat stable", score: 5 }, { label: "Unstable / Freelance", score: 2 }], category: "Income & Stability" },
  { id: 'debtRatio', text: "What % of income goes to debt payments?", type: 'slider', min: 0, max: 80, label: (v: number) => `${v}%`, scoreFn: (v: number) => v < 20 ? 10 : v < 36 ? 6 : v < 50 ? 3 : 0, category: "Debt & Obligations" },
  { id: 'emergencyFund', text: "Do you have 6+ months of expenses saved?", options: [{ label: "Yes, fully funded", score: 20 }, { label: "Partial (1-3 months)", score: 10 }, { label: "No emergency fund", score: 0 }], category: "Savings & Emergency" },
  { id: 'savingsRate', text: "What % of income do you save each month?", type: 'slider', min: 0, max: 60, label: (v: number) => `${v}%`, scoreFn: (v: number) => v >= 20 ? 20 : v >= 10 ? 12 : v >= 5 ? 7 : 2, category: "Savings & Emergency" },
  { id: 'investingComfort', text: "How comfortable are you with investing?", options: [{ label: "Very comfortable", score: 15 }, { label: "Somewhat comfortable", score: 9 }, { label: "Not comfortable", score: 3 }, { label: "Never invested", score: 0 }], category: "Investment & Growth" },
  { id: 'hasGoals', text: "Do you have clear financial goals?", options: [{ label: "Yes, written and tracked", score: 10 }, { label: "A few vague ones", score: 5 }, { label: "No goals", score: 0 }], category: "Financial Planning" },
  { id: 'budgetTracking', text: "Do you track your expenses?", options: [{ label: "Always (app/spreadsheet)", score: 10 }, { label: "Sometimes", score: 5 }, { label: "Never", score: 0 }], category: "Financial Planning" },
  { id: 'debtPayments', text: "Do you make all loan/credit payments on time?", options: [{ label: "Always", score: 10 }, { label: "Sometimes", score: 5 }, { label: "Often late", score: 0 }], category: "Debt & Obligations" },
  { id: 'insurance', text: "Are you adequately insured (health + life)?", options: [{ label: "Yes, fully covered", score: 10 }, { label: "Partially covered", score: 5 }, { label: "Not insured", score: 0 }], category: "Income & Stability" },
  { id: 'impulseSpend', text: "How often do you impulse spend?", options: [{ label: "Rarely", score: 10 }, { label: "Sometimes", score: 5 }, { label: "Often", score: 0 }], category: "Financial Planning" },
  { id: 'retirement', text: "Have you started planning for retirement?", options: [{ label: "Yes, investing consistently", score: 15 }, { label: "Just starting", score: 8 }, { label: "Not yet", score: 0 }], category: "Investment & Growth" },
  { id: 'financialLiteracy', text: "How would you rate your financial knowledge?", options: [{ label: "Expert", score: 10 }, { label: "Good understanding", score: 7 }, { label: "Basic", score: 4 }, { label: "Very limited", score: 0 }], category: "Financial Planning" },
  { id: 'knowsCreditScore', text: "Do you know your credit score?", options: [{ label: "Yes, and it's good (750+)", score: 10 }, { label: "Yes, but it needs work", score: 5 }, { label: "No", score: 0 }], category: "Debt & Obligations" },
  { id: 'hasFinancialPlan', text: "Do you have a 5-year financial plan?", options: [{ label: "Yes, detailed plan", score: 10 }, { label: "Somewhat planned", score: 5 }, { label: "No plan", score: 0 }], category: "Financial Planning" },
  { id: 'taxPlanning', text: "Do you proactively plan for taxes?", options: [{ label: "Yes, maximize deductions", score: 10 }, { label: "Somewhat", score: 5 }, { label: "No planning", score: 0 }], category: "Financial Planning" },
];

const CATEGORY_MAX: Record<string, number> = {
  'Income & Stability': 20,
  'Debt & Obligations': 30,
  'Savings & Emergency': 40,
  'Investment & Growth': 30,
  'Financial Planning': 40,
};

const SCORE_LABELS = [
  { min: 0, max: 40, label: "Needs Attention", color: 'var(--brand-danger)', emoji: '⚠️', advice: 'Focus on emergency fund and stopping debt growth first.' },
  { min: 40, max: 60, label: "Getting Started", color: 'var(--brand-gold)', emoji: '🏗️', advice: 'Build your foundation: emergency fund -> debt -> savings.' },
  { min: 60, max: 75, label: "Fair", color: 'var(--brand-accent)', emoji: '⚖️', advice: 'You have basics covered. Optimize and accelerate.' },
  { min: 75, max: 90, label: "Good", color: '#2563EB', emoji: '🌟', advice: 'Strong foundation. Time to build wealth aggressively.' },
  { min: 90, max: 101, label: "Excellent", color: 'var(--brand-success)', emoji: '🏆', advice: 'You are in an elite group. Maintain and mentor others.' },
];

export default function FinancialHealthScore() {
  const { t } = useTranslation();
  const [step, setStep] = useState(-1); 
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [saved, setSaved] = useState(false);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const list = storage.get('health_score_history') || [];
    setHistory(Array.isArray(list) ? list : []);

    storage.fetch('health_score_history').then(remote => {
      if (Array.isArray(remote)) {
        setHistory(remote);
        storage.set('health_score_history', remote);
      }
    });
  }, []);

  const totalQuestions = QUESTIONS.length;
  const currentQ = step >= 0 && step < totalQuestions ? QUESTIONS[step] : null;

  const handleAnswer = (value: number) => {
    if (!currentQ) return;
    setAnswers(prev => ({ ...prev, [currentQ.id]: value }));
    if (currentQ.type !== 'slider') {
      setTimeout(() => {
        if (step < totalQuestions - 1) setStep(s => s + 1);
        else computeAndShow();
      }, 300);
    }
  };

  const computeAndShow = () => {
    setStep(totalQuestions);
  };

  const rawScore = Object.entries(answers).reduce((sum, [id, val]) => {
    const q = QUESTIONS.find(qn => qn.id === id);
    if (!q) return sum;
    if (q.type === 'slider' && q.scoreFn) return sum + q.scoreFn(val);
    return sum + val;
  }, 0);

  const maxScore = 175;
  const score = Math.min(100, Math.round((rawScore / maxScore) * 100));
  const scoreInfo = SCORE_LABELS.find(s => score >= s.min && score < s.max) || SCORE_LABELS[0];

  const catScores: Record<string, number> = {};
  QUESTIONS.forEach(q => {
    const ansVal = answers[q.id] ?? 0;
    const val = (q.type === 'slider' && q.scoreFn) ? q.scoreFn(ansVal) : ansVal;
    catScores[q.category] = (catScores[q.category] || 0) + val;
  });

  const handleSave = () => {
    const data = { score, date: new Date().toISOString() };
    storage.set('financial_health_score', data);
    
    const newHistory = [data, ...history.slice(0, 9)];
    storage.set('health_score_history', newHistory);
    storage.sync('health_score_history', data);
    setHistory(newHistory);
    
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const progress = step >= 0 && step < totalQuestions ? (step / totalQuestions) * 100 : 0;
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      <PageHeader 
        title={t('Financial Health Score')}
        backHref="/"
        rightSlot={step === totalQuestions ? (
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={handleSave} className="btn btn-primary btn-sm">{saved ? <Check size={14} /> : <Save size={14} />} {saved ? t('Saved!') : t('Save')}</button>
            <button onClick={() => { setStep(-1); setAnswers({}); }} className="btn btn-secondary btn-icon btn-sm"><RotateCcw size={14} /></button>
          </div>
        ) : null}
      />
      <div style={{ maxWidth: 640, margin: '0 auto', padding: 'var(--space-6) var(--space-4) var(--space-16)' }}>
        
        {step === -1 && (
          <div style={{ textAlign: 'center', padding: 'var(--space-12) var(--space-4)', animation: 'fadeIn 0.5s ease' }}>
            <div style={{ width: 80, height: 80, borderRadius: '24px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-8)', boxShadow: 'var(--shadow-lg)' }}>
              <Award size={40} color="#F39C12" />
            </div>
            <h1 className="display-sm" style={{ marginBottom: 'var(--space-4)' }}>{t('Audit Your Wealth')}</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-md)', lineHeight: 1.6, maxWidth: 440, margin: '0 auto var(--space-10)' }}>{t("15 diagnostic parameters to evaluate your stability, resilience, and growth potential. Get an institutional-grade score in minutes.")}</p>
            <button className="btn btn-primary btn-lg" onClick={() => setStep(0)} style={{ minWidth: 220, background: 'linear-gradient(135deg, #F39C12, #f1c40f)', border: 'none' }}>
              {t('Begin Analysis')} <ArrowRight size={18} style={{ marginLeft: 8 }} />
            </button>

            {history.length > 0 && (
              <div style={{ marginTop: 'var(--space-16)', textAlign: 'left' }}>
                <label className="label-caps" style={{ marginBottom: 'var(--space-4)', display: 'block' }}>{t('Historical Performance')}</label>
                <div className="stack-3">
                  {history.map((h, i) => (
                    <div key={i} className="card" style={{ padding: 'var(--space-4)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-md)', background: '#F39C1215', color: '#F39C12', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13 }}>
                          {h.score}
                        </div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{t('Diagnostic Run')}</div>
                          <div style={{ fontSize: 10, color: 'var(--text-faint)' }}>{new Date(h.date).toLocaleDateString()}</div>
                        </div>
                      </div>
                      <ArrowRight size={14} color="var(--text-faint)" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {step >= 0 && step < totalQuestions && (
          <div style={{ marginBottom: 'var(--space-8)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
              <button onClick={() => setStep(step === 0 ? -1 : step - 1)} className="btn btn-secondary btn-sm"><ChevronLeft size={14} /> {t('Back')}</button>
              <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-faint)' }}>Diagnostic {step + 1}/{totalQuestions}</div>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%`, background: '#F39C12' }} />
            </div>
          </div>
        )}

        {step >= 0 && step < totalQuestions && currentQ && (
            <div key={step} style={{ animation: 'slideInRight 0.3s ease both' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span className="badge badge-gold">{t(currentQ.category)}</span>
            </div>
            <h2 className="heading-xl" style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-8)', lineHeight: 1.25 }}>
              {t(currentQ.text)}
            </h2>

            {!currentQ.type && (
              <div className="stack-3">
                {currentQ.options?.map((opt, i) => {
                  const selected = answers[currentQ.id] === opt.score;
                  return (
                    <button key={opt.label} onClick={() => handleAnswer(opt.score)} className="option-btn" style={{
                      borderColor: selected ? '#F39C12' : undefined,
                      borderWidth: selected ? 2 : 1,
                    }}>
                      <div className="option-letter" style={{ borderColor: selected ? '#F39C12' : undefined, color: selected ? '#F39C12' : undefined }}>
                        {String.fromCharCode(65 + i)}
                      </div>
                      <span className="option-text">{t(opt.label)}</span>
                      {selected && <Check size={16} color="#F39C12" />}
                    </button>
                  );
                })}
              </div>
            )}

            {currentQ.type === 'slider' && (
              <div className="card" style={{ padding: 'var(--space-8)', textAlign: 'center' }}>
                <div style={{ fontSize: 48, fontWeight: 900, fontFamily: 'var(--font-display)', color: '#F39C12', marginBottom: 'var(--space-6)' }}>
                  {currentQ.label?.(answers[currentQ.id] ?? 0)}
                </div>
                <input type="range" min={currentQ.min} max={currentQ.max} value={answers[currentQ.id] ?? 0}
                  onChange={e => setAnswers(prev => ({ ...prev, [currentQ.id]: Number(e.target.value) }))} style={{ width: '100%', marginBottom: 'var(--space-8)' }} />
                <button className="btn btn-primary btn-lg" style={{ width: '100%', background: '#F39C12', border: 'none' }}
                  onClick={() => { if (step < totalQuestions - 1) setStep(s => s + 1); else computeAndShow(); }}>
                  {t('Continue')} <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        )}

        {step === totalQuestions && (
          <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
              <div style={{ position: 'relative', display: 'inline-block', marginBottom: 'var(--space-6)' }}>
                <svg width={200} height={200} viewBox="0 0 180 180">
                  <circle cx={90} cy={90} r={radius} fill="none" stroke="var(--border-subtle)" strokeWidth={12} />
                  <circle
                    cx={90} cy={90} r={radius}
                    fill="none"
                    stroke={scoreInfo.color}
                    strokeWidth={12}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    transform="rotate(-90 90 90)"
                    style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4,0,0.2,1)', filter: `drop-shadow(0 0 8px ${scoreInfo.color}44)` }}
                  />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ fontSize: 56, fontWeight: 900, fontFamily: 'var(--font-display)', color: 'var(--text-primary)', lineHeight: 1 }}>{score}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-faint)', fontWeight: 800, textTransform: 'uppercase', marginTop: 4 }}>{t('Wealth Grade')}</div>
                </div>
              </div>
              <div className="heading-xl" style={{ color: scoreInfo.color, marginBottom: 8 }}>{scoreInfo.emoji} {t(scoreInfo.label)}</div>
              <p style={{ color: 'var(--text-secondary)', maxWidth: 400, margin: '0 auto', lineHeight: 1.6 }}>{t(scoreInfo.advice)}</p>
            </div>

            <div className="card" style={{ padding: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
              <div style={{ fontWeight: 800, fontSize: 11, color: 'var(--text-faint)', textTransform: 'uppercase', marginBottom: 'var(--space-5)' }}>{t('Diagonal Metrics')}</div>
              <div className="stack-4">
                {Object.entries(CATEGORY_MAX).map(([cat, maxCat]) => {
                  const catScore = catScores[cat] || 0;
                  const catPct = Math.min(100, (catScore / maxCat) * 100);
                  return (
                    <div key={cat}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)' }}>{cat}</span>
                        <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)' }}>{catScore}/{maxCat}</span>
                      </div>
                      <div className="progress-bar">
                        <div className={`progress-fill ${catPct >= 70 ? 'success' : catPct >= 40 ? 'warning' : 'danger'}`} style={{ width: `${catPct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ background: '#F39C120A', border: '1px solid #F39C1222', borderRadius: 'var(--radius-xl)', padding: 'var(--space-6)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 'var(--space-5)' }}>
                <Compass size={20} color="#F39C12" />
                <span style={{ fontWeight: 800, fontSize: 13, color: 'var(--text-primary)' }}>{t('Institutional Roadmap')}</span>
              </div>
              <div className="stack-6">
                {[
                  { timeframe: 'Immediate Actions', icon: Zap, actions: score < 40 ? ['Establish cash reserve immediately', 'Audit all active debt interest', 'Consolidate high-cost credit'] : score < 70 ? ['Automate primary savings transfer', 'Audit recurring subscriptions', 'Establish 50/30/20 discipline'] : ['Optimize tax-loss harvesting', 'Review insurance leverage', 'Update legacy beneficiaries'] },
                  { timeframe: 'Strategic Shift (30 Days)', icon: Shield, actions: score < 40 ? ['Secure basic term & health cover', 'Implement zero-based budgeting', 'Start debt-snowball execution'] : score < 70 ? ['Reach 3x monthly coverage reserve', 'Initialize index-fund exposure', 'Establish dedicated goal vaults'] : ['Increase voluntary contributions', 'Review portfolio rebalancing', 'Analyze asset correlation'] },
                ].map(section => (
                  <div key={section.timeframe}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                      <section.icon size={14} color="#F39C12" />
                      <span style={{ fontSize: 11, fontWeight: 800, color: '#F39C12', textTransform: 'uppercase' }}>{section.timeframe}</span>
                    </div>
                    <div className="stack-2">
                       {section.actions.map(action => (
                         <div key={action} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: 10, background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                           <Check size={14} color="var(--brand-success)" style={{ marginTop: 2 }} />
                           <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>{t(action)}</span>
                         </div>
                       ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
