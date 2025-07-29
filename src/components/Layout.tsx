import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleSidebarToggle = () => {
    if (isMobile) {
      setMobileNavOpen(!mobileNavOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={handleSidebarToggle}
        isMobile={isMobile}
        mobileNavOpen={mobileNavOpen}
      />
      <Topbar
        sidebarCollapsed={sidebarCollapsed}
        onMobileNavToggle={() => setMobileNavOpen(!mobileNavOpen)}
        isMobile={isMobile}
      />
      
      <main className={`transition-all duration-300 pt-16 ${
        isMobile ? 'ml-0' : (sidebarCollapsed ? 'ml-16' : 'ml-64')
      }`}>
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}