'use client';

import { useState, useEffect } from 'react';
import { 
  CheckSquare, ArrowRight, RotateCcw, Save, Check,
  PiggyBank, Scale, Palette, Sparkles, AlertTriangle, Target,
  Zap, Brain, Star, Quote, ChevronLeft, Shield, TrendingUp,
  CreditCard, Calendar, BarChart2, Heart, Info
} from 'lucide-react';
import { storage } from '@/lib/storage';
import { PageHeader } from '@/components/layout/PageHeader';
import { useTranslation } from 'react-i18next';

const QUESTIONS = [
  { id: 'q1', text: "When you encounter an unsolicited discount or sale event:", options: ['Disregard entirely - utility over price always', 'Analytical review for potential high-value needs', 'Capitalize on the discount opportunity immediately'] },
  { id: 'q2', text: "Your primary methodology for monthly capital allocation:", options: ['Algorithmic - automated transfers on payday', 'Residual - saving whatever remains post-spend', 'Opportunistic - minimal structure, living for today'] },
  { id: 'q3', text: "Under high-stress environments, your fiscal reaction is:", options: ['Hyper-retention - increasing cash reserves for security', 'Moderate - consistent spending on small comforts', 'Disruptive - significant spend for immediate dopamine'] },
  { id: 'q4', text: "The act of transaction execution makes you feel:", options: ['Friction - spending feels like a responsibility shift', 'Neutral - a purely functional exchange of value', 'Vibrant - an immediate sense of reward or relief'] },
  { id: 'q5', text: "Your level of granular expense monitoring:", options: ['Continuous - real-time tracking in digital ledger', 'Periodic - rough mental estimates of major outflows', 'Non-existent - trusting intuition and balance checks'] },
  { id: 'q6', text: "Your strategic perspective on credit instruments:", options: ['Leverage - strictly functional, paid in full monthly', 'Convenience - a standard operational payment tool', 'Extension - a means to bridge current capital gaps'] },
  { id: 'q7', text: "Your approach to long-horizon financial modeling:", options: ['Detailed - comprehensive multi-year strategic plan', 'Conceptual - vague directional milestones', 'Reactive - primary focus on current liquidity needs'] },
  { id: 'q8', text: "Upon receiving a significant revenue increase:", options: ['Capitalize - immediately increase investment velocity', 'Hybrid - split between lifestyle and accumulation', 'Lifestyle - immediate upgrade to current environment'] },
  { id: 'q9', text: "How frequently do you execute impulse acquisitions?", options: ['Negligible - strictly following evaluation protocols', 'Occasional - mostly low-impact lifestyle spends', 'Chronic - immediate conversion from desire to spend'] },
  { id: 'q10', text: "Your current relationship with your financial state:", options: ['Sovereign - complete mastery of personal numbers', 'Functional - mostly optimized, occasional outliers', 'Turbulent - capital appears to dissipate rapidly'] },
];

