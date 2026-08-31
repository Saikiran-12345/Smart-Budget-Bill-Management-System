export interface SharpeRatioAnalysis {
  portfolioAnnualizedReturnPercent: number;
  riskFreeRatePercent: number; // e.g. 7.0% RBI 10Y G-Sec
  portfolioStandardDeviationPercent: number; // volatility
  sharpeRatio: number;
  riskRating: 'EXCELLENT_RISK_ADJUSTED' | 'GOOD' | 'SUBPAR' | 'POOR';
}

export class SharpeRatioRiskEngine {
  public static calculateSharpeRatio(
    portfolioAnnualizedReturnPercent = 14.5,
    riskFreeRatePercent = 7.0,
    portfolioStandardDeviationPercent = 12.0
  ): SharpeRatioAnalysis {
    const excessReturn = portfolioAnnualizedReturnPercent - riskFreeRatePercent;
    const sharpeRatio = portfolioStandardDeviationPercent > 0 ? excessReturn / portfolioStandardDeviationPercent : 0;

    let riskRating: 'EXCELLENT_RISK_ADJUSTED' | 'GOOD' | 'SUBPAR' | 'POOR' = 'POOR';
    if (sharpeRatio > 1.0) riskRating = 'EXCELLENT_RISK_ADJUSTED';
    else if (sharpeRatio >= 0.6) riskRating = 'GOOD';
    else if (sharpeRatio >= 0.3) riskRating = 'SUBPAR';

    return {
      portfolioAnnualizedReturnPercent,
      riskFreeRatePercent,
      portfolioStandardDeviationPercent,
      sharpeRatio: parseFloat(sharpeRatio.toFixed(2)),
      riskRating,
    };
  }
}
