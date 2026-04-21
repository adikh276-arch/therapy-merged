'use client';
import { useTranslation } from 'react-i18next';

import { LearnModule } from '@/components/LearnModule';
import { Shield, Target, MapPin, AlertCircle } from 'lucide-react';

export default function EmergencyFundLearn() {
  const { t } = useTranslation();
  return (
    <LearnModule
      title={t("Emergency Fund")}
      subtitle={t("Your financial airbag")}
      readTime={t("5 min")}
      category={t("Savings")}
      introduction={t("An emergency fund is not optional'it's essential. It's the difference between a problem and a catastrophe. Think of it as your financial airbag.")}
      sections={[
        { 
          icon: Shield, 
          heading: t("What Counts as an Emergency?"), 
          content: [
            { title: t("GÂ£Ã´ Medical emergency"), description: 'Surgery, hospitalization, or unexpected health crisis' }, 
            { title: t("GÂ£Ã´ Job loss"), description: 'Unexpected unemployment while you search for new work' }, 
            { title: t("GÂ£Ã´ Major repairs"), description: 'Home foundation, car breakdown, plumbing failure' }, 
            { title: t("GÂ£Ã¹ NOT an emergency"), description: 'Vacation, sale shopping, wanting a new gadget or upgrade' }
          ], 
          variant: 'cards' 
        },
        { 
          icon: Target, 
          heading: t("How Much to Save"), 
          content: [
            { title: t("Minimum (3 months)"), description: 'Basic safety net. Covers most medical emergencies and short-term job gaps.' }, 
            { title: t("Recommended (6 months)"), description: 'The sweet spot. Covers job loss, major repairs, and family emergencies with breathing room.' }, 
            { title: t("Conservative (12 months)"), description: 'For freelancers, entrepreneurs, or variable income earners. Peace of mind at maximum.' }
          ] 
        },
        { 
          icon: MapPin, 
          heading: t("Where to Keep It"), 
          content: t("Keep 3 months in a regular savings account (fully liquid). Place the rest in a high-yield savings account or ladder it across Fixed Deposits (90-day, 180-day, 1-year) for better returns while maintaining access when needed.") 
        },
        { 
          icon: AlertCircle, 
          heading: t("The True Cost of No Emergency Fund"), 
          content: t("A person had no emergency fund and hit an unexpected bill of 200,000 units. They borrowed on a credit card at 18% interest. After 3 years of minimum payments, the total cost was 360,000 units. Compare: 3,000 units/month saved for 5 years = 180,000 unit buffer - enough to avoid the entire interest trap.") 
        },
      ]}
      actionSteps={[
        { number: '01', text: t("Calculate your essential monthly expenses (rent + food + utilities + transport + insurance + minimum EMIs)") }, 
        { number: '02', text: t("Multiply by 6 to get your target number") }, 
        { number: '03', text: t("Check how much you have today - that's your gap") }, 
        { number: '04', text: t("Open a separate savings account labeled \"Emergency Fund - Do Not Touch\"") }, 
        { number: '05', text: t("Set up a monthly auto-transfer, even if it's just a small amount to start") }
      ]}
      keyTakeaways={[
        'Emergency fund is the foundation of ALL financial planning', 
        '6 months is the recommended target - start with 3', 
        'Keep it completely separate from your spending account', 
        'Never use it for non-emergencies, even tempting ones', 
        'Update your target every 6 months as expenses change'
      ]}
      nextSteps={[
        { label: t("Emergency Fund Tool"), href: '/emergency-fund' }, 
        { label: t("Savings Check-up"), href: '/check-ins/savings-check-up' }, 
        { label: t("Investing Basics"), href: '/learn/investing-basics' }
      ]}
    />
  );
}