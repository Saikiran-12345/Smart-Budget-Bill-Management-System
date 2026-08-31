import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { PresumptiveTaxService } from '../services/presumptiveTaxService';
import { formatCurrency } from '../math/formatters';

export const PresumptiveTaxPage: React.FC = () => {
  const [receipts, setReceipts] = useState('4500000');
  const [expenses, setExpenses] = useState('1200000');

  const res = PresumptiveTaxService.getSection44ADAEstimate(
    parseFloat(receipts) || 0,
    parseFloat(expenses) || 0
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Section 44ADA Presumptive Tax Calculator</h1>
        <p className="text-xs text-slate-500">Calculate 50% flat presumptive income for freelancers, consultants & IT professionals</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1" title="Professional Receipts">
          <div className="space-y-4">
            <Input label="Gross Receipts (₹)" type="number" value={receipts} onChange={(e) => setReceipts(e.target.value)} />
            <Input label="Actual Expenses (₹)" type="number" value={expenses} onChange={(e) => setExpenses(e.target.value)} />
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs">
              <span className="text-slate-400 font-semibold uppercase block">Gross Receipts</span>
              <span className="text-xl font-extrabold text-slate-900 dark:text-slate-100">{formatCurrency(res.grossProfessionalReceiptsINR)}</span>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs">
              <span className="text-slate-400 font-semibold uppercase block">Presumptive Taxable Profit</span>
              <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">{formatCurrency(res.presumptiveIncome50PercentINR)}</span>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs">
              <span className="text-slate-400 font-semibold uppercase block">Tax Saved vs Bookkeeping</span>
              <span className="text-xl font-extrabold text-brand-600 dark:text-brand-400">{formatCurrency(res.taxSavedVsNormalAccountingINR)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
