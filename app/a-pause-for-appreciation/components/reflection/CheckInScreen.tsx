import { Button } from "@/app/a-pause-for-appreciation/components/ui/button";
import { useTranslation } from "react-i18next";

interface CheckInScreenProps {
  value: string;
  onChange: (value: string) => void;
  onFinish: () => void;
}

const CheckInScreen = ({ value, onChange, onFinish }: CheckInScreenProps) => {
  const { t } = useTranslation();

  const statements = [
    t("checkin.statements.s1"),
    t("checkin.statements.s2"),
    t("checkin.statements.s3"),
    t("checkin.statements.s4"),
    t("checkin.statements.s5"),
    t("checkin.statements.s6"),
  ];

  return (
    <div className="reflection-card space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-heading font-semibold">
          {t("checkin.title")}
        </h2>
      </div>

      <div className="space-y-2.5">
        {statements.map((s) => (
          <button
            key={s}
            onClick={() => onChange(s)}
            className={`w-full text-left p-3.5 rounded-lg text-sm font-body transition-all duration-300 ${value === s
                ? "bg-primary/15 ring-1 ring-primary/40"
                : "bg-background/60 hover:bg-background/80"
              }`}
          >
            {s}
          </button>
        ))}
      </div>

      <Button onClick={onFinish} className="w-full" disabled={!value}>
        {t("checkin.finish")}
      </Button>
    </div>
  );
};

export default CheckInScreen;
