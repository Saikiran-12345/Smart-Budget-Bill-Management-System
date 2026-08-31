export interface CreditLimitAnalysis {
  currentCombinedCreditLimit: number;
  currentCombinedBalance: number;
  currentUtilizationPercent: number;
  targetUtilizationPercent: number; // 30% max ideal
  recommendedCreditLimitIncrease: number;
  estimatedScoreBoostPoints: number;
}

export class CreditLimitOptimizerEngine {
  public static calculateCreditLimitOptimizer(
    currentCombinedCreditLimit: number,
    currentCombinedBalance: number,
    targetUtilizationPercent = 30
  ): CreditLimitAnalysis {
    const currentUtilizationPercent = currentCombinedCreditLimit > 0
      ? (currentCombinedBalance / currentCombinedCreditLimit) * 100
      : 0;

    let recommendedCreditLimitIncrease = 0;
    if (currentUtilizationPercent > targetUtilizationPercent) {
      // Required Limit = Balance / (Target Utilization / 100)
      const requiredLimit = currentCombinedBalance / (targetUtilizationPercent / 100);
      recommendedCreditLimitIncrease = Math.round(Math.max(0, requiredLimit - currentCombinedCreditLimit));
    }

    let estimatedScoreBoostPoints = 0;
    if (currentUtilizationPercent > 50) estimatedScoreBoostPoints = 35;
    else if (currentUtilizationPercent > 30) estimatedScoreBoostPoints = 15;

    return {
      currentCombinedCreditLimit,
      currentCombinedBalance,
      currentUtilizationPercent: parseFloat(currentUtilizationPercent.toFixed(1)),
      targetUtilizationPercent,
      recommendedCreditLimitIncrease,
      estimatedScoreBoostPoints,
    };
  }
}
