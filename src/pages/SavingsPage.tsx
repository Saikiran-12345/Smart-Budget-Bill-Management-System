import React, { useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { StatCard } from '../components/ui/StatCard';
import { Card } from '../components/ui/Card';
import { ProgressBar } from '../components/ui/ProgressBar';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Button } from '../components/ui/Button';
import { SavingsGoalFormModal } from '../components/features/savings/SavingsGoalFormModal';
import { SavingsDepositModal } from '../components/features/savings/SavingsDepositModal';

import { useSavings } from '../hooks/useSavings';
import { SavingsGoal } from '../types/savings';
import { formatCurrency } from '../math/formatters';
import { formatDateString } from '../math/dateUtils';
import { Target, Plus, PiggyBank, Edit2, Trash2, ArrowUpRight } from 'lucide-react';

export const SavingsPage: React.FC = () => {
  const { savingsGoals, totalSaved, totalTarget, overallProgressPercentage, goalSummaries, addSavingsGoal, updateSavingsGoal, deleteSavingsGoal, addContribution } = useSavings();
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<SavingsGoal | null>(null);
  const [selectedGoalForDeposit, setSelectedGoalForDeposit] = useState<SavingsGoal | null>(null);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Savings Goals & Milestones"
        description="Set financial savings targets, record deposits, track completion progress, and build wealth."
        action={
          <Button
            variant="primary"
            icon={<Plus className="h-4 w-4" />}
            onClick={() => {
              setEditingGoal(null);
              setIsGoalModalOpen(true);
            }}
          >
            Create New Savings Goal
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Saved So Far"
          value={formatCurrency(totalSaved)}
          subtitle={`Across ${savingsGoals.length} savings goals`}
          icon={<PiggyBank className="h-5 w-5" />}
          iconBgColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
        />
        <StatCard
          title="Total Target Objective"
          value={formatCurrency(totalTarget)}
          subtitle="Combined goal targets"
          icon={<Target className="h-5 w-5" />}
          iconBgColor="bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400"
        />
        <StatCard
          title="Overall Goal Completion"
          value={`${overallProgressPercentage.toFixed(1)}%`}
          subtitle="Portfolio progress"
          icon={<Target className="h-5 w-5" />}
          iconBgColor="bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
        />
      </div>

      {/* Grid of Savings Goals */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goalSummaries.map((summary) => {
          const goalItem = savingsGoals.find((g) => g.id === summary.goalId)!;
          return (
            <Card key={summary.goalId} className="relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <span className="rounded-md bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 px-2 py-0.5 text-xs font-semibold uppercase">
                    {goalItem.category}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-2">
                    {goalItem.goalName}
                  </h3>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      setEditingGoal(goalItem);
                      setIsGoalModalOpen(true);
                    }}
                    className="p-1 text-slate-400 hover:text-brand-600 dark:hover:text-brand-400"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete savings goal "${goalItem.goalName}"?`)) {
                        deleteSavingsGoal(goalItem.id);
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
                  <span className="text-slate-500">Saved: {formatCurrency(summary.currentAmount)}</span>
                  <span className="text-slate-900 dark:text-slate-100">Target: {formatCurrency(summary.targetAmount)}</span>
                </div>

                <ProgressBar progress={summary.progressPercentage} size="md" colorClass="bg-purple-600 dark:bg-purple-500" showLabel />

                <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500">
                    Target Date: <span className="font-medium text-slate-700 dark:text-slate-300">{formatDateString(goalItem.targetDate)}</span>
                  </span>
                  <StatusBadge status={summary.isCompleted ? 'COMPLETED' : goalItem.status} />
                </div>

                <div className="pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    icon={<ArrowUpRight className="h-3.5 w-3.5" />}
                    onClick={() => {
                      setSelectedGoalForDeposit(goalItem);
                      setIsDepositModalOpen(true);
                    }}
                  >
                    Add / Withdraw Funds
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <SavingsGoalFormModal
        isOpen={isGoalModalOpen}
        onClose={() => setIsGoalModalOpen(false)}
        initialData={editingGoal}
        onSubmit={(data) => {
          if (editingGoal) {
            updateSavingsGoal(editingGoal.id, data);
          } else {
            addSavingsGoal(data);
          }
        }}
      />

      <SavingsDepositModal
        isOpen={isDepositModalOpen}
        onClose={() => setIsDepositModalOpen(false)}
        goal={selectedGoalForDeposit}
        onDeposit={(goalId, amount, type, note) => {
          addContribution(goalId, amount, type, note);
        }}
      />
    </div>
  );
};
