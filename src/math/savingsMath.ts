import { SavingsGoal, SavingsProgressSummary } from '../types/savings';
import { getDaysDifference } from './dateUtils';

export const calculateSavingsProgressSummary = (goal: SavingsGoal): SavingsProgressSummary => {
  const target = goal.targetAmount || 0;
  const current = goal.currentAmount || 0;
  const remaining = Math.max(0, target - current);
  const progressPercentage = target > 0 ? Math.min(100, (current / target) * 100) : 0;
  const isCompleted = current >= target;

  const todayStr = new Date().toISOString().split('T')[0];
  const daysRemaining = Math.max(0, getDaysDifference(todayStr, goal.targetDate));
  const monthsRemaining = Math.max(1, Math.ceil(daysRemaining / 30));
  const requiredMonthlyDeposit = isCompleted ? 0 : Math.ceil(remaining / monthsRemaining);

  // Projected completion date based on monthly contribution rate
  let projectedCompletionDate = goal.targetDate;
  if (goal.monthlyTargetContribution > 0 && remaining > 0) {
    const monthsNeeded = Math.ceil(remaining / goal.monthlyTargetContribution);
    const projDate = new Date();
    projDate.setMonth(projDate.getMonth() + monthsNeeded);
    projectedCompletionDate = projDate.toISOString().split('T')[0];
  }

  return {
    goalId: goal.id,
    goalName: goal.goalName,
    targetAmount: target,
    currentAmount: current,
    remainingAmount: remaining,
    progressPercentage,
    daysRemaining,
    isCompleted,
    projectedCompletionDate,
    requiredMonthlyDeposit,
  };
};

export const calculateTotalSavingsAccumulated = (goals: SavingsGoal[]): number => {
  return goals.reduce((sum, g) => sum + (g.currentAmount || 0), 0);
};

export const calculateTotalSavingsTarget = (goals: SavingsGoal[]): number => {
  return goals.reduce((sum, g) => sum + (g.targetAmount || 0), 0);
};

export const calculateCompoundInterestYield = (
  principal: number,
  monthlyDeposit: number,
  annualInterestRate: number,
  years: number
): { year: number; balance: number; interestEarned: number }[] => {
  const monthlyRate = annualInterestRate / 100 / 12;
  const months = years * 12;
  let currentBalance = principal;
  const schedule: { year: number; balance: number; interestEarned: number }[] = [];

  let accumulatedInterest = 0;

  for (let m = 1; m <= months; m++) {
    const interestForMonth = currentBalance * monthlyRate;
    accumulatedInterest += interestForMonth;
    currentBalance += interestForMonth + monthlyDeposit;

    if (m % 12 === 0) {
      schedule.push({
        year: m / 12,
        balance: Math.round(currentBalance),
        interestEarned: Math.round(accumulatedInterest),
      });
    }
  }

  return schedule;
};
