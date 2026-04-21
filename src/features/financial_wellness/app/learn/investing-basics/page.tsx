'use client';
import { useTranslation } from 'react-i18next';

import { LearnModule } from '@/components/LearnModule';
import { TrendingUp, Scale, Target, Sparkles, AlertCircle } from 'lucide-react';

export default function InvestingBasics() {
  const { t } = useTranslation();
  return (
    <LearnModule
      title={t("Investing Basics")}
      subtitle={t("Put your money to work while you sleep")}
      readTime={t("8 min")}
      category={t("Investing")}
      introduction={t("Investing is not complex. It's simply putting your money to work so it grows while you sleep. Start simple, understand the basics, and let compound returns work for you.")}
      sections={[
        { 
          icon: TrendingUp, 
          heading: t("Asset Classes Explained"), 
          content: [
            { title: t("Stocks"), description: 'Ownership in companies. Highest growth potential (12-18% avg) but highest short-term volatility.' }, 
            { title: t("Mutual Funds"), description: 'Professional manager invests your money with others. Diversified, accessible with small monthly amounts.' }, 
            { title: t("Bonds & FDs"), description: 'Loans to governments or banks. Lower risk (5-8%), guaranteed returns, best for safety-first investors.' }, 
            { title: t("Gold"), description: 'Safe haven asset, hedge against inflation. No income generation but stores value over decades.' }
          ], 
          variant: 'cards' 
        },
        { 
          icon: Scale, 
          heading: t("Risk vs Return"), 
          content: t("Higher risk = higher potential returns (and losses). Young investors can afford more risk; those closer to retirement need stability. Your risk tolerance depends on three things: your age, your goals, and your income stability.") 
        },
        { 
          icon: Target, 
          heading: t("The Power of Rupee Cost Averaging (SIP)"), 
          content: t("Invest a fixed amount monthly regardless of market price. You buy more units when the market is low, fewer when high - this automatically averages your cost and removes timing risk. Investing a fixed amount monthly for just 5 years eliminates the stress of \"when to invest.\"") 
        },
        { 
          icon: Sparkles, 
          heading: t("Beginner Investment Plan"), 
          content: [
            { title: t("Months 1-3: Learn & Plan"), description: 'Understand your risk tolerance, define goals and timelines, research 2-3 mutual funds.' }, 
            { title: t("Months 4-6: Start Small"), description: 'Open a demat account. Start systematic investments with small monthly amounts.' }, 
            { title: t("Months 7+: Grow & Automate"), description: 'Increase investment as income grows. Let compound returns work. Rebalance annually.' }
          ] 
        },
        { 
          icon: AlertCircle, 
          heading: t("Common Investing Mistakes"), 
          content: [
            'Starting too late - time is your most valuable asset', 
            'Being too conservative - inflation quietly destroys savings', 
            'Trying to time the market - even experts can\'t do this consistently', 
            'No diversification - putting all money in one stock or sector', 
            'Panic selling in downturns - most people buy high, sell low', 
            'Chasing last year\'s top performers - past returns don\'t predict future'
          ] 
        },
      ]}
      actionSteps={[
        { number: '01', text: t("Assess your risk tolerance: conservative, moderate, or aggressive?") }, 
        { number: '02', text: t("Define your investment goals and time horizons") }, 
        { number: '03', text: t("Research 2-3 mutual funds in your risk category on Value Research") }, 
        { number: '04', text: t("Open a demat account on Zerodha, Groww, or your bank app") }, 
        { number: '05', text: t("Start your first investment with a small monthly amount") }
      ]}
      keyTakeaways={[
        'Investing is for everyone, not just the rich', 
        'Start early, even with tiny amounts - time beats timing', 
        'SIP removes the burden of timing the market', 
        'Diversification is your safety net - don\'t skip it', 
        'Stay invested through downturns; market crashes are recoveries in disguise', 
        'Review quarterly but ignore daily market noise'
      ]}
      nextSteps={[
        { label: t("Investment Planner"), href: '/investment-planner' }, 
        { label: t("Investment Readiness Quiz"), href: '/check-ins/investment-readiness' }, 
        { label: t("Emergency Fund First"), href: '/learn/emergency-fund' }
      ]}
    />
  );
}