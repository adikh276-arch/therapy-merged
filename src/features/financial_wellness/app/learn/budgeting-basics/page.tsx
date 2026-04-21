'use client';
import { useTranslation } from 'react-i18next';

import { LearnModule } from '@/components/LearnModule';
import { Lightbulb, PieChart, AlertCircle, Briefcase, Wrench } from 'lucide-react';

export default function BudgetingBasics() {
  const { t } = useTranslation();
  return (
    <LearnModule
      title={t("Budgeting Basics")}
      subtitle={t("Your financial foundation")}
      readTime={t("5 min")}
      category={t("Budgeting")}
      introduction={t("Budgeting is not about restriction'it's about freedom. By knowing where your money goes, you can make intentional choices and build the life you want.")}
      sections={[
        {
          icon: Lightbulb,
          heading: t("Why Budget?"),
          content: [
            'Understand your spending patterns and identify leaks',
            'Achieve financial goals faster with intentionality',
            'Reduce financial stress by knowing your numbers',
            'Build healthy money habits that compound over time',
            'Plan for unexpected expenses before they surprise you',
          ],
        },
        {
          icon: PieChart,
          heading: t("Key Concept: The 50/30/20 Rule"),
          content: [
            { title: t("50% Needs"), description: 'Housing, food, transportation, insurance - things you cannot live without' },
            { title: t("30% Wants"), description: 'Entertainment, dining out, hobbies - things that enrich life but aren\'t essential' },
            { title: t("20% Savings & Debt"), description: 'Emergency fund, investments, extra debt repayment - your future self' },
          ],
          variant: 'cards',
        },
        {
          icon: AlertCircle,
          heading: t("Common Budgeting Mistakes"),
          content: [
            'Being too rigid - life happens, build in flexibility',
            'Not tracking expenses - can\'t improve what you don\'t measure',
            'Forgetting annual/semi-annual expenses (insurance, maintenance)',
            'Not building a buffer for unexpected costs',
            'Cutting all wants - leads to burnout and failure',
          ],
        },
        {
          icon: Briefcase,
          heading: t("Real-World Example"),
          content: t("Imagine someone earns 60,000 units/month. They allocate 30,000 to Needs (50%), 18,000 to Wants (30%), and 12,000 to Savings (20%). By sticking to this for 6 months, they built a 72,000 unit emergency fund and started their first systematic investment - all on the same salary they had before budgeting."),
        },
        {
          icon: Wrench,
          heading: t("Practical Tips"),
          content: [
            'Pay yourself first: Move savings on payday before spending',
            'Build in a 5-10% miscellaneous buffer for surprise expenses',
            'Review your budget monthly, adjust quarterly',
            'Use our Budget Planner tool to automate tracking',
            'Have a "buffer month" of saved expenses to stay ahead',
          ],
        },
      ]}
      actionSteps={[
        { number: '01', text: t("List all income sources (salary, freelance, rent, etc.)") },
        { number: '02', text: t("Track every expense for the next 3 days to see where money goes") },
        { number: '03', text: t("Categorize your expenses as Needs, Wants, or Savings") },
        { number: '04', text: t("Calculate your current spending percentages") },
        { number: '05', text: t("Use our Budget Planner to create your first structured budget") },
      ]}
      keyTakeaways={[
        'A budget is a spending plan, not a punishment',
        'You need to know your numbers to control them',
        'The best budget is one you\'ll actually follow',
        'Start simple, adjust as you learn your patterns',
        '50/30/20 is a starting framework - adjust for your life',
        'Automation removes willpower from the equation',
      ]}
      nextSteps={[
        { label: t("Budget Planner Tool"), href: '/budget-planner' },
        { label: t("Saving Habits"), href: '/learn/saving-habits' },
        { label: t("Spending Style Quiz"), href: '/check-ins/spending-style-quiz' },
      ]}
    />
  );
}