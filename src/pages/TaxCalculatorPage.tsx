import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { TaxRegimeOptimizerEngine } from '../math/calculators/taxRegimeOptimizerEngine';
import { formatCurrency } from '../math/formatters';

export const TaxCalculatorPage: React.FC = () => {
  const [salary, setSalary] = useState('1500000');
  const [sec80c, setSec80c] = useState('150000');
  const [sec80d, setSec80d] = useState('25000');

  const res = TaxRegimeOptimizerEngine.compareRegimes(
    parseFloat(salary) || 0,
    parseFloat(sec80c) || 0,
    parseFloat(sec80d) || 0
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Old vs New Tax Regime Comparator</h1>
        <p className="text-xs text-slate-500">Side-by-side tax slab comparison & recommended regime selection</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1" title="Income & Deduction Inputs">
          <div className="space-y-4">
            <Input label="Gross Annual Income (₹)" type="number" value={salary} onChange={(e) => setSalary(e.target.value)} />
            <Input label="Section 80C Deductions (₹)" type="number" value={sec80c} onChange={(e) => setSec80c(e.target.value)} />
            <Input label="Section 80D Insurance (₹)" type="number" value={sec80d} onChange={(e) => setSec80d(e.target.value)} />
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs space-y-1">
              <span className="font-bold text-slate-800 dark:text-slate-200">Old Tax Regime</span>
              <div className="flex justify-between">
                <span>Taxable Income:</span>
                <span className="font-semibold">{formatCurrency(res.oldRegime.taxableIncome)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax Payable:</span>
                <span className="font-bold text-red-600">{formatCurrency(res.oldRegime.totalTaxPayable)}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs space-y-1">
              <span className="font-bold text-slate-800 dark:text-slate-200">New Tax Regime</span>
              <div className="flex justify-between">
                <span>Taxable Income:</span>
                <span className="font-semibold">{formatCurrency(res.newRegime.taxableIncome)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax Payable:</span>
                <span className="font-bold text-red-600">{formatCurrency(res.newRegime.totalTaxPayable)}</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-xs font-semibold text-emerald-900 dark:text-emerald-300 flex justify-between items-center">
            <span>Recommended Tax Regime: {res.recommendedRegime === 'NEW' ? 'New Tax Regime' : 'Old Tax Regime'}</span>
            <span>Net Tax Saved: {formatCurrency(res.taxSavingsAmount)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
