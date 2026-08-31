import React, { useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { StatCard } from '../components/ui/StatCard';
import { Card } from '../components/ui/Card';
import { ProgressBar } from '../components/ui/ProgressBar';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Button } from '../components/ui/Button';
import { BudgetFormModal } from '../components/features/budget/BudgetFormModal';

import { useBudgets } from '../hooks/useBudgets';
import { BudgetItem } from '../types/budget';
import { formatCurrency } from '../math/formatters';
import { PieChart, Plus, AlertTriangle, Edit2, Trash2 } from 'lucide-react';

export const BudgetPage: React.FC = () => {
  const { budgets, overallSummary, budgetStatuses, addBudget, updateBudget, deleteBudget } = useBudgets();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<BudgetItem | null>(null);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Budget Management"
        description="Allocate monthly category budgets, track spending limits, and receive threshold warnings."
        action={
          <Button
            variant="primary"
            icon={<Plus className="h-4 w-4" />}
            onClick={() => {
              setEditingBudget(null);
              setIsModalOpen(true);
            }}
          >
            Create Budget Limit
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <StatCard
          title="Total Allocated Budget"
          value={formatCurrency(overallSummary.totalBudgeted)}
          subtitle={`${budgets.length} Category Budgets`}
          icon={<PieChart className="h-5 w-5" />}
          iconBgColor="bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400"
        />
        <StatCard
          title="Total Spent"
          value={formatCurrency(overallSummary.totalSpent)}
          subtitle={`${overallSummary.overallPercentageUsed.toFixed(1)}% consumed`}
          icon={<PieChart className="h-5 w-5" />}
          iconBgColor="bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400"
        />
        <StatCard
          title="Remaining Balance"
          value={formatCurrency(overallSummary.totalRemaining)}
          subtitle="Available headroom"
          icon={<PieChart className="h-5 w-5" />}
          iconBgColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
        />
        <StatCard
          title="Budget Alerts"
          value={`${overallSummary.overBudgetCount} Over Limit`}
          subtitle={`${overallSummary.nearLimitCount} near threshold`}
          icon={<AlertTriangle className="h-5 w-5" />}
          iconBgColor="bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400"
        />
      </div>

      {/* Grid of Category Budget Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {budgetStatuses.map((status) => {
          const budgetItem = budgets.find((b) => b.id === status.budgetId)!;
          return (
            <Card key={status.budgetId} className="relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <span className="rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 text-xs font-semibold uppercase">
                    {status.category}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-2">
                    {status.budgetName}
                  </h3>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      setEditingBudget(budgetItem);
                      setIsModalOpen(true);
                    }}
                    className="p-1 text-slate-400 hover:text-brand-600 dark:hover:text-brand-400"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete budget limit "${status.budgetName}"?`)) {
                        deleteBudget(status.budgetId);
                      }
                    }}
                    className="p-1 text-slate-400 hover:text-red-600 dark:hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-500">Spent: {formatCurrency(status.spent)}</span>
                  <span className="text-slate-900 dark:text-slate-100">Cap: {formatCurrency(status.allocated)}</span>
                </div>

                <ProgressBar progress={status.percentageUsed} size="md" showLabel />

                <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500">
                    Remaining: <span className="font-bold text-slate-800 dark:text-slate-200">{formatCurrency(status.remaining)}</span>
                  </span>
                  <StatusBadge status={status.isOverBudget ? 'EXCEEDED' : status.alertLevel === 'CRITICAL_90' ? 'CRITICAL' : 'NORMAL'} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <BudgetFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={editingBudget}
        onSubmit={(data) => {
          if (editingBudget) {
            updateBudget(editingBudget.id, data);
          } else {
            addBudget(data);
          }
        }}
      />
    </div>
  );
};
