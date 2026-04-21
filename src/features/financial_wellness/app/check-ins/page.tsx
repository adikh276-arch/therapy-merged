'use client';
import { useTranslation } from 'react-i18next';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckSquare, Heart, Activity, TrendingUp, ChevronRight, ChevronLeft, Star, ActivityIcon, ClipboardCheck } from 'lucide-react';
import { LanguageSelector } from '@/components/LanguageSelector';

const checkIns = [
  {
    href: '/check-ins/spending-style-quiz',
    label: "Spending Style Quiz",
    desc: "Decode your money personality & behavioral archetype",
    icon: CheckSquare,
    tag: 'Behavior',
    time: '5 min',
    questions: '10 questions',
  },
  {
    href: '/check-ins/savings-check-up',
    label: "Savings Check-up",
    desc: "Benchmark your emergency fund, savings rate and habits",
    icon: Heart,
    tag: 'Savings',
    time: '4 min',
    questions: '5 inputs',
  },
  {
    href: '/check-ins/money-stress-quiz',
    label: "Money Stress Quiz",
    desc: "Measure your financial anxiety level and get relief tactics",
    icon: Activity,
    tag: 'Wellness',
    time: '6 min',
    questions: '15 questions',
  },
  {
    href: '/check-ins/investment-readiness',
    label: "Investment Readiness",
    desc: "Are your foundations strong enough to start investing?",
    icon: TrendingUp,
    tag: 'Investing',
    time: '5 min',
    questions: '10 questions',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 300, damping: 25 } 
  }
};

export default function CheckInsHub() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const suffix = query ? `?${query}` : '';

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
            <ClipboardCheck size={28} strokeWidth={2.5} />
          </div>

          <div className="dashboard-title-section">
            <h1 className="dashboard-title">{t("Check-ins")}</h1>
            <p className="dashboard-subtitle">
              {t("Personalized diagnostics to reveal your financial strengths and opportunities.")}
            </p>
          </div>

          <div className="flex-shrink-0">
            <LanguageSelector />
          </div>
        </motion.header>

        {/* Hero Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          style={{
            background: 'linear-gradient(135deg, #EC4899 0%, #BE185D 100%)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-8)',
            marginBottom: 'var(--space-10)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          <div style={{ position: 'absolute', top: -30, right: -30, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)' }}>
            <div style={{ width: 56, height: 56, borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Activity size={28} color="white" />
            </div>
            <div>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.8125rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {t('Assess Your Pulse')}
              </p>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '2px 0 0' }}>
                {t('Know Your Money Profile')}
              </h2>
            </div>
          </div>
        </motion.div>

        {/* Check-ins Stack */}
        <motion.div 
          className="stack-column"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {checkIns.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.href} variants={itemVariants}>
                <Link href={`${item.href}${suffix}`} style={{ textDecoration: 'none' }}>
                  <div className="explore-card">
                    <div className="explore-icon-wrapper">
                      <Icon size={26} strokeWidth={2.2} />
                    </div>
                    <div className="explore-content">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                        <h3 className="explore-title">{t(item.label)}</h3>
                        <span style={{ 
                          fontSize: '0.6875rem', 
                          fontWeight: 800, 
                          color: '#BE185D', 
                          background: 'rgba(190, 24, 93, 0.08)',
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-full)',
                          textTransform: 'uppercase'
                        }}>
                          {t(item.tag)}
                        </span>
                      </div>
                      <p className="explore-desc">{t(item.desc)}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginTop: 8 }}>
                         <span style={{ fontSize: '0.75rem', color: 'var(--text-faint)', fontWeight: 600 }}>{t(item.time)}</span>
                         <span style={{ fontSize: '0.75rem', color: 'var(--text-faint)', fontWeight: 600 }}>•</span>
                         <span style={{ fontSize: '0.75rem', color: 'var(--text-faint)', fontWeight: 600 }}>{t(item.questions)}</span>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-faint" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footer Tip */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{
            marginTop: 'var(--space-12)',
            padding: 'var(--space-6)',
            background: 'white',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-default)',
            display: 'flex',
            gap: 'var(--space-4)',
            alignItems: 'center'
          }}
        >
          <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-full)', background: 'var(--brand-primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Star size={20} color="var(--brand-primary)" />
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            <strong style={{ color: 'var(--text-primary)' }}>{t("Pro tip:")}</strong> {t("Complete all 4 check-ins for a comprehensive report of your financial wellbeing.")}
          </p>
        </motion.div>
      </main>
    </div>
  );
}
