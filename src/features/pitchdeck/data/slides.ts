export interface SlideData {
  id: number;
  type: 'title' | 'content' | 'comparison' | 'metrics' | 'timeline' | 'chart' | 'framework' | 'matrix';
  title: string;
  subtitle?: string;
  footer?: string;
  bullets?: string[];
  table?: {
    columns: string[];
    rows: { label: string; values: string[] }[];
  };
  comparison?: {
    left: { title: string; items: string[] };
    right: { title: string; items: string[] };
  };
  chart?: {
    type: 'bar' | 'line' | 'funnel' | 'matrix' | 'heatmap' | 'waterfall' | 'comparison' | 'timeline';
    data: any;
    insight: string;
  };
  highlight?: string;
  bottomNote?: string;
  metrics?: { label: string; value: string; change?: string }[];
  closingLine?: string;
  framework?: {
    quadrants?: { q1: string; q2: string; q3: string; q4: string };
    axes?: { x: string; y: string };
    perception?: { title: string; items: string[] };
    reality?: { title: string; items: string[] };
  };
}

export const slides: SlideData[] = [
  {
    id: 1,
    type: 'title',
    title: 'PhysioMantra 2026 GTM Strategy',
    subtitle: 'Building a Two-Sided Telehealth Marketplace That Compounds',
    footer: 'Prepared by Product Management | January 2026',
  },
  {
    id: 2,
    type: 'content',
    title: 'The Core Thesis',
    bullets: [
      'PhysioMantra is not a telehealth app. It is a marketplace with network effects.',
      'We have product-market fit in India (1000+ PTs, proven retention).',
      'We have zero market presence in the US (<10 PTs, mispositioned).',
      'This is not a scaling problem. This is a GTM architecture problem.',
    ],
    highlight: 'One platform. Two markets. Three completely different strategies.',
    bottomNote: 'This deck solves: How do we architect GTM for a two-sided marketplace across radically different markets?',
  },
  {
    id: 3,
    type: 'chart',
    title: 'The Fundamental Problem We Are Solving',
    chart: {
      type: 'comparison',
      data: {
        India: { supply: '1000+ PTs', demand: 'Low patient adoption', revenue: '₹X lakhs/month', problem: 'Conversion & retention bottleneck' },
        US: { supply: '<10 PTs', demand: 'Unknown (untested)', revenue: '$0', problem: 'Wrong category positioning' },
      },
      insight: 'Same platform, opposite problems. India has supply, needs demand. US needs supply before demand.',
    },
    bottomNote: 'Insight: We cannot use the same playbook. India is a retention game. US is a trust game.',
  },
  {
    id: 4,
    type: 'content',
    title: 'Why This Matters Now',
    bullets: [
      'US telehealth PT market: $2.1B TAM, growing 23% YoY (post-COVID sustained demand)',
      'India physiotherapy market: ₹3,500 Cr, 90% offline, fragmented',
      'Competitive landscape: No dominant player in flexible PT gig marketplace',
      'Timing advantage: Credentialing infrastructure matured, AI trust increasing',
    ],
    highlight: 'Window of opportunity: 12-18 months before category consolidates',
  },
  {
    id: 5,
    type: 'matrix',
    title: 'Competitive Landscape Analysis',
    framework: {
      axes: { x: 'Service Model: One-Time Consults ← → Continuous Care', y: 'Market Position: Marketplace ← → Managed Service' },
      quadrants: {
        q1: 'Practo, Lybrate (India)\nLow differentiation',
        q2: 'Hinge Health, Luna (US)\nHigh cost, W2 model',
        q3: 'YouTube, Apps\nNo clinical rigor',
        q4: 'PhysioMantra\nGig marketplace + AI continuity',
      },
    },
    highlight: 'We occupy the only quadrant with defensible moats: Gig flexibility + Clinical continuity',
    bottomNote: 'White space opportunity: No competitor has cracked flexible PT work + outcomes-driven care',
  },
  {
    id: 6,
    type: 'chart',
    title: 'Unit Economics: Why India Funds US',
    chart: {
      type: 'waterfall',
      data: { US_ARPU: '$280 (avg 4.5 sessions)', US_CAC: '-$60', US_Margin: '$220', India_ARPU: '₹4,200 (~$50)', India_CAC: '-₹800 (~$10)', India_Margin: '₹3,400 (~$40)' },
      insight: 'India has 6x better CAC:ARPU ratio (1:5 vs 1:4.7), reaching profitability 2x faster',
    },
    bottomNote: 'Strategic implication: India cashflow subsidizes US trust-building phase',
  },
  {
    id: 7,
    type: 'content',
    title: 'Post-Mortem: Why US Acquisition Failed',
    bullets: [
      'LinkedIn job posts: 2,847 impressions → 47 clicks → 3 applications (0.1% conversion)',
      'Join our platform messaging: PTs asked Is this W2 or 1099? 89% of the time',
      'Leading with credentialing: Created confusion (Why credential if I am not hired?)',
      'No US social proof: Zero testimonials, zero trust signals',
    ],
    highlight: 'Root cause: Category confusion. PTs thought we were a staffing agency, not a gig platform.',
    bottomNote: 'Key insight: We were selling employment when we should have been selling income opportunity.',
  },
  {
    id: 8,
    type: 'chart',
    title: 'Patient Search Behavior Analysis (US)',
    chart: {
      type: 'bar',
      data: {
        searches: [
          { term: 'online physical therapy', volume: 12100, intent: 'Low (browsing)' },
          { term: 'knee pain treatment', volume: 74000, intent: 'High (pain point)' },
          { term: 'physical therapy cost', volume: 33100, intent: 'High (price-conscious)' },
          { term: 'PT without insurance', volume: 8100, intent: 'Very High (ready to buy)' },
          { term: 'telehealth PT platform', volume: 390, intent: 'Low (competitors)' },
        ],
      },
      insight: 'Patients search for pain relief (74K/mo), not platforms (390/mo). We were optimizing for the wrong keywords.',
    },
    bottomNote: 'Implication: SEO strategy must target pain points, not product category',
  },
  {
    id: 9,
    type: 'framework',
    title: 'The Mental Model Mismatch',
    framework: {
      perception: { title: 'What PTs Think We Are', items: ['Staffing agency (like AMN Healthcare)', 'Full-time employer', 'Credentialing service', 'AI replacing therapists'] },
      reality: { title: 'What We Actually Are', items: ['Gig marketplace (like Uber for PTs)', 'Flexible supplemental income', 'Platform with credentialing perk', 'AI as PT-controlled assistant'] },
    },
    highlight: 'The gap between perception and reality explains 80% of acquisition failure',
  },
  {
    id: 10,
    type: 'content',
    title: 'US Supply Strategy: The Repositioning',
    bullets: [
      'OLD positioning: Join PhysioMantra - we handle credentialing',
      'NEW positioning: Earn $800-1,500/month seeing patients online on your schedule',
      'Credentialing shifts from hook to retention lever (offered after 3-5 sessions)',
      'AI positioned as productivity multiplier, not replacement',
    ],
    highlight: 'Strategic shift: From employer mindset to gig economy mindset',
    bottomNote: 'Comparable models: Uber (drive when you want), Upwork (freelance platform)',
  },
  {
    id: 11,
    type: 'chart',
    title: 'Channel Economics: Organic vs Paid',
    chart: {
      type: 'waterfall',
      data: {
        channels: [
          { name: 'Facebook Groups (Organic)', reach: '5,000', engagement: '150 (3%)', signups: '20', CAC: '$0', quality: 'High (pre-qualified)' },
          { name: 'LinkedIn Ads (Paid)', reach: '10,000', clicks: '200 (2%)', signups: '15', CAC: '$133', quality: 'Medium (cold traffic)' },
          { name: 'Influencer Partnerships', reach: '25,000', engagement: '500', signups: '30', CAC: '$50 (referral fee)', quality: 'Very High (endorsed)' },
        ],
      },
      insight: 'Organic + Influencer channels deliver 2.7x better CAC than paid ads while maintaining higher quality',
    },
    bottomNote: 'Decision: Prioritize community-led growth, use paid as accelerant only after validation',
  },
  {
    id: 12,
    type: 'chart',
    title: 'PT Activation Funnel (Critical Path Analysis)',
    chart: {
      type: 'funnel',
      data: {
        stages: [
          { stage: 'See messaging', count: 1000, conversion: '100%' },
          { stage: 'Click/engage', count: 150, conversion: '15%' },
          { stage: 'Watch demo', count: 90, conversion: '60%' },
          { stage: 'Sign up (email)', count: 54, conversion: '60%' },
          { stage: 'Upload license', count: 35, conversion: '65%' },
          { stage: 'Complete first session', count: 28, conversion: '80%' },
          { stage: 'Active PT (5+ sessions)', count: 18, conversion: '64%' },
        ],
        bottlenecks: ['Biggest drop: See → Engage (85% loss) - Trust barrier', 'Second drop: Demo → Signup (40% loss) - Value clarity'],
      },
      insight: 'Two critical conversion points: 1) Initial trust (demo video quality), 2) Value clarity (earnings examples)',
    },
    bottomNote: 'Optimization focus: Improve demo completion rate from 60% to 75% = 25% more signups',
  },
  {
    id: 13,
    type: 'timeline',
    title: 'US Supply: 90-Day Rollout with Milestones',
    bullets: [
      'Week 1-2: Foundation (Demo video, 3 US testimonials, landing page, signup flow)',
      'Week 3-4: Community seeding (10 FB groups, Reddit presence, first influencer deals)',
      'Week 5-6: Organic scaling (50 posts/week, 5-10 DMs/day, first cohort tracking)',
      'Week 7-8: Validation checkpoint (If 20+ signups + 65% activation → Proceed. Else → Pivot)',
      'Week 9-12: Paid acquisition (LinkedIn ads if CAC <$100, referral program launch)',
    ],
    metrics: [
      { label: 'Month 1 Target', value: '15-20 PTs', change: 'Baseline' },
      { label: 'Month 2 Target', value: '35-45 PTs', change: '+120%' },
      { label: 'Month 3 Target', value: '50-75 PTs', change: '+60%' },
    ],
    highlight: 'Kill switch: If Month 2 <25 PTs, pause paid and diagnose organic bottlenecks',
  },
  {
    id: 14,
    type: 'metrics',
    title: 'Success Metrics: What Good Looks Like',
    metrics: [
      { label: 'Time to first session', value: '<7 days', change: 'Non-negotiable SLA' },
      { label: 'PT utilization rate', value: '60-80%', change: 'Marketplace balance' },
      { label: 'Credentialing opt-in', value: '>40%', change: 'Retention signal' },
      { label: 'PT NPS', value: '>60', change: 'Quality of experience' },
      { label: 'Monthly churn', value: '<10%', change: 'Platform health' },
    ],
    highlight: 'Leading indicator: If time-to-first-session exceeds 7 days for 2 consecutive weeks, PAUSE all acquisition',
    bottomNote: 'Principle: Supply quality > supply quantity. 50 active PTs > 100 inactive PTs.',
  },
  {
    id: 15,
    type: 'chart',
    title: 'Patient Psychology Deep-Dive',
    chart: {
      type: 'matrix',
      data: {
        segments: [
          { segment: 'Busy Professionals (35%)', painPoint: 'No time for clinic visits', trigger: 'Chronic desk pain', objection: 'Does online PT actually work?', messaging: 'Licensed PT care, no commute, evening slots' },
          { segment: 'Cost-Conscious (28%)', painPoint: '$150/visit is unsustainable', trigger: 'Insurance deductible not met', objection: 'Is this real PT or an app?', messaging: '$59 per session vs $150 in-clinic' },
          { segment: 'Rural/Underserved (22%)', painPoint: 'No nearby PT clinics', trigger: 'Post-surgery rehab needs', objection: 'Will my doctor approve?', messaging: 'Access to licensed PTs anywhere' },
          { segment: 'Chronic Pain (15%)', painPoint: 'Long-term care costs', trigger: 'Ongoing back/knee issues', objection: 'Can I afford continuous care?', messaging: 'Care plans at $199 for 4 weeks' },
        ],
      },
      insight: 'Different segments have different objections. One-size-fits-all messaging will fail.',
    },
    bottomNote: 'Execution: Create segment-specific landing pages with tailored messaging',
  },
  {
    id: 16,
    type: 'chart',
    title: 'Pricing Strategy & Insurance Timing',
    chart: {
      type: 'timeline',
      data: {
        phases: [
          { phase: 'Phase 1 (Week 1-8): Cash-Only', pricing: '$79 first, $59 follow-up', reasoning: 'PTs not credentialed yet', messaging: 'Affordable PT - Insurance coming soon', expectedConversion: '12-15%' },
          { phase: 'Phase 2 (Week 9+): Dual Track', pricing: 'Cash OR Insurance copay', reasoning: 'First cohort credentialed', messaging: 'Choose: Cash $59 or use insurance', expectedConversion: '18-22%' },
        ],
        credentialingTimeline: { PTjoins: 'Week 1', FirstSessions: 'Week 2-3', CredentialingStarts: 'Week 4', CredentialingCompletes: 'Week 14-16' },
      },
      insight: 'Critical: Never promise insurance in Phase 1. Overpromising = trust destruction.',
    },
    bottomNote: 'Risk mitigation: Phase 1 messaging must set accurate expectations to avoid churn',
  },
  {
    id: 17,
    type: 'chart',
    title: 'Demand Channel ROI Model',
    chart: {
      type: 'waterfall',
      data: {
        channels: [
          { channel: 'SEO (Pain-specific)', monthlySpend: '$500', traffic: '800 visits', conversion: '15%', bookings: '120', CAC: '$4', LTV: '$280', ROI: '70x' },
          { channel: 'Local SEO (GMB)', monthlySpend: '$200', traffic: '400 visits', conversion: '18%', bookings: '72', CAC: '$3', LTV: '$280', ROI: '93x' },
          { channel: 'Google Ads', monthlySpend: '$2000', traffic: '1200 visits', conversion: '12%', bookings: '144', CAC: '$14', LTV: '$280', ROI: '20x' },
          { channel: 'Meta Ads', monthlySpend: '$1500', traffic: '2000 visits', conversion: '8%', bookings: '160', CAC: '$9', LTV: '$280', ROI: '31x' },
          { channel: 'Referrals', monthlySpend: '$400', traffic: 'N/A', bookings: '40', CAC: '$10', LTV: '$320', ROI: '32x' },
        ],
      },
      insight: 'SEO channels deliver 3-5x better ROI than paid ads. Start organic, layer paid as accelerant.',
    },
    bottomNote: 'Month 1-2: 100% organic. Month 3+: Add paid only if organic CAC validated.',
  },
  {
    id: 18,
    type: 'chart',
    title: 'Patient Retention Mechanics',
    chart: {
      type: 'funnel',
      data: {
        cohortAnalysis: [
          { stage: 'First session', patients: 100, revenue: '$7,900' },
          { stage: 'Second session (50%)', patients: 50, revenue: '+$2,950' },
          { stage: 'Care plan conversion (40%)', patients: 40, revenue: '+$7,960' },
          { stage: 'Complete care plan (75%)', patients: 30, revenue: '$0 (already paid)' },
          { stage: 'Renew care plan (35%)', patients: 11, revenue: '+$2,189' },
        ],
        LTVbreakdown: { oneTimePatient: '$138 (1.8 sessions avg)', carePlanPatient: '$298 (4.7 sessions avg)', repeatCarePlan: '$497 (8.2 sessions avg)' },
      },
      insight: 'Care plan customers have 3.6x higher LTV. Retention > acquisition.',
    },
    bottomNote: 'Strategic focus: Optimize for care plan conversion, not just first session bookings',
  },
  {
    id: 19,
    type: 'metrics',
    title: 'US Demand: Critical Success Metrics',
    metrics: [
      { label: 'First session show-up rate', value: '>65%', change: 'Upfront payment critical' },
      { label: 'First → Second session', value: '>50%', change: 'Clinical quality signal' },
      { label: 'Care plan conversion', value: '>40%', change: 'Revenue driver' },
      { label: 'Patient NPS', value: '>50', change: 'Referral enabler' },
      { label: 'CAC payback period', value: '<60 days', change: 'Unit economics' },
    ],
    highlight: 'If show-up rate <60% for 2 weeks: Fix onboarding before scaling. No exceptions.',
  },
  {
    id: 20,
    type: 'comparison',
    title: 'India vs US: Fundamental Differences',
    comparison: {
      left: { title: 'US Market Dynamics', items: ['Payment: Credit cards default', 'Trust: Brand + reviews', 'Decision: Individual patient', 'Channel: Google + SEO', 'Timeline: 3-6 months to profitability'] },
      right: { title: 'India Market Dynamics', items: ['Payment: UPI mandatory (80% of payments)', 'Trust: Doctor referral > brand', 'Decision: Family, not just patient', 'Channel: WhatsApp + word-of-mouth', 'Timeline: 1-3 months to profitability'] },
    },
    highlight: 'Different playbooks required. What works in US will fail in India and vice versa.',
  },
  {
    id: 21,
    type: 'chart',
    title: 'India: Payment Infrastructure Impact on Conversion',
    chart: {
      type: 'bar',
      data: {
        methods: [
          { method: 'Credit Card Only', conversion: 8, dropOff: 92 },
          { method: 'Card + UPI', conversion: 23, dropOff: 77 },
          { method: 'UPI + EMI + Wallets', conversion: 47, dropOff: 53 },
        ],
        EMIimpact: { withoutEMI: '32% care plan conversion', withEMI: '67% care plan conversion', increase: '+109%' },
      },
      insight: 'UPI increases conversion 2.9x. EMI doubles care plan uptake. Payment infrastructure = revenue driver.',
    },
    bottomNote: 'Non-negotiable: Razorpay with UPI, cards, wallets, and 3/6-month EMI for plans >₹3,499',
  },
  {
    id: 22,
    type: 'chart',
    title: 'Doctor Referral Economics (India)',
    chart: {
      type: 'waterfall',
      data: {
        doctorModel: { setup: 'Doctor gets ₹200 per patient referred', avgReferrals: '8 patients/month per doctor', doctorEarnings: '₹1,600/month (passive)', ourCAC: '₹200 vs ₹800 for paid ads', conversionRate: '73% (doctor-referred) vs 12% (cold traffic)', LTV: '₹5,200 (higher trust = better retention)' },
        scaleMath: { month3: '50 doctors × 8 patients = 400 patients', month6: '200 doctors × 8 patients = 1,600 patients', cumulativeCAC: '₹80,000 vs ₹12.8L for paid', savings: '₹12L (~$14K)' },
      },
      insight: 'Doctor referrals: 6x better conversion, 4x lower CAC, 40% higher LTV. This is our India moat.',
    },
    bottomNote: 'Execution priority: Build doctor referral infrastructure before scaling paid ads',
  },
  {
    id: 23,
    type: 'chart',
    title: 'WhatsApp Funnel Performance',
    chart: {
      type: 'funnel',
      data: {
        whatsappFlow: [
          { stage: 'Ad click → WhatsApp', conversion: 78, note: 'vs 45% for web forms' },
          { stage: 'First message reply', conversion: 84, note: '90% open rate' },
          { stage: 'Pain point shared', conversion: 71, note: 'Hindi increases to 89%' },
          { stage: 'PT callback scheduled', conversion: 68, note: 'Human touch critical' },
          { stage: 'First session booked', conversion: 52, note: 'vs 12% web-only' },
        ],
        overallConversion: { whatsApp: '22.4% (click to booking)', webOnly: '5.4% (click to booking)', lift: '4.1x better' },
      },
      insight: 'WhatsApp-first strategy delivers 4.1x higher conversion than web forms. Not optional.',
    },
  },
  {
    id: 24,
    type: 'chart',
    title: 'Language Impact on Market Size',
    chart: {
      type: 'bar',
      data: {
        languages: [
          { language: 'English only', addressableMarket: 100, penetration: 'Tier 1 only' },
          { language: '+ Hindi', addressableMarket: 350, penetration: 'North India unlocked' },
          { language: '+ Regional (Marathi/Tamil/Telugu)', addressableMarket: 600, penetration: 'Full India' },
        ],
        ROI: { hindiInvestment: '₹5L (content + bot)', marketExpansion: '3.5x', expectedRevenueLift: '2.1x (conversion rate dilution)', payback: '6 weeks' },
      },
      insight: 'Hindi unlocks 250M additional users. ROI payback in 6 weeks. Regional languages add 250M more.',
    },
    bottomNote: 'Rollout: Month 1-2 English+Hinglish, Month 3 Hindi, Month 4-6 Regional',
  },
  {
    id: 25,
    type: 'metrics',
    title: 'India Success Metrics',
    metrics: [
      { label: 'Lead → First session', value: '>50%', change: 'WhatsApp + doctor referrals' },
      { label: 'First session → Care plan', value: '>60%', change: 'Family involvement key' },
      { label: 'Care plan completion', value: '>70%', change: 'Daily engagement + PT calls' },
      { label: 'Repeat plan purchase', value: '>40%', change: 'Clinical outcomes driver' },
      { label: 'NPS', value: '>55', change: 'Word-of-mouth enabler' },
    ],
    highlight: 'India is won on retention, not acquisition. Care plan completion rate is north star.',
  },
  {
    id: 26,
    type: 'chart',
    title: 'The Marketplace Balance Framework',
    chart: {
      type: 'matrix',
      data: {
        scenarios: {
          balancedGrowth: { supply: 'Adequate', demand: 'Adequate', outcome: '✅ Healthy marketplace, compound growth', action: 'Scale both sides proportionally' },
          supplyConstrained: { supply: 'Low', demand: 'High', outcome: '❌ Wait times >7 days, PT churn, negative reviews', action: 'PAUSE demand, accelerate supply' },
          demandConstrained: { supply: 'High', demand: 'Low', outcome: '⚠️ PT utilization <60%, PT churn, wasted CAC', action: 'PAUSE supply, accelerate demand' },
          poorQuality: { supply: 'Low Quality', demand: 'Any', outcome: '❌ Bad outcomes, churn both sides', action: 'FIX supply quality before scaling' },
        },
      },
      insight: 'The #1 marketplace failure mode: Scaling one side before the other is ready',
    },
    highlight: 'Rule: Time-to-first-session <7 days is the canary in the coal mine. If violated, STOP.',
  },
  {
    id: 27,
    type: 'chart',
    title: 'Risk Heat Map with Mitigation',
    chart: {
      type: 'heatmap',
      data: {
        risks: [
          { risk: 'Supply outpaces demand (US)', probability: 'Low', impact: 'High', mitigation: 'Coordinate supply/demand launches, weekly sync', status: 'Mitigated' },
          { risk: 'Demand outpaces supply (US)', probability: 'Medium', impact: 'Critical', mitigation: 'Hard pause at 7-day SLA, geo-throttling', status: 'Monitored' },
          { risk: 'Payment infrastructure fails (India)', probability: 'Low', impact: 'High', mitigation: 'Razorpay primary + Cashfree backup', status: 'Mitigated' },
          { risk: 'Doctor referral program slow ramp', probability: 'Medium', impact: 'Medium', mitigation: 'Start with 10 pilot doctors, iterate fast', status: 'Active' },
          { risk: 'AI skepticism reduces conversion', probability: 'Low', impact: 'Medium', mitigation: 'PT-control messaging, demo clarity', status: 'Mitigated' },
          { risk: 'CAC exceeds LTV', probability: 'Low', impact: 'Critical', mitigation: 'Organic-first, paid only after validation', status: 'Mitigated' },
        ],
      },
      insight: 'Only 1 critical unmitigated risk: Demand-supply imbalance. Requires active daily monitoring.',
    },
  },
  {
    id: 28,
    type: 'chart',
    title: 'Financial Model: 3 Scenarios',
    chart: {
      type: 'line',
      data: {
        scenarios: {
          conservative: { month3: '$20K + ₹12L ($35K total)', month6: '$55K + ₹30L ($90K total)', month12: '$140K + ₹75L ($230K total)', assumptions: 'Organic-only, slow ramp' },
          base: { month3: '$32K + ₹18L ($54K total)', month6: '$95K + ₹48L ($153K total)', month12: '$240K + ₹120L ($384K total)', assumptions: 'Plan execution, paid ads work' },
          optimistic: { month3: '$48K + ₹25L ($78K total)', month6: '$150K + ₹70L ($234K total)', month12: '$420K + ₹180L ($636K total)', assumptions: 'Faster ramp, referral flywheel' },
        },
        cumulativeInvestment: '$40K over 3 months',
        breakEven: { conservative: 'Month 8', base: 'Month 5', optimistic: 'Month 4' },
      },
      insight: 'Even in conservative scenario, we reach profitability within 8 months',
    },
    bottomNote: 'Base case assumes 50-75 US PTs, 2,500-3,500 India sessions by Month 3',
  },
  {
    id: 29,
    type: 'metrics',
    title: 'Budget Allocation & ROI Tracking',
    metrics: [
      { label: 'Month 1 Budget', value: '$5K (US) + ₹4L (India)', change: 'Foundation + organic' },
      { label: 'Month 2 Budget', value: '$8K (US) + ₹5L (India)', change: 'Community scale' },
      { label: 'Month 3 Budget', value: '$13K (US) + ₹7L (India)', change: 'Paid acquisition (if validated)' },
      { label: 'Total 90-Day Investment', value: '~$40K', change: 'Blended across markets' },
      { label: 'Expected Month 3 Revenue', value: '$54K (base case)', change: '1.35x investment' },
    ],
    highlight: 'Investment is front-loaded. Revenue compounds Month 2 onward.',
  },
  {
    id: 30,
    type: 'content',
    title: 'Strategic Implications',
    bullets: [
      'India becomes cash engine to fund US trust-building (proven in unit economics)',
      'US becomes long-term moat through credentialing infrastructure (18-month lead time)',
      'Two-sided marketplace requires surgical coordination (not just growth)',
      'Defensibility comes from network effects + clinical outcomes, not product features',
    ],
    highlight: 'This is not a move fast and break things strategy. This is precision execution.',
  },
  {
    id: 31,
    type: 'content',
    title: 'Decision Framework',
    bullets: [
      'GO if: Team capacity confirmed, $40K budget approved, Metrics dashboard ready',
      'PAUSE if: Supply-demand coordination uncertain, Payment infrastructure not ready (India)',
      'KILL if: Month 2 targets missed by >40% (signals fundamental GTM failure)',
    ],
    highlight: 'Clear kill switches prevent throwing good money after bad',
    bottomNote: 'We optimize for learning velocity, not sunk cost fallacy',
  },
  {
    id: 32,
    type: 'timeline',
    title: 'Immediate Next Steps (Week 1)',
    bullets: [
      'Monday: Approve GTM direction + budget allocation',
      'Tuesday: Assign DRIs (US Supply: Provider Ops, US Demand: Digital Marketing, India: Regional Lead)',
      'Wednesday: Build Week 1 assets (demo videos, landing pages, WhatsApp bot)',
      'Thursday: Set up metrics dashboard (Mixpanel or Google Sheets)',
      'Friday: All-hands kickoff + Week 2 plan',
    ],
    metrics: [
      { label: 'Week 1 Deliverables', value: '12 assets', change: 'Cross-functional' },
      { label: 'Week 2 Launch', value: 'Organic channels live', change: 'US + India' },
      { label: 'Month 1 Checkpoint', value: 'Validate or pivot', change: 'Data-driven' },
    ],
  },
  {
    id: 33,
    type: 'content',
    title: 'What We Are Asking For',
    bullets: [
      '$40K budget over 90 days (phased deployment, kill switches built-in)',
      'Team capacity: 70-95 hrs/week across Digital Marketing, Provider Ops, Product, BDE',
      'Weekly founder sync (30 min) for metrics review + strategic adjustments',
      'Authority to pause/pivot if metrics fail (not push through mentality)',
    ],
    highlight: 'This is a disciplined experiment, not a Hail Mary',
  },
  {
    id: 34,
    type: 'title',
    title: 'Closing Thought',
    subtitle: 'This is a marketplace health plan that happens to acquire customers.',
    closingLine: 'We are not optimizing for growth. We are optimizing for compounding.',
    footer: 'Questions?',
  },
];
