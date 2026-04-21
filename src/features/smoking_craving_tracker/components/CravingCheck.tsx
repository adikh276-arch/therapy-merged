import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveCheckIn } from "@/lib/checkInStorage";
import { ClockArrowUp } from "lucide-react";
import { useTranslation } from "react-i18next";


const BreathingCircle = () => (
  <div className="flex items-center justify-center my-8">
    <div className="relative w-32 h-32 flex items-center justify-center">
      <div className="absolute inset-0 rounded-full bg-accent-sage/30 animate-breathe" />
      <div className="absolute inset-4 rounded-full bg-accent-sage/20 animate-breathe" style={{ animationDelay: "0.5s" }} />
    </div>
  </div>
);

type StepProps = {
  onNext: (value?: string) => void;
  value?: string;
};

const StepButton = ({
  label,
  selected,
  onClick,
  variant = "primary",
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  variant?: "primary" | "sage" | "amber";
}) => {
  const baseClasses =
    "w-full min-h-[52px] rounded-button font-heading font-semibold text-lg transition-all duration-200 ease-in-out active:scale-[1.02]";

  const variantClasses = selected
    ? variant === "sage"
      ? "bg-accent-sage text-foreground"
      : variant === "amber"
        ? "bg-accent-amber text-foreground"
        : "bg-primary text-primary-foreground"
    : "bg-card text-foreground border border-border";

  return (
    <button className={`${baseClasses} ${variantClasses}`} onClick={onClick}>
      {label}
    </button>
  );
};

const ActionButton = ({ label, onClick }: { label: string; onClick: () => void }) => (
  <button
    className="w-full min-h-[52px] rounded-button font-heading font-semibold text-lg bg-primary text-primary-foreground transition-all duration-200 active:scale-[1.02]"
    onClick={onClick}
  >
    {label}
  </button>
);

const Screen1 = ({ onNext }: StepProps) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (val: string) => {
    setSelected(val);
    setTimeout(() => onNext(val), 400);
  };


  return (
    <div className="flex flex-col items-center justify-center flex-1 px-8 animate-slide-in">
      <p className="text-sm text-muted-foreground tracking-widest uppercase mb-2 animate-soft-fade">
        {t('craving_check')}
      </p>
      <p className="text-xs text-muted-foreground mb-10 animate-soft-fade-delay">
        {t('pause_before_react')}
      </p>
      <h1 className="font-heading font-semibold text-2xl text-foreground text-center mb-10 animate-soft-fade-delay leading-relaxed">
        {t('are_you_craving')}
      </h1>
      <div className="w-full max-w-xs flex flex-col gap-4 animate-soft-fade-delay-2">
        <StepButton label={t('yes')} selected={selected === "yes"} onClick={() => handleSelect("yes")} />
        <StepButton label={t('no')} selected={selected === "no"} onClick={() => handleSelect("no")} />
      </div>
    </div>

  );
};

const NoScreen1 = ({ onNext }: StepProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-8 animate-slide-in">
      <h1 className="font-heading font-semibold text-2xl text-foreground text-center mb-3 animate-soft-fade">
        {t('no_strong_craving')}
      </h1>
      <p className="text-muted-foreground text-center mb-10 animate-soft-fade-delay">
        {t('stability')}
      </p>
      <div className="w-full max-w-xs animate-soft-fade-delay-2">
        <ActionButton label={t('finish')} onClick={() => onNext()} />
      </div>
    </div>
  );
};


const NoFinal = ({ onDone }: { onDone: () => void }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-8 animate-slide-in">
      <h1 className="font-heading font-semibold text-2xl text-foreground text-center mb-3 animate-soft-fade">
        {t('quiet_strength')}
      </h1>
      <p className="text-muted-foreground text-center mb-10 animate-soft-fade-delay">
        {t('stay_steady')}
      </p>
      <div className="w-full max-w-xs animate-soft-fade-delay-2">
        <ActionButton label={t('done')} onClick={onDone} />
      </div>
    </div>
  );
};


