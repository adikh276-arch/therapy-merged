import { useState } from 'react';
import { formatIndianNumber } from '@/lib/formatting';
import { LifetimeStats } from '@/hooks/useSmokeLogs';

interface LifetimeImpactStripProps {
  stats: LifetimeStats | null;
}

const LifetimeImpactStrip = ({ stats }: LifetimeImpactStripProps) => {
  const [popup, setPopup] = useState<string | null>(null);

  const boxes = [
    {
      id: 'life',
      value: stats ? `${formatIndianNumber(stats.lifeDays)} days` : '—',
      label: 'of life affected',
      color: 'text-destructive',
      info: 'Based on 11 min per cigarette. Source: NHS Stop Smoking, 2023',
    },
    {
      id: 'money',
      value: stats ? formatIndianNumber(stats.totalSpend) : '—',
      label: 'spent (approx)',
      color: 'text-warning',
      info: 'Based on your cost per cigarette × total',
    },
    {
      id: 'packs',
      value: stats ? formatIndianNumber(stats.totalPacks) : '—',
      label: 'packs smoked',
      color: 'text-foreground',
      info: 'Total packs based on your pack size',
    },
  ];

  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2">
        {boxes.map(box => (
          <button
            key={box.id}
            onClick={() => setPopup(popup === box.id ? null : box.id)}
            className="bg-card border border-border rounded-2xl p-3 text-center tap-scale"
          >
            <div className={`font-heading text-[22px] font-bold leading-tight ${box.color}`}>
              {box.value}
            </div>
            <div className="font-body text-[11px] text-muted-foreground mt-1">{box.label}</div>
          </button>
        ))}
      </div>
      {!stats && (
        <p className="text-center font-body text-[11px] text-muted-foreground mt-2">Complete setup to see impact</p>
      )}
      {popup && (
        <div className="absolute left-2 right-2 -bottom-14 bg-card border border-border rounded-xl p-3 toast-shadow z-10">
          <p className="font-body text-xs text-body">
            {boxes.find(b => b.id === popup)?.info}
          </p>
        </div>
      )}
    </div>
  );
};

export default LifetimeImpactStrip;
