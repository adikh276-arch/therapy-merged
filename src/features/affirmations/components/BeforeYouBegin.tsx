import React from "react";
import { useTranslation } from "react-i18next";

interface BeforeYouBeginProps {
  onBegin: () => void;
}

const BeforeYouBegin: React.FC<BeforeYouBeginProps> = ({ onBegin }) => {
  const { t } = useTranslation();

  return (
    <div className="flex  flex-col items-center justify-center px-6 py-12">
      <div className="w-full w-full space-y-8">
        <div className="text-center">
          <span className="mb-6 inline-block text-3xl">🌿</span>
          <h1 className="font-serif text-3xl font-medium tracking-tight text-foreground">
            {t("common.beforeYouBegin")}
          </h1>
        </div>

        <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
          <p>{t("common.introText1")}</p>
          <p>{t("common.introText2")}</p>
          <p className="font-medium text-foreground">
            {t("common.noRightWay")}
          </p>
          <div className="space-y-1 text-foreground/80">
            <p>{t("common.takeTime")}</p>
            <p>{t("common.breatheNaturally")}</p>
            <p>{t("common.noRush")}</p>
          </div>
          <p>{t("common.meaningfulMoment")}</p>
          <p className="pt-2 text-center font-serif text-lg text-foreground">
            {t("common.readyToBegin")}
          </p>
        </div>

        <button
          onClick={onBegin}
          className="mt-4 w-full rounded-lg bg-primary py-4 text-base font-medium text-primary-foreground  transition-all duration-300 hover: active:scale-[0.98]"
        >
          {t("common.begin")}
        </button>
      </div>
    </div>
  );
};

export default BeforeYouBegin;
