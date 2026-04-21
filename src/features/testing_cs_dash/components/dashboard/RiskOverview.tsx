import { AlertCircle, ArrowRight } from 'lucide-react';
import { RISKS } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const riskColors = {
  High: 'bg-destructive text-destructive-foreground',
  Medium: 'bg-warning text-warning-foreground',
  Low: 'bg-success text-success-foreground',
};

export function RiskOverview() {
  const highRiskCount = RISKS.filter(r => r.risk === 'High').length;
  const totalEmployeesAtRisk = RISKS.reduce((acc, r) => acc + r.employees, 0);

  return (
    <div className="executive-card p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Department Risk Overview
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            {highRiskCount} departments need attention • {totalEmployeesAtRisk} employees at risk
          </p>
        </div>
        <div className="p-2 rounded-lg bg-destructive/10">
          <AlertCircle className="w-4 h-4 text-destructive" />
        </div>
      </div>

      <div className="space-y-3">
        {RISKS.map((risk) => (
          <div 
            key={risk.dept}
            className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className={cn(
                "px-2 py-0.5 rounded text-xs font-medium",
                riskColors[risk.risk as keyof typeof riskColors]
              )}>
                {risk.risk}
              </span>
              <div>
                <p className="font-medium text-sm text-foreground">{risk.dept}</p>
                <p className="text-xs text-muted-foreground">{risk.reason}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">{risk.employees}</p>
              <p className="text-xs text-muted-foreground">employees</p>
            </div>
          </div>
        ))}
      </div>

      <Link 
        to="/employees"
        className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
      >
        View All Employees
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
