'use client';
import { useTranslation } from 'react-i18next';

import { LearnModule } from '@/components/LearnModule';
import { Calendar, Target, Sun, ShieldCheck } from 'lucide-react';

export default function PlanForYourFuture() {
  const { t } = useTranslation();
  return (
    <LearnModule
      title={t("Plan for Your Future")}
      subtitle={t("Start now, retire with freedom")}
      readTime={t("9 min")}
      category={t("Long-term Planning")}
      introduction={t("The future isn't something that happens to you'it's something you build. Smart planning today means freedom, security, and peace of mind tomorrow.")}
      sections={[
        { 
          icon: Calendar, 
          heading: t("Life Stage Planning Map"), 
          content: [
            { title: t("20s - Foundation"), description: 'Build emergency fund, start SIP, avoid consumer debt, get health insurance. Time is your superpower.' }, 
            { title: t("30s - Building"), description: 'Increase investments, plan major purchases, start retirement savings seriously.' }, 
            { title: t("40s - Acceleration"), description: 'Maximum earning years. Aggressive investments, children\'s education planning, refinance debt.' }, 
            { title: t("50s - Peak"), description: 'Shift to lower-risk investments, finalize retirement number, maximize tax planning.' }, 
            { title: t("60s+ - Harvesting"), description: 'Income-generating investments, live off retirement savings, plan healthcare and legacy.' }
          ] 
        },
        { 
          icon: Target, 
          heading: t("Financial Milestones to Hit"), 
          content: [
            'By 25: Emergency fund started, no consumer debt, first SIP active', 
            'By 30: 6-month emergency fund, retirement investing at 10% of income', 
            'By 40: 3x annual salary invested, major assets acquired (home)', 
            'By 50: 6x annual salary invested, retirement date set', 
            'By 60: 8x annual salary invested, ready to transition'
          ] 
        },
        { 
          icon: Sun, 
          heading: t("Retirement Calculation"), 
          content: t("Imagine a current monthly expense of 4,000 units. In retirement (30 years later), inflation-adjusted need might be 15,000+ units/month. To sustain this, a substantial nest egg is needed. Starting early with even small monthly investments at 12% returns makes this achievable. Start now; delay costs significantly more in the long run.") 
        },
        { 
          icon: ShieldCheck, 
          heading: t("Insurance: The Foundation"), 
          content: [
            { title: t("Life Insurance"), description: 'Term insurance: targeted to replace annual income for dependents.' }, 
            { title: t("Health Insurance"), description: 'Non-negotiable for everyone. One hospitalization without it can be a financial disaster.' }, 
            { title: t("Disability Insurance"), description: 'Often overlooked. Covers 60% of income if unable to work due to accident or illness.' }
          ], 
          variant: 'cards' 
        },
      ]}
      actionSteps={[
        { number: '01', text: t("Calculate rough retirement needs: Current expenses +Ã¹ 12 +Ã¹ 30 years +Ã¹ 3 (inflation)") }, 
        { number: '02', text: t("Check insurance gaps: are you covered for health and life?") }, 
        { number: '03', text: t("List major goals with target amounts and dates") }, 
        { number: '04', text: t("Calculate monthly savings needed for each goal") }, 
        { number: '05', text: t("Create a simple written 5-year financial plan - even 1 page matters") }
      ]}
      keyTakeaways={[
        'Every decade of delay = 3x more savings needed for retirement', 
        'Start early, even imperfectly - time is your ultimate advantage', 
        'Insurance is foundation, not optional', 
        'Written plan is 42% more likely to be achieved vs mental note', 
        'Automate investments to remove emotion from the equation'
      ]}
      nextSteps={[
        { label: t("Financial Health Score"), href: '/financial-health-score' }, 
        { label: t("Investment Planner"), href: '/investment-planner' }, 
        { label: t("Goal Planner"), href: '/goal-planner' }
      ]}
    />
  );
}