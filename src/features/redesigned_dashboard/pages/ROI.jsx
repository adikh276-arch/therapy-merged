import React, { useState } from 'react';
import { ROI_DATA } from '../data/mockData';
import { TrendingUp, ShieldCheck, DollarSign, Clock } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, PieChart, Pie } from 'recharts';
import StatCard from '../components/ui/StatCard';

const ROI = () => {
    const [model, setModel] = useState('holistic'); // 'conservative' or 'holistic'

    const getValue = (val) => model === 'conservative' ? val * 0.6 : val;

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <TrendingUp className="text-primary" />
                        Value Center (ROI)
                    </h1>
                    <p className="text-secondary">Quantifiable impact on productivity, retention, and risk.</p>
                </div>

                <div className="flex bg-white rounded-lg p-1 border border-gray-200">
                    <button
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${model === 'conservative' ? 'bg-primary text-white shadow-sm' : 'text-secondary hover:text-primary'}`}
                        onClick={() => setModel('conservative')}
                    >
                        Conservative Model
                    </button>
                    <button
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${model === 'holistic' ? 'bg-primary text-white shadow-sm' : 'text-secondary hover:text-primary'}`}
                        onClick={() => setModel('holistic')}
                    >
                        Holistic Model
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-6">
                <StatCard
                    title="Est. Value Created"
                    value={`$${(getValue(ROI_DATA.totalValue) / 1000).toFixed(1)}k`}
                    trend="+8%" trendDirection="up" icon={DollarSign} color="success"
                />
                <StatCard
                    title="Productive Days Saved"
                    value={Math.round(getValue(ROI_DATA.daysSaved))}
                    trend="+12" trendDirection="up" icon={Clock}
                />
                <StatCard
                    title="Risk Cases Resolved"
                    value={ROI_DATA.riskCasesResolved}
                    trend="All Closed" icon={ShieldCheck}
                />
                <StatCard
                    title="Retention Boost"
                    value={ROI_DATA.retentionBoost}
                    trend="vs Industry" icon={TrendingUp}
                />
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="card">
                    <h2 className="text-lg font-bold mb-4">Value Breakdown by Service</h2>
                    <div style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={ROI_DATA.breakdown} layout="vertical" margin={{ left: 40 }}>
                                <XAxis type="number" hide />
                                <YAxis dataKey="category" type="category" width={100} tick={{ fontSize: 12, fontWeight: 'bold' }} />
                                <Tooltip cursor={{ fill: 'transparent' }} formatter={(val) => `$${getValue(val).toLocaleString()}`} />
                                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                                    {ROI_DATA.breakdown.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 0 ? '#3B82F6' : index === 1 ? '#10B981' : '#F59E0B'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 text-sm text-secondary text-center">
                        *Based on clinical productivity benchmarks (Mental Health = {model === 'conservative' ? '$300' : '$500'} / day saved)
                    </div>
                </div>

                <div className="card bg-blue-50 border border-blue-100 flex flex-col justify-center items-center text-center p-8">
                    <ShieldCheck size={48} className="text-primary mb-4" />
                    <h2 className="text-xl font-bold mb-2">Defensible Value</h2>
                    <p className="text-secondary max-w-md mb-6">
                        This report uses the <strong>{model === 'conservative' ? 'Conservative' : 'Standard'}</strong> methodology.
                        {model === 'conservative'
                            ? ' It excludes all "soft" productivity gains and focuses only on direct absenteeism reduction.'
                            : ' It includes both absenteeism reduction and presenteeism improvement estimates.'}
                    </p>
                    <button className="btn btn-outline bg-white">Download Methodology PDF</button>
                </div>
            </div>
        </div>
    );
};

export default ROI;
