import { MortgageRefinanceComparisonEngine, MortgageRefinanceComparisonResult } from '../math/calculators/mortgageRefinanceComparisonEngine';

export class MortgageRefinanceService {
  public static getRefinanceComparison(
    currentLoanBalance = 4500000,
    currentAPRPercent = 9.5,
    newAPRPercent = 8.2,
    remainingTenureMonths = 180,
    refinancingCosts = 30000
  ): MortgageRefinanceComparisonResult {
    return MortgageRefinanceComparisonEngine.compareRefinance(
      currentLoanBalance,
      currentAPRPercent,
      newAPRPercent,
      remainingTenureMonths,
      refinancingCosts
    );
  }
}