const IntensitySlider = ({ onNext }: StepProps) => {
  const { t } = useTranslation();
  const [value, setValue] = useState(5);
  const [touched, setTouched] = useState(false);

  const getLabel = (v: number) => {
    if (v <= 3) return t('mild');
    if (v <= 6) return t('moderate');
    if (v <= 8) return t('strong');
    return t('very_strong');
  };


  const fillPercent = ((value - 1) / 9) * 100;

  return (
    <div className="flex flex-col items-center justify-center flex-1 px-8 animate-slide-in">
      <h1 className="font-heading font-semibold text-2xl text-foreground text-center mb-12 animate-soft-fade">
        {t('how_strong')}
      </h1>


      <div className="w-full max-w-xs mb-6">
        <div className="relative">
          <div
            className="absolute top-0 left-0 h-3 rounded-full pointer-events-none"
            style={{
              width: `${fillPercent}%`,
              background: `hsl(var(--slider-fill))`,
            }}
          />
          <input
            type="range"
            min={1}
            max={10}
            value={value}
            className="craving-slider w-full"
            onChange={(e) => {
              setValue(Number(e.target.value));
              setTouched(true);
            }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>1</span>
          <span>10</span>
        </div>
      </div>

      <p className="text-lg font-heading font-semibold text-foreground mb-2 animate-soft-fade" key={getLabel(value)}>
        {value}
      </p>
      <p className="text-muted-foreground animate-soft-fade mb-10" key={`label-${getLabel(value)}`}>
        {getLabel(value)}
      </p>

      {touched && (
        <div className="w-full max-w-xs animate-soft-fade">
          <ActionButton label={t('continue')} onClick={() => onNext(String(value))} />
        </div>
      )}

    </div>
  );
};

const TriggerScreen = ({ onNext }: StepProps) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<string | null>(null);
  const [otherText, setOtherText] = useState("");
  const [showOther, setShowOther] = useState(false);

  const triggers = [
    { key: "Stress", label: t('stress') },
    { key: "Boredom", label: t('boredom') },
    { key: "Habit", label: t('habit') },
    { key: "Social situation", label: t('social_situation') },
    { key: "After a meal", label: t('after_meal') }
  ];


  const handleSelect = (val: string) => {
    setSelected(val);
    setShowOther(false);
    setTimeout(() => onNext(t(val.toLowerCase().replace(/ /g, '_'))), 400);
  };

  const handleOther = () => {
    setSelected("Other");
    setShowOther(true);
  };


  return (
    <div className="flex flex-col items-center justify-center flex-1 px-8 animate-slide-in">
      <h1 className="font-heading font-semibold text-2xl text-foreground text-center mb-10 animate-soft-fade">
        {t('what_triggered')}
      </h1>
      <div className="w-full max-w-xs flex flex-col gap-3 animate-soft-fade-delay">
        {triggers.map((t_obj) => (
          <StepButton
            key={t_obj.key}
            label={t_obj.label}
            selected={selected === t_obj.key}
            onClick={() => handleSelect(t_obj.key)}
            variant="sage"
          />
        ))}
        <StepButton
          label={t('other')}
          selected={selected === "Other"}
          onClick={handleOther}
          variant="sage"
        />

        {showOther && (
          <div className="flex flex-col gap-3 animate-soft-fade">
            <textarea
              className="w-full p-4 rounded-lg border border-border bg-card text-foreground font-body resize-none focus:outline-none focus:ring-2 focus:ring-accent-sage"
              rows={3}
              placeholder={t('whats_on_mind')}
              value={otherText}
              onChange={(e) => setOtherText(e.target.value)}
              autoFocus
            />
            {otherText.trim() && (
              <ActionButton label={t('continue')} onClick={() => onNext(otherText)} />
            )}

          </div>
        )}
      </div>
    </div>
  );
};

const BreathingScreen = ({ onNext }: StepProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-8 animate-slide-in">
      <h1 className="font-heading font-semibold text-2xl text-foreground text-center mb-4 animate-soft-fade">
        {t('slow_breath')}
      </h1>
      <BreathingCircle />
      <p className="text-muted-foreground text-center mb-10 animate-soft-fade-delay">
        {t('no_act_immediately')}
      </p>
      <div className="w-full max-w-xs animate-soft-fade-delay-2">
        <ActionButton label={t('continue')} onClick={() => onNext()} />
      </div>
    </div>
  );
};


