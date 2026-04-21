'use client';
import { useTranslation } from 'react-i18next';

import { LearnModule } from '@/components/LearnModule';
import { Zap, Brain, TrendingUp, Sparkles, AlertCircle } from 'lucide-react';

export default function SavingHabits() {
  const { t } = useTranslation();
  return (
    <LearnModule
      title={t("Saving Habits")}
      subtitle={t("Build wealth one habit at a time")}
      readTime={t("6 min")}
      category={t("Savings")}
      introduction={t("Saving is a habit, not a sacrifice. The difference between those who build wealth and those who don't is often just one simple habit: paying themselves first.")}
      sections={[
        { 
          icon: Zap, 
          heading: t("Why Saving Matters"), 
          content: [
            'Builds financial security and reduces anxiety', 
            'Creates options and opportunities at every life stage', 
            'Protects against emergencies without going into debt', 
            'Enables dream-chasing: vacation, home, business', 
            'Time + consistent saving = life-changing wealth'
          ] 
        },
        { 
          icon: Brain, 
          heading: t("Pay Yourself First"), 
          content: [
            { title: t("Automate on Payday"), description: 'Set an automatic transfer the same day your salary arrives. Out of sight, out of mind.' }, 
            { title: t("Start with 10%"), description: 'Begin with 10% of income. Increase by 1% every 3 months until you hit 20%.' }, 
            { title: t("Separate Account"), description: 'Keep savings in a separate account so you\'re not tempted to spend it.' }, 
            { title: t("Link to Purpose"), description: 'Label savings with a goal (e.g., "Europe Trip 2026") to stay motivated.' }
          ], 
          variant: 'cards' 
        },
        { 
          icon: TrendingUp, 
          heading: t("The Compound Effect"), 
          content: t("500 units/month invested at 7% annual return for 20 years = over 260,000 units. You only invested 120,000 - the rest is compound returns working silently for you. Start today, not tomorrow.") 
        },
        { 
          icon: Sparkles, 
          heading: t("Three Stages of Saving"), 
          content: [
            { title: t("Stage 1: Emergency Fund (Month 1-6)"), description: 'Build 3-6 months of expenses in a liquid savings account. Goal: financial safety.' }, 
            { title: t("Stage 2: Goal Savings (Month 6-18)"), description: 'Open dedicated accounts for specific goals. Make your dreams tangible and trackable.' }, 
            { title: t("Stage 3: Wealth Building (Year 2+)"), description: 'Start systematic investments. Let compound returns do the heavy lifting over decades.' }
          ] 
        },
        { 
          icon: AlertCircle, 
          heading: t("Common Mistakes"), 
          content: [
            'Waiting for the "right amount" - start with small sums where possible', 
            'Putting savings in low-return accounts', 
            'Not having a purpose - you\'ll spend it without a goal', 
            'Dipping into emergency fund for non-emergencies', 
            'Comparing your savings to others (everyone starts somewhere)'
          ] 
        },
      ]}
      actionSteps={[
        { number: '01', text: t("Calculate 10% of your monthly income - that's your savings target") },
        { number: '02', text: t("Set up an automatic transfer on your payday date") },
        { number: '03', text: t("Open a separate savings account and name it after a goal") },
        { number: '04', text: t("Set a weekly reminder to check your balance (motivation boost!)") },
        { number: '05', text: t("Use the Emergency Fund tool to set your first savings target") },
      ]}
      keyTakeaways={[
        'Saving is a habit - automate it so it requires no willpower', 
        'Start with whatever you can, grow from there', 
        'Time and consistency beat large amounts every time', 
        'Connect savings to a purpose, your "why"', 
        'The best savings plan is one you\'ll stick with'
      ]}
      nextSteps={[
        { label: t("Emergency Fund Tool"), href: '/emergency-fund' }, 
        { label: t("Goal Planner"), href: '/goal-planner' }, 
        { label: t("Investing Basics"), href: '/learn/investing-basics' }
      ]}
    />
  );
}