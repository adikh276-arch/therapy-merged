import React from 'react';
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

interface TipDetailLayoutProps {
  title: string;
  whyItHelps: string;
  whatYouCanDo: string[];
  extra?: React.ReactNode;
}

const TipDetailLayout = ({ title, whyItHelps, whatYouCanDo, extra }: TipDetailLayoutProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen gradient-calm">
      <div className="max-w-md mx-auto px-5 py-6 pb-12">
        {/* Back */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1 text-muted-foreground mb-6 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-semibold">{t("back")}</span>
        </button>

        <h1 className="text-2xl font-extrabold text-foreground mb-6 animate-fade-in">{title}</h1>

        {/* Why It Helps */}
        <section className="mb-6 animate-fade-in" style={{ animationDelay: "80ms", animationFillMode: "both" }}>
          <h2 className="text-base font-bold text-foreground mb-2">{t("why_it_helps")}</h2>
          <p className="text-muted-foreground text-[15px] leading-relaxed">{whyItHelps}</p>
        </section>

        {/* What You Can Do */}
        <section className="mb-6 animate-fade-in" style={{ animationDelay: "160ms", animationFillMode: "both" }}>
          <h2 className="text-base font-bold text-foreground mb-3">{t("what_you_can_do")}</h2>
          <ul className="space-y-2.5">
            {whatYouCanDo.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-foreground text-[15px] leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {extra}
      </div>
    </div>
  );
};

export default TipDetailLayout;
