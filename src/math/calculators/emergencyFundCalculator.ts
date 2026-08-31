export interface EmergencyFundAnalysis {
  monthlyEssentialExpenses: number;
  monthlyDiscretionaryExpenses: number;
  totalMonthlyExpenses: number;
  recommendedMonthsBuffer: number; // 3, 6, or 12
  recommendedEmergencyFundTarget: number;
  currentLiquidSavings: number;
  shortfallAmount: number;
  runwayMonthsCurrent: number;
  healthRating: 'STRONG' | 'ADEQUATE' | 'INSUFFICIENT';
}

export class EmergencyFundCalculator {
  public static calculateEmergencyFund(
    housingExpense: number,
    groceriesExpense: number,
    utilitiesExpense: number,
    emiExpense: number,
    discretionaryExpense: number,
    currentLiquidSavings: number,
    jobStability: 'HIGH' | 'MEDIUM' | 'FREELANCE' = 'MEDIUM'
  ): EmergencyFundAnalysis {
    const monthlyEssential = housingExpense + groceriesExpense + utilitiesExpense + emiExpense;
    const totalMonthly = monthlyEssential + discretionaryExpense;

    let recommendedMonths = 6;
    if (jobStability === 'HIGH') recommendedMonths = 3;
    else if (jobStability === 'FREELANCE') recommendedMonths = 12;

    const recommendedEmergencyFundTarget = Math.round(monthlyEssential * recommendedMonths);
    const shortfallAmount = Math.max(0, recommendedEmergencyFundTarget - currentLiquidSavings);

    const runwayMonthsCurrent = monthlyEssential > 0 ? parseFloat((currentLiquidSavings / monthlyEssential).toFixed(1)) : 0;

    let healthRating: 'STRONG' | 'ADEQUATE' | 'INSUFFICIENT' = 'ADEQUATE';
    if (runwayMonthsCurrent >= recommendedMonths) healthRating = 'STRONG';
    else if (runwayMonthsCurrent < recommendedMonths * 0.5) healthRating = 'INSUFFICIENT';

    return {
      monthlyEssentialExpenses: monthlyEssential,
      monthlyDiscretionaryExpenses: discretionaryExpense,
      totalMonthlyExpenses: totalMonthly,
      recommendedMonthsBuffer: recommendedMonths,
      recommendedEmergencyFundTarget,
      currentLiquidSavings,
      shortfallAmount,
      runwayMonthsCurrent,
      healthRating,
    };
  }
}
