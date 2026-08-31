export interface DebtAccountItem {
  id: string;
  lenderName: string;
  outstandingBalance: number;
  annualInterestRatePercent: number;
  monthlyEMI: number;
}

export interface DebtConsolidationRefinanceResult {
  totalOutstandingBalance: number;
  currentCombinedMonthlyEMI: number;
  currentWeightedAPRPercent: number;
  newConsolidatedAPRPercent: number;
  newConsolidatedMonthlyEMI: number;
  monthlyEMIReduction: number;
  totalInterestSavingsOverTerm: number;
  isConsolidationBeneficial: boolean;
}

export class DebtConsolidationRefinanceEngine {
  public static calculateConsolidation(
    debts: DebtAccountItem[],
    newConsolidatedAPRPercent = 11.5,
    tenureMonths = 36
  ): DebtConsolidationRefinanceResult {
    let totalOutstandingBalance = 0;
    let currentCombinedMonthlyEMI = 0;
    let weightedAPRSum = 0;

    debts.forEach((d) => {
      totalOutstandingBalance += d.outstandingBalance;
      currentCombinedMonthlyEMI += d.monthlyEMI;
      weightedAPRSum += d.outstandingBalance * d.annualInterestRatePercent;
    });

    const currentWeightedAPRPercent = totalOutstandingBalance > 0 ? weightedAPRSum / totalOutstandingBalance : 0;

    const r = newConsolidatedAPRPercent / 100 / 12;
    const newConsolidatedMonthlyEMI = Math.round(
      (totalOutstandingBalance * r * Math.pow(1 + r, tenureMonths)) / (Math.pow(1 + r, tenureMonths) - 1)
    );

    const monthlyEMIReduction = Math.max(0, currentCombinedMonthlyEMI - newConsolidatedMonthlyEMI);

    const currentTotalOutflow = currentCombinedMonthlyEMI * tenureMonths;
    const newTotalOutflow = newConsolidatedMonthlyEMI * tenureMonths;
    const totalInterestSavingsOverTerm = Math.max(0, Math.round(currentTotalOutflow - newTotalOutflow));

    const isConsolidationBeneficial = monthlyEMIReduction > 1000 && totalInterestSavingsOverTerm > 20000;

    return {
      totalOutstandingBalance: Math.round(totalOutstandingBalance),
      currentCombinedMonthlyEMI: Math.round(currentCombinedMonthlyEMI),
      currentWeightedAPRPercent: parseFloat(currentWeightedAPRPercent.toFixed(2)),
      newConsolidatedAPRPercent,
      newConsolidatedMonthlyEMI,
      monthlyEMIReduction,
      totalInterestSavingsOverTerm,
      isConsolidationBeneficial,
    };
  }
}
