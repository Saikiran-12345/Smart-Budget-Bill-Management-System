import React, { useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { NetWorthService } from '../services/financialAdviceService';
import { DebtPayoffCalculator } from '../math/debtPayoffCalculator';
import { formatCurrency } from '../math/formatters';
import { CreditCard, TrendingDown, DollarSign, Plus } from 'lucide-react';

export const LoansAndDebtsPage: React.FC = () => {
  const [strategy, setStrategy] = useState<'AVALANCHE' | 'SNOWBALL'>('AVALANCHE');
  const [extraPayment, setExtraPayment] = useState(5000);

  const sampleLiabilities = [
    { id: 'l1', liabilityName: 'HDFC Credit Card Balance', category: 'CREDIT_CARD_DEBT' as const, outstandingAmount: 45000, interestRatePercentage: 42, monthlyEMI: 4500 },
    { id: 'l2', liabilityName: 'Car Loan', category: 'CAR_LOAN' as const, outstandingAmount: 280000, interestRatePercentage: 8.5, monthlyEMI: 8500 },
    { id: 'l3', liabilityName: 'Personal Loan', category: 'PERSONAL_LOAN' as const, outstandingAmount: 120000, interestRatePercentage: 14, monthlyEMI: 5200 },
  ];

  const plan = DebtPayoffCalculator.calculatePayoffPlan(sampleLiabilities, extraPayment, strategy);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Loans, Debts & Amortization"
        description="Track active credit cards, car loans, personal loans, and simulate Debt Avalanche vs Snowball payoff strategies."
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Outstanding Debt"
          value={formatCurrency(sampleLiabilities.reduce((s, l) => s + l.outstandingAmount, 0))}
          subtitle={`${sampleLiabilities.length} active liability accounts`}
          icon={<CreditCard className="h-5 w-5" />}
          iconBgColor="bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400"
        />
        <StatCard
          title="Total Monthly EMI"
          value={formatCurrency(sampleLiabilities.reduce((s, l) => s + l.monthlyEMI, 0))}
          subtitle="Fixed monthly outflow"
          icon={<DollarSign className="h-5 w-5" />}
          iconBgColor="bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400"
        />
        <StatCard
          title="Payoff Freedom Horizon"
          value={`${plan.monthsToPayoff} Months`}
          subtitle={`Strategy: ${strategy}`}
          icon={<TrendingDown className="h-5 w-5" />}
          iconBgColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Active Liabilities Ledger" subtitle="Credit accounts & loan details">
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {sampleLiabilities.map((l) => (
              <div key={l.id} className="py-3 flex justify-between items-center text-xs">
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-200">{l.liabilityName}</h4>
                  <span className="text-slate-400">{l.interestRatePercentage}% APR • EMI: {formatCurrency(l.monthlyEMI)}</span>
                </div>
                <span className="font-extrabold text-red-600 dark:text-red-400 text-sm">
                  {formatCurrency(l.outstandingAmount)}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Debt Repayment Strategy Simulator" subtitle="Avalanche (Save Interest) vs Snowball (Quick Wins)">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Button
                variant={strategy === 'AVALANCHE' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setStrategy('AVALANCHE')}
              >
                Avalanche (High Interest First)
              </Button>
              <Button
                variant={strategy === 'SNOWBALL' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setStrategy('SNOWBALL')}
              >
                Snowball (Low Balance First)
              </Button>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 space-y-1 text-xs">
              <div className="flex justify-between">
                <span>Months to Debt Freedom:</span>
                <span className="font-bold">{plan.monthsToPayoff} Months</span>
              </div>
              <div className="flex justify-between">
                <span>Total Interest Payable:</span>
                <span className="font-bold text-red-600">{formatCurrency(plan.totalInterestPaid)}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Outflow:</span>
                <span className="font-bold">{formatCurrency(plan.totalAmountPaid)}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
