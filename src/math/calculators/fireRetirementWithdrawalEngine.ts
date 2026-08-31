export interface FIREStrategyResult {
  fireVariant: 'LEAN_FIRE' | 'REGULAR_FIRE' | 'FAT_FIRE';
  annualExpenses: number;
  requiredTargetCorpus: number; // 25x or 30x rule
  currentAccumulatedCorpus: number;
  corpusShortfall: number;
  yearsToFIRE: number;
  safeWithdrawalRatePercent: number;
  isFIREAchieved: boolean;
}

export class FIRERetirementWithdrawalEngine {
  public static calculateFIRE(
    annualExpenses = 600000,
    currentAccumulatedCorpus = 4500000,
    monthlySavingsCapacity = 45000,
    safeWithdrawalRatePercent = 4.0
  ): {
    leanFIRE: FIREStrategyResult;
    regularFIRE: FIREStrategyResult;
    fatFIRE: FIREStrategyResult;
  } {
    const calcVariant = (
      variant: 'LEAN_FIRE' | 'REGULAR_FIRE' | 'FAT_FIRE',
      expMultiplier: number,
      swr: number
    ): FIREStrategyResult => {
      const exp = annualExpenses * expMultiplier;
      const targetCorpus = Math.round(exp * (100 / swr));
      const shortfall = Math.max(0, targetCorpus - currentAccumulatedCorpus);

      const annualSavings = monthlySavingsCapacity * 12;
      const years = annualSavings > 0 ? Math.ceil(shortfall / annualSavings) : 99;
      const isAchieved = currentAccumulatedCorpus >= targetCorpus;

      return {
        fireVariant: variant,
        annualExpenses: Math.round(exp),
        requiredTargetCorpus: targetCorpus,
        currentAccumulatedCorpus,
        corpusShortfall: Math.round(shortfall),
        yearsToFIRE: isAchieved ? 0 : years,
        safeWithdrawalRatePercent: swr,
        isFIREAchieved: isAchieved,
      };
    };

    return {
      leanFIRE: calcVariant('LEAN_FIRE', 0.75, 4.0),
      regularFIRE: calcVariant('REGULAR_FIRE', 1.0, 4.0),
      fatFIRE: calcVariant('FAT_FIRE', 1.5, 3.5),
    };
  }
}
