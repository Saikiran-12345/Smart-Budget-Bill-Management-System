export interface FIRERetirementPlan {
  currentAge: number;
  targetRetirementAge: number;
  currentAnnualExpense: number;
  expectedInflationRate: number; // e.g. 6%
  safeWithdrawalRate: number; // e.g. 4%
  fireNumberTarget: number; // Target corpus required
  projectedCorpusAtRetirement: number;
  isFIREAchievable: boolean;
  monthlySavingsRequired: number;
}

export class RetirementPlanner {
  public static calculateFIREPlan(
    currentAge: number,
    targetRetirementAge: number,
    currentAnnualExpense: number,
    currentRetirementSavings: number,
    expectedAnnualInvestmentReturn = 10,
    expectedInflationRate = 6,
    safeWithdrawalRate = 4
  ): FIRERetirementPlan {
    const yearsToRetirement = Math.max(1, targetRetirementAge - currentAge);

    // Inflated annual expense at retirement: Expense * (1 + inflation)^years
    const inflatedAnnualExpenseAtRetirement = currentAnnualExpense * Math.pow(1 + expectedInflationRate / 100, yearsToRetirement);

    // FIRE Target Corpus = Inflated Expense / (Safe Withdrawal Rate / 100)
    const fireNumberTarget = Math.round(inflatedAnnualExpenseAtRetirement / (safeWithdrawalRate / 100));

    // Future value of existing retirement savings
    const realReturnRate = (expectedAnnualInvestmentReturn - expectedInflationRate) / 100;
    const monthlyRealRate = realReturnRate / 12;
    const totalMonths = yearsToRetirement * 12;

    const fvExistingSavings = currentRetirementSavings * Math.pow(1 + realReturnRate, yearsToRetirement);
    const shortfall = Math.max(0, fireNumberTarget - fvExistingSavings);

    // Required Monthly Savings formula: Shortfall * r / ((1+r)^n - 1)
    let monthlySavingsRequired = 0;
    if (shortfall > 0 && monthlyRealRate > 0) {
      monthlySavingsRequired = Math.round(
        (shortfall * monthlyRealRate) / (Math.pow(1 + monthlyRealRate, totalMonths) - 1)
      );
    }

    const projectedCorpusAtRetirement = Math.round(fvExistingSavings);
    const isFIREAchievable = projectedCorpusAtRetirement >= fireNumberTarget;

    return {
      currentAge,
      targetRetirementAge,
      currentAnnualExpense,
      expectedInflationRate,
      safeWithdrawalRate,
      fireNumberTarget,
      projectedCorpusAtRetirement,
      isFIREAchievable,
      monthlySavingsRequired,
    };
  }
}
