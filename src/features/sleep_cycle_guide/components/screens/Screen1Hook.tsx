import { useTranslation, Trans } from "react-i18next";

interface Props { onNext: () => void }

const Screen1Hook = ({ onNext }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 text-center">
      <div className="text-5xl mb-4">😫</div>

      <h1 className="text-xl font-semibold mb-4" style={{ color: "#1a2a4a" }}>
        {t("s1.title")}
      </h1>

      <div className="text-sm leading-relaxed mb-5" style={{ color: "#3a5070" }}>
        <p className="mb-2">
          <Trans i18nKey="s1.p1">{t("it_s_not_about")}<span className="font-bold" style={{ color: "#4a7ee8" }}>how long</span> you sleep.
          </Trans>
        </p>
        <p className="mb-2">
          <Trans i18nKey="s1.p2">{t("it_s_about")}<span className="font-bold" style={{ color: "#7050d0" }}>where</span> in your sleep cycle you wake up.
          </Trans>
        </p>
        <p>{t("s1.p3")}</p>
      </div>

      <div className="insight-card w-full p-3 mb-5 text-left">
        <p className="text-xs italic" style={{ color: "#3a5070" }}>
          {t("s1.insight")}
        </p>
      </div>

      <div className="flex items-center gap-1.5 text-xs mb-5" style={{ color: "#8a9cbc" }}>
        <span className="w-1.5 h-1.5 rounded-full bg-current inline-block" />
        {t("s1.duration")}
      </div>

      <button className="sleep-cta" onClick={onNext}>
        {t("s1.button")}
      </button>
    </div>
  );
};

export default Screen1Hook;
