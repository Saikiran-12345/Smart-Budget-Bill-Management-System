import { FIRERetirementWithdrawalEngine, FIREStrategyResult } from '../math/calculators/fireRetirementWithdrawalEngine';

export class FIRERetirementService {
  public static getFIREAnalysis(
    annualExpenses = 600000,
    currentAccumulatedCorpus = 4500000,
    monthlySavingsCapacity = 45000
  ): {
    leanFIRE: FIREStrategyResult;
    regularFIRE: FIREStrategyResult;
    fatFIRE: FIREStrategyResult;
  } {
    return FIRERetirementWithdrawalEngine.calculateFIRE(
      annualExpenses,
      currentAccumulatedCorpus,
      monthlySavingsCapacity
    );
  }
}
