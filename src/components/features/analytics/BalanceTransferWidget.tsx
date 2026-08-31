import React from 'react';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { CreditCardBalanceTransferEngine } from '../../../math/calculators/creditCardBalanceTransferEngine';
import { formatCurrency } from '../../../math/formatters';

export const BalanceTransferWidget: React.FC = () => {
  const bt = CreditCardBalanceTransferEngine.calculateBalanceTransfer(100000, 36, 0, 12, 3);

  return (
    <Card title="0% APR Credit Card Balance Transfer Simulator" subtitle="Upfront transfer fee vs annual interest savings">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-xs">
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Interest Cost (Current Card)</span>
            <span className="text-xl font-extrabold text-red-600 dark:text-red-400">{formatCurrency(bt.currentInterestCostPromoPeriod)}</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Upfront Transfer Fee (3%)</span>
            <span className="text-xl font-extrabold text-slate-800 dark:text-slate-200">{formatCurrency(bt.upfrontTransferFeeAmount)}</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Net Savings After Fee</span>
            <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">{formatCurrency(bt.netSavingsAfterFee)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
