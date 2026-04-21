export const PROGRAM_HEALTH = {
    score: 78,
    status: 'Good',
    trend: '+4.2%',
    breakdown: [
        { label: 'Activation', score: 80, status: 'success' },
        { label: 'Satisfaction', score: 92, status: 'success' },
        { label: 'Engagement Freq', score: 65, status: 'warning' },
    ]
};

export const FUNNEL_DATA = [
    { stage: 'Eligible', count: 500, rate: 100, label: '500 Employees' },
    { stage: 'Invited', count: 500, rate: 100, label: '100% Invited' },
    { stage: 'Activated', count: 81, rate: 16.2, label: '16.2% Active' },
    { stage: 'Engaged', count: 60, rate: 12.0, label: '12% Monthly Active' },
];

export const SERVICE_DEMAND = [
    { service: 'Therapy', capacity: 100, used: 95, status: 'critical', trend: 'up' },
    { service: 'Yoga', capacity: 100, used: 45, status: 'stable', trend: 'stable' },
    { service: 'Dietician', capacity: 50, used: 60, status: 'stable', trend: 'up' },
    { service: 'Physio', capacity: 50, used: 10, status: 'low', trend: 'down' },
];

export const ENGAGEMENT_METRICS = {
    campaigns: [
        { id: 1, name: 'Stepathon Challenge', date: 'Jan 13', expected: 120, status: 'upcoming' },
        { id: 2, name: 'Burnout Webinar', date: 'Jan 20', expected: 85, status: 'upcoming' },
    ],
    webinarTopics: [
        { topic: 'Burnout Prevention', searches: 450, trend: '+300%' },
        { topic: 'Nutrition', searches: 120, trend: '-10%' },
        { topic: 'Sleep', searches: 310, trend: '+50%' },
    ],
    sentiment: {
        current: 'Neutral',
        score: 6.5,
        insight: 'Monday Morning Blues detected. Stress peaks on Mondays.'
    }
};

export const ROI_DATA = {
    daysSaved: 498,
    valuePerDay: 500, // $
    totalValue: 249000,
    breakdown: [
        { category: 'Therapy', engaged: 498, value: 249000 },
        { category: 'Yoga', engaged: 415, value: 207500 },
        { category: 'Physio', engaged: 378, value: 189000 },
    ],
    riskCasesResolved: 5,
    retentionBoost: '2x'
};

export const OPTIMIZATION_INSIGHTS = {
    topGap: {
        area: 'Financial Wellbeing',
        score: 35, // vs benchmark 70
        insight: '35% of survey responses mention "Inflation" as top stressor.',
        action: 'Launch Financial Planning Module',
        projectedOutcome: 'Reduce financial-related distraction by 15%.'
    },
    capacityAlert: {
        service: 'Therapy',
        utilization: 95,
        insight: 'You are nearing capacity. 3 employees failed to book last week.',
        action: 'Expand Seats (+50)'
    }
};

export const EMPLOYEE_DATA = [
    { id: 1, name: 'Aditya S.', dept: 'Engineering', status: 'Active', recency: '2 days ago', riskScore: 10, engagement: 'High' },
    { id: 2, name: 'Sarah J.', dept: 'Marketing', status: 'Active', recency: '12 days ago', riskScore: 85, engagement: 'High' }, // Seeking Help
    { id: 3, name: 'Mike T.', dept: 'Sales', status: 'Inactive', recency: '45 days ago', riskScore: 60, engagement: 'Low' },
    { id: 4, name: 'Lisa R.', dept: 'HR', status: 'Active', recency: '5 days ago', riskScore: 20, engagement: 'Medium' },
    { id: 5, name: 'John D.', dept: 'Marketing', status: 'Active', recency: '1 day ago', riskScore: 90, engagement: 'Low' }, // Silent Sufferer
];

export const REWARDS_DATA = [
    { item: 'Amazon Gift Card', claimed: 145, retentionBoost: 'Neutral' },
    { item: 'Leadership Coaching', claimed: 34, retentionBoost: '2x Higher' },
    { item: 'Extra PTO Day', claimed: 89, retentionBoost: '1.5x Higher' },
    { item: 'Gym Membership', claimed: 56, retentionBoost: '1.2x Higher' },
];

export const FEEDBACK_DATA = {
    nps: 42,
    responseRate: 'Good (2h avg)',
    keywords: [
        { text: 'Confidentiality', value: 80, sentiment: 'positive' },
        { text: 'Therapist Availability', value: 60, sentiment: 'negative' },
        { text: 'App Speed', value: 30, sentiment: 'neutral' },
        { text: 'Video Quality', value: 50, sentiment: 'positive' },
    ]
};
