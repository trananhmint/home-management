import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Building2, Users, FileText, Settings, Menu, LogOut, Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { Button } from '../components/ui/button';
import { authService } from '../services/AuthService';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { path: '/', icon: Home, label: 'Tổng quan' },
    { path: '/houses', icon: Building2, label: 'Nhà trọ' },
    { path: '/tenants', icon: Users, label: 'Khách thuê' },
    { path: '/receipts', icon: FileText, label: 'Hoá đơn' },
    { path: '/settings', icon: Settings, label: 'Cài đặt' },
  ];

  const handleSignOut = async () => {
    await authService.signOut();
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-0 md:w-16'
        } bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
          {sidebarOpen && (
            <h1 className="text-lg font-medium text-sidebar-foreground">
              Quản lý nhà trọ
            </h1>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent'
                } ${!sidebarOpen && 'justify-center'}`}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border space-y-2">
          <Button
            variant="ghost"
            className={`w-full ${!sidebarOpen && 'px-0'} text-sidebar-foreground hover:bg-sidebar-accent justify-start`}
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            {sidebarOpen && <span className="ml-3">{theme === 'dark' ? 'Sáng' : 'Tối'}</span>}
          </Button>
          <Button
            variant="ghost"
            className={`w-full ${!sidebarOpen && 'px-0'} text-sidebar-foreground hover:bg-sidebar-accent justify-start`}
            onClick={handleSignOut}
          >
            <LogOut className="h-5 w-5" />
            {sidebarOpen && <span className="ml-3">Đăng xuất</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
