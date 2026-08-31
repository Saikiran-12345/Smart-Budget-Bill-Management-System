import React from 'react';
import { Card } from '../../ui/Card';
import { HomeLoanInterestDeductionEngine } from '../../../math/calculators/homeLoanInterestDeductionEngine';
import { formatCurrency } from '../../../math/formatters';
import { Home, ShieldCheck } from 'lucide-react';

export const HomeLoanTaxWidget: React.FC = () => {
  const jointTax = HomeLoanInterestDeductionEngine.calculateJointDeduction(350000, 200000, 50, 30);

  return (
    <Card title="Joint Home Loan Tax Benefit (Sec 24b & 80C)" subtitle="Maximized tax savings split for co-borrowers">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-slate-800 dark:text-slate-200 block">Primary Borrower (50% Share)</span>
            <div className="flex justify-between">
              <span>Sec 24(b) Interest Deduction:</span>
              <span className="font-bold text-emerald-600">{formatCurrency(jointTax.borrower1Deduction.section24bInterest)}</span>
            </div>
            <div className="flex justify-between">
              <span>Sec 80C Principal Deduction:</span>
              <span className="font-bold text-emerald-600">{formatCurrency(jointTax.borrower1Deduction.section80cPrincipal)}</span>
            </div>
            <div className="flex justify-between font-bold pt-1 border-t border-slate-100 dark:border-slate-800 text-brand-600">
              <span>Tax Saved:</span>
              <span>{formatCurrency(jointTax.borrower1Deduction.totalTaxSaved)}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-slate-800 dark:text-slate-200 block">Co-Borrower / Spouse (50% Share)</span>
            <div className="flex justify-between">
              <span>Sec 24(b) Interest Deduction:</span>
              <span className="font-bold text-emerald-600">{formatCurrency(jointTax.borrower2Deduction.section24bInterest)}</span>
            </div>
            <div className="flex justify-between">
              <span>Sec 80C Principal Deduction:</span>
              <span className="font-bold text-emerald-600">{formatCurrency(jointTax.borrower2Deduction.section80cPrincipal)}</span>
            </div>
            <div className="flex justify-between font-bold pt-1 border-t border-slate-100 dark:border-slate-800 text-brand-600">
              <span>Tax Saved:</span>
              <span>{formatCurrency(jointTax.borrower2Deduction.totalTaxSaved)}</span>
            </div>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-xs font-semibold text-emerald-900 dark:text-emerald-300 flex justify-between items-center">
          <span>Total Combined Joint Home Loan Tax Savings:</span>
          <span className="text-sm font-extrabold">{formatCurrency(jointTax.combinedTaxSavings)}</span>
        </div>
      </div>
    </Card>
  );
};
