export interface InflationErosionTimelinePoint {
  yearsInFuture: number;
  futureYear: number;
  todayValue: number;
  futureValueNeeded: number;
  purchasingPowerLossPercent: number;
  realValueInTodayMoney: number;
}

export class InflationErosionEngine {
  public static calculateErosion(
    todayValue = 100000,
    annualInflationPercent = 6,
    projectionYears = 30
  ): InflationErosionTimelinePoint[] {
    const rate = annualInflationPercent / 100;
    const currentYear = new Date().getFullYear();
    const timeline: InflationErosionTimelinePoint[] = [];

    for (let y = 5; y <= projectionYears; y += 5) {
      const futureValueNeeded = Math.round(todayValue * Math.pow(1 + rate, y));
      const realValueInTodayMoney = Math.round(todayValue / Math.pow(1 + rate, y));
      const purchasingPowerLossPercent = parseFloat(((1 - realValueInTodayMoney / todayValue) * 100).toFixed(1));

      timeline.push({
        yearsInFuture: y,
        futureYear: currentYear + y,
        todayValue,
        futureValueNeeded,
        purchasingPowerLossPercent,
        realValueInTodayMoney,
      });
    }

    return timeline;
  }
}
