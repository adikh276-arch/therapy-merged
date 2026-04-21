import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { EMPLOYEES } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Search, Filter, AlertTriangle, UserX } from 'lucide-react';

const statusConfig = {
  'silent-sufferer': {
    label: 'Silent Sufferer',
    color: 'bg-destructive/10 text-destructive border-destructive/20',
    description: 'High risk, low engagement',
  },
  'active': {
    label: 'Active User',
    color: 'bg-success/10 text-success border-success/20',
    description: 'Regular program user',
  },
  'healthy': {
    label: 'Healthy',
    color: 'bg-primary/10 text-primary border-primary/20',
    description: 'Low risk, stable',
  },
};

const Employees = () => {
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const silentSufferers = EMPLOYEES.filter(e => e.status === 'silent-sufferer');
  const filteredEmployees = EMPLOYEES.filter(e => {
    if (filter === 'all') return true;
    return e.status === filter;
  });

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Employees</h1>
        <p className="text-muted-foreground mt-1">
          Primary question: <span className="font-medium text-foreground">Who needs attention most urgently?</span>
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Alert Banner */}
        {silentSufferers.length > 0 && (
          <div className="col-span-12">
            <div className="executive-card p-4 border-l-4 border-l-destructive bg-destructive/5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-destructive/10">
                  <UserX className="w-5 h-5 text-destructive" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">
                    {silentSufferers.length} Silent Sufferers Identified
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    High risk scores with no recent program activity. Immediate outreach recommended.
                  </p>
                </div>
                <button className="px-4 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm font-medium hover:bg-destructive/90 transition-colors">
                  View Silent Sufferers
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="col-span-12">
          <div className="executive-card p-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="text"
                  placeholder="Search by department or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <div className="flex rounded-lg bg-muted p-1">
                  {['all', 'silent-sufferer', 'active', 'healthy'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilter(status)}
                      className={cn(
                        "px-3 py-1.5 rounded-md text-xs font-medium transition-colors capitalize",
                        filter === status 
                          ? "bg-card text-foreground shadow-sm" 
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {status === 'all' ? 'All' : status.replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Employee Table */}
        <div className="col-span-12">
          <div className="executive-card overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left py-4 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wide">Employee</th>
                  <th className="text-left py-4 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wide">Department</th>
                  <th className="text-center py-4 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wide">Risk Score</th>
                  <th className="text-center py-4 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wide">Last Active</th>
                  <th className="text-center py-4 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wide">Status</th>
                  <th className="text-center py-4 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wide">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredEmployees.map((employee) => {
                  const config = statusConfig[employee.status];
                  
                  return (
                    <tr key={employee.id} className="hover:bg-muted/30 transition-colors">
                      <td className="py-4 px-6">
                        <span className="text-sm font-medium text-foreground">{employee.name}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-muted-foreground">{employee.dept}</span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <span className={cn(
                            "text-sm font-bold",
                            employee.riskScore >= 70 ? 'text-destructive' :
                            employee.riskScore >= 50 ? 'text-warning' : 'text-success'
                          )}>
                            {employee.riskScore}
                          </span>
                          {employee.riskScore >= 70 && (
                            <AlertTriangle className="w-4 h-4 text-destructive" />
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className={cn(
                          "text-sm",
                          employee.recency.includes('day') && parseInt(employee.recency) <= 7 
                            ? 'text-foreground' 
                            : 'text-muted-foreground'
                        )}>
                          {employee.recency}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className={cn(
                          "inline-flex px-2.5 py-1 rounded-full text-xs font-medium border",
                          config.color
                        )}>
                          {config.label}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        {employee.status === 'silent-sufferer' ? (
                          <button className="text-sm text-primary font-medium hover:underline">
                            Initiate Outreach
                          </button>
                        ) : (
                          <button className="text-sm text-muted-foreground hover:text-foreground">
                            View Details
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Employees;
