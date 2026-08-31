import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { DebtConsolidationEMIEngine } from '../math/calculators/debtConsolidationEMIEngine';
import { formatCurrency } from '../math/formatters';

export const DebtConsolidationPage: React.FC = () => {
  const [bal1, setBal1] = useState('60000');
  const [rate1, setRate1] = useState('36');
  const [emi1, setEmi1] = useState('5000');

  const [bal2, setBal2] = useState('140000');
  const [rate2, setRate2] = useState('16');
  const [emi2, setEmi2] = useState('5500');

  const sampleDebts = [
    { debtId: '1', name: 'Credit Card A', balance: parseFloat(bal1) || 0, aprPercent: parseFloat(rate1) || 0, monthlyEMI: parseFloat(emi1) || 0 },
    { debtId: '2', name: 'Personal Loan B', balance: parseFloat(bal2) || 0, aprPercent: parseFloat(rate2) || 0, monthlyEMI: parseFloat(emi2) || 0 },
  ];

  const res = DebtConsolidationEMIEngine.calculateConsolidation(sampleDebts);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Multi-Loan Refinancing & Debt Consolidation</h1>
        <p className="text-xs text-slate-500">Calculate single-loan refinancing EMI reduction and lifetime interest savings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1" title="Existing Debt Accounts">
          <div className="space-y-4">
            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-bold text-xs">Credit Card 1 (36% APR)</span>
              <Input label="Balance (₹)" type="number" value={bal1} onChange={(e) => setBal1(e.target.value)} />
              <Input label="Monthly EMI (₹)" type="number" value={emi1} onChange={(e) => setEmi1(e.target.value)} />
            </div>

            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-bold text-xs">Personal Loan 2 (16% APR)</span>
              <Input label="Balance (₹)" type="number" value={bal2} onChange={(e) => setBal2(e.target.value)} />
              <Input label="Monthly EMI (₹)" type="number" value={emi2} onChange={(e) => setEmi2(e.target.value)} />
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs">
              <span className="text-slate-400 font-semibold uppercase block">Combined Current EMI</span>
              <span className="text-xl font-extrabold text-red-600 dark:text-red-400">{formatCurrency(res.currentCombinedEMI)}</span>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs">
              <span className="text-slate-400 font-semibold uppercase block">New Refinanced EMI (11.5%)</span>
              <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">{formatCurrency(res.newRefinancedEMI)}</span>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs">
              <span className="text-slate-400 font-semibold uppercase block">Monthly EMI Reduction</span>
              <span className="text-xl font-extrabold text-brand-600 dark:text-brand-400">-{formatCurrency(res.monthlyEMIReduction)}/mo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
