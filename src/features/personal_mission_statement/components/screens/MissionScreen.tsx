import { useState, useEffect } from "react";
import { PremiumComplete } from "../../../../components/shared/PremiumComplete";
import { MissionData } from "../../types/mission";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { query } from "../../lib/db";
import { motion } from "framer-motion";
import { Pencil, Save, Home } from "lucide-react";

interface MissionScreenProps {
  data: MissionData;
  onEdit: () => void;
  onHome: () => void;
  onChange: (partial: Partial<MissionData>) => void;
}

const MissionScreen = ({ data, onEdit, onHome, onChange }: MissionScreenProps) => {
  const { t } = useTranslation();

  const valuesText = data.values
    .map(v => t(v))
    .join(", ")
    .replace(/, ([^,]*)$/, `${t('mission_and')}$1`) || t('mission_my_values');

  const [statement, setStatement] = useState("");

  useEffect(() => {
    setStatement(
      `${t('mission_i_choose')}${valuesText.toLowerCase()},\n${t('mission_and_to_be')}${data.beingSomeoneWho.toLowerCase()},\n${t('mission_so_my_life')}${data.lifeFeelMore.toLowerCase()}.`
    );
  }, [t, valuesText, data.beingSomeoneWho, data.lifeFeelMore]);

  const handleSave = async () => {
    try {
      const userId = sessionStorage.getItem("user_id");
      if (!userId) {
        throw new Error("User not authenticated");
      }

      await query(
        "INSERT INTO missions (user_id, statement, values) VALUES ($1, $2, $3)",
        [userId, statement, data.values]
      );

      toast.success(t('mission_saved'));
    } catch (error) {
      console.error(error);
      toast.error("Failed to save statement.");
    }
  };

  return (
    <PremiumComplete
      title={t('mission_title')}
      message={t('mission_is_reminder')}
      onRestart={onHome}
    >
      <div className="space-y-8 w-full max-w-lg mx-auto mt-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[2.5rem] border-2 border-slate-100 p-8 shadow-sm text-center relative overflow-hidden"
        >
          <textarea
            value={statement}
            onChange={(e) => setStatement(e.target.value)}
            className="w-full bg-transparent text-slate-800 text-lg font-bold rounded-2xl border-none p-0 resize-none placeholder:text-slate-300 focus:outline-none transition-all duration-200 leading-[1.7] text-center overflow-hidden"
            style={{ height: 'auto', minHeight: '120px' }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = target.scrollHeight + 'px';
            }}
          />
        </motion.div>

        <div className="space-y-4 text-slate-500 text-sm font-medium leading-relaxed text-center italic">
          <p>{t('mission_not_rule')}</p>
          <p>{t('mission_return_whenever')}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            className="py-4 bg-primary text-primary-foreground font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
          >
            <Save size={18} />
            {t('mission_save')}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onEdit}
            className="py-4 bg-white border-2 border-slate-100 text-slate-600 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-50 transition-all shadow-sm"
          >
            <Pencil size={18} />
            {t('mission_edit')}
          </motion.button>
        </div>
      </div>
    </PremiumComplete>
  );
};

export default MissionScreen;
