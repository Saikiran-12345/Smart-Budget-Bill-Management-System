import React, { useState } from 'react';
import { Card } from '../../ui/Card';
import { Input } from '../../ui/Input';
import { Badge } from '../../ui/Badge';
import { LoanComparisonCalculatorEngine } from '../../../math/calculators/loanComparisonCalculatorEngine';
import { formatCurrency } from '../../../math/formatters';

export const LoanComparisonWidget: React.FC = () => {
  const [lender1, setLender1] = useState('HDFC Bank');
  const [rate1, setRate1] = useState('8.5');
  const [fee1, setFee1] = useState('5000');

  const [lender2, setLender2] = useState('SBI Bank');
  const [rate2, setRate2] = useState('8.3');
  const [fee2, setFee2] = useState('10000');

  const comparison = LoanComparisonCalculatorEngine.compareLoans(
    { lenderName: lender1 || 'Bank A', principal: 1000000, rate: parseFloat(rate1) || 8.5, tenureMonths: 60, fee: parseFloat(fee1) || 5000 },
    { lenderName: lender2 || 'Bank B', principal: 1000000, rate: parseFloat(rate2) || 8.3, tenureMonths: 60, fee: parseFloat(fee2) || 10000 }
  );

  return (
    <Card title="Loan Offer Side-by-Side Comparison" subtitle="Interest rate, processing fee & total outflow analysis">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Option 1 */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-800 dark:text-slate-200">Option 1: {comparison.option1.lenderName}</span>
              {comparison.cheaperOption === comparison.option1.lenderName && <Badge variant="success">Cheaper</Badge>}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Input label="Interest Rate (%)" type="number" step="0.1" value={rate1} onChange={(e) => setRate1(e.target.value)} />
              <Input label="Processing Fee (₹)" type="number" value={fee1} onChange={(e) => setFee1(e.target.value)} />
            </div>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1">
              <div className="flex justify-between">
                <span>Monthly EMI:</span>
                <span className="font-bold">{formatCurrency(comparison.option1.monthlyEMI)}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Outflow:</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">{formatCurrency(comparison.option1.totalOutflow)}</span>
              </div>
            </div>
          </div>

          {/* Option 2 */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-800 dark:text-slate-200">Option 2: {comparison.option2.lenderName}</span>
              {comparison.cheaperOption === comparison.option2.lenderName && <Badge variant="success">Cheaper</Badge>}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Input label="Interest Rate (%)" type="number" step="0.1" value={rate2} onChange={(e) => setRate2(e.target.value)} />
              <Input label="Processing Fee (₹)" type="number" value={fee2} onChange={(e) => setFee2(e.target.value)} />
            </div>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1">
              <div className="flex justify-between">
                <span>Monthly EMI:</span>
                <span className="font-bold">{formatCurrency(comparison.option2.monthlyEMI)}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Outflow:</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">{formatCurrency(comparison.option2.totalOutflow)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-xs font-semibold text-emerald-900 dark:text-emerald-300 flex justify-between items-center">
          <span>Recommended Cheaper Lender: {comparison.cheaperOption}</span>
          <span>Net Outflow Savings: {formatCurrency(comparison.totalSavings)}</span>
        </div>
      </div>
    </Card>
  );
};
