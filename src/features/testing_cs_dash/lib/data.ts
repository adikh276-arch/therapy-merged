// MantraCare Dashboard Data Layer
// Outcome-based metrics with actionable insights

export const PROGRAM_HEALTH = {
  score: 78,
  status: 'Good' as const,
  trend: '+3 from last month',
  subscores: { 
    activation: 80, 
    satisfaction: 92, 
    engagement_freq: 65 
  }
};

export const FUNNEL_DATA = [
  { stage: 'Eligible', count: 500, label: '500 Employees', rate: 100 },
  { stage: 'Invited', count: 500, label: '100% Invited', rate: 100 },
  { stage: 'Activated', count: 81, label: '16.2% Active', rate: 16.2, benchmark: 12 },
  { stage: 'Engaged', count: 60, label: '12% Monthly Active', rate: 12, benchmark: 8 },
];

export const SERVICE_DEMAND = [
  { 
    service: 'Therapy', 
    capacity: 100, 
    used: 95, 
    status: 'critical' as const,
    action: 'Expand Capacity',
    insight: '3 employees denied service this month'
  },
  { 
    service: 'Yoga', 
    capacity: 100, 
    used: 45, 
    status: 'stable' as const,
    action: null,
    insight: 'Healthy utilization rate'
  },
  { 
    service: 'Coaching', 
    capacity: 50, 
    used: 42, 
    status: 'warning' as const,
    action: 'Monitor Demand',
    insight: 'Approaching capacity limit'
  },
  { 
    service: 'Financial', 
    capacity: 0, 
    used: 0, 
    status: 'opportunity' as const,
    action: 'Launch Module',
    insight: '35% cite financial stress as top concern'
  },
];

export const RISKS = [
  { 
    dept: 'Marketing', 
    risk: 'High' as const, 
    reason: 'Silent Sufferers',
    detail: 'High stress scores, low program engagement',
    employees: 12,
    action: 'Launch targeted outreach'
  },
  { 
    dept: 'Sales', 
    risk: 'High' as const, 
    reason: 'Seeking Help',
    detail: 'High stress, actively using services',
    employees: 18,
    action: 'Ensure capacity availability'
  },
  { 
    dept: 'Engineering', 
    risk: 'Medium' as const, 
    reason: 'Burnout Risk',
    detail: 'Extended hours, moderate engagement',
    employees: 8,
    action: 'Review workload distribution'
  },
];

export const ROI_METRICS = {
  daysSaved: 498,
  estValue: 249000,
  retentionBoost: '2x',
  retentionDetail: 'for Coaching users',
  absenteeismReduction: 23,
  productivityGain: 15,
};

export const ACTION_ITEMS = [
  {
    id: 1,
    type: 'critical' as const,
    title: 'Therapy capacity at 95%',
    detail: '3 employees denied service this week',
    action: 'Expand Capacity',
    actionType: 'upsell' as const,
  },
  {
    id: 2,
    type: 'warning' as const,
    title: 'Financial stress rising in Marketing',
    detail: '35% cite inflation as primary concern',
    action: 'View Solution',
    actionType: 'opportunity' as const,
  },
  {
    id: 3,
    type: 'success' as const,
    title: 'Activation rate above benchmark',
    detail: '16.2% vs. industry average of 12%',
    action: 'View Report',
    actionType: 'insight' as const,
  },
];

export const ENGAGEMENT_TRENDS = [
  { month: 'Jul', sessions: 145, satisfaction: 4.2 },
  { month: 'Aug', sessions: 168, satisfaction: 4.3 },
  { month: 'Sep', sessions: 192, satisfaction: 4.4 },
  { month: 'Oct', sessions: 210, satisfaction: 4.5 },
  { month: 'Nov', sessions: 198, satisfaction: 4.4 },
  { month: 'Dec', sessions: 225, satisfaction: 4.6 },
];

export const EMPLOYEES = [
  { id: 1, name: 'Anonymous User 1', dept: 'Marketing', riskScore: 78, recency: '14 days', status: 'silent-sufferer' as const },
  { id: 2, name: 'Anonymous User 2', dept: 'Sales', riskScore: 82, recency: '2 days', status: 'active' as const },
  { id: 3, name: 'Anonymous User 3', dept: 'Engineering', riskScore: 45, recency: '1 day', status: 'healthy' as const },
  { id: 4, name: 'Anonymous User 4', dept: 'Marketing', riskScore: 71, recency: '21 days', status: 'silent-sufferer' as const },
  { id: 5, name: 'Anonymous User 5', dept: 'HR', riskScore: 32, recency: '3 days', status: 'healthy' as const },
  { id: 6, name: 'Anonymous User 6', dept: 'Sales', riskScore: 88, recency: '1 day', status: 'active' as const },
];

export const REWARDS_DATA = {
  topRewards: [
    { name: 'Coaching Sessions', redemptions: 42, retention: '2x higher retention' },
    { name: 'Wellness Vouchers', redemptions: 38, retention: '1.5x higher retention' },
    { name: 'Gym Membership', redemptions: 25, retention: '1.3x higher retention' },
  ],
  insight: 'Employees who redeem Coaching stay 2x longer than non-redeemers',
};

export const FEEDBACK_DATA = {
  avgResponseTime: '2h',
  targetResponseTime: '24h',
  keywords: [
    { word: 'Confidential', count: 45, sentiment: 'positive' as const },
    { word: 'Helpful', count: 38, sentiment: 'positive' as const },
    { word: 'Video Quality', count: 12, sentiment: 'neutral' as const },
    { word: 'Scheduling', count: 8, sentiment: 'negative' as const },
  ],
  nps: 72,
};

export const OPTIMIZATION_GAPS = [
  { category: 'Therapy', company: 95, benchmark: 70 },
  { category: 'Yoga', company: 45, benchmark: 50 },
  { category: 'Coaching', company: 84, benchmark: 60 },
  { category: 'Financial', company: 0, benchmark: 55 },
  { category: 'Nutrition', company: 30, benchmark: 45 },
  { category: 'Sleep', company: 25, benchmark: 40 },
];
