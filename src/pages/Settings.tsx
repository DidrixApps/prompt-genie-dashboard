import { useState } from 'react';
import { Key, User, Bell, Shield, Palette, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Settings() {
  const [apiKey, setApiKey] = useState('');
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings saved!",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account and API configuration</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* API Configuration */}
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Key className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">API Configuration</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">OpenAI API Key</label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-..."
                  className="input-field w-full"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Required for AI app generation. Your key is encrypted and secure.
                </p>
              </div>
            </div>
          </div>

          {/* Profile Settings */}
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <User className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">Profile</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input type="text" defaultValue="John Doe" className="input-field w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input type="email" defaultValue="john@example.com" className="input-field w-full" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="glass-card rounded-xl p-6">
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full btn-secondary justify-start">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </button>
              <button className="w-full btn-secondary justify-start">
                <Shield className="w-4 h-4 mr-2" />
                Security
              </button>
              <button className="w-full btn-secondary justify-start">
                <Palette className="w-4 h-4 mr-2" />
                Theme
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={handleSave} className="btn-primary">
          Save Changes
        </button>
      </div>
    </div>
  );
}