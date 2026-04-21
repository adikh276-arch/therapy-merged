import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  LayoutDashboard, 
  Calendar, 
  TrendingUp, 
  Users, 
  Gift, 
  MessageSquare, 
  Settings,
  ChevronDown,
  ChevronRight,
  Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  name: string;
  path: string;
  icon: React.ElementType;
  children?: { name: string; path: string }[];
}

const navigation: NavItem[] = [
  { name: 'Home', path: '/', icon: Home },
  { 
    name: 'Summary', 
    path: '/summary', 
    icon: LayoutDashboard,
    children: [
      { name: 'Overview', path: '/summary/overview' },
      { name: 'Service', path: '/summary/service' },
    ]
  },
  { 
    name: 'Engagement', 
    path: '/engagement', 
    icon: Calendar,
    children: [
      { name: 'Calendar', path: '/engagement/calendar' },
      { name: 'Webinar', path: '/engagement/webinar' },
      { name: 'Surveys', path: '/engagement/surveys' },
      { name: 'Group Chat', path: '/engagement/chat' },
      { name: 'Report', path: '/engagement/report' },
    ]
  },
  { name: 'Program ROI', path: '/roi', icon: TrendingUp },
  { name: 'Employees', path: '/employees', icon: Users },
  { name: 'Rewards', path: '/rewards', icon: Gift },
  { name: 'Feedback', path: '/feedback', icon: MessageSquare },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export function Sidebar() {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>(['Summary', 'Engagement']);

  const toggleExpand = (name: string) => {
    setExpandedItems(prev => 
      prev.includes(name) 
        ? prev.filter(item => item !== name)
        : [...prev, name]
    );
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar text-sidebar-foreground flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-lg tracking-tight">MantraCare</h1>
            <p className="text-xs text-sidebar-muted">Client Success</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {navigation.map((item) => (
            <li key={item.name}>
              {item.children ? (
                <div>
                  <button
                    onClick={() => toggleExpand(item.name)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      isActive(item.path) 
                        ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                        : "text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <item.icon className="w-4 h-4" />
                      {item.name}
                    </span>
                    {expandedItems.includes(item.name) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                  {expandedItems.includes(item.name) && (
                    <ul className="mt-1 ml-7 space-y-1 border-l border-sidebar-border pl-3">
                      {item.children.map((child) => (
                        <li key={child.path}>
                          <Link
                            to={child.path}
                            className={cn(
                              "block px-3 py-2 rounded-lg text-sm transition-colors",
                              location.pathname === child.path
                                ? "text-sidebar-primary font-medium"
                                : "text-sidebar-muted hover:text-sidebar-foreground"
                            )}
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive(item.path)
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="px-3 py-2">
          <p className="text-xs text-sidebar-muted">Acme Corporation</p>
          <p className="text-xs text-sidebar-muted mt-0.5">Contract: Jan 2024 - Jan 2025</p>
        </div>
      </div>
    </aside>
  );
}
