export interface InflationErosionPoint {
  yearsInFuture: number;
  nominalAmountNeeded: number;
  purchasingPowerPercentage: number;
  realValueInTodayMoney: number;
}

export class InflationErosionCalculator {
  public static calculateErosionTimeline(
    todayAmount: number,
    annualInflationRatePercent: number,
    timelineYears = 30
  ): InflationErosionPoint[] {
    const rate = annualInflationRatePercent / 100;
    const schedule: InflationErosionPoint[] = [];

    for (let y = 5; y <= timelineYears; y += 5) {
      const nominalAmountNeeded = Math.round(todayAmount * Math.pow(1 + rate, y));
      const realValueInTodayMoney = Math.round(todayAmount / Math.pow(1 + rate, y));
      const purchasingPowerPercentage = parseFloat(((realValueInTodayMoney / todayAmount) * 100).toFixed(1));

      schedule.push({
        yearsInFuture: y,
        nominalAmountNeeded,
        purchasingPowerPercentage,
        realValueInTodayMoney,
      });
    }

    return schedule;
  }
}
