import React from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface ContinueButtonProps {
  onClick: () => void;
  disabled?: boolean;
  label?: string;
}

const ContinueButton = ({ onClick, disabled, label }: ContinueButtonProps) => {
  const { t } = useTranslation();
  return (
    <div className="mt-8 pb-4">
      <Button
        onClick={onClick}
        disabled={disabled}
        className="w-full rounded-2xl py-6 text-base font-semibold font-display tracking-wide shadow-md transition-all active:scale-[0.98]"
        size="lg"
      >
        {label || t('common.continue')}
      </Button>
    </div>
  );
};

export default ContinueButton;
