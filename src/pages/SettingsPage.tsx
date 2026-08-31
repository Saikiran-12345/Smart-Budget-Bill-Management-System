import React from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import { SUPPORTED_CURRENCIES } from '../constants/defaultSettings';
import { Settings, Moon, Sun, Bell, Volume2, Save } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { settings, updateSettings } = useApp();
  const { theme, toggleTheme } = useTheme();

  const currencyOptions = SUPPORTED_CURRENCIES.map((c) => ({
    label: c.label,
    value: c.symbol,
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Application Settings"
        description="Configure display currency, theme modes, notification rules, and budget alert preferences."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* General Preferences */}
        <Card title="General Preferences" subtitle="Currency and localization">
          <div className="space-y-4">
            <Select
              label="Primary Currency Symbol"
              value={settings.currencySymbol}
              options={currencyOptions}
              onChange={(e) => updateSettings({ currencySymbol: e.target.value })}
            />

            <div className="flex items-center justify-between pt-2">
              <div>
                <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Theme Mode</h4>
                <p className="text-xs text-slate-500">Toggle between light and dark UI themes.</p>
              </div>
              <Button variant="outline" size="sm" onClick={toggleTheme} icon={theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}>
                {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
              </Button>
            </div>
          </div>
        </Card>

        {/* Budget Alert Threshold Rules */}
        <Card title="Notification & Budget Alert Thresholds" subtitle="Configure automated alert triggers">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="enableBudgetAlerts"
                checked={settings.enableBudgetAlerts}
                onChange={(e) => updateSettings({ enableBudgetAlerts: e.target.checked })}
                className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
              />
              <label htmlFor="enableBudgetAlerts" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Enable In-App Budget Threshold Alerts
              </label>
            </div>

            <div className="pl-6 space-y-2 text-xs">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.budgetAlert50}
                  onChange={(e) => updateSettings({ budgetAlert50: e.target.checked })}
                />
                Alert when budget reaches 50%
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.budgetAlert75}
                  onChange={(e) => updateSettings({ budgetAlert75: e.target.checked })}
                />
                Alert when budget reaches 75%
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.budgetAlert90}
                  onChange={(e) => updateSettings({ budgetAlert90: e.target.checked })}
                />
                Alert when budget reaches 90%
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.budgetAlert100}
                  onChange={(e) => updateSettings({ budgetAlert100: e.target.checked })}
                />
                Alert when budget is exceeded (100%+)
              </label>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
