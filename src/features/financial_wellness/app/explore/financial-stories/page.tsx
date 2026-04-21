'use client';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Trophy, Target, TrendingUp, Rocket, Gem, Zap, ChevronLeft, MapPin, Quote, User } from 'lucide-react';
import { LanguageSelector } from '@/components/LanguageSelector';

const STORIES = [
  { id: 'sarah', name: 'Sarah, 29', city: 'London', income: '6,000', achievement: 'Achieved Debt-Free Status', story: "I used to feel overwhelmed by my student loans. The systematic approach I learned here helped me clear £15k in just 18 months. Now I'm finally building my emergency fund!", color: '#2563EB', icon: Trophy },
  { id: 'michael', name: 'Michael, 34', city: 'New York', income: '12,000', achievement: 'Started Retirement Portfolio', story: "Investing always felt like a secret club I wasn't invited to. The simple modules broke down the barriers. I've now automated my Roth IRA and feel secure about my future.", color: '#059669', icon: Target },
  { id: 'chloe', name: 'Chloe, 27', city: 'Paris', income: '4,500', achievement: 'Mastered the 50/30/20 Rule', story: "I was a chronic overspender. Understanding the 50/30/20 rule gave me a framework that didn't feel restrictive, just intentional. My lifestyle has actually improved!", color: '#D97706', icon: TrendingUp },
  { id: 'david', name: 'David, 42', city: 'Sydney', income: '25,000', achievement: 'Optimized High-Net Worth Tax', story: "Even with a high income, I was leaking money through inefficiencies. The 'Leak Audit' tips saved me thousands in unnecessary fees and subscriptions.", color: '#DC2626', icon: Rocket },
  { id: 'elena', name: 'Elena, 52', city: 'Madrid', income: '8,000', achievement: 'Built a 6-Month Emergency Fund', story: "As a freelancer, income volatility was a constant stressor. Having a solid cash cushion has completely changed my mental health and career confidence.", color: '#00B1B1', icon: Gem },
  { id: 'liam', name: 'Liam, 25', city: 'Dublin', income: '3,500', achievement: 'First Time Home Buyer', story: "I thought I'd be renting forever. By following the 'Saving Habits' module, I managed to save my deposit in 3 years. Walking into my own home was the best feeling ever.", color: '#6366F1', icon: Zap },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } }
};

export default function FinancialStories() {
  const { t } = useTranslation();
  const router = useRouter();

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
            <Trophy size={28} strokeWidth={2.5} />
          </div>

          <div className="dashboard-title-section">
            <h1 className="dashboard-title">{t("Real Stories")}</h1>
            <p className="dashboard-subtitle">
              {t("Authentic journeys of financial transformation and mastery.")}
            </p>
          </div>

          <div className="flex-shrink-0">
            <LanguageSelector />
          </div>
        </motion.header>

        {/* Stories List */}
        <motion.div 
          className="stack-column"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ gap: 'var(--space-6)' }}
        >
          {STORIES.map((story) => {
            const Icon = story.icon;
            return (
              <motion.div key={story.id} variants={itemVariants}>
                <div className="card-base" style={{ padding: 'var(--space-8)', borderLeft: `6px solid ${story.color}` }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-8)', flexWrap: 'wrap' }}>
                    <div style={{
                      width: 64, height: 64, borderRadius: 'var(--radius-lg)',
                      background: `${story.color}10`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: story.color, flexShrink: 0
                    }}>
                      <Icon size={32} strokeWidth={2.2} />
                    </div>

                    <div style={{ flex: 1, minWidth: '280px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap', marginBottom: 'var(--space-4)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--bg-base)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <User size={16} className="text-muted" />
                          </div>
                          <span className="heading-sm" style={{ color: 'var(--text-primary)' }}>{t(story.name)}</span>
                        </div>
                        <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
                          <MapPin size={14} /> {t(story.city)}
                        </span>
                        <span style={{ 
                          fontSize: '0.75rem', 
                          fontWeight: 700, 
                          color: story.color, 
                          background: `${story.color}10`,
                          padding: '4px 10px',
                          borderRadius: 'var(--radius-full)',
                        }}>
                          {t('Income: ${{income}} / mo', { income: story.income })}
                        </span>
                      </div>

                      <div style={{ 
                        padding: '12px 16px', 
                        background: 'var(--bg-base)', 
                        border: '1px solid var(--border-subtle)', 
                        borderRadius: 'var(--radius-md)', 
                        marginBottom: 'var(--space-6)', 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: 10 
                      }}>
                        <Trophy size={16} color={story.color} />
                        <div style={{ fontWeight: 800, color: story.color, fontSize: '0.8125rem', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                          {t(story.achievement)}
                        </div>
                      </div>

                      <div style={{ position: 'relative' }}>
                        <Quote size={32} style={{ position: 'absolute', top: -10, left: -40, opacity: 0.05, color: story.color }} />
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.9375rem', fontWeight: 500, fontStyle: 'italic' }}>
                          &ldquo;{t(story.story)}&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </main>
    </div>
  );
}
