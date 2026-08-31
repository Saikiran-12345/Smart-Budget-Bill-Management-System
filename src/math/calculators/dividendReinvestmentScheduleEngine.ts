export interface DividendReinvestmentPoint {
  year: number;
  withoutReinvestmentCorpus: number;
  withReinvestmentCorpus: number;
  annualDividendReceived: number;
  cumulativeDividendsReinvested: number;
  extraWealthCreated: number;
}

export class DividendReinvestmentScheduleEngine {
  public static calculateReinvestmentSchedule(
    initialInvestment = 500000,
    annualDividendYieldPercent = 3.8,
    annualCapitalAppreciationPercent = 7.5,
    projectionYears = 20
  ): DividendReinvestmentPoint[] {
    let noReinvestVal = initialInvestment;
    let withReinvestVal = initialInvestment;
    let totalReinvested = 0;

    const timeline: DividendReinvestmentPoint[] = [];

    for (let y = 1; y <= projectionYears; y++) {
      // 1. Without reinvestment
      const divNoReinvest = noReinvestVal * (annualDividendYieldPercent / 100);
      noReinvestVal *= 1 + annualCapitalAppreciationPercent / 100;

      // 2. With reinvestment
      const divWithReinvest = withReinvestVal * (annualDividendYieldPercent / 100);
      totalReinvested += divWithReinvest;
      withReinvestVal = (withReinvestVal + divWithReinvest) * (1 + annualCapitalAppreciationPercent / 100);

      timeline.push({
        year: y,
        withoutReinvestmentCorpus: Math.round(noReinvestVal),
        withReinvestmentCorpus: Math.round(withReinvestVal),
        annualDividendReceived: Math.round(divWithReinvest),
        cumulativeDividendsReinvested: Math.round(totalReinvested),
        extraWealthCreated: Math.round(withReinvestVal - noReinvestVal),
      });
    }

    return timeline;
  }
}
