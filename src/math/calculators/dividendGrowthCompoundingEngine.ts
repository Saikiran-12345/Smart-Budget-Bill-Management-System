export interface DGIYearPoint {
  yearNumber: number;
  portfolioValueNoDRIP: number;
  portfolioValueWithDRIP: number;
  annualDividendIncomeNoDRIP: number;
  annualDividendIncomeWithDRIP: number;
  yieldOnCostPercent: number;
}

export class DividendGrowthCompoundingEngine {
  public static generateDGIProjection(
    initialInvestment = 300000,
    initialDividendYieldPercent = 3.5,
    annualDividendGrowthPercent = 8.0,
    annualStockAppreciationPercent = 6.0,
    years = 20
  ): DGIYearPoint[] {
    let valNoDRIP = initialInvestment;
    let valWithDRIP = initialInvestment;
    let yieldRateNoDRIP = initialDividendYieldPercent / 100;
    let yieldRateWithDRIP = initialDividendYieldPercent / 100;

    const timeline: DGIYearPoint[] = [];

    for (let y = 1; y <= years; y++) {
      const divNoDRIP = valNoDRIP * yieldRateNoDRIP;
      valNoDRIP *= 1 + annualStockAppreciationPercent / 100;
      yieldRateNoDRIP *= 1 + annualDividendGrowthPercent / 100;

      const divWithDRIP = valWithDRIP * yieldRateWithDRIP;
      valWithDRIP = (valWithDRIP + divWithDRIP) * (1 + annualStockAppreciationPercent / 100);
      yieldRateWithDRIP *= 1 + annualDividendGrowthPercent / 100;

      const yieldOnCost = initialInvestment > 0 ? (divWithDRIP / initialInvestment) * 100 : 0;

      timeline.push({
        yearNumber: y,
        portfolioValueNoDRIP: Math.round(valNoDRIP),
        portfolioValueWithDRIP: Math.round(valWithDRIP),
        annualDividendIncomeNoDRIP: Math.round(divNoDRIP),
        annualDividendIncomeWithDRIP: Math.round(divWithDRIP),
        yieldOnCostPercent: parseFloat(yieldOnCost.toFixed(2)),
      });
    }

    return timeline;
  }
}
