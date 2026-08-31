import React, { useState } from 'react';
import { Card } from '../../ui/Card';
import { Input } from '../../ui/Input';
import { CompoundInterestCalculator } from '../../../math/calculators/compoundInterestCalculator';
import { formatCurrency } from '../../../math/formatters';
import { PieChart, TrendingUp } from 'lucide-react';

export const CompoundInterestWidget: React.FC = () => {
  const [principal, setPrincipal] = useState('100000');
  const [monthlyDeposit, setMonthlyDeposit] = useState('5000');
  const [rate, setRate] = useState('9');
  const [years, setYears] = useState('5');

  const result = CompoundInterestCalculator.calculate(
    parseFloat(principal) || 100000,
    parseFloat(monthlyDeposit) || 5000,
    parseFloat(rate) || 9,
    parseInt(years, 10) || 5
  );

  return (
    <Card title="Compound Interest Calculator" subtitle="Monthly deposit & compounding yield schedule">
      <div className="space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <Input label="Initial Principal (₹)" type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
          <Input label="Monthly Deposit (₹)" type="number" value={monthlyDeposit} onChange={(e) => setMonthlyDeposit(e.target.value)} />
          <Input label="Interest Rate (% p.a.)" type="number" value={rate} onChange={(e) => setRate(e.target.value)} />
          <Input label="Compounding Years" type="number" value={years} onChange={(e) => setYears(e.target.value)} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs">
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Total Cash Invested</span>
            <span className="text-xl font-extrabold text-slate-800 dark:text-slate-200">{formatCurrency(result.initialPrincipal + result.totalDeposits)}</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Total Interest Earned</span>
            <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">{formatCurrency(result.totalInterestEarned)}</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Maturity Balance</span>
            <span className="text-xl font-extrabold text-brand-600 dark:text-brand-400">{formatCurrency(result.finalBalance)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
