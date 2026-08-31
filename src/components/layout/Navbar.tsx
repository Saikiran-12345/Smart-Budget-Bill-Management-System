import React from 'react';
import { Menu, Sun, Moon, Bell, LogOut, UserCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useNotificationContext } from '../../context/NotificationContext';
import { useNavigate } from 'react-router-dom';

export interface NavbarProps {
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const { user, logout, switchProfile } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { unreadCount } = useNotificationContext();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-6 dark:border-slate-800">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="hidden sm:block">
          <span className="text-xs text-slate-500 dark:text-slate-400">Local-First FinTech Engine</span>
          <span className="ml-2 rounded-md bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:text-emerald-300">
            Offline Secured
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5" />}
        </button>

        {/* Notifications Icon Button */}
        <button
          onClick={() => navigate('/notifications')}
          className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          title="Notifications"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-900" />
          )}
        </button>

        {/* Demo User Switcher Dropdown */}
        <div className="flex items-center gap-2 border-l border-slate-200 dark:border-slate-800 pl-3">
          <button
            onClick={() => switchProfile(user?.id === 'user_admin_001' ? 'user_regular_002' : 'user_admin_001')}
            className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            title="Switch Demo Role"
          >
            <UserCheck className="h-4 w-4 text-brand-600" />
            <span className="hidden lg:inline font-medium">{user?.name || 'Demo User'}</span>
          </button>

          {/* Logout Button */}
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="rounded-lg p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
            title="Logout"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
