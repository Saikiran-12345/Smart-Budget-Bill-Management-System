import React, { useState } from 'react';
import { Card } from '../../ui/Card';
import { Input } from '../../ui/Input';
import { CreditCardPayoffCalculator } from '../../../math/calculators/creditCardPayoffCalculator';
import { formatCurrency } from '../../../math/formatters';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export const CreditCardPayoffWidget: React.FC = () => {
  const [balance, setBalance] = useState('50000');
  const [apr, setApr] = useState('36');
  const [fixedPay, setFixedPay] = useState('3000');

  const res = CreditCardPayoffCalculator.calculatePayoff(
    parseFloat(balance) || 50000,
    parseFloat(apr) || 36,
    parseFloat(fixedPay) || 3000
  );

  return (
    <Card title="Credit Card Minimum Payment Trap Calculator" subtitle="Compare 5% minimum payment vs fixed monthly payoff plan">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <Input label="Outstanding Credit Balance (₹)" type="number" value={balance} onChange={(e) => setBalance(e.target.value)} />
          <Input label="Annual APR (%)" type="number" value={apr} onChange={(e) => setApr(e.target.value)} />
          <Input label="Target Fixed Monthly Pay (₹)" type="number" value={fixedPay} onChange={(e) => setFixedPay(e.target.value)} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* Minimum Payment Box */}
          <div className="p-4 rounded-xl bg-red-50/50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/60">
            <h4 className="font-bold text-red-800 dark:text-red-300 mb-2">Minimum Payment Trap (5%)</h4>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Months to Freedom:</span>
                <span className="font-bold">{res.minimumPaymentPlan.monthsToPayoff} Months</span>
              </div>
              <div className="flex justify-between">
                <span>Total Interest Paid:</span>
                <span className="font-bold text-red-600">{formatCurrency(res.minimumPaymentPlan.totalInterestPaid)}</span>
              </div>
            </div>
          </div>

          {/* Fixed Payment Box */}
          <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/60">
            <h4 className="font-bold text-emerald-800 dark:text-emerald-300 mb-2">Fixed Monthly Payoff Plan</h4>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Months to Freedom:</span>
                <span className="font-bold text-emerald-700">{res.fixedPaymentPlan.monthsToPayoff} Months</span>
              </div>
              <div className="flex justify-between">
                <span>Total Interest Paid:</span>
                <span className="font-bold text-emerald-600">{formatCurrency(res.fixedPaymentPlan.totalInterestPaid)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-xs font-semibold text-emerald-900 dark:text-emerald-300 flex justify-between items-center">
          <span>Fixed Plan Interest Savings: {formatCurrency(res.interestSavedWithFixedPlan)}</span>
          <span>Time Saved: {res.monthsSavedWithFixedPlan} Months</span>
        </div>
      </div>
    </Card>
  );
};
