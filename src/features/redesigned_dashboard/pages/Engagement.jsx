import React from 'react';
import { Users, Calendar, Video, MessageSquare, ArrowRight, Smile } from 'lucide-react';
import { ENGAGEMENT_METRICS } from '../data/mockData';
import StatCard from '../components/ui/StatCard';

const Engagement = () => {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <Users className="text-primary" />
                    Engagement Labs
                </h1>
                <p className="text-secondary">Drive behavior change through campaigns, learning, and listening.</p>
            </div>

            <div className="grid grid-cols-3 gap-6">
                {/* Wellbeing Campaigns (Calendar) */}
                <div className="card col-span-2">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold flex items-center gap-2">
                            <Calendar size={20} className="text-primary" />
                            Upcoming Campaigns
                        </h2>
                        <button className="text-primary text-sm font-medium">View Calendar</button>
                    </div>
                    <div className="flex flex-col gap-3">
                        {ENGAGEMENT_METRICS.campaigns.map((camp) => (
                            <div key={camp.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:shadow-sm transition-all">
                                <div className="flex gap-4 items-center">
                                    <div className="flex flex-col items-center justify-center w-12 h-12 bg-blue-50 text-primary rounded-lg font-bold">
                                        <span className="text-xs uppercase">JAN</span>
                                        <span className="text-lg">{camp.date.split(' ')[1]}</span>
                                    </div>
                                    <div>
                                        <div className="font-bold">{camp.name}</div>
                                        <div className="text-xs text-secondary">Status: <span className="text-success uppercase font-semibold">{camp.status}</span></div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-lg">{camp.expected}</div>
                                    <div className="text-xs text-secondary">Expected Participants</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sentiment Pulse (Surveys) */}
                <div className="card bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
                        <MessageSquare size={20} />
                        Sentiment Pulse
                    </h2>
                    <div className="flex flex-col items-center justify-center py-6">
                        <Smile size={48} className="mb-2 opacity-90" />
                        <div className="text-3xl font-bold">{ENGAGEMENT_METRICS.sentiment.score}/10</div>
                        <div className="text-sm opacity-80 mb-6">{ENGAGEMENT_METRICS.sentiment.current} Sentiment</div>

                        <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm text-sm border border-white/20">
                            <div className="font-bold mb-1 opacity-90">Insight Detected</div>
                            "{ENGAGEMENT_METRICS.sentiment.insight}"
                        </div>
                    </div>
                </div>
            </div>

            {/* Webinar Demand */}
            <div className="card">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Video size={20} className="text-primary" />
                    Learning Demand (Webinars)
                </h2>
                <div className="grid grid-cols-3 gap-6">
                    {ENGAGEMENT_METRICS.webinarTopics.map((topic, idx) => (
                        <div key={idx} className="p-4 border border-gray-100 rounded-xl">
                            <div className="text-sm text-secondary mb-1">Topic Interest</div>
                            <div className="font-bold text-lg mb-2">{topic.topic}</div>
                            <div className="flex justify-between items-end">
                                <div>
                                    <div className="text-2xl font-bold">{topic.searches}</div>
                                    <div className="text-xs text-secondary">Searches</div>
                                </div>
                                <div className={`text-sm font-bold ${topic.trend.startsWith('+') ? 'text-success' : 'text-danger'}`}>
                                    {topic.trend}
                                </div>
                            </div>
                            {topic.trend.startsWith('+') && parseFloat(topic.trend) > 50 && (
                                <button className="btn btn-primary w-full mt-3 text-xs justify-center">
                                    Schedule Session
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Engagement;
