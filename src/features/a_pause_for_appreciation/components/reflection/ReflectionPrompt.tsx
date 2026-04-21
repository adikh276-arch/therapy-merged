import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "react-i18next";

interface ReflectionPromptProps {
  step: number;
  total: number;
  prompt: string;
  example: string;
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
}

const ReflectionPrompt = ({ step, total, prompt, example, value, onChange, onNext }: ReflectionPromptProps) => {
  const { t } = useTranslation();

  return (
    <div className="reflection-card space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground font-body">
          {t("reflection.step", { step, total })}
        </p>
        <div className="flex gap-1.5">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 w-6 rounded-full transition-colors duration-300 ${i < step ? "bg-primary" : "bg-border"
                }`}
            />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-base font-heading font-semibold leading-relaxed" style={{ textAlign: "justify" }}>
          {prompt}
        </p>
        <p className="text-xs italic text-muted-foreground">{example}</p>
      </div>

      <Textarea
        placeholder={t("reflection.placeholder")}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[120px] resize-none bg-background/60 text-sm"
      />

      <Button onClick={onNext} className="w-full" disabled={!value.trim()}>
        {step === total ? t("reflection.finish") : t("reflection.next")}
      </Button>
    </div>
  );
};

export default ReflectionPrompt;
