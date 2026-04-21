'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Home, BookOpen, Wrench, HeartPulse, Compass } from 'lucide-react';

const nav = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Tools', href: '/tools', icon: Wrench },
  { label: 'Learn', href: '/learn', icon: BookOpen },
  { label: 'Check-ins', href: '/check-ins', icon: HeartPulse },
  { label: 'Explore', href: '/explore', icon: Compass },
];

export function BottomNav() {
  const pathname = usePathname();
  const { t } = useTranslation();

  const isActive = (href: string) => {
    if (href === '/') return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <nav className="bottom-nav" role="navigation" aria-label="Main navigation">
      <div className="bottom-nav-inner">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-tab ${active ? 'active' : ''}`}
              aria-label={t(item.label)}
            >
              <div className="nav-tab-icon">
                <Icon size={active ? 22 : 21} strokeWidth={active ? 2.5 : 1.8} />
              </div>
              <span>{t(item.label)}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
