import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEnergy } from "../context/EnergyContext";
import { Check, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PremiumLayout } from "../../../components/shared/PremiumLayout";

const EnergyFactors = () => {
  const { currentFactors, setCurrentFactors, currentNote, setCurrentNote, saveEntry } = useEnergy();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const factors = [
    { id: "Sleep", label: t("sleep") },
    { id: "Work / Study", label: t("work_study") },
    { id: "Stress", label: t("stress") },
    { id: "Exercise", label: t("exercise") },
    { id: "Socializing", label: t("socializing") },
    { id: "Screen Time", label: t("screen_time") },
    { id: "Health", label: t("health") },
    { id: "Rest", label: t("rest") },
    { id: "Mood", label: t("mood") },
    { id: "Anxiety", label: t("anxiety") },
  ];

  const toggleFactor = (fId: string) => {
    setCurrentFactors(
      currentFactors.includes(fId)
        ? currentFactors.filter((x) => x !== fId)
        : [...currentFactors, fId]
    );
  };

  const handleSave = async () => {
    await saveEntry();
    navigate("../summary");
  };

  return (
    <PremiumLayout 
      title={t("factors_title")}
      icon={<Sparkles className="h-6 w-6" />}
      onBack={() => {
        if (window.parent !== window) {
          window.parent.postMessage({ action: 'exit' }, 'https://web.mantracare.com');
        } else {
          window.location.href = 'https://web.mantracare.com';
        }
      }}
    >
      <div className="w-full">
        <h2 className="mb-1 text-xl font-bold text-slate-900">
          {t("what_affected")}
        </h2>
        <p className="mb-6 text-sm text-slate-400 font-medium">{t("optional")}</p>

        <div className="mb-10 grid grid-cols-2 gap-4">
          {factors.map((f, i) => {
            const selected = currentFactors?.includes(f.id);
            return (
              <motion.button
                key={f.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => toggleFactor(f.id)}
                className={`flex items-center gap-3 rounded-2xl px-5 py-4 text-sm font-bold transition-all border-2 ${selected
                    ? "border-primary bg-primary/5 text-primary shadow-sm"
                    : "border-slate-100 bg-white text-slate-600 hover:border-slate-200"
                  }`}
              >
                <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${selected ? "bg-primary text-white" : "bg-slate-100 text-transparent"}`}>
                    <Check size={14} strokeWidth={4} />
                </div>
                {f.label}
              </motion.button>
            );
          })}
        </div>

        <div className="space-y-4">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
            {t("add_note")} <span className="font-normal">({t("optional")})</span>
          </label>
          <textarea
            value={currentNote}
            onChange={(e) => setCurrentNote(e.target.value.slice(0, 120))}
            placeholder={t("note_placeholder")}
            maxLength={120}
            rows={4}
            className="w-full resize-none rounded-3xl border-2 border-slate-100 bg-white px-6 py-5 text-base text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-primary transition-all font-medium shadow-sm"
          />
          <p className="text-right text-[10px] font-black text-slate-300 uppercase tracking-widest">{(currentNote || "").length}/120</p>
        </div>

        <div className="pt-12 pb-12">
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                className="w-full py-5 rounded-[2rem] bg-primary text-primary-foreground font-black text-lg shadow-xl shadow-primary/20 hover:shadow-2xl transition-all"
            >
                {t("save_checkin")}
            </motion.button>
        </div>
      </div>
    </PremiumLayout>
  );
};

export default EnergyFactors;
