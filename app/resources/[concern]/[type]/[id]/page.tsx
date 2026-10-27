'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles, Lightbulb, MessageCircle, HelpCircle, ArrowLeft } from 'lucide-react';
import { useTranslation, I18nextProvider } from 'react-i18next';
import { PremiumLayout } from '@/components/shared/PremiumLayout';
import { goBack, withLang } from '@/lib/navigation';
import i18n, { loadLocale } from '../../../i18n';
import { getLocalizedData } from '../../../dataLoader';
import { Resource, Tip, Article, Story, Myth } from '../../../types';

interface ResourceDetailInnerProps {
  concern: string;
  type: string;
  id: string;
}

function ResourceDetailInner({ concern, type, id }: ResourceDetailInnerProps) {
  const { t } = useTranslation(undefined, { i18n });
  const router = useRouter();
  
  const [resource, setResource] = useState<Resource | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const lang = params.get('lang') || 'en';
      loadLocale(lang).then(() => {
        loadData(lang);
      });
    } else {
      loadData('en');
    }
  }, [concern, type, id]);

  const loadData = async (lang: string) => {
    setLoading(true);
    try {
      const data = await getLocalizedData(lang);
      const allResources = (data as any)?.[type || ''] || [];
      const found = allResources.find((r: any) => r.id === id) as Resource;
      setResource(found);
    } catch (err) {
      console.error("Failed to load resource detail:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <PremiumLayout title={t("common.loading", "Loading...")}>
        <div className="flex items-center justify-center py-32">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </PremiumLayout>
    );
  }

  if (!resource) {
    return (
      <PremiumLayout 
        title={t("app_title", "Resources")}
        onBack={() => {
          if (router) {
            router.push(withLang(`/resources/${concern}/${type}`));
          } else if (typeof window !== 'undefined') {
            window.location.href = withLang(`/resources/${concern}/${type}`);
          }
        }}
      >
        <div className="flex flex-col items-center justify-center py-32 gap-6">
          <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-300">
            <HelpCircle size={40} />
          </div>
          <div className="text-center space-y-2">
            <p className="text-slate-900 font-black text-xl">{t("not_found.message")}</p>
            <p className="text-slate-400 font-bold text-sm">{t("not_found.description")}</p>
          </div>
          <button 
            onClick={() => {
              if (router) {
                router.push(withLang(`/resources/${concern}/${type}`));
              } else if (typeof window !== 'undefined') {
                window.location.href = withLang(`/resources/${concern}/${type}`);
              }
            }} 
            className="px-8 py-3 bg-primary text-white font-black rounded-full shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
          >
            {t("not_found.button")}
          </button>
        </div>
      </PremiumLayout>
    );
  }

  const renderTip = (tip: Tip) => {
    return (
      <div className="w-full space-y-8 sm:space-y-12 pb-24">
        <motion.section 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl sm:rounded-[2.5rem] border border-white/60 p-6 sm:p-10 md:p-12 shadow-sm relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-6 sm:p-12 text-slate-50 pointer-events-none select-none">
            <Sparkles size={80} className="sm:w-28 sm:h-28" />
          </div>
          <h2 className="text-[10px] sm:text-[11px] font-black text-primary uppercase tracking-[0.3em] mb-4 sm:mb-6 flex items-center gap-2">
            <Sparkles size={14} />
            {t("detail.tip.insight_label")}
          </h2>
          <p className="text-slate-800 text-lg sm:text-2xl font-bold leading-snug sm:leading-tight tracking-tight relative z-10">{tip.whyItHelps}</p>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6 sm:space-y-8"
        >
          <div className="flex items-center justify-between px-2 sm:px-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">{t("detail.tip.plan_title")}</h2>
            <span className="px-3 sm:px-4 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider">
              {t("detail.tip.steps", { count: tip.whatYouCanDo.length })}
            </span>
          </div>
          
          <div className="grid gap-3 sm:gap-4">
            {tip.whatYouCanDo.map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + (i * 0.08) }}
                className="flex items-start gap-4 sm:gap-6 p-5 sm:p-7 bg-white rounded-2xl sm:rounded-3xl border border-slate-100 hover:border-primary/20 transition-all group shadow-sm"
              >
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5 shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <CheckCircle2 size={18} strokeWidth={2.5} className="sm:w-5 sm:h-5" />
                </div>
                <span className="text-slate-800 text-sm sm:text-base font-semibold leading-relaxed pt-0.5">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {tip.example && (
          <motion.section 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 sm:p-10 md:p-12 bg-rose-50/70 rounded-3xl sm:rounded-[2.5rem] border border-rose-100 shadow-sm space-y-6 sm:space-y-8 relative overflow-hidden group"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 sm:w-40 sm:h-40 bg-rose-100/40 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-[0.25em] relative z-10">
              <Lightbulb size={16} className="text-rose-500" />
              {t("detail.tip.example_label")}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] items-start md:items-center gap-5 sm:gap-8 relative z-10">
              <div className="space-y-1.5 sm:space-y-2 p-4 sm:p-0 bg-white/60 sm:bg-transparent rounded-2xl sm:rounded-none">
                <p className="text-[10px] font-bold text-rose-500 uppercase tracking-wider">{t("detail.tip.instead_of")}</p>
                <p className="text-rose-900/70 text-sm sm:text-base md:text-lg font-medium leading-relaxed italic">&quot;{tip.example.instead}&quot;</p>
              </div>
              
              <div className="hidden md:flex flex-col items-center gap-1">
                <div className="w-1 h-1 rounded-full bg-rose-200" />
                <div className="w-1 h-8 bg-gradient-to-b from-rose-200 to-rose-300 rounded-full" />
                <div className="w-1 h-1 rounded-full bg-rose-300" />
              </div>

              <div className="space-y-1.5 sm:space-y-2 p-4 sm:p-0 bg-white/80 sm:bg-transparent rounded-2xl sm:rounded-none">
                <p className="text-[10px] font-bold text-rose-600 uppercase tracking-wider">{t("detail.tip.try_this")}</p>
                <p className="text-rose-950 text-base sm:text-xl md:text-2xl font-bold leading-snug tracking-tight">&quot;{tip.example.tryThis}&quot;</p>
              </div>
            </div>
          </motion.section>
        )}
      </div>
    );
  };

  const renderArticle = (article: Article) => {
    return (
      <div className="w-full space-y-8 sm:space-y-12 pb-24">
        <article className="prose prose-slate max-w-none">
          <div 
            className="text-slate-700 text-base sm:text-lg md:text-xl leading-relaxed space-y-6 sm:space-y-8 font-normal article-content"
            dangerouslySetInnerHTML={{ __html: article.body }} 
          />
        </article>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 sm:p-10 md:p-12 bg-emerald-50/80 rounded-3xl sm:rounded-[2.5rem] text-slate-800 space-y-4 sm:space-y-6 shadow-sm relative overflow-hidden flex flex-col items-center text-center max-w-2xl mx-auto border border-emerald-100"
        >
          <div className="absolute top-0 right-0 p-6 sm:p-8 text-emerald-200/20 pointer-events-none select-none">
            <Sparkles size={120} className="sm:w-36 sm:h-36" />
          </div>
          
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-[0.25em] relative z-10">
            <Sparkles size={14} className="text-emerald-500" />
            {t("detail.article.final_thought", "FINAL THOUGHT")}
          </div>
          
          <p className="text-emerald-950 text-base sm:text-xl md:text-2xl font-bold italic leading-relaxed relative z-10 max-w-xl">
            &ldquo;{article.takeaway}&rdquo;
          </p>
        </motion.section>
      </div>
    );
  };

  const renderStory = (story: Story) => {
    return (
      <div className="w-full space-y-8 sm:space-y-12 pb-24">
        <div className="relative p-6 sm:p-10 md:p-12 bg-white rounded-3xl sm:rounded-[2.5rem] border border-white/60 shadow-sm overflow-hidden group hover:border-amber-200 transition-all duration-300">
          <div className="absolute -top-6 -right-6 p-6 sm:p-8 text-amber-100/50 pointer-events-none select-none">
            <MessageCircle size={100} strokeWidth={1} className="sm:w-36 sm:h-36" />
          </div>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 leading-snug sm:leading-tight tracking-tight relative z-10 italic">
            &ldquo;{story.quote}&rdquo;
          </p>
        </div>

        <div className="space-y-6 sm:space-y-8 text-slate-700 text-base sm:text-lg md:text-xl leading-relaxed font-normal">
          {story.story.map((para, i) => (
            <motion.p 
              key={i} 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * i }}
            >
              {para}
            </motion.p>
          ))}
        </div>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-6 sm:p-10 md:p-12 bg-amber-50/80 rounded-3xl sm:rounded-[2.5rem] border border-amber-100 space-y-4 sm:space-y-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-6 sm:p-8 text-amber-200/25 pointer-events-none select-none">
            <Sparkles size={80} className="sm:w-24 sm:h-24" />
          </div>
          <h3 className="text-amber-700 font-bold text-xs uppercase tracking-[0.25em] relative z-10">{t("detail.story.reflection_label")}</h3>
          <p className="text-amber-950 font-bold text-lg sm:text-2xl md:text-3xl leading-snug sm:leading-[1.3] tracking-tight italic relative z-10">
            &ldquo;{story.highlight}&rdquo;
          </p>
        </motion.section>

        <section className="p-6 sm:p-8 md:p-10 bg-white rounded-3xl sm:rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h3 className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] mb-3">{t("detail.story.note_label")}</h3>
          <p className="text-slate-700 text-sm sm:text-base md:text-lg font-medium leading-relaxed">
            {story.takeaway}
          </p>
        </section>
      </div>
    );
  };

  const renderMyth = (myth: Myth) => {
    return (
      <div className="w-full space-y-8 sm:space-y-12 pb-24">
        <motion.section 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 15 }}
          className="bg-indigo-600 rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-10 md:p-12 shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-6 sm:p-8 text-white/10 pointer-events-none select-none">
            <Sparkles size={100} className="sm:w-36 sm:h-36" />
          </div>
          <h2 className="text-[10px] sm:text-xs font-bold text-indigo-200 uppercase tracking-[0.3em] mb-3 sm:mb-5 relative z-10">{t("detail.myth.truth_label")}</h2>
          <p className="text-white text-xl sm:text-3xl md:text-4xl font-black leading-snug sm:leading-tight tracking-tight relative z-10">{myth.truth}</p>
        </motion.section>

        <article className="p-6 sm:p-10 md:p-12 bg-white rounded-3xl sm:rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6 sm:space-y-8">
          <h3 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-[0.3em]">{t("detail.myth.explanation_label")}</h3>
          <div 
            className="text-slate-700 text-base sm:text-lg md:text-xl leading-relaxed space-y-6 sm:space-y-8 font-normal article-content"
            dangerouslySetInnerHTML={{ __html: myth.explanation }} 
          />
        </article>

        <motion.section 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 sm:p-10 md:p-12 bg-indigo-50/70 rounded-3xl sm:rounded-[2.5rem] text-slate-800 space-y-4 sm:space-y-6 shadow-sm relative overflow-hidden flex flex-col items-center text-center max-w-2xl mx-auto border border-indigo-100"
        >
          <div className="absolute top-0 right-0 p-6 sm:p-8 text-indigo-200/20 pointer-events-none select-none">
            <Sparkles size={100} className="sm:w-36 sm:h-36" />
          </div>
          
          <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase tracking-[0.25em] relative z-10">
            <Sparkles size={14} className="text-indigo-500" />
            {t("detail.myth.insight_label", "KEY INSIGHT")}
          </div>
          
          <p className="text-indigo-950 text-base sm:text-xl md:text-2xl font-bold italic leading-relaxed relative z-10 max-w-xl">
            &ldquo;{myth.takeaway}&rdquo;
          </p>
        </motion.section>
      </div>
    );
  };

  return (
    <PremiumLayout 
      title={resource.title}
      onBack={() => {
        if (router) {
          router.push(withLang(`/resources/${concern}/${type}`));
        } else if (typeof window !== 'undefined') {
          window.location.href = withLang(`/resources/${concern}/${type}`);
        }
      }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
        {/* Custom scoped article styles */}
        <style dangerouslySetInnerHTML={{ __html: `
          .article-content p {
            margin-bottom: 1.5rem;
            line-height: 1.8;
            color: #334155;
          }
          .article-content h2 {
            font-weight: 900;
            font-size: 1.5rem;
            color: #0f172a;
            margin-top: 2.5rem;
            margin-bottom: 1rem;
            letter-spacing: -0.025em;
            line-height: 1.25;
          }
          .article-content h3 {
            font-weight: 900;
            font-size: 1.25rem;
            color: #1e293b;
            margin-top: 2rem;
            margin-bottom: 0.75rem;
            letter-spacing: -0.025em;
          }
          .article-content ul, .article-content ol {
            margin-bottom: 1.75rem;
            padding-left: 1.25rem;
          }
          .article-content li {
            margin-bottom: 0.75rem;
            line-height: 1.6;
            color: #475569;
          }
          .article-content strong {
            font-weight: 900;
            color: #0f172a;
          }
          .article-content blockquote {
            border-left: 4px solid #cbd5e1;
            padding-left: 1.25rem;
            margin: 2rem 0;
            font-style: italic;
            color: #64748b;
            font-size: 1.15rem;
            line-height: 1.6;
          }
          .article-content .pullquote {
            border-left: 5px solid #6366f1;
            padding: 1.25rem 1.25rem;
            margin: 2rem 0;
            font-style: italic;
            color: #0f172a;
            font-size: 1.2rem;
            font-weight: 800;
            line-height: 1.5;
            background-color: #f8fafc;
            border-radius: 0 1.25rem 1.25rem 0;
          }
          .article-content .keybox {
            background-color: #f0fdf4;
            border: 1.5px solid #bbf7d0;
            padding: 1.25rem;
            border-radius: 1.5rem;
            margin: 2rem 0;
          }
          .article-content .keybox-title {
            font-weight: 900;
            color: #14532d;
            font-size: 1.1rem;
            display: block;
            margin-bottom: 1rem;
          }
          .article-content .keybox ul {
            list-style: none;
            padding-left: 0;
            margin-bottom: 0;
          }
          .article-content .keybox li {
            position: relative;
            padding-left: 1.5rem;
            color: #166534;
            font-weight: 700;
            margin-bottom: 0.6rem;
          }
          .article-content .keybox li::before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #22c55e;
            font-weight: 900;
          }
          .article-content .myth-fact {
            background-color: #eff6ff;
            border-left: 5px solid #3b82f6;
            padding: 1.25rem;
            margin: 2rem 0;
            border-radius: 0 1.25rem 1.25rem 0;
          }
          .article-content .myth-fact h3 {
            margin-top: 0;
            margin-bottom: 0.5rem;
            color: #1e3a8a;
            font-size: 1.15rem;
          }
          .article-content .myth-explanation {
            font-size: 1rem;
            color: #334155;
            line-height: 1.7;
          }
          .article-content .myth-sources {
            font-size: 0.8rem;
            color: #64748b;
            margin-top: 1.5rem;
            padding-top: 0.75rem;
            border-top: 1px dashed #cbd5e1;
          }
          @media (min-width: 640px) {
            .article-content p {
              margin-bottom: 2rem;
            }
            .article-content h2 {
              font-size: 2rem;
              margin-top: 3.5rem;
              margin-bottom: 1.5rem;
            }
            .article-content h3 {
              font-size: 1.5rem;
              margin-top: 2.5rem;
              margin-bottom: 1rem;
            }
            .article-content ul, .article-content ol {
              margin-bottom: 2.5rem;
              padding-left: 2rem;
            }
            .article-content blockquote {
              border-left-width: 8px;
              padding-left: 2.5rem;
              margin: 3rem 0;
              font-size: 1.5rem;
            }
            .article-content .pullquote {
              border-left-width: 8px;
              padding: 1.5rem 2.5rem;
              margin: 3rem 0;
              font-size: 1.6rem;
              border-radius: 0 2rem 2rem 0;
            }
            .article-content .keybox {
              padding: 2.5rem;
              border-radius: 2.5rem;
              margin: 3rem 0;
              border-width: 2px;
            }
            .article-content .keybox-title {
              font-size: 1.25rem;
              margin-bottom: 1.5rem;
            }
            .article-content .keybox li {
              padding-left: 2rem;
            }
            .article-content .myth-fact {
              border-left-width: 8px;
              padding: 1.5rem 2rem;
              margin: 2.5rem 0;
              border-radius: 0 2rem 2rem 0;
            }
            .article-content .myth-fact h3 {
              font-size: 1.25rem;
            }
            .article-content .myth-explanation {
              font-size: 1.125rem;
              line-height: 1.8;
            }
          }
        `}} />
        {resource.type === 'tips' && renderTip(resource as Tip)}
        {resource.type === 'articles' && renderArticle(resource as Article)}
        {resource.type === 'stories' && renderStory(resource as Story)}
        {resource.type === 'myths' && renderMyth(resource as Myth)}
      </div>
    </PremiumLayout>
  );
}

export default function ResourceDetailPage({ params }: { params: Promise<{ concern: string; type: string; id: string }> }) {
  const { concern, type, id } = use(params);

  return (
    <I18nextProvider i18n={i18n}>
      <ResourceDetailInner concern={concern} type={type} id={id} />
    </I18nextProvider>
  );
}
