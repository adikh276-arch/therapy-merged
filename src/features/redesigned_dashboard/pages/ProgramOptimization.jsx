import React from 'react';
import { Target, Zap, Users, TrendingUp, ArrowRight, Lock } from 'lucide-react';
import { OPTIMIZATION_INSIGHTS, SERVICE_DEMAND } from '../data/mockData';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const ProgramOptimization = () => {
    const spiderData = [
        { subject: 'Mental', A: 90, B: 70, fullMark: 100 },
        { subject: 'Physical', A: 50, B: 60, fullMark: 100 },
        { subject: 'Financial', A: 35, B: 70, fullMark: 100 }, // Gap here
        { subject: 'Social', A: 60, B: 65, fullMark: 100 },
        { subject: 'Professional', A: 85, B: 75, fullMark: 100 },
    ];

    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <Zap className="text-warning" fill="currentColor" />
                    Program Optimization (Growth Engine)
                </h1>
                <p className="text-secondary">AI-driven recommendations to improve workforce outcomes and reduce risk.</p>
            </div>

            <div className="grid grid-cols-2 gap-8">
                {/* Gap Analysis Chart */}
                <div className="card">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Target size={20} className="text-primary" />
                        Wellbeing Gap Analysis
                    </h2>
                    <div style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={spiderData}>
                                <PolarGrid stroke="#E2E8F0" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748B', fontSize: 12 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar name="Industry Benchmark" dataKey="B" stroke="#94A3B8" fill="#94A3B8" fillOpacity={0.2} />
                                <Radar name="Your Company" dataKey="A" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.5} />
                                <Tooltip />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg mt-4 border border-blue-100 flex gap-4 items-start" style={{ background: '#EFF6FF', borderColor: '#BFDBFE' }}>
                        <div className="text-xs font-bold uppercase tracking-wider text-primary mt-1">Insight</div>
                        <div className="text-sm">
                            You are leading in Mental Wellness but lagging significantly in <strong>Financial Wellbeing</strong> (-35% vs Benchmark).
                        </div>
                    </div>
                </div>

                {/* Top Recommendation (Upsell Magnet) */}
                <div className="card flex flex-col justify-between" style={{ border: '2px solid var(--primary)', position: 'relative', overflow: 'hidden' }}>
                    <div style={{
                        position: 'absolute', top: 0, right: 0,
                        background: 'var(--primary)', color: 'white',
                        padding: '4px 12px', borderBottomLeftRadius: '12px',
                        fontWeight: 'bold', fontSize: '12px'
                    }}>
                        RECOMMENDED INTERVENTION
                    </div>

                    <div>
                        <h2 className="text-xl font-bold mb-2">Launch Financial Planning Module</h2>
                        <div className="text-sm text-secondary mb-6">
                            To address the "Financial Gap" identified in your surveys.
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <div className="text-xs text-secondary mb-1">Signal</div>
                                <div className="font-bold text-sm">35% of employees cited "Inflation" as top stressor.</div>
                            </div>
                            <div className="p-3 bg-green-50 rounded-lg">
                                <div className="text-xs text-secondary mb-1">Expected Outcome</div>
                                <div className="font-bold text-sm text-success">Reduce financial-distraction by ~15%.</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 items-center mt-auto">
                        <button className="btn btn-primary flex-1 justify-center">
                            Request Module Demo
                            <ArrowRight size={16} />
                        </button>
                        <div className="text-xs text-secondary text-center w-full mt-2">
                            Implementation time: ~3 Days
                        </div>
                    </div>
                </div>
            </div>

            {/* Seat Utilization & Expansion */}
            <div className="card">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                        <Users size={20} className="text-primary" />
                        Service Capacity & Demand
                    </h2>
                    <button className="text-primary text-sm font-medium">View Detailed Report</button>
                </div>

                <div className="grid grid-cols-4 gap-6">
                    {SERVICE_DEMAND.map((service, idx) => (
                        <div key={idx} className="p-4 rounded-xl border border-gray-100 flex flex-col gap-2" style={{ background: service.status === 'critical' ? '#FEF2F2' : '#F8FAFC' }}>
                            <div className="flex justify-between items-center">
                                <span className="font-bold">{service.service}</span>
                                {service.status === 'critical' && <span className="badge badge-danger">CRITICAL</span>}
                                {service.status === 'low' && <span className="badge badge-warning">LOW UTILIZATION</span>}
                            </div>

                            <div className="text-sm text-secondary">
                                {service.used}% Utilized
                            </div>

                            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                                <div
                                    className={`h-2 rounded-full ${service.status === 'critical' ? 'bg-red-500' : service.status === 'low' ? 'bg-yellow-400' : 'bg-green-500'}`}
                                    style={{ width: `${service.used}%`, background: service.status === 'critical' ? 'var(--danger)' : service.status === 'low' ? 'var(--warning)' : 'var(--success)' }}
                                ></div>
                            </div>

                            {service.status === 'critical' ? (
                                <button className="btn text-xs w-full justify-center" style={{ background: 'var(--danger)', color: 'white' }}>
                                    Expand Capacity (+50)
                                </button>
                            ) : service.status === 'low' ? (
                                <button className="btn text-xs w-full justify-center btn-outline">
                                    Promote Service
                                </button>
                            ) : (
                                <div className="text-xs text-center text-success font-medium flex items-center justify-center gap-1">
                                    <TrendingUp size={12} /> Healthy Demand
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProgramOptimization;
