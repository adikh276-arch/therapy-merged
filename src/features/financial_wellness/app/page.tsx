'use client';

import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Lightbulb,
  MessageSquare,
  Wallet,
  PiggyBank,
  CreditCard,
  TrendingUp,
  Shield,
  Target,
  Heart,
  BarChart3,
  FileText,
  HelpCircle,
  Compass,
  CalendarCheck,
  Receipt,
  AlertCircle,
  ArrowRight,
  TrendingDown,
} from "lucide-react";
import Link from 'next/link';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useTranslation } from 'react-i18next';

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 20 }
  }
};

const learnItems = [
  { title: "Budgeting Basics", icon: Wallet, route: "/learn/budgeting-basics" },
  { title: "Saving Habits", icon: PiggyBank, route: "/learn/saving-habits" },
  { title: "Debt Management", icon: CreditCard, route: "/learn/debt-management" },
  { title: "Investing Basics", icon: TrendingUp, route: "/learn/investing-basics" },
  { title: "Emergency Fund", icon: Shield, route: "/learn/emergency-fund" },
  { title: "Financial Goals", icon: Target, route: "/learn/financial-goals" },
  { title: "50/30/20 Rule", icon: BarChart3, route: "/learn/50-30-20-rule" },
  { title: "Mindful Spending", icon: Heart, route: "/learn/mindful-spending" },
  { title: "Your Money Priorities", icon: Compass, route: "/learn/your-money-priorities" },
  { title: "Plan for Your Future", icon: CalendarCheck, route: "/learn/plan-for-your-future" },
  { title: "Understand Your Income & Expenses", icon: Receipt, route: "/learn/understand-your-income-expenses" },
  { title: "Avoid Common Money Mistakes", icon: AlertCircle, route: "/learn/avoid-common-money-mistakes" },
];

const checkinItems = [
  { title: "Spending Style Quiz", icon: Wallet, route: "/check-ins/spending-style-quiz" },
  { title: "Savings Check-up", icon: PiggyBank, route: "/check-ins/savings-check-up" },
  { title: "Money Stress Quiz", icon: Heart, route: "/check-ins/money-stress-quiz" },
  { title: "Investment Readiness", icon: TrendingUp, route: "/check-ins/investment-readiness" },
];

const exploreItems = [
  { title: "Financial Tips", icon: Lightbulb, route: "/explore/financial-tips", desc: "Quick ideas to improve your money habits" },
  { title: "Financial Stories", icon: MessageSquare, route: "/explore/financial-stories", desc: "Real experiences from people like you" },
  { title: "Financial Articles", icon: FileText, route: "/explore/financial-articles", desc: "In-depth reads on financial wellbeing" },
  { title: "Financial FAQs", icon: HelpCircle, route: "/explore/financial-faqs", desc: "Answers to common money questions" },
  { title: "Financial Myths", icon: HelpCircle, route: "/explore/financial-myths", desc: "Common misconceptions about money" },
];

export default function FinancialWellnessDashboard() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <main className="dashboard-wrapper">
        {/* Header */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={headerVariants}
          className="dashboard-header"
        >
          <button
            onClick={() => router.back()}
            className="back-btn"
            aria-label="Go back"
          >
            <ChevronLeft size={22} />
          </button>
          
          <div className="dashboard-logo">
            <DollarSign size={28} strokeWidth={2.5} />
          </div>

          <div className="dashboard-title-section">
            <h1 className="dashboard-title">{t("Financial Self-Care")}</h1>
            <p className="dashboard-subtitle">
              {t("Build healthier financial habits through expert content, personal reflections, and smart tool guidance.")}
            </p>
          </div>

          <div className="flex-shrink-0">
            <LanguageSelector />
          </div>
        </motion.header>

        {/* Learn Section */}
        <section className="dashboard-section">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <h2 className="dashboard-section-title">
              <TrendingUp size={20} className="text-brand-primary" />
              {t("Learn")}
            </h2>
            <div className="dashboard-grid">
              {learnItems.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <motion.div key={item.title} variants={itemVariants}>
                    <Link href={item.route} className="dashboard-card">
                      <div className="dashboard-card-icon">
                        <ItemIcon size={22} strokeWidth={2.2} />
                      </div>
                      <p className="dashboard-card-title">{t(item.title)}</p>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </section>

        {/* Check-ins Section */}
        <section className="dashboard-section">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <h2 className="dashboard-section-title">
              <CalendarCheck size={20} className="text-brand-primary" />
              {t("Check-ins")}
            </h2>
            <div className="dashboard-grid">
              {checkinItems.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <motion.div key={item.title} variants={itemVariants}>
                    <Link href={item.route} className="dashboard-card">
                      <div className="dashboard-card-icon">
                        <ItemIcon size={22} strokeWidth={2.2} />
                      </div>
                      <p className="dashboard-card-title">{t(item.title)}</p>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </section>

        {/* Explore Section */}
        <section className="dashboard-section">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <h2 className="dashboard-section-title">
              <Compass size={20} className="text-brand-primary" />
              {t("Explore")}
            </h2>
            <div className="stack-column">
              {exploreItems.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <motion.div key={item.title} variants={itemVariants}>
                    <Link href={item.route} className="explore-card">
                      <div className="explore-icon-wrapper">
                        <ItemIcon size={28} strokeWidth={2} />
                      </div>
                      <div className="explore-content">
                        <h3 className="explore-title">{t(item.title)}</h3>
                        <p className="explore-desc">{t(item.desc)}</p>
                      </div>
                      <ChevronRight size={20} className="text-faint" />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
