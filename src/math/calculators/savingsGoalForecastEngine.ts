import { SavingsGoal } from '../../types/savings';

export interface SavingsGoalForecastResult {
  goalId: string;
  goalName: string;
  targetAmount: number;
  currentSavedAmount: number;
  monthlyDepositAmount: number;
  remainingAmount: number;
  estimatedMonthsToTarget: number;
  projectedTargetCompletionDate: string;
  isGoalOnTrack: boolean;
}

export class SavingsGoalForecastEngine {
  public static forecastGoal(goal: SavingsGoal): SavingsGoalForecastResult {
    const targetAmount = goal.targetAmount || 0;
    const currentSavedAmount = goal.currentAmount || 0;
    const remainingAmount = Math.max(0, targetAmount - currentSavedAmount);
    const monthlyDepositAmount = goal.monthlyTargetContribution > 0 ? goal.monthlyTargetContribution : 5000;

    const estimatedMonthsToTarget = monthlyDepositAmount > 0 ? Math.ceil(remainingAmount / monthlyDepositAmount) : 999;

    const d = new Date();
    d.setMonth(d.getMonth() + estimatedMonthsToTarget);
    const projectedTargetCompletionDate = d.toISOString().split('T')[0];

    const isGoalOnTrack = !goal.targetDate || projectedTargetCompletionDate <= goal.targetDate;

    return {
      goalId: goal.id,
      goalName: goal.goalName,
      targetAmount,
      currentSavedAmount,
      monthlyDepositAmount,
      remainingAmount,
      estimatedMonthsToTarget,
      projectedTargetCompletionDate,
      isGoalOnTrack,
    };
  }
}
