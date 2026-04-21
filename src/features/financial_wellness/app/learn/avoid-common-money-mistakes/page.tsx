'use client';
import { useTranslation } from 'react-i18next';

import { LearnModule } from '@/components/LearnModule';
import { AlertCircle } from 'lucide-react';

export default function AvoidMoneyMistakes() {
  const { t } = useTranslation();
  return (
    <LearnModule
      title={t("Avoid Common Money Mistakes")}
      subtitle={t("Learning from others' mistakes is cheaper")}
      readTime={t("10 min")}
      category={t("Fundamentals")}
      introduction={t("Learning from others' mistakes is cheaper than learning from your own. Here are the 12 biggest money mistakes people make - and exactly how to avoid them.")}
      sections={[
        { 
          icon: AlertCircle, 
          heading: t("The Big 12 Money Mistakes"), 
          content: [
            { title: t("1. No Emergency Fund"), description: 'Any unexpected expense becomes a debt crisis. Build 6 months of essential expenses as your first priority.' },
            { title: t("2. Lifestyle Creep"), description: 'Income doubles, expenses double. When you get a raise: 50% to savings, 50% to lifestyle. Never spend 100%.' },
            { title: t("3. Minimum Debt Payments"), description: 'Credit card debt at 18% with minimum payments can take 8 years and double in total cost due to interest. Pay 3x minimum to escape the trap.' },
            { title: t("4. No Budget or Tracking"), description: 'Average person loses 15-20% to untracked spending. 30 days of tracking = eye-opening revelations.' },
            { title: t("5. High-Interest Debt for Wants"), description: 'Personal loan at 15% for a vacation means paying 25% more for an experience. Save first, then spend.' },
            { title: t("6. No Insurance Coverage"), description: 'Major medical bills with no health insurance can lead to financial disaster. Protection is essential.' },
            { title: t("7. Investing Without Understanding"), description: 'Blind tips from friends leads to panic selling and losses. Start with diversified index funds you understand.' },
            { title: t("8. No Financial Goals"), description: 'Saving without purpose = spending it. Goals protect your savings from yourself.' },
            { title: t("9. Impulse Spending"), description: 'Small regular impulse buys wasted monthly add up to massive lost wealth over 20 years with investing.' },
            { title: t("10. Not Reviewing & Adjusting"), description: 'Set budget, never look again. Life changes; your plan must change with it. Monthly 15-min review changes everything.' },
            { title: t("11. Comparing to Others"), description: 'You see their car, not their debt. Their vacation, not their stress. Your race, your pace.' },
            { title: t("12. Delaying Financial Decisions"), description: 'Starting at 25 vs 35: same money, 60% less wealth at retirement. Imperfect action beats perfect inaction.' },
          ] 
        },
      ]}
      actionSteps={[
        { number: '01', text: t("Identify which 3 mistakes currently apply to your life (be brutally honest)") }, 
        { number: '02', text: t("Choose 1 to fix this month - just one, done properly") }, 
        { number: '03', text: t("Make 1 concrete, specific change about that mistake this week") }, 
        { number: '04', text: t("Review in 30 days and celebrate the improvement") }, 
        { number: '05', text: t("Return to this list quarterly - new stages of life bring new mistakes to avoid") }
      ]}
      keyTakeaways={[
        'Common mistakes are avoidable with awareness and systems', 
        'Time is your most valuable financial asset - don\'t waste it', 
        'Small consistent changes compound into massive results', 
        'Focus on what you can control: savings rate, habits, awareness', 
        'Tracking your money is the single most impactful first step'
      ]}
      nextSteps={[
        { label: t("Financial Health Score"), href: '/financial-health-score' }, 
        { label: t("Budget Planner"), href: '/budget-planner' }, 
        { label: t("Emergency Fund"), href: '/emergency-fund' }
      ]}
    />
  );
}