import { DebtConsolidationRefinanceEngine, DebtAccountItem, DebtConsolidationRefinanceResult } from '../math/calculators/debtConsolidationRefinanceEngine';

export class DebtConsolidationRefinanceService {
  public static getConsolidationAnalysis(
    debts: DebtAccountItem[],
    newConsolidatedAPRPercent = 11.5,
    tenureMonths = 36
  ): DebtConsolidationRefinanceResult {
    return DebtConsolidationRefinanceEngine.calculateConsolidation(debts, newConsolidatedAPRPercent, tenureMonths);
  }
}