const STYLES = [
  {
    id: 'saver',
    label: "The Strategic Architect",
    icon: Shield,
    color: '#00A884',
    gradient: 'linear-gradient(135deg, #00A884 0%, #00d2d3 100%)',
    description: 'You prioritize fiscal security and long-term capital accumulation. You possess high self-regulation but may under-allocate to current lifestyle enjoyment.',
    strengths: ['Exceptional capital retention', 'Robust emergency liquidity', 'Long-horizon strategic thinking'],
    challenges: ['Potential opportunity cost of enjoyment', 'Risk of hyper-frugality burnout', 'Emotional friction during necessary spends'],
    recommendations: ['Explicitly budget 20-30% for lifestyle capital', 'Quantify the ROI of experiences and joy', 'Automate "joy funds" to reduce spending guilt'],
  },
  {
    id: 'balancer',
    label: "The Equitable Optimizer",
    icon: Scale,
    color: 'var(--brand-primary)',
    gradient: 'linear-gradient(135deg, #2563EB 0%, #60A5FA 100%)',
    description: 'You maintain a high-functioning equilibrium between current fulfillment and future security. An adaptable and pragmatic fiscal behavioral model.',
    strengths: ['Sustainable lifestyle balance', 'High adaptability to market shifts', 'Low psychological stress regarding money'],
    challenges: ['May lack aggressive growth momentum', 'Savings velocity might be inconsistent', 'Risk of "middle ground" stagnation'],
    recommendations: ['Implement a strict 50/30/20 framework', 'Increase investment velocity during high-revenue cycles', 'Set ambitious 10-year terminal wealth targets'],
  },
  {
    id: 'spender',
    label: "The Experiential Catalyst",
    icon: Zap,
    color: '#F39C12',
    gradient: 'linear-gradient(135deg, #F39C12 0%, #E67E22 100%)',
    description: 'You prioritize current environment optimization and experiences. You catalyze capital into immediate value but require rigorous systems for accumulation.',
    strengths: ['Maximizes real-time lifestyle value', 'Highly generous and social capital', 'Risk-tolerant and growth-oriented'],
    challenges: ['Low structural accumulation baseline', 'Susceptible to impulse capital leaks', 'Higher probability of liquidity friction'],
    recommendations: ['Implement "Invisible Savings" - direct deposit to brokerage', 'Enforce a 48-hour cooling period for any non-essential >1% spend', 'Gamify the act of capital retention and tracking'],
  },
];

