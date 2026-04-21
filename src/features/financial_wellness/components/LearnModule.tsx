'use client';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Clock, BookOpen, CheckCircle2, ChevronRight } from 'lucide-react';
import { PageHeader } from './layout/PageHeader';

interface Section {
  icon: any;
  heading: string;
  content: any;
  variant?: 'cards';
}

interface LearnModuleProps {
  title: string;
  subtitle: string;
  readTime: string;
  category: string;
  introduction: string;
  sections: Section[];
  actionSteps: { number: string; text: string }[];
  keyTakeaways: string[];
  nextSteps?: { label: string; href: string }[];
}

export function LearnModule({
  title, subtitle, readTime, category, introduction, sections, actionSteps, keyTakeaways, nextSteps
}: LearnModuleProps) {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const suffix = query ? `?${query}` : '';

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      <PageHeader title={t(title)} backHref="/learn" />
      <div style={{ padding: 'var(--space-8) var(--space-4) var(--space-20)' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--brand-primary-glow)', color: 'var(--brand-primary)', padding: '4px 12px', borderRadius: 99, fontSize: 10, fontWeight: 800, textTransform: 'uppercase', marginBottom: 16 }}>
              <BookOpen size={12} /> {t(category)}
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-4xl)', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.04em', marginBottom: 8 }}>{t(title)}</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-lg)', fontWeight: 500, marginBottom: 16 }}>{t(subtitle)}</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 20, color: 'var(--text-faint)', fontSize: 12, fontWeight: 600 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Clock size={14} /> {readTime} {t("read")}</span>
            </div>
          </div>

          {/* Intro */}
          <div className="card" style={{ padding: 'var(--space-8)', background: 'white', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-2xl)', marginBottom: 'var(--space-10)', boxShadow: 'var(--shadow-sm)' }}>
            <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-primary)', lineHeight: 1.7, fontWeight: 500 }}>{t(introduction)}</p>
          </div>

          {/* Sections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
            {sections.map((section, idx) => {
              const Icon = section.icon;
              return (
                <div key={idx}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 'var(--space-6)' }}>
                     <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--bg-neutral)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-primary)' }}>
                       <Icon size={20} />
                     </div>
                     <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 800, color: 'var(--text-primary)' }}>{t(section.heading)}</h2>
                  </div>

                  {typeof section.content === 'string' ? (
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>{t(section.content)}</p>
                  ) : Array.isArray(section.content) ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {section.content.map((item: any, i) => (
                        <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', color: 'var(--text-secondary)' }}>
                          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--brand-primary)', marginTop: 8, flexShrink: 0 }} />
                          <span style={{ lineHeight: 1.6 }}>{typeof item === 'string' ? t(item) : t(item.title) + ': ' + t(item.description)}</span>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>

          {/* Action Steps */}
          <div style={{ marginTop: 'var(--space-12)', padding: 'var(--space-8)', background: 'var(--bg-card-hover)', borderRadius: 'var(--radius-2xl)', border: '1px solid var(--border-subtle)' }}>
             <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 800, marginBottom: 'var(--space-6)' }}>{t("Action Steps")}</h3>
             <div className="stack-4">
               {actionSteps.map(step => (
                 <div key={step.number} style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                   <div style={{ fontSize: 13, fontWeight: 900, color: 'var(--brand-primary)' }}>{step.number}</div>
                   <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-primary)' }}>{t(step.text)}</div>
                 </div>
               ))}
             </div>
          </div>

          {/* Key Takeaways */}
          <div style={{ marginTop: 'var(--space-8)' }}>
            <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 800, marginBottom: 'var(--space-6)' }}>{t("Key Takeaways")}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
               {keyTakeaways.map((take, i) => (
                  <div key={i} style={{ padding: 'var(--space-4)', background: 'white', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-subtle)', display: 'flex', gap: 10 }}>
                     <CheckCircle2 size={16} color="var(--brand-success)" style={{ flexShrink: 0 }} />
                     <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', lineHeight: 1.4 }}>{t(take)}</span>
                  </div>
               ))}
            </div>
          </div>

          {nextSteps && nextSteps.length > 0 && (
            <div style={{ marginTop: 'var(--space-12)' }}>
               <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 800, marginBottom: 'var(--space-6)' }}>{t("What to explore next")}</h3>
               <div className="stack-3">
                 {nextSteps.map((step, i) => (
                   <Link key={i} href={`${step.href}${suffix}`} className="card card-tap" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 'var(--space-3) var(--space-4)', textDecoration: 'none' }}>
                     <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', flex: 1 }}>{t(step.label)}</span>
                     <ChevronRight size={14} color="var(--text-faint)" />
                   </Link>
                 ))}
               </div>
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: 'var(--space-16)', padding: '24px', borderTop: '1px solid var(--border-default)', color: 'var(--text-faint)', fontSize: 13, fontWeight: 600 }}>
            {t("End of module")}
          </div>
        </div>
      </div>
    </div>
  );
}
