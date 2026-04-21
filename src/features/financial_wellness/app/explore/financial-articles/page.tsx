'use client';

import { FileText, Clock, ChevronRight, X, BookOpen, Star, Award, TrendingUp, Shield, Activity, Target, Zap, Heart } from 'lucide-react';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const ARTICLES = [
  { id: 1, title: "The Complete Beginner's Guide to Mutual Funds", author: 'Financial Wellness Team', readTime: "12 min", category: "Investing", preview: "Mutual funds are a simple way to start investing professionally. Learn about systematic plans and risk-adjusted returns.", content: "Detailed content about mutual funds...", icon: TrendingUp, color: '#2563EB' },
  { id: 2, title: "How the 52-Week Money Challenge Can Transform Your Savings", author: 'Financial Wellness Team', readTime: "8 min", category: "Savings", preview: "Gamify your saving habit by increasing your weekly goal. By week 52, you will have a substantial emergency buffer.", content: "Step by step guide for the 52-week challenge...", icon: Zap, color: '#00B894' },
  { id: 3, title: "Understanding Your Credit Score: A Deep Dive", author: 'Financial Wellness Team', readTime: "10 min", category: "Credit", preview: "Learn how your score is calculated and the specific behaviors that can boost it or hurt it significantly.", content: "Comprehensive report on credit scoring algorithms...", icon: Activity, color: '#0984e3' },
  { id: 4, title: "Choosing Between Long-term Savings Vehicles", author: 'Financial Wellness Team', readTime: "14 min", category: "Tax", preview: "Comparison of various instruments for long-horizon capital growth and tax optimization.", content: "In-depth analysis of pension funds vs ETFs...", icon: Shield, color: '#FDCB6E' },
  { id: 5, title: "The Hidden Cost of Lifestyle Inflation", author: 'Financial Wellness Team', readTime: "7 min", category: "Behavior", preview: "Why raises often don't lead to more wealth. Learn how to maintain your savings rate during income shifts.", content: "Psychological strategies to combat lifestyle creep...", icon: Heart, color: '#fd79a8' },
  { id: 6, title: "Emergency Fund Math: How Much is Actually Enough?", author: 'Financial Wellness Team', readTime: "6 min", category: "Savings", preview: "A framework to calculate your custom safety net based on volatility and fixed obligations.", content: "Detailed mathematical models for emergency funds...", icon: Target, color: '#e84393' },
];

export default function FinancialArticles() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const categories = ['All', ...new Set(ARTICLES.map(a => a.category))];
  const filtered = activeCategory === 'All' ? ARTICLES : ARTICLES.filter(a => a.category === activeCategory);

  const handleDownload = (e: React.MouseEvent, article: any) => {
    e.stopPropagation();
    const content = `
FINANCIAL WELLNESS INSIGHTS
--------------------------
TITLE: ${article.title}
AUTHOR: ${article.author}
CATEGORY: ${article.category}
READ TIME: ${article.readTime}

SUMMARY:
${article.preview}

FULL ANALYSIS:
The full analysis for "${article.title}" by the Financial Wellness Team is reserved for in-depth academy modules. 
Key takeaways include optimizing capital allocation and understanding behavioral friction points.

Generated on: ${new Date().toLocaleDateString()}
    `.trim();
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${article.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_summary.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      <div className="topbar">
        <div style={{ width: 44, height: 44, borderRadius: '12px', background: 'var(--brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-brand)' }}>
          <BookOpen size={20} color="white" />
        </div>
        <div>
          <h1 className="heading-md">{t("Knowledge Center")}</h1>
        </div>
      </div>

      <div className="page-wrapper">
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <h2 className="display-sm" style={{ marginBottom: 4 }}>{t("Institutional Insights")}</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{t("Global perspective on wealth management and behavior.")}</p>
        </div>

        <div className="chip-row" style={{ marginBottom: 'var(--space-8)' }}>
          {categories.map(cat => (
            <button key={cat} className={`chip ${activeCategory === cat ? 'active' : ''}`} onClick={() => setActiveCategory(cat)}>{cat}</button>
          ))}
        </div>

        <div className="stack-4">
          {filtered.map((article, i) => (
             <div key={article.id} className="card card-hover" onClick={() => setSelectedId(article.id === selectedId ? null : article.id)} style={{ padding: 'var(--space-6)', cursor: 'pointer' }}>
                <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: `${article.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: article.color, flexShrink: 0 }}>
                    <article.icon size={22} />
                  </div>
                  <div style={{ flex: 1 }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
                        <span className="badge" style={{ background: `${article.color}15`, color: article.color, fontSize: 10 }}>{t(article.category)}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--text-muted)' }}>
                           <Clock size={12} /> {t(article.readTime)}
                        </div>
                     </div>
                     <h3 className="heading-sm" style={{ marginBottom: 8 }}>{t(article.title)}</h3>
                     <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{t(article.preview)}</p>
                     
                     {selectedId === article.id && (
                       <div style={{ marginTop: 'var(--space-6)', paddingTop: 'var(--space-6)', borderTop: '1px solid var(--border-subtle)', animation: 'fadeIn 0.3s ease' }}>
                          <p style={{ fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.8 }}>{t("The full analysis for \"{{title}}\" by the Financial Wellness Team is reserved for in-depth academy modules. Key takeaways include optimizing capital allocation and understanding behavioral friction points.", { title: t(article.title) })}</p>
                          <button 
                            className="btn btn-secondary btn-sm" 
                            style={{ marginTop: 16 }}
                            onClick={(e) => handleDownload(e, article)}
                          >
                            {t("Download Summary PDF")}
                          </button>
                       </div>
                     )}
                  </div>
                </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}
