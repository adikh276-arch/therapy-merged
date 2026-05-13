import { useTranslation } from "react-i18next";
interface Props {
  active: number;
  onNavigate: (dot: number) => void;
}

export default function NavigationDots({ active, onNavigate }: Props) {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-center gap-3 mt-8" role="navigation" aria-label={t("screen_navigation")}>
      {[0, 1, 2, 3].map((i) => (
        <button
          key={i}
          className={`nav-dot ${active === i ? "active" : ""}`}
          onClick={() => onNavigate(i)}
          aria-label={`Go to screen ${i + 1}`}
          aria-current={active === i ? "step" : undefined}
        />
      ))}
    </div>
  );
}
