export interface SortinoRatioAnalysis {
  portfolioAnnualizedReturnPercent: number;
  riskFreeRatePercent: number;
  downsideDeviationPercent: number;
  sortinoRatio: number;
  evaluationNote: string;
}

export class SortinoRatioEngine {
  public static calculateSortinoRatio(
    portfolioAnnualizedReturnPercent = 16.2,
    riskFreeRatePercent = 7.0,
    downsideDeviationPercent = 6.5
  ): SortinoRatioAnalysis {
    const excessReturn = portfolioAnnualizedReturnPercent - riskFreeRatePercent;
    const sortinoRatio = downsideDeviationPercent > 0 ? excessReturn / downsideDeviationPercent : 0;

    let evaluationNote = 'High downside risk exposure.';
    if (sortinoRatio > 1.5) evaluationNote = 'Exceptional risk-adjusted performance with low downside risk.';
    else if (sortinoRatio >= 1.0) evaluationNote = 'Good downside-adjusted return.';

    return {
      portfolioAnnualizedReturnPercent,
      riskFreeRatePercent,
      downsideDeviationPercent,
      sortinoRatio: parseFloat(sortinoRatio.toFixed(2)),
      evaluationNote,
    };
  }
}
