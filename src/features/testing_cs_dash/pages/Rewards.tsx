import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { REWARDS_DATA } from '@/lib/data';
import { Gift, TrendingUp, Users } from 'lucide-react';

const Rewards = () => {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Rewards & Incentives</h1>
        <p className="text-muted-foreground mt-1">
          Primary question: <span className="font-medium text-foreground">Which rewards drive retention and engagement?</span>
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Key Insight */}
        <div className="col-span-12">
          <div className="executive-card p-6 gradient-success text-white">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-white/20">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Key Insight</h3>
                <p className="text-white/90 mt-1">{REWARDS_DATA.insight}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Rewards */}
        <div className="col-span-8">
          <div className="executive-card p-6">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-6">
              Top Performing Rewards
            </h2>
            <div className="space-y-4">
              {REWARDS_DATA.topRewards.map((reward, index) => (
                <div key={reward.name} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{reward.name}</h3>
                      <p className="text-sm text-muted-foreground">{reward.redemptions} redemptions</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-success">{reward.retention}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="col-span-4 space-y-4">
          <div className="executive-card p-5">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Gift className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Redemptions</p>
                <p className="text-2xl font-bold text-foreground mt-1">105</p>
                <p className="text-xs text-success mt-1">+18% from last quarter</p>
              </div>
            </div>
          </div>
          <div className="executive-card p-5">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <Users className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Engagement Lift</p>
                <p className="text-2xl font-bold text-foreground mt-1">34%</p>
                <p className="text-xs text-muted-foreground mt-1">For reward redeemers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Rewards;
