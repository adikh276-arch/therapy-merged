import React from 'react';
import { Award, Gift, TrendingUp, Info } from 'lucide-react';
import { REWARDS_DATA } from '../data/mockData';
import StatCard from '../components/ui/StatCard';

const Rewards = () => {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <Award className="text-primary" />
                    Rewards & Incentives
                </h1>
                <p className="text-secondary">Track redemption and align incentives with retention goals.</p>
            </div>

            <div className="grid grid-cols-3 gap-6">
                <StatCard title="Total Redemptions" value="324" trend="+15%" trendDirection="up" icon={Gift} />
                <StatCard title="Avg Retention Boost" value="1.5x" trend="for Redeemers" icon={TrendingUp} color="success" />
                <StatCard title="Budget Utilized" value="$4.5k" trend="of $10k" icon={Award} />
            </div>

            <div className="card">
                <h2 className="text-xl font-bold mb-4">Incentive Effectiveness Analysis</h2>
                <div className="grid grid-cols-2 gap-6">
                    {REWARDS_DATA.map((reward, idx) => (
                        <div key={idx} className="p-4 border rounded-xl flex justify-between items-center hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center text-yellow-600">
                                    <Gift size={24} />
                                </div>
                                <div>
                                    <div className="font-bold">{reward.item}</div>
                                    <div className="text-sm text-secondary">{reward.claimed} Claimed</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-xs text-secondary mb-1">Retention Impact</div>
                                <div className={`font-bold ${reward.retentionBoost !== 'Neutral' ? 'text-success' : 'text-gray-500'}`}>
                                    {reward.retentionBoost}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-6 flex items-start gap-2 p-3 bg-blue-50 text-blue-800 rounded-lg text-sm">
                    <Info size={16} className="mt-1 flex-shrink-0" />
                    <div>
                        <strong>Insight:</strong> Employees redeeming "Leadership Coaching" show the highest retention boost (2x).
                        Consider increasing budget for professional development rewards.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Rewards;
