import { useTranslation, Trans } from "react-i18next";

interface Props { onNext: () => void }

const WaveDiagram = () => {
  const { t } = useTranslation();
  // 3 cycles sine wave: each cycle ~80px wide, total ~240px
  const points: string[] = [];
  for (let x = 0; x <= 240; x += 1) {
    const y = 40 + 25 * Math.sin((x / 80) * 2 * Math.PI);
    points.push(`${x + 20},${y}`);
  }
  const pathD = "M" + points.join(" L");

  const cycles = t("s3.wave.cycles", { returnObjects: true }) as string[];

  return (
    <svg viewBox="0 0 280 100" className="w-full" style={{ maxHeight: 110 }}>
      {/* Y-axis labels */}
      <text x="4" y="20" fontSize="8" fill="#8a9cbc">{t("s3.wave.light")}</text>
      <text x="4" y="72" fontSize="8" fill="#8a9cbc">{t("s3.wave.deep")}</text>

      {/* Wave */}
      <path d={pathD} fill="none" stroke="#4a7ee8" strokeWidth="2" strokeLinecap="round" />

      {/* Cycle 2 trough – groggy (x=140, y=65) */}
      <line x1="140" y1="65" x2="140" y2="12" stroke="#e05050" strokeWidth="1" strokeDasharray="3,2" />
      <circle cx="140" cy="65" r="4" fill="#e05050" />
      <text x="126" y="10" fontSize="9" fill="#e05050">{t("s3.wave.groggy")}</text>

      {/* Cycle 3 trough – fresh (x=220, y=65) */}
      <line x1="220" y1="65" x2="220" y2="12" stroke="#28c878" strokeWidth="1" strokeDasharray="3,2" />
      <circle cx="220" cy="65" r="4" fill="#28c878" />
      <text x="210" y="10" fontSize="9" fill="#28c878">{t("s3.wave.fresh")}</text>

      {/* X-axis labels */}
      <text x="50" y="95" fontSize="10" fill="#8a9cbc" textAnchor="middle">{cycles[0]}</text>
      <text x="130" y="95" fontSize="10" fill="#8a9cbc" textAnchor="middle">{cycles[1]}</text>
      <text x="210" y="95" fontSize="10" fill="#8a9cbc" textAnchor="middle">{cycles[2]}</text>
    </svg>
  );
};

const Screen3Groggy = ({ onNext }: Props) => {
  const { t } = useTranslation();
  const disruptors = t("s3.disruptors", { returnObjects: true }) as any[];

  return (
    <div className="flex flex-col h-full px-5 py-2 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
      <h1 className="text-lg font-semibold mb-1" style={{ color: "#1a2a4a" }}>
        {t("s3.title")}
      </h1>
      <p className="text-xs leading-relaxed mb-3" style={{ color: "#3a5070" }}>
        <Trans i18nKey="s3.p1">{t("dragged_out_of_deep_sleep_by_an_alarm_your_brain_l")}<span className="font-bold" style={{ color: "#4a7ee8" }}>sleep inertia</span>.
        </Trans>
      </p>

      <div className="sleep-card p-3 mb-3">
        <WaveDiagram />
      </div>

      <p className="text-xs font-medium mb-2" style={{ color: "#4a6098" }}>
        {t("s3.disruptors_title")}
      </p>

      <div className="grid grid-cols-2 gap-2 mb-3">
        {Array.isArray(disruptors) && disruptors.map((d, i) => (
          <div key={i} className="disruptor-card p-2.5">
            <span className="text-sm">{d.emoji}</span>
            <p className="text-[11px] font-medium mt-1" style={{ color: "#1a2a4a" }}>{d.text}</p>
            <p className="text-[10px]" style={{ color: "#8a9cbc" }}>{d.sub}</p>
          </div>
        ))}
      </div>

      <p className="text-xs italic text-center mb-3" style={{ color: "#8a9cbc" }}>
        {t("s3.italic")}
      </p>

      <button className="sleep-cta mt-auto shrink-0" onClick={onNext}>
        {t("s3.button")}
      </button>
    </div>
  );
};

export default Screen3Groggy;
