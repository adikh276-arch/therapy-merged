import { motion } from "framer-motion";
import ActivityInput from "./ActivityInput";
import { ActivityData } from "../../types/activity";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";

interface Props {
  data: ActivityData;
  onChange: (fields: Partial<ActivityData>) => void;
  onNext: () => void;
}

const RecallScreen = ({ data, onChange, onNext }: Props) => {
  const { t } = useTranslation();
  return (
    <div className="space-y-10">
      <header className="space-y-4 text-center">
        <h1 className="text-3xl font-extrabold text-slate-900 leading-tight">
          {t('recall.title')}
        </h1>
        <p className="text-slate-500 text-base font-medium leading-relaxed">
          {t('recall.p1')}
        </p>
      </header>

      <div className="space-y-8 w-full">
        <ActivityInput
          label={t('recall.input1_label')}
          value={data.activity}
          onChange={(v) => onChange({ activity: v })}
          placeholder={t('recall.input1_placeholder')}
        />
        <ActivityInput
          label={t('recall.input2_label')}
          value={data.feeling}
          onChange={(v) => onChange({ feeling: v })}
          placeholder={t('recall.input2_placeholder')}
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onNext}
        className="w-full py-5 rounded-[2rem] bg-primary text-primary-foreground font-black text-lg shadow-xl shadow-primary/20 hover:shadow-2xl transition-all flex items-center justify-center gap-3"
      >
        {t('recall.button')}
        <ArrowRight size={20} />
      </motion.button>
    </div>
  );
};

export default RecallScreen;
