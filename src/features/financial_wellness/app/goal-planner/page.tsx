'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Target, Plus, Edit2, Trash2, Check, Save, X, 
  TrendingUp, AlertTriangle, Star, CheckCircle2, AlertCircle, ChevronLeft, ArrowRight,
  Plane, Home, GraduationCap, Car, Heart, Shield, Umbrella, Rocket, Layout, Calendar
} from 'lucide-react';
import { storage, fmt, calc } from '@/lib/storage';
import { PageHeader } from '@/components/layout/PageHeader';
import { differenceInMonths, parseISO, format } from 'date-fns';

const CATEGORIES = [
  { id: 'Vacation', icon: Plane, label: "Vacation" },
  { id: 'Home', icon: Home, label: "Home" },
  { id: 'Education', icon: GraduationCap, label: "Education" },
  { id: 'Car', icon: Car, label: "Car" },
  { id: 'Wedding', icon: Heart, label: "Wedding" },
  { id: 'Emergency Fund', icon: Shield, label: "Emergency Fund" },
  { id: 'Retirement', icon: Umbrella, label: "Retirement" },
  { id: 'Investment', icon: TrendingUp, label: "Investment" },
  { id: 'Other', icon: Target, label: "Other" }
];

const PRIORITY_COLORS = { High: 'var(--brand-danger)', Medium: 'var(--brand-gold)', Low: 'var(--brand-success)' };

interface Goal {
  id: string;
  name: string;
  target: number;
  targetDate: string;
  category: string;
  priority: 'High' | 'Medium' | 'Low';
  current: number;
  monthly: number;
  createdAt: string;
}

const newGoalTemplate = (catOther: string): Omit<Goal, 'id' | 'createdAt'> => ({
  name: '', target: 0, targetDate: '', category: catOther, priority: 'Medium', current: 0, monthly: 0,
});

