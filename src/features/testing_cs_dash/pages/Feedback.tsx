import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { FEEDBACK_DATA } from '@/lib/data';
import { MessageSquare, Clock, ThumbsUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const Feedback = () => {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Voice of Employee</h1>
        <p className="text-muted-foreground mt-1">
          Primary question: <span className="font-medium text-foreground">What are employees saying about the program?</span>
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* NPS Score */}
        <div className="col-span-4">
          <div className="executive-card p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 rounded-lg bg-success/10">
                <ThumbsUp className="w-5 h-5 text-success" />
              </div>
              <span className="text-xs text-success font-medium px-2 py-0.5 rounded-full bg-success/10">
                Excellent
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Net Promoter Score</p>
            <p className="text-4xl font-bold text-foreground mt-2">{FEEDBACK_DATA.nps}</p>
            <p className="text-xs text-muted-foreground mt-2">Industry avg: 45</p>
          </div>
        </div>

        {/* Response Time SLA */}
        <div className="col-span-4">
          <div className="executive-card p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs text-success font-medium px-2 py-0.5 rounded-full bg-success/10">
                On Target
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Avg Response Time</p>
            <p className="text-4xl font-bold text-foreground mt-2">{FEEDBACK_DATA.avgResponseTime}</p>
            <p className="text-xs text-muted-foreground mt-2">Target: {FEEDBACK_DATA.targetResponseTime}</p>
          </div>
        </div>

        {/* Total Feedback */}
        <div className="col-span-4">
          <div className="executive-card p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Total Responses</p>
            <p className="text-4xl font-bold text-foreground mt-2">156</p>
            <p className="text-xs text-muted-foreground mt-2">Last 30 days</p>
          </div>
        </div>

        {/* Keyword Analysis */}
        <div className="col-span-8">
          <div className="executive-card p-6">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-6">
              Top Keywords
            </h2>
            <div className="flex flex-wrap gap-3">
              {FEEDBACK_DATA.keywords.map((keyword) => (
                <div 
                  key={keyword.word}
                  className={cn(
                    "px-4 py-2 rounded-lg border text-sm font-medium",
                    keyword.sentiment === 'positive' && 'bg-success/10 text-success border-success/20',
                    keyword.sentiment === 'neutral' && 'bg-muted text-muted-foreground border-border',
                    keyword.sentiment === 'negative' && 'bg-destructive/10 text-destructive border-destructive/20',
                  )}
                >
                  {keyword.word}
                  <span className="ml-2 opacity-70">({keyword.count})</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="col-span-4">
          <div className="executive-card p-6">
            <h3 className="font-medium text-foreground mb-4">Action Items</h3>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
                <p className="text-sm font-medium text-warning">Address Scheduling Concerns</p>
                <p className="text-xs text-warning/80 mt-1">8 mentions in negative context</p>
              </div>
              <div className="p-3 rounded-lg bg-muted">
                <p className="text-sm font-medium text-foreground">Improve Video Quality</p>
                <p className="text-xs text-muted-foreground mt-1">12 neutral mentions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Feedback;
