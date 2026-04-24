import { useNavigate } from "react-router-dom";
import { Heart, Wind, Eye, Dumbbell, MessageCircleHeart, ChevronRight, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

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
    <div className="flex flex-col items-center py-6 pb-24">
      <div className="w-full max-w-lg space-y-8">
        <header className="space-y-4">
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
            <Sparkles size={14} />
            {t("slow_down")}
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 leading-tight">
            {t("app_title")}
          </h1>
          <p className="text-slate-500 text-base font-medium leading-relaxed">
            {t("app_subtitle")}
          </p>
        </header>

        <div className="space-y-4">
          <h2 className="text-lg font-black text-slate-800 uppercase tracking-wider px-2">
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
                className="w-full text-left p-6 rounded-[2.5rem] bg-white border-2 border-slate-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all flex items-center gap-5 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <tip.icon className="w-6 h-6 text-slate-400 group-hover:text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-800 text-base group-hover:text-primary transition-colors">{tip.title}</h3>
                  <p className="text-slate-400 text-xs font-medium leading-relaxed mt-1 line-clamp-2">{tip.preview}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            ))}
          </div>
        </div>

        <p className="text-center text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-12 px-8 leading-relaxed opacity-60">
          {t("support_footer")}
        </p>
      </div>
    </div>
  );
};

export default Index;
