import { ArrowLeft } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";

interface Props {
  onStart: () => void;
}

const OverviewScreen = ({ onStart }: Props) => {
  const { t } = useTranslation();
  return (
    <div className=" gradient-calm flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 pt-6 pb-4">
        <button
          className="w-10 h-10 rounded-full bg-transparent  flex items-center justify-center"
          onClick={() => {
            if (window.parent !== window) {
              window.parent.postMessage({ action: 'exit' }, 'https://web.mantracare.com');
            } else {
              window.history.back();
            }
          }}
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">
          {t("relax")}
        </h1>
        <LanguageSelector />
      </header>


      {/* Content */}
      <div className="flex-1 px-6 pb-8 flex flex-col">
        {/* About Section */}
        <section className="bg-transparent rounded-lg p-6  mb-5 animate-fade-in">
          <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-3">
            {t("about_technique")}
          </p>
          <p className="text-slate-600 leading-relaxed text-[15px]">
            {t("technique_description")}
          </p>
        </section>

        {/* Steps Section */}
        <section className="bg-card rounded-lg p-6  animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-4">
            {t("how_to_practice")}
          </p>
          <ul className="space-y-3">
            {[
              t("inhale_4s"),
              t("hold_4s"),
              t("exhale_4s"),
              t("hold_4s"),
              t("repeat_cycle"),
            ].map((step, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                  {i + 1}
                </span>
                <span className="text-slate-600 text-[15px]">{step}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Spacer */}
        <div className="flex-1 min-h-8" />

        {/* CTA */}
        <button
          onClick={onStart}
          className="w-full py-4 rounded-lg bg-primary text-primary-foreground font-semibold text-base  hover:brightness-105 active:scale-[0.98] transition-all duration-200"
        >
          {t("start_breathing")}
        </button>
      </div>
    </div>
  );
};

export default OverviewScreen;
