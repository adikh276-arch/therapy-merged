import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, BookOpen, Heart, Newspaper, HelpCircle } from 'lucide-react';
import { PremiumLayout } from '../../../components/shared/PremiumLayout';
import sampleDataEn from '../data/sample_data.json';
import { Resource } from '../types';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

const ICON_MAP: Record<string, any> = {
  tips: Heart,
  articles: Newspaper,
  stories: BookOpen,
  myths: HelpCircle
};

const COLOR_MAP: Record<string, string> = {
  tips: 'text-rose-500 bg-rose-50',
  articles: 'text-emerald-500 bg-emerald-50',
  stories: 'text-amber-500 bg-amber-50',
  myths: 'text-indigo-500 bg-indigo-50'
};

const ResourceList = () => {
  const { t } = useTranslation();
  const { t, i18n } = useTranslation();
  const { concern, type } = useParams<{ concern: string; type: string }>();
  const navigate = useNavigate();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        let data = sampleDataEn;
        const lang = i18n.language.split('-')[0]; // Simple normalization for en-US -> en
        const fullLang = i18n.language === 'zh-CN' ? 'zh-Hans' : 
                         i18n.language === 'zh-TW' ? 'zh-Hant' : i18n.language;

        if (fullLang !== 'en') {
          try {
            const localized = await import(`../data/sample_data_${fullLang}.json`);
            data = localized.default || localized;
          } catch (e) {
            // Try base lang if fullLang fails
            try {
               const baseLocalized = await import(`../data/sample_data_${lang}.json`);
               data = baseLocalized.default || baseLocalized;
            } catch (e2) {
               console.warn(`Localized data for ${fullLang} not found, falling back to English`);
            }
          }
        }
        const filtered = (data as any)[type || '']?.filter((r: any) => r.concern === concern) || [];
        setResources(filtered);
      } catch (err) {
        console.error("Failed to load resources:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [concern, type, i18n.language]);

  if (loading) {
    return (
      <PremiumLayout title={t("common.loading")}>
        <div className="flex items-center justify-center py-32">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </PremiumLayout>
    );
  }
  
  const Icon = ICON_MAP[type || 'tips'] || BookOpen;
  const colorClass = COLOR_MAP[type || 'tips'] || 'text-primary bg-primary/10';

  const title = `${t(`concerns.${concern}`)} ${t(`types.${type}`)}`;

  return (
    <PremiumLayout title={title}>
      <div className="w-full space-y-12 pb-24">
        <div className="grid gap-6">
          {resources.length > 0 ? (
            resources.map((res: Resource, i: number) => (
              <motion.button
                key={res.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, type: 'spring', damping: 20 }}
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => navigate(res.id)}
                className="w-full text-left p-8 rounded-[3rem] bg-white border-2 border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/20 transition-all flex items-center gap-8 group relative overflow-hidden"
              >
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500 ${colorClass.split(' ')[1]}`}>
                  <Icon className={`w-8 h-8 ${colorClass.split(' ')[0]}`} />
                </div>
                
                <div className="flex-1 min-w-0 space-y-1.5">
                  <h3 className="font-black text-slate-900 text-xl group-hover:text-primary transition-colors leading-tight">
                    {res.title}
                  </h3>
                  <p className="text-slate-400 text-sm font-bold leading-relaxed line-clamp-2 pr-4">
                    {res.preview}
                  </p>
                </div>
                
                <div className="w-12 h-12 rounded-full border-2 border-slate-50 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                  <ChevronRight className="w-6 h-6 text-slate-300 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                </div>
              </motion.button>
            ))
          ) : (
            <div className="py-32 text-center space-y-6 bg-slate-50 rounded-[4rem] border-2 border-dashed border-slate-200">
              <div className="text-slate-200 flex justify-center">
                <Icon size={80} strokeWidth={1} />
              </div>
              <div className="space-y-1">
                <p className="text-slate-900 font-black text-lg">{t('list.empty_title', { type })}</p>
                <p className="text-slate-400 font-bold text-sm">{t('list.empty_desc')}</p>
              </div>
            </div>
          )}
        </div>

        <footer className="pt-12 text-center">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
                {t('list.footer')}
            </p>
        </footer>
      </div>
    </PremiumLayout>
  );
};

export default ResourceList;
