'use client';

import { useState, useEffect } from 'react';
import { 
  TrendingUp, ArrowRight, Save, Check, RotateCcw, 
  Target, Shield, Zap, BarChart2, Briefcase, 
  ChevronLeft, Info, Activity, Clock
} from 'lucide-react';
import { storage } from '@/lib/storage';
import { PageHeader } from '@/components/layout/PageHeader';
import { useTranslation } from 'react-i18next';

const QUESTIONS = [
  { id: 'emergency', text: "Do you have at least 3 months of emergency expenses saved?", options: ['No savings yet', 'Working on it (1-2 months)', 'Yes (3-5 months)', 'Complete (6+ months)'] },
  { id: 'debt', text: "How would you describe your high-interest debt (e.g., Credit Cards)?", options: ['Substantial & growing', 'Managed but present', 'Almost paid off', 'Zero high-interest debt'] },
  { id: 'knowledge', text: "How comfortable are you with investment concepts (Risk/Reward, diversification)?", options: ['Beginner - Need full guidance', 'Familiar with basics', 'Comfortable managing personal portfolio', 'Expert - Independent strategy'] },
  { id: 'horizon', text: "What is your primary investment time horizon?", options: ['Short term (< 1 year)', 'Medium term (2-5 years)', 'Long term (5-10 years)', 'Ultra long term (10+ years)'] },
  { id: 'risk', text: "If your portfolio dropped 20% in a month, you would:", options: ['Sell immediately to avoid further loss', 'Worry significantly', 'Stay the course', 'View it as a buying opportunity'] },
];

const READINESS_LEVELS = [
  { label: "Foundation Building", color: 'var(--brand-danger)', desc: "Focus on emergency reserves and debt elimination before entering markets." },
  { label: "Market Entry", color: 'var(--brand-gold)', desc: "You are ready for low-risk index funds. Start small and consistent." },
  { label: "Growth Ready", color: 'var(--brand-primary)', desc: "Your foundations are solid. You can take on diversified equity exposure." },
  { label: "Aggressive Growth", color: 'var(--brand-success)', desc: "Peak readiness. Optimize for tax efficiency and tactical alpha." },
];

export default function InvestmentReadiness() {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [saved, setSaved] = useState(false);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    // 1. Local
    setHistory(storage.get('investment_readiness_history', []));

    // 2. Server
    storage.fetch('investment_readiness_history').then(remote => {
      if (remote) {
        setHistory(remote);
        storage.set('investment_readiness_history', remote);
      }
    });
  }, []);

  const totalScore = answers.reduce((sum, a) => sum + a, 0);
  const readinessIdx = Math.min(READINESS_LEVELS.length - 1, Math.floor(totalScore / 4));
  const readiness = READINESS_LEVELS[readinessIdx];
  const progress = step > 0 && step <= QUESTIONS.length ? ((step - 1) / QUESTIONS.length) * 100 : 0;

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);
    if (step === QUESTIONS.length) setStep(QUESTIONS.length + 1);
    else setStep(s => s + 1);
  };

  const handleSave = () => {
    const entry = { score: totalScore, label: readiness.label, date: new Date().toISOString() };
    const updated = [entry, ...history].slice(0, 10);
    setHistory(updated);
    storage.set('investment_readiness_history', updated);
    storage.sync('investment_readiness_history', entry, totalScore); // Sync snapshot
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      <PageHeader 
        title={t('Investment Readiness')}
        backHref="/"
        rightSlot={step === QUESTIONS.length + 1 ? (
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={handleSave} className="btn btn-primary btn-sm">{saved ? <Check /> : <Save />} {saved ? t('Success') : t('Secure This Result')}</button>
            <button onClick={() => setStep(0)} className="btn btn-secondary btn-icon btn-sm"><RotateCcw size={14} /></button>
          </div>
        ) : null}
      />
      <div style={{ maxWidth: 640, margin: '0 auto', padding: 'var(--space-6) var(--space-4) var(--space-16)' }}>
        
        {step === 0 && (
          <div style={{ textAlign: 'center', padding: 'var(--space-12) 0' }}>
            <div style={{ width: 80, height: 80, borderRadius: 'var(--radius-2xl)', background: 'var(--brand-primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-primary)', margin: '0 auto var(--space-8)' }}>
              <TrendingUp size={40} />
            </div>
            <h1 className="display-sm" style={{ marginBottom: 'var(--space-4)' }}>{t('Investment Readiness')}</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-lg)', maxWidth: 480, margin: '0 auto var(--space-10)', lineHeight: 1.6 }}>{t('Are you prepared for the volatility of the markets? Evaluate your core financial pillars to determine your optimal entry strategy.')}</p>
            
            <button className="btn btn-primary btn-lg" onClick={() => setStep(1)} style={{ padding: '16px 40px', marginBottom: 'var(--space-12)' }}>{t('Start Evaluation')}</button>

            {history.length > 0 && (
              <div style={{ textAlign: 'left' }}>
                <label className="label-caps" style={{ marginBottom: 'var(--space-4)' }}>{t('Previous Results')}</label>
                <div className="stack-3">
                   {history.map((h, i) => (
                      <div key={i} className="card" style={{ padding: 'var(--space-4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                         <div>
                            <div style={{ fontSize: 13, fontWeight: 800 }}>{h.label}</div>
                            <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{new Date(h.date).toLocaleDateString()}</div>
                         </div>
                         <div style={{ fontSize: 14, fontWeight: 900, color: 'var(--brand-primary)' }}>{h.score} pts</div>
                      </div>
                   ))}
                </div>
              </div>
            )}
          </div>
        )}

        {step > 0 && step <= QUESTIONS.length && (
          <div style={{ animation: 'slideInRight 0.3s ease' }}>
             <div style={{ marginBottom: 'var(--space-8)' }}>
               <div className="progress-bar" style={{ height: 4 }}><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
             </div>
             <div className="card" style={{ padding: 'var(--space-8)' }}>
                <h2 className="heading-lg" style={{ marginBottom: 'var(--space-10)' }}>{t(QUESTIONS[step-1].text)}</h2>
                <div className="stack-3">
                   {QUESTIONS[step-1].options.map((opt, i) => (
                      <button key={i} onClick={() => handleAnswer(i)} className="option-btn">
                        <div className="option-letter">{String.fromCharCode(65 + i)}</div>
                        <span className="option-text">{t(opt)}</span>
                      </button>
                   ))}
                </div>
             </div>
          </div>
        )}

        {step === QUESTIONS.length + 1 && (
          <div style={{ animation: 'fadeIn 0.5s ease' }}>
             <div style={{ background: readiness.color, borderRadius: 'var(--radius-3xl)', padding: 'var(--space-10)', textAlign: 'center', color: 'white', marginBottom: 'var(--space-8)' }}>
                <p className="label-caps" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>{t('READINESS ARCHETYPE')}</p>
                <div className="display-sm" style={{ fontWeight: 900, marginBottom: 8 }}>{t(readiness.label)}</div>
                <p style={{ opacity: 0.9, lineHeight: 1.5 }}>{t(readiness.desc)}</p>
             </div>

             <div className="card" style={{ padding: 'var(--space-8)', background: 'var(--bg-glass-light)', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: 13, fontWeight: 600 }}>{t('Use the controls at the top to save your results or start over.')}</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
