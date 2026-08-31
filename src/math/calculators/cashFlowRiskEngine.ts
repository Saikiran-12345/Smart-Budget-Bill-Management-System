export interface CashFlowRiskAnalysis {
  fixedExpenseRatioPercent: number; // Fixed Expenses / Total Income
  debtServiceCoverageRatio: number; // Income / Debt EMI
  savingsBufferMonths: number;
  cashFlowRiskRating: 'LOW_RISK' | 'MODERATE_RISK' | 'HIGH_RISK';
}

export class CashFlowRiskEngine {
  public static calculateCashFlowRisk(
    grossMonthlyIncome: number,
    fixedMonthlyExpenses: number,
    monthlyDebtEMI: number,
    liquidSavingsAmount: number
  ): CashFlowRiskAnalysis {
    const fixedExpenseRatioPercent = grossMonthlyIncome > 0 ? (fixedMonthlyExpenses / grossMonthlyIncome) * 100 : 100;
    const debtServiceCoverageRatio = monthlyDebtEMI > 0 ? grossMonthlyIncome / monthlyDebtEMI : 10;
    const totalOutflow = fixedMonthlyExpenses + monthlyDebtEMI;
    const savingsBufferMonths = totalOutflow > 0 ? liquidSavingsAmount / totalOutflow : 0;

    let cashFlowRiskRating: 'LOW_RISK' | 'MODERATE_RISK' | 'HIGH_RISK' = 'LOW_RISK';
    if (fixedExpenseRatioPercent > 65 || savingsBufferMonths < 3 || debtServiceCoverageRatio < 2.5) {
      cashFlowRiskRating = 'HIGH_RISK';
    } else if (fixedExpenseRatioPercent > 50 || savingsBufferMonths < 6) {
      cashFlowRiskRating = 'MODERATE_RISK';
    }

    return {
      fixedExpenseRatioPercent: parseFloat(fixedExpenseRatioPercent.toFixed(1)),
      debtServiceCoverageRatio: parseFloat(debtServiceCoverageRatio.toFixed(2)),
      savingsBufferMonths: parseFloat(savingsBufferMonths.toFixed(1)),
      cashFlowRiskRating,
    };
  }
}
