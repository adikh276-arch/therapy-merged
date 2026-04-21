import { useNavigate, useLocation } from 'react-router-dom';
import { CalendarDays, Clock } from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const tabs = [
    { path: '/', icon: CalendarDays, label: 'Today' },
    { path: '/history', icon: Clock, label: 'History' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border flex z-50 safe-area-pb">
      {tabs.map((tab) => {
        const active = location.pathname === tab.path;
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className={`flex-1 flex flex-col items-center py-3 gap-1 transition-colors ${
              active ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            <span className="text-[10px] font-bold">{t(tab.label)}</span>
          </button>
        );
      })}
    </nav>
  );
}
