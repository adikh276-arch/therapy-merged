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

const MeaningScreen = ({ data, onChange, onNext }: Props) => {
  const { t } = useTranslation();
  return (
    <div className="space-y-10">
      <header className="space-y-4 text-center">
        <h1 className="text-3xl font-extrabold text-slate-900 leading-tight">
          {t('meaning.title')}
        </h1>
        <p className="text-slate-500 text-base font-medium leading-relaxed">
          {t('meaning.p1')}
        </p>
      </header>

      <div className="space-y-8 w-full">
        <ActivityInput
          label={t('meaning.input1_label')}
          value={data.enjoyBecause}
          onChange={(v) => onChange({ enjoyBecause: v })}
          placeholder={t('meaning.input1_placeholder')}
        />
        <ActivityInput
          label={t('meaning.input2_label')}
          value={data.feelsMore}
          onChange={(v) => onChange({ feelsMore: v })}
          placeholder={t('meaning.input2_placeholder')}
        />
        <ActivityInput
          label={t('meaning.input3_label')}
          value={data.remindsOf}
          onChange={(v) => onChange({ remindsOf: v })}
          placeholder={t('meaning.input3_placeholder')}
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onNext}
        className="w-full py-5 rounded-[2rem] bg-primary text-primary-foreground font-black text-lg shadow-xl shadow-primary/20 hover:shadow-2xl transition-all flex items-center justify-center gap-3"
      >
        {t('meaning.button')}
        <ArrowRight size={20} />
      </motion.button>
    </div>
  );
};

export default MeaningScreen;
