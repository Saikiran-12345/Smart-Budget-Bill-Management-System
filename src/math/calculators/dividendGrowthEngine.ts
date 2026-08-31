export interface DividendGrowthYearPoint {
  year: number;
  annualDividendIncome: number;
  reinvestedPortfolioValue: number;
  yieldOnCostPercent: number;
}

export class DividendGrowthEngine {
  public static calculateDividendGrowth(
    initialInvestment: number,
    initialDividendYieldPercent = 3.5,
    annualDividendGrowthPercent = 8.0,
    annualStockAppreciationPercent = 6.0,
    reinvestDividends = true,
    projectionYears = 20
  ): DividendGrowthYearPoint[] {
    let portfolioValue = initialInvestment;
    let currentDividendYield = initialDividendYieldPercent / 100;

    const timeline: DividendGrowthYearPoint[] = [];

    for (let y = 1; y <= projectionYears; y++) {
      const annualDividendIncome = portfolioValue * currentDividendYield;
      const yieldOnCostPercent = initialInvestment > 0 ? (annualDividendIncome / initialInvestment) * 100 : 0;

      if (reinvestDividends) {
        portfolioValue += annualDividendIncome;
      }

      portfolioValue *= 1 + annualStockAppreciationPercent / 100;
      currentDividendYield *= 1 + annualDividendGrowthPercent / 100;

      timeline.push({
        year: y,
        annualDividendIncome: Math.round(annualDividendIncome),
        reinvestedPortfolioValue: Math.round(portfolioValue),
        yieldOnCostPercent: parseFloat(yieldOnCostPercent.toFixed(2)),
      });
    }

    return timeline;
  }
}
