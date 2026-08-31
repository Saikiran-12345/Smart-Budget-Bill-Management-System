export interface CashFlowRiskScore {
  incomeVolatilityScore: number; // 0-30 pts
  debtObligationScore: number; // 0-35 pts
  essentialCoverageScore: number; // 0-35 pts
  totalRiskScore: number; // 0-100 pts
  riskCategory: 'LOW_RISK' | 'MODERATE_RISK' | 'HIGH_RISK';
}

export class CashFlowRiskIndexEngine {
  public static calculateRiskIndex(
    monthlyIncome: number,
    monthlyFixedOutflow: number,
    monthlyDebtEMI: number,
    liquidSavings: number
  ): CashFlowRiskScore {
    const debtRatio = monthlyIncome > 0 ? (monthlyDebtEMI / monthlyIncome) * 100 : 100;
    const essentialRatio = monthlyIncome > 0 ? (monthlyFixedOutflow / monthlyIncome) * 100 : 100;
    const runwayMonths = (monthlyFixedOutflow + monthlyDebtEMI) > 0 ? liquidSavings / (monthlyFixedOutflow + monthlyDebtEMI) : 0;

    let debtScore = 35;
    if (debtRatio > 50) debtScore = 5;
    else if (debtRatio > 35) debtScore = 15;
    else if (debtRatio > 20) debtScore = 25;

    let essentialScore = 35;
    if (essentialRatio > 70) essentialScore = 5;
    else if (essentialRatio > 50) essentialScore = 20;

    let savingsScore = 30;
    if (runwayMonths < 3) savingsScore = 5;
    else if (runwayMonths < 6) savingsScore = 18;

    const totalRiskScore = debtScore + essentialScore + savingsScore;

    let riskCategory: 'LOW_RISK' | 'MODERATE_RISK' | 'HIGH_RISK' = 'LOW_RISK';
    if (totalRiskScore < 50) riskCategory = 'HIGH_RISK';
    else if (totalRiskScore < 75) riskCategory = 'MODERATE_RISK';

    return {
      incomeVolatilityScore: savingsScore,
      debtObligationScore: debtScore,
      essentialCoverageScore: essentialScore,
      totalRiskScore,
      riskCategory,
    };
  }
}
