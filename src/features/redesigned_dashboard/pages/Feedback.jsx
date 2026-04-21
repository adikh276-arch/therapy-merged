import React from 'react';
import { MessageSquare, ThumbsUp, ThumbsDown, Clock } from 'lucide-react';
import { FEEDBACK_DATA } from '../data/mockData';
import StatCard from '../components/ui/StatCard';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

const Feedback = () => {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <MessageSquare className="text-primary" />
                    Voice of Employee (Feedback)
                </h1>
                <p className="text-secondary">Listen to employee sentiment and track response performance.</p>
            </div>

            <div className="grid grid-cols-3 gap-6">
                <StatCard title="Net Promoter Score (NPS)" value={FEEDBACK_DATA.nps} trend="+4" trendDirection="up" icon={ThumbsUp} />
                <StatCard title="Avg Response Time" value="2h 15m" trend="Target: 24h" icon={Clock} color="success" />
                <StatCard title="Open Tickets" value="12" trend="-3" trendDirection="down" icon={MessageSquare} />
            </div>

            <div className="grid grid-cols-2 gap-6">
                {/* Sentiment Analysis */}
                <div className="card">
                    <h2 className="text-lg font-bold mb-4">Sentiment Drivers</h2>
                    <div style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart layout="vertical" data={FEEDBACK_DATA.keywords} margin={{ left: 80 }}>
                                <XAxis type="number" hide />
                                <YAxis dataKey="text" type="category" width={120} tick={{ fontSize: 12, fontWeight: '500' }} />
                                <Tooltip cursor={{ fill: 'transparent' }} />
                                <Bar dataKey="value" barSize={20} radius={[0, 4, 4, 0]}>
                                    {FEEDBACK_DATA.keywords.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.sentiment === 'positive' ? '#10B981' : entry.sentiment === 'negative' ? '#EF4444' : '#94A3B8'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="text-center text-sm text-secondary mt-2">
                        Green: Positive | Red: Negative | Gray: Neutral
                    </div>
                </div>

                {/* Recent Feedback Feed (Mock) */}
                <div className="card">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold">Recent Mentions</h2>
                        <button className="text-primary text-sm font-medium">View All</button>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="p-3 bg-gray-50 rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                                <span className="badge badge-success">Positive</span>
                                <span className="text-xs text-secondary">2 hours ago</span>
                            </div>
                            <p className="text-sm italic">"The video quality for the therapy session was excellent today. Much better than last time."</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                                <span className="badge badge-danger">Negative</span>
                                <span className="text-xs text-secondary">5 hours ago</span>
                            </div>
                            <p className="text-sm italic">"I couldn't find a slot for a physiotherapist this whole week. We need more availability."</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                                <span className="badge badge-warning">Neutral</span>
                                <span className="text-xs text-secondary">1 day ago</span>
                            </div>
                            <p className="text-sm italic">"Is the app down? It was loading slowly this morning."</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Feedback;
