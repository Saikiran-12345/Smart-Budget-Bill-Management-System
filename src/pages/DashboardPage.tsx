import React from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { StatCard } from '../components/ui/StatCard';
import { ChartCard } from '../components/ui/ChartCard';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { StatusBadge } from '../components/ui/StatusBadge';
import { ProgressBar } from '../components/ui/ProgressBar';

import { useIncome } from '../hooks/useIncome';
import { useExpenses } from '../hooks/useExpenses';
import { useBills } from '../hooks/useBills';
import { useBudgets } from '../hooks/useBudgets';
import { useSavings } from '../hooks/useSavings';
import { useAnalytics } from '../hooks/useAnalytics';

import { formatCurrency, formatPercentage } from '../math/formatters';
import { formatDateString } from '../math/dateUtils';
import { TrendingUp, CreditCard, Receipt, PieChart, Target, AlertCircle, Plus } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart as RePieChart, Pie, Cell, Legend } from 'recharts';
import { useNavigate } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { totalIncome, incomes } = useIncome();
  const { totalExpenses, expenses } = useExpenses();
  const { totalBillsAmount, upcomingBills, overdueBills } = useBills();
  const { overallSummary } = useBudgets();
  const { totalSaved, totalTarget } = useSavings();
  const { healthScore, categoryDistribution, incomeMonthlyTrend } = useAnalytics();

  const netBalance = totalIncome - totalExpenses;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Financial Dashboard"
        description="Comprehensive real-time overview of income, expenses, bills, budgets, and savings."
        action={
          <div className="flex gap-2">
            <Button variant="primary" size="sm" icon={<Plus className="h-4 w-4" />} onClick={() => navigate('/expenses')}>
              Add Expense
            </Button>
            <Button variant="outline" size="sm" icon={<Plus className="h-4 w-4" />} onClick={() => navigate('/income')}>
              Add Income
            </Button>
          </div>
        }
      />

      {/* Alert Banner if Overdue Bills Exist */}
      {overdueBills.length > 0 && (
        <div className="flex items-center justify-between rounded-xl bg-red-50 dark:bg-red-950/40 p-4 border border-red-200 dark:border-red-900/60 text-red-800 dark:text-red-300">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
            <div>
              <p className="text-xs font-bold">Action Required: {overdueBills.length} Overdue Bill(s)</p>
              <p className="text-xs">Pay now to prevent late payment penalty fees.</p>
            </div>
          </div>
          <Button variant="danger" size="sm" onClick={() => navigate('/bills')}>
            Pay Bills
          </Button>
        </div>
      )}

      {/* Primary Financial Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Income"
          value={formatCurrency(totalIncome)}
          subtitle={`${incomes.length} credit transactions`}
          icon={<TrendingUp className="h-5 w-5" />}
          iconBgColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
        />
        <StatCard
          title="Total Expenses"
          value={formatCurrency(totalExpenses)}
          subtitle={`${expenses.length} debit transactions`}
          icon={<CreditCard className="h-5 w-5" />}
          iconBgColor="bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400"
        />
        <StatCard
          title="Active Budget"
          value={formatCurrency(overallSummary.totalBudgeted)}
          subtitle={`Used: ${formatCurrency(overallSummary.totalSpent)} (${overallSummary.overallPercentageUsed.toFixed(1)}%)`}
          icon={<PieChart className="h-5 w-5" />}
          iconBgColor="bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400"
        />
        <StatCard
          title="Total Savings"
          value={formatCurrency(totalSaved)}
          subtitle={`Target: ${formatCurrency(totalTarget)}`}
          icon={<Target className="h-5 w-5" />}
          iconBgColor="bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400"
        />
      </div>

      {/* Financial Health Index & Net Balance Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-semibold uppercase text-slate-500">Monthly Net Balance</h4>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
                {formatCurrency(netBalance)}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Net cashflow available after deducting monthly expenses from gross income.
              </p>
            </div>
            <div className="w-full sm:w-auto rounded-xl bg-slate-50 dark:bg-slate-800 p-4 border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-xs text-slate-500 font-semibold block">FINANCIAL HEALTH INDEX</span>
              <span className="text-3xl font-extrabold text-brand-600 dark:text-brand-400">{healthScore.score} / 100</span>
              <div className="mt-1">
                <StatusBadge status={healthScore.rating} />
              </div>
            </div>
          </div>
        </Card>

        {/* Budget Usage Widget */}
        <Card title="Overall Budget Usage" subtitle="Current month allocation">
          <div className="space-y-3">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-600 dark:text-slate-400">Budget Spent</span>
              <span className="text-slate-900 dark:text-slate-100">
                {formatCurrency(overallSummary.totalSpent)} / {formatCurrency(overallSummary.totalBudgeted)}
              </span>
            </div>
            <ProgressBar progress={overallSummary.overallPercentageUsed} size="lg" showLabel />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Remaining Budget: <span className="font-bold text-slate-700 dark:text-slate-200">{formatCurrency(overallSummary.totalRemaining)}</span>
            </p>
          </div>
        </Card>
      </div>

      {/* Main Analytical Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Monthly Income Trend (2026)" subtitle="Monthly breakdown of total income">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={incomeMonthlyTrend}>
              <XAxis dataKey="monthName" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Bar dataKey="totalAmount" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Expense Category Breakdown" subtitle="Spending distribution by category">
          <ResponsiveContainer width="100%" height="100%">
            <RePieChart>
              <Pie
                data={categoryDistribution}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="amount"
                nameKey="category"
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              >
                {categoryDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(val) => formatCurrency(Number(val))} />
            </RePieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Upcoming Bills Preview Table */}
      <Card title="Upcoming Bills (Next 7 Days)" action={<Button variant="ghost" size="sm" onClick={() => navigate('/bills')}>View All</Button>}>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {upcomingBills.length === 0 ? (
            <p className="text-xs text-slate-500 py-4 text-center">No bills due in the next 7 days.</p>
          ) : (
            upcomingBills.map((bill) => (
              <div key={bill.id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-amber-100 dark:bg-amber-950/50 p-2 text-amber-600 dark:text-amber-400">
                    <Receipt className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">{bill.billName}</p>
                    <p className="text-[10px] text-slate-500">Due: {formatDateString(bill.dueDate)} • {bill.billerName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{formatCurrency(bill.amount)}</p>
                  <StatusBadge status={bill.status} />
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};