export default function GoalPlanner() {
  const { t } = useTranslation();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [step, setStep] = useState(-1);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(newGoalTemplate("Other"));
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // 1. Load from local as immediate baseline
    const local = storage.get<any>('goals', null);
    if (local && local.goals) setGoals(local.goals);
    
    // 2. Clear local and Fetch from server as source of truth if available
    storage.fetch('goals').then(remote => {
      if (remote && remote.goals) {
        setGoals(remote.goals);
        storage.set('goals', { goals: remote.goals });
      }
    });
  }, []);

  const save = (newGoals: Goal[]) => {
    setGoals(newGoals);
    storage.set('goals', { goals: newGoals });
    storage.sync('goals', { goals: newGoals });
  };

  const handleSubmit = () => {
    if (!form.name || !form.target) return;
    if (editId) {
      save(goals.map(g => g.id === editId ? { ...g, ...form } : g));
      setEditId(null);
    } else {
      const newGoal: Goal = { ...form, id: Date.now().toString(), createdAt: new Date().toISOString() };
      save([...goals, newGoal]);
    }
    setForm(newGoalTemplate("Other"));
    setShowForm(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleEdit = (goal: Goal) => {
    setForm({ name: goal.name, target: goal.target, targetDate: goal.targetDate, category: goal.category, priority: goal.priority, current: goal.current, monthly: goal.monthly });
    setEditId(goal.id);
    setShowForm(true);
    setStep(0);
  };

  const handleDelete = (id: string) => {
    save(goals.filter(g => g.id !== id));
  };

  const totalMonthlyNeeded = goals.reduce((sum, g) => {
    const months = g.targetDate ? Math.max(1, differenceInMonths(parseISO(g.targetDate), new Date())) : 24;
    return sum + calc.monthlySavingsNeeded(g.target, g.current, months);
  }, 0);

  const totalTargetValue = goals.reduce((sum, g) => sum + g.target, 0);
  const totalSavedValue = goals.reduce((sum, g) => sum + g.current, 0);

  const onTrackCount = goals.filter(g => {
    const months = g.targetDate ? Math.max(1, differenceInMonths(parseISO(g.targetDate), new Date())) : 24;
    const needed = calc.monthlySavingsNeeded(g.target, g.current, months);
    return g.monthly >= needed;
  }).length;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      <PageHeader 
        title={t('Goal Planner')} 
        backHref="/"
        accentColor="#FDCB6E"
        rightSlot={saved ? (
          <div style={{ background: 'var(--brand-success-glow)', color: 'var(--brand-success)', padding: '6px 16px', borderRadius: 99, fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Check size={14} /> {t('Saved and synced')}
          </div>
        ) : (
          <div style={{ background: 'var(--bg-card)', color: 'var(--text-faint)', padding: '6px 16px', borderRadius: 99, fontSize: 11, fontWeight: 700 }}>
            {t('{{count}} active goals', { count: goals.length })}
          </div>
        )}
      />
      <div style={{ maxWidth: 640, margin: '0 auto', padding: 'var(--space-6) var(--space-4) var(--space-16)' }}>
        
        {step === -1 && (
          <div style={{ animation: 'fadeInUp 0.4s ease both' }}>
            <div style={{ textAlign: 'center', padding: 'var(--space-12) 0' }}>
              <div style={{ width: 80, height: 80, borderRadius: '24px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-8)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border-subtle)' }}>
                <Target size={40} color="var(--brand-primary)" />
              </div>
              <h1 className="display-sm" style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-4)' }}>{t('Dream with Discipline')}</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-lg)', maxWidth: 440, margin: '0 auto var(--space-10)', lineHeight: 1.6 }}>
                {t('Define your financial milestones. Track progress toward your house, car, or education goals with real-time probability analysis.')}
              </p>
              <button className="btn btn-primary btn-lg" onClick={() => setStep(0)} style={{ minWidth: 220 }}>
                {goals.length > 0 ? t('Manage My Goals') : t('Create First Goal')} <Target size={18} style={{ marginLeft: 8 }} />
              </button>

              {goals.length > 0 && (
                <div style={{ marginTop: 'var(--space-12)', textAlign: 'left' }}>
                  <label className="label-caps" style={{ marginBottom: 'var(--space-4)', display: 'block' }}>{t('Summary Statistics')}</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
                    <div className="card" style={{ padding: 'var(--space-6)' }}>
                      <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--text-muted)', marginBottom: 4 }}>{t('TOTAL TARGET')}</div>
                      <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)' }}>{fmt.currency(totalTargetValue)}</div>
                    </div>
                    <div className="card" style={{ padding: 'var(--space-6)' }}>
                      <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--text-muted)', marginBottom: 4 }}>{t('TOTAL SAVED')}</div>
                      <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--brand-success)' }}>{fmt.currency(totalSavedValue)}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {step === 0 && (
          <div style={{ animation: 'fadeIn 0.35s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-8)' }}>
              <button onClick={() => setStep(-1)} className="btn btn-secondary btn-sm"><ChevronLeft size={14} /> {t('Back')}</button>
              <h2 className="heading-md">{t('Goal Planner')}</h2>
              <button className="btn btn-primary btn-sm" onClick={() => { setShowForm(true); setEditId(null); setForm(newGoalTemplate("Other")); }}>
                <Plus size={14} /> {t('New Goal')}
              </button>
            </div>

            {/* Analytics bar */}
            {goals.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 'var(--space-3)', marginBottom: 'var(--space-8)' }}>
                <div className="card" style={{ padding: 'var(--space-4)', background: 'var(--bg-glass-light)' }}>
                  <div style={{ fontSize: 9, fontWeight: 800, color: 'var(--text-muted)' }}>{t('ON TRACK')}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#00A884' }}>{onTrackCount} / {goals.length}</div>
                </div>
                <div className="card" style={{ padding: 'var(--space-4)', background: 'var(--bg-glass-light)' }}>
                   <div style={{ fontSize: 9, fontWeight: 800, color: 'var(--text-muted)' }}>{t('MONTHLY NEEDED')}</div>
                   <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--brand-primary)' }}>{fmt.currency(totalMonthlyNeeded)}</div>
                </div>
              </div>
            )}

            {showForm && (
              <div className="card" style={{ border: '2px solid var(--brand-primary)', marginBottom: 'var(--space-8)', padding: 'var(--space-8)', animation: 'slideInRight 0.3s ease' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
                  <h3 className="heading-sm">{editId ? t('Modify Goal') : t('Define Strategic Goal')}</h3>
                  <button onClick={() => setShowForm(false)} className="btn btn-secondary btn-icon"><X size={16} /></button>
                </div>
                
                <div className="stack-4">
                  <div className="form-group">
                    <label className="form-label">{t('Goal Name')}</label>
                    <input type="text" className="form-input" required placeholder="e.g. Master's in CS" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">{t('Category')}</label>
                      <select className="form-input" required value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                        {CATEGORIES.map(c => <option key={c.id} value={c.id}>{t(c.label)}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">{t('Priority')}</label>
                      <select className="form-input" required value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value as any })}>
                        <option value="High">{t('High')}</option>
                        <option value="Medium">{t('Medium')}</option>
                        <option value="Low">{t('Low')}</option>
                      </select>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">{t('Target Capital')}</label>
                      <input type="number" className="form-input" required min="1" placeholder="0.00" value={form.target || ''} onChange={e => setForm({ ...form, target: Math.max(0, Number(e.target.value)) })} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">{t('Target Date')}</label>
                      <input type="date" className="form-input" required min={new Date().toISOString().split('T')[0]} value={form.targetDate} onChange={e => setForm({ ...form, targetDate: e.target.value })} />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">{t('Existing Savings')}</label>
                      <input type="number" className="form-input" min="0" placeholder="0.00" value={form.current || ''} onChange={e => setForm({ ...form, current: Math.max(0, Number(e.target.value)) })} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">{t('Current Monthly Saving')}</label>
                      <input type="number" className="form-input" min="0" placeholder="0.00" value={form.monthly || ''} onChange={e => setForm({ ...form, monthly: Math.max(0, Number(e.target.value)) })} />
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: 12, marginTop: 'var(--space-4)' }}>
                    <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => { setShowForm(false); setEditId(null); }}>{t('Discard')}</button>
                    <button className="btn btn-primary" style={{ flex: 2 }} onClick={handleSubmit} disabled={!form.name || !form.target || !form.targetDate}>
                      {editId ? t('Update Strategy') : t('Deploy Goal')}
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="stack-4">
              {goals.length === 0 && !showForm && (
                <div style={{ textAlign: 'center', padding: 'var(--space-12) 0', color: 'var(--text-muted)' }}>
                  <Calendar size={48} strokeWidth={1} style={{ marginBottom: 16, opacity: 0.5 }} />
                  <p>{t('No active goals yet. Start by defining your first objective.')}</p>
                </div>
              )}
              {goals.map(goal => {
                const category = CATEGORIES.find(c => c.id === goal.category) || CATEGORIES[8];
                const CatIcon = category.icon;
                const percent = Math.min(100, goal.target > 0 ? (goal.current / goal.target) * 100 : 0);
                const months = goal.targetDate ? Math.max(1, differenceInMonths(parseISO(goal.targetDate), new Date())) : null;
                const needed = months !== null ? calc.monthlySavingsNeeded(goal.target, goal.current, months) : 0;
                const onTrack = goal.monthly >= needed;

                return (
                  <div key={goal.id} className="card" style={{ padding: 'var(--space-6)', borderLeft: `4px solid ${PRIORITY_COLORS[goal.priority]}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-4)' }}>
                      <div style={{ display: 'flex', gap: 16 }}>
                        <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-lg)', background: 'var(--bg-base)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-subtle)' }}>
                          <CatIcon size={22} color="var(--brand-primary)" />
                        </div>
                        <div>
                          <h4 className="heading-sm" style={{ marginBottom: 2 }}>{goal.name}</h4>
                          <span className="badge" style={{ fontSize: 9, background: `${PRIORITY_COLORS[goal.priority]}15`, color: PRIORITY_COLORS[goal.priority] }}>{t(goal.priority)}</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 4 }}>
                        <button className="btn btn-secondary btn-icon btn-sm" onClick={() => handleEdit(goal)}><Edit2 size={13} /></button>
                        <button className="btn btn-secondary btn-icon btn-sm" onClick={() => handleDelete(goal.id)} style={{ color: 'var(--brand-danger)' }}><Trash2 size={13} /></button>
                      </div>
                    </div>

                    <div style={{ marginBottom: 'var(--space-4)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12, fontWeight: 700 }}>
                        <span style={{ color: 'var(--text-secondary)' }}>{fmt.currency(goal.current)} / {fmt.currency(goal.target)}</span>
                        <span style={{ color: 'var(--brand-primary)' }}>{Math.round(percent)}%</span>
                      </div>
                      <div className="progress-bar" style={{ height: 8 }}><div className="progress-fill" style={{ width: `${percent}%`, background: onTrack ? '#00A884' : 'var(--brand-gold)' }} /></div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', background: 'var(--bg-base)', padding: 'var(--space-3)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
                       <div>
                         <div style={{ fontSize: 9, fontWeight: 800, color: 'var(--text-faint)', textTransform: 'uppercase' }}>{t('Required / Mo')}</div>
                         <div style={{ fontSize: 13, fontWeight: 700, color: onTrack ? '#00A884' : 'var(--brand-danger)' }}>{fmt.currency(needed)}</div>
                       </div>
                       <div>
                         <div style={{ fontSize: 9, fontWeight: 800, color: 'var(--text-faint)', textTransform: 'uppercase' }}>{t('Time Horizon')}</div>
                         <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{months !== null ? t('{{count}} months', { count: months }) : 'N/A'}</div>
                       </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
