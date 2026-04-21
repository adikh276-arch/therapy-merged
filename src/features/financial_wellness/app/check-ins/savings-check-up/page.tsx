'use client';

import { useState, useEffect } from 'react';
import { 
  ShieldCheck, ArrowRight, Save, Check, RotateCcw, 
  Activity, Target, TrendingUp, Info, CheckCircle2, ChevronLeft, AlertTriangle, Wallet, Clock
} from 'lucide-react';
import { storage, fmt } from '@/lib/storage';
import { PageHeader } from '@/components/layout/PageHeader';
import { useTranslation } from 'react-i18next';

const QUESTIONS = [
  { id: 'hasEF', text: "Do you have an emergency fund?", options: ['None at all', 'Partially funded (1-2 mo)', 'Fully funded (3-6 mo)', 'Over-funded (6+ mo)'] },
  { id: 'rate', text: "What percentage of your income do you save?", options: ['0-5%', '5-10%', '10-20%', 'Over 20%'] },
  { id: 'consistency', text: "How consistent are your savings?", options: ['Rarely save', 'Occasional/Inconsistent', 'Mostly consistent', 'Automated & Guaranteed'] },
  { id: 'increase', text: "Have you increased your savings in the last 12 months?", options: ['No, they decreased', 'Stayed the same', 'Yes, slight increase', 'Significant increase'] },
];

const SCORES = [
  { label: "CRITICAL", color: 'var(--brand-danger)', desc: "Low liquidity and inconsistent habits. Priority: Build $1,000 starter reserve." },
  { label: "STABILIZING", color: 'var(--brand-gold)', desc: "Foundations are forming but vulnerable. Priority: Reach 3 months coverage." },
  { label: "SECURE", color: 'var(--brand-primary)', desc: "Robust savings buffer. Priority: Optimize for yield and growth." },
  { label: "ELITE", color: 'var(--brand-success)', desc: "Exceptional retention. Priority: Focus on tactical wealth catalysts." },
];

export default function SavingsCheckup() {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [saved, setSaved] = useState(false);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    // 1. Local load
    setHistory(storage.get('savings_checkup_history', []));

    // 2. Server sync
    storage.fetch('savings_checkup_history').then(remote => {
      if (remote) {
        setHistory(remote);
        storage.set('savings_checkup_history', remote);
      }
    });
  }, []);

  const totalScore = answers.reduce((sum, a) => sum + a, 0);
  const resultIdx = Math.min(SCORES.length - 1, Math.floor(totalScore / 3));
  const result = SCORES[resultIdx];
  const progress = step > 0 && step <= QUESTIONS.length ? ((step - 1) / QUESTIONS.length) * 100 : 0;

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);
    if (step === QUESTIONS.length) setStep(QUESTIONS.length + 1);
    else setStep(s => s + 1);
  };

  const handleSave = () => {
    const entry = { score: totalScore, label: result.label, date: new Date().toISOString() };
    const updated = [entry, ...history].slice(0, 10);
    setHistory(updated);
    storage.set('savings_checkup_history', updated);
    storage.sync('savings_checkup_history', entry, totalScore); // Sync snapshot
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      <PageHeader 
        title={t('Savings Check-up')}
        backHref="/"
        rightSlot={step === QUESTIONS.length + 1 ? (
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={handleSave} className="btn btn-primary btn-sm">{saved ? <Check size={14} /> : <Save size={14} />} {saved ? t('Success') : t('Save')}</button>
            <button onClick={() => setStep(0)} className="btn btn-secondary btn-icon btn-sm"><RotateCcw size={14} /></button>
          </div>
        ) : null}
      />
      <div style={{ maxWidth: 640, margin: '0 auto', padding: 'var(--space-6) var(--space-4) var(--space-16)' }}>
        
        {step === 0 && (
          <div style={{ textAlign: 'center', padding: 'var(--space-12) 0' }}>
            <div style={{ width: 80, height: 80, borderRadius: 'var(--radius-2xl)', background: 'var(--brand-primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-primary)', margin: '0 auto var(--space-8)' }}>
              <ShieldCheck size={40} />
            </div>
            <h1 className="display-sm" style={{ marginBottom: 'var(--space-4)' }}>{t('Savings Check-up')}</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-lg)', maxWidth: 480, margin: '0 auto var(--space-10)', lineHeight: 1.6 }}>{t('Audit your liquidity strength and behavioral compounding. Benchmark your retention velocity against professional targets.')}</p>
            
            <button className="btn btn-primary btn-lg" onClick={() => setStep(1)} style={{ padding: '16px 40px', marginBottom: 'var(--space-12)' }}>{t('Start Check-up')}</button>

            {history.length > 0 && (
              <div style={{ textAlign: 'left' }}>
                <label className="label-caps" style={{ marginBottom: 'var(--space-4)' }}>{t('History')}</label>
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
             <div style={{ background: result.color, borderRadius: 'var(--radius-2xl)', padding: 'var(--space-10)', textAlign: 'center', color: 'white', marginBottom: 'var(--space-8)' }}>
                <p className="label-caps" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>{t('RESERVE STATUS')}</p>
                <div className="display-sm" style={{ fontWeight: 900, marginBottom: 8 }}>{t(result.label)}</div>
                <p style={{ opacity: 0.9, lineHeight: 1.5 }}>{t(result.desc)}</p>
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
