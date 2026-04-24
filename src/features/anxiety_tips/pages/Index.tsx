import { useNavigate } from "react-router-dom";
import { Heart, Wind, Eye, Dumbbell, MessageCircleHeart, ChevronRight, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { PremiumLayout } from "../../../components/shared/PremiumLayout";

const Index = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const tips = [
    {
      id: "seek-support",
      title: t("tip_seek_support"),
      preview: t("tip_seek_support_desc"),
      icon: Heart,
    },
    {
      id: "deep-breathing",
      title: t("tip_deep_breathing"),
      preview: t("tip_deep_breathing_desc"),
      icon: Wind,
    },
    {
      id: "mindfulness",
      title: t("tip_mindfulness"),
      preview: t("tip_mindfulness_desc"),
      icon: Eye,
    },
    {
      id: "muscle-relaxation",
      title: t("tip_muscle_relaxation"),
      preview: t("tip_muscle_relaxation_desc"),
      icon: Dumbbell,
    },
    {
      id: "positive-self-talk",
      title: t("tip_positive_self_talk"),
      preview: t("tip_positive_self_talk_desc"),
      icon: MessageCircleHeart,
    },
  ];

  return (
    <PremiumLayout title="Anxiety Tips">
      <div className="w-full space-y-10">
        <header className="space-y-4">
          <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.2em]">
            <Sparkles size={14} />
            {t("slow_down")}
          </div>
          <h1 className="text-4xl font-black text-slate-900 leading-tight tracking-tight">
            {t("app_title")}
          </h1>
          <p className="text-slate-500 text-base font-bold leading-relaxed max-w-md">
            {t("app_subtitle")}
          </p>
        </header>

        <div className="space-y-6">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] px-2">
            {t("relief_tips")}
          </h2>
          
          <div className="grid gap-4">
            {tips.map((tip, i) => (
              <motion.button
                key={tip.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/tip/${tip.id}`)}
                className="w-full text-left p-6 rounded-[2.5rem] bg-white border-2 border-slate-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all flex items-center gap-6 group"
              >
                <div className="w-16 h-16 rounded-3xl bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-all">
                  <tip.icon className="w-7 h-7 text-slate-300 group-hover:text-primary transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-black text-slate-800 text-lg group-hover:text-primary transition-colors leading-tight">{tip.title}</h3>
                  <p className="text-slate-400 text-xs font-bold leading-relaxed mt-1.5 line-clamp-2">{tip.preview}</p>
                </div>
                <ChevronRight className="w-6 h-6 text-slate-200 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </motion.button>
            ))}
          </div>
        </div>

        <p className="text-center text-slate-300 text-[10px] font-black uppercase tracking-[0.2em] mt-16 px-12 leading-relaxed opacity-60">
          {t("support_footer")}
        </p>
      </div>
    </PremiumLayout>
  );
};

export default Index;
