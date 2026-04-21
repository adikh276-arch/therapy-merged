'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  TrendingUp, Calculator, Target, PieChart, Shield, Activity,
  BookOpen, CheckSquare, Compass, ChevronRight, Sparkles,
  BarChart2, Zap, Heart, MessageSquare, FileText, HelpCircle, AlertCircle,
  Menu, X, Lightbulb, Globe
} from 'lucide-react';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'العربية' },
  { code: 'bn', label: 'বাংলা' },
  { code: 'zh', label: '中文' },
  { code: 'nl', label: 'Nederlands' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'id', label: 'Bahasa Indonesia' },
  { code: 'it', label: 'Italiano' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
  { code: 'pl', label: 'Polski' },
  { code: 'pt', label: 'Português' },
  { code: 'ru', label: 'Русский' },
  { code: 'es', label: 'Spanish' },
  { code: 'tl', label: 'Tagalog' },
  { code: 'th', label: 'ไทย' },
  { code: 'tr', label: 'Turkish' },
  { code: 'vi', label: 'Tiếng Việt' },
];

const navSections = [
  {
    label: 'Overview',
    items: [
      { href: '/', label: 'Dashboard', icon: Sparkles },
    ]
  },
  {
    label: 'Quick Tools',
    items: [
      { href: '/investment-planner', label: 'Investment Planner', icon: TrendingUp },
      { href: '/loan-emi-planner', label: 'Loan & EMI Planner', icon: Calculator },
      { href: '/goal-planner', label: 'Goal Planner', icon: Target },
      { href: '/budget-planner', label: 'Budget Planner', icon: PieChart },
      { href: '/emergency-fund', label: 'Emergency Fund', icon: Shield },
      { href: '/financial-health-score', label: 'Health Score', icon: Activity },
    ]
  },
  {
    label: 'Learn',
    items: [
      { href: '/learn/budgeting-basics', label: 'Budgeting Basics', icon: BookOpen },
      { href: '/learn/saving-habits', label: 'Saving Habits', icon: Zap },
      { href: '/learn/investing-basics', label: 'Investing Basics', icon: BarChart2 },
      { href: '/learn/debt-management', label: 'Debt Management', icon: AlertCircle },
    ]
  },
  {
    label: 'Check-ins',
    items: [
      { href: '/check-ins/spending-style-quiz', label: 'Spending Style', icon: CheckSquare },
      { href: '/check-ins/savings-check-up', label: 'Savings Check-up', icon: Heart },
      { href: '/check-ins/money-stress-quiz', label: 'Money Stress', icon: Activity },
      { href: '/check-ins/investment-readiness', label: 'Investment Ready', icon: TrendingUp },
    ]
  },
  {
    label: 'Explore',
    items: [
      { href: '/explore/financial-tips', label: 'Financial Tips', icon: Zap },
      { href: '/explore/financial-stories', label: 'Stories', icon: MessageSquare },
      { href: '/explore/financial-articles', label: 'Articles', icon: FileText },
      { href: '/explore/financial-faqs', label: 'FAQs', icon: HelpCircle },
      { href: '/explore/financial-myths', label: 'Myths Busted', icon: AlertCircle },
    ]
  },
];

export function Sidebar() {
  const { t, i18n } = useTranslation();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar on navigation
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <button 
        className="mobile-menu-toggle" 
        onClick={() => setIsOpen(!isOpen)}
        style={{ position: 'fixed', top: 12, left: 12, zIndex: 100 }}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <nav className={`nav-sidebar ${isOpen ? 'open' : ''}`}>
        {/* Logo */}
        <div className="nav-header">
          <div className="nav-logo">
            <TrendingUp size={18} color="white" strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>
              {t('FinWell')}
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
              {t('Financial Wellness')}
            </div>
          </div>
        </div>

        {/* Nav Sections */}
        <div style={{ flex: 1, padding: 'var(--space-3) 0', overflowY: 'auto' }}>
          {navSections.map((section) => (
            <div key={section.label}>
              <div className="nav-section-label">{t(section.label)}</div>
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`nav-item ${isActive ? 'active' : ''}`}
                  >
                    <Icon size={16} strokeWidth={2} />
                    <span style={{ flex: 1 }}>{t(item.label)}</span>
                    {isActive && <ChevronRight size={14} style={{ opacity: 0.5 }} />}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{ padding: 'var(--space-4)', borderTop: '1px solid var(--border-subtle)' }}>
          <div style={{
            padding: 'var(--space-4)',
            background: 'var(--bg-card-hover)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)',
            fontSize: 'var(--text-xs)',
            color: 'var(--text-muted)',
            lineHeight: 1.5,
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--brand-primary)', fontWeight: 700 }}>
              <Lightbulb size={14} />
              {t('Quick Tip')}
            </div>
            {t('Save 20% of every income. Time is your greatest wealth-building asset.')}
          </div>
          
          {/* Language Switcher */}
          <div style={{ marginTop: 'var(--space-4)', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => i18n.changeLanguage(l.code)}
                style={{
                  padding: '4px 8px',
                  fontSize: 10,
                  fontWeight: 600,
                  borderRadius: 'var(--radius-md)',
                  background: i18n.language === l.code ? 'var(--brand-primary)' : 'var(--bg-neutral)',
                  color: i18n.language === l.code ? 'white' : 'var(--text-muted)',
                  border: '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  flex: '1 0 30%',
                  textAlign: 'center'
                }}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(4px)',
            zIndex: 19,
          }}
        />
      )}
    </>
  );
}


