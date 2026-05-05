import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles, Lightbulb, MessageCircle, BookOpen, Clock, Tag, HelpCircle, Quote } from 'lucide-react';
import { PremiumLayout } from '../../../components/shared/PremiumLayout';
import sampleData from '../data/sample_data.json';
import { Resource, Tip, Article, Story, Myth } from '../types';

const ResourceDetail = () => {
  const { concern, type, id } = useParams<{ concern: string; type: string; id: string }>();
  const navigate = useNavigate();
  
  const allResources = (sampleData as any)[type || ''] || [];
  const resource = allResources.find((r: any) => r.id === id) as Resource;

  if (!resource) {
    return (
      <PremiumLayout title="Not Found">
        <div className="flex flex-col items-center justify-center py-32 gap-6">
          <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-300">
            <HelpCircle size={40} />
          </div>
          <div className="text-center space-y-2">
            <p className="text-slate-900 font-black text-xl">Resource not found</p>
            <p className="text-slate-400 font-bold text-sm">The content you're looking for might have moved.</p>
          </div>
          <button 
            onClick={() => navigate(-1)} 
            className="px-8 py-3 bg-primary text-white font-black rounded-full shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
          >
            Go Back
          </button>
        </div>
      </PremiumLayout>
    );
  }

  const renderTip = (tip: Tip) => (
    <div className="w-full space-y-12 pb-24">
      <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[3rem] border-2 border-slate-100 p-12 shadow-sm relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-12 text-slate-50 pointer-events-none">
            <Sparkles size={120} />
        </div>
        <h2 className="text-[11px] font-black text-primary uppercase tracking-[0.4em] mb-8 flex items-center gap-2">
            <Sparkles size={14} />
            The Insight
        </h2>
        <p className="text-slate-700 text-2xl font-black leading-tight tracking-tight relative z-10">{tip.whyItHelps}</p>
      </motion.section>

      <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-10"
      >
        <div className="flex items-center justify-between px-4">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Daily Action Plan</h2>
            <span className="px-4 py-1 bg-slate-100 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-widest">
                {tip.whatYouCanDo.length} Steps
            </span>
        </div>
        
        <div className="grid gap-4">
          {tip.whatYouCanDo.map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + (i * 0.1) }}
              className="flex items-start gap-8 p-10 bg-slate-50 rounded-[3rem] border-2 border-transparent hover:bg-white hover:border-primary/20 transition-all group shadow-sm hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="w-12 h-12 rounded-2xl bg-white text-primary flex items-center justify-center shrink-0 mt-0.5 shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <CheckCircle2 size={24} strokeWidth={3} />
              </div>
              <span className="text-slate-800 text-lg font-bold leading-relaxed">{item}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {tip.example && (
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-12 bg-emerald-50 rounded-[4rem] border-2 border-emerald-100 shadow-sm space-y-10 relative overflow-hidden group"
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-100/50 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
          
          <div className="flex items-center gap-3 text-emerald-600 font-black text-[11px] uppercase tracking-[0.4em] relative z-10">
              <Lightbulb size={18} fill="currentColor" />
              Practice Example
          </div>
          <div className="grid md:grid-cols-[1fr,auto,1fr] items-center gap-10 relative z-10">
            <div className="space-y-3">
              <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">Instead of</p>
              <p className="text-emerald-900/50 text-lg font-bold leading-relaxed italic">{tip.example.instead}</p>
            </div>
            
            <div className="hidden md:flex flex-col items-center gap-1">
                <div className="w-1 h-1 rounded-full bg-emerald-200" />
                <div className="w-1 h-8 bg-gradient-to-b from-emerald-200 to-emerald-400 rounded-full" />
                <div className="w-1 h-1 rounded-full bg-emerald-400" />
            </div>

            <div className="space-y-3">
              <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em]">Try this</p>
              <p className="text-emerald-900 text-2xl font-black leading-tight tracking-tight">{tip.example.tryThis}</p>
            </div>
          </div>
        </motion.section>
      )}
    </div>
  );

  const renderArticle = (article: Article) => (
    <div className="w-full space-y-12 pb-24">


      <article className="prose prose-slate max-w-none">
        <div 
          className="text-slate-700 text-xl leading-relaxed space-y-8 font-medium article-content"
          dangerouslySetInnerHTML={{ __html: article.body }} 
        />
      </article>

      <motion.section 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-12 bg-slate-900 rounded-[4rem] text-white space-y-8 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-12 text-white/5 pointer-events-none">
            <Sparkles size={160} />
        </div>
        <div className="flex items-center gap-3 text-emerald-400 font-black text-[11px] uppercase tracking-[0.4em] relative z-10">
            <Sparkles size={18} />
            Final Thought
        </div>
        <p className="text-slate-100 text-3xl font-black italic leading-[1.3] tracking-tight relative z-10">
          "{article.takeaway}"
        </p>
      </motion.section>
    </div>
  );

  const renderStory = (story: Story) => (
    <div className="w-full space-y-16 pb-24">

        
        <div className="relative p-12 bg-white rounded-[4rem] border-2 border-slate-100 shadow-sm overflow-hidden group hover:border-amber-200 transition-all duration-500">
          <div className="absolute -top-10 -right-10 p-12 text-amber-50 pointer-events-none group-hover:text-amber-100/50 transition-colors duration-700">
            <MessageCircle size={200} strokeWidth={1} />
          </div>
          <p className="text-3xl font-black text-slate-900 leading-tight tracking-tight relative z-10 italic">
            "{story.quote}"
          </p>
        </div>


      <div className="space-y-10 text-slate-700 text-xl leading-relaxed font-bold max-w-2xl">
        {story.story.map((para, i) => (
          <motion.p 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
          >
            {para}
          </motion.p>
        ))}
      </div>

      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="p-12 bg-amber-50 rounded-[4rem] border-2 border-amber-100 space-y-6 relative overflow-hidden"
      >
         <div className="absolute top-0 right-0 p-8 text-amber-200/30">
            <Sparkles size={100} />
         </div>
        <h3 className="text-amber-600 font-black text-[11px] uppercase tracking-[0.4em] relative z-10">Something to sit with</h3>
        <p className="text-amber-900 font-black text-3xl leading-[1.3] tracking-tight italic relative z-10">
          "{story.highlight}"
        </p>
      </motion.section>

      <section className="p-12 bg-slate-50 rounded-[4rem] border-2 border-slate-100">
        <h3 className="text-slate-400 font-black text-[10px] uppercase tracking-[0.3em] mb-6">A Note from the Author</h3>
        <p className="text-slate-600 text-lg font-bold leading-relaxed">
          {story.takeaway}
        </p>
      </section>
    </div>
  );

  const renderMyth = (myth: Myth) => (
    <div className="w-full space-y-16 pb-24">


      <motion.section 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 15 }}
          className="bg-indigo-600 rounded-[4rem] p-16 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-12 text-white/10">
            <Sparkles size={200} />
        </div>
        <h2 className="text-[11px] font-black text-indigo-200 uppercase tracking-[0.5em] mb-6 relative z-10">The Scientific Truth</h2>
        <p className="text-white text-4xl font-black leading-tight tracking-tight relative z-10">{myth.truth}</p>
      </motion.section>

      <article className="p-12 bg-white rounded-[4rem] border-2 border-slate-100 shadow-sm space-y-8">
        <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">Detailed Explanation</h3>
        <div 
          className="text-slate-700 text-xl leading-relaxed space-y-8 font-medium article-content"
          dangerouslySetInnerHTML={{ __html: myth.explanation }} 
        />
      </article>

      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-12 bg-slate-900 rounded-[4rem] text-white space-y-8 shadow-2xl"
      >
        <div className="flex items-center gap-3 text-indigo-400 font-black text-[11px] uppercase tracking-[0.4em]">
            <Sparkles size={18} />
            Key Insight
        </div>
        <p className="text-indigo-100 text-3xl font-black italic leading-[1.3] tracking-tight">
          "{myth.takeaway}"
        </p>
      </motion.section>
    </div>
  );

  return (
    <PremiumLayout title={resource.title}>
      <div className="max-w-3xl mx-auto px-4">
        {resource.type === 'tips' && renderTip(resource as Tip)}
        {resource.type === 'articles' && renderArticle(resource as Article)}
        {resource.type === 'stories' && renderStory(resource as Story)}
        {resource.type === 'myths' && renderMyth(resource as Myth)}
      </div>
    </PremiumLayout>
  );
};

export default ResourceDetail;
