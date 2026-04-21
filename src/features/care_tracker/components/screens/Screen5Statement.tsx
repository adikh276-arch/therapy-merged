import React, { useMemo } from "react";
import MobileShell from "@/components/MobileShell";
import ContinueButton from "@/components/ContinueButton";
import { POSITIVE_STATEMENTS, SUPPORTIVE_STATEMENTS } from "@/lib/selfcare-data";
import { useTranslation } from "react-i18next";

interface Screen5Props {
  didSelfCare: boolean;
  onContinue: () => void;
}

const Screen5Statement = ({ didSelfCare, onContinue }: Screen5Props) => {
  const { t } = useTranslation();

  const { statement, index } = useMemo(() => {
    const list = didSelfCare ? POSITIVE_STATEMENTS : SUPPORTIVE_STATEMENTS;
    const idx = Math.floor(Math.random() * list.length);
    return { statement: list[idx], index: idx };
  }, [didSelfCare]);

  const translatedStatement = didSelfCare
    ? t(`data.positiveStatements.${index}`)
    : t(`data.supportiveStatements.${index}`);

  return (
    <MobileShell>
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <div className="text-6xl mb-6">{didSelfCare ? "🌿" : "🤍"}</div>
        <p className="font-display text-xl font-semibold leading-relaxed tracking-tight px-4">
          {translatedStatement || statement}
        </p>
      </div>
      <ContinueButton onClick={onContinue} />
    </MobileShell>
  );
};

export default Screen5Statement;
