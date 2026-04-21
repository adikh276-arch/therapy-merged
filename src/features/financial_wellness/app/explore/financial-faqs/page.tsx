'use client';

import { useState } from 'react';
import { 
  HelpCircle, ChevronDown, ChevronUp, Search, 
  Wallet, Shield, TrendingUp, CreditCard, Brain, Zap, Clock, BookOpen, MessageCircle
} from 'lucide-react';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useTranslation } from 'react-i18next';

const FAQS = [
  { q: "How much emergency fund is ideal?", a: "A standard recommendation is 3-6 months of essential living expenses. If your income is volatile or you work in a niche industry, consider 9-12 months for extreme security.", icon: Shield },
  { q: "Should I pay off debt or invest first?", a: "Generally, pay off high-interest debt (above 7-8%) first. If your debt is low-interest (like a mortgage) and you have a solid reserve, starting an index fund investment can build more wealth over time.", icon: CreditCard },
  { q: "What is the 50/30/20 rule?", a: "It's a simple allocation model: 50% of income for Needs (rent, bills), 30% for Wants (hobbies, dining), and 20% for Savings and Debt repayment.", icon: Wallet },
  { q: "How do I start investing with small amounts?", a: "Use systematic investment plans (SIPs) or micro-investing platforms. Buying low-cost index funds regularly is more important than the starting amount.", icon: TrendingUp },
  { q: "Is insurance an investment?", a: "Strictly speaking, no. Insurance is risk protection. Traditional plans that mix both often have high fees. It's usually better to keep them separate: buy pure insurance and invest for growth.", icon: Brain },
  { q: "When should I review my financial plan?", a: "At least once every 6 months, or whenever a major life event occurs (career change, marriage, etc.). Regular audits ensure your strategy remains aligned with your goals.", icon: Clock },
];

export default function FinancialFAQs() {
  const { t } = useTranslation();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      <div className="topbar">
         <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--brand-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,177,177,0.3)' }}>
            <MessageCircle size={20} color="white" />
         </div>
         <h1 className="heading-md">{t("Common Questions")}</h1>
      </div>

      <div className="page-wrapper">
        <div style={{ marginBottom: 'var(--space-8)' }}>
           <h2 className="display-sm" style={{ marginBottom: 4 }}>{t("Expert Clarity")}</h2>
           <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{t("Answers to the most frequent financial inquiries from our community.")}</p>
        </div>

        <div className="stack-4">
          {FAQS.map((faq, i) => (
             <div key={i} className="card" style={{ border: openIdx === i ? '1px solid var(--brand-accent)' : '1px solid var(--border-subtle)', overflow: 'hidden' }}>
                <button 
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  style={{ width: '100%', padding: 'var(--space-5) var(--space-6)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: openIdx === i ? 'var(--bg-card-hover)' : 'white', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                >
                   <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <faq.icon size={18} color="var(--brand-accent)" />
                      <span style={{ fontWeight: 700, fontSize: 13, color: 'var(--text-primary)' }}>{faq.q}</span>
                   </div>
                   {openIdx === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openIdx === i && (
                  <div style={{ padding: 'var(--space-5) var(--space-6)', background: 'white', borderTop: '1px solid var(--border-subtle)', animation: 'fadeIn 0.25s ease' }}>
                     <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{faq.a}</p>
                  </div>
                )}
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}
