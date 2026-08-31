export interface CashBurnRunwayDetail {
  totalLiquidSavings: number;
  fixedMonthlyOutflow: number;
  variableMonthlyOutflow: number;
  totalMonthlyBurnRate: number;
  runwayMonthsCount: number;
  runwayRating: 'CRITICAL' | 'WARNING' | 'HEALTHY' | 'SURPLUS';
}

export class CashBurnRunwayMetricEngine {
  public static calculateRunway(
    totalLiquidSavings = 300000,
    fixedMonthlyOutflow = 45000,
    variableMonthlyOutflow = 20000
  ): CashBurnRunwayDetail {
    const totalMonthlyBurnRate = fixedMonthlyOutflow + variableMonthlyOutflow;
    const runwayMonthsCount = totalMonthlyBurnRate > 0 ? totalLiquidSavings / totalMonthlyBurnRate : 99;

    let runwayRating: 'CRITICAL' | 'WARNING' | 'HEALTHY' | 'SURPLUS' = 'HEALTHY';
    if (runwayMonthsCount < 3) runwayRating = 'CRITICAL';
    else if (runwayMonthsCount < 6) runwayRating = 'WARNING';
    else if (runwayMonthsCount >= 12) runwayRating = 'SURPLUS';

    return {
      totalLiquidSavings: Math.round(totalLiquidSavings),
      fixedMonthlyOutflow: Math.round(fixedMonthlyOutflow),
      variableMonthlyOutflow: Math.round(variableMonthlyOutflow),
      totalMonthlyBurnRate: Math.round(totalMonthlyBurnRate),
      runwayMonthsCount: parseFloat(runwayMonthsCount.toFixed(1)),
      runwayRating,
    };
  }
}
