'use client';
import { useTranslation } from 'react-i18next';

import { LearnModule } from '@/components/LearnModule';
import { Clock, Target, ListChecks, Lightbulb } from 'lucide-react';

export default function FinancialGoals() {
  const { t } = useTranslation();
  return (
    <LearnModule
      title={t("Financial Goals")}
      subtitle={t("Turn dreams into numbers")}
      readTime={t("6 min")}
      category={t("Planning")}
      introduction={t("Goals give your money purpose. Without them, you're just saving. With them, you're building the life you want. Goals transform abstract numbers into tangible dreams.")}
      sections={[
        { 
          icon: Clock, 
          heading: t("Types of Financial Goals"), 
          content: [
            { title: t("Short-term (< 1 year)"), description: 'Emergency fund, vacation, gadget, small repairs. Fast wins that build momentum.' }, 
            { title: t("Medium-term (1-5 years)"), description: 'Vehicle purchase, celebrations, home renovation, education, business startup.' }, 
            { title: t("Long-term (5+ years)"), description: 'Home purchase, retirement planning, children\'s education, wealth creation.' }
          ] 
        },
        { 
          icon: Target, 
          heading: t("The SMART Framework"), 
          content: [
            { title: t("Specific"), description: 'Not "save money" ¥Ã† "Save 5,000 for home down payment by year-end"' }, 
            { title: t("Measurable"), description: 'Include exact amount. Track progress monthly. Update status to stay accountable.' }, 
            { title: t("Achievable"), description: 'Consider current income. Be ambitious but realistic - stretch without breaking.' }, 
            { title: t("Time-bound"), description: 'Specific deadline creates urgency and helps you calculate exactly how much to save monthly.' }
          ], 
          variant: 'cards' 
        },
        { 
          icon: ListChecks, 
          heading: t("Goal Priority Framework"), 
          content: [
            'High Priority: Emergency fund, debt repayment, retirement - these are non-negotiable foundations', 
            'Medium Priority: Home purchase, children\'s education, major life events', 
            'Low Priority: Luxury items, entertainment upgrades, nice-to-haves', 
            'Sequential goals work better than trying to fund everything simultaneously'
          ] 
        },
        { 
          icon: Lightbulb, 
          heading: t("Real-World: Cascading Goals"), 
          content: t("A person set sequential goals: Year 1 - Emergency fund of 6 months. Year 2 - a vehicle. Year 3-5 - a major celebration. Year 5+ - Invest for retirement. Each achievement built confidence and momentum, and they never felt overwhelmed because they only focused on one goal at a time.") 
        },
      ]}
      actionSteps={[
        { number: '01', text: t("List 5-10 things you want in the next 10 years (dream freely!)") }, 
        { number: '02', text: t("Apply the SMART framework to each goal") }, 
        { number: '03', text: t("Prioritize: pick your top 2-3 to focus on now") }, 
        { number: '04', text: t("Calculate monthly savings needed: Target ++ Months = Your number") }, 
        { number: '05', text: t("Use the Goal Planner to track them with progress bars") }
      ]}
      keyTakeaways={[
        'Goals transform money from abstract to purposeful', 
        'SMART framework makes goals actually achievable', 
        'Prioritize ruthlessly - focus on fewer, better goals', 
        'Track progress monthly (what you measure, you improve)', 
        'Celebrate every milestone - it fuels motivation'
      ]}
      nextSteps={[
        { label: t("Goal Planner Tool"), href: '/goal-planner' }, 
        { label: t("Budget Planner"), href: '/budget-planner' }, 
        { label: t("Saving Habits"), href: '/learn/saving-habits' }
      ]}
    />
  );
}