const ChoiceScreen = ({ onNext }: StepProps) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (val: string) => {
    setSelected(val);
    setTimeout(() => onNext(val), 400);
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 px-8 animate-slide-in">
      <h1 className="font-heading font-semibold text-2xl text-foreground text-center mb-10 animate-soft-fade">
        {t('what_choice')}
      </h1>
      <div className="w-full max-w-xs flex flex-col gap-4 animate-soft-fade-delay">
        <StepButton label={t('didnt_act')} selected={selected === "didnt"} onClick={() => handleSelect("didnt")} variant="amber" />
        <StepButton label={t('acted')} selected={selected === "acted"} onClick={() => handleSelect("acted")} variant="amber" />
        <StepButton label={t('still_deciding')} selected={selected === "deciding"} onClick={() => handleSelect("deciding")} variant="amber" />
      </div>
    </div>
  );
};


const YesFinal = ({ choice, onDone }: { choice: string; onDone: () => void }) => {
  const { t } = useTranslation();
  const messages: Record<string, { title: string; sub: string }> = {
    didnt: { title: t('handled_urge'), sub: t('real_progress') },
    acted: { title: t('its_okay'), sub: t('awareness_begins') },
    deciding: { title: t('paused_instead'), sub: t('pause_powerful') },
  };

  const msg = messages[choice] || messages.deciding;

  return (
    <div className="flex flex-col items-center justify-center flex-1 px-8 animate-slide-in">
      <h1 className="font-heading font-semibold text-2xl text-foreground text-center mb-3 animate-soft-fade">
        {msg.title}
      </h1>
      <p className="text-muted-foreground text-center mb-10 animate-soft-fade-delay">
        {msg.sub}
      </p>
      <div className="w-full max-w-xs animate-soft-fade-delay-2">
        <ActionButton label={t('finish_checkin')} onClick={onDone} />
      </div>
    </div>
  );
};


const CravingCheck = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [path, setPath] = useState<"yes" | "no" | null>(null);
  const [intensity, setIntensity] = useState<number | undefined>();
  const [trigger, setTrigger] = useState<string | undefined>();
  const [choice, setChoice] = useState("deciding");
  const [done, setDone] = useState(false);

  const finishCheckIn = async (overrideChoice?: string) => {
    await saveCheckIn({
      craving: path === "yes",
      intensity,
      trigger,
      choice: path === "yes" ? (overrideChoice || choice) : undefined,
    });
    setDone(true);
  };


  const reset = () => {
    setStep(0);
    setPath(null);
    setIntensity(undefined);
    setTrigger(undefined);
    setChoice("deciding");
    setDone(false);
  };

  if (done) {
    return (
      <div className="min-h-dvh bg-app-gradient flex flex-col items-center justify-center px-8 animate-soft-fade">
        <p className="text-muted-foreground text-center mb-8">{t('checkin_complete')}</p>
        <div className="w-full max-w-xs transition-all duration-200 active:scale-[1.02]">
          <ActionButton label={t('back_to_home')} onClick={reset} />
        </div>
      </div>
    );
  }



  const handleStep1 = (val?: string) => {
    if (val === "yes") {
      setPath("yes");
      setStep(1);
    } else {
      setPath("no");
      setStep(1);
    }
  };

  const renderStep = () => {
    if (step === 0) return <Screen1 onNext={handleStep1} />;

    if (path === "no") {
      if (step === 1) return <NoScreen1 onNext={() => setStep(2)} />;
      if (step === 2) return <NoFinal onDone={() => finishCheckIn()} />;
    }

    if (path === "yes") {
      if (step === 1)
        return (
          <IntensitySlider
            onNext={(val) => {
              setIntensity(val ? Number(val) : undefined);
              setStep(2);
            }}
          />
        );
      if (step === 2)
        return (
          <TriggerScreen
            onNext={(val) => {
              setTrigger(val);
              setStep(3);
            }}
          />
        );
      if (step === 3) return <BreathingScreen onNext={() => setStep(4)} />;
      if (step === 4)
        return (
          <ChoiceScreen
            onNext={(val) => {
              const c = val || "deciding";
              setChoice(c);
              setStep(5);
            }}
          />
        );
      if (step === 5) return <YesFinal choice={choice} onDone={() => finishCheckIn(choice)} />;
    }

    return null;
  };

  return (
    <div className="min-h-dvh bg-app-gradient flex flex-col relative">
      {/* History button */}
      {step === 0 && (
        <button
          onClick={() => navigate("/history")}
          className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-card border border-border active:scale-95 transition-transform z-10"
          aria-label={t('view_history')}
        >
          <ClockArrowUp className="w-5 h-5 text-muted-foreground" />
        </button>

      )}
      {renderStep()}
    </div>
  );
};

export default CravingCheck;
