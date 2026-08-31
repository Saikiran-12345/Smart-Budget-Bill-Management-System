import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Wallet, ShieldCheck, ArrowRight, UserCheck } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('password');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login({ email, password })) {
      navigate('/dashboard');
    }
  };

  const handleQuickDemoLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    if (login({ email: demoEmail, password: 'password' })) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo & Header */}
        <div className="text-center">
          <div className="inline-flex rounded-2xl bg-brand-600 p-3 text-white shadow-xl mb-3">
            <Wallet className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Smart Budget & Bill System
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Local-First FinTech Application Engine
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-xl">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-600 dark:text-slate-400 mb-1">
                Demo User Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 p-2.5 focus:ring-2 focus:ring-brand-500"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-600 dark:text-slate-400 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 p-2.5 focus:ring-2 focus:ring-brand-500"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 hover:bg-brand-700 py-3 text-sm font-semibold text-white shadow-md transition-colors"
            >
              <span>Access Application Dashboard</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Demo Accounts Quick Select */}
          <div className="mt-6 border-t border-slate-100 dark:border-slate-800 pt-4">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
              Select Demo Credentials:
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleQuickDemoLogin('admin@example.com')}
                className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-800 p-2 text-left hover:bg-slate-50 dark:hover:bg-slate-800 text-xs"
              >
                <UserCheck className="h-4 w-4 text-brand-600" />
                <div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200">Admin Demo</div>
                  <div className="text-[10px] text-slate-400">admin@example.com</div>
                </div>
              </button>
              <button
                onClick={() => handleQuickDemoLogin('user@example.com')}
                className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-800 p-2 text-left hover:bg-slate-50 dark:hover:bg-slate-800 text-xs"
              >
                <UserCheck className="h-4 w-4 text-emerald-600" />
                <div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200">User Demo</div>
                  <div className="text-[10px] text-slate-400">user@example.com</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
          <span>100% Local-First Storage • No Backend Server Required</span>
        </div>
      </div>
    </div>
  );
};
