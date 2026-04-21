import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, AlertTriangle, TrendingUp, Users, Activity, ChevronRight } from 'lucide-react';
import StatCard from '../components/ui/StatCard';
import { PROGRAM_HEALTH, FUNNEL_DATA } from '../data/mockData';

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col gap-6">
            {/* Hero Section - Program Health */}
            <div className="card" style={{
                background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
                color: 'white',
                border: 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '2rem'
            }}>
                <div>
                    <h1 className="text-2xl font-bold mb-2">Good Morning, Aditya</h1>
                    <p className="text-secondary" style={{ color: '#94A3B8', maxWidth: '500px' }}>
                        Your program health is <strong>Good</strong>. Engagement is stable, but there is an opportunity to improve
                        Survey Participation to get better risk insights.
                    </p>
                    <div className="flex gap-4 mt-6">
                        <button className="btn btn-primary" onClick={() => navigate('/optimization')}>
                            <Rocket size={18} />
                            View Optimization Opportunities
                        </button>
                        <button className="btn btn-outline" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>
                            Download Monthly Report
                        </button>
                    </div>
                </div>

                {/* Health Score Ring (CSS only representation) */}
                <div className="flex items-center gap-6">
                    <div style={{ position: 'relative', width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="120" height="120" viewBox="0 0 120 120">
                            <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="12" />
                            <circle cx="60" cy="60" r="54" fill="none" stroke="var(--success)" strokeWidth="12" strokeDasharray="339.292" strokeDashoffset="74.6" transform="rotate(-90 60 60)" />
                        </svg>
                        <div style={{ position: 'absolute', textAlign: 'center' }}>
                            <div className="text-3xl font-bold">{PROGRAM_HEALTH.score}</div>
                            <div className="text-xs text-secondary" style={{ color: '#94A3B8' }}>/ 100</div>
                        </div>
                    </div>
                    <div>
                        <div className="text-sm font-bold mb-2">Key Drivers</div>
                        {PROGRAM_HEALTH.breakdown.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between gap-4 text-sm mb-1">
                                <span style={{ color: '#CBD5E1' }}>{item.label}</span>
                                <span className={`text-${item.status === 'success' ? 'success' : item.status === 'warning' ? 'warning' : 'danger'}`}>
                                    {item.score}/100
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
                {/* Action Stream */}
                <div className="card" style={{ gridColumn: 'span 2' }}>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold flex items-center gap-2">
                            <Activity size={20} className="text-primary" />
                            Action Stream
                        </h2>
                        <button className="text-sm text-primary font-medium">View All</button>
                    </div>

                    <div className="flex flex-col gap-3">
                        {/* Action Item 1 */}
                        <div className="flex items-center justify-between p-3 rounded-lg" style={{ background: '#FEF2F2', border: '1px solid #FECACA' }}>
                            <div className="flex items-center gap-3">
                                <div style={{ background: 'white', padding: '8px', borderRadius: '50%' }}>
                                    <AlertTriangle size={18} className="text-danger" />
                                </div>
                                <div>
                                    <div className="font-bold text-sm text-danger">High Risk Cohort Detected</div>
                                    <div className="text-xs text-secondary">3 employees in 'Marketing' reported high stress this week.</div>
                                </div>
                            </div>
                            <button className="btn text-sm" style={{ background: 'white', border: '1px solid #FECACA', color: '#DC2626', padding: '0.4rem 0.8rem' }}>
                                View Risk Report
                            </button>
                        </div>

                        {/* Action Item 2 */}
                        <div className="flex items-center justify-between p-3 rounded-lg" style={{ background: '#EFF6FF', border: '1px solid #BFDBFE' }}>
                            <div className="flex items-center gap-3">
                                <div style={{ background: 'white', padding: '8px', borderRadius: '50%' }}>
                                    <TrendingUp size={18} className="text-primary" />
                                </div>
                                <div>
                                    <div className="font-bold text-sm text-primary">Therapy Demand Spiking</div>
                                    <div className="text-xs text-secondary">Utilization reached 95% last week. Consider adding supply.</div>
                                </div>
                            </div>
                            <button className="btn text-sm" style={{ background: 'white', border: '1px solid #BFDBFE', color: '#2563EB', padding: '0.4rem 0.8rem' }}>
                                Manage Supply
                            </button>
                        </div>
                    </div>
                </div>

                {/* Quick Funnel Stats */}
                <div className="flex flex-col gap-4">
                    <StatCard
                        title="Active Employees"
                        value={FUNNEL_DATA[2].count}
                        trend="+12%"
                        trendDirection="up"
                        icon={Users}
                        color="success"
                    />
                    <StatCard
                        title="Activation Rate"
                        value={`${FUNNEL_DATA[2].rate}%`}
                        trend="+2.1%"
                        trendDirection="up"
                        icon={TrendingUp}
                    />
                </div>
            </div>

            {/* Engagement Snapshots (Placeholder for now, or simple grid) */}
            <div>
                <h2 className="text-lg font-bold mb-4">Engagement Snippets</h2>
                <div className="grid grid-cols-3 gap-6">
                    <div className="card hover:shadow-md cursor-pointer transition-all" onClick={() => navigate('/engagement')}>
                        <div className="text-secondary text-sm mb-2">Upcoming Campaign</div>
                        <div className="font-bold mb-1">Stepathon Challenge</div>
                        <div className="text-sm text-success">120 Expected Participants</div>
                    </div>
                    <div className="card hover:shadow-md cursor-pointer transition-all" onClick={() => navigate('/summary')}>
                        <div className="text-secondary text-sm mb-2">Top Service</div>
                        <div className="font-bold mb-1">Video Therapy</div>
                        <div className="text-sm text-primary">100% Satisfaction Score</div>
                    </div>
                    <div className="card hover:shadow-md cursor-pointer transition-all" onClick={() => navigate('/roi')}>
                        <div className="text-secondary text-sm mb-2">Value Realized</div>
                        <div className="font-bold mb-1">498 Days Saved</div>
                        <div className="text-sm text-success">$249k Est. Value</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
