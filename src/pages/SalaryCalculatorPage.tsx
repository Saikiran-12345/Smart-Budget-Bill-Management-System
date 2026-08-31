import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { SalaryNetTakeHomeEngine } from '../math/calculators/salaryNetTakeHomeEngine';
import { formatCurrency } from '../math/formatters';
import { Banknote, ShieldCheck } from 'lucide-react';

export const SalaryCalculatorPage: React.FC = () => {
  const [ctc, setCtc] = useState('1800000');
  const [basicPct, setBasicPct] = useState('50');

  const res = SalaryNetTakeHomeEngine.calculateTakeHome(
    parseFloat(ctc) || 0,
    parseFloat(basicPct) || 50
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Gross CTC to Monthly Take-Home Salary Calculator</h1>
        <p className="text-xs text-slate-500">Calculate PF deductions, Professional Tax, TDS, and net monthly take-home salary</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1" title="Salary Structure">
          <div className="space-y-4">
            <Input label="Annual Gross CTC (₹)" type="number" value={ctc} onChange={(e) => setCtc(e.target.value)} />
            <Input label="Basic Salary (% of CTC)" type="number" value={basicPct} onChange={(e) => setBasicPct(e.target.value)} />
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs">
              <span className="text-slate-400 font-semibold uppercase block">Gross Monthly Salary</span>
              <span className="text-xl font-extrabold text-slate-900 dark:text-slate-100">{formatCurrency(res.grossMonthlySalary)}</span>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs">
              <span className="text-slate-400 font-semibold uppercase block">Total Monthly Deductions</span>
              <span className="text-xl font-extrabold text-red-600 dark:text-red-400">-{formatCurrency(res.totalMonthlyDeductions)}</span>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs">
              <span className="text-slate-400 font-semibold uppercase block">Net Monthly Take-Home</span>
              <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">{formatCurrency(res.netMonthlyTakeHome)}</span>
            </div>
          </div>

          <Card title="Monthly Deductions Breakdown">
            <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              <div className="py-2.5 flex justify-between">
                <span>Employee PF (Provident Fund 12% basic):</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">-{formatCurrency(res.pfDeductionMonthly)}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span>Professional Tax (PT):</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">-{formatCurrency(res.professionalTaxMonthly)}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span>Estimated Monthly TDS Tax:</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">-{formatCurrency(res.tdsTaxMonthly)}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
