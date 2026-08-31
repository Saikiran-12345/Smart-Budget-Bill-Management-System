export interface VaRSummary {
  portfolioValuationINR: number;
  confidenceLevelPercent: number; // e.g. 95% or 99%
  holdingPeriodDays: number; // e.g. 1 day or 10 days
  dailyVolatilityPercent: number;
  valueAtRiskAmountINR: number;
  valueAtRiskPercentage: number;
}

export class ValueAtRiskEngine {
  public static calculateVaR(
    portfolioValuationINR = 1000000,
    dailyVolatilityPercent = 1.2,
    confidenceLevel: 95 | 99 = 95,
    holdingPeriodDays = 1
  ): VaRSummary {
    // Z-Score: 95% -> 1.645, 99% -> 2.326
    const zScore = confidenceLevel === 95 ? 1.645 : 2.326;
    const periodVolatility = dailyVolatilityPercent * Math.sqrt(holdingPeriodDays);

    const varPercentage = zScore * periodVolatility;
    const valueAtRiskAmountINR = Math.round((portfolioValuationINR * varPercentage) / 100);

    return {
      portfolioValuationINR,
      confidenceLevelPercent: confidenceLevel,
      holdingPeriodDays,
      dailyVolatilityPercent,
      valueAtRiskAmountINR,
      valueAtRiskPercentage: parseFloat(varPercentage.toFixed(2)),
    };
  }
}
