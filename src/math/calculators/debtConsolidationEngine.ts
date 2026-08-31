export interface ActiveDebtItem {
  id: string;
  debtName: string;
  balance: number;
  aprPercent: number;
  monthlyEMI: number;
}

export interface DebtConsolidationResult {
  totalOriginalBalance: number;
  currentCombinedMonthlyEMI: number;
  consolidationLoanRatePercent: number;
  consolidationLoanTenureMonths: number;
  newSingleMonthlyEMI: number;
  monthlySavings: number;
  totalInterestOriginal: number;
  totalInterestConsolidated: number;
  netInterestSavings: number;
  isConsolidationBeneficial: boolean;
}

export class DebtConsolidationEngine {
  public static calculateConsolidation(
    debts: ActiveDebtItem[],
    consolidationLoanRatePercent = 11.5,
    consolidationLoanTenureMonths = 36
  ): DebtConsolidationResult {
    const totalOriginalBalance = debts.reduce((s, d) => s + d.balance, 0);
    const currentCombinedMonthlyEMI = debts.reduce((s, d) => s + d.monthlyEMI, 0);

    const monthlyRate = consolidationLoanRatePercent / 100 / 12;

    // EMI formula: P * r * (1+r)^n / ((1+r)^n - 1)
    const emiNumerator = totalOriginalBalance * monthlyRate * Math.pow(1 + monthlyRate, consolidationLoanTenureMonths);
    const emiDenominator = Math.pow(1 + monthlyRate, consolidationLoanTenureMonths) - 1;
    const newSingleMonthlyEMI = Math.round(emiNumerator / emiDenominator);

    const monthlySavings = Math.max(0, currentCombinedMonthlyEMI - newSingleMonthlyEMI);

    const totalInterestConsolidated = newSingleMonthlyEMI * consolidationLoanTenureMonths - totalOriginalBalance;
    const totalInterestOriginal = currentCombinedMonthlyEMI * 36 - totalOriginalBalance;

    const netInterestSavings = Math.max(0, Math.round(totalInterestOriginal - totalInterestConsolidated));
    const isConsolidationBeneficial = newSingleMonthlyEMI < currentCombinedMonthlyEMI;

    return {
      totalOriginalBalance: Math.round(totalOriginalBalance),
      currentCombinedMonthlyEMI: Math.round(currentCombinedMonthlyEMI),
      consolidationLoanRatePercent,
      consolidationLoanTenureMonths,
      newSingleMonthlyEMI,
      monthlySavings: Math.round(monthlySavings),
      totalInterestOriginal: Math.round(totalInterestOriginal),
      totalInterestConsolidated: Math.round(totalInterestConsolidated),
      netInterestSavings,
      isConsolidationBeneficial,
    };
  }
}
