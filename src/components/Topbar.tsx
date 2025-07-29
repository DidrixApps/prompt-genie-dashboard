import { useState } from 'react';
import { Moon, Sun, Bell, User, Search, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TopbarProps {
  sidebarCollapsed: boolean;
  onThemeToggle: () => void;
  isDark: boolean;
}

export function Topbar({ sidebarCollapsed, onThemeToggle, isDark }: TopbarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header
      className={cn(
        'fixed top-0 right-0 h-16 bg-card/80 backdrop-blur-xl border-b border-border z-30 transition-all duration-300',
        sidebarCollapsed ? 'left-16' : 'left-64'
      )}
    >
      <div className="flex items-center justify-between h-full px-6">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search projects, templates..."
              className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button
            onClick={onThemeToggle}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-muted-foreground" />
            ) : (
              <Moon className="w-5 h-5 text-muted-foreground" />
            )}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg hover:bg-muted transition-colors relative"
            >
              <Bell className="w-5 h-5 text-muted-foreground" />
              <div className="absolute top-1 right-1 w-3 h-3 bg-primary rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">3</span>
              </div>
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-12 w-80 glass-card rounded-xl p-4 shadow-xl">
                <h3 className="font-semibold mb-3">Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">New AI model available</p>
                      <p className="text-xs text-muted-foreground">GPT-4 Turbo is now available for app generation</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">App deployed successfully</p>
                      <p className="text-xs text-muted-foreground">Your "Todo App" is now live</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-[hsl(242,74%,62%)] rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">Pro Plan</p>
              </div>
            </button>

            {showProfile && (
              <div className="absolute right-0 top-12 w-64 glass-card rounded-xl p-4 shadow-xl">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-[hsl(242,74%,62%)] rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">John Doe</p>
                    <p className="text-sm text-muted-foreground">john@example.com</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg mb-3">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="text-sm">Pro Plan</span>
                  </div>
                  <span className="text-xs text-muted-foreground">∞ apps</span>
                </div>

                <div className="space-y-1">
                  <button className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-muted transition-colors">
                    Account Settings
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-muted transition-colors">
                    Billing
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-muted transition-colors">
                    Help & Support
                  </button>
                  <hr className="my-2 border-border" />
                  <button className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-muted transition-colors text-destructive">
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}