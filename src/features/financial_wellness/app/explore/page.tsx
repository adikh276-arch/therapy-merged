'use client';
import { useTranslation } from 'react-i18next';
import { useRouter, useSearchParams } from 'next/navigation';
import { LanguageSelector } from '@/components/LanguageSelector';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Lightbulb, HelpCircle, BookOpen, MessageSquare, FileText, ChevronLeft, ChevronRight, Sparkles, Compass } from 'lucide-react';

const sections = [
  {
    href: '/explore/financial-tips',
    label: "Financial Tips",
    desc: "Bite-sized, actionable wisdom across all money topics",
    icon: Lightbulb,
    count: '50+ tips',
  },
  {
    href: '/explore/financial-stories',
    label: "Real Money Stories",
    desc: "Inspiring journeys of financial transformation",
    icon: MessageSquare,
    count: '6 stories',
  },
  {
    href: '/explore/financial-articles',
    label: "In-Depth Articles",
    desc: "Research-backed reads for financial mastery",
    icon: FileText,
    count: '8 articles',
  },
  {
    href: '/explore/financial-faqs',
    label: "FAQs",
    desc: "Clear answers to the most common money questions",
    icon: HelpCircle,
    count: '30+ answers',
  },
  {
    href: '/explore/financial-myths',
    label: "Money Myths Busted",
    desc: "Debunking the lies that keep you financially stuck",
    icon: HelpCircle, // Using HelpCircle for consistency with myths if needed
    count: '12 myths',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 25 } }
};

export default function ExploreHub() {
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
            <Compass size={28} strokeWidth={2.5} />
          </div>

          <div className="dashboard-title-section">
            <h1 className="dashboard-title">{t("Explore Wisdom")}</h1>
            <p className="dashboard-subtitle">
              {t("Discover deep insights and practical tips for financial peace.")}
            </p>
          </div>

          <div className="flex-shrink-0">
            <LanguageSelector />
          </div>
        </motion.header>

        {/* Feature Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          style={{
            background: 'linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-primary-dark) 100%)',
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
              <Sparkles size={28} color="white" />
            </div>
            <div>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.8125rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {t('100+ Wisdom Bites')}
              </p>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '2px 0 0' }}>
                {t('Unlock Your Wealth Potential')}
              </h2>
            </div>
          </div>
        </motion.div>

        {/* Explore Stack */}
        <motion.div 
          className="stack-column"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <motion.div key={section.href} variants={itemVariants}>
                <Link href={`${section.href}${suffix}`} style={{ textDecoration: 'none' }}>
                  <div className="explore-card">
                    <div className="explore-icon-wrapper">
                      <Icon size={28} strokeWidth={2.2} />
                    </div>
                    <div className="explore-content">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                        <h3 className="explore-title">{t(section.label)}</h3>
                        <span style={{ 
                          fontSize: '0.6875rem', 
                          fontWeight: 800, 
                          color: 'var(--brand-primary)', 
                          background: 'var(--brand-primary-glow)',
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-full)',
                          textTransform: 'uppercase'
                        }}>
                          {t(section.count)}
                        </span>
                      </div>
                      <p className="explore-desc">{t(section.desc)}</p>
                    </div>
                    <ChevronRight size={20} className="text-faint" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </main>
    </div>
  );
}
