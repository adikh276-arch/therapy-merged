import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { HealthScore } from '@/components/dashboard/HealthScore';
import { ActionStream } from '@/components/dashboard/ActionStream';
import { QuickStats } from '@/components/dashboard/QuickStats';
import { RiskOverview } from '@/components/dashboard/RiskOverview';

const Home = () => {
  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">
          Good morning, Sarah
        </h1>
        <p className="text-muted-foreground mt-1">
          Here's what matters today for Acme Corporation's wellness program.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - Health Score */}
        <div className="col-span-4">
          <HealthScore />
        </div>

        {/* Right Column - Action Stream */}
        <div className="col-span-8">
          <ActionStream />
        </div>

        {/* Bottom Row */}
        <div className="col-span-8">
          <QuickStats />
        </div>

        <div className="col-span-4">
          <RiskOverview />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
