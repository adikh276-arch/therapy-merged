import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Settings as SettingsIcon, User, Bell, Shield, Building } from 'lucide-react';

const Settings = () => {
  const settingsCategories = [
    { name: 'Profile', icon: User, description: 'Manage your account details' },
    { name: 'Notifications', icon: Bell, description: 'Configure alert preferences' },
    { name: 'Security', icon: Shield, description: 'Password and access settings' },
    { name: 'Organization', icon: Building, description: 'Company settings and branding' },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your dashboard preferences and account settings
        </p>
      </div>

      <div className="max-w-2xl">
        <div className="space-y-3">
          {settingsCategories.map((category) => (
            <button 
              key={category.name}
              className="w-full executive-card p-5 flex items-center gap-4 hover:bg-muted/50 transition-colors text-left"
            >
              <div className="p-2 rounded-lg bg-primary/10">
                <category.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-foreground">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </div>
              <SettingsIcon className="w-4 h-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
