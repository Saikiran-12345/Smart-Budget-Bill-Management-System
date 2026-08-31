export interface CashBurnRunwayAnalysis {
  totalLiquidAssets: number;
  fixedMonthlyOutflow: number;
  variableMonthlyOutflow: number;
  totalMonthlyBurnRate: number;
  runwayMonthsCount: number;
  runwayRating: 'CRITICAL' | 'WARNING' | 'HEALTHY' | 'SURPLUS';
}

export class CashBurnRunwayEngine {
  public static calculateRunway(
    totalLiquidAssets: number,
    fixedMonthlyOutflow: number,
    variableMonthlyOutflow: number
  ): CashBurnRunwayAnalysis {
    const totalMonthlyBurnRate = fixedMonthlyOutflow + variableMonthlyOutflow;
    const runwayMonthsCount = totalMonthlyBurnRate > 0 ? totalLiquidAssets / totalMonthlyBurnRate : 99;

    let runwayRating: 'CRITICAL' | 'WARNING' | 'HEALTHY' | 'SURPLUS' = 'HEALTHY';
    if (runwayMonthsCount < 3) runwayRating = 'CRITICAL';
    else if (runwayMonthsCount < 6) runwayRating = 'WARNING';
    else if (runwayMonthsCount >= 12) runwayRating = 'SURPLUS';

    return {
      totalLiquidAssets: Math.round(totalLiquidAssets),
      fixedMonthlyOutflow: Math.round(fixedMonthlyOutflow),
      variableMonthlyOutflow: Math.round(variableMonthlyOutflow),
      totalMonthlyBurnRate: Math.round(totalMonthlyBurnRate),
      runwayMonthsCount: parseFloat(runwayMonthsCount.toFixed(1)),
      runwayRating,
    };
  }
}
