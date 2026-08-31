import { SavingsGoal } from '../types/savings';

export interface SavingsMilestone {
  percentage: number;
  label: string;
  targetAmount: number;
  isAchieved: boolean;
  projectedAchieveDate: string;
}

export interface GoalForecastDetails {
  goalId: string;
  goalName: string;
  currentSaved: number;
  targetAmount: number;
  monthlyDeposit: number;
  monthsRemaining: number;
  projectedCompletionDate: string;
  milestones: SavingsMilestone[];
  inflationAdjustedTarget: number;
}

export class SavingsForecastEngine {
  public static forecastGoalDetails(
    goal: SavingsGoal,
    annualInflationRate = 0.05
  ): GoalForecastDetails {
    const target = goal.targetAmount || 0;
    const current = goal.currentAmount || 0;
    const remaining = Math.max(0, target - current);
    const monthlyDeposit = goal.monthlyTargetContribution > 0 ? goal.monthlyTargetContribution : 5000;

    const monthsNeeded = monthlyDeposit > 0 ? Math.ceil(remaining / monthlyDeposit) : 12;

    const projDate = new Date();
    projDate.setMonth(projDate.getMonth() + monthsNeeded);
    const projectedCompletionDate = projDate.toISOString().split('T')[0];

    // Inflation adjustment calculation: target * (1 + inflation)^years
    const yearsRemaining = monthsNeeded / 12;
    const inflationAdjustedTarget = Math.round(target * Math.pow(1 + annualInflationRate, yearsRemaining));

    const milestones: SavingsMilestone[] = [25, 50, 75, 100].map((pct) => {
      const milestoneTarget = Math.round((target * pct) / 100);
      const isAchieved = current >= milestoneTarget;
      const amountNeededForMilestone = Math.max(0, milestoneTarget - current);
      const monthsForMilestone = monthlyDeposit > 0 ? Math.ceil(amountNeededForMilestone / monthlyDeposit) : 0;

      const mDate = new Date();
      mDate.setMonth(mDate.getMonth() + monthsForMilestone);

      return {
        percentage: pct,
        label: `${pct}% Milestone`,
        targetAmount: milestoneTarget,
        isAchieved,
        projectedAchieveDate: mDate.toISOString().split('T')[0],
      };
    });

    return {
      goalId: goal.id,
      goalName: goal.goalName,
      currentSaved: current,
      targetAmount: target,
      monthlyDeposit,
      monthsRemaining: monthsNeeded,
      projectedCompletionDate,
      milestones,
      inflationAdjustedTarget,
    };
  }

  public static calculatePortfolioForecast(
    goals: SavingsGoal[],
    totalMonthlySavingsCapacity: number
  ): {
    totalTarget: number;
    totalCurrent: number;
    estimatedMonthsToCompleteAll: number;
    completionPercentage: number;
  } {
    const totalTarget = goals.reduce((s, g) => s + g.targetAmount, 0);
    const totalCurrent = goals.reduce((s, g) => s + g.currentAmount, 0);
    const remaining = Math.max(0, totalTarget - totalCurrent);

    const estimatedMonthsToCompleteAll =
      totalMonthlySavingsCapacity > 0 ? Math.ceil(remaining / totalMonthlySavingsCapacity) : 999;
    const completionPercentage = totalTarget > 0 ? (totalCurrent / totalTarget) * 100 : 0;

    return {
      totalTarget,
      totalCurrent,
      estimatedMonthsToCompleteAll,
      completionPercentage: parseFloat(completionPercentage.toFixed(1)),
    };
  }
}
