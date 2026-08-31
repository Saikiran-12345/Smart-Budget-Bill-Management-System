export interface InformationRatioDetail {
  fundAnnualizedReturnPercent: number;
  benchmarkAnnualizedReturnPercent: number; // e.g. Nifty 50 TRI
  trackingErrorPercent: number;
  informationRatio: number;
  outperformanceCategory: 'OUTSTANDING_CONSISTENT_ALPHA' | 'MODERATE_OUTPERFORMANCE' | 'INDEX_HUGGER' | 'UNDERPERFORMER';
}

export class InformationRatioEngine {
  public static calculateInformationRatio(
    fundAnnualizedReturnPercent = 18.5,
    benchmarkAnnualizedReturnPercent = 14.2,
    trackingErrorPercent = 3.8
  ): InformationRatioDetail {
    const activeReturn = fundAnnualizedReturnPercent - benchmarkAnnualizedReturnPercent;
    const informationRatio = trackingErrorPercent > 0 ? activeReturn / trackingErrorPercent : 0;

    let outperformanceCategory: 'OUTSTANDING_CONSISTENT_ALPHA' | 'MODERATE_OUTPERFORMANCE' | 'INDEX_HUGGER' | 'UNDERPERFORMER' = 'UNDERPERFORMER';
    if (informationRatio > 1.0) outperformanceCategory = 'OUTSTANDING_CONSISTENT_ALPHA';
    else if (informationRatio >= 0.5) outperformanceCategory = 'MODERATE_OUTPERFORMANCE';
    else if (informationRatio >= 0.0) outperformanceCategory = 'INDEX_HUGGER';

    return {
      fundAnnualizedReturnPercent,
      benchmarkAnnualizedReturnPercent,
      trackingErrorPercent,
      informationRatio: parseFloat(informationRatio.toFixed(2)),
      outperformanceCategory,
    };
  }
}
