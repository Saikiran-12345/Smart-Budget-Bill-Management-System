import { BudgetItem } from '../types/budget';

export interface BudgetRolloverCalculationResult {
  budgetId: string;
  category: string;
  originalAllocation: number;
  spentAmount: number;
  unusedFunds: number;
  rolloverAmount: number;
  newMonthAllocation: number;
  variancePercentage: number;
}

export class BudgetRolloverEngine {
  public static calculateRolloverForBudget(budget: BudgetItem): BudgetRolloverCalculationResult {
    const original = budget.allocatedAmount || 0;
    const spent = budget.spentAmount || 0;
    const unusedFunds = Math.max(0, original - spent);
    const rolloverAmount = budget.rolloverUnused ? unusedFunds : 0;
    const newMonthAllocation = original + rolloverAmount;
    const variancePercentage = original > 0 ? ((spent - original) / original) * 100 : 0;

    return {
      budgetId: budget.id,
      category: budget.category,
      originalAllocation: original,
      spentAmount: spent,
      unusedFunds,
      rolloverAmount,
      newMonthAllocation,
      variancePercentage: parseFloat(variancePercentage.toFixed(1)),
    };
  }

  public static processEndOfMonthRollovers(budgets: BudgetItem[]): {
    updatedBudgets: BudgetItem[];
    totalRolloverPool: number;
    summary: BudgetRolloverCalculationResult[];
  } {
    let totalRolloverPool = 0;
    const summaryList: BudgetRolloverCalculationResult[] = [];

    const updatedBudgets = budgets.map((b) => {
      const calc = this.calculateRolloverForBudget(b);
      summaryList.push(calc);
      totalRolloverPool += calc.rolloverAmount;

      return {
        ...b,
        allocatedAmount: calc.newMonthAllocation,
        spentAmount: 0, // reset for new month
        updatedAt: new Date().toISOString(),
      };
    });

    return {
      updatedBudgets,
      totalRolloverPool,
      summary: summaryList,
    };
  }

  public static calculateQuarterlyVarianceScore(
    q1Spent: number, q1Budget: number,
    q2Spent: number, q2Budget: number,
    q3Spent: number, q3Budget: number
  ): { overallVariancePercent: number; complianceRating: 'HIGH' | 'MODERATE' | 'POOR' } {
    const totalBudget = q1Budget + q2Budget + q3Budget;
    const totalSpent = q1Spent + q2Spent + q3Spent;
    const diff = totalSpent - totalBudget;
    const overallVariancePercent = totalBudget > 0 ? (diff / totalBudget) * 100 : 0;

    let complianceRating: 'HIGH' | 'MODERATE' | 'POOR' = 'HIGH';
    if (overallVariancePercent > 15) complianceRating = 'POOR';
    else if (overallVariancePercent > 5) complianceRating = 'MODERATE';

    return {
      overallVariancePercent: parseFloat(overallVariancePercent.toFixed(1)),
      complianceRating,
    };
  }
}
