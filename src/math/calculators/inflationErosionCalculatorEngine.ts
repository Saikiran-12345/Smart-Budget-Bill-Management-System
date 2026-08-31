export interface InflationErosionTimelineDetail {
  yearsInFuture: number;
  futureYear: number;
  initialAmountToday: number;
  futureAmountNeeded: number;
  purchasingPowerLossPercent: number;
  realValueInTodayMoney: number;
}

export class InflationErosionCalculatorEngine {
  public static calculateErosion(
    initialAmountToday = 100000,
    annualInflationPercent = 6.0,
    projectionYears = 30
  ): InflationErosionTimelineDetail[] {
    const rate = annualInflationPercent / 100;
    const currentYear = new Date().getFullYear();
    const timeline: InflationErosionTimelineDetail[] = [];

    for (let y = 5; y <= projectionYears; y += 5) {
      const futureAmountNeeded = Math.round(initialAmountToday * Math.pow(1 + rate, y));
      const realValueInTodayMoney = Math.round(initialAmountToday / Math.pow(1 + rate, y));
      const purchasingPowerLossPercent = parseFloat(((1 - realValueInTodayMoney / initialAmountToday) * 100).toFixed(1));

      timeline.push({
        yearsInFuture: y,
        futureYear: currentYear + y,
        initialAmountToday,
        futureAmountNeeded,
        purchasingPowerLossPercent,
        realValueInTodayMoney,
      });
    }

    return timeline;
  }
}
