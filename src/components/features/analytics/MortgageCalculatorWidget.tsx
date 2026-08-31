import React, { useState } from 'react';
import { Card } from '../../ui/Card';
import { Input } from '../../ui/Input';
import { MortgageCalculator } from '../../../math/mortgageCalculator';
import { formatCurrency } from '../../../math/formatters';
import { Home } from 'lucide-react';

export const MortgageCalculatorWidget: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState('5000000');
  const [interestRate, setInterestRate] = useState('8.5');
  const [tenureYears, setTenureYears] = useState('20');
  const [prepayment, setPrepayment] = useState('5000');

  const mortgage = MortgageCalculator.calculateMortgage(
    parseFloat(loanAmount) || 5000000,
    parseFloat(interestRate) || 8.5,
    parseInt(tenureYears, 10) || 20,
    parseFloat(prepayment) || 0
  );

  return (
    <Card title="Mortgage & Home Loan EMI Simulator" subtitle="Amortization schedule & pre-payment interest savings">
      <div className="space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <Input label="Loan Principal (₹)" type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} />
          <Input label="Interest Rate (% p.a.)" type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />
          <Input label="Tenure (Years)" type="number" value={tenureYears} onChange={(e) => setTenureYears(e.target.value)} />
          <Input label="Extra Monthly Prepayment (₹)" type="number" value={prepayment} onChange={(e) => setPrepayment(e.target.value)} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-xs">
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Monthly EMI</span>
            <span className="text-xl font-extrabold text-blue-700 dark:text-blue-300">{formatCurrency(mortgage.monthlyEMI)}</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Total Interest Payable</span>
            <span className="text-xl font-extrabold text-red-600 dark:text-red-400">{formatCurrency(mortgage.totalInterestPayable)}</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Pre-payment Interest Saved</span>
            <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">{formatCurrency(mortgage.prepaymentSavingsEstimate)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
