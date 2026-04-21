import React, { useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ScatterChart, Scatter, ZAxis } from 'recharts';
import { Activity, ArrowRight, TrendingDown } from 'lucide-react';
import { FUNNEL_DATA } from '../data/mockData';

const Summary = () => {
    const [activeTab, setActiveTab] = useState('overview');

    const riskData = [
        { x: 10, y: 90, z: 10, name: 'Marketing' }, // Low engagement, High Risk
        { x: 80, y: 80, z: 20, name: 'Sales' }, // High engagement, High Risk
        { x: 20, y: 20, z: 5, name: 'IT' }, // Low engagement, Low Risk
        { x: 90, y: 10, z: 10, name: 'HR' }, // High engagement, Low Risk
    ];

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Activity className="text-primary" />
                        Program Health
                    </h1>
                    <p className="text-secondary">Deep dive into adoption, risk, and service performance.</p>
                </div>

                {/* Toggle Tabs */}
                <div className="flex bg-white rounded-lg p-1 border border-gray-200">
                    <button
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'overview' ? 'bg-primary text-white shadow-sm' : 'text-secondary hover:text-primary'}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        Overview (Funnel)
                    </button>
                    <button
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'service' ? 'bg-primary text-white shadow-sm' : 'text-secondary hover:text-primary'}`}
                        onClick={() => setActiveTab('service')}
                    >
                        Service Demand
                    </button>
                </div>
            </div>

            {activeTab === 'overview' ? (
                <div className="grid grid-cols-2 gap-6">
                    {/* Funnel Widget */}
                    <div className="card col-span-2 lg:col-span-1">
                        <h2 className="text-lg font-bold mb-4">Adoption Funnel</h2>
                        <div style={{ height: '300px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={FUNNEL_DATA} layout="vertical" margin={{ left: 20, right: 20 }}>
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="stage" type="category" width={80} tick={{ fontSize: 12 }} />
                                    <Tooltip cursor={{ fill: 'transparent' }} />
                                    <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={32}>
                                        {FUNNEL_DATA.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={index === 0 ? '#E2E8F0' : index === 1 ? '#CBD5E1' : index === 2 ? 'var(--primary)' : 'var(--success)'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg mt-2">
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="text-xs text-secondary mb-1">Funnel Insight</div>
                                    <div className="font-bold text-sm">Drop-off from Activation to Engagement is low (74% retention).</div>
                                </div>
                                <div className="text-success text-sm font-bold">Good Health</div>
                            </div>
                        </div>
                    </div>

                    {/* Risk Matrix */}
                    <div className="card col-span-2 lg:col-span-1">
                        <h2 className="text-lg font-bold mb-4">Cohort Risk Matrix</h2>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                    <XAxis type="number" dataKey="x" name="Engagement" unit="%" domain={[0, 100]} label={{ value: 'Engagement Level', position: 'bottom', fontSize: 12 }} />
                                    <YAxis type="number" dataKey="y" name="Risk Score" unit="%" domain={[0, 100]} label={{ value: 'Risk Score (Stress)', angle: -90, position: 'left', fontSize: 12 }} />
                                    <ZAxis type="number" dataKey="z" range={[100, 400]} />
                                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                    <Scatter name="Departments" data={riskData} fill="#8884d8">
                                        {riskData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.y > 50 ? (entry.x > 50 ? '#F59E0B' : '#EF4444') : '#10B981'} />
                                        ))}
                                    </Scatter>
                                </ScatterChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                                <div className="font-bold text-xs text-danger mb-1">Silent Sufferers</div>
                                <div className="text-sm">Marketing Dept: Low Engagement, High Risk. <br /><strong>Action:</strong> Send targeted check-in.</div>
                            </div>
                            <div className="p-3 bg-yellow-50 border border-yellow-100 rounded-lg">
                                <div className="font-bold text-xs text-warning mb-1">Seeking Help</div>
                                <div className="text-sm">Sales Dept: High Engagement, High Risk. <br /><strong>Action:</strong> Ensure therapy slots available.</div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="card">
                    <div className="flex flex-col items-center justify-center p-12 text-center">
                        <div className="bg-blue-50 p-4 rounded-full mb-4">
                            <TrendingDown size={32} className="text-primary" />
                        </div>
                        <h2 className="text-xl font-bold mb-2">Demand Intelligence View</h2>
                        <p className="text-secondary mb-6 max-w-md">
                            This view is currently being generated based on live utilization data.
                            Please see the "Program Optimization" tab for critical capacity alerts.
                        </p>
                        <button className="btn btn-primary">Go to Optimization</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Summary;