export default function SpendingStyleQuiz() {
  const { t } = useTranslation();
  const [step, setStep] = useState(0); 
  const [answers, setAnswers] = useState<number[]>([]);
  const [saved, setSaved] = useState(false);
  const [prevResult, setPrevResult] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    // 1. Local
    setHistory(storage.get('spending_style_history', []));
    setPrevResult(storage.get('spending_style_result', null));

    // 2. Server
    storage.fetch('spending_style_history').then(remote => {
      if (remote) {
        setHistory(remote);
        storage.set('spending_style_history', remote);
      }
    });
  }, []);

  const currentQ = QUESTIONS[step - 1];
  const progress = step > 0 && step <= 10 ? ((step - 1) / 10) * 100 : 0;

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);
    if (step === 10) {
      setStep(11);
    } else {
      setStep(s => s + 1);
    }
  };

  const spendingScore = answers.reduce((sum, a) => sum + a, 0);
  const styleIndex = spendingScore <= 6 ? 0 : spendingScore <= 13 ? 1 : 2;
  const style = STYLES[styleIndex];

  const handleSave = () => {
    const result = { styleId: style?.id, score: spendingScore, date: new Date().toISOString() };
    const newHistory = [result, ...history.slice(0, 9)];
    
    setHistory(newHistory);
    storage.set('spending_style_result', result);
    storage.set('spending_style_history', newHistory);
    
    // Remote Sync (Only sync snapshot)
    storage.sync('spending_style_history', result);
    
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      <PageHeader 
        title={t('Spending Style Quiz')}
        backHref="/"
        rightSlot={step === 11 ? (
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={handleSave} className="btn btn-primary btn-sm">{saved ? <Check size={14} /> : <Save size={14} />} {saved ? t('Saved!') : t('Save')}</button>
            <button onClick={() => { setStep(0); setAnswers([]); }} className="btn btn-secondary btn-icon btn-sm"><RotateCcw size={14} /></button>
          </div>
        ) : null}
      />
      <div style={{ maxWidth: 640, margin: '0 auto', padding: 'var(--space-6) var(--space-4) var(--space-16)' }}>
        {step > 0 && step <= 10 && (
          <div style={{ marginBottom: 'var(--space-10)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t('EVALUATION DEPTH')}</span>
              <span style={{ fontSize: 10, color: 'var(--brand-primary)', fontWeight: 800 }}>{Math.round(progress)}% COMPLETE</span>
            </div>
            <div className="progress-bar" style={{ height: 6, background: 'var(--bg-neutral)' }}><div className="progress-fill" style={{ width: `${progress}%`, background: 'var(--gradient-brand)' }} /></div>
          </div>
        )}

        {step === 0 && (
          <div style={{ textAlign: 'center', padding: 'var(--space-12) 0', animation: 'fadeIn 0.4s ease' }}>
            <div style={{ 
              width: 80, height: 80, borderRadius: 'var(--radius-2xl)', background: 'var(--bg-glass-light)', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-primary)',
              margin: '0 auto var(--space-8)', border: '1px solid var(--border-subtle)'
            }}>
              <Brain size={40} strokeWidth={1.5} />
            </div>
            <h1 className="display-sm" style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-4)' }}>{t('Decode Your Money DNA')}</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-lg)', maxWidth: 540, margin: '0 auto var(--space-8)', lineHeight: 1.6 }}>
              {t('A specialized psychometric evaluation designed to identify your core behavioral spending archetypes and provide institutional-grade tactical interventions.')}
            </p>
            {prevResult && (
              <div style={{ marginBottom: 'var(--space-10)', display: 'inline-flex', alignItems: 'center', gap: 12, padding: '10px 24px', background: 'var(--bg-card-hover)', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{t('LAST KNOWN ARCHETYPE:')}</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--brand-primary)' }}>{t(STYLES.find(s => s.id === prevResult.styleId)?.label || '')}</span>
              </div>
            )}
            <div style={{ display: 'block' }}>
              <button className="btn btn-primary btn-lg" onClick={() => setStep(1)} style={{ padding: '16px 40px' }}>
                {t('Begin Analysis')} <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {step > 0 && step <= 10 && (
          <div key={step} style={{ animation: 'slideInRight 0.35s ease' }}>
            <div className="card" style={{ padding: 'var(--space-10)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--brand-primary)', fontWeight: 700, fontSize: 10, textTransform: 'uppercase', marginBottom: 'var(--space-6)', letterSpacing: '0.1em' }}>
                <div style={{ width: 16, height: 2, background: 'var(--brand-primary)', borderRadius: 2 }} />
                DIMENSION {step} / 10
              </div>
              <h2 className="heading-xl" style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-10)', lineHeight: 1.2, fontWeight: 800 }}>{t(currentQ?.text || '')}</h2>
              <div className="stack-4">
                {currentQ?.options.map((opt, i) => (
                  <button key={i} onClick={() => handleAnswer(i)} className="card card-hover" style={{ 
                    padding: 'var(--space-6)', borderRadius: 'var(--radius-xl)', 
                    textAlign: 'left', color: 'var(--text-secondary)', 
                    display: 'flex', alignItems: 'center', gap: 'var(--space-5)', width: '100%',
                    border: '1px solid var(--border-subtle)', background: 'var(--bg-card)',
                    cursor: 'pointer'
                  }}>
                    <div style={{ 
                      width: 40, height: 40, borderRadius: 'var(--radius-lg)', 
                      background: 'var(--bg-neutral)', border: '1px solid var(--border-subtle)', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center', 
                      fontSize: 14, fontWeight: 800, color: 'var(--brand-primary)', flexShrink: 0 
                    }}>
                      {String.fromCharCode(65 + i)}
                    </div>
                    <span style={{ fontWeight: 600, fontSize: 'var(--text-base)', color: 'var(--text-primary)' }}>{t(opt)}</span>
                  </button>
                ))}
              </div>
            </div>
            {step > 1 && (
              <button className="btn btn-ghost" style={{ marginTop: 'var(--space-6)', color: 'var(--text-muted)' }} onClick={() => { setStep(s => s - 1); setAnswers(a => a.slice(0, -1)); }}>
                <ChevronLeft size={16} /> {t('Re-evaluate previous dimension')}
              </button>
            )}
          </div>
        )}

        {step === 11 && style && (
          <div style={{ animation: 'fadeIn 0.6s ease' }}>
            {/* Professional Result Header */}
            <div style={{ 
              background: style.gradient, borderRadius: 'var(--radius-3xl)', 
              padding: 'var(--space-12)', marginBottom: 'var(--space-8)', 
              textAlign: 'center', color: 'white', boxShadow: 'var(--shadow-brand)',
              position: 'relative', overflow: 'hidden'
            }}>
              <div style={{ position: 'absolute', top: -30, right: -30, opacity: 0.08 }}>
                <style.icon size={250} />
              </div>
              <div style={{ 
                width: 72, height: 72, borderRadius: 'var(--radius-2xl)', background: 'rgba(255,255,255,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-6)',
                backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <style.icon size={36} color="white" strokeWidth={2.5} />
              </div>
              <div style={{ fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.8)', marginBottom: 8, letterSpacing: '0.25em', textTransform: 'uppercase' }}>{t('VERIFIED ARCHETYPE')}</div>
              <div className="display-sm" style={{ marginBottom: 'var(--space-4)', fontWeight: 900 }}>{t(style.label)}</div>
              <p style={{ fontSize: 'var(--text-lg)', maxWidth: 600, margin: '0 auto', opacity: 0.95, lineHeight: 1.6, fontWeight: 500 }}>{t(style.description)}</p>
            </div>

            <div className="responsive-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
              <div className="card" style={{ borderTop: '4px solid #00A884', padding: 'var(--space-8)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#00A884', fontWeight: 800, fontSize: 11, textTransform: 'uppercase', marginBottom: 'var(--space-6)', letterSpacing: '0.05em' }}>
                  <TrendingUp size={16} /> {t('Strategic Assets')}
                </div>
                <div className="stack-4">
                  {style.strengths.map((s, i) => (
                    <div key={i} style={{ display: 'flex', gap: 14, fontSize: 'var(--text-sm)', color: 'var(--text-primary)', lineHeight: 1.5, alignItems: 'center', fontWeight: 600 }}>
                      <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#00A88415', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Check size={12} color="#00A884" strokeWidth={3} />
                      </div>
                      {s}
                    </div>
                  ))}
                </div>
              </div>
              <div className="card" style={{ borderTop: '4px solid #E74C3C', padding: 'var(--space-8)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#E74C3C', fontWeight: 800, fontSize: 11, textTransform: 'uppercase', marginBottom: 'var(--space-6)', letterSpacing: '0.05em' }}>
                  <AlertTriangle size={16} /> {t('Operational Friction')}
                </div>
                <div className="stack-4">
                  {style.challenges.map((c, i) => (
                    <div key={i} style={{ display: 'flex', gap: 14, fontSize: 'var(--text-sm)', color: 'var(--text-primary)', lineHeight: 1.5, alignItems: 'center', fontWeight: 600 }}>
                      <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#E74C3C15', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Info size={12} color="#E74C3C" strokeWidth={3} />
                      </div>
                      {c}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: 'var(--space-10)', border: '1px solid var(--border-brand)', background: 'var(--bg-glass-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--brand-primary)', fontWeight: 800, fontSize: 13, textTransform: 'uppercase', marginBottom: 'var(--space-8)', letterSpacing: '0.1em' }}>
                <Target size={22} /> {t('Behavioral Optimization Strategy')}
              </div>
              <div className="stack-4">
                {style.recommendations.map((r, i) => (
                  <div key={i} className="card" style={{ padding: 'var(--space-5)', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', display: 'flex', gap: 20, alignItems: 'center' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-xl)', background: 'var(--brand-primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: 'var(--brand-primary)', flexShrink: 0, fontSize: 16 }}>0{i + 1}</div>
                    <div style={{ fontSize: 'var(--text-base)', color: 'var(--text-primary)', fontWeight: 700 }}>{t(r)}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 'var(--space-12)', display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button className="btn btn-secondary btn-lg" style={{ padding: '16px 32px' }} onClick={() => { setStep(0); setAnswers([]); }}>{t('Recalibrate Profile')}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
