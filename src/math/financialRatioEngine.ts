export interface FinancialRatiosSummary {
  savingsToIncomeRatioPercentage: number;
  debtToIncomeRatioPercentage: number;
  housingCostRatioPercentage: number;
  emergencyFundCoverageMonths: number;
  liquidityRatio: number;
  capitalAccumulationRatioPercentage: number;
}

export class FinancialRatioEngine {
  public static calculateRatios(
    monthlyIncome: number,
    monthlyExpenses: number,
    monthlyHousingExpenses: number,
    monthlyDebtPayments: number,
    totalLiquidSavings: number,
    totalInvestments: number
  ): FinancialRatiosSummary {
    const netSavings = Math.max(0, monthlyIncome - monthlyExpenses);
    const savingsToIncomeRatioPercentage = monthlyIncome > 0 ? (netSavings / monthlyIncome) * 100 : 0;
    const debtToIncomeRatioPercentage = monthlyIncome > 0 ? (monthlyDebtPayments / monthlyIncome) * 100 : 0;
    const housingCostRatioPercentage = monthlyIncome > 0 ? (monthlyHousingExpenses / monthlyIncome) * 100 : 0;

    const essentialExpenses = Math.max(1, monthlyHousingExpenses + monthlyDebtPayments + monthlyExpenses * 0.4);
    const emergencyFundCoverageMonths = parseFloat((totalLiquidSavings / essentialExpenses).toFixed(1));

    const liquidityRatio = monthlyExpenses > 0 ? totalLiquidSavings / monthlyExpenses : 0;
    const capitalAccumulationRatioPercentage = monthlyIncome > 0 ? (totalInvestments / (monthlyIncome * 12)) * 100 : 0;

    return {
      savingsToIncomeRatioPercentage: parseFloat(savingsToIncomeRatioPercentage.toFixed(1)),
      debtToIncomeRatioPercentage: parseFloat(debtToIncomeRatioPercentage.toFixed(1)),
      housingCostRatioPercentage: parseFloat(housingCostRatioPercentage.toFixed(1)),
      emergencyFundCoverageMonths,
      liquidityRatio: parseFloat(liquidityRatio.toFixed(2)),
      capitalAccumulationRatioPercentage: parseFloat(capitalAccumulationRatioPercentage.toFixed(1)),
    };
  }
}
