export interface MortgageRefinanceComparisonResult {
  currentLoanBalance: number;
  currentAPRPercent: number;
  newAPRPercent: number;
  remainingTenureMonths: number;
  refinancingCosts: number;
  currentMonthlyEMI: number;
  newMonthlyEMI: number;
  monthlyEMISavings: number;
  netLifetimeInterestSavings: number;
  breakEvenMonths: number;
  isRefinancingRecommended: boolean;
}

export class MortgageRefinanceComparisonEngine {
  public static compareRefinance(
    currentLoanBalance = 4500000,
    currentAPRPercent = 9.5,
    newAPRPercent = 8.2,
    remainingTenureMonths = 180,
    refinancingCosts = 30000
  ): MortgageRefinanceComparisonResult {
    const rCurrent = currentAPRPercent / 100 / 12;
    const rNew = newAPRPercent / 100 / 12;

    // Current EMI
    const currentEMI = Math.round(
      (currentLoanBalance * rCurrent * Math.pow(1 + rCurrent, remainingTenureMonths)) /
        (Math.pow(1 + rCurrent, remainingTenureMonths) - 1)
    );

    // New EMI
    const newEMI = Math.round(
      (currentLoanBalance * rNew * Math.pow(1 + rNew, remainingTenureMonths)) /
        (Math.pow(1 + rNew, remainingTenureMonths) - 1)
    );

    const monthlyEMISavings = Math.max(0, currentEMI - newEMI);

    const currentTotalOutflow = currentEMI * remainingTenureMonths;
    const newTotalOutflow = newEMI * remainingTenureMonths + refinancingCosts;

    const netLifetimeInterestSavings = Math.max(0, Math.round(currentTotalOutflow - newTotalOutflow));
    const breakEvenMonths = monthlyEMISavings > 0 ? Math.ceil(refinancingCosts / monthlyEMISavings) : 999;
    const isRefinancingRecommended = netLifetimeInterestSavings > 50000 && breakEvenMonths <= 24;

    return {
      currentLoanBalance,
      currentAPRPercent,
      newAPRPercent,
      remainingTenureMonths,
      refinancingCosts,
      currentMonthlyEMI: currentEMI,
      newMonthlyEMI: newEMI,
      monthlyEMISavings,
      netLifetimeInterestSavings,
      breakEvenMonths,
      isRefinancingRecommended,
    };
  }
}
