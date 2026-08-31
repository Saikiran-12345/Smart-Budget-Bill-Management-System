import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
  LayoutDashboard,
  TrendingUp,
  CreditCard,
  Grid,
  Receipt,
  CheckSquare,
  ListOrdered,
  PieChart,
  Target,
  FileText,
  Calendar,
  Bell,
  BarChart3,
  Database,
  Settings,
  Activity,
  LogOut,
  Moon,
  Sun,
  Flame,
  ShieldCheck,
  Percent,
  Building,
  GraduationCap,
  Calculator,
  Coins,
  Plane,
  Home,
  Briefcase,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
    { label: 'Income', path: '/income', icon: <TrendingUp className="h-4 w-4" /> },
    { label: 'Expenses', path: '/expenses', icon: <CreditCard className="h-4 w-4" /> },
    { label: 'Categories', path: '/categories', icon: <Grid className="h-4 w-4" /> },
    { label: 'Bills & Reminders', path: '/bills', icon: <Receipt className="h-4 w-4" /> },
    { label: 'Bill Payments', path: '/bill-payments', icon: <CheckSquare className="h-4 w-4" /> },
    { label: 'Transactions Ledger', path: '/transactions', icon: <ListOrdered className="h-4 w-4" /> },
    { label: 'Budget Planner', path: '/budgets', icon: <PieChart className="h-4 w-4" /> },
    { label: 'Savings Goals', path: '/savings', icon: <Target className="h-4 w-4" /> },
    { label: 'FIRE Planner', path: '/fire', icon: <Flame className="h-4 w-4" /> },
    { label: 'Loans & Debts', path: '/loans', icon: <Percent className="h-4 w-4" /> },
    { label: 'Real Estate ROI', path: '/real-estate', icon: <Building className="h-4 w-4" /> },
    { label: 'Rent vs Buy', path: '/rent-vs-buy', icon: <Home className="h-4 w-4" /> },
    { label: 'Presumptive Tax 44ADA', path: '/presumptive-tax', icon: <Briefcase className="h-4 w-4" /> },
    { label: 'College Fund', path: '/college-fund', icon: <GraduationCap className="h-4 w-4" /> },
    { label: 'Salary Take-Home', path: '/salary-calc', icon: <Calculator className="h-4 w-4" /> },
    { label: 'Tax Regime', path: '/tax-calc', icon: <Calculator className="h-4 w-4" /> },
    { label: 'Crypto Yield', path: '/crypto-yield', icon: <Coins className="h-4 w-4" /> },
    { label: 'Vacation Planner', path: '/vacation-planner', icon: <Plane className="h-4 w-4" /> },
    { label: 'Monthly Summary', path: '/summary', icon: <FileText className="h-4 w-4" /> },
    { label: 'Calendar View', path: '/calendar', icon: <Calendar className="h-4 w-4" /> },
    { label: 'Notifications', path: '/notifications', icon: <Bell className="h-4 w-4" /> },
    { label: 'Financial Analytics', path: '/analytics', icon: <BarChart3 className="h-4 w-4" /> },
    { label: 'Reports & Export', path: '/reports', icon: <Database className="h-4 w-4" /> },
    { label: 'Data Backup', path: '/data-management', icon: <Database className="h-4 w-4" /> },
    { label: 'Activity Logs', path: '/activity-log', icon: <Activity className="h-4 w-4" /> },
    { label: 'Settings', path: '/settings', icon: <Settings className="h-4 w-4" /> },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-screen sticky top-0 flex-shrink-0 z-30 transition-colors">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
        <div className="rounded-xl bg-brand-600 p-2 text-white shadow-md">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <div>
          <h1 className="font-bold text-slate-900 dark:text-slate-100 text-sm leading-tight">Smart Budget</h1>
          <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase block">Bill Manager</span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-xl transition-all ${
                isActive
                  ? 'bg-brand-50 text-brand-600 dark:bg-brand-950/50 dark:text-brand-400 font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
        <button
          type="button"
          onClick={toggleTheme}
          className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
        >
          <span className="flex items-center gap-2">
            {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-500" />}
            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </span>
        </button>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/60 text-xs">
          <div className="truncate max-w-[140px]">
            <span className="font-bold text-slate-800 dark:text-slate-200 block truncate">{user?.name}</span>
            <span className="text-[10px] text-slate-400 uppercase font-semibold">{user?.role}</span>
          </div>
          <button
            type="button"
            onClick={logout}
            title="Log out"
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
