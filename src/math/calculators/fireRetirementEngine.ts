export interface FIRERetirementDetails {
  currentAge: number;
  targetRetirementAge: number;
  currentAnnualExpenses: number;
  currentSavingsCorpus: number;
  expectedAnnualReturnPercent: number;
  expectedInflationPercent: number;
  safeWithdrawalRatePercent: number; // e.g., 4%
  leanFIRETargetCorpus: number; // 75% of regular FIRE
  regularFIRETargetCorpus: number; // 100% of regular FIRE
  fatFIRETargetCorpus: number; // 150% of regular FIRE
  projectedCorpusAtRetirementAge: number;
  monthlySavingsNeeded: number;
  isFIREAchievable: boolean;
  yearsToFIRE: number;
}

export class FIRERetirementEngine {
  public static calculateFIRE(
    currentAge: number,
    targetRetirementAge: number,
    currentAnnualExpenses: number,
    currentSavingsCorpus: number,
    expectedAnnualReturnPercent = 10,
    expectedInflationPercent = 6,
    safeWithdrawalRatePercent = 4
  ): FIRERetirementDetails {
    const yearsToRetirement = Math.max(1, targetRetirementAge - currentAge);

    // Inflate annual expenses to retirement age
    const inflatedAnnualExpenses = currentAnnualExpenses * Math.pow(1 + expectedInflationPercent / 100, yearsToRetirement);

    // Regular FIRE Target = Inflated Expenses / (SWR / 100)
    const regularFIRETargetCorpus = Math.round(inflatedAnnualExpenses / (safeWithdrawalRatePercent / 100));
    const leanFIRETargetCorpus = Math.round(regularFIRETargetCorpus * 0.75);
    const fatFIRETargetCorpus = Math.round(regularFIRETargetCorpus * 1.5);

    // Real rate of return adjusted for inflation
    const realReturnRate = (expectedAnnualReturnPercent - expectedInflationPercent) / 100;
    const monthlyRealRate = realReturnRate / 12;
    const totalMonths = yearsToRetirement * 12;

    const fvExistingSavings = currentSavingsCorpus * Math.pow(1 + realReturnRate, yearsToRetirement);
    const shortfall = Math.max(0, regularFIRETargetCorpus - fvExistingSavings);

    let monthlySavingsNeeded = 0;
    if (shortfall > 0 && monthlyRealRate > 0) {
      monthlySavingsNeeded = Math.round(
        (shortfall * monthlyRealRate) / (Math.pow(1 + monthlyRealRate, totalMonths) - 1)
      );
    }

    const projectedCorpusAtRetirementAge = Math.round(fvExistingSavings);
    const isFIREAchievable = projectedCorpusAtRetirementAge >= regularFIRETargetCorpus;

    return {
      currentAge,
      targetRetirementAge,
      currentAnnualExpenses,
      currentSavingsCorpus,
      expectedAnnualReturnPercent,
      expectedInflationPercent,
      safeWithdrawalRatePercent,
      leanFIRETargetCorpus,
      regularFIRETargetCorpus,
      fatFIRETargetCorpus,
      projectedCorpusAtRetirementAge,
      monthlySavingsNeeded,
      isFIREAchievable,
      yearsToFIRE: yearsToRetirement,
    };
  }
}
