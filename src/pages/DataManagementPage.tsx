import React, { useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { StatCard } from '../components/ui/StatCard';
import { StorageService } from '../services/storageService';
import { ExportImportService } from '../services/exportImportService';
import { useApp } from '../context/AppContext';
import { Download, Upload, RotateCcw, Trash2, HardDrive, CheckCircle2, AlertTriangle } from 'lucide-react';

export const DataManagementPage: React.FC = () => {
  const { refreshAllData } = useApp();
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const quotaInfo = StorageService.getStorageQuotaInfo();

  const handleExportJSON = () => {
    const backup = ExportImportService.exportFullData();
    const jsonStr = JSON.stringify(backup, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `smart_budget_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        const success = ExportImportService.importFullData(json);
        if (success) {
          setImportStatus('Data successfully imported and verified!');
          refreshAllData();
        } else {
          setImportStatus('Import failed. Invalid JSON structure.');
        }
      } catch (err) {
        setImportStatus('Error reading file. Ensure it is valid JSON.');
      }
    };
    reader.readAsText(file);
  };

  const handleResetDemo = () => {
    if (window.confirm('Reset all financial data back to factory demo state?')) {
      ExportImportService.resetToDemoData();
      refreshAllData();
      setImportStatus('Demo dataset restored.');
    }
  };

  const handleClearAll = () => {
    if (window.confirm('WARNING: Permanently erase ALL local storage data?')) {
      ExportImportService.clearAllData();
      refreshAllData();
      setImportStatus('All data cleared.');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Data Management & Backup"
        description="Local storage backup export, JSON data import, quota diagnostics, and data reset controls."
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="LocalStorage Used"
          value={`${quotaInfo.usedKB} KB`}
          subtitle={`Estimated ${quotaInfo.usagePercentage}% of browser quota`}
          icon={<HardDrive className="h-5 w-5" />}
          iconBgColor="bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
        />
        <StatCard
          title="Database Status"
          value="Healthy"
          subtitle="Local-First Storage Engine"
          icon={<CheckCircle2 className="h-5 w-5" />}
          iconBgColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
        />
        <StatCard
          title="Cloud Dependencies"
          value="Zero"
          subtitle="100% Client-Side Privacy"
          icon={<CheckCircle2 className="h-5 w-5" />}
          iconBgColor="bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400"
        />
      </div>

      {importStatus && (
        <div className="p-4 rounded-xl bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 text-xs font-semibold text-brand-800 dark:text-brand-300">
          {importStatus}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Export Card */}
        <Card title="Export Backup JSON" subtitle="Download complete local database snapshot">
          <p className="text-xs text-slate-500 mb-4">
            Exports incomes, expenses, bills, payments, budgets, savings goals, and settings into a standardized JSON file.
          </p>
          <Button variant="primary" icon={<Download className="h-4 w-4" />} onClick={handleExportJSON}>
            Export Database JSON
          </Button>
        </Card>

        {/* Import Card */}
        <Card title="Import Backup JSON" subtitle="Restore local database from file">
          <p className="text-xs text-slate-500 mb-4">
            Upload a previously exported backup file to restore records. Data validation is performed before importing.
          </p>
          <label className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-semibold cursor-pointer hover:bg-slate-700">
            <Upload className="h-4 w-4" />
            <span>Select JSON File</span>
            <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
          </label>
        </Card>
      </div>

      {/* Danger Zone */}
      <Card title="Factory Reset & Clear Data" className="border-red-200 dark:border-red-900/60">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Reset Demo State</h4>
            <p className="text-xs text-slate-500">Restore factory sample records (20+ income/expense entries, sample bills).</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" icon={<RotateCcw className="h-4 w-4" />} onClick={handleResetDemo}>
              Reset Demo Data
            </Button>
            <Button variant="danger" size="sm" icon={<Trash2 className="h-4 w-4" />} onClick={handleClearAll}>
              Clear Local Storage
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
