'use client';

import Link from 'next/link';
import { ChevronRight, ChevronLeft, BookOpen, Clock, Compass, PieChart, Zap, AlertCircle, BarChart2, Shield, Target, Heart, Star, TrendingUp, Brain } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams, useRouter } from 'next/navigation';
import { LanguageSelector } from '@/components/LanguageSelector';
import { motion, AnimatePresence } from 'framer-motion';

const modules = [
  { href: '/learn/budgeting-basics', label: "Budgeting Basics", icon: PieChart, time: '5 min', tag: 'Foundational' },
  { href: '/learn/saving-habits', label: "Saving Habits", icon: Zap, time: '6 min', tag: 'Habits' },
  { href: '/learn/debt-management', label: "Debt Management", icon: AlertCircle, time: '7 min', tag: 'Debt' },
  { href: '/learn/investing-basics', label: "Investing Basics", icon: BarChart2, time: '8 min', tag: 'Investing' },
  { href: '/learn/emergency-fund', label: "Emergency Fund", icon: Shield, time: '5 min', tag: 'Safety' },
  { href: '/learn/financial-goals', label: "Financial Goals", icon: Target, time: '6 min', tag: 'Goals' },
  { href: '/learn/50-30-20-rule', label: "50/30/20 Rule", icon: PieChart, time: '4 min', tag: 'Foundational' },
  { href: '/learn/mindful-spending', label: "Mindful Spending", icon: Heart, time: '6 min', tag: 'Behavior' },
  { href: '/learn/your-money-priorities', label: "Your Money Priorities", icon: Star, time: '7 min', tag: 'Mindset' },
  { href: '/learn/plan-for-your-future', label: "Plan for Your Future", icon: Compass, time: '9 min', tag: 'Strategy' },
  { href: '/learn/understand-your-income-expenses', label: "Understand Your Income & Expenses", icon: TrendingUp, time: '6 min', tag: 'Foundational' },
  { href: '/learn/avoid-common-money-mistakes', label: "Avoid Common Money Mistakes", icon: Brain, time: '10 min', tag: 'Behavior' },
];

const tags = ['All', 'Foundational', 'Habits', 'Investing', 'Debt', 'Safety', 'Goals', 'Behavior', 'Mindset', 'Strategy'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 300, damping: 25 } 
  }
};

export default function LearnHub() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [filter, setFilter] = useState('All');
  
  const query = searchParams.toString();
  const suffix = query ? `?${query}` : '';

  const filtered = filter === 'All' ? modules : modules.filter(m => m.tag === filter);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <main className="dashboard-wrapper">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="dashboard-header"
        >
          <button onClick={() => router.back()} className="back-btn" aria-label="Go back">
            <ChevronLeft size={22} />
          </button>
          
          <div className="dashboard-logo">
            <BookOpen size={28} strokeWidth={2.5} />
          </div>

          <div className="dashboard-title-section">
            <h1 className="dashboard-title">{t("Academy")}</h1>
            <p className="dashboard-subtitle">
              {t("12 expert-curated modules to master your financial life.")}
            </p>
          </div>

          <div className="flex-shrink-0">
            <LanguageSelector />
          </div>
        </motion.header>

        {/* Filter Chips */}
        <div className="chip-row" style={{ marginBottom: 'var(--space-8)' }}>
          {tags.map(tag => (
            <button 
              key={tag} 
              className={`chip ${filter === tag ? 'active' : ''}`} 
              onClick={() => setFilter(tag)}
            >
              {t(tag)}
            </button>
          ))}
        </div>

        {/* Modules List */}
        <motion.div 
          className="stack-column"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={filter} // Re-animate on filter change
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((mod) => {
              const Icon = mod.icon;
              return (
                <motion.div 
                  key={mod.href} 
                  variants={itemVariants}
                  layout
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <Link href={`${mod.href}${suffix}`} style={{ textDecoration: 'none' }}>
                    <div className="explore-card">
                      <div className="explore-icon-wrapper">
                        <Icon size={24} strokeWidth={2.2} />
                      </div>
                      <div className="explore-content">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                          <h3 className="explore-title">{t(mod.label)}</h3>
                          <span style={{ 
                            fontSize: '0.6875rem', 
                            fontWeight: 800, 
                            color: 'var(--brand-primary)', 
                            background: 'var(--brand-primary-glow)',
                            padding: '2px 8px',
                            borderRadius: 'var(--radius-full)',
                            textTransform: 'uppercase'
                          }}>
                            {t(mod.tag)}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginTop: 4 }}>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                            <Clock size={12} /> {mod.time}
                          </span>
                        </div>
                      </div>
                      <ChevronRight size={20} className="text-faint" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
}
