import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  FolderOpen,
  Settings,
  X,
  Smartphone,
  Zap,
  Code,
  Users,
  ChevronLeft,
  ChevronRight,
  LifeBuoy,
  BarChart2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Analytics", href: "/analytics/", icon: BarChart2 },
  { name: "Projects", href: "/projects/", icon: FolderOpen },
  { name: "Templates", href: "/templates/", icon: Code },
  { name: "Community", href: "/community/", icon: Users },
  { name: "Support", href: "/support/", icon: LifeBuoy },
  { name: "Settings", href: "/settings/", icon: Settings },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  isMobile: boolean;
  mobileNavOpen: boolean;
}

export function Sidebar({
  collapsed,
  onToggle,
  isMobile,
  mobileNavOpen,
}: SidebarProps) {
  const location = useLocation();
  const isCollapsed = isMobile ? false : collapsed;

  const sidebarContent = (
    <>
      {/* Header */}
      <div className='flex items-center justify-between p-4 border-b border-border'>
        {!isCollapsed && (
          <div className='flex items-center space-x-2'>
            {/* <div className="w-8 h-8 bg-gradient-to-r from-primary to-[hsl(242,74%,62%)] rounded-xl flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-foreground">DidrixApps</span> */}
            {/* Theme-based logo */}
            <img
              src={
                document.documentElement.classList.contains("dark")
                  ? "/Logo-dark.webp"
                  : "/Logo-light.webp"
              }
              alt='DidrixApps Logo'
              className='h-8'
            />
          </div>
        )}
        <button
          onClick={onToggle}
          className='p-2 rounded-lg hover:bg-muted transition-colors'
        >
          {isMobile ? (
            <X className='w-5 h-5' />
          ) : isCollapsed ? (
            <ChevronRight className='w-5 h-5' />
          ) : (
            <ChevronLeft className='w-5 h-5' />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className='mt-6 px-3'>
        <ul className='space-y-2'>
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  onClick={isMobile ? onToggle : undefined}
                  className={cn(
                    "flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 group",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <item.icon
                    className={cn(
                      "w-5 h-5 flex-shrink-0 transition-colors",
                      isActive
                        ? "text-primary-foreground"
                        : "text-muted-foreground group-hover:text-foreground"
                    )}
                  />
                  {!isCollapsed && (
                    <span className='ml-3 truncate'>{item.name}</span>
                  )}
                  {isActive && !isCollapsed && (
                    <div className='ml-auto w-2 h-2 bg-primary-foreground rounded-full opacity-75' />
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Section */}
      {!isCollapsed && (
        <div className='absolute bottom-4 left-4 right-4'>
          <div className='glass-card p-4 rounded-xl'>
            <div className='flex items-center space-x-3'>
              <div className='w-10 h-10 bg-gradient-to-r from-primary to-[hsl(242,74%,62%)] rounded-full flex items-center justify-center'>
                <Zap className='w-5 h-5 text-white' />
              </div>
              <div>
                <p className='text-sm font-medium'>Pro Plan</p>
                <p className='text-xs text-muted-foreground'>Unlimited apps</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );

  if (isMobile) {
    return (
      <>
        <div
          className={cn(
            "fixed inset-0 bg-black/50 z-40 transition-opacity duration-300",
            mobileNavOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          onClick={onToggle}
        />
        <div
          className={cn(
            "fixed left-0 top-0 h-full bg-card border-r border-border z-50 transition-all duration-300 glass-card w-64",
            mobileNavOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {sidebarContent}
        </div>
      </>
    );
  }

  return (
    <div
      className={cn(
        "fixed left-0 top-0 h-full bg-card border-r border-border z-40 transition-all duration-300 glass-card",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {sidebarContent}
    </div>
  );
}
