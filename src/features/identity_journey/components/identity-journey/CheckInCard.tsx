import { useTranslation } from "react-i18next";

interface CheckInCardProps {
  selected: number | null;
  onSelect: (index: number) => void;
}

const CheckInCard = ({ selected, onSelect }: CheckInCardProps) => {
  const { t } = useTranslation();

  const sentences = [
    t("sentence_0"),
    t("sentence_1"),
    t("sentence_2"),
    t("sentence_3"),
    t("sentence_4"),
  ];

  const ITEM_STYLES = [
    { base: "bg-violet-50 text-violet-700 hover:bg-violet-100", active: "bg-violet-500 text-white shadow-violet-200" },
    { base: "bg-amber-50 text-amber-700 hover:bg-amber-100", active: "bg-amber-500 text-white shadow-amber-200" },
    { base: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100", active: "bg-emerald-500 text-white shadow-emerald-200" },
    { base: "bg-rose-50 text-rose-700 hover:bg-rose-100", active: "bg-rose-500 text-white shadow-rose-200" },
    { base: "bg-sky-50 text-sky-700 hover:bg-sky-100", active: "bg-sky-500 text-white shadow-sky-200" },
  ];

  return (
    <div className="card-base">
      <h2 className="text-base font-bold text-foreground">{t('one_word_today')}</h2>
      <p className="text-sm text-muted-foreground mt-1">
        {t('pick_sentence')}
      </p>

      <div className="mt-4 flex flex-col gap-2.5">
        {sentences.map((text, i) => {
          const style = ITEM_STYLES[i % ITEM_STYLES.length];
          const isSelected = selected === i;

          return (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className={`w-full text-left px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 min-h-[48px] border border-transparent ${isSelected
                  ? `${style.active} shadow-lg scale-[1.02]`
                  : `${style.base} hover:scale-[1.01]`
                }`}
            >
              {text}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CheckInCard;
