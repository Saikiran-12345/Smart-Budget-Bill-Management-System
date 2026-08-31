export interface RefinanceComparisonResult {
  currentLoanBalance: number;
  currentInterestRatePercent: number;
  newInterestRatePercent: number;
  remainingTenureMonths: number;
  refinancingClosingCosts: number;
  currentMonthlyEMI: number;
  newMonthlyEMI: number;
  monthlyEMISavings: number;
  netLifetimeInterestSavings: number;
  breakEvenMonths: number;
  isRefinancingRecommended: boolean;
}

export class MortgageRefinanceEngine {
  public static calculateRefinance(
    currentLoanBalance: number,
    currentInterestRatePercent: number,
    newInterestRatePercent: number,
    remainingTenureMonths: number,
    refinancingClosingCosts = 25000
  ): RefinanceComparisonResult {
    const currentMonthlyRate = currentInterestRatePercent / 100 / 12;
    const newMonthlyRate = newInterestRatePercent / 100 / 12;

    // Current EMI formula
    const currentNum = currentLoanBalance * currentMonthlyRate * Math.pow(1 + currentMonthlyRate, remainingTenureMonths);
    const currentDen = Math.pow(1 + currentMonthlyRate, remainingTenureMonths) - 1;
    const currentMonthlyEMI = Math.round(currentNum / currentDen);

    // New EMI formula
    const newNum = currentLoanBalance * newMonthlyRate * Math.pow(1 + newMonthlyRate, remainingTenureMonths);
    const newDen = Math.pow(1 + newMonthlyRate, remainingTenureMonths) - 1;
    const newMonthlyEMI = Math.round(newNum / newDen);

    const monthlyEMISavings = Math.max(0, currentMonthlyEMI - newMonthlyEMI);

    const totalCurrentInterest = currentMonthlyEMI * remainingTenureMonths - currentLoanBalance;
    const totalNewInterest = newMonthlyEMI * remainingTenureMonths - currentLoanBalance;

    const grossInterestSavings = Math.max(0, totalCurrentInterest - totalNewInterest);
    const netLifetimeInterestSavings = Math.max(0, Math.round(grossInterestSavings - refinancingClosingCosts));

    const breakEvenMonths = monthlyEMISavings > 0 ? Math.ceil(refinancingClosingCosts / monthlyEMISavings) : 999;
    const isRefinancingRecommended = netLifetimeInterestSavings > 50000 && breakEvenMonths <= 24;

    return {
      currentLoanBalance,
      currentInterestRatePercent,
      newInterestRatePercent,
      remainingTenureMonths,
      refinancingClosingCosts,
      currentMonthlyEMI,
      newMonthlyEMI,
      monthlyEMISavings: Math.round(monthlyEMISavings),
      netLifetimeInterestSavings,
      breakEvenMonths,
      isRefinancingRecommended,
    };
  }
}
