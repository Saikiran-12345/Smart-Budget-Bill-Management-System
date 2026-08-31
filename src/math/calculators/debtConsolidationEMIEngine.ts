export interface DebtAccountEntry {
  debtId: string;
  name: string;
  balance: number;
  aprPercent: number;
  monthlyEMI: number;
}

export interface ConsolidationResult {
  totalBalance: number;
  currentCombinedEMI: number;
  newRefinancedEMI: number;
  monthlyEMIReduction: number;
  tenureMonths: number;
  netInterestSavings: number;
}

export class DebtConsolidationEMIEngine {
  public static calculateConsolidation(
    debts: DebtAccountEntry[],
    newAPRPercent = 11.5,
    tenureMonths = 36
  ): ConsolidationResult {
    let totalBalance = 0;
    let currentCombinedEMI = 0;

    debts.forEach((d) => {
      totalBalance += d.balance;
      currentCombinedEMI += d.monthlyEMI;
    });

    const r = newAPRPercent / 100 / 12;
    const newRefinancedEMI = Math.round(
      (totalBalance * r * Math.pow(1 + r, tenureMonths)) / (Math.pow(1 + r, tenureMonths) - 1)
    );

    const monthlyEMIReduction = Math.max(0, currentCombinedEMI - newRefinancedEMI);

    const currentTotalOutflow = currentCombinedEMI * tenureMonths;
    const newTotalOutflow = newRefinancedEMI * tenureMonths;
    const netInterestSavings = Math.max(0, Math.round(currentTotalOutflow - newTotalOutflow));

    return {
      totalBalance: Math.round(totalBalance),
      currentCombinedEMI: Math.round(currentCombinedEMI),
      newRefinancedEMI,
      monthlyEMIReduction,
      tenureMonths,
      netInterestSavings,
    };
  }
}